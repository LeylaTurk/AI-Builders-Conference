// Shared clean-up for feed decks and article text (feed imports, pasted links, one-off backfill).
// Conservative: only strips clear boilerplate; when in doubt the text is kept.

const TAIL_JUNK = [
  /\s*continue reading(\.\.\.|…)?\s*$/i,
  /\s*the post .+? appeared first on .+?\.?\s*$/i,
];

// Splits only where end punctuation is followed by a space, so "GPT-5.6" and "U.S. learners" stay whole.
const sentences = (s: string) => s.match(/.+?(?:[.!?…]+["'\u201D\u2019)]*(?=\s|$)|$)/g)?.map((x) => x.trim()).filter(Boolean) ?? [];

const BIO = [
  /\bis an? (?:\w+ ){0,4}(?:columnist|contributor|contributing (?:writer|editor)|correspondent)\b/i,
  /\bis (?:a )?professor(?: of [\w ]+)? emerit(?:us|a)\b/i,
  /\bprofessor of [\w ]+ emerit(?:us|a)\b/i,
  /\bis the (?:co-?)?author of\b/i,
  /\bnewsletter is at\b/i,
  /\bnew book\b.{0,120}\b(?:is )?out now\b/i,
  /\bcontributed to this report\b/i,
  /^\s*(?:follow (?:us|him|her|them|me)\b|sign up (?:for|to)\b|subscribe to (?:our|the)\b)/i,
  /\bappeared first on\b/i,
];
const isBio = (s: string) => BIO.some((r) => r.test(s));

/** Strip "Continue reading…", "The post … appeared first on …" and bio/plug sentences from a deck. */
export function cleanDeckText(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let s = raw.replace(/\s+/g, " ").trim();
  for (let i = 0; i < 3; i++) for (const r of TAIL_JUNK) s = s.replace(r, "").trim();
  const all = sentences(s);
  const kept = all.filter((x) => !isBio(x));
  if (kept.length !== all.length) s = kept.join(" ").trim();
  return s || null;
}

/** Deck from an RSS description (HTML). First <p> only; falls back to og:description when it still looks like a preview. */
export function deckFromDescription(descHtml: string, toText: (h: string) => string, ogDescription?: string | null): string | null {
  const firstP = descHtml.match(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/i)?.[1];
  let deck = cleanDeckText(toText(firstP ?? descHtml));
  const og = cleanDeckText(ogDescription ?? null);
  if (og && (!deck || sentences(deck).length > 2)) deck = og;
  return deck;
}

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const hasQuote = (s: string) => /["\u201C\u201D]/.test(s) && !/\bnewsletter is at\b/i.test(s);
const hasStat = (s: string) => /\d+(?:[.,]\d+)?\s*(?:%|per ?cent|percent|million|billion|bn|m\b)|\$\d/i.test(s);

/** Drops boilerplate from the last 1-3 paragraphs only: short, pattern-matched, no quotes or statistics. */
export function dropTrailingBoilerplate(paragraphs: string[]): { kept: string[]; removed: string[] } {
  const kept = [...paragraphs];
  const removed: string[] = [];
  for (let i = 0; i < 3 && kept.length > 1; i++) {
    const last = kept[kept.length - 1]!;
    if (words(last) >= 60 || hasQuote(last) || hasStat(last) || !isBio(last)) break;
    removed.unshift(kept.pop()!);
  }
  return { kept, removed };
}
