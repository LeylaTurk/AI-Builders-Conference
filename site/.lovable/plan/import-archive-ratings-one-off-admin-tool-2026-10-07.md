# Import archive ratings (one-off admin tool)

Load the 55 ratings in archive-ratings.json into the site without calling the AI or using the daily cap.

## What you'll see in /admin
- A new "Import ratings" box with a file picker and an "Import" button (admin only).
- After it runs, a report with:
  - Imported (headline + outlet)
  - Skipped: already on the site (same address, ignoring tracking bits like utm_)
  - Level differences: where our scoring gives a different Hype or Evidence gaps level than the file says (both shown)
  - Quotes that failed checking (check code + headline)
- Imported ratings show up in the existing list as "live, not reviewed", with the usual "Mark as reviewed" and "Withdraw" buttons.

## What happens for each story
1. Skip if its address already exists.
2. Save the article with source "archive" and its published date. Text and links stay private like all other articles.
3. Work out the ratings from the file's raw answers with the existing scoring code (source rules, Hype, Evidence gaps, quote checks, "partly checked"). The levels written in the file are only used for the mismatch report.
4. Save it as live: "AI rating, not yet reviewed".
5. Save the file's story-page write-up as is (no new write-up generated). Quote IDs like "H1" point to that check's quote, shown only if it passed checking — same as today.
6. Stories sort by their published date, so they sit below today's feed stories.

## Not changing
Rating prompt, answer format, scoring files, the feed, the story page layout.

## Technical details
- New `importArchiveRatings` server function in `src/lib/admin.functions.ts` (requireSupabaseAuth + assertAdmin); logic in new `src/lib/archive-import.server.ts`.
- Validate input with zod (max ~200 items); file read in browser and sent as JSON.
- URL normalisation reuses the feed's tracking-parameter stripping; compare against existing `articles.url`.
- Scoring: `applySourceRules(raw.checks, raw.main_source.status)`, `rateHype`, `rateGaps`, `verifyQuote`, `partlyChecked` — same shape as the insert in `runRating`, model recorded as "archive import", tokens null, status "live".
- Set `published_at` from `published_date` so home-page sorting uses it; `import_status` left normal so they appear in the feed list.
- No cap check, no Anthropic call, no `saveWriteup`.
