# Approved feature list

**AI, Seriously? · approved by Leyla Amur on 25 September 2026 · updated the same day: reader paste added as a Must**

This list comes out of the feature-scoping workstream (`01`–`04` in this folder). It drives the mockup, the Day 1 brief and the daily build tasks. Change it only with Leyla's approval.

## Must have (build in this order; about 22.5 hands-on hours)

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
11. **"Check an article": readers paste article text** and get a rating (about 3 hours). The result is shown **only to that reader**; the pasted text and its rating are **not saved or published**; a length limit and the shared daily spending cap apply; pasted text is treated as untrusted input.

> **Time warning:** the Musts now total about 22.5 hours against roughly 18–20 feature-building hours. The gap comes out of the 6 reserve hours unless something is trimmed. First candidates: build Behind the Claim at its fallback size from the start (1 claim, 1 source page), or build the reader paste on top of the same rating pipeline with no extra screens.

## Should have (only if Day 3 ends on schedule; about 4 hours)

12. **Sorts:** Newest (default), Strong reporting, Most hyped, Unrated.
13. **Topic filter chips.**
14. **Scheduled daily rating run**, only after the cap is tested.

## Later (after the challenge)

Guess the hype · share/export cards · cost view · "Disagree with this rating?" link · PDF/OCR sources · Turkish coverage · story clustering · paired article comparison · user-submitted URLs · accounts, personalization and notifications · browser extension.

## Decisions recorded

- **Model:** compare **Claude Opus 5** and **Claude Sonnet 5** on the eight calibration articles, then choose the one whose ratings on the four held-back articles are closest to Leyla's manual ratings, within the $45 AI allowance. Use prompt caching and the Batch API to reduce cost.
- **Sources:** big outlets (Reuters, AP, CNN, WIRED, Fox, BBC, NYT, the Guardian) are **not** fetched or AI-rated, because their terms prohibit it or don't clearly allow it (`prep/06_source_research.md`). The rated feed uses press releases, company announcements and openly licensed outlets (`prep/07_press_release_sources.md`), plus the hand-collected `backlog/`. Readers can still rate any article by pasting it.
- **Source pages** are fetched by the app itself, not by the AI provider's web-fetch tool.
- **Quotes** in Behind the Claim are checked against the fetched text in code before display.
