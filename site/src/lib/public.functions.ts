import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type PublicStory = {
  id: string;
  headline: string;
  outlet: string;
  url: string;
  source: string | null;
  published_date: string | null;
  published_at: string | null;
  kind: string;
  insufficient: boolean;
  /** We hold readable text and the source allows a breakdown. */
  decodable: boolean;
  rating: {
    hype_level: string;
    gaps_level: string;
    partly_checked: boolean;
    summary: string | null;
    reason: string | null;
    approved_at: string | null;
    reviewed: boolean;
  } | null;
};

type R = { version: number; status: string; hype_level: string; gaps_level: string; partly_checked: boolean; summary: string | null; reason: string | null; approved_at: string | null };
type Row = {
  id: string; headline: string; outlet: string; url: string; source: string | null; import_status: string;
  published_date: string | null; published_at: string | null; created_at: string; ratings: R[];
};

const KIND: Record<string, string> = {
  "independent news outlet": "News",
  "press release from the institution that did the study": "Press release",
  "company announcement about its own product": "Company announcement",
};

function toStory(a: Row, info?: Info): PublicStory {
  const sourceType = info?.type;
  const latest = [...(a.ratings ?? [])].filter((r) => r.status === "approved" || r.status === "live").sort((x, y) => y.version - x.version)[0];
  return {
    id: a.id, headline: a.headline, outlet: a.outlet, url: a.url, source: a.source, published_date: a.published_date, published_at: sortKey(a), kind: KIND[sourceType ?? ""] ?? "Other",
    insufficient: !latest && a.import_status === "insufficient",
    decodable: !!info?.hasText && a.source !== "eurekalert" && !/eurekalert/i.test(a.outlet),
    rating: latest ? { hype_level: latest.hype_level, gaps_level: latest.gaps_level, partly_checked: latest.partly_checked, summary: info?.shortSummary ?? latest.summary, reason: latest.reason, approved_at: latest.approved_at, reviewed: latest.status === "approved" } : null,
  };
}

// Only the columns visitors are allowed to read.
const SELECT = "id, headline, outlet, url, source, import_status, published_date, published_at, created_at, ratings(version, status, hype_level, gaps_level, partly_checked, summary, reason, approved_at)";
// Same, but the inner join drops stories with no published rating from the feed.
const SELECT_RATED = SELECT.replace("ratings(", "ratings!inner(");

const sortKey = (a: Row) => a.published_at ?? (a.published_date ? `${a.published_date}T12:00:00Z` : a.created_at);

export const listFeed = createServerFn({ method: "GET" }).handler(async () => {
  const db = publicClient();
  // Only stories that already have a published rating (approved or live) reach the feed.
  const [feed, manual, checks] = await Promise.all([
    db.from("articles").select(SELECT_RATED).not("source", "is", null).not("import_status", "in", "(insufficient,skipped_not_ai)").filter("ratings.status", "in", '("approved","live")').order("published_at", { ascending: false, nullsFirst: false }).limit(30),
    db.from("articles").select(SELECT_RATED).is("source", null).filter("ratings.status", "in", '("approved","live")').limit(200),
    db.from("feed_checks").select("source, checked_at, ok").order("checked_at", { ascending: false }).limit(50),
  ]);
  if (feed.error) console.error(feed.error);
  if (manual.error) console.error(manual.error);
  const rows = [...((feed.data ?? []) as unknown as Row[]), ...((manual.data ?? []) as unknown as Row[])];
  rows.sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  const latestBySource = new Map<string, { checked_at: string; ok: boolean }>();
  for (const c of checks.data ?? []) if (!latestBySource.has(c.source)) latestBySource.set(c.source, c);
  const last = [...latestBySource.values()];
  const types = await sourceTypes(rows.map((r) => r.id));
  return {
    stories: rows.map((r) => toStory(r, types.get(r.id))),
    checkedAt: (checks.data ?? []).find((c) => c.ok)?.checked_at ?? null,
    allFailed: last.length > 0 && last.every((c) => !c.ok),
  };
});

// Server-only lookup of source types (not a public column); returns nothing else.
type Info = { type: string; hasText: boolean; shortSummary?: string };
async function sourceTypes(ids: string[]) {
  const m = new Map<string, Info>();
  if (!ids.length) return m;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("articles").select("id, source_type, paragraphs").in("id", ids);
  for (const r of data ?? []) m.set(r.id, { type: r.source_type, hasText: Array.isArray(r.paragraphs) && (r.paragraphs as string[]).join(" ").length >= 200 });
  // The short story summary from each story's latest public rating write-up.
  const { data: ws } = await supabaseAdmin.from("ratings").select("article_id, version, writeup").in("article_id", ids).in("status", ["approved", "live"]).order("version", { ascending: true });
  for (const w of ws ?? []) {
    const t = (w.writeup as { story_summary?: string } | null)?.story_summary;
    const info = m.get(w.article_id);
    if (info && t) info.shortSummary = t;
  }
  return m;
}

import type { WriteupT } from "@/lib/writeup.server";
import { pickTips } from "@/lib/tips";

export type StoryDetail = PublicStory & {
  writeup: { story_summary: string; our_findings: string } | null;
  tips: string[];
};

export const getStory = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }): Promise<StoryDetail | null> => {
    const { data: a } = await publicClient().from("articles").select(SELECT).eq("id", data.id).maybeSingle();
    if (!a) return null;
    const types = await sourceTypes([data.id]);
    const story = toStory(a as unknown as Row, types.get(data.id));
    const empty: StoryDetail = { ...story, writeup: null, tips: [] };
    if (!story.rating) return empty;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: r } = await supabaseAdmin
      .from("ratings")
      .select("version, status, checks, gaps_level, writeup")
      .eq("article_id", data.id).in("status", ["approved", "live"])
      .order("version", { ascending: false }).limit(1).maybeSingle();
    if (!r) return empty;
    const checks = (r.checks ?? {}) as Record<string, { answer: string }>;
    const tips = pickTips(checks, Number(r.gaps_level) || 0);
    const w = r.writeup as WriteupT | null;
    return { ...story, tips, writeup: w?.story_summary && w?.our_findings ? { story_summary: w.story_summary, our_findings: w.our_findings } : null };
  });

/** Claim Tracker article cards: find stored feed stories whose original URL matches. Read-only. */
export const matchStoriesByUrl = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ urls: z.array(z.string().url()).max(10) }).parse(d))
  .handler(async ({ data }) => {
    const { normUrl } = await import("@/lib/claims");
    const variants = new Set<string>();
    for (const u of data.urls) {
      const x = new URL(u); x.search = ""; x.hash = "";
      const base = x.toString().replace(/\/+$/, "");
      variants.add(u); variants.add(base); variants.add(base + "/");
    }
    const { data: rows, error } = await publicClient().from("articles").select(SELECT).in("url", [...variants]);
    if (error) throw new Error("lookup failed");
    const out: Record<string, { id: string; hype: number | null; gaps: number | null }> = {};
    for (const r of (rows ?? []) as unknown as Row[]) {
      const s = toStory(r);
      const key = data.urls.find((u) => normUrl(u) === normUrl(r.url));
      if (key && s.rating) out[key] = { id: s.id, hype: Number(s.rating.hype_level) || null, gaps: Number(s.rating.gaps_level) || null };
    }
    return out;
  });
