# Stage 2 — User and judge lens

**AI, Seriously? · feature-scoping workstream · 25 September 2026**

For each feature: how much it matters to a **general reader** (the primary audience), and which **official scoring criteria** it strengthens.

Criteria: **UV** problem and user value (25%) · **EX** working execution (25%) · **AI** thoughtful use of AI (20%) · **OR** originality (15%) · **RD** responsible and inclusive design (15%).

Reader value: **High** = the app doesn't make sense without it · **Med** = noticeably better with it · **Low** = nice to have.

| ID | Feature | Reader value | Criteria helped | Note |
| --- | --- | --- | --- | --- |
| F1 | RSS import | High | UV, EX | No live feed = a static catalogue, which the brief rules out. |
| F2 | Refresh + "checked at" | High | EX, RD | Shows the feed is real and current. |
| F3 | URL dedup | Med | EX | Invisible when it works, embarrassing when it doesn't. |
| F4 | Stale-status | Med | EX, RD | Matches Day 3 mission: "handle a failed input without leaving the user stuck". |
| F5 | Article cards | High | UV, EX | The core browsing unit. |
| F20 | Short summary | Med | UV, AI | Makes the feed readable without clicking through. |
| F6 | Story score | High | UV, AI, OR | Half of the headline proposition. |
| F7 | Hype meter | High | UV, OR | The memorable, fun half; the main originality hook. |
| F8 | One-sentence explanation | High | UV, AI, RD | Delivers value at a glance; makes the score understandable. |
| F9 | Score breakdown | Med | AI, RD | Makes the score inspectable. |
| F10 | Behind the Claim | Med (High for secondary audience) | AI, OR, RD | The strongest demonstration of *thoughtful* AI: evidence, not just an opinion. The main differentiator from simple "AI rates news". |
| F11 | Coverage status | Low–Med | RD | Honesty about what the AI could and couldn't read. |
| F12 | Not rated / Insufficient evidence | Med | RD, EX | Covers Day 4's "one case the project should refuse". |
| F13 | Stored, versioned ratings | Med | EX, RD | Ratings don't change on refresh; keeps costs bounded. |
| F15 | Topic chips | Med | UV | Helps browsing; less vital with only ~20 cards. |
| F16 | Sorts | Med | UV, OR | "Most hyped" is fun and demo-friendly. |
| F21 | Guess the hype | Med | OR | Playful, but the brief says core enjoyment should come from stories. |
| F14 | Cap + spending limit | None directly | RD, EX | Protects the budget and keeps the app live through judging. |
| F17a | Pause and withdraw | None directly | RD | Human oversight: a judging point. |
| F17b | Cost view | None | EX | Operator comfort; the provider dashboard can substitute. |
| F18 | Accessibility | High for some readers | RD | Named explicitly in the rubric and Day 4 mission. |
| F19 | How ratings work page | Med | RD, AI, UV | Cheap to build; answers "why should I trust this?" for readers and judges. |
| F31 | Disagree link | Low–Med | RD | Visible oversight loop; low effort. |
| F26 | Scheduled rating | Low | EX | Keeps the feed fresh during judging without Leyla pressing buttons. |
| F22 | Paired comparison | Med | OR | Interesting, but a second product. |
| F23 | Clustering | Low–Med | UV | Value grows with many sources; there are only two. |
| F24 | User URLs | Med | UV | Cost and abuse risk; brief says "not a paste-a-URL tool". |
| F25 | Accounts etc. | Low | — | Judges must not need a login. |
| F27 | Extension | Med | UV | Separate platform; not reviewable via one public link. |
| F28 | PDF/OCR | Low–Med | AI | Many AI claims trace to papers, but adds heavy work. |
| F29 | Share cards | Low–Med | UV | Could help Community Choice votes. |
| F30 | Turkish coverage | Med (for Turkish readers) | UV, RD | Doubles the rubric calibration work. |
