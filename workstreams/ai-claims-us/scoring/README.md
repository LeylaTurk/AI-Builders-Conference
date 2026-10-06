# Scoring tools and verification

Use shared-rubric.md for judgments; repository-audit.md records the verified source engine and all deliberate adaptations. The source-snapshots directory contains the four required files as inspected at the recorded commit.

claim-score-schema.json defines an optional structured evidence record. claim-score.py calculates from a record containing an exact claim and hype_checks; optional evidence_checks produces a separate evidence-gap result. Each check value must be an object with an answer field, plus the supporting metadata described in the schema.

Run from the workstream directory:

```sh
python3 scoring/claim-score.py path/to/record.json
python3 scoring/claim-score.py --self-test
```

The calculator deliberately validates the mechanical inputs only, so a reviewer may also use it on a minimal temporary record. Passing its calculation is not evidence verification or JSON Schema validation. The editorial handoff must still include a complete reason and source locator for each judgment.

Verification performed October 6, 2026: anchors 1 and 5, the documented single-P-failure example, exact-half downward rounding, minimum section coverage, NC suppression, evidence-gap strength floor, and all 1,024 possible five-check answer combinations passed. No live engine file was changed.

Current workflow decision: initial claim pages may display qualitative evidence limitations without inventing a numeric evidence-gap rating. All six proposed hype ratings still require the full five-check record and independent AI evidence review. Multiple equal scores are acceptable; the formula is intentionally coarse and scores must not be adjusted to create variety.

