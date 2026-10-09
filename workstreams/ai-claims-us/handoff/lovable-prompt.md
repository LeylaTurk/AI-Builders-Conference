# Lovable handoff: Claim Tracker

## How to supply this handoff

Open the existing **Decoding the Hype** project in Lovable. Upload exactly one required content attachment, **`claims-content.json`**, in the same message, then paste everything under **Prompt to paste into Lovable** below. The JSON contains all seven final explainers, statement headlines, each claim's researched trail of real sources, the facts, the Act on what's real actions, exact claims and scores, citations, dates, review states, scoring records and three real, rated news articles per topic for the article cards. No other attachment or access to Codex files is required. The readable `claims-content.md` companion is not needed by Lovable.

This handoff is for implementation in the existing project's preview. It does not authorize publishing the live site. Human editorial review of the content is still pending.

## Prompt to paste into Lovable

You are extending my existing **Decoding the Hype** project, whose live site is https://hype-decoder-shell.lovable.app/. Add a small section called **Claim Tracker** alongside the working newsfeed. Claim Tracker is the name of this section only; the site stays **Decoding the Hype**, and its name, logo and tagline do not change. Implement and verify the changes in preview; do not publish. Preserve the current feed, article routes, ingestion, source links, stored ratings and article-rating engine.

I have attached **`claims-content.json`** to this message. It is the complete, authoritative content package. Read it before implementing. Do not research or generate replacement factual content, invent citations, change claims to improve the score, alter scores for variety, or claim human review has happened. If the attachment is missing, unreadable or incomplete, report the exact problem instead of filling missing material yourself. No access to earlier conversation or local files is assumed.

### 1. Content package and exact expected output

The attached JSON has `contentVersion: "claims-us-content-1.5"`, `language: "en-US"`, `section`, `editorialInstructions`, `methodology`, `trailRoles`, `actOnWhatsReal` and a `topics` array of seven records. The intended audience is nontechnical adults in the United States. Preserve explicit international labels, conditional claims, dates and source limitations.

| Topic | Route | Headline claim (page h1) | Headline hype | Careful version we also checked | Careful hype |
| --- | --- | --- | --- | --- | --- |
| Water | `/claims/water` | Every time you use AI, it uses a bottle of water. | **4/5 — Overheated** | AI data-center growth threatens local water supplies in water-stressed US communities. | **1/5 — Grounded** |
| Jobs | `/claims/jobs` | AI will take all our jobs. | **4/5 — Overheated** | AI could eliminate half of US entry-level white-collar jobs within one to five years. | **1/5 — Grounded** |
| Existential risk | `/claims/existential-risk` | AI will kill us all. | **5/5 — Off the charts** | If anyone builds artificial superintelligence using techniques and understanding like those available in 2025, everyone on Earth will die. | **2/5 — A little spicy** |
| Data centers | `/claims/data-centers` | Data centers will destroy our community. | **3/5 — Turning it up** | Big data centers can bring real local costs, but some towns also gain tax money. | **1/5 — Grounded** |
| Energy and climate | `/claims/energy-climate` | AI will make climate change worse. | **2/5 — A little spicy** | AI’s growing electricity demand could increase US carbon emissions by 2030. | **1/5 — Grounded** |
| Creativity | `/claims/creativity` | AI art is theft. | **3/5 — Turning it up** | Generative AI can reproduce copyrighted material from its training data. | **1/5 — Grounded** |
| Privacy | `/claims/privacy` | ChatGPT is sharing your secrets. | **4/5 — Overheated** | ChatGPT may use personal-account conversations to train its models, depending on your settings. | **1/5 — Grounded** |

The table is a quick check. The JSON contains the exact full copy and citations and is authoritative. Each page contrasts a loud headline claim that people actually published (scored 4/5, or 5/5 for existential risk, 3/5 for creativity and data centers, and 2/5 for energy and climate) with a careful version (scored 1/5, or 2/5 for existential risk). Both scores come from the same checklist; the headline scores use the loud-claim rule and, for existential risk, the certain-doom rule (claims-us-1.2). They do not imply small harms or establish the likelihood of any forecast. Keep every qualification supplied alongside these claims.

Field mapping for each topic:

