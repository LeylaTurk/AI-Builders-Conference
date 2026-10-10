<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All AI calls go to Anthropic via server functions reading ANTHROPIC_API_KEY inside the handler — keeps the key out of the browser; Lovable AI is not used.
- Claude sonnet 5.5 rejects forced tool_choice; use "auto" and name the tool in the user message — forced choice returns 400.
- Public reads go through src/lib/public.functions.ts with the publishable key; RLS exposes only approved ratings and their articles.
- Feed import lives in src/lib/feeds.server.ts (fixed source list, page fetches only on each source's domain); pg_cron calls /api/public/hooks/feeds with LOVABLE_CRON_SECRET from vault — keeps rating spend behind a server-only secret.
- Public access to articles/ratings/feed_checks is column-level GRANTs; never grant full-table SELECT to anon — publishers' terms forbid sharing full text.
- Story page write-up (plain summary, findings, Why text, quote IDs) is made by src/lib/writeup.server.ts from the saved rating only, after each rating; quotes are resolved by ID in getStory so only verified quotes show.
- No admin page or admin server functions: ratings publish automatically and changes are made directly by the developer; removed to drop the sign-in surface.
- /decode (old /rate and /check redirect) fetches the visitor's link once in src/lib/fetch-article.server.ts (robots.txt, private-IP check per hop, 3 redirects, 10s, 3MB, HTML only), rates it via scoreArticle and returns the extracted text only to that visitor for in-browser markup; nothing but a daily count per hashed visitor code (claim_check) is stored, and unreadable pages never claim a slot — keeps visitor data private and spend capped.
- Feed-story breakdowns (/decode?story=id, src/lib/check.functions.ts decodeStory/storyInfo) use the saved article text only; approved ratings are rebuilt from saved checks with no AI call or slot; other stories run scoreArticle and claim a slot. Auto-start is an in-memory flag (src/lib/decode-intent.ts) and results cache in sessionStorage per tab — so shared/refreshed addresses never spend a breakdown and nothing is stored server-side.
- Rated stories show their sentence-by-sentence breakdown on /story/$id (StoryBreakdown), built from the saved rating and loaded in the browser after the page opens — keeps it instant and keeps article text out of the page sent to search engines.
- Claim Tracker (/claims, /claims/$slug) renders only the static src/content/claims-content.json via src/lib/claims.ts; article cards look up stored stories read-only (matchStoriesByUrl) — editorial content must stay verbatim and never touch the rating engine.
- Decode daily limits and the feed rating cap are read from the settings row (decode_global_cap, decode_visitor_cap, daily_rating_cap) — so they change without code edits.
- /decode link runs in two calls (readLink: fetch/extract, no slot; rateRead: claims slot) and the summary write-up arrives afterwards via an HMAC-signed writeupFor token — shows the article within seconds without a second slot or storing anything. Step timings go to server logs as "[timing]" lines with no links or text.
