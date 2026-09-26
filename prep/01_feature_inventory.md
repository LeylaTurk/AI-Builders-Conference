# Stage 1 — Feature inventory

**AI, Seriously? · feature-scoping workstream · 25 September 2026**

Every candidate feature found in the master brief, the archived news-feed brief (including its "Later" list) and the archived challenge brief. Two new candidates are marked **(new)**. IDs are used in later stages.

## Feed

| ID | Feature | Description | Source |
| --- | --- | --- | --- |
| F1 | RSS import | Pull recent entries from two eligible RSS sources into stored feed entries. | Master brief §1 |
| F2 | Refresh + "checked at" | A refresh action fetches new entries and shows when the feed was last checked. | Master brief §1 |
| F3 | URL deduplication | The same article URL never appears twice. | Master brief §1 |
| F4 | Stale-status on failure | A failed fetch keeps the previous feed and shows a stale message. | Master brief §1 |
| F5 | Article cards | Headline, publisher, time, topic, links to the original. | Master brief, product experience |
| F20 | Short original summary | One- or two-sentence summary written by the app, not copied. | Master brief, product experience |
| F26 | Scheduled rating run | Rate the day's capped batch automatically instead of by hand. | "Scheduled monitoring" in Later list |

## Ratings

| ID | Feature | Description | Source |
| --- | --- | --- | --- |
| F6 | Story score 1–5 | Score with label (Weak … Very strong) from three rubric components. | Master brief §2 |
| F7 | Hype meter 1–5 | Spice-labelled meter (Grounded … Off the charts). | Master brief §2 |
| F8 | One-sentence explanation | Plain-language reason shown on the card. | Master brief §2 |
| F9 | Score breakdown | "Why this rating?" shows the three component scores. | Master brief §3 |
| F10 | Behind the Claim | Up to two consequential claims traced to up to two source pages, with exact passages and links. | Master brief §3 |
| F11 | Coverage status | Says what was read, partially accessible, unavailable or of unconfirmed origin. | Master brief §3 |
| F12 | "Not rated yet" / "Insufficient evidence" states | No invented scores for unprocessed or unverifiable articles. | Master brief, ratings rules |
| F13 | Stored, versioned ratings | Ratings saved with article version, date and rubric version; reused across visitors. | Master brief, ratings rules |

## Browsing

| ID | Feature | Description | Source |
| --- | --- | --- | --- |
| F15 | Topic filter chips | Filter by topic (for example Work & society, Health, Policy). | Master brief, tone section |
| F16 | Sorts | Newest (default), Strong reporting, Most hyped, Unrated. | Master brief, tone section |
| F21 | Guess the hype | Reader guesses the hype level before the reveal. | Master brief, "later" |

## Trust, safety and operation

| ID | Feature | Description | Source |
| --- | --- | --- | --- |
| F14 | Processing cap + spending limit | Daily article cap and a hard limit set with the AI provider. | Master brief, budget |
| F17a | Operator: pause and withdraw | Leyla can pause rating and withdraw or correct a rating without code. | Master brief, responsible design |
| F17b | Operator: cost view | Leyla can see spend per day and per article. | Master brief, responsible design |
| F18 | Accessibility | Keyboard use, contrast, labels that don't depend on colour. | Master brief, acceptance targets |
| F19 | "How ratings work" page **(new)** | Short public page: the rubric, what the scores mean and don't mean, known limits, "low hype ≠ low risk". | Proposed here: gives judges and readers the transparency the brief describes but has no screen for |
| F31 | "Disagree with this rating?" link **(new)** | A simple way for readers to flag a rating for Leyla to review. | Proposed here: adds human oversight and a feedback loop |

## Later-list features

| ID | Feature | Description | Source |
| --- | --- | --- | --- |
| F22 | Paired article comparison | Compare two outlets' coverage of the same event. | Earlier comparison-first MVP |
| F23 | Story clustering | Group different coverage of one event. | Later list |
| F24 | User-submitted URLs | Reader pastes any article to rate. | Later list |
| F25 | Accounts, personalization, notifications | Sign-in, saved topics, alerts. | Later list |
| F27 | Browser extension | Rate articles while reading elsewhere. | Later list |
| F28 | PDF/OCR sources | Trace claims into PDF papers and reports. | Later list |
| F29 | Share / export cards | Image card for social media. | Later list |
| F30 | Turkish-language coverage | Bilingual feed and ratings. | Challenge brief, option B (Bridge) |
