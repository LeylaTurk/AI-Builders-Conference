# Lovable handoff: Claim Tracker

## How to supply this handoff

Open the existing **Decoding the Hype** project in Lovable. Upload exactly one required content attachment, **`claims-content.json`**, in the same message, then paste everything under **Prompt to paste into Lovable** below. The JSON contains all six final explainers, statement headlines, interactive layers, exact claims and scores, citations, dates, review states, scoring records and three real, rated news articles per topic for the article cards. No other attachment or access to Codex files is required. The readable `claims-content.md` companion is not needed by Lovable.

This handoff is for implementation in the existing project's preview. It does not authorize publishing the live site. Human editorial review of the content is still pending.

## Prompt to paste into Lovable

You are extending my existing **Decoding the Hype** project, whose live site is https://hype-decoder-shell.lovable.app/. Add a small section called **Claim Tracker** alongside the working newsfeed. Claim Tracker is the name of this section only; the site stays **Decoding the Hype**, and its name, logo and tagline do not change. Implement and verify the changes in preview; do not publish. Preserve the current feed, article routes, ingestion, source links, stored ratings and article-rating engine.

I have attached **`claims-content.json`** to this message. It is the complete, authoritative content package. Read it before implementing. Do not research or generate replacement factual content, invent citations, change claims to improve the score, alter scores for variety, or claim human review has happened. If the attachment is missing, unreadable or incomplete, report the exact problem instead of filling missing material yourself. No access to earlier conversation or local files is assumed.

### 1. Content package and exact expected output

The attached JSON has `contentVersion: "claims-us-content-1.4"`, `language: "en-US"`, `section`, `editorialInstructions`, `methodology` and a `topics` array of six records. The intended audience is nontechnical adults in the United States. Preserve explicit international labels, conditional claims, dates and source limitations.

| Topic | Route | Headline claim (page h1) | Headline hype | Careful version we also checked | Careful hype |
| --- | --- | --- | --- | --- | --- |
| Water | `/claims/water` | Every time you use AI, it uses a bottle of water. | **4/5 — Overheated** | AI data-center growth threatens local water supplies in water-stressed US communities. | **1/5 — Grounded** |
| Jobs | `/claims/jobs` | AI will take all our jobs. | **4/5 — Overheated** | AI could eliminate half of US entry-level white-collar jobs within one to five years. | **1/5 — Grounded** |
| Existential risk | `/claims/existential-risk` | AI will kill us all. | **5/5 — Off the charts** | If anyone builds artificial superintelligence using techniques and understanding like those available in 2025, everyone on Earth will die. | **2/5 — A little spicy** |
| Energy and climate | `/claims/energy-climate` | AI will make climate change worse. | **2/5 — A little spicy** | AI’s growing electricity demand could increase US carbon emissions by 2030. | **1/5 — Grounded** |
| Creativity | `/claims/creativity` | AI art is theft. | **3/5 — Turning it up** | Generative AI can reproduce copyrighted material from its training data. | **1/5 — Grounded** |
| Privacy | `/claims/privacy` | ChatGPT is sharing your secrets. | **4/5 — Overheated** | ChatGPT may use personal-account conversations to train its models, depending on your settings. | **1/5 — Grounded** |

The table is a quick check. The JSON contains the exact full copy and citations and is authoritative. Each page contrasts a loud headline claim that people actually published (scored 4/5, or 5/5 for existential risk, 3/5 for creativity and 2/5 for energy and climate) with a careful version (scored 1/5, or 2/5 for existential risk). Both scores come from the same checklist; the headline scores use the loud-claim rule and, for existential risk, the certain-doom rule (claims-us-1.2). They do not imply small harms or establish the likelihood of any forecast. Keep every qualification supplied alongside these claims.

Field mapping for each topic:

