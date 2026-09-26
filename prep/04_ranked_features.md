# Stage 4 — Ranked feature list (awaiting approval)

**AI, Seriously? · feature-scoping workstream · 25 September 2026**

Ranked using the official rubric weights (value to readers and judges) against Leyla's 40 hours and US$100 budget. **Nothing here is final until Leyla approves it at the gate.**

## Must have (about 19.5 hours)

The app is not "AI, Seriously?" without these. Build them in this order.

| # | ID | Feature | Why it's a Must |
| --- | --- | --- | --- |
| 1 | F1–F4 | Live feed: RSS import, refresh with "checked at", dedup, stale state | The brief rules out a static catalogue; strong on execution. |
| 2 | F6–F8 | Story score, hype meter, one-sentence explanation | The core proposition and the main AI task. |
| 3 | F13 + F14 | Stored, versioned ratings + processing cap and spending limit | Keeps ratings stable and costs within US$100. |
| 4 | F5 + F20 | Cards with a short summary | The browsing experience. |
| 5 | F12 | "Not rated yet" and "Insufficient evidence" states | Honest; covers the "should refuse" test case. |
| 6 | F9 | Score breakdown in "Why this rating?" | Makes ratings inspectable. |
| 7 | F10 + F11 | Behind the Claim with coverage status (fallback: 1 claim, 1 page) | The key differentiator and best evidence of thoughtful AI. |
| 8 | F17a | Pause processing; withdraw or correct a rating | Human oversight. |
| 9 | F18 | Accessibility basics | Named in the rubric and in Day 4. |
| 10 | F19 | "How ratings work" page (new) | Cheap transparency for readers and judges. |

## Should have (about 4.5 hours, only if Day 3 ends on schedule)

| # | ID | Feature | Why not a Must |
| --- | --- | --- | --- |
| 11 | F16 | Sorts: Newest, Strong reporting, Most hyped, Unrated | Fun and demo-friendly, but the feed works with Newest alone. |
| 12 | F15 | Topic filter chips | Limited value with only ~20 cards. |
| 13 | F31 | "Disagree with this rating?" link (new) | Nice oversight signal, not essential. |
| 14 | F26 | Scheduled daily rating | Keeps the feed fresh during judging; manual refresh works meanwhile. |

## Later (after the challenge)

- **Most promising next:** F21 Guess the hype, F29 share cards (could help Community Choice), F17b cost view.
- **Bigger next steps:** F28 PDF/OCR, F30 Turkish coverage, F23 clustering, F22 paired comparison.
- **Not for this product yet:** F24 user URLs, F25 accounts, F27 extension.

## Changes from the master brief

1. **Topic filters and sorts move from "essential personality" to Should have.** The master brief lists them under the first version's personality. At about 1 hour each they're cheap, but the Must set already fills the build hours. *Needs Leyla's decision.*
2. **Two new features:** F19 "How ratings work" page (Must) and F31 "Disagree" link (Should).
3. **Model choice is an open decision.** Compare at least two models on the calibration set; Opus 5 is the most capable but may exceed the $45 AI allowance at the high end of the estimate; Sonnet 5 fits comfortably.

## Gate: what Leyla needs to decide

- Approve, or change, the Must / Should / Later split.
- Topic filters and sorts: Should (as proposed) or Must?
- Accept the two new features?
- Model shortlist for the calibration comparison.

Once approved, this becomes `prep/feature-list.md`, which drives the mockup and the Day 1 brief.
