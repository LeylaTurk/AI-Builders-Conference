# Four more feed sources

## Feed test (6 Oct, just now)
- Microsoft Source: works (10 items, short summaries; article pages readable).
- Google DeepMind blog: works (100 items, no full text; blog pages readable).
- Meta Newsroom: works (10 items, full text in feed).
- MIT News AI topic: works (50 items, full text in feed).

## What changes
1. **Sources** added to the fixed list, nowhere else is ever fetched:
   - Microsoft: fetch article page; allowed on any *.microsoft.com address only; at least 10 seconds between Microsoft requests; AI filter applies.
   - DeepMind: fetch article page from deepmind.google only; all items count as AI.
   - Meta: feed text only, never fetch Meta pages; AI filter applies.
   - MIT News: feed text only, never fetch MIT pages.
   - If the feed text is too short for Meta/MIT, the story is marked "Insufficient evidence to rate" (no page fetch).
2. **Source types**: Microsoft, DeepMind, Meta = "company announcement about its own product"; MIT News = "press release from the institution that did the study". Still changeable in /admin.
3. **Credit and quote rules** (public story pages):
   - Microsoft: "© Microsoft" shown next to every quote. A quote is only shown if it is a whole sentence found exactly as written in the article; otherwise no quote is shown (finding and reason still appear).
   - MIT News: "Via MIT News" line under the headline, linking to the article.
   - Meta and DeepMind: same short credited quotes as today.
   - Full article text is never shown publicly (unchanged).
4. **Admin**: the new sources appear in the Feed list, in the last-check times and in "Check feeds now" results.
5. **First run**: import the new feeds once, then rate new stories oldest first within today's daily cap; any left over are rated by the hourly job.

Unchanged: rating prompt, answer format, scoring files, existing sources, AI filter, labels, story pages otherwise.

## Note on run time
The 10-second Microsoft gap means a Microsoft import with many new items takes a few minutes. To stay within the scheduled job's time limit, Microsoft page reads are capped per run (about 10); the rest are picked up at the next 3-hourly check.

## Technical details
- `feeds.server.ts`: extend `FeedSource` with `domains` (suffix match), `fetchPages: boolean`, `delayMs`; add the four sources; `onDomain` accepts subdomains (e.g. news.microsoft.com, blogs.microsoft.com).
- `public.functions.ts`: pass a per-source quote policy to findings; for `microsoft`, keep a quote only if it equals a full sentence in the stored paragraphs (server-side check, paragraphs never returned); add `credit` field ("© Microsoft") and `via` ("MIT News").
- `story.$id.tsx` / `RatingDetail.tsx`: render credit after quotes and the "Via MIT News" link under the headline.
- Admin source labels map gets the four new keys.
- No database change needed (source is free text).