| JSON field | How to use it |
| --- | --- |
| `slug`, `route`, `topic`, `headline`, `headlineOccurrence` | Stable route/key, topic label, and the loud headline claim used as the detail-page h1 and the card heading. Headlines are statements, never questions. `headlineOccurrence` says who published it; section A already shows this with a link. Use the exact provided route; Energy and climate is `/claims/energy-climate`. |
| `claim`, `carefulHeadline` | The careful version's exact scored wording and its plain-language form (used on the dial). Not the card heading; also use to verify the claim shown in the detail text. Do not silently replace “could” with “will,” or “can” with “always.” |
| `claimContextMarkdown` | Exact section A body: the claim, public examples, geographic/time context and inline citations. Render once in the claim-under-examination panel. It already includes the visible words “The exact claim we scored.” |
| `scope`, `timeHorizon`, `keyQualification` | Show the exact scope and time horizon as normal text in the panel; keep the key qualification immediately beside the claim and on its card. Do not put these in tooltips. |
| `shortAnswerMarkdown` | Exact section B body under “The short answer,” always expanded. |
| `meaningMarkdown` | Exact section C body under “What does this claim actually mean?” |
| `evidenceMarkdown` | Exact section D body under “What evidence do we actually have?” Retain evidence-type labels, dates, geography and limitations. |
| `scoreExplanationMarkdown` | Exact section E body, placed next to the score in the claim panel. Its first line contains the score. Render it once; do not repeat the full section farther down. |
| `actionsMarkdown` | Exact section F body under “What can you do if you are still concerned?” Preserve the supplied three to five actions, links and limits. |
| `sourcesAndReviewMarkdown` | Exact section G body under “Sources and review.” It contains source publication/update dates, cutoff and remaining source-access caveats. |
| `hype.level`, `hype.label`, `hype.displayPrefix`, `hype.reason` | The headline claim's score: pepper row with text `Headline hype: [label] [level]/5`, followed by the label **Why this score** and the one-line `hype.reason`. |
| `carefulHype` (same fields, plus `checklist`) | The careful version's score: `Careful version: [label] [level]/5` plus its `reason`. Show it in the claim panel right after the headline score, and on the dial. The supplied display prefix is authoritative. Score is a stored editorial result, not an article-engine call. |
| `interactive` | Interactive layers described in section 5b: `keyWord`, `claimDial`, `finePrint`, `quiz`, and for privacy only `situationPicker`. Render the text exactly. |
| `hype.checklist` | Five records keyed P1, P2, P3, W1, W2. Use for the “Detailed scoring checks” disclosure described below. Preserve reasons and links. |
| `evidenceGaps.displayMode`, `.score`, `.limitations` | All six use qualitative limitations and a null numeric score. Show the supplied limitations as a short list titled “Evidence limitations.” Do not invent numbers, flags, or article-derived gap scores. |
| `researchCutoff`, `aiEvidenceReview`, `humanEditorialReview`, `reviewStatusText` | Explicit metadata, never derived from deployment time or the viewer's clock. Show the cutoff/AI-check dates from the fields. Do not display `reviewStatusText` or any review label. |
| `sourceLinks`, `claimExampleCitations` | Direct URL inventory for link checks and any extra source index. Inline citations in A–G are the primary reading experience; a bibliography alone is insufficient. `sourceLinks` supplies exact link titles, not separate structured publication dates: those dates remain in G. |
| `remainingLimitations` | Preserve as content metadata. The concise public limitation list is `evidenceGaps.limitations`; do not dump the longer internal limitations a second time or remove caveats already in A–G. |
| `articleCards` | Three real news articles per topic, in role order (Makes the claim, Reports it carefully, Pushes back), with their article ratings. Render as cards as described in section 7. |
| `websiteCopyMarkdown` | Exact original A–G text duplicated for integrity comparison. Do not render it as a second article or add a duplicate h1/second copy of each section. |

Parse/import the JSON into a small static content module with one shared landing page and one shared topic-page component. Keep the structured content and citation URLs intact. Render Markdown with the app's safe Markdown handling; do not execute raw HTML. Preserve links, emphasis, paragraphs, bullets, and the one internal link to `/claims/water`. Reordering A–G for the layout is permitted as specified; rewriting, shortening, summarizing, or replacing their bodies is not.

The attachment's `methodology.rubricMarkdown`, `methodology.repositoryAuditMarkdown`, `methodology.repository`, and `sourceFileSha256` are provenance and implementation/audit context. They are not landing-page copy. Do not paste internal engineering instructions, repository paths, hashes, schema terms, scoring scripts or repository audits wholesale onto the website. The public methodology text below and the optional scoring disclosure provide the appropriate reader experience.