| JSON field | How to use it |
| --- | --- |
| `slug`, `route`, `topic`, `headline`, `headlineOccurrence` | Stable route/key, topic label, and the loud headline claim used as the detail-page h1 on the one-page Claim Tracker. Headlines are statements, never questions. `headlineOccurrence` says who published it; section A (inside **The full evidence**) shows this with a link, and the trail shows it as a stop. Use the exact provided route; Energy and climate is `/claims/energy-climate`. |
| `claim`, `carefulHeadline` | The careful version's exact scored wording and its plain-language form (shown with the careful score inside **Detailed scoring checks**). Not the h1; also use to verify the claim shown in the detail text. Do not silently replace “could” with “will,” or “can” with “always.” |
| `claimContextMarkdown` | Exact section A body: the claim, public examples, geographic/time context and inline citations. Render once, in **The full evidence** → **The claim we scored and our score**. It already includes the visible words “The exact claim we scored.” |
| `scope`, `timeHorizon`, `keyQualification` | Show the exact scope, time horizon and key qualification as normal text in **The claim we scored and our score**, inside **The full evidence**. Do not put these in tooltips. |
| `shortAnswerMarkdown` | Exact section B body in **The short version** card under the trail, always expanded. |
| `meaningMarkdown` | Exact section C body in the **What does this claim actually mean?** disclosure. |
| `evidenceMarkdown` | Exact section D body in the **What evidence do we actually have?** disclosure. Retain evidence-type labels, dates, geography and limitations. |
| `scoreExplanationMarkdown` | Exact section E body, in **The claim we scored and our score**. Its first line contains the score. Render it once. |
| `actionsMarkdown` | Exact section F body in the **What can you do if you are still concerned?** disclosure (the Act tab is separate and does not replace it). Preserve the supplied three to five actions, links and limits. |
| `sourcesAndReviewMarkdown` | Exact section G body in the **Sources and review** disclosure. It contains source publication/update dates, cutoff and remaining source-access caveats. |
| `hype.level`, `hype.label`, `hype.displayPrefix`, `hype.reason` | The headline claim's score: pepper row with text `Headline hype: [label] · [level]/5` directly under the h1. `hype.reason` is stored data only; do not show it. |
| `carefulHype` (same fields, plus `checklist`) | The careful version's score: `Careful version: [label] [level]/5`. Show it only inside **Detailed scoring checks** (section 5). Its `reason` is kept for the record but is not shown. Score is a stored editorial result, not an article-engine call. |
| `interactive` | Topic-page layers described in sections 5 and 5b: `keyWord.word` (the highlighted words in the h1), `trail` (the claim's trail), `finePrint` (The Facts, with `iconName`), `actOnWhatsReal` (the Act tab), and for privacy only `situationPicker`. `claimDial`, `quiz`, `keyWord.explanation`, `headlineSource`, `carefulSource` and `earlierSource` are stored data and are not rendered; the trail now shows where each claim came from. Render the text exactly. |
| `hype.checklist` | Five records keyed P1, P2, P3, W1, W2. Use for the “Detailed scoring checks” disclosure described below. Preserve reasons and links. |
| `evidenceGaps.displayMode`, `.score`, `.limitations` | All seven use qualitative limitations and a null numeric score. Show the supplied limitations as a short list titled “Evidence limitations.” Do not invent numbers, flags, or article-derived gap scores. |
| `researchCutoff`, `aiEvidenceReview`, `humanEditorialReview`, `reviewStatusText` | Explicit metadata, never derived from deployment time or the viewer's clock. Show the cutoff/AI-check dates from the fields. Do not display `reviewStatusText` or any review label. |
| `sourceLinks`, `claimExampleCitations` | Direct URL inventory for link checks and any extra source index. Inline citations in A–G are the primary reading experience; a bibliography alone is insufficient. `sourceLinks` supplies exact link titles, not separate structured publication dates: those dates remain in G. |
| `remainingLimitations` | Preserve as content metadata. The concise public limitation list is `evidenceGaps.limitations`; do not dump the longer internal limitations a second time or remove caveats already in A–G. |
| `articleCards` | Three real news articles per topic, in role order (Makes the claim, Reports it carefully, Pushes back), with their article ratings. Render as cards in the **In the news** tab, as described in section 7. |
| top-level `trailRoles`, `actOnWhatsReal` | `trailRoles` maps each trail `role` to its visible chip label. `actOnWhatsReal.siteItem` is the fixed last item of every Learn card and `actOnWhatsReal.footer` is the line under the Act cards. |
| `websiteCopyMarkdown` | Exact original A–G text duplicated for integrity comparison. Do not render it as a second article or add a duplicate h1/second copy of each section. |

Parse/import the JSON into a small static content module with one shared Claim Tracker page that renders the selected claim. Keep the structured content and citation URLs intact. Render Markdown with the app's safe Markdown handling; do not execute raw HTML. Preserve links, emphasis, paragraphs, bullets, and the one internal link to `/claims/water`. Reordering A–G for the layout is permitted as specified; rewriting, shortening, summarizing, or replacing their bodies is not.

The attachment's `methodology.rubricMarkdown`, `methodology.repositoryAuditMarkdown`, `methodology.repository`, and `sourceFileSha256` are provenance and implementation/audit context. They are not landing-page copy. Do not paste internal engineering instructions, repository paths, hashes, schema terms, scoring scripts or repository audits wholesale onto the website. The public methodology text below and the optional scoring disclosure provide the appropriate reader experience.

### 2. Preserve the observed visual identity

Use existing project components/tokens. The site inspected October 6, 2026 had a dark purple subtly patterned header with an irregular lower edge, a white serif logo with a yellow rectangle behind “Hype,” pale lavender background, rounded white cards, purple links and pepper icons. Rendered CSS confirmed background `#F6F3FF`, text `#16131F`, Fraunces/Georgia headings and Public Sans/system sans body text. These confirm the current identity; prefer the actual project tokens over recreating approximations.

Keep the current feed visually familiar. Use a centered content area around 856px for the landing/feed and a comfortable reading column around 728px for detail text. White cards have approximately 16px corners, a subtle border, at least 20px padding and 20–24px gaps. Avoid decorative stock images, new logos, giant illustrations or extra animation.

### 3. Routes, navigation and feed entry point

Keep `/` as Feed and `/story/:id` as the current story detail. Add `/claims` and the seven exact routes in the table. The logo still links to `/`. Add **Claim Tracker** beside **Feed** in the global header, using the existing yellow active treatment and `aria-current="page"` on the active section. Claims detail pages keep the claims nav item active.

At 768px and wider, the logo and two nav links can occupy one row. Below 768px, place the logo on row one and the two links on row two, wrapping safely down to 320px. No hamburger menu is needed for two destinations. Use real links, not click-handler-only text.

On the current feed add one compact invitation below its existing feed-checked timestamp and before the original story list. Use the exact attachment fields:

- Title: `section.feedInvitationTitle` — **Concerned about a recurring AI claim?**
- Body: `section.feedInvitationBody` — **Explore the evidence on water, jobs, climate, data centers, creativity, privacy, and existential risk.**
- Link: `section.feedInvitationLinkText` — **Explore the Claim Tracker**, pointing to `/claims`.

Do not insert the seven-card grid into the feed or change its fetching, ordering, ratings, refresh controls or timestamp. Keep the invitation compact so news remains prominent on mobile.

At `/claims`, use `section.name` as h1, `section.introduction` as the introductory paragraph and `section.scoreNote` as a visible explanatory note. Their exact text is already supplied in the attachment. No search, filters, accounts, subscriptions, chatbot or new publishing system are needed for seven static entries.

### 4. The Claim Tracker is one page, not a card grid

`/claims` is one page that shows one claim at a time, like the prototype; there is no grid of claim cards. In a reading column about 760px wide, from the top: the label **CLAIM TRACKER** (small bold uppercase, muted, not a heading); `section.introduction` in 15px muted text; a wrapping row of seven claim pills in JSON order (Water, Jobs, Existential risk, Data centers, Energy and climate, Creativity, Privacy); then the selected claim's page from section 5 (claim card and trail, the short version, the three tabs, **The full evidence**) and a **Back to the feed** link to `/`. `section.scoreNote` stays inside **The full evidence**.

`/claims` shows Water. Each `/claims/[slug]` route shows the same page with that claim selected. Tapping a pill swaps the claim without a full reload, pushes that claim's `/claims/[slug]` address onto the history (so Back returns to the previous claim), resets to **The Facts** tab, closes open panels and disclosures, and sets the browser title to “[headline] · Claim Tracker · Decoding the Hype”. An unknown slug shows Water with the note “We couldn't find that claim, so here's the first one.” At mobile width use roughly 16–20px page gutters and let the pills wrap; nothing scrolls sideways at 320px.

### 5. Topic-page layout

The heart of each topic page is **the claim and its trail**: where the claim came from, how it spread or got twisted, and how it was challenged. The page leads with the claim and its trail, the short version of the verdict sits right under it, and everything else lives in three tabs. If an earlier version of the Claim Tracker exists in this project from a previous prompt, update it to this layout and remove from the topic page: the semicircle hype gauge (“From calm to clickbait”), the True or false? quiz, the separate loud-version and careful-version boxes, the **Why this score** line and the clickable key-word popup. The `claimDial`, `quiz`, `keyWord.explanation`, `hype.reason` and `carefulHype` data stay in the JSON as stored data only; do not render them except inside **The full evidence** as described below.

Keep this order on desktop and mobile, in one reading column about 760px wide:

1. (No breadcrumb; the label and intro from section 4 come first.)
2. **Claim pills:** a wrapping row of seven pills, one per topic (`topic` names, JSON order), each switching to its route as section 4 describes. Pills are white with a 1px border, 999px radius, 14px semibold text and a 40px minimum height; the current topic's pill is filled yellow `#FFD84D` with dark text and `aria-current="page"`.
3. **The claim card** (white card, about 16px corners, 22px padding):
   - A small eyebrow **THE CLAIM** (12px bold uppercase, letter-spaced, purple).
   - The `headline` as the single h1 (Fraunces, about 34px desktop / 26px mobile). Inside it, highlight `interactive.keyWord.word` with a soft peach marker (`#FDE6DC` on the lower half of the line) and a 3px wavy orange underline (`#EB6834`), the same look as the article markup view's hype highlights. The highlight is plain text: not a button, not a link, no popup and no pointer cursor.
   - Directly under the h1: the pepper row and **Headline hype: [hype.label] · [hype.level]/5** in bold.
   - A thin divider, then **The claim's trail** (h2, Fraunces, with a small 12px filled orange `#EB6834` circle before it), `interactive.trail.intro` as a muted hint, then the timeline described in 5b.
4. **The short version** (white card): a small eyebrow **IS THE CLAIM TRUE? THE SHORT VERSION**, then `shortAnswerMarkdown`, always visible.
5. **Three tabs**: **The Facts**, **In the news**, **Act on what's real** (see 5b). The Facts is open by default.
6. **The full evidence** (h2), so nothing from the research is lost: a stack of native `<details>` blocks, closed by default, each with a 44px summary row:
   - **The claim we scored and our score**: `claimContextMarkdown`, exact scope and time horizon, `keyQualification`, `scoreExplanationMarkdown`, the `evidenceGaps.limitations` list titled “Evidence limitations”, and `section.scoreNote`.
   - **What does this claim actually mean?**: `meaningMarkdown`.
   - **What evidence do we actually have?**: `evidenceMarkdown`.
   - **What can you do if you are still concerned?**: `actionsMarkdown`.
   - **How these scores work**: the exact public methodology below, the scale line, and the nested **Detailed scoring checks** disclosure.
   - **Sources and review**: the complete `sourcesAndReviewMarkdown` (section G), plus the research cutoff and AI evidence review dates.
7. Link **Back to the feed** to `/`.

Metadata and evidence labels are plain text, not green/red “safe/danger” badges. Preserve the distinction between observed outcomes, controlled experiments, projections, surveys/judgments and theoretical scenarios in the supplied copy.

Use this exact public methodology paragraph:

> We assess each claim on this page, the headline claim and the careful version, using five checks: the status of the evidence, the scope of the claim, the certainty of predictions, inflated language, and unsupported agency or intentions. The same issue is counted once. A claim that badly overstates its evidence, its scope or its certainty scores at least 4, the same way an overstated headline lifts an article's rating. Checks are marked met, not met, not applicable, or not checked. A calculated score summarizes the checked wording; an applicable unchecked item prevents a numeric score. The scale is coarse, so different claims can receive the same score. Evidence limitations and potential harm are explained separately. These claim ratings adapt the site's article checklist. The newsfeed's article ratings remain separate.

Show the scale as text: **1 Grounded · 2 A little spicy · 3 Turning it up · 4 Overheated · 5 Off the charts**. Always pair it with `section.scoreNote` where a reader could otherwise read the scale as a harm gauge.

Inside **How these scores work**, provide a keyboard-operable native `<details>` labeled **Detailed scoring checks**. Inside it, show two groups, **Headline claim** (`hype.checklist`) and **Careful version** (`carefulHype.checklist`, headed with `carefulHeadline` and **Careful version: [label] [level]/5**), each with its five checklist rows as a list/card stack on mobile or a readable table on desktop. Map P1 → **Evidence status**, P2 → **Scope**, P3 → **Future certainty**, W1 → **Rhetorical inflation**, W2 → **Agency and mechanism**. Map Y → **Met**, N → **Not met**, NA → **Not applicable**, NC → **Not checked**. Show each supplied reason and direct supporting links; preserve `claim_phrase` where supplied. Source `locator` text may be shown as “Where to look.” Hide internal `evidence_row_id` values. Use source-link titles from `sourceLinks` when available, otherwise a descriptive label such as “Evidence for future certainty — source 1,” never a raw unexplained icon.

Within that disclosure, a compact optional calculation note may state:

> Evidence-status, scope and future-certainty checks form one group; language and agency checks form the other. Within each group, the share of met answers maps to levels: 100% → 1; at least 75% → 2; at least 50% → 3; at least 25% → 4; below 25% → 5. Each group needs at least two met/not-met answers. The two group levels are averaged; an exact half rounds down. If the first group reaches level 4 or 5, the score is at least 4, just as an overstated headline lifts an article's rating. An applicable “not checked” answer means no numeric score is shown.

Use the provided computed `hype` values; do not calculate claim scores by sending the explainers to the article engine. If a future content record is explicitly not assessable or lacks a valid level, show **Not yet assessable** with its supplied reason, without peppers or `0/5`. For this package all seven scores are present. All seven evidence-gap displays are qualitative; a numeric score in internal audit material must not override that design choice.

### 5b. The trail, the tabs and the icons

Use native elements so everything works by keyboard and screen reader, with 44px tap targets. Respect `prefers-reduced-motion`. Render all supplied text exactly.

**Site colours.** Use only the site's own palette for the new blocks: deep purple `#3B1E6E` (header), purple `#5B2EA6`, lavender `#C5A8FF`, yellow `#FFD84D` (the “Hype” logo highlight), chilli orange `#EB6834`, soft orange `#F59A6A` (the Overheated badge), pale yellow `#FFF1B8`, pale lavender `#E4D6FF`, soft peach `#FDE6DC`, ink `#16131F`. Prefer the project's existing tokens where they already hold these colours.

**The claim's trail** (`interactive.trail.stops`, 8–9 per claim, in date order; each stop has `date`, `role`, `title`, `quote`, `note`, `linkText`, `url`): render as an ordered list styled as a vertical timeline. A 3px rounded line runs down the left (about 10px from the edge), shading from lavender `#C5A8FF` through soft orange `#F59A6A` to mint `#A8E3C4`. Each stop is indented about 38px and has:
- a 21px ring on the line: card-coloured centre with a 5px border in the role colour;
- one row with the `date` (13px bold, muted) and a role chip: the label from top-level `trailRoles[role]` (Where it started, Spreading, The twist, Loudest, Pushback, New numbers) in 11px bold uppercase letters on a pill in the role colour with dark text. Role colours: origin `#C5A8FF`, spread `#F7C96B`, twist `#E8645F`, peak `#F59A6A`, pushback `#A8E3C4`, update `#B9D4F5`;
- the `title` in 16px bold;
- the `quote` as a blockquote in the display serif (about 17px), wrapped in curly quotation marks, with a 3px left border in the role colour;
- the `note` in 14px muted text;
- a link reading `linkText →` in bold purple 14px to `url`, opening in a new tab with `rel="noopener noreferrer"` and announced as opening a new tab.
Show every stop; do not collapse, reorder, shorten or merge stops.

**Tabs.** A `role="tablist"` row of three equal-width buttons (`role="tab"`, `aria-selected`, `aria-controls`; Left/Right arrow keys move between tabs, Home/End jump to the ends), with an 8px gap and about 10px of space below before the panel, so tabs and panel read as separate pieces. Each tab: 14px rounded corners, a 2px border in its colour, white background, ink text, 16px bold (15px under 420px wide, wrapping to two lines if needed), minimum height 50px. The selected tab is filled with its colour and has a small shadow: **The Facts** yellow `#FFD84D` with dark text; **In the news** soft orange `#F59A6A` with dark text; **Act on what's real** deep purple `#3B1E6E` with white text (`#5B2EA6` in dark mode so it stays visible). The tab row may stick to the top of the screen while the reader scrolls the panel, as long as it never covers the site header.

**Tab panels** (`role="tabpanel"`, one visible at a time): a white card with about 22px rounded corners, a 1px border and hidden overflow. At its top, a full-width colour **banner** (padding about 20px 18px) in the tab's colour, with a decorative translucent white circle (about 160px) peeking in from the top-right corner. The banner holds the panel's h2 in Fraunces bold about 26px and a 15px hint line. The Facts and In the news banners use dark text; the Act banner uses white text. Below the banner the panel content has about 16px padding.

- **The Facts** (yellow banner; h2 **The Facts**; hint “Tap a fact to learn more.”). Show `finePrint` (six per claim) as an **icon grid**: two equal columns on phones and three from 640px up, about 10px gaps. Each fact is a tile: a white card (the normal card background in dark mode) with a 1px border, about 16px corners, about 14px padding, minimum height near 150px. Inside, top to bottom: the fact's **icon**, then the `tag` in small bold uppercase purple letters, then the `label` without its leading “Fact: ” in 14px semibold, then “Learn more ▾” in small bold purple at the bottom. The whole tile is one button with `aria-expanded`; it lifts slightly and its border turns purple on hover. Tapping a tile opens a detail panel that spans the full grid width, placed directly after the last tile in the same row (so no tile moves), with a 2px purple border and rounded corners. The panel shows `text` with `linkText` linked to `url` (new tab), then a “Close ▴” button that returns focus to the tile. The open tile gets a 2px purple border and a pale lavender background, and its “Learn more” hides. Only one fact is open at a time; tapping the open tile again closes it.
  - **Icons:** use the **Phosphor** icon set (`@phosphor-icons/react`, MIT licence) in its **duotone** weight, 44px, with the icon named in each fact's `iconName` (for example `drop`, `factory`, `scales`). Do not show the `icon` emoji. Colour every icon in the site's identity: the outline in deep purple `#3B1E6E` and the duotone fill layer in solid yellow `#FFD84D` (override Phosphor's default 20% opacity on that layer to fully opaque, for example with `svg path[opacity] { fill: #FFD84D; opacity: 1 }`). In dark mode use a lavender `#C5A8FF` outline and keep the yellow fill. No circle or box behind the icon. Icons are decorative (`aria-hidden`).
  - **Privacy only:** below the grid, the **situation picker** (`situationPicker`): its `title` as an h3, hint “Pick the one that fits you. Based on OpenAI's published policies.”, radio options as white cards (`label`), and the chosen option's `result` in a pale lavender box below.
- **In the news** (soft orange banner; h2 **In the news**; hint exactly “Real stories about this claim, rated with the same checklist as our feed. Article ratings are separate from the claim score above.”). The three article cards from section 7.
- **Act on what's real** (deep purple banner; h2 “Act on what's **real**” with the word “real” on a yellow `#FFD84D` highlight with dark text and 4px corners; the banner hint is `interactive.actOnWhatsReal.intro` in white). Below it, three cards in a grid (one column on phones, three from 720px), 16px corners, 14px padding, dark text: **Learn** on pale yellow `#FFF1B8`, **Speak up** on pale lavender `#E4D6FF`, **Take action** on soft peach `#FDE6DC`. Each card starts with a Phosphor duotone icon at 40px in the same purple-and-yellow colouring (`book-open`, `megaphone`, `map-pin`) beside the card name as an h3 in Fraunces 20px. Then one small white inner card (translucent white, 12px corners) per item from `learn`, `speakUp` or `takeAction`: bold `title`, 14px `text`, and `linkText` linked to `url` in bold purple 13px (new tab). The Learn card always ends with the top-level `actOnWhatsReal.siteItem` (“Check the next headline you see”), whose link goes to the internal `route` `/` in the same tab. Under the cards, the top-level `actOnWhatsReal.footer` line in 13px muted text. These actions are nonpartisan; render them exactly and do not add actions.

### 6. Citations, dates and review status

Keep every inline citation in sections A–F; render every section G source/date note. Links in the body must be underlined, descriptive and keyboard accessible. Retain URLs, query strings and internal routes exactly; do not replace original evidence links with search results. Sources may open in the same tab. If you use new tabs, announce that consistently and use appropriate link security attributes.

Do not show any review label anywhere in the Claim Tracker: no **AI rating, not yet reviewed** and no **Reviewed by Leyla**, on the Claim Tracker page or its article cards. Keep `reviewStatusText`, `humanEditorialReview` and `section.reviewLabels` as stored data only. The feed keeps its own labels unchanged. The AI check was an independent AI evidence review, not approval by a human expert.

Format ISO dates for US readers, e.g. **Research checked through October 6, 2026** and **AI evidence review: October 6, 2026**, using the actual fields. Do not update them on deploy, refresh, feed update or rebuild. Do not change publication dates recorded as “undated,” preprint dates, court-status dates or relative update labels in G into guessed dates. Source dates, research cutoff, AI review and future human-review dates are separate facts. A refreshed feed never silently refreshes the explainers' research.

### 7. In the news: article cards that link the claim to real stories

In the **In the news** tab (section 5b), show the three `articleCards` as cards, in the supplied order (`role` only sets the order; do not display it). The tab banner carries the hint text.

Each card shows, top to bottom:
1. **The rating, first.** The hype label for `hype` as a coloured badge (Grounded, A little spicy, Turning it up, Overheated, Off the charts, using the same colours as the gauge levels). No review label. Directly under it, the chillies with **Hype [n]/5** and the flags with **Evidence gaps: [None, Minor, Some, Major or Unsupported] · [n]/5**, faded icons for the unused ones as on the feed.
2. `outlet` · formatted `published` date, and `contextLabel` when present (for example **United Kingdom · international context**).
3. The article `headline` as the card title.
4. `ratingNote` in muted text, then `whyHere` under a small **Why it's here** label.
5. One link. Look up the feed's stored stories for one whose original URL equals `url` (ignore a trailing slash and `utm_` query parameters). If one exists, link to its story page `/story/[id]` with the text **See our full rating**, and show that story's own live ratings and labels (but no review label) instead of the supplied ones, so the card always matches the story page. If none exists, link to `url` with the text **Read the article at [outlet]**, opening in a new tab with `rel="noopener noreferrer"` and announced as opening a new tab.

Cards sit in one column on mobile and three across from 1024px, inside the tab panel. Never hide or reorder a card because of its rating; a "Pushes back" story can be hyped too, and that is part of the lesson. Do not call the article engine for these cards and do not create or edit stored stories from this page. If the story lookup fails, show the supplied ratings and the external link; the cards and the rest of the page stay readable.

Below the cards, inside the tab panel, add a small line: **Want to see how we rate a story? Browse the feed**, linking “Browse the feed” to `/`.

### 8. Accessibility and implementation boundaries

Use semantic `nav`, `main`, `article`, lists, headings and `time`. One h1 per page; h2 for the major sections. Add a visible-on-focus skip link. Body copy is at least 16px with line height around 1.6 and a reading measure around 65–75 characters; metadata/citations should stay comfortable at 14px or above. A mobile h1 around the existing 30px is appropriate.

Verify normal-text contrast at least 4.5:1, large text 3:1, and UI/focus indicators 3:1. Yellow is an accent background, not small text on white. Maintain visible focus/hover/active text contrast. Peppers are `aria-hidden`; a single text label carries the score. No color-only meaning, hover-only information or unlabeled icon controls. Minimum tap targets are 44px. On route changes place focus at the new page's h1, without trapping focus. Native disclosure controls must work with Enter/Space.

Check widths 320px, 390px, 768px and 1280px plus 200% zoom. Long claims, source links, review text, score labels and article-card headlines must wrap without page-level horizontal scrolling, clipping, text overlap or sticky obstruction. Keep essential controls out of the lower-right area occupied by the existing Lovable badge.

Keep the implementation small: local static JSON/module, shared components and two route patterns. Reuse the project's router and existing story read path. Do not introduce new databases, authentication, subscriptions, analytics collection, admin/CMS workflows, a scheduler or a chatbot. Do not modify article scoring prompts/calculation/schema, existing engine calls, ingestion jobs or existing stored data. The adaptation is for these recurring-claim content records only.

### 9. Acceptance checks before finishing

Complete these in preview and report pass/fail with any exact remaining issue. Do not claim live deployment or human editorial approval.

- **All routes:** `/`, `/claims`, all seven listed `/claims/[slug]` routes and at least two existing `/story/[id]` routes work. Direct loads, refresh, browser Back, breadcrumbs and both header links work. Active nav is correct. `/claims/energy-climate` is the canonical climate route.
- **Complete exact content:** Seven topics appear in the supplied order (Water, Jobs, Existential risk, Data centers, Energy and climate, Creativity, Privacy). Each A–G Markdown body is rendered once in the specified location, with the same wording and links as the attachment. Compare against `websiteCopyMarkdown`; headings/placement may differ, bodies must not. No omitted action, citation, qualification, source date or access limitation. No duplicated full article or placeholder.
- **Scoring:** Headlines show the scores in the table, directly under the h1: Overheated 4/5 for water, jobs and privacy; Off the charts 5/5 for existential risk; Turning it up 3/5 for creativity and data centers; A little spicy 2/5 for energy and climate. Careful versions show **Grounded 1/5**, except existential risk at **A little spicy 2/5**, inside **Detailed scoring checks** only. No **Why this score** line and no loud/careful boxes appear. Both five-check lists remain accessible in **Detailed scoring checks**. All seven evidence limitation sections are qualitative; no invented numeric evidence-gap values or safety percentages. No rescores were made by the article engine.
- **Statements, trail and tabs:** Every h1 is the `headline` statement, with no question marks. The highlighted words (“bottle of water” for water, “climate change” for energy and climate) are plain text, not clickable. Every topic shows its full trail (8–9 stops) in date order, each with date, role chip, title, quote, note and a working source link; no stop is missing or reworded. The short version sits under the trail. The three tabs work by click, tap and arrow keys, show one panel at a time with its colour banner, and The Facts opens by default. No gauge, quiz, key-word popup or loud/careful boxes remain on topic pages. The Facts shows six tiles with purple-and-yellow Phosphor duotone icons in even rows, and each opens its own panel under its row. Act on what's real shows Learn, Speak up and Take action with every supplied action, the “Check the next headline you see” item and the footer line. The privacy picker works by keyboard, tap and screen reader. The page has no card grid; the seven claim pills switch claims without a reload, update the address and mark the current one, and every `/claims/[slug]` address loads directly. **The full evidence** holds every A–G section in closed `<details>` blocks.
- **Interpretation:** “The exact claim we scored” is present in **The claim we scored and our score**. Jobs retains the original approximately 2026–2030 warning window, energy retains the comparison-baseline caveat, privacy remains limited to the stated personal-account policy, and existential risk retains its conditional future-superintelligence scope. These checks preserve supplied copy, not new additions. Score meaning is visible; no low-score “safe” badge.
- **Citations/resources:** Every supplied external inline link has the correct destination in the rendered page; internal `/claims/water` opens correctly. Check representative live sources and report any inaccessible links without inventing replacements or silently dropping them. Section G retains source dates and distinctions between publication date, data period and inspected policy date. No search-snippet substitutions.
- **Review/dates:** No Claim Tracker page or card shows **AI rating, not yet reviewed** or **Reviewed by Leyla**. Dates come from JSON, and rebuild/refresh does not change them. Feed articles keep their own review labels.
- **Article cards:** In the In the news tab, every topic shows three cards in the order Makes the claim, Reports it carefully, Pushes back. Each card leads with its hype label badge (no review label), then chillies and flags with the right numbers, then outlet, date, headline, rating note and why-it's-here line. Water's Microsoft Atlanta card links to its existing `/story/dcf19ba9-804b-4919-8bf2-950f0d29c7d6` page and shows that story's live rating; cards with no matching story link out to the original article in a new tab. Test a failed story lookup: cards still show supplied ratings and links.
- **Mobile/accessibility:** At all four widths and 200% zoom, no clipping or horizontal page overflow. Two-row mobile navigation, one-column cards, readable labels/links, visible keyboard focus, skip link, tabs and disclosure controls work. Screen-reader accessible score names contain numbers and words, not a sequence of peppers. Verify contrast.
- **Feed regression:** Before/after compare the current story order/content, existing timestamp, unrated state, rated/partly-checked labels, original-source links and article-detail functionality. Feed refreshing/loading/error behavior and article-engine paths stay intact. The only intended feed-body addition is the compact invitation. Claim content still loads when the feed request fails.
- **Scope:** No live publish, no new accounts/subscription/CMS/chatbot, no changes to stored articles or engine behavior. Finish with preview access, changed-component summary and validation results.
