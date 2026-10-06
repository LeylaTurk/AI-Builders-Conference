# Final package validation

Coordinator validation completed October 6, 2026. Independent AI evidence review is complete; human editorial review remains pending. No live website implementation or publication was performed.

## Content and mechanical checks — passed

- Six research briefs, six A–G website explainers, and six structured five-check score records are present.
- All 42 final section bodies in the attachment match the source explainers. The original Markdown is also preserved exactly for comparison; no factual rewriting occurred during assembly.
- All 12 SHA-256 source hashes (six explainers and six scoring inputs) match the finalized files.
- Exact claim text agrees between each explainer, scoring input, content attachment and Lovable prompt.
- Every A–F section contains an external inline citation. Website copy contains 67 distinct external source URLs; presence is a mechanical check, while inspection and support are documented in the independent evidence-review report.
- Each explainer meets the target lengths and has three to five actions. Counts below strip Markdown URLs/formatting, omit headings and section G, and count hyphenated compounds as one word; editorial word processors can differ slightly.
- The shared calculator reproduces five 1/5 scores and existential risk 2/5. All five answers have reasons, source URLs and passage locators. The structured input checks cover required fields, answer enums and supporting metadata; this is not an independent truth test.
- All six AI-review dates are October 6, 2026. Human-review status is pending, with reviewer/date null. Public copy contains no attribution of review to Leyla.
- All six evidence-gap displays are qualitative with null numeric scores. The energy brief's optional internal calculation is not exposed as a lone public number.
- Routes use the canonical `energy-climate` slug. Jobs and creativity have empty related-story arrays; three distinct real story IDs serve the other four pages with their context labels.

| Topic | A–F words | Short answer | Actions | Proposed hype |
|---|---:|---:|---:|---|
| water | 539 | 64 | 3 | 1/5 — Grounded |
| jobs | 512 | 64 | 4 | 1/5 — Grounded |
| energy-climate | 545 | 64 | 3 | 1/5 — Grounded |
| creativity | 545 | 68 | 4 | 1/5 — Grounded |
| privacy | 547 | 64 | 5 | 1/5 — Grounded |
| existential-risk | 510 | 66 | 3 | 2/5 — A little spicy |

## Handoff and design — checked

The designer and coordinator inspected the final `claims-content.json` and `lovable-prompt.md`. The prompt identifies one required attachment and explains exactly how to supply it in the same Lovable message. It includes the exact six-claim/score table and maps all public content fields. It preserves the current feed and article engine, specifies the observed design identity and responsive layouts, handles citations and review dates explicitly, and includes missing-story behavior.

The designer independently compared all 42 section bodies and 12 hashes. The coordinator independently checked exact copy, claims, score metadata, dates, routes, qualitative limitations, story mapping and the final prompt. The prompt tells Lovable not to render internal audits/hashes as product copy, not to invent or rewrite facts, and not to publish. Desktop/mobile wireframes and future build acceptance checks are included.

The deliverable index and summary link to the required local artifacts. Relative deliverable links were checked after final assembly; repository snapshots retain their original contents and are excluded from that local-link check.

## Scope of verification

Source support and retrieval limits are recorded in [the independent evidence review](evidence-review-report.md); [four corrections](corrections.md) were returned to their researchers and independently verified. This package check does not repeat or extend those source certifications.

No new UI was built. The Lovable prompt's route, contrast, keyboard, mobile, citation-rendering and feed-regression checks are acceptance requirements for a future preview implementation, not tests already passed by a changed website. The current live site was inspected at desktop and mobile sizes as recorded in the design audit. Human editorial approval and any future decision to publish remain outstanding.