### 2. Preserve the observed visual identity

Use existing project components/tokens. The site inspected October 6, 2026 had a dark purple subtly patterned header with an irregular lower edge, a white serif logo with a yellow rectangle behind “Hype,” pale lavender background, rounded white cards, purple links and pepper icons. Rendered CSS confirmed background `#F6F3FF`, text `#16131F`, Fraunces/Georgia headings and Public Sans/system sans body text. These confirm the current identity; prefer the actual project tokens over recreating approximations.

Keep the current feed visually familiar. Use a centered content area around 856px for the landing/feed and a comfortable reading column around 728px for detail text. White cards have approximately 16px corners, a subtle border, at least 20px padding and 20–24px gaps. Avoid decorative stock images, new logos, giant illustrations or extra animation.

### 3. Routes, navigation and feed entry point

Keep `/` as Feed and `/story/:id` as the current story detail. Add `/claims` and the six exact routes in the table. The logo still links to `/`. Add **Claim Tracker** beside **Feed** in the global header, using the existing yellow active treatment and `aria-current="page"` on the active section. Claims detail pages keep the claims nav item active.

At 768px and wider, the logo and two nav links can occupy one row. Below 768px, place the logo on row one and the two links on row two, wrapping safely down to 320px. No hamburger menu is needed for two destinations. Use real links, not click-handler-only text.

On the current feed add one compact invitation below its existing feed-checked timestamp and before the original story list. Use the exact attachment fields:

- Title: `section.feedInvitationTitle` — **Concerned about a recurring AI claim?**
- Body: `section.feedInvitationBody` — **Explore the evidence on water, jobs, climate, creativity, privacy, and existential risk.**
- Link: `section.feedInvitationLinkText` — **Explore the Claim Tracker**, pointing to `/claims`.

Do not insert the six-card grid into the feed or change its fetching, ordering, ratings, refresh controls or timestamp. Keep the invitation compact so news remains prominent on mobile.

At `/claims`, use `section.name` as h1, `section.introduction` as the introductory paragraph and `section.scoreNote` as a visible explanatory note. Their exact text is already supplied in the attachment. No search, filters, accounts, subscriptions, chatbot or new publishing system are needed for six static entries.

### 4. Landing-page cards and responsive layout

Use two equal columns at widths of 768px and up and a single column below that. Keep the JSON order: Water, Jobs, Existential risk, Energy and climate, Creativity, Privacy. At mobile width use roughly 20px page gutters, allowing smaller space only if needed to prevent overflow at 320px.

Each card contains:

1. The `headline` statement, in full, as the card's linked serif heading. Do not show the topic name above it.
2. Exact `keyQualification` in readable normal text.
3. Decorative pepper row and the full text `Headline hype: [label] [level]/5`, then `hype.reason`, then a smaller line `Careful version: [carefulHype.label] [carefulHype.level]/5`.
4. Link **Read the evidence and actions**. Give it an accessible name that includes the topic, such as “Water: Read the evidence and actions.”

Let text wrap and card height grow. Never ellipsize a claim, hide a qualifier, use a tooltip for a key limit, or communicate the score with peppers/color alone. The claim itself is text under examination, not an unlabeled site assertion. A linked heading and descriptive text link are sufficient; do not nest interactive controls inside an all-card button. Do not squeeze the entire short answer into cards.

### 5. Topic-page order and visible evidence

Use a normal page with one readable column and anchors. Do not make the topic a modal or hide main sections behind tabs; the interactive layers in 5b are the only tap-to-open content. Keep this order on desktop and mobile:

1. Breadcrumb **Claim Tracker / [Topic]**, linked back to `/claims`.
2. The `headline` as the single h1, with no topic label above it, with `interactive.keyWord.word` highlighted inside it (see 5b); research cutoff.
2b. Directly under the h1, `interactive.headlineSource` in a short line (for example “Claim tracked from Elon Musk, who made it at a tech conference in Paris in May 2024…”), so readers know who made the claim before they see its score. Render it exactly: every line starts “Claim tracked from…”, and where the headline shortens someone's words the line quotes the original. Inside the line, make the article or book title (`interactive.headlineSourceLinkText`, which appears exactly once in the line) the link to `interactive.headlineSourceUrl` (new tab, `rel="noopener noreferrer"`, announced as opening a new tab). No separate “See the source” link. “Tracked from” means a real, published example of the claim, not necessarily the first time anyone said it. Where `interactive.earlierSource` exists (existential risk), show a second short line under it: **[earlierSource.label]:** `earlierSource.text`, with `earlierSource.linkText` (the study or essay title, inside the text) linked to `earlierSource.url` the same way.
3. A white claim panel containing the headline score row, then the small label **Why this score** and `hype.reason`, directly under the h1. Then the label **Is it true? The short answer** and `shortAnswerMarkdown`, always visible. Then a clearly separated box headed **A more careful way to say it**, containing, in this order: the `carefulHeadline` as a quote, then `interactive.carefulSource` in small muted text (it says the wording is ours and which real source it rests on), then `carefulHype.reason` as a full sentence, then the careful-version score row. Never show the careful score row without its quote. Then `claimContextMarkdown`, exact scope/time horizon and `keyQualification`; `scoreExplanationMarkdown`; and the short `evidenceGaps.limitations` list. Section A labels **The headline claim** and **The careful version we also checked**; keep both labels visible. Add `section.scoreNote` and a **How these scores work** anchor link. Avoid duplicating `claim` a second time if section A already renders it. Do not separate the qualifier and rationale from the score.
4b. The interactive layers from section 5b, in this order: One claim, five ways, the facts behind the claim, situation picker (privacy only), quiz.
5. A wrapping **On this page** list of ordinary anchor links: **Meaning**, **Evidence**, **Actions**, **Sources and review**. No horizontal scrolling tab strip.
6. The full meaning, evidence and actions sections in that order, using their exact JSON bodies and headings from the mapping table.
7. **How these scores work**, with the exact public methodology below and the scoring disclosure.
8. **Sources and review**, rendering the complete G body, including every publication/update date and access limitation. Show the explicit AI review date separately if not in G. No claim of human review.
9. **In the news**: the three article cards, as specified in section 7.
10. Links **Explore the Claim Tracker** to `/claims` and **Back to the feed** to `/`.

Anchor destinations need enough `scroll-margin-top` to avoid header overlap. Metadata and important evidence labels are plain text, not green/red “safe/danger” badges. Preserve the distinction between observed outcomes, controlled experiments, projections, surveys/judgments and theoretical scenarios in the supplied copy.

Use this exact public methodology paragraph:

> We assess each claim on this page, the headline claim and the careful version, using five checks: the status of the evidence, the scope of the claim, the certainty of predictions, inflated language, and unsupported agency or intentions. The same issue is counted once. A claim that badly overstates its evidence, its scope or its certainty scores at least 4, the same way an overstated headline lifts an article's rating. Checks are marked met, not met, not applicable, or not checked. A calculated score summarizes the checked wording; an applicable unchecked item prevents a numeric score. The scale is coarse, so different claims can receive the same score. Evidence limitations and potential harm are explained separately. These claim ratings adapt the site's article checklist. The newsfeed's article ratings remain separate.

Show the scale as text: **1 Grounded · 2 A little spicy · 3 Turning it up · 4 Overheated · 5 Off the charts**. Always pair it with `section.scoreNote` where a reader could otherwise read the scale as a harm gauge.

Provide a keyboard-operable native `<details>` labeled **Detailed scoring checks**. Inside it, show two groups, **Headline claim** (`hype.checklist`) and **Careful version** (`carefulHype.checklist`), each with its five checklist rows as a list/card stack on mobile or a readable table on desktop. Map P1 → **Evidence status**, P2 → **Scope**, P3 → **Future certainty**, W1 → **Rhetorical inflation**, W2 → **Agency and mechanism**. Map Y → **Met**, N → **Not met**, NA → **Not applicable**, NC → **Not checked**. Show each supplied reason and direct supporting links; preserve `claim_phrase` where supplied. Source `locator` text may be shown as “Where to look.” Hide internal `evidence_row_id` values. Use source-link titles from `sourceLinks` when available, otherwise a descriptive label such as “Evidence for future certainty — source 1,” never a raw unexplained icon.

