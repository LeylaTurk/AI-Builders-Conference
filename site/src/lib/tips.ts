// "Next time you read a story like this" tips, shared by the story page and /rate.
export const TIPS: Record<string, string> = {
  H1: "Does the headline state as fact something the story only reports someone saying?",
  H2: "Did 'may' or 'could' in the story become a certainty in the headline?",
  H3: "Big words in a headline, like 'world's first' or 'game-changer', are a sales pitch until the story proves them.",
  P1: "Watch for 'may help' turning into 'helps', or 'linked to' into 'causes'.",
  P2: "Check how big the study was. A test in one school or one lab doesn't show what happens everywhere.",
  P3: "A prediction is still only a guess, even when it's written as fact.",
  W1: "Promotional words like 'revolutionary' tell you how someone wants you to feel, not what happened.",
  W2: "AI doesn't 'want' or 'decide'. Ask who built it and who chose how it's used.",
  T1: "Notice who is speaking. Unnamed sources are harder to check.",
  T2: "Look for at least one voice who isn't selling the product or didn't run the study.",
  T3: "Ask who paid for this and who gains if you believe it.",
  T4: "Look for a link to the original study or announcement so you can check it yourself.",
  T5: "If the only source is the company itself, you're reading its announcement, not an independent check.",
  S1: "Ask what the claim rests on. A company saying it is not the same as evidence.",
  S2: "Big claims need big evidence. One CEO's word isn't enough for 'most companies will'.",
  S3: "When you see a number, ask where it came from and what it measures.",
  S4: "Has anyone else confirmed this: another study, an expert or a dataset?",
  C1: "Good stories say what's still unproven. If nothing is uncertain, be suspicious.",
  C2: "Ask what's missing: what came before, how big this is, and compared with what.",
  C3: "If a story uses jargon without explaining it, it may be written for insiders or to impress.",
  C4: "Check whether you're reading news, opinion or a company announcement. They're often dressed the same.",
};
// Section order: Headline, Strength of evidence, Claims in proportion, Transparency, Context, Wording.
const HYPE_ORDER = ["H1", "H2", "H3", "P1", "P2", "P3", "W1", "W2"];
const GAPS_ORDER = ["S1", "S2", "S3", "S4", "T1", "T2", "T3", "T4", "T5", "C1", "C2", "C3", "C4"];

export function pickTips(checks: Record<string, { answer: string }>, gapsLevel: number): string[] {
  const order = gapsLevel >= 3 ? [...GAPS_ORDER, ...HYPE_ORDER] : [...HYPE_ORDER, ...GAPS_ORDER];
  const failed = order.filter((c) => checks[c]?.answer === "N").slice(0, 2);
  if (failed.length) return failed.map((c) => TIPS[c]!);
  if (checks["T1"]?.answer === "Y") return ["This story is a good example: notice how it names its sources."];
  if (checks["C1"]?.answer === "Y") return ["This story is a good example: notice how it says what's uncertain."];
  return [];
}

