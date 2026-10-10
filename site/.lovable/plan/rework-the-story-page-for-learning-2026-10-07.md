# Rework the story page for learning

Unchanged: rating prompt, answer format, scores and scoring files, /admin, the feed, Check an article.

## 1. Layout
- One reading column (~760px). Right-hand column removed.
- Order: back link, chip + outlet + date, headline, status line, top box, "Why this rating", "Next time" tip, "Read the full article at [outlet]" button, "Have another article?" box (full width, last).
- "Via MIT News" and "© Microsoft" credits stay.

## 2. Status line
- "Rated by AI, not yet reviewed by Leyla" for live ratings; "Rated [time] · Reviewed by Leyla" for reviewed ones.
- Only when partly checked: "We couldn't open the original source, so we judged the article on its own."

## 3. Top box
- Left (2/3): "Story summary" (2 sentences), "Our findings" (2-3 sentences, no quotes).
- Right (1/3): Hype meter + "Turning it up · 3/5", then Evidence gaps meter + "Major · 4/5" (icons + word + number), and a small link "What do these ratings mean?".
- Phones: summary, findings, then ratings.
- Unrated / insufficient stories: grey meters with words only, and the "Have another article?" box stays right under the top box.

## 4. Why this rating (two boxes)
- Hype box: orange left border, chilli icon, "Hype · [word] · n/5", 2-4 plain sentences with 1-2 short exact quotes in quote style, each with its position (headline, deck or "paragraph 5").
- Evidence gaps box: crimson border, flag icon, same pattern.
- At level 1 (lowest), the box says what the story did well.
- No quote shown twice on the page; the stray double opening quote mark fixed.
- Removed: per-check finding cards, "Show all findings" button, Breakdown box.

## 5. "Next time you read a story like this" tip
- Yellow-tinted box, up to two tips from the fixed text you gave (keyed H1-C4), picked in code from failed checks: Evidence gaps checks first when Evidence gaps is 3/5 or more, otherwise Hype first; within a family, checks in section order (Headline, Strength of evidence, Claims in proportion, Transparency, Context, Wording).
- No failed checks: "This story is a good example: notice how it names its sources" (or "says what's uncertain"), from its strongest passed check; otherwise hidden.

## 6. Story page write-up (new AI step)
- Runs after each rating is saved, same Claude model, key and the shared daily spending cap (one write-up counts as part of its rating, not a separate rating).
- Input: the existing rating only (summary, reason, levels, failed/passed checks with their IDs and verified quotes). The article is not sent again.
- Returns: story_summary, our_findings, hype_text, gaps_text, hype_quote_ids, gaps_quote_ids (1-2 each, no overlap).
- Code inserts quotes by ID, so only verified quotes ever appear, and drops repeats. Microsoft quotes keep the exact-sentence rule and "© Microsoft".
- Saved with the rating. If the write-up fails, the rating still publishes; the page falls back.
- Backfill once now for every rating shown on the site (about 100 live/approved). This uses Claude calls but not the 20-a-day rating cap.
- No write-up yet: top box uses the current summary and reason, the two Why boxes are hidden, the tip still shows.

## Open point
- "How ratings work" page doesn't exist yet. Until it does, the "What do these ratings mean?" link will go to the "Reading the ratings" panel on the feed page (or I can leave it out; say which).

## After it's built
- Open the TechCrunch story and a low-Hype story: check order, right-hand ratings, two Why boxes, tip.
- Phone width: summary, findings, ratings stack.
- No quote appears twice.

## Technical details
- Migration: `ratings.writeup jsonb` (nullable); column GRANT to anon/authenticated only if needed — the page assembles it server-side in `getStory`, so no new public column grant (quotes resolved server-side from verified quotes).
- New `src/lib/writeup.server.ts`: Anthropic call with a tool named in the user message (tool_choice "auto"), zod-validated; called at the end of `runRating` in `rate-article.server.ts` (try/catch, non-blocking for publish); admin/cron backfill script run once.
- `getStory` returns `writeup` with quotes resolved `{text, position, credit}` and `tips: string[]` computed from checks; `findings`/`breakdown` dropped from the page.
- `story.$id.tsx` rewritten; `RatingDetail.tsx` Breakdown/FindingList no longer used on the story page (kept for /check).