Within that disclosure, a compact optional calculation note may state:

> Evidence-status, scope and future-certainty checks form one group; language and agency checks form the other. Within each group, the share of met answers maps to levels: 100% → 1; at least 75% → 2; at least 50% → 3; at least 25% → 4; below 25% → 5. Each group needs at least two met/not-met answers. The two group levels are averaged; an exact half rounds down. If the first group reaches level 4 or 5, the score is at least 4, just as an overstated headline lifts an article's rating. An applicable “not checked” answer means no numeric score is shown.

Use the provided computed `hype` values; do not calculate claim scores by sending the explainers to the article engine. If a future content record is explicitly not assessable or lacks a valid level, show **Not yet assessable** with its supplied reason, without peppers or `0/5`. For this package all six scores are present. All six evidence-gap displays are qualitative; a numeric score in internal audit material must not override that design choice.

### 5b. Interactive layers

These layers carry the nuance so the headline can stay short. They add detail; they never hide the headline, score, score reason or key qualification. Use native buttons, `<details>` or radio inputs so everything works by keyboard and screen reader, with 44px tap targets. Respect `prefers-reduced-motion`. Render all text from `interactive` exactly.

- **Key word** (`keyWord`): highlight `keyWord.word` inside the h1 using the same orange wavy underline as the article markup view's hype highlights. It is a button (`aria-expanded`) that opens `keyWord.explanation` in a small panel just below the h1.
- **One claim, five ways** (`claimDial`: five versions of the claim, one per hype level 1–5, in order; each has `text` and `level`): heading **One claim, five ways**, hint “See how the same idea sounds from Grounded to Off the charts. The top headline and the careful version are real; the others are examples we wrote and scored with the same checks. Drag the needle, tap a level, or use the arrow keys.” Draw a polished semicircle gauge in SVG, not a flat line drawing: five thick arc segments, one per hype level, left to right **1 Grounded**, **2 A little spicy**, **3 Turning it up**, **4 Overheated**, **5 Off the charts**, coloured from cool green through yellow and orange to deep chilli red, each with a soft vertical gradient, a small gap between segments, the level number inside and its label outside the arc. A tapered needle with a drop shadow pivots on a round hub (purple with a yellow centre, matching the site). The active segment is fully opaque and slightly enlarged; the others are dimmed. Do not put any markers or extra labels on the gauge itself. The reader can move the needle: drag it (pointer events with pointer capture, `touch-action: none`, so it works by mouse and touch), tap any segment, or focus the gauge (`role="slider"`, `aria-valuemin=1`, `aria-valuemax=5`, `aria-valuenow`, `aria-valuetext` such as “Overheated, 4 out of 5: AI will take all our jobs.”) and use the arrow keys, Home and End. The needle snaps to the nearest level with a short springy animation (none if reduced motion is on). It starts on the headline's level. Below the gauge, a panel shows the selected level's peppers and `[label] · [n]/5`, a one-line meaning (1 “Matches what the evidence shows.” 2 “A bit stronger than the evidence, but the meaning holds.” 3 “Stretches the evidence enough to change how it's understood.” 4 “Much bigger or surer than the evidence.” 5 “Goes far beyond the evidence.”), and that level's `text` as a large quote. Show no other label with the quote. Use only the five hype labels on the gauge.
- **The facts behind the claim** (`finePrint`): heading **The facts behind the claim**, hint “Open each fact to learn more.” A stacked list of dropdowns, one per item: the closed row shows `label` (each starts “Fact:”) with a chevron; opening it shows `text` underneath. Every item has `linkText` and `url`: make that source name (it appears once inside `text`) a link to `url`, opening in a new tab. The closed row shows the whole `label` sentence, wrapping onto more lines as needed. Use a native disclosure (`<details>`/`<summary>`, or a button with `aria-expanded`); several can be open at once.
- **Situation picker** (`situationPicker`, privacy only): heading from `title`, hint “Pick the one that fits you. Based on OpenAI's published policies.” Radio options (`label`); the chosen option's `result` appears below.
- **Quiz** (`quiz`): heading **True or false?**, hint “Test yourself.” Each `statement` gets two buttons, **True** and **False**. After a tap, show “Right.” or “Not quite.” then the correct `answer` and `why`. Every `why` gives the context behind the answer. Answers are text, not colour alone.

### 6. Citations, dates and review status

Keep every inline citation in sections A–F; render every section G source/date note. Links in the body must be underlined, descriptive and keyboard accessible. Retain URLs, query strings and internal routes exactly; do not replace original evidence links with search results. Sources may open in the same tab. If you use new tabs, announce that consistently and use appropriate link security attributes.

Do not show any review label anywhere in the Claim Tracker: no **AI rating, not yet reviewed** and no **Reviewed by Leyla**, on topic pages, the landing page or article cards. Keep `reviewStatusText`, `humanEditorialReview` and `section.reviewLabels` as stored data only. The feed keeps its own labels unchanged. The AI check was an independent AI evidence review, not approval by a human expert.

Format ISO dates for US readers, e.g. **Research checked through October 6, 2026** and **AI evidence review: October 6, 2026**, using the actual fields. Do not update them on deploy, refresh, feed update or rebuild. Do not change publication dates recorded as “undated,” preprint dates, court-status dates or relative update labels in G into guessed dates. Source dates, research cutoff, AI review and future human-review dates are separate facts. A refreshed feed never silently refreshes the explainers' research.

### 7. In the news: article cards that link the claim to real stories

At the bottom of each topic page, under the heading **In the news**, show the three `articleCards` as cards, in the supplied order (`role` only sets the order; do not display it). Hint text, exactly:

> Real stories about this claim, rated with the same checklist as our feed. Article ratings are separate from the claim score above.

Each card shows, top to bottom:
1. **The rating, first.** The hype label for `hype` as a coloured badge (Grounded, A little spicy, Turning it up, Overheated, Off the charts, using the same colours as the gauge levels). No review label. Directly under it, the chillies with **Hype [n]/5** and the flags with **Evidence gaps: [None, Minor, Some, Major or Unsupported] · [n]/5**, faded icons for the unused ones as on the feed.
2. `outlet` · formatted `published` date, and `contextLabel` when present (for example **United Kingdom · international context**).
3. The article `headline` as the card title.
4. `ratingNote` in muted text, then `whyHere` under a small **Why it's here** label.
5. One link. Look up the feed's stored stories for one whose original URL equals `url` (ignore a trailing slash and `utm_` query parameters). If one exists, link to its story page `/story/[id]` with the text **See our full rating**, and show that story's own live ratings and labels (but no review label) instead of the supplied ones, so the card always matches the story page. If none exists, link to `url` with the text **Read the article at [outlet]**, opening in a new tab with `rel="noopener noreferrer"` and announced as opening a new tab.

Cards sit in one column on mobile and three across from 1024px. Never hide or reorder a card because of its rating; a "Pushes back" story can be hyped too, and that is part of the lesson. Do not call the article engine for these cards and do not create or edit stored stories from this page. If the story lookup fails, show the supplied ratings and the external link; the cards and the rest of the page stay readable.

Below the cards, add a small line: **Want to see how we rate a story? Browse the feed**, linking “Browse the feed” to `/`.

### 8. Accessibility and implementation boundaries

Use semantic `nav`, `main`, `article`, lists, headings and `time`. One h1 per page; h2 for the major sections. Add a visible-on-focus skip link. Body copy is at least 16px with line height around 1.6 and a reading measure around 65–75 characters; metadata/citations should stay comfortable at 14px or above. A mobile h1 around the existing 30px is appropriate.

Verify normal-text contrast at least 4.5:1, large text 3:1, and UI/focus indicators 3:1. Yellow is an accent background, not small text on white. Maintain visible focus/hover/active text contrast. Peppers are `aria-hidden`; a single text label carries the score. No color-only meaning, hover-only information or unlabeled icon controls. Minimum tap targets are 44px. On route changes place focus at the new page's h1, without trapping focus. Native disclosure controls must work with Enter/Space.

Check widths 320px, 390px, 768px and 1280px plus 200% zoom. Long claims, source links, review text, score labels and article-card headlines must wrap without page-level horizontal scrolling, clipping, text overlap or sticky obstruction. Keep essential controls out of the lower-right area occupied by the existing Lovable badge.

Keep the implementation small: local static JSON/module, shared components and two route patterns. Reuse the project's router and existing story read path. Do not introduce new databases, authentication, subscriptions, analytics collection, admin/CMS workflows, a scheduler or a chatbot. Do not modify article scoring prompts/calculation/schema, existing engine calls, ingestion jobs or existing stored data. The adaptation is for these recurring-claim content records only.

### 9. Acceptance checks before finishing

Complete these in preview and report pass/fail with any exact remaining issue. Do not claim live deployment or human editorial approval.

- **All routes:** `/`, `/claims`, all six listed `/claims/[slug]` routes and at least two existing `/story/[id]` routes work. Direct loads, refresh, browser Back, breadcrumbs and both header links work. Active nav is correct. `/claims/energy-climate` is the canonical climate route.
- **Complete exact content:** Six topics appear in the supplied order. Each A–G Markdown body is rendered once in the specified location, with the same wording and links as the attachment. Compare against `websiteCopyMarkdown`; headings/placement may differ, bodies must not. No omitted action, citation, qualification, source date or access limitation. No duplicated full article or placeholder.
- **Scoring:** All six headlines show **Headline hype: Overheated 4/5**. Careful versions show **Grounded 1/5**, except existential risk at **A little spicy 2/5**. Each score's reason line is visible next to it. Both five-check lists, for the headline and the careful version, remain accessible in **Detailed scoring checks**. All six evidence limitation sections are qualitative; no invented numeric evidence-gap values or safety percentages. No rescores were made by the article engine.
- **Statements and interactivity:** Every h1 and card heading is the `headline` statement, with no question marks. The key word is highlighted and opens its explanation by keyboard and tap. **One claim, five ways** shows the five hype labels (Grounded to Off the charts) and no others, starts on the headline's level, its needle moves by dragging, tapping a segment and the arrow keys, and every level shows its own version of the claim with no extra label. Fine-print chips, quiz and privacy picker work by keyboard, tap and screen reader. The headline, score, `hype.reason` and `keyQualification` are visible without any interaction.
- **Interpretation:** “The exact claim we scored” is always visible; every card/page keeps its qualifier. Jobs retains the original approximately 2026–2030 warning window, energy retains the comparison-baseline caveat, privacy remains limited to the stated personal-account policy, and existential risk retains its conditional future-superintelligence scope. These checks preserve supplied copy, not new additions. Score meaning is visible; no low-score “safe” badge.
- **Citations/resources:** Every supplied external inline link has the correct destination in the rendered page; internal `/claims/water` opens correctly. Check representative live sources and report any inaccessible links without inventing replacements or silently dropping them. Section G retains source dates and distinctions between publication date, data period and inspected policy date. No search-snippet substitutions.
- **Review/dates:** No Claim Tracker page or card shows **AI rating, not yet reviewed** or **Reviewed by Leyla**. Dates come from JSON, and rebuild/refresh does not change them. Feed articles keep their own review labels.
- **Article cards:** Every topic shows three cards in the order Makes the claim, Reports it carefully, Pushes back. Each card leads with its hype label badge (no review label), then chillies and flags with the right numbers, then outlet, date, headline, rating note and why-it's-here line. Water's Microsoft Atlanta card links to its existing `/story/dcf19ba9-804b-4919-8bf2-950f0d29c7d6` page and shows that story's live rating; cards with no matching story link out to the original article in a new tab. Test a failed story lookup: cards still show supplied ratings and links.
- **Mobile/accessibility:** At all four widths and 200% zoom, no clipping or horizontal page overflow. Two-row mobile navigation, one-column cards, readable labels/links, visible keyboard focus, skip link, anchor links and disclosure controls work. Screen-reader accessible score names contain numbers and words, not a sequence of peppers. Verify contrast.
- **Feed regression:** Before/after compare the current story order/content, existing timestamp, unrated state, rated/partly-checked labels, original-source links and article-detail functionality. Feed refreshing/loading/error behavior and article-engine paths stay intact. The only intended feed-body addition is the compact invitation. Claim content still loads when the feed request fails.
- **Scope:** No live publish, no new accounts/subscription/CMS/chatbot, no changes to stored articles or engine behavior. Finish with preview access, changed-component summary and validation results.
