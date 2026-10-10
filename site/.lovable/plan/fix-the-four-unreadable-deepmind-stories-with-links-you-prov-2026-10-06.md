# Fix the four unreadable DeepMind stories with links you provide

A one-off fix, no new features and no code changes. You paste the four story links in chat; I read those pages and finish the four stories that are stuck at "Insufficient evidence to rate".

## What happens, step by step

1. **You paste the links** — the four DeepMind story pages that wouldn't give up their text (any deepmind.google or blog.google address).
2. **I read each page** with the site's existing page reader, which only ever fetches deepmind.google and blog.google pages. A story needs at least 3 paragraphs and 150 words to count as readable.
   - If a page still can't be read, I'll ask you to paste that article's text instead (the /admin form accepts pasted text).
3. **I update the stored story**: your link becomes the story's link, so "Read the full article" on the site points at the page you found. The text and links are saved, and the story moves from "Insufficient evidence to rate" back to the normal waiting list.
4. **I rate each story** with the existing rating engine (same prompt, answer format and scoring code — untouched). Ratings publish straight away as "AI rating, not yet reviewed" unless a quote fails verification, in which case they wait for you in /admin.
5. **I confirm the result**: you see the four stories rated on the feed, with links pointing to the pages you gave.

## Limits

- Rating spend still counts against the daily cap of 20 ratings. If today's cap is already used, the stories wait in the queue and are rated first thing when it resets — or you can tell me to rate them anyway today.
- Nothing else changes: feed import, admin, design and public access rules stay as they are.
