# Claim Tracker: decisions log

Every decision Leyla has made about the claims section, in one place. Newest first within each day. Details and reasons are in [Leyla's review](review/leyla-review-2026-10-06.md); the site-wide summary is the "Claim Tracker" entry in `master-project-brief.md`.

## Standing rules

- **Real sources only.** Every headline claim and every "In the news" article is real and linked. Never invent a source or a headline.
- **Plain English everywhere.** Write for a general US reader. No research jargon (for example "reasoned scenario").
- **Statements, not questions.** Each page leads with the claim as a statement.
- **Article text stays private.** Full article text and checklist quotes live in the private repo `ai-news-articles` (`claims-cards/ratings/`), never in this public repo.
- **Claim Tracker names this section only.** The site stays **Decoding the Hype**, with its own logo and tagline ("Be on top of the news and under the hype").

## October 9, 2026

| Decision | What it means on the page |
|---|---|
| Sections clearly separated | Leyla: the sections bled into each other. Each interactive section and In the news is now its own panel with a coloured top band, a light tint and a coloured dot before the heading: From calm to clickbait purple, The Facts yellow, situation picker blue, True or false? green, In the news orange. |
| No reason sentence under the careful version | The sentence explaining the careful version's score (for example “The more careful version says “threaten” and talks only about some places, which matches what the evidence shows.”) is removed from every claim. The careful box now shows the quote, “Our wording, based on…”, and the score. The reason stays in the data and the detailed scoring checks. |

## October 8, 2026

| Decision | What it means on the page |
|---|---|
| **Act on what’s real** section (draft, not yet in the prototype or Lovable prompt) | A call-to-action section for every claim, from Leyla’s idea that each claim hides a real concern people can act on. A purple banner says what the hype gets wrong and names the real concern, then three cards: **Learn**, **Speak up**, **Take action**, two actions each with one checked link (the Learn card always adds “Check the next headline you see” with a link to Decoding the Hype). Nonpartisan: it says how to be heard, never which side to take; footer: “We don’t tell you which side to take, only how to be heard. Speaking up doesn’t guarantee an outcome.” Draft page: `design/act-on-whats-real-draft.html`; content: `design/act-on-whats-real.json`. To pick up next: Leyla reviews the draft, then it moves into the prototype, content files and Lovable prompt. Open question: the creativity “Team up” link is a story about artists suing AI companies, which leans to one side. |
| Act cards: outline icons, no level labels | Simple purple outline icons (book, megaphone, map pin) straight on the coloured cards, no white circles. The small labels “Start here”, “Takes a few minutes”, “Bigger impact” were removed. The third card was “Get local”, renamed **Take action**. |
| Section title **Act on what’s real** | Picked by Leyla from: Act on what’s real, Your move, From worry to action, Make your voice count, What you can actually do. |
| Facts shown as an **icon grid**, six facts per claim | Leyla picked the icon grid over big-number tiles. Each fact is a tile with an emoji icon, a short tag and the fact sentence; tapping opens the paragraph and source in a panel under its row. Two columns on phones, three on wider screens. Every claim now has six facts. New sixth facts: jobs (BLS 2025–2035 projections), existential risk (Forecasting Research Institute tournament), energy (IEA on on-site gas power), data centers (Virginia sales tax exemption, $928 million in FY2023), creativity (Thaler v. Perlmutter), privacy (OpenAI government requests report, H2 2025). |
| Big-number tiles tried and dropped | A draft showed each water fact as a big number ("5 drops", "4 in 10"). Leyla didn't like it and chose the icon grid instead. |
| Water gets a **sixth fact** | So the facts fill an even grid (Leyla). New fact: most water linked to US data centers is used at the power plants that supply their electricity (Berkeley Lab 2024: about 66 billion liters on site vs nearly 800 billion for electricity in 2023). |
| Facts section renamed **The Facts** | Was "The facts behind the claim". |
| Dial renamed **From calm to clickbait** | Was "One claim, five ways". Hint now reads "Drag the needle or click on a level." (arrow keys still work, just not mentioned). |
| Quiz becomes a **card carousel** | One colourful card per true/false statement, swipeable, with arrows and dots. Card colours repeat purple `#3B1E6E`, yellow `#FFD84D`, lavender `#C5A8FF` (no orange, red or green cards, so the answer colours stand out). Answer panel sits on the card; after the last card, "You got N of 3 right." Tried on water first, then all seven claims. |
| Quiz feedback says **Correct / Not correct** | After a tap: "Correct! This statement is false." or "Not correct. This statement is false.", then the explanation. The correct answer's button turns green with a ✓; a wrong tap turns red with a ✗. Uses the site's own green `#1BAF7A` and red `#DB2E4B` (the evidence-gap flag colours). Replaces "Right. False." |
| New claim: **Data centers** | "Data centers will destroy our community." Tracked from Gina Mangham of Renew DeKalb in a November 2025 CBS News Atlanta story. Scores 3/5 (Turning it up): "will" states as certain something that depends on local votes and utility rules, and "destroy" turns real but limited costs into ruin. Careful version 1/5. Route `/claims/data-centers`, placed after Energy and climate. Water and climate stay on their own pages. Seven claims in all. |
| Prototype saved in the repo | The latest clickable prototype is kept at `design/claims-prototype.html` (open it in a browser). |

## October 7, 2026

| Decision | What it means on the page |
|---|---|
| "AI art is theft" is 3/5 | Leyla: artists didn't consent to training. With that point the scope check passes, and "theft" counts as a loaded crime word instead. Score 3/5 (Turning it up). |
| Section renamed **The facts behind the claim** | Was "The facts behind the headline". |
| Facts made fuller, all six claims | Each fact's label is a full sentence with its own context, the dropdown is a paragraph (about 60–90 words), and each links one low-hype, well-evidenced source (government agencies, research papers, court records, or the company's own policy page when the fact is about that policy). No fact repeats a point from its short answer. Five facts per claim. |
| Water short answer rewritten | Opens "Not quite, but there is real reason for concern." Clearer wording that explains where the bottle figure comes from (a 2023 study, linked) and that it was one bottle per 10 to 50 answers. The duplicate "bottle" fact was removed, leaving four water facts. |
| **Why this score** | A small heading above the sentence that explains each headline's score. |
| Source line links to the source | In "Claim tracked from…", the article or book title itself is the link (no separate "See the source"). "Tracked from" means a real published example, not necessarily the first time anyone said it. Where we found and checked an earlier source, a second line shows it: existential risk (Yudkowsky's March 2023 TIME essay). Water's earlier source (the April 2023 study) is now one of its facts. |
| Energy headline | "AI will make climate change worse." Tracked from Juan Cole's December 2025 Nation article "AI Will Only Intensify Climate Change…". Without "only" it no longer rules out climate benefits, so it scores 2/5 (A little spicy); "will" still overstates certainty. The Nation's original wording stays on the dial at 4/5. |
| Fine print becomes **The facts behind the headline** | Each item is a dropdown whose label starts "Fact:", for example "Fact: Not all data centers are used for AI." Every fact and every true/false answer rewritten in plain English, re-checked against the sources, with more context in each answer. Water adds Google's own estimate (about five drops per Gemini question, August 2025). |
| Topic order | Water, Jobs, Existential risk, Energy and climate, Creativity, Privacy. (Data centers added after Energy and climate on Oct 8.) |
| Certain-doom rule (rubric claims-us-1.2) | A loud claim that says, as certain, that everyone will die scores 5/5. Chosen on a decision card over a one-off override. "AI will kill us all" is now 5/5 (Off the charts); its careful version stays 2/5. On its dial, the headline sits at level 5 and a new example fills level 4. |
| Source line says "Claim tracked from…" | Under each headline: "Claim tracked from [who], who made it in [where, when]…". No "Our short version of…". Where the headline is shorter than the original, the original is quoted. |
| No review labels in the Claim Tracker | "AI rating, not yet reviewed" and "Reviewed by Leyla" don't appear on claim pages or article cards. The data is kept; the feed keeps its labels. |
| No topic labels above headlines | No "Jobs", "Water" etc. above the h1. |
| Section named **Claim Tracker** | Whole section (was "AI claims explained"). Route stays `/claims`. |
| Existential-risk headline | "AI will kill us all." Tracked from the Yudkowsky and Soares book title "If Anyone Builds It, Everyone Dies" (2025). Scores 5/5 under the certain-doom rule. |
| Water headline | "Every time you use AI, it uses a bottle of water." Tracked from Windows Central, September 11, 2023. Scores 4/5. |
| No role tags on article cards | "Makes the claim / Reports it carefully / Pushes back" set the order only and aren't shown. |
| Dial named **One claim, five ways** | "Turn up the heat" was rejected, because the site is about not turning up the heat. "How hot is this claim?" didn't describe it. |
| One claim wording per hype level | The dial shows a version at every level 1–5. Headline and careful version are real; the other three are example wordings, scored with the same claims checklist. No labels (like "the careful version") next to the quotes. |
| Careful version explained | Box reads "Our wording, based on…", then its score (the "why" sentence was removed on Oct 9). The careful versions are our wording, not published quotes. |
| "We also scored a more careful way…" line deleted | |
| Short answer comes first | "Is it true? The short answer" sits before the careful-version box. |
| Who said it | Every headline has a line saying who made the claim and where. |
| Dial markers removed | No "HEADLINE" or "CAREFUL" markers on the gauge. |
| Article cards lead with the rating | Hype label badge first, then chillies and flags with numbers. All 18 ratings re-checked. Block and Microsoft cards use Leyla's own ratings. |
| Gauge uses only the hype labels | Grounded, A little spicy, Turning it up, Overheated, Off the charts. No "Just right" or "Overhyped". Readers can drag, tap or use arrow keys to move the needle, and it should look polished. |
| Quiz is True/False only | Anything "not proven" counts as False. |
| "But…" renamed | Now "What the headline leaves out" (later "The facts behind the claim"). |
| "Spot the hype" removed | Added and removed the same morning. |
| Semicircle gauge | Not a thermometer. |
| "In the news" cards | Three real, rated articles per claim at the bottom of each page, linking to the story page when it's in the feed, otherwise to the original article. |
| Fun and interactive | Explanations should be playful and interactive, not just text. |
| Plain-English rewrite | All explanations rewritten for a general reader (about grade 7–9). |

## October 6, 2026

| Decision | What it means on the page |
|---|---|
| Spicier headlines | Each page leads with a loud claim someone actually published, scored, next to the careful version. |
| Loud-claim rule (rubric claims-us-1.1) | If a claim fails enough accuracy checks to reach level 4 or 5, it scores at least 4. Chosen on a decision card. |
| Statements and interactive layers | Headlines are statements; nuance moves into tappable layers. Headline, score and its reason always visible. |
| Evidence-gap flags off for claims | Only hype is scored; evidence limits are in words, and the score note says why. |
| Kept separate from "Common claims" | The brief's Common claims page stays as planned. |
| "US", not "U.S." | |
