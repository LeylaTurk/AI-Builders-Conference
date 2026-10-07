# Claim Tracker (was "AI claims explained"): research and Lovable handoff

For Decoding the Hype. US adult audience; American English. Research cutoff: **October 6, 2026**. **Independent AI evidence review and package validation complete; plain-language review and spicier headline claims (rubric claims-us-1.1) applied October 6.** This folder archives the complete research and design package. No live website, feed or article rating was changed.

**Every decision Leyla has made is in [DECISIONS.md](DECISIONS.md).** Start there, then the original [decision summary](02-decision-summary.md). **October 6 review:** see [Leyla's review](review/leyla-review-2026-10-06.md) and the [proposal for statement headlines and interactive layers](proposals/statements-and-interactive.md) before building. To implement later, upload [claims-content.json](handoff/claims-content.json) to Lovable and paste the [Lovable prompt](handoff/lovable-prompt.md) in the same message. The prompt and attachment are self-contained; Lovable does not need this conversation or other local files.

## Six research briefs and website explainers

| Topic | Research, evidence table and limitations | Concise website copy | Reproducible scoring input |
|---|---|---|---|
| Water | [Brief](research/water.md) | [Explainer](explainers/water.md) | [JSON](research/water-score.json) |
| Jobs | [Brief](research/jobs.md) | [Explainer](explainers/jobs.md) | [JSON](research/jobs-score.json) |
| Energy and climate | [Brief](research/energy-climate.md) | [Explainer](explainers/energy-climate.md) | [JSON](research/energy-climate-score.json) |
| Creativity | [Brief](research/creativity.md) | [Explainer](explainers/creativity.md) | [JSON](research/creativity-score.json) |
| Privacy | [Brief](research/privacy.md) | [Explainer](explainers/privacy.md) | [JSON](research/privacy-score.json) |
| Existential risk | [Brief](research/existential-risk.md) | [Explainer](explainers/existential-risk.md) | [JSON](research/existential-risk-score.json) |

## Method, review and design

- [Shared scoring rubric](scoring/shared-rubric.md), [GitHub audit and adaptation map](scoring/repository-audit.md), [version record](scoring/repository-version.json), [final cross-topic calibration](scoring/cross-topic-calibration.md).
- [Independent AI evidence-review report](review/evidence-review-report.md), [corrections and verification](review/corrections.md), [package validation](review/package-validation.md).
- [Live-site inspection](design/01-live-site-audit.md), [design recommendation](design/02-design-recommendation.md), [annotated desktop/mobile wireframe](design/03-annotated-wireframe.md), [curated related-story mapping](design/related-stories.json).
- [One-file content attachment](handoff/claims-content.json), [readable copy companion](handoff/claims-content.md), [copy-ready Lovable prompt](handoff/lovable-prompt.md).

## Dedicated assignments actually used

Nine dedicated agents contributed, in batches of up to three alongside the coordinator. Scoring and the designer's site inspection started before topic scoring. Every researcher received `claims-us-1.0` before final scoring. The evidence reviewer was separate from all six topic researchers; requested corrections were returned to their authors and then independently checked. The coordinator assembled the final content and verified package consistency.

| Dedicated agent | Output ownership |
|---|---|
| `scoring_specialist` | Repository inspection, shared rubric/calculator/schema, final score calibration |
| `product_designer` | Live desktop/mobile inspection, layout recommendation/wireframe, final Lovable prompt |
| `water_researcher` | Water brief, explainer and scoring record |
| `jobs_researcher` | Jobs brief, explainer and scoring record; returned scoring correction |
| `energy_researcher` | Energy/climate brief, explainer and scoring record; returned scope clarification |
| `creativity_researcher` | Creativity brief, explainer and scoring record; returned legal-status clarification |
| `privacy_researcher` | Privacy brief, explainer and scoring record |
| `existential_risk_researcher` | Existential-risk brief, explainer and scoring record; returned date-provenance clarification |
| `evidence_reviewer` | Independent source inspection, correction log and verification, residual limitations |

Scoring labels describe the wording/evidence relationship, not the probability or severity of harm. All scores remain proposed until human editorial review. AI review completion and its limits are documented in the review report; no material is labeled “Reviewed by Leyla.”

## Reproducibility

The four required repository files are preserved in `scoring/source-snapshots/` at the recorded commit. [Calculator instructions](scoring/README.md) explain how to reproduce a score from a topic JSON record. [Assembly script](handoff/assemble-content.py) builds the content attachment from the finalized explainers, score records, editorial metadata and curated story mapping, without rewriting factual text. It checks exact claim agreement, displayed/calculated scores, A–G sections, word counts, action counts and inline-link presence. These mechanical checks complement source review; they do not establish factual truth or replace implementation testing.

The [commission](00-commission.md) and [workstream conventions](01-workstream.md) preserve the requested scope. No approval, publication, deployment or automated future monitoring is implied by delivery.
