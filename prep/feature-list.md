# Approved feature list

**AI, Seriously? · approved by Leyla Amur on 25 September 2026**

This list comes out of the feature-scoping workstream (`01`–`04` in this folder). It drives the mockup, the Day 1 brief and the daily build tasks. Change it only with Leyla's approval.

## Must have (build in this order; about 19.5 hands-on hours)

1. **Live feed:** RSS import from two eligible sources, refresh with "checked at" time, URL deduplication, stale-status message on a failed fetch.
2. **Ratings:** story score 1–5, hype meter 1–5, one-sentence explanation.
3. **Stored, versioned ratings** plus a **daily processing cap** (start at 3 articles a day) and a **hard spending limit** with the AI provider.
4. **Article cards** with a short original summary.
5. **"Not rated yet" and "Insufficient evidence to rate" states.**
6. **Score breakdown** in "Why this rating?" (three components).
7. **Behind the Claim** with coverage status: up to 2 claims and 2 source pages; fallback 1 claim and 1 page.
8. **Operator controls:** pause processing; withdraw or correct a rating.
9. **Accessibility basics:** keyboard use, contrast, labels that don't rely on colour.
10. **"How ratings work" page:** the rubric, what scores do and don't mean, known limits, "low hype ≠ low risk".

## Should have (only if Day 3 ends on schedule; about 4 hours)

11. **Sorts:** Newest (default), Strong reporting, Most hyped, Unrated.
12. **Topic filter chips.**
13. **Scheduled daily rating run**, only after the cap is tested.

## Later (after the challenge)

Guess the hype · share/export cards · cost view · "Disagree with this rating?" link · PDF/OCR sources · Turkish coverage · story clustering · paired article comparison · user-submitted URLs · accounts, personalization and notifications · browser extension.

## Decisions recorded

- **Model:** compare **Claude Opus 5** and **Claude Sonnet 5** on the eight calibration articles, then choose the one whose ratings on the four held-back articles are closest to Leyla's manual ratings, within the $45 AI allowance. Use prompt caching and the Batch API to reduce cost.
- **Source pages** are fetched by the app itself, not by the AI provider's web-fetch tool.
- **Quotes** in Behind the Claim are checked against the fetched text in code before display.
