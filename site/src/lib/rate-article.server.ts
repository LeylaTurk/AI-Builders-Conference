import { RATING_PROMPT } from "@/lib/rating/rating-prompt";
import { RATING_SCHEMA } from "@/lib/rating/rating-schema";
import {
  applySourceRules,
  partlyChecked,
  rateGaps,
  rateHype,
  verifyQuote,
  type Checks,
  type SourceStatus,
} from "@/lib/rating/scoring";

export const RATING_MODEL = "claude-sonnet-5-5";
const TOOL_NAME = "submit_rating";

type ArticleRow = {
  id: string;
  headline: string;
  deck: string | null;
  source_type: string;
  paragraphs: unknown;
  links: unknown;
  main_source_text: string | null;
};

type Link = { text: string; url: string };

export function buildMessage(a: Omit<ArticleRow, "id">): string {
  const paragraphs = (a.paragraphs as string[]) ?? [];
  const links = (a.links as Link[]) ?? [];
  const parts: string[] = [];
  parts.push(`Source type: ${a.source_type}`);
  parts.push(`Headline: ${a.headline}`);
  parts.push(a.deck?.trim() ? `Deck: ${a.deck.trim()}` : "Deck: (none)");
  parts.push(`The article:\n${paragraphs.map((p, i) => `[${i + 1}] ${p}`).join("\n\n")}`);
  parts.push(
    `Links in the article:\n${links.length ? links.map((l) => `- ${l.text} | ${l.url}`).join("\n") : "(none)"}`,
  );
  parts.push(
    a.main_source_text?.trim()
      ? `Main source text:\n${a.main_source_text.trim()}`
      : "Main source text is not available.",
  );
  return parts.join("\n\n");
}

type ClaudeAnswer = {
  main_source: { status: SourceStatus };
  checks: Checks;
  claim_type: string;
  summary: string;
  reason: string;
  other_observations: string[];
};

// Runs the full rating for one article and saves a pending rating. Caller must already be verified as admin.
export async function runRating(articleId: string): Promise<{ ratingId: string } | { error: string }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: settings } = await supabaseAdmin.from("settings").select("daily_rating_cap").eq("id", 1).single();
  const cap = settings?.daily_rating_cap ?? 20;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const { count } = await supabaseAdmin
    .from("ratings")
    .select("id", { count: "exact", head: true })
    .gte("created_at", today.toISOString());
  if ((count ?? 0) >= cap) {
    return { error: `Daily limit reached: ${cap} ratings have already been made today (UTC). Try again tomorrow.` };
  }

  const { data: article, error: aErr } = await supabaseAdmin.from("articles").select("*").eq("id", articleId).single();
  if (aErr || !article) return { error: "Article not found." };
  // A headline or feed summary alone never gets a rating.
  if (article.import_status === "insufficient" || !((article.paragraphs as string[]) ?? []).length) {
    return { error: "Insufficient evidence to rate: the article text couldn't be read." };
  }

  const scored = await scoreArticle(article);
  if (scored.error !== undefined) return { error: scored.error };
  const { raw, body, status, checks, overrides, hype, gaps, quotesVerified, partly, allQuotesFound } = scored;

  const { data: last } = await supabaseAdmin
    .from("ratings")
    .select("version")
    .eq("article_id", articleId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();

  const u = body?.usage ?? {};
  const inputTokens = (u.input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0);

  const { data: saved, error: sErr } = await supabaseAdmin
    .from("ratings")
    .insert({
      article_id: articleId,
      version: (last?.version ?? 0) + 1,
      model: RATING_MODEL,
      raw_answers: raw as never,
      checks: checks as never,
      overrides: overrides as never,
      source_status: status,
      hype_level: String(hype.level),
      hype_sections: hype.sections as never,
      headline_rule_applied: hype.ruleApplied,
      gaps_level: String(gaps.level),
      gaps_sections: gaps.sections as never,
      safety_rule_applied: gaps.ruleApplied,
      partly_checked: partly,
      claim_type: raw.claim_type,
      summary: raw.summary,
      reason: raw.reason,
      other_observations: (raw.other_observations ?? []) as never,
      quotes_verified: quotesVerified as never,
      input_tokens: inputTokens,
      output_tokens: u.output_tokens ?? null,
      status: allQuotesFound ? "live" : "pending",
    })
    .select("id")
    .single();
  if (sErr || !saved) {
    console.error(sErr);
    return { error: "Could not save the rating." };
  }
  // Story page write-up; a failure never blocks the rating.
  const { saveWriteup } = await import("@/lib/writeup.server");
  await saveWriteup(saved.id);
  return { ratingId: saved.id };
}

// Calls Claude and applies the scoring code. Saves nothing.
export async function scoreArticle(article: Omit<ArticleRow, "id">) {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) return { error: "ANTHROPIC_API_KEY is not set." };

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: RATING_MODEL,
      max_tokens: 8000,
      system: [{ type: "text", text: RATING_PROMPT, cache_control: { type: "ephemeral" } }],
      tools: [{ name: TOOL_NAME, description: "Submit the checklist answers.", input_schema: RATING_SCHEMA }],
      // This model only allows tool_choice "auto", so the prompt names the required tool.
      tool_choice: { type: "auto" },
      messages: [{ role: "user", content: `${buildMessage(article)}\n\nAnswer by calling the ${TOOL_NAME} tool.` }],
    }),
  });
  const body = (await res.json().catch(() => null)) as
    | {
        error?: { message?: string };
        stop_reason?: string;
        content?: { type: string; name?: string; input?: unknown }[];
        usage?: { input_tokens?: number; output_tokens?: number; cache_read_input_tokens?: number; cache_creation_input_tokens?: number };
      }
    | null;
  if (!res.ok) return { error: body?.error?.message ?? `Claude request failed (${res.status})` };
  if (body?.stop_reason === "refusal") return { error: "Claude declined to rate this article." };
  if (body?.stop_reason === "max_tokens") return { error: "Claude's answer was cut off (8000 token limit)." };
  const tool = body?.content?.find((c) => c.type === "tool_use" && c.name === TOOL_NAME);
  if (!tool?.input) return { error: "Claude did not return a rating." };
  const raw = tool.input as ClaudeAnswer;
  // Incomplete answers (missing source status or checks) are rejected, never guessed.
  const rawChecks = raw?.checks as Record<string, { quote?: unknown } | undefined> | undefined;
  if (
    !raw?.main_source?.status ||
    !rawChecks ||
    typeof rawChecks !== "object" ||
    Object.values(rawChecks).some((c) => !c || typeof c.quote !== "string")
  ) {
    return { error: "Claude's answer was incomplete." };
  }

  const status = raw.main_source.status;
  const { checks, overrides } = applySourceRules(raw.checks, status);
  const hype = rateHype(checks);
  const gaps = rateGaps(checks);
  const art = { headline: article.headline, deck: article.deck ?? "", paragraphs: article.paragraphs as string[] };
  const quotesVerified: Record<string, boolean> = {};
  for (const [code, c] of Object.entries(checks)) quotesVerified[code] = verifyQuote(c.quote, c.paragraph, art);
  const partly = partlyChecked(checks, status);
  // Publish straight away ("live") unless a quote wasn't found in the article; then keep it pending for review.
  // Errors, cut-off answers and unreadable articles never reach this point, so they are never published.
  const allQuotesFound = Object.values(quotesVerified).every(Boolean);

  return { raw, body, status, checks, overrides, hype, gaps, quotesVerified, partly, allQuotesFound };
}
