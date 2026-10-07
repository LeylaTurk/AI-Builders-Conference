# Review of the AI claims package (October 6, 2026)

Asked for by Leyla: check that everything in `workstreams/ai-claims-us` lines up, that each explanation is easy for readers, that claims read as statements rather than questions, and how to show the nuance in an interactive way.

**Short version:** the package is internally consistent and well sourced, but it is written for researchers, not the public. Pages open with a question, the scored claims carry so many qualifiers that five of six score 1/5, and the design spec rules out the interactive layer you want. The proposed fix is in [`../proposals/statements-and-interactive.md`](../proposals/statements-and-interactive.md): a short, plain statement as each page's headline, with the nuance moved into tappable layers underneath.

## What checks out

- **The content file matches its sources.** Re-running `handoff/assemble-content.py` rebuilds `claims-content.json` byte for byte from the six explainers, score records and metadata.
- **The scores add up.** Running `scoring/claim-score.py` on each topic's score record gives the same score the page shows (five at 1/5, existential risk at 2/5).
- **The scoring method matches the site's engine.** The snapshots in `scoring/source-snapshots/` are identical to today's `engine/` files and `master-project-brief.md` (apart from trailing blank lines), so nothing has drifted since the research was done.
- **The hype labels match the brief** (Grounded, A little spicy, Turning it up, Overheated, Off the charts).
- **The sourcing is careful.** Every factual sentence has a link, dates are recorded, and the research briefs list what couldn't be checked.

## What doesn't line up

