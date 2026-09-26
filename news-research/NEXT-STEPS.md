# Next step: where and how to save your news articles

## Do this

1. **Save articles to GitHub, not the chat, and use a new PRIVATE repo.** Your current repo `LeylaTurk/AI-Builders-Conference` is **public** (checked 26 Sep 2026). Anyone can read it, so full article text (especially NYT, which is behind a paywall) must not go there.
2. **Use plain text, not Word or PDF.** Copy the article text, paste it into the template (`article-template.md`), and save it as a `.md` file directly on github.com. You don't need to download anything.
3. **Start with 8 articles:** 4 to build with and 4 held back for testing. Keep the 4 held-back ones off GitHub for now. The ~20 feed cards will come from RSS automatically, so you don't copy those by hand.
4. The public repo only gets a list of links and details (no article text). That's safe to share.

---

## Exact steps

### Step 1: Create the private articles repo (one time, about 3 minutes)
1. Go to https://github.com/new
2. Repository name: `ai-news-articles`
3. Choose **Private**. This matters.
4. Tick **"Add a README file"**.
5. Click **Create repository**.
6. Tell Claude: *"I made the private repo LeylaTurk/ai-news-articles, please attach it."* Claude can then read it in any future session.

### Step 2: Save each article (about 3–5 minutes each)
1. Open the article in your browser. For NYT, make sure you're logged in so you see the whole article.
2. Optional but helpful: turn on the browser's **Reader view** (Safari: the "Aa" button; Firefox: the page icon in the address bar; Chrome: menu → "Reading mode"). It hides the ads.
3. In the private repo on github.com, click **Add file → Create new file**.
4. In the file-name box, type `articles/` (GitHub creates the folder by itself), then the name, e.g. `articles/2026-09-20_nyt_openai-jobs-study.md`
5. Open `article-template.md` (in this folder), copy everything below "COPY FROM HERE", and paste it into the big box.
6. Fill in the header lines (headline, outlet, author, date, URL, and so on).
7. Select the article text on the news site, copy it, and paste it under **ARTICLE TEXT**. **Don't change any wording**, not even typos. The app has to quote it exactly.
8. Scroll down and click **Commit changes** → **Commit changes** again.
9. Add one row to `article-index.csv` (see Step 3).

**If copy-paste comes out messy** (for example, the text is broken into pieces or the site blocks copying), use the browser's **Print → Save as PDF** from Reader view. Upload it with **Add file → Upload files** into `snapshots/`, using the same name ending in `.pdf`. Still fill in the `.md` header, and write "text in PDF snapshot" under ARTICLE TEXT. The PDF is only a backup; `.md` is the main format.

### Step 3: Keep a simple list (`article-index.csv`)
Create it once in the private repo (**Add file → Create new file**, name `article-index.csv`) with this first line:

```
file,headline,outlet,published,url,access,set,category,saved_on
```

For each article, add one line underneath, for example:

```
2026-09-20_nyt_openai-jobs-study.md,"AI can do 40% of tasks, study says",New York Times,2026-09-20,https://www.nytimes.com/...,subscription,dev,unsupported optimism,2026-09-26
```

(Put quotation marks around a headline if it contains a comma.) GitHub shows this file as a neat table. Because it has only links and details, a copy can go in the public repo later.

### Step 4: The 4 held-back ("holdout") articles
Save them with the same template, but **in a folder on your own computer** (e.g. `Documents/holdout-articles/`, or in Google Drive), not on GitHub yet. That way no agent can see them while building, and the test stays fair. You'll upload them when it's time to test the ratings.

### Step 5: Tell Claude when you're done
Say: *"8 articles are saved (4 in ai-news-articles, 4 held back). Please read the dev set and draft reference ratings."*

---

## Which 8 articles to pick

The brief asks for a mix. Use the two link lists (`local-us-news.md`, `national-us-news.md`) and choose:

| # | Category | What it looks like | Set |
|---|---|---|---|
| 1 | Supported alarming | A serious AI risk, well sourced (e.g. a documented harm with named evidence) | dev |
| 2 | Unsupported optimism | "AI will cure / transform / replace..." based on a company claim or tiny study | dev |
| 3 | Calm overstatement | Sober tone, but the headline claims more than the study shows | dev |
| 4 | Shared source, outlet A | Story based on a press release or report... | dev |
| 5 | Shared source, outlet B | ...the **same** press release/report covered by a different outlet | holdout |
| 6 | Supported alarming (second) | Another well-supported warning | holdout |
| 7 | Unsupported optimism or hype (second) | Another overexcited story | holdout |
| 8 | Access failure | The article's main source is paywalled, missing or a dead link | holdout |

Tips:
- Mix outlets: roughly half free sites and half NYT, plus at least one local story.
- Choose articles from the last few weeks that link to a study, report or press release. The app has to follow those links.
- Save 1–2 **spares** (Set: `spare`) in case one doesn't work out.
- Stories saved to fill the app's archive use Set: `archive`. An agent may save these from free news sites with the same template: it writes `Saved by: agent`, marks its Category as `(suggested)` for you to confirm, and leaves "My quick notes" empty.

---

## Folder layout

**Private repo `LeylaTurk/ai-news-articles`** (full text is allowed here):
```
ai-news-articles/
├── README.md
├── article-index.csv            one row per article
├── articles/
│   ├── 2026-09-20_nyt_openai-jobs-study.md
│   ├── 2026-09-18_apnews_school-ai-surveillance.md
│   └── ...
└── snapshots/                   optional PDF backups, same names
    └── 2026-09-20_nyt_openai-jobs-study.pdf
```

**Public repo `LeylaTurk/AI-Builders-Conference`** (no article text):
```
news-research/
├── NEXT-STEPS.md                this file
├── article-template.md
├── local-us-news.md             link lists
└── national-us-news.md
```

**Your computer / Drive:** `holdout-articles/` with the 4 held-back `.md` files.

### File naming rule
`YYYY-MM-DD_outlet_short-slug.md`
- Date = the date the article was **published** (not when you saved it).
- Outlet = short lowercase code: `nyt`, `wapo`, `apnews`, `reuters`, `guardian`, `npr`, `axios`, `verge`, or the local paper's short name.
- Slug = 3–5 lowercase words joined by hyphens, with no spaces or special characters.

---

## Why this way

- **Why GitHub rather than the chat?** Files you upload into a chat are only available in that one conversation. A new session can't see them, and neither can the other agents. The repo stays put, keeps a history, and every agent can read it.
- **Why private?** Your repo is public. Posting the full text of NYT articles (paid content) or other outlets' articles publicly would break copyright and the NYT's terms of use. The brief also says to "retain only necessary content" and use "short attributed excerpts and links." A private repo is for your own research use. What the public sees, and what the app shows, stays limited to links, short quotes and your own summaries.
- **Why plain text and not Word or PDF?** The app's "Behind the Claim" section has to quote passages **exactly** as they appear in the article. Plain text keeps the exact words and is instantly readable by any agent. Word adds hidden formatting and extra steps. "Print to PDF" pages often include ads, menus, and text split across columns or pages, which garbles quotes. The template header also records the headline, byline, date and URL in the same place every time.
- **Why keep 4 back?** If the agents never see the test articles, you can honestly check whether the ratings work on new stories. That's what judges and testers will care about.
- **Why only 8 by hand?** The live feed (~20 cards) is pulled automatically from two RSS sources. Your hand-saved articles are for **calibrating** the ratings, not for filling the feed.
