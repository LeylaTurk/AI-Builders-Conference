import { applySourceRules, partlyChecked, rateGaps, rateHype, verifyQuote, type Checks, type SourceStatus } from "@/lib/rating/scoring";
import { normalizeUrl } from "@/lib/feeds.server";
import { Writeup } from "@/lib/writeup.server";

export type ArchiveItem = {
  article: { headline: string; deck?: string | null; outlet: string; url: string; published_date?: string | null; source_type: string; paragraphs: string[]; links?: { text: string; url: string }[] };
  rating: { raw_answers: { main_source: { status: SourceStatus }; checks: Checks; claim_type?: string; summary?: string; reason?: string; other_observations?: string[] }; summary?: string; reason?: string; claim_type?: string; hype_level?: unknown; gaps_level?: unknown; writeup?: unknown };
};

export type ImportReport = {
  imported: string[];
  skipped: string[];
  mismatches: string[];
  failedQuotes: string[];
  errors: string[];
};

// Saves ratings made outside the site. Never calls the AI and never counts toward the daily cap.
export async function importArchive(items: ArchiveItem[]): Promise<ImportReport> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const rep: ImportReport = { imported: [], skipped: [], mismatches: [], failedQuotes: [], errors: [] };
  const { data: existing } = await supabaseAdmin.from("articles").select("url, canonical_url").limit(10000);
  const have = new Set<string>();
  for (const e of existing ?? []) { have.add(normalizeUrl(e.url)); if (e.canonical_url) have.add(e.canonical_url); }

  for (const it of items) {
    const a = it.article;
    const label = `${a.headline} (${a.outlet})`;
    try {
      const c = normalizeUrl(a.url);
      if (have.has(c)) { rep.skipped.push(label); continue; }
      const raw = it.rating.raw_answers;
      const status = raw.main_source.status;
      const { checks, overrides } = applySourceRules(raw.checks, status);
      const hype = rateHype(checks);
      const gaps = rateGaps(checks);
      const article = { headline: a.headline, deck: a.deck ?? "", paragraphs: a.paragraphs };
      const quotesVerified: Record<string, boolean> = {};
      for (const [code, ch] of Object.entries(checks)) {
        const ok = verifyQuote(ch.quote ?? "", ch.paragraph ?? "", article);
        quotesVerified[code] = ok;
        if (!ok) rep.failedQuotes.push(`${code}: ${label}`);
      }
      const fh = String(it.rating.hype_level ?? ""), fg = String(it.rating.gaps_level ?? "");
      if (fh !== String(hype.level) || fg !== String(gaps.level))
        rep.mismatches.push(`${label}: file Hype ${fh} / Gaps ${fg}, ours Hype ${hype.level} / Gaps ${gaps.level}`);

      const when = a.published_date ? new Date(`${a.published_date}T12:00:00Z`) : null;
      const { data: art, error: aErr } = await supabaseAdmin.from("articles").insert({
        headline: a.headline.slice(0, 500), deck: a.deck || null, outlet: a.outlet, url: a.url, canonical_url: c,
        source: "archive", source_type: a.source_type,
        published_date: a.published_date || null, published_at: when && !isNaN(+when) ? when.toISOString() : null,
        paragraphs: a.paragraphs, links: a.links ?? [], import_status: "new",
      }).select("id").single();
      if (aErr || !art) { rep.errors.push(`${label}: could not save article`); continue; }
      have.add(c);

      const w = Writeup.safeParse(it.rating.writeup);
      const { error: rErr } = await supabaseAdmin.from("ratings").insert({
        article_id: art.id, version: 1, model: "archive import",
        raw_answers: raw as never, checks: checks as never, overrides: overrides as never, source_status: status,
        hype_level: String(hype.level), hype_sections: hype.sections as never, headline_rule_applied: hype.ruleApplied,
        gaps_level: String(gaps.level), gaps_sections: gaps.sections as never, safety_rule_applied: gaps.ruleApplied,
        partly_checked: partlyChecked(checks, status),
        claim_type: it.rating.claim_type ?? raw.claim_type ?? null,
        summary: it.rating.summary ?? raw.summary ?? null, reason: it.rating.reason ?? raw.reason ?? null,
        other_observations: (raw.other_observations ?? []) as never, quotes_verified: quotesVerified as never,
        input_tokens: null, output_tokens: null, status: "live",
        writeup: (w.success ? w.data : null) as never,
      });
      if (rErr) { rep.errors.push(`${label}: could not save rating`); await supabaseAdmin.from("articles").delete().eq("id", art.id); continue; }
      rep.imported.push(label);
    } catch (e) {
      rep.errors.push(`${label}: ${e instanceof Error ? e.message : "failed"}`);
    }
  }
  return rep;
}
