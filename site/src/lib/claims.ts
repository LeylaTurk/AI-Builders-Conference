import raw from "@/content/claims-content.json";

export type Source = { url: string; locator?: string };
export type Check = { answer: "Y" | "N" | "NA" | "NC"; claim_phrase?: string; reason: string; sources?: Source[] };
export type Hype = { level: number | null; label: string; displayPrefix: string; reason?: string; checklist: Record<string, Check>; status?: string };
export type Stop = { date: string; role: string; title: string; quote: string; note: string; linkText: string; url: string };
export type Fact = { label: string; text: string; linkText: string; url: string; tag: string; iconName: string };
export type ActItem = { title: string; text: string; linkText: string; url: string };
export type ArticleCard = { role: string; headline: string; outlet: string; published: string; url: string; hype: number; gaps: number; whyHere: string; ratingNote: string; contextLabel?: string };
export type Topic = {
  slug: string; route: string; topic: string; headline: string; claim: string; carefulHeadline: string;
  scope: string; timeHorizon: string; keyQualification: string;
  claimContextMarkdown: string; shortAnswerMarkdown: string; meaningMarkdown: string; evidenceMarkdown: string;
  scoreExplanationMarkdown: string; actionsMarkdown: string; sourcesAndReviewMarkdown: string;
  hype: Hype; carefulHype: Hype; evidenceGaps: { limitations: string[] };
  sourceLinks: { title: string; url: string }[]; researchCutoff: string; aiEvidenceReview: { date: string };
  articleCards: ArticleCard[];
  interactive: {
    keyWord: { word: string };
    trail: { intro: string; stops: Stop[] };
    finePrint: Fact[];
    actOnWhatsReal: { intro: string; learn: ActItem[]; speakUp: ActItem[]; takeAction: ActItem[] };
    situationPicker?: { title: string; options: { label: string; result: string }[] };
  };
};

const d = raw as unknown as {
  section: { name: string; introduction: string; scoreNote: string; feedInvitationTitle: string; feedInvitationBody: string; feedInvitationLinkText: string };
  trailRoles: Record<string, string>;
  actOnWhatsReal: { siteItem: { title: string; text: string; linkText: string; route: string }; footer: string };
  topics: Topic[];
};

export const SECTION = d.section;
export const TRAIL_ROLES = d.trailRoles;
export const ACT = d.actOnWhatsReal;
export const TOPICS = d.topics;
export const topicBySlug = (s: string) => TOPICS.find((t) => t.slug === s);

/** "2026-10-06" -> "October 6, 2026" (fixed, never from the viewer's clock). */
export function usDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return new Date(Date.UTC(+m[1]!, +m[2]! - 1, +m[3]!)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function normUrl(u: string) {
  try {
    const x = new URL(u);
    [...x.searchParams.keys()].filter((k) => k.toLowerCase().startsWith("utm_")).forEach((k) => x.searchParams.delete(k));
    x.hash = "";
    return `${x.host.toLowerCase()}${x.pathname.replace(/\/+$/, "")}${x.search}`;
  } catch { return u.replace(/\/+$/, ""); }
}
