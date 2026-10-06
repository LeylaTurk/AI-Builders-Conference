# Decision summary

> **Update, October 6, 2026 (Leyla's review):** headlines are now plain statements, not questions, and nuance moves into tap-to-open interactive layers (key word, claim dial, fine print, quiz, privacy picker). The headline, score, score reason and key qualification stay visible without tapping. Labels match the feed: “AI rating, not yet reviewed”. See [the review](review/leyla-review-2026-10-06.md) and section 5b of the [Lovable prompt](handoff/lovable-prompt.md), which override the matching rules below.

Research cutoff: October 6, 2026. This package is a content and implementation handoff for Decoding the Hype. It does not modify or publish the live website. Human editorial review remains pending.

## Recommended product decision

Add **AI claims explained** alongside **Feed**, with six cards and a shared, readable detail-page layout. Preserve the purple, lavender, yellow, serif and pepper identity verified on the live site. Keep the exact claim, its key qualification, proposed hype score and cited explanation together. Show evidence limitations separately in words. The live article-rating engine and feed remain unchanged.

Use one static content collection and six routes. No accounts, subscriptions, chatbot or publishing system are needed. Curated existing stories provide clearly labeled context, not the evidence base. Jobs and creativity launch with honest empty states; their inspected feed candidates did not provide a sufficiently direct match.

## Final claims and proposed scores

These scores apply only to the displayed proposition. They are not ratings of an entire topic, forecasts of harm, or verdicts on every version of the reader's question.

| Topic | Exact claim under examination | Proposed hype | Main unresolved issue |
|---|---|---|---|
| [Water](explainers/water.md) | AI data-center growth threatens local water supplies in water-stressed US communities. | **1/5 — Grounded** | Facility-level and peak-demand data are incomplete; national all-data-center estimates cannot establish a particular town's shortage or AI-only use. |
| [Jobs](explainers/jobs.md) | AI could eliminate half of US entry-level white-collar jobs within one to five years. | **1/5 — Grounded** | This is a conditional scenario from May 2025, approximately 2026–2030. Its fraction and timetable are unvalidated; observed employment changes do not establish how much AI caused. |
| [Energy and climate](explainers/energy-climate.md) | AI’s growing electricity demand could increase US carbon emissions by 2030. | **1/5 — Grounded** | The comparison is extra emissions versus a path without the added demand, not necessarily rising total national emissions. Future supply, demand and offsets are uncertain. |
| [Creativity](explainers/creativity.md) | Generative AI can reproduce copyrighted material from its training data. | **1/5 — Grounded** | Targeted tests establish possibility, not ordinary-use frequency. US legal outcomes depend on conduct and facts; economic findings are not nationwide creator-income estimates. |
| [Privacy](explainers/privacy.md) | ChatGPT may use personal-account conversations to train its models, depending on your settings. | **1/5 — Grounded** | Official policies establish stated practices, not audited compliance or a personal exposure probability. Product, account, setting and state-law boundaries matter. |
| [Existential risk](explainers/existential-risk.md) | If anyone builds artificial superintelligence using techniques and understanding like those available in 2025, everyone on Earth will die. | **2/5 — A little spicy** | Current capabilities and incidents do not establish the inevitable extinction asserted after the condition. Timing, scaling, defenses and recovery remain contested. |

Each page leads with a plain headline statement (changed October 6 from the original reader questions); **The exact claim we scored** label keeps assessment distinct from endorsement. Public occurrences, transparent paraphrases and exclusions are documented in each brief. No claim is described as the most common without prevalence evidence.

## Why the scores look like this

The [repository audit](scoring/repository-audit.md) verified `main` at [dc88b53d7750ad5c39403428815ff82b7d575b74](https://github.com/LeylaTurk/AI-Builders-Conference/commit/dc88b53d7750ad5c39403428815ff82b7d575b74), matching the supplied reference. Four required files were inspected and preserved as versioned snapshots. The [claim rubric](scoring/shared-rubric.md) retains the checklist/section calculation and five hype labels, adapts claim proportionality and wording, and removes article-specific headline/interview duties.

The method is deliberately coarse and is not a validated probability scale. The jobs draft changed from 2 to 1 after the independent reviewer and scoring specialist found that missing quantitative calibration had been treated as excess certainty despite “could” and an articulated scenario. The corrected text keeps that forecast's limitations prominent. The extinction claim retains a P3 failure because it asserts an inevitable consequent; its severity is not counted again as rhetoric. See the [calibration record](scoring/cross-topic-calibration.md) and [correction trail](review/corrections.md).

Five 1s do not make five risks small. Human review and a reader-comprehension check should assess whether the inherited playful labels communicate this distinction clearly; no such user test has been performed.

## Remaining limitations and update needs

- The [independent AI review report](review/evidence-review-report.md) records exactly what was inspected and any retrieval barriers. This is AI research and editorial review, not human approval, a legal opinion, a provider compliance audit or new empirical research.
- Some original material could not be retrieved, including the full Cornell paper. Numerical conclusions depending on inaccessible material were excluded. Other evidence remains dated, modeled, observational, selected, self-reported or contingent as stated on the pages.
- Recheck privacy policies, legal decisions, labor updates and new capability incidents before delayed publication. Changes require deliberate content review and rescoring if the claim or evidential judgment changes; deployment must not refresh dates automatically.
- The live-site inspection covered responsive desktop/mobile views and actual story routes. It was not a physical-device or full accessibility audit. Implementation acceptance checks remain for the future Lovable build.
- Resolve curated related-story IDs through the live feed when implementing; records may disappear. No similarity matching based only on the word AI is proposed.

## Implementation handoff

Upload **[claims-content.json](handoff/claims-content.json)** in the same Lovable message as the **[final Lovable prompt](handoff/lovable-prompt.md)**. The JSON is the required content attachment; it includes all six exact texts, citations, calculated scores, checklist records, review dates and story candidates. The [Markdown companion](handoff/claims-content.md) is for convenient human reading. Lovable must not invent or independently rewrite the factual copy.
