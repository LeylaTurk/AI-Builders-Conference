// Turns the AI's checklist answers into the Hype and Evidence gaps ratings.
// Same rules as the Rating Desk and the brief ("How ratings are produced", points 2 and 3).
// The AI never computes a rating; this code does.

export type Answer = "Y" | "N" | "NA" | "NC";
export type Checks = Record<string, { answer: Answer; quote: string; paragraph: string; reason: string }>;
export type SourceStatus = "read" | "locked" | "unlinked" | "none";

export const HYPE_SECTIONS = {
  H: { label: "Headline", codes: ["H1", "H2", "H3"] },
  P: { label: "Claims in proportion", codes: ["P1", "P2", "P3"] },
  W: { label: "Wording", codes: ["W1", "W2"] },
} as const;

export const GAPS_SECTIONS = {
  T: { label: "Transparency", codes: ["T1", "T2", "T3", "T4", "T5"] },
  S: { label: "Strength of evidence", codes: ["S1", "S2", "S3", "S4"] },
  C: { label: "Context", codes: ["C1", "C2", "C3", "C4"] },
} as const;

export type SectionResult =
  | { out: false; level: number; met: number; scored: number }
  | { out: true; why: "not applicable" | "not checked" };

// A section needs at least 2 checks answered Y or N. Its level comes from the share met.
export function sectionLevel(checks: Checks, codes: readonly string[]): SectionResult {
  let y = 0, n = 0, nc = 0;
  for (const c of codes) {
    const a = checks[c]?.answer;
    if (a === "Y") y++;
    else if (a === "N") n++;
    else if (a === "NC") nc++;
  }
  if (y + n < 2) return { out: true, why: nc ? "not checked" : "not applicable" };
  const share = y / (y + n);
  const level = share === 1 ? 1 : share >= 0.75 ? 2 : share >= 0.5 ? 3 : share >= 0.25 ? 4 : 5;
  return { out: false, level, met: y, scored: y + n };
}

// Average of the sections that aren't out; an exact .5 rounds down to fewer icons.
function average(levels: number[]): number {
  const avg = levels.reduce((a, b) => a + b, 0) / levels.length;
  const frac = avg - Math.floor(avg);
  return Math.abs(frac - 0.5) < 1e-9 ? Math.floor(avg) : Math.round(avg);
}

export type Rating = {
  level: number | "insufficient";
  sections: Record<string, SectionResult>;
  ruleApplied: boolean; // Hype: headline rule. Evidence gaps: safety rule.
};

function rate(
  checks: Checks,
  sections: Record<string, { codes: readonly string[] }>,
  ruleSection: string,
): Rating {
  const results: Record<string, SectionResult> = {};
  for (const [k, s] of Object.entries(sections)) results[k] = sectionLevel(checks, s.codes);
  const scored = Object.values(results).filter((r): r is Extract<SectionResult, { out: false }> => !r.out);
  // Two or more sections out: no rating.
  if (scored.length < 2) return { level: "insufficient", sections: results, ruleApplied: false };
  let level = average(scored.map(r => r.level));
  // Hype: a Headline section of 5 means Hype is at least 4 (many people read only the headline).
  // Evidence gaps: a Strength of evidence section of 5 means Evidence gaps is at least 4.
  const rule = results[ruleSection];
  let ruleApplied = false;
  if (!rule.out && rule.level === 5 && level < 4) { level = 4; ruleApplied = true; }
  return { level, sections: results, ruleApplied };
}

export function rateHype(checks: Checks): Rating {
  return rate(checks, HYPE_SECTIONS, "H");
}

export function rateGaps(checks: Checks): Rating {
  return rate(checks, GAPS_SECTIONS, "S");
}

// Step 0 rules applied in code, so a slip by the AI can't break them.
// Returns the corrected checks and a list of what was overridden.
export function applySourceRules(checks: Checks, status: SourceStatus): { checks: Checks; overrides: string[] } {
  const out: Checks = structuredClone(checks);
  const overrides: string[] = [];
  const force = (code: string, answer: Answer, why: string) => {
    if (out[code] && out[code].answer !== answer) {
      overrides.push(`${code}: ${out[code].answer} → ${answer} (${why})`);
      out[code] = { ...out[code], answer };
    }
  };
  if (status === "locked") { force("T4", "Y", "source is linked"); force("P1", "NC", "source couldn't be read"); }
  if (status === "unlinked") { force("T4", "N", "source isn't linked"); force("P1", "NA", "no linked source to compare"); }
  if (status === "none") { force("T4", "NA", "no outside source"); force("P1", "NA", "no outside source"); }
  return { checks: out, overrides };
}

// Every quote must appear in the article (headline, deck or the numbered paragraph) before it's shown.
// Compares with quotes, dashes and spaces normalised. A quote that fails is dropped from display;
// the answer itself still counts.
export function verifyQuote(
  quote: string,
  paragraph: string,
  article: { headline: string; deck?: string; paragraphs: string[] },
): boolean {
  if (!quote.trim()) return true;
  const norm = (s: string) =>
    s.replace(/[‘’‚′]/g, "'").replace(/[“”„″]/g, '"')
      .replace(/[–—]/g, "-").replace(/ /g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  const q = norm(quote);
  const p = paragraph.trim().toLowerCase();
  if (p === "headline") return norm(article.headline).includes(q);
  if (p === "deck") return norm(article.deck ?? "").includes(q);
  const i = parseInt(p, 10);
  if (Number.isInteger(i) && article.paragraphs[i - 1] !== undefined && norm(article.paragraphs[i - 1]).includes(q)) return true;
  // Wrong paragraph number but real words: accept, and the site shows it at the right paragraph.
  return article.paragraphs.some(par => norm(par).includes(q));
}

// "Partly checked: source not read" label.
export function partlyChecked(checks: Checks, status: SourceStatus): boolean {
  return status === "locked" || Object.values(checks).some(c => c.answer === "NC");
}
