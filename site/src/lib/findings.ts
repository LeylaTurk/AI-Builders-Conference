import { GAPS_SECTIONS, HYPE_SECTIONS } from "@/lib/rating/scoring";

export const CHECK_NAMES: Record<string, string> = {
  H1: "Headline matches the story", H2: "Headline keeps the uncertainty", H3: "No clickbait",
  P1: "Not surer than the source", P2: "Finding not stretched", P3: "Predictions shown as predictions",
  W1: "No exaggerated language", W2: "No anthropomorphising",
  T1: "Sources named", T2: "Independent expert", T3: "Conflicts of interest disclosed", T4: "Links to main source", T5: "Claims checked, not repeated",
  S1: "Claims are checkable", S2: "Evidence fits the claim", S3: "Key numbers explained", S4: "Independent confirmation",
  C1: "Says what's unproven", C2: "Background and context", C3: "Clear, no jargon", C4: "News, opinion and prediction kept apart",
};

export type Finding = { code: string; name: string; section: string; quote: string | null; paragraph: string | null; reason: string; credit?: string };
export type SectionRow = { key: string; label: string; out: boolean; level: number | null; met: number; scored: number };

// Failed checks (answered N) and section breakdown. Only verified quotes are passed on.
export function buildFindings(checksIn: unknown, verifiedIn: unknown, hypeSecs: unknown, gapsSecs: unknown, noQuotes = false) {
  const checks = (checksIn ?? {}) as Record<string, { answer: string; quote: string; paragraph: string; reason: string }>;
  const verified = (verifiedIn ?? {}) as Record<string, boolean>;
  const build = (defs: Record<string, { label: string; codes: readonly string[] }>, secs: unknown) => {
    const findings: Finding[] = [];
    const rows: SectionRow[] = [];
    const res = (secs ?? {}) as Record<string, { out: boolean; level?: number; met?: number; scored?: number }>;
    for (const [key, d] of Object.entries(defs)) {
      const x = res[key];
      rows.push({ key, label: d.label, out: !x || x.out, level: x && !x.out ? x.level ?? null : null, met: x?.met ?? 0, scored: x?.scored ?? 0 });
      for (const code of d.codes) {
        const c = checks[code];
        if (c?.answer !== "N") continue;
        const show = !noQuotes && verified[code] === true && !!c.quote?.trim();
        findings.push({ code, name: CHECK_NAMES[code] ?? code, section: d.label, quote: show ? c.quote : null, paragraph: show ? c.paragraph || null : null, reason: c.reason });
      }
    }
    return { findings, rows };
  };
  const h = build(HYPE_SECTIONS, hypeSecs);
  const g = build(GAPS_SECTIONS, gapsSecs);
  return { findings: { hype: h.findings, gaps: g.findings }, breakdown: { hype: h.rows, gaps: g.rows } };
}
