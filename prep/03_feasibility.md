# Stage 3 — Feasibility and cost

**AI, Seriously? · feature-scoping workstream · 25 September 2026**

All figures are **planning estimates**, not measurements. Replace them with measured numbers during preparation (stack trial and calibration).

## Hours available for building

The 40-hour plan in the master brief reserves time for brief-writing, setup, testing, submission and contingency. What's left for building features:

| Slot | Hours |
| --- | --- |
| Day 1 feed import | 2 |
| Day 2 core rating | 8 |
| Day 3 interface, integration and failure states | 6 |
| Day 4 accessibility | 1 |
| Day 5 polish | 1 |
| **Feature building total** | **18** |
| Reserve spread across Days 3–5 | 6 |

So the **Must-have set should fit in about 18–20 hands-on hours**, leaving the 6 reserve hours for problems, not for extra features.

## AI cost per rated article

One rating = read the article (~3k tokens) + up to two source pages (~6k) + rubric instructions (~1.5k), producing the scores, explanation, summary, topic and claim passages (~3–4k output including reasoning). A realistic pipeline may take two or three calls (pick claims → trace → score), so the range is wide.

List prices per million tokens (Anthropic first-party API, from the bundled Claude API reference, cached June 2026; check the live pricing page before committing):

| Model | Input / output per 1M tokens | Est. per article | Est. ~130 ratings* |
| --- | --- | --- | --- |
| Claude Opus 5 | $5 / $25 | $0.15–0.45 | $20–60 |
| Claude Sonnet 5 | $2 / $10 | $0.06–0.18 | $8–23 |
| Claude Haiku 4.5 | $1 / $5 | $0.03–0.09 | $4–12 |

\* About 130 ratings through judging: ~40 calibration runs (8 articles, several prompt revisions), ~40 development test runs, ~20 initial feed cards, and 3 a day live from 6 to 15 October (~30).

**Reading:** the AI allowance is $45. Opus 5 fits only at the low end of the range; Sonnet 5 fits comfortably; Haiku is cheapest but is the most likely to miss subtle overstatement, which is the heart of the hype meter. **Model choice is Leyla's decision**; the calibration set should compare at least two models on the same eight articles before choosing.

**Cost levers (no quality loss):**
- Cache the fixed rubric instructions (prompt caching) so they aren't paid for in full on every call.
- Rate the daily batch through the Batch API, which is 50% cheaper and suits non-urgent work.
- Have the app fetch source pages itself rather than using the AI provider's web-fetch tool. This is free, limits reading to the two pages chosen, and avoids an extra per-fetch charge (unverified; check the pricing page).

## Per-feature estimates

Hours are Leyla's hands-on hours supervising agent-written work. Risk: **L** low · **M** medium · **H** high.

| ID | Feature | Hours | AI cost | Risk | Main risk |
| --- | --- | --- | --- | --- | --- |
| F1–F4 | Feed import, refresh, dedup, stale | 3 | None | M | Source permissions and full-text access (prep task, 1 Oct). |
| F5 + F20 | Cards + summary | 1.5 | In rating call | L | — |
| F6–F8 | Score, hype, explanation | 5 | Main cost | **H** | Rating quality and consistency; needs calibration. |
| F9 | Score breakdown | 1 | In rating call | L | — |
| F10 + F11 | Behind the Claim + coverage status | 4 | ~Doubles input tokens | **H** | Finding the right source page; quotes must match exactly (verify in code, not by trusting the model). |
| F12 | Not rated / Insufficient evidence | 1 | None | L | — |
| F13 | Stored, versioned ratings | 1 | Saves cost | M | Choosing a simple database in the stack. |
| F14 | Cap + spending limit | 0.5 | Saves cost | L | — |
| F17a | Pause and withdraw | 1 | None | L | Needs a tiny admin screen or protected switch. |
| F18 | Accessibility | 1 | None | L | — |
| F19 | How ratings work page | 0.5 | None | L | Text largely exists in the brief. |
| **Must-have subtotal** | | **19.5** | | | |
| F16 | Sorts | 1 | None | L | — |
| F15 | Topic chips | 1 | Topic in rating call | L | Needs a fixed topic list. |
| F31 | Disagree link | 0.5 | None | L | Spam; use a simple form or email link. |
| F26 | Scheduled rating | 1 | Same as manual | M | Runaway spend if the cap fails; test the cap first. |
| F17b | Cost view | 1 | None | L | Provider dashboard is a fallback. |
| F21 | Guess the hype | 3 | None | L | Time. |
| F29 | Share cards | 3 | None | M | Image generation fiddly. |
| F24 | User URLs | 3+ | Unbounded | **H** | Cost, abuse, unsafe URLs. |
| F23 | Clustering | 4+ | Some | M | Little value with two sources. |
| F28 | PDF/OCR | 4+ | Higher | **H** | Large documents, cost. |
| F22 | Paired comparison | 5+ | Double | M | A second product. |
| F30 | Turkish coverage | 6+ | Double calibration | **H** | Second rubric calibration; source permissions in Turkish media. |
| F25 | Accounts etc. | 8+ | None | M | Conflicts with no-login judging. |
| F27 | Extension | 8+ | Some | **H** | Not reviewable via one public link. |

## Biggest risks to watch

1. **Rating quality (F6–F8).** If the hype meter is inconsistent, the product loses credibility. Mitigation: the eight-article calibration set, with four held back.
2. **Behind the Claim (F10).** Most likely to overrun. The master brief's fallback (one claim, one source page) applies here first.
3. **Source access.** If full article text isn't accessible, ratings fall back to "Insufficient evidence" too often. Check it on 1 October, before the sprint.