| # | Issue | Where | Proposed fix |
|---|---|---|---|
| 1 | **Pages open with a question** ("Will AI kill us all?", "Is AI draining our water supplies?"). The design spec makes the question the page headline (h1) and the Lovable prompt follows it. | `readerQuestion` in `claims-content.json`; design recommendation §Detail-page step 1; explainer titles | Use a plain statement as the headline. Drop the question or keep it only as a small "People ask:" line. |
| 2 | **The claims are too narrow to be interesting.** Each researcher scored the most careful defensible version ("could", "may", "in water-stressed communities"), so five of six get 1/5 Grounded. A reader sees a row of "Grounded" cards on topics they think of as hyped. The louder versions people actually hear ("AI is draining America's water", "every prompt uses a bottle of water") are listed in the research briefs but never shown on the page. | Every explainer section A and E; research briefs' "not scored" lists | Show the louder and softer versions on a "claim dial" around the scored one (see proposal). Whether to score them too is your call (decision below). |
| 3 | **Reading level is too high for the public.** Estimated US school grade: water 11.8, jobs 11.8, energy 11.6, privacy 12.2, creativity 14.0, existential risk 14.7 (rough Flesch–Kincaid estimate). Words like "proposition", "consequent", "interlocutory appeal", "partial-summary-judgment", "heat-rejection system" and "de-identification" appear in reader copy. | All six explainers | Plain short answers (about 60 words, grade 8–9) in the proposal. Long-form detail stays for readers who tap "Read the full evidence". |
| 4 | **The design spec forbids interactivity.** It says pages need "no accordions, tabs, a sticky side panel or a drawer", and the Lovable prompt repeats this. | Design recommendation §Detail-page reading order; Lovable prompt line 101 | Allow tap-to-open layers, as long as the headline claim, its key qualifier, the score and its reason are always visible without tapping (the spec's real concern). |
| 5 | **No Evidence gaps flags.** The site shows every rating as chillies *and* flags, and the brief says "a serious, well-evidenced warning should show 1 chilli and 1 flag". The claims pages show chillies only and describe evidence gaps in words. | Design recommendation; `evidenceGaps` fields are null | Default: keep words only for launch (the gap checks weren't scored), but say so on the "How these scores work" note so readers don't wonder where the flags went. |
| 6 | **Review label wording differs from the feed.** Claims say "Proposed claim hype" and "Human editorial review pending"; feed ratings say "AI rating, not yet reviewed" and "Reviewed by Leyla" (changed October 6). | Explainer section G; design recommendation §Review status | Use the feed's wording: "AI rating, not yet reviewed", switching to "Reviewed by Leyla" once you've read each page. |
| 7 | **This feature isn't in the brief.** The brief's "Common claims" page (Should have, built last) groups *rated feed stories* by claim type. This package is a different thing: six hand-researched explainers with a new **AI claims explained** menu item. Only jobs and existential risk overlap the brief's nine claim types. | `master-project-brief.md` §"Common claims" | Add a brief entry saying AI claims explained replaces (or sits beside) Common claims. I haven't changed the brief; tell me which and I'll add it. |
| 8 | **"U.S." and "US" are mixed.** Water, energy and privacy use "U.S."; jobs and creativity use "US". | Explainers | Pick one ("US" is shorter and matches the brief). |
| 9 | **Jobs headline could mislead over time.** "Within one to five years" was said in May 2025, so it really means about 2026–2030. The page explains this, but only in small print. | Jobs explainer section A | Put "by about 2030" in the headline itself. |

## Wording changes and scores

The rubric says "a material wording change requires rescoring". The headline statements in the proposal are plain-English versions of the exact scored claims and keep the words that decided each score ("could", "may", "can", "threaten", "will", "2025-era methods"), so the scores should carry over. Each one is flagged in the proposal so you can confirm. The original scored sentence stays on the page, labelled "The exact claim we scored".

## Decision needed

**Should the louder and softer versions on the claim dial get their own chilli scores?**

- **Keep them unscored for launch (default I'm using).** They appear as "versions we didn't score", taken from the research briefs. No new research needed.
- **Score them too.** The dial becomes much more telling (for example "AI is draining America's water" would likely score high), but each version needs a real public example and a full rubric pass before it can carry chillies.

## Not changed

No explainer, score, content file or Lovable prompt has been edited yet. Once you've picked headlines and interactive pieces, the next step is updating the explainers, `claims-content.json` and a new Lovable prompt to match.

## Changes applied (October 6, 2026)

Leyla asked for the fixes to be made, using the defaults above.

| # | What changed |
|---|---|
| 1 | Each explainer title and the `headline` field are now plain statements. `readerQuestion` is gone from the content file. |
| 2 | New `handoff/interactive-layers.json` holds the key word, claim dial, fine print, quiz and privacy picker. The louder and softer dial versions stay **unscored**. |
| 3 | Every short answer (section B) is rewritten in plain language, 55–75 words, keeping inline sources. Sections C–F are unchanged. |
| 4 | The Lovable prompt has a new section 5b for the interactive layers, and the design recommendation and decision summary carry an update note. |
| 5 | Evidence-gap flags stay off. The score note now tells readers why there are no flags. |
| 6 | Labels now read "Claim hype" and "AI rating, not yet reviewed", switching to "Reviewed by Leyla" once a topic is marked reviewed. |
| 7 | The brief has a new "AI claims explained" entry. Common claims stays as it was. |
| 8 | "U.S." is now "US" in the explainers, score records and metadata. The archived research briefs are left as written. |
| 9 | The jobs headline says "by about 2030". |

The exact scored claims are unchanged apart from the US spelling, so no scores changed. `assemble-content.py` now also checks that each headline is a statement, contains its key word, and matches the dial's scored version.

## Spicier headlines (October 6, 2026)

Leyla asked for spicier headlines, like "AI will take all our jobs". Each page now leads with a loud claim that a real outlet or author published, with its own score. The careful version stays on the page and on the dial as "what the evidence supports".

| Topic | Headline claim | Where it was said | Headline | Careful |
|---|---|---|---|---|
| Water | Every AI-written email uses a bottle of water. | The Washington Post, September 2024 | 4/5 | 1/5 |
| Jobs | AI will take all our jobs. | CNN, May 2024 (Elon Musk) | 4/5 | 1/5 |
| Energy and climate | AI will only intensify climate change. | The Nation, December 2025 | 4/5 | 1/5 |
| Creativity | AI art is theft. | Goetze, arXiv paper, 2024 | 4/5 | 1/5 |
| Privacy | ChatGPT is sharing your secrets. | Tom's Guide, April 2023 | 4/5 | 1/5 |
| Existential risk | If anyone builds superintelligent AI, everyone dies. | Yudkowsky and Soares, book title, 2025 | 4/5 | 2/5 |

**Rubric change, claims-us-1.1 (loud-claim rule).** Under 1.0, each headline failed two or three accuracy checks but passed both wording checks, so averaging gave 2/5 (privacy 3/5). The new rule, which mirrors the article headline rule, says that if the accuracy section reaches level 4 or 5, the score is at least 4. The careful versions are unaffected. Leyla chose this on a decision card on October 6; it can be reverted by removing one line in `scoring/claim-score.py`.

The headline score records (`research/*-headline-score.json`) are an AI research draft. Unlike the careful versions, they have not had an independent evidence review. The Washington Post page returned an access error at cutoff, so its figure was confirmed through TechRepublic's summary.

## Plain-English explanations (October 7, 2026)

Leyla asked for the explanations to be in plain English. Sections A (careful-version context), C (meaning), D (evidence), E (score explanations) and F (actions) are rewritten for a general reader on all six pages. So are the key qualifications, evidence limitations, scope and time-horizon lines in `handoff/editorial-metadata.json`. The facts, numbers and every source link are unchanged; a script confirmed the same set of links before and after. Estimated reading level dropped from about US grade 11–14 to grade 7–9. Headlines and scores are unchanged. Section G (sources and dates) and the detailed scoring-check reasons keep their reference wording.

## Games, gauge and article cards (October 7, 2026)

Leyla asked for something fun on the explanations, and for real articles, rated, shown as cards at the bottom of each page to link the claims to the rest of the site. She also asked for the claim dial to become a semicircle dial reading "just right" to "overhyped".

- **Spot the hype** (a tap-the-hype-words game) was added, then removed at Leyla's request the same morning.
- **Hype gauge**: a semicircle gauge using only the five hype labels (Grounded, A little spicy, Turning it up, Overheated, Off the charts), with a needle readers can drag, tap or move with arrow keys; the panel underneath shows which version (headline or careful) lands at each level. The unscored dial versions are gone, because they have no level to sit at. (Leyla, 7 Oct: first a thermometer, then a semicircle, then the hype labels instead of "just right / overhyped".)
- **In the news** (`handoff/article-cards.json`): three real articles per topic, one that makes the claim, one that reports it carefully, one that pushes back. Each was found and checked against the live page, then rated with the site's own article checklist (`engine/rating-prompt.md`, scored with a Python copy of `engine/scoring.ts`). Leyla's own Rating Desk ratings are used where she has one (Block layoffs, Microsoft Atlanta). Article text and the full checklist answers with quotes are in the private archive under `claims-cards/ratings/`, not here. On the site, a card links to the story page when the story is already in the feed, otherwise to the original article.
- The old related-stories list (`design/related-stories.json`) is replaced by the cards. Microsoft Atlanta carries over; the Australia privacy and "WarGames" stories were dropped because their full text couldn't be read for a rating here.

Things worth knowing: a "pushes back" story can be hyped too (CNN's "Don't freak out" column and the Microsoft story both score 4 for hype), and a scary claim can be reported calmly (CBS's "10% chance" story scores 2). All three jobs cards are CNN, and two existential-risk cards are CBS, because those were the best fits with readable full text. The privacy "says it loud" article is from 2023.

Article cards now lead with the hype label badge and review label, then chillies and flags with their numbers (Leyla, 7 Oct). The "Says it loud" role is renamed "Makes the claim", because some stories that make the claim report it calmly (CBS's 10% story is A little spicy). All 18 ratings were re-run from the private checklist files and match the cards; the Block and Microsoft cards use Leyla's current Rating Desk ratings (4/3 and 4/5).

**Turn up the heat (7 Oct, Leyla).** The gauge is renamed **Turn up the heat** and shows one version of the claim at every hype level. The top headline and the careful version are the real ones; the other three per topic are example wordings written for the gauge and scored with the claims checklist (their check answers are in `claimDial[].hype_checks`, and the assembler recalculates each level). The page says so in the gauge's hint. The small labels next to each quote are gone.
