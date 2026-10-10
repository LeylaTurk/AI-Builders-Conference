import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { HYPE_SECTIONS, GAPS_SECTIONS } from "@/lib/rating/scoring";
import { pickTips } from "@/lib/tips";

export type Mark = { code: string; family: "hype" | "gaps" | "good"; section: string; quote: string | null; paragraph: string | null; reason: string };

async function caps() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("settings").select("decode_global_cap, decode_visitor_cap").eq("id", 1).single();
  return { GLOBAL_CAP: data?.decode_global_cap ?? 50, VISITOR_CAP: data?.decode_visitor_cap ?? 5 };
}
const SOURCE_TYPES = ["independent news outlet", "press release from the institution that did the study", "company announcement about its own product", "other"] as const;
const Input = z.object({ headline: z.string().trim().min(1).max(500), deck: z.string().trim().max(1000).optional(), text: z.string().trim().min(200).max(12000), sourceType: z.enum(SOURCE_TYPES).optional() });
const LinkInput = z.object({ url: z.string().trim().url().max(2000).refine((u) => /^https?:\/\//i.test(u)), sourceType: z.enum(SOURCE_TYPES).optional() });
const MAX_CHARS = 12000;

async function visitorId() {
  const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env["LOVABLE_CRON_SECRET"] ?? "dth";
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${day}:${ip}`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

async function remainingFor(visitor: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const day = new Date().toISOString().slice(0, 10);
  const { data } = await supabaseAdmin.from("check_usage").select("visitor, count").eq("day", day);
  const total = (data ?? []).reduce((a, r) => a + r.count, 0);
  const mine = (data ?? []).find((r) => r.visitor === visitor)?.count ?? 0;
  const { GLOBAL_CAP, VISITOR_CAP } = await caps();
  return Math.max(0, Math.min(GLOBAL_CAP - total, VISITOR_CAP - mine));
}

export const checksLeft = createServerFn({ method: "GET" }).handler(async () => ({ left: await remainingFor(await visitorId()) }));

const USED_UP = "Today's breakdowns are used up. Please try again tomorrow.";
type Article = { headline: string; deck: string | null; source_type: string; paragraphs: string[]; links: never[]; main_source_text: null };

type Checks = Record<string, { answer: string; quote: string; paragraph: string; reason: string }>;
function buildMarks(checks: Checks, verified: Record<string, boolean>) {
  const marks: Mark[] = [];
  for (const [defs, fam] of [[HYPE_SECTIONS, "hype"], [GAPS_SECTIONS, "gaps"]] as const) {
    for (const d of Object.values(defs)) for (const code of d.codes) {
      const c = checks[code];
      if (!c) continue;
      const q = verified[code] === true && c.quote?.trim() ? c.quote.trim() : null;
      if (c.answer === "N") marks.push({ code, family: fam, section: d.label, quote: q, paragraph: q ? c.paragraph || null : null, reason: c.reason });
      else if (c.answer === "Y" && q) marks.push({ code, family: "good", section: d.label, quote: q, paragraph: c.paragraph || null, reason: c.reason });
    }
  }
  return marks;
}

// Step timings go to the server log only. Never log links or text from /decode.
function timer(flow: string) {
  const t0 = Date.now(); let last = t0; const parts: string[] = [];
  return {
    step(name: string) { const now = Date.now(); parts.push(`${name}=${now - last}ms`); last = now; },
    done(outcome: string) { console.log(`[timing] ${flow} ${outcome} total=${Date.now() - t0}ms ${parts.join(" ")}`); },
  };
}
type Timer = ReturnType<typeof timer>;

// Signed hand-off for the summary write-up, so it can run after the breakdown is shown without a second slot.
async function hmac(payload: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(process.env["LOVABLE_CRON_SECRET"] ?? "dth"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
const RATE_TIMEOUT_MS = 105_000;

// Claims a daily slot, rates, and returns the findings. Nothing is saved except the daily count per anonymous visitor code.
// The short write-up is not awaited here: the reader gets the breakdown first and the summary arrives via writeupFor.
async function rateAndPack(article: Article, visitor: string, t: Timer) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { scoreArticle } = await import("@/lib/rate-article.server");
  const { GLOBAL_CAP, VISITOR_CAP } = await caps();
  const { data: left, error } = await supabaseAdmin.rpc("claim_check" as never, { _visitor: visitor, _global_cap: GLOBAL_CAP, _visitor_cap: VISITOR_CAP } as never);
  t.step("claim");
  if (error) { console.error(error); return { error: "The breakdown couldn't run. Please try again.", left: null, result: null, wtoken: null }; }
  if ((left as unknown as number) < 0) return { error: USED_UP, left: 0, result: null, wtoken: null };

  const started = Date.now();
  const once = () => Promise.race([
    scoreArticle(article),
    new Promise<{ error: string }>((res) => setTimeout(() => res({ error: "timed out" }), RATE_TIMEOUT_MS - (Date.now() - started))),
  ]).catch((e) => ({ error: String(e) }));
  let r = await once();
  // Claude occasionally leaves out a field; one retry if there's still time.
  if (r.error !== undefined && /incomplete|did not return/.test(r.error) && Date.now() - started < 50_000) r = await once();
  t.step("rating");
  if (r.error !== undefined || !("checks" in r)) {
    console.error("check failed:", r.error);
    await supabaseAdmin.rpc("release_check" as never, { _visitor: visitor } as never);
    return { error: "We couldn't decode this right now. It wasn't counted; please try again.", left: await remainingFor(visitor), result: null, wtoken: null };
  }
  const checks = r.checks as Checks;
  const marks = buildMarks(checks, r.quotesVerified as Record<string, boolean>);
  const { fit, SUMMARY_WORDS, FINDINGS_WORDS } = await import("@/lib/writeup.server");
  const hype_level = String(r.hype.level), gaps_level = String(r.gaps.level);
  const payload = JSON.stringify({ summary: r.raw.summary ?? null, reason: r.raw.reason ?? null, hype_level, gaps_level, checks, exp: Date.now() + 10 * 60_000 });
  const wtoken = { payload, sig: await hmac(payload) };
  t.step("build");
  return {
    error: null,
    left: left as unknown as number,
    wtoken,
    result: {
      hype_level, gaps_level,
      summary: r.raw.summary ? fit(r.raw.summary, SUMMARY_WORDS) : null,
      reason: r.raw.reason ? fit(r.raw.reason, FINDINGS_WORDS) : null,
      partly_checked: r.partly,
      marks, tips: pickTips(checks, Number(r.gaps.level) || 0),
    },
  };
}

// The short summary + findings for a fresh breakdown, made after the breakdown is already on screen. Nothing is saved.
export const writeupFor = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ payload: z.string().max(60000), sig: z.string().length(64) }).parse(d))
  .handler(async ({ data }) => {
    if ((await hmac(data.payload)) !== data.sig) return null;
    const p = JSON.parse(data.payload) as { exp: number; summary: string | null; reason: string | null; hype_level: string; gaps_level: string; checks: unknown };
    if (p.exp < Date.now()) return null;
    const t = timer("writeup");
    const { makeWriteup } = await import("@/lib/writeup.server");
    const w = await makeWriteup(p).catch(() => null);
    t.step("writeup"); t.done(w ? "ok" : "fail");
    return w ? { summary: w.story_summary, reason: w.our_findings } : null;
  });

// Fallback: rates pasted text (only offered when a link can't be read). The text is not sent back.
export const checkArticle = createServerFn({ method: "POST" })
  .inputValidator((d) => Input.parse(d))
  .handler(async ({ data }) => {
    const t = timer("paste");
    const paragraphs = data.text.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
    const r = await rateAndPack({ headline: data.headline, deck: data.deck || null, source_type: data.sourceType ?? "other", paragraphs, links: [], main_source_text: null }, await visitorId(), t);
    t.done(r.error ? "fail" : "ok");
    return r;
  });

export type DecodeFail = { kind: "storyfail" | "nostory" | "badurl" | "private" | "blocked" | "unavailable" | "paywall" | "notarticle"; site: string };

// Step 1 for a pasted link: open it once and read the article. Uses no breakdown.
// A link to a story we already show returns that story's breakdown (built from its saved rating when it has one).
// The extracted text goes back only to this visitor so their browser can show it; nothing is stored.
export const readLink = createServerFn({ method: "POST" })
  .inputValidator((d) => LinkInput.parse(d))
  .handler(async ({ data }) => {
    const t = timer("decode-read");
    const visitor = await visitorId();
    const { normalizeUrl } = await import("@/lib/feeds.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const canon = normalizeUrl(data.url);
    const [{ data: hit }, left] = await Promise.all([
      supabaseAdmin.from("articles").select("id").or(`canonical_url.eq.${JSON.stringify(canon)},url.eq.${JSON.stringify(data.url.trim())}`).limit(1).maybeSingle(),
      remainingFor(visitor),
    ]);
    t.step("lookup");
    if (hit) {
      const b = await storyBreakdown(hit.id, visitor, t);
      if (b.fail?.kind !== "nostory") { t.done("saved-story"); return { ...b, known: true as const }; }
    }
    const none = { known: false as const, article: null, error: null as string | null, left: left as number | null, result: null, cut: null as number | null, story: null as StoryRef | null, wtoken: null, fail: null as DecodeFail | null };
    if (left <= 0) { t.done("used-up"); return { ...none, error: USED_UP, left: 0 }; }
    const { fetchArticle } = await import("@/lib/fetch-article.server");
    const f = await fetchArticle(data.url);
    t.step("fetch+extract");
    if (!f.ok) { t.done(`fail:${f.fail.kind}`); return { ...none, fail: f.fail as DecodeFail }; }
    const paragraphs = trim(f.article.paragraphs);
    t.done("ok");
    return { ...none, article: { ...f.article, paragraphs, source: null as string | null }, cut: paragraphs.length < f.article.paragraphs.length ? paragraphs.length : null };
  });

// Step 2 for a pasted link: rate the text read in step 1. Claims a breakdown; released again on failure.
export const rateRead = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({
    headline: z.string().trim().min(1).max(500), deck: z.string().max(1000).nullable(),
    paragraphs: z.array(z.string().max(MAX_CHARS)).min(1).max(400).refine((ps) => ps.join("\n\n").length <= MAX_CHARS + 400 * 2),
    sourceType: z.enum(SOURCE_TYPES).optional(),
  }).parse(d))
  .handler(async ({ data }) => {
    const t = timer("decode-rate");
    const r = await rateAndPack({ headline: data.headline, deck: data.deck, source_type: data.sourceType ?? "other", paragraphs: data.paragraphs, links: [], main_source_text: null }, await visitorId(), t);
    t.done(r.error ? "fail" : "ok");
    return r;
  });

export type StoryRef = { id: string; approved: boolean; reviewed?: boolean };

function trim(all: string[]) {
  const paragraphs: string[] = [];
  let n = 0;
  for (const p of all) { if (n + p.length > MAX_CHARS && paragraphs.length) break; paragraphs.push(p.slice(0, MAX_CHARS)); n += p.length + 2; }
  return paragraphs;
}

// Looks up a story shown on the public site. Returns null for unknown or hidden ids.
// One round trip: the public visibility check and the article + its published rating run together.
async function publicStory(id: string) {
  const { publicClient } = await import("@/lib/public.functions");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [{ data: pub }, { data: a }] = await Promise.all([
    publicClient().from("articles").select("id, import_status").eq("id", id).maybeSingle(),
    supabaseAdmin.from("articles").select("id, headline, deck, outlet, url, source, source_type, paragraphs, published_date, ratings(version, status, checks, quotes_verified, hype_level, gaps_level, summary, reason, partly_checked, writeup)")
      .eq("id", id).in("ratings.status", ["approved", "live"]).maybeSingle(),
  ]);
  if (!pub || pub.import_status === "skipped_not_ai" || !a) return null;
  // Only published ratings (reviewed or live) are ever reused; the latest version wins.
  const rating = [...((a.ratings ?? []) as { version: number; status: string }[])].sort((x, y) => y.version - x.version)[0] as
    | { version: number; status: string; checks: unknown; quotes_verified: unknown; hype_level: string; gaps_level: string; summary: string | null; reason: string | null; partly_checked: boolean; writeup: unknown }
    | undefined;
  const paragraphs = Array.isArray(a.paragraphs) ? (a.paragraphs as string[]) : [];
  const eureka = a.source === "eurekalert" || /eurekalert/i.test(a.outlet);
  return { a, paragraphs, eureka, approved: rating ?? null };
}

// Builds a feed story's breakdown from its saved text. Approved ratings are reused (free); otherwise the engine runs and counts.
async function storyBreakdown(id: string, visitor: string, t: Timer) {
  const none = { article: null, error: null, left: null, result: null, cut: null, story: null as StoryRef | null, wtoken: null };
  const s = await publicStory(id);
  t.step("read");
  if (!s) return { ...none, fail: { kind: "nostory", site: "" } as DecodeFail };
  const site = s.a.outlet;
  if (s.eureka || s.paragraphs.join(" ").length < 200) return { ...none, fail: { kind: s.eureka ? "blocked" : "notarticle", site } as DecodeFail };
  const paragraphs = trim(s.paragraphs);
  const article = { headline: s.a.headline, deck: s.a.deck, paragraphs, url: s.a.url, outlet: s.a.outlet, date: s.a.published_date, source: s.a.source };
  const cut = paragraphs.length < s.paragraphs.length ? paragraphs.length : null;
  const story: StoryRef = { id, approved: !!s.approved, reviewed: s.approved?.status === "approved" };
  if (s.approved) {
    const r = s.approved;
    const checks = (r.checks ?? {}) as Checks;
    const w = r.writeup as { story_summary?: string; our_findings?: string } | null;
    t.step("build");
    return {
      fail: null, article, cut, story, error: null, left: null, wtoken: null,
      result: {
        hype_level: r.hype_level, gaps_level: r.gaps_level,
        summary: w?.story_summary ?? r.summary ?? "", reason: w?.our_findings ?? r.reason ?? "", partly_checked: r.partly_checked,
        marks: buildMarks(checks, (r.quotes_verified ?? {}) as Record<string, boolean>), tips: pickTips(checks, Number(r.gaps_level) || 0),
      },
    };
  }
  if ((await remainingFor(visitor)) <= 0) return { ...none, fail: null, story, error: USED_UP, left: 0 };
  const r = await rateAndPack({ headline: s.a.headline, deck: s.a.deck, source_type: s.a.source_type, paragraphs, links: [], main_source_text: null }, visitor, t);
  if (r.error && r.error !== USED_UP) return { ...none, fail: { kind: "storyfail", site } as DecodeFail, left: r.left, story };
  return { fail: null, article: r.result ? article : null, cut, story, ...r };
}

const IdInput = z.object({ id: z.string().uuid() });

export const decodeStory = createServerFn({ method: "POST" })
  .inputValidator((d) => IdInput.parse(d))
  .handler(async ({ data }) => {
    const t = timer("story");
    const b = await storyBreakdown(data.id, await visitorId(), t);
    t.done(b.story?.approved ? "saved" : b.result ? "fresh" : "fail");
    return b;
  });

// Headline and outlet only, for the "press Decode it" screen.
export const storyInfo = createServerFn({ method: "GET" })
  .inputValidator((d) => IdInput.parse(d))
  .handler(async ({ data }) => {
    const s = await publicStory(data.id);
    if (!s) return null;
    return { id: data.id, headline: s.a.headline, outlet: s.a.outlet, url: s.a.url, approved: !!s.approved, reviewed: s.approved?.status === "approved" };
  });
