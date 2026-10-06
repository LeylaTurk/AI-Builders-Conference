# Recurring AI claims: US research and design workstream

Research cutoff: October 6, 2026. Audience: nontechnical adults in the United States. Commission: [original instructions](00-commission.md).

This package supplies research, reviewed draft website copy, and a Lovable implementation handoff. It does not authorize or perform live-site changes. Scores assess the exact public claim's wording against evidence, not the seriousness of a topic or the quality of our own explainer.

## Roles and sequence

The coordinator is the final editor and package assembler. Dedicated agents are assigned to scoring, product design, each of six research topics, and independent evidence review. Three agent slots can run alongside the coordinator, so assignments run in batches.

1. Scoring specialist inspects the current GitHub default branch and publishes the shared claim rubric. Product designer inspects the actual live homepage and a story page. Water research begins concurrently.
2. All six researchers inspect current sources and produce a research brief and website draft. Each reads the shared rubric before assigning a final proposed score.
3. A separate evidence reviewer checks the six drafts and sources, returns corrections to researchers, and checks cross-topic calibration.
4. The coordinator reconciles revisions, assembles exact copy into a content attachment, and verifies package completeness. The designer writes the final self-contained Lovable handoff against that attachment.

## File conventions

- `research/{topic}.md`: claim provenance, deeper assessment, complete evidence table, checklist answers, unresolved limitations.
- `explainers/{topic}.md`: A–G website copy, approximately 400–650 words excluding references, using inline descriptive links.
- `scoring/`: repository/version audit, adapted rubric, repeatable scoring records.
- `review/`: independent checks, correction trail, calibration and remaining limitations.
- `design/`: observed site, recommendation and annotated layout.
- `handoff/`: exact content attachment and final Lovable prompt.

Topic slugs: `water`, `jobs`, `energy-climate`, `creativity`, `privacy`, `existential-risk`.

## Editorial conventions

Use the label **The claim** before the statement under examination. Preserve modal force (could/will/already/always), scope and time horizon. Cite actual public examples without claiming measured prevalence. Mechanisms, evidence and practical factual advice need inline citations, not only a bibliography.

Evidence classifications: observed outcomes, controlled experiments, models/projections, surveys/expert judgments, and hypothetical/theoretical arguments. Company disclosures and policies must be identified as such. A study may have more than one class, but several articles about it are not independent evidence.

All source inventories must distinguish publication/update dates, the period studied, and the date checked. An undated live page is marked undated; a research cutoff does not establish that later publications do not exist. Retrieval barriers must be recorded rather than concealed.

Public review wording after independent AI review: **AI research and editorial checks completed October 6, 2026. Human editorial review pending.** Until that check is complete, drafts say **AI research draft; independent AI review and human editorial review pending.** Never attribute review to Leyla without her review.

The content attachment will preserve finalized topic text exactly. Lovable must implement supplied content and citations rather than generate or paraphrase factual claims. Human review status and research date are stored editorial metadata, not automatic timestamps.

## Completion record

Completed October 6, 2026: all nine dedicated assignments, six research briefs and explainers, repository-backed scoring, independent AI evidence review, four returned-and-verified corrections, cross-topic calibration, desktop/mobile design, and the final Lovable prompt with its exact content attachment. Package integrity and local links passed coordinator validation. See [the index](README.md), [decision summary](02-decision-summary.md), [review report](review/evidence-review-report.md), and [package validation](review/package-validation.md). Human editorial review remains pending. No live site was modified or published.
