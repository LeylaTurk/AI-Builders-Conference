# Assessment: private development demo with headlines and links

**AI, Seriously? · 25 September 2026 · not legal advice**

**The use assessed:** a development demo that shows each outlet's **headline**, publisher and time, with a **link to the original article**. No article text, no summaries, no AI analysis of the outlets' content. If AI ratings are added, the AI clauses in [06](06_source_research.md) apply again and this assessment no longer holds.

**How reliable each clause is:**
- **✓ verbatim**: quoted from the terms themselves (PDFs in `prep/sources/`).
- **Reported**: wording taken from search-result summaries of the terms page, because this session can't open the sites. It could be paraphrased or out of date. **Save these pages as PDFs to confirm.**
- **Not found**: no terms located.

## Three deployment situations

| | **Local development demo** | **Privately hosted deployment** | **Public deployment** (the challenge submission) |
| --- | --- | --- | --- |
| What it is | Runs on your own computer (`localhost`). Only you see it, or others see it over a screen share. | Runs on a server (e.g. Vercel) at a real web address, restricted to invited people by **login or password**. | An open web address anyone can visit, with no login. |
| Is content "published" to others? | No | Yes, to a limited group | Yes, to everyone |
| Is the server storing copies? | Only on your computer | Yes | Yes |
| Typical "personal use" RSS terms | Generally fits | Harder to argue: other people use it | Doesn't fit "personal" terms |
| Free developer API plans | Usually allowed; this is what they're for | Often **not** allowed (see NewsAPI below) | Needs a paid or production plan |

Two cautions:
- **"Unlisted" isn't private.** A secret URL without a password is effectively public.
- **The challenge requires a public link reviewers can open without logging in.** A private deployment can only be a testing stage; the submitted app must meet the public-deployment terms.

## Outlet by outlet

