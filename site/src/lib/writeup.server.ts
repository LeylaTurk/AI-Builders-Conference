import { z } from "zod";
import { RATING_MODEL } from "@/lib/rate-article.server";
import { CHECK_NAMES } from "@/lib/findings";
import { GAPS_SECTIONS, HYPE_SECTIONS } from "@/lib/rating/scoring";
import { TIPS } from "@/lib/tips";

// Plain-language top-box text for a rated story, built from the rating only (never the article).
export const Writeup = z.object({
  story_summary: z.string().min(1),
  our_findings: z.string().min(1),
});
export type WriteupT = z.infer<typeof Writeup>;

export const SUMMARY_WORDS = 35;
export const FINDINGS_WORDS = 40;

const TOOL = "submit_writeup";
const SYSTEM = `You write two short texts for one rated news story on "Decoding the Hype", for a general reader.
You get the rating: the AI's summary and reason, the Hype and Evidence gaps levels (1 lowest to 5 highest), and the checklist checks (Y = met, N = failed) with reasons.
Return:
- story_summary: at most 2 short sentences, at most ${SUMMARY_WORDS} words in total. Only what the story reports or argues. No judgement, no quotes.
- our_findings: exactly 2 short sentences, at most ${FINDINGS_WORDS} words in total, no quotes.
  Sentence 1 is the verdict: both ratings in plain words plus the single biggest reason, e.g. "Very high hype and major evidence gaps: alarming AI risks and legal predictions are stated as near-certain facts."
  Sentence 2 says what to look for in this story and starts with "Look for" or "Notice", e.g. "Look for a source behind the claim that AI agents are already escaping secure systems; there isn't one." It must be specific to this story, not general reading advice.
  If both levels are 0 or 1, sentence 2 instead names what the story does well.
Don't invent facts. Don't reuse the wording of these general tips: ${Object.values(TIPS).map((t) => `"${t}"`).join(" ")}`;

type Check = { answer: string; quote: string; paragraph: string; reason: string };
type RatingIn = { summary: string | null; reason: string | null; hype_level: string; gaps_level: string; checks: unknown };

export function buildWriteupInput(r: RatingIn) {
  const checks = (r.checks ?? {}) as Record<string, Check>;
  const fam = (codes: string[]) =>
    codes.filter((c) => checks[c]).map((c) => `${c} ${CHECK_NAMES[c] ?? c}: ${checks[c]!.answer} — ${checks[c]!.reason}`).join("\n");
  const codes = (defs: Record<string, { codes: readonly string[] }>) => Object.values(defs).flatMap((d) => [...d.codes]);
  return `Summary: ${r.summary ?? ""}
Reason: ${r.reason ?? ""}
Hype level: ${r.hype_level}/5
Evidence gaps level: ${r.gaps_level}/5

Hype checks:
${fam(codes(HYPE_SECTIONS))}

Evidence gaps checks:
${fam(codes(GAPS_SECTIONS))}

Answer by calling the ${TOOL} tool.`;
}

export const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const sentences = (s: string) => s.trim().match(/[^.!?]+(?:[.!?]+["'\u201D\u2019)]*|$)/g)?.map((x) => x.trim()).filter(Boolean) ?? [];

/** Keeps whole sentences up to the word and sentence limits. */
export function fit(s: string, maxWords: number, maxSentences = 2) {
  const out: string[] = [];
  for (const x of sentences(s).slice(0, maxSentences)) {
    if (words([...out, x].join(" ")) > maxWords) break;
    out.push(x);
  }
  return out.length ? out.join(" ") : (sentences(s)[0] ?? s.trim());
}

const tooLong = (w: WriteupT) => words(w.story_summary) > SUMMARY_WORDS || words(w.our_findings) > FINDINGS_WORDS || sentences(w.story_summary).length > 2;

async function ask(apiKey: string, content: string): Promise<WriteupT | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: RATING_MODEL,
      max_tokens: 800,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      tools: [{
        name: TOOL, description: "Submit the story summary and our findings.",
        input_schema: { type: "object", properties: { story_summary: { type: "string" }, our_findings: { type: "string" } }, required: ["story_summary", "our_findings"] },
      }],
      tool_choice: { type: "auto" },
      messages: [{ role: "user", content }],
    }),
  });
  if (!res.ok) { console.error("writeup", res.status, await res.text().catch(() => "")); return null; }
  const body = (await res.json().catch(() => null)) as { stop_reason?: string; content?: { type: string; name?: string; input?: unknown }[] } | null;
  if (body?.stop_reason === "max_tokens") return null;
  const tool = body?.content?.find((c) => c.type === "tool_use" && c.name === TOOL);
  const parsed = Writeup.safeParse(tool?.input);
  return parsed.success ? { story_summary: parsed.data.story_summary.trim(), our_findings: parsed.data.our_findings.trim() } : null;
}

export async function makeWriteup(r: RatingIn): Promise<WriteupT | null> {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) return null;
  const input = buildWriteupInput(r);
  let w = await ask(apiKey, input);
  if (!w) return null;
  if (tooLong(w)) {
    const again = await ask(apiKey, `${input}\n\nYour last answer was too long. story_summary must be at most ${SUMMARY_WORDS} words and our_findings at most ${FINDINGS_WORDS} words, 2 sentences each. Shorten them.`);
    if (again) w = again;
  }
  return { story_summary: fit(w.story_summary, SUMMARY_WORDS), our_findings: fit(w.our_findings, FINDINGS_WORDS) };
}

/** Generates and saves the write-up for one rating. Never throws. */
export async function saveWriteup(ratingId: string) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: r } = await supabaseAdmin.from("ratings").select("summary, reason, hype_level, gaps_level, checks, writeup").eq("id", ratingId).maybeSingle();
    if (!r) return false;
    const w = await makeWriteup(r);
    if (!w) return false;
    // Older write-ups keep their unused fields; only the two shown texts are replaced.
    const old = (r.writeup ?? {}) as Record<string, unknown>;
    const { error } = await supabaseAdmin.from("ratings").update({ writeup: { ...old, ...w } as never }).eq("id", ratingId);
    return !error;
  } catch (e) {
    console.error("writeup", e);
    return false;
  }
}
