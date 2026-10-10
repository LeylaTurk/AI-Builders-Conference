# "How the ratings work" page

A new public page at `/how-ratings-work` that explains the two scales, the 21 checks and how the score is calculated. Nothing about scoring, the prompt, the feed, limits or the breakdown changes.

## Checked against the code

I read the rating prompt and the scoring code. Almost everything in your brief matches. These points differ or need a decision:

1. **Evidence gaps safety rule.** The code raises Evidence gaps to at least 4 only when the **Strength of evidence** group is at level 5, not "the evidence" in general. I'll write: "If the Strength of evidence group is at level 5, Evidence gaps is at least 4."
2. **Not enough groups.** When fewer than two groups count, the code gives no number and the story shows "Insufficient evidence to rate". Your brief says "At least two groups must count" but not what happens otherwise. I'll add: "If fewer than two count, the story is marked 'Insufficient evidence to rate'."
3. **The code fixes some answers automatically.** It forces T4 ("Main source not linked") and P1 ("Sounds surer than the source") based on whether the main source was linked and could be read. For example, an unlinked source always counts as T4 not met. Your brief doesn't mention this. I'd add one plain line to Step 1: "A couple of answers are set automatically: if the article doesn't link its main source, that check counts as not met, even if the source is easy to find." Say if you'd rather leave it out.
4. **"Doesn't apply" vs "couldn't be checked".** This matches the code. Both are left out of the count, and a group needs at least two met or not-met answers.
5. **There is no site footer yet.** I'll add a small one to every page with just the "How the ratings work" link.
6. **These all match exactly, so no changes:** the level words (Grounded to Off the charts, None to Unsupported), all 21 problem names, the share-to-level thresholds (100 / 75 / 50 / 25 %), half-rounds-down, the Headline rule and all five checklist rules (each one is in the prompt). The worked example is also correct: 1 of 3 met gives 4, 2 of 3 gives 3, 2 of 2 gives 1, and the average of 2.67 rounds to 3.

## Page content (in order)

- Heading, intro and an "On this page" list of links that wraps on phones.
- The short version, Why two ratings, Hype scale table, Evidence gaps scale table: all with your exact wording. The tables use the real chilli and flag meters and turn into stacked cards on phones.
- The 21 checks: six group cards. Each check has a plain question written from the prompt's wording, the breakdown's problem name, and a small grey code. Then the five checklist rules.
- How the checklist becomes a rating: the four steps, the threshold table and the worked example card, plus the closing line.
- Each section has its own anchor (`#short-version`, `#two-ratings`, `#hype`, `#evidence-gaps`, `#checks`, `#calculation`).

## Links

- Footer on every page: "How the ratings work".
- Reading the ratings box on the feed: keep everything and add a last line, "How the ratings work →".
- Story page: "What do these ratings mean?" now opens `/how-ratings-work`.
- Not added to the top menu.

## Technical details

- New route `src/routes/how-ratings-work.tsx`. It's a static page with its own title and description, open to search engines, with no database or AI calls.
- Reuses the existing meters from `RatingIcons.tsx`. Level words come from `HYPE_WORDS`/`GAPS_WORDS` and problem names from the existing label map, so they can't drift. Check codes come from `HYPE_SECTIONS`/`GAPS_SECTIONS` (read only, never edited).
- Reading column of 728px, white cards, and `scroll-mt` on each section. Smooth scrolling only when reduced motion is off.
- New `SiteFooter` rendered in `__root.tsx`.
