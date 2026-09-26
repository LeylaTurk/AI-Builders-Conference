# Article backlog

> **The backlog now lives in the private repo [`LeylaTurk/ai-news-articles`](https://github.com/LeylaTurk/ai-news-articles)** (decided 26 Sep). Don't put article text in this public repo. Files go in `articles/` there, named `YYYY-MM-DD_outlet_short-slug.md`, with one row per article in `article-index.csv`. This folder keeps the wishlist and these notes.

Articles Leyla collects by hand before the sprint. They serve two purposes:

1. **Calibration:** Leyla rates them manually; the AI's ratings are compared against hers (see `prep/05_rating_research.md`).
2. **Launch content:** rated articles that may be **published** give the app a starting archive alongside the live feed. They don't replace the connected feed.

## Folders (superseded: use the private repo)

The split below still applies, but mark it in each file in the private repo instead of using folders here.

| Folder | What goes in | Published in the app? |
| --- | --- | --- |
| `inbox/` | Press releases, company announcements, The Conversation, ProPublica, and other sources whose terms allow reuse | Yes, as ratings with short quotes and a link |
| `private/` | Big-outlet articles (CNN, NYT, Bloomberg…) used **only** to test the rubric | **Never** |

## How to add an article

1. Copy `TEMPLATE.md` into the right folder, named like `2026-09-26-northwestern-pathology.md`.
2. Fill in the details at the top, especially the **link**, **type** and **related sources**.
3. Paste the article text under "Article text", or save the page as a PDF with the same name next to it.
4. If the article cites a study, press release or announcement, add its link under `related_sources`, and save it too if you can: Behind the Claim needs it.

`wishlist.md` lists the articles to collect first.
