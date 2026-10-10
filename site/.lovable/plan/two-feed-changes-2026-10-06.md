# Two feed changes

## 1. Hide unreadable stories from the home page
- The home page feed leaves out articles with status "insufficient". It still shows the latest 30 of the remaining stories.
- The /admin Feed list keeps showing them as "insufficient".
- If someone opens a story page directly, it still shows "Insufficient evidence to rate" with the grey meters.

## 2. Check that a story is about AI before rating it
- Words that count: artificial intelligence, AI, chatbot, machine learning, large language model, algorithm, generative, ChatGPT, Claude, Gemini, OpenAI, Anthropic, facial recognition.
- Each word must appear on its own, so "said" does not count as "AI". "AI" must be in capitals. The other words can be in any case, and plurals like chatbots and algorithms count.
- The check reads only the headline and the feed's summary.
- At import, a story that doesn't match gets the status "skipped: not about AI". It is not rated automatically and does not appear on the home page.
- In the /admin Feed list it shows as "skipped: not about AI", and the "Rate now" button still works to override.
- Stories already imported and not yet rated get the same check once. Stories marked "insufficient", stories you skipped by hand, and stories that already have a rating stay as they are.

## Technical details
- New import status value `skipped_not_ai`. In `feeds.server.ts`, a shared `mentionsAI(headline, summary)` sets it during import. The current ProPublica pre-filter stays as it is.
- `public.functions.ts` `listFeed`: filter the feed query with `import_status not in ('insufficient','skipped_not_ai')` before the limit of 30. `getStory` is unchanged.
- `admin.functions.ts` `listFeedArticles`: map `skipped_not_ai` to "skipped: not about AI". `rateQueued` already picks only `new` articles, so skipped ones are left out.
- One-time backfill (data update): set `skipped_not_ai` on feed articles with status `new`, no ratings, and no match. Match `\mAI\M` case-sensitively and the other words case-insensitively with word boundaries, using the headline and summary (deck).