| Source | Restricting clause(s) | Local demo, headlines + links | Privately hosted | Permitted developer API or feed |
| --- | --- | --- | --- | --- |
| **The Guardian** | ✓ verbatim: **3(a)(i)** "Apply for a separate API key for each website through which you wish to access OP and on which you will publish OP Content" · **4(b)** "up to 500 requests for OP Content per API key per day" · **5** "you must not keep any OP Content for longer than 24 hours" · **6(b)(i)** "Retain the full headline, byline and copyright notice" · **6(b)(iv)** "Include a link to the original article" · **6(b)(vi)** "Include a 'Powered by The Guardian' logo" · **6(c)(vi)** don't "use headlines… to create links to any content other than the full text of the underlying article" · **6(g)(i)(B)** not "for any text and data aggregation, analysis or mining purposes" · **6(g)(ii)** no "bot… or other automated device, program… with the Content API" · **7(a)** end users "strictly for their personal and non-commercial use only" | **Unclear.** Showing headlines with links is what the Content API is for, but 6(g)(i)(B) ("text and data **aggregation**") and 6(g)(ii) (any automated program), read literally, cover a headline aggregator. | **Unclear**, same reason, plus: its own registered key, the logo, full headline and byline, and a 24-hour refresh. | **Content API, Developer key** ([open-platform.theguardian.com](https://open-platform.theguardian.com/)), but **get written confirmation** from licensing@theguardian.com that a headline-and-link demo isn't "aggregation" under 6(g). Don't use their RSS: 6(g) covers the whole "Guardian Digital Network", which it defines to include RSS feeds. |
| **The Conversation** | ✓ verbatim: "Extracts: you can run the first few lines or paragraphs of the article and then say: 'Read the full article on The Conversation' with a link back" · "You can't systematically republish all of our articles" (applies to full articles) · "Commercial, non-journalism usage: license fees may apply" | **Permitted.** Headlines and links aren't republishing articles. | **Permitted** on the same basis. Stay non-commercial. | Their RSS feeds (topic feed URL to confirm) |
| **CNN** | Reported (CNN RSS page): "a free service offered for **non-commercial use**" · "You must use the RSS feeds as provided… you may not edit or modify the text, content or links" · usable "only with those platforms from which a functional link is made available that… takes the viewer directly to the display of the full article on the CNN Site" · no advertising "associated with or targeted towards the RSS Content" | **Fits**, provided headlines are unedited, links go directly to CNN, and there are no ads. | **Likely fits** if non-commercial and ad-free: the wording says non-commercial, not personal. Verify. | **CNN RSS** ([cnn.com/services/rss](https://www.cnn.com/services/rss/?no_redirect=true)) |
| **Fox News** | Reported (Fox RSS page): "free headlines for **personal, non-commercial use**" · "only with platforms with a functional link which takes the viewer directly to the full article" · "You may not insert any intermediate page, splash page or any other content between the RSS link and the applicable article" · Fox may require you "to cease distributing any or all of the feeds at any time" | **Fits** "personal, non-commercial". | **Questionable**: other people using it is hard to call "personal". Verify or ask. **Design note:** the headline must link straight to Fox; an app page in between breaks the intermediate-page clause. | **Fox News RSS** ([foxnews.com/story/foxnews-com-rss-feeds](https://www.foxnews.com/story/foxnews-com-rss-feeds)) |
| **TechCrunch** | Reported ([RSS terms](https://techcrunch.com/rss-terms-of-use)): may "only display the content that is provided in the feed, with attribution to TechCrunch" and "must link to the full article" · no advertising incorporated into the feed · may not "remove attribution or links, or otherwise modify feed content" · may be required to cease at any time | **Fits** | **Likely fits**: no personal-use limit reported. Verify. | **TechCrunch RSS** |
| **New York Times** | Reported: all APIs other than Campaign Finance, Congress and NY State Legislature are "strictly limited to **non-commercial, non-competing** use"; must follow the Branding and Attribution guidelines ([API specs](https://github.com/nytimes/public_api_specs)). General site terms reportedly exclude from "non-commercial use" "the development of any software program" ([Harvard TagTeam](https://tagteam.harvard.edu/hub_feeds/3415/feed_items/8299220)) | **Use the API, not the site or RSS**: the API terms govern. Likely fits with attribution. | **Likely fits** as non-commercial with attribution. Read the API terms first. | **NYT Top Stories API or Article Search API** ([developer.nytimes.com](https://developer.nytimes.com)) |
| **BBC** | **Not found** (current terms). Historic reports: RSS licensed for "personal use", later expanded so outside sites could "take our headlines" ([Wikinews, 2008](https://en.wikinews.org/wiki/BBC_News_website_expands_RSS_license_terms_to_allow_commercial_use)). | **Probably fits** (personal use) | **Unknown**: needs the current terms | BBC News RSS (feed list at bbc.co.uk/news/10628494). **Save the terms page.** |
| **WIRED** (Condé Nast) | **Not found** (feed terms) | Probably fits (personal) | Unknown | WIRED RSS. **Save the Condé Nast user agreement.** |
| **MS NOW** (formerly MSNBC) | **Not found**. Old MSNBC RSS pages sit on nbcnews.com and predate the November 2025 spin-off. | Unknown | Unknown | Unknown. **Check ms.now for feeds and terms.** |
| **Reuters** | Public RSS discontinued June 2020 ([FiveFilters](https://www.fivefilters.org/2021/reuters-rss-feeds/)) | **No official free route** | **No official free route** | Licensed only (Reuters Connect / LSEG APIs, via sales). Otherwise through an aggregator API (below). |
| **Associated Press** | No official RSS; the AP Media API requires an API key from **AP Customer Support** ([AP API samples](https://github.com/TheAssociatedPress/APISamples)) | **No official free route** | **No official free route** | AP Media API (customer agreement). Otherwise through an aggregator API (below). |

## Aggregator APIs (cover CNN, BBC, Reuters, AP and others)

| API | Restricting clause | Local demo | Privately hosted |
| --- | --- | --- | --- |
| **NewsAPI.org** Developer plan (free) | Reported ([terms](https://newsapi.org/terms)): "may be used for development and testing in a development environment only, and cannot be used in a staging or production environment (**including internally**)" · browser requests (CORS) allowed only from `localhost` · 100 requests a day · paid plans reportedly from $449/month | **Permitted**: exactly this use | **Not permitted** on the free plan: a private deployment is "staging… (including internally)" |
| **GNews** free plan | Reported ([terms](https://gnews.io/legal/terms-of-service)): "for **non-commercial projects, development and testing only**. Commercial and published projects need a paid plan" · 100 requests a day, 12-hour delay, content truncated | **Permitted** | **Grey area**: allowed only if it stays a non-commercial test, not a "published" project |
| **GDELT** | Free and open index of URLs, headlines and outlets ([gdeltproject.org](https://gdeltproject.org/)); terms not checked | Likely fine | Likely fine (verify terms) |

An aggregator's terms govern your use of *its* data. Whether the aggregator itself is licensed by each publisher couldn't be verified.

## Recommendation

1. **For the local development demo:** NewsAPI's free Developer plan covers the big names (CNN, BBC, Reuters, AP headlines) in one integration and is explicitly meant for this. Add The Conversation's RSS directly.
2. **For a privately hosted test:** switch to sources whose terms don't say "personal" or "development only": **The Conversation**, **CNN RSS** and **TechCrunch RSS** (non-commercial, links direct, no edits, no ads), and the **NYT API** with attribution. Leave out NewsAPI (free plan), Fox RSS and the Guardian unless you've confirmed with them.
3. **Design rules for any headline card:** use the headline exactly as supplied; link **directly** to the article (no page of ours in between for Fox); show publisher attribution; no ads; don't store more than you need (the Guardian's 24-hour rule).
4. **Save as PDFs to confirm:** CNN RSS terms, Fox RSS page, TechCrunch RSS terms, NewsAPI terms, GNews terms, NYT API terms and attribution guidelines, BBC RSS terms, Condé Nast user agreement.
