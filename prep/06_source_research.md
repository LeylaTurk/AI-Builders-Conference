# Research: can the app use the biggest news outlets?

**AI, Seriously? · preparation research · 25 September 2026 · first pass**

**Question:** can the feed include major outlets (WIRED, CNN, BBC, MS NOW, Fox News, Reuters, AP and similar) and have AI rate their articles?

**Method:** web searches only; the news sites themselves are blocked from this session. Nothing below is legal advice. Items marked **(verify)** need the actual terms page. The Guardian was checked from its terms ([05](05_rating_research.md), section 5).

## Outlet by outlet

| Outlet | Public feed? | What its terms or actions say about AI use | Verdict for this app |
| --- | --- | --- | --- |
| **The Guardian** ✓ checked | RSS and API | Terms clause 6(g) forbids AI analysis, text and data mining and bots on its API, website **and RSS feeds**. | **No** |
| **Reuters** | **No:** public RSS feeds stopped in June 2020 ([FiveFilters](https://www.fivefilters.org/2021/reuters-rss-feeds/)) | Content licensed commercially (Reuters Connect); site terms prohibit commercial copying without consent ([Thomson Reuters terms](https://www.thomsonreuters.com/en/terms-of-use)) (verify). | **No**, unless licensed |
| **Associated Press** | **No** official RSS; third-party tools scrape it into feeds ([GitHub example](https://github.com/rererecursive/associated-press-rss)) | Licenses content to AI companies (OpenAI deal, 2023) ([Fortune](https://www.fortune.com/2023/07/13/openai-associated-press-licensing-archive-news-stories-chatgpt)); scraping would bypass that. | **No**, unless licensed |
| **CNN** | Some RSS | Blocks OpenAI's crawler; **sued Perplexity in 2026** for scraping and reproducing articles ([Tech Startups](https://techstartups.com/2026/05/28/perplexity-sued-by-cnn-over-alleged-ai-powered-content-scraping/)). Terms ban automated systems ([CNN terms](https://www.cnn.com/terms)) (verify AI clause). | **No** |
| **WIRED** (Condé Nast) | RSS | Condé Nast licenses to OpenAI and is a plaintiff in the Cohere case over AI summaries ([Copyright Lately](https://copyrightlately.com/court-rules-ai-news-summaries-may-infringe-copyright/)). | **No** without permission (verify terms) |
| **Fox News** | RSS | Terms prohibit copying, data mining or scraping content, including for AI training, without express permission ([Fox terms](https://www.foxnews.com/terms-of-use)). | **No** |
| **BBC** | RSS | RSS terms reportedly allow use on a **personal** website only, with prescribed attribution (verify at [bbc.co.uk/terms](https://www.bbc.co.uk/terms)). | **Unlikely** (verify) |
| **MS NOW** (formerly MSNBC; renamed 15 Nov 2025, now part of Versant) | Unclear | Terms not found in search ([announcement](https://www.ms.now/news/msnbc-changing-name-ms-now-rcna225560)). | **Unknown** (verify) |
| **TechCrunch** | RSS with its own [RSS terms](https://techcrunch.com/rss-terms-of-use) | Display feed content only, with attribution and a link; no modification; can revoke any time. Nothing found about AI analysis (verify). | **Headlines and links only**, at best |
| **New York Times** | RSS | Terms prohibit using content for AI without written permission; blocks AI crawlers ([Harvard TagTeam](https://tagteam.harvard.edu/hub_feeds/3415/feed_items/8299220)). | **No** |

**Overall:** a review of 43 major websites' terms found that most explicitly or implicitly prohibit AI use of their content ([Zuva](https://zuva.ai/blog/llm-breach-of-terms-of-use/)). The largest news outlets are also the ones actively suing AI companies (CNN v. Perplexity, publishers v. Cohere, NYT v. OpenAI). **None of the requested outlets clearly permits an app to have AI read and rate their articles.**

**Why it matters beyond legal risk:** 15% of the judging score is responsible design, including data use. An app about honest, transparent AI that quietly breaks publishers' terms would undercut its own message.

## Sources that do allow reuse

| Source | Licence | Key conditions | AI coverage |
| --- | --- | --- | --- |
| **The Conversation** ✓ checked | CC BY-ND | No edits; credit; page counter; select articles, not all; extracts and quotes allowed with a link. | Regular AI coverage by academics |
| **ProPublica** | CC BY-NC-ND ([Steal Our Stories](https://www.propublica.org/steal-our-stories)) | Credit line at top; **select stories individually, not automatically**; no edits; non-commercial; no syndication to platforms. | Occasional, investigative |
| **Official announcements**: AI company blogs and press releases, university press releases | Varies (verify each) | Press releases are written to be republished. | High, and they're **where hype often starts** (Sumner et al. found most news exaggeration was already in the press release) |

## Ways to include big outlets without breaking their terms

1. **Headline-and-link cards, no AI reading.** Show big-outlet stories as plain cards (headline, publisher, link) and rate only open sources. Needs feeds whose terms allow display; most allow little more than this, and several prohibit even automated access.
2. **"Also covered by" links via GDELT.** The [GDELT Project](https://gdeltproject.org/) is a free, open index of world news (URLs, headlines, outlets, updated every 15 minutes). A rated story could show which major outlets covered the same topic, linking out, without the app fetching their articles. (Check GDELT's terms.)
3. **Rate the source, not the outlet.** Many big-outlet AI stories come from a company announcement or study. Rating the *original announcement* catches hype at its source and needs no publisher permission.
4. **Ask permission.** Email licensing teams, explaining a free, non-commercial, educational project. Possible, but unlikely to be answered before 6 October.
5. **Reader-initiated checks** (the "Later" browser extension). The reader's own browser reads the article they're viewing. It shifts, but doesn't remove, the question. Not for this sprint.
