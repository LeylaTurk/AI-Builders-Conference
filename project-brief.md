# AI news feed and ratings — project brief

**Leyla Amur · Revised 25 September 2026 · Name to be selected**  
**Stage:** product definition and sprint plan; implementation has not begun.

**Browse AI news. Check the hype. Understand what holds up.**

An enjoyable news app focused specifically on stories about artificial intelligence, with a connected feed, clear story ratings and a playful hype meter. Readers discover stories inside the app, see a quick assessment, and open “Why this rating?” when they want the explanation. Claim tracing is one supporting feature: it helps establish whether important claims hold up and explains part of the rating.

The experience starts with interesting news. Readers should find value before opening a source trail or supplying an article themselves.

## Product experience

**Browse the feed → see the ratings → open a story → explore the evidence if curious.**

Each card shows a headline, publisher, publication time, topic, a short original summary, a story score, a hype meter and one sentence explaining the assessment. Readers can open the publisher's article, filter by topic and sort rated stories by quality or hype. Newest is the default order; unrated stories remain accessible and clearly marked.

An example card, using an entirely fictional story and illustrative scores:

> **AI can replace 40% of workers, new study claims**  
> Work & society · Example News · 2 hours ago  
> **Story score: 2/5 — Limited**  
> **🌶️ Hype: 4/5 — Overheated**  
> The result concerns selected tasks in a supervised test. The headline turns that into a claim about replacing workers.  
> **Why this rating?** · **Read original**

Opening the explanation reveals the score breakdown and, under **Behind the Claim**, relevant passages from the story and its sources. A fictional source might say: “AI completed 40% of selected tasks in one controlled test, with human checking.” The app highlights the move from tasks to workers and the missing conditions. It does not conclude that broader job displacement is impossible.

## Audience and purpose

| Audience | Reason to use it |
| --- | --- |
| **Primary: the general public** | Enjoy browsing AI news while getting help judging exaggerated claims, evidence and uncertainty. |
| **Secondary: educators, students, journalists and creators** | Find examples, understand sourcing and explain why a story deserves attention or scrutiny. |
| **Tertiary: libraries, communities and public-interest organizations** | Use stories and rating explanations for media literacy, discussion and collective engagement with AI. |

The intended benefit is better-informed public discussion and greater reader agency. Help people recognize unsupported excitement and unsupported alarm while taking substantiated risks seriously. This fits Leyla's interest in AI accountability and public understanding, and her strengths in evidence synthesis, editorial judgment and community work.

These uses are hypotheses, not validated demand. BlueDot and the wider network are possible routes to feedback; no testers are committed.

## Three essential MVP features

### 1. A connected AI-news feed

Start with **two eligible RSS sources**, approximately **20 recent article cards**, and a working refresh action that fetches new entries. Show when the feed was checked. Each card represents one publisher's article, even when several cover the same event. Deduplicate repeated URLs; grouping different coverage into story clusters is a later feature.

Fresh entries can appear as **Not rated yet**. Initially process a capped batch of up to **five new articles per day**, store assessments and reuse them across visitors. Adjust this starting cap after measuring cost and latency. Show rating time separately from feed-check time. A failed fetch leaves the previous feed visible with a stale-status message.

Cached examples can support a demo but cannot replace the connected feed. Check source eligibility and access to article text before selecting providers. RSS availability alone does not establish permission for this app's intended use; for example, the Guardian describes its RSS use as personal and non-commercial. [Publisher guidance](https://help.theguardian.com/article/how-do-i-use-the-guardian-s-rss-feeds)

### 2. Story ratings and a hype meter

Give sufficiently assessed articles two distinct, visible ratings:

- **Story score, 1–5:** an assessment of sourcing, support for selected important claims, and useful context.
- **Hype meter, 1–5:** how much the article's framing exceeds what its inspected evidence supports.

Use colourful cards, a readable meter and memorable labels. A one-sentence explanation gives immediate value. Topic filters and rating sorts make the assessments useful for browsing.

### 3. “Why this rating?” with claim tracing

Open a compact score breakdown, then an optional **Behind the Claim** section. For each rated article, inspect up to **two consequential claims** and **two supporting public HTML pages in total**. A press release counts toward that limit. Choose claims central to the headline and conclusion, not whichever are easiest to verify.

Show exact passages, actual citation links, missing qualifications and changes in scope or certainty. Identify what was read, partially accessible, unavailable or of unconfirmed origin. Explain what the inspected material says about risks, who might be affected and what remains unknown. Readers can enjoy the feed without using this deeper layer.

## How the ratings work

This is a **proposed rubric to calibrate**, not a validated measurement system.

| Story-score component | What it examines |
| --- | --- |
| **Source transparency** | Whether attribution is clear and interested-party statements are distinguishable from independent confirmation. |
| **Support for selected claims** | Whether the two inspected consequential claims follow from available evidence without changing its scope, quantity or certainty. Claim tracing contributes here. |
| **Context and qualifications** | Whether important conditions and uncertainty are preserved, and observations, predictions and opinions distinguished. |

Initially rate each component from 1–5 using written anchors; weight them equally and round the mean to a whole-number story score. Labels: **1 Weak · 2 Limited · 3 Mixed · 4 Strong · 5 Very strong**. Show the breakdown. This is an editorial assessment of inspected coverage, not the probability that every statement is true.

Do not replace a missing component with zero or a midpoint, or silently change its weight. If essential evidence is inaccessible, withhold the aggregate and show **Insufficient evidence to rate** with supportable observations. An RSS headline or snippet alone cannot earn a full article score.

| Hype | Playful label | Proposed anchor |
| --- | --- | --- |
| **1/5** | **Grounded** | Framing matches the evidence's scope and certainty. |
| **2/5** | **A little spicy** | Some flourish, without a major change in meaning. |
| **3/5** | **Turning it up** | Noticeable inflation or missing qualifications affects interpretation. |
| **4/5** | **Overheated** | Major extrapolation or unjustified certainty drives the story. |
| **5/5** | **Off the charts** | Central framing goes substantially beyond the inspected evidence. |

Hype is separate and is not added again as a penalty in the story-score formula. Assessment coverage and confidence appear in the explanation. Store ratings with the article version, date and rubric version so refreshing the page does not arbitrarily change them.

**Low hype does not mean low risk.** A serious, well-supported warning can receive a strong story score and low hype. Calm language can still overstate a finding. Unavailable evidence may permit comments on language, but not an invented evidence-based hype rating. Repetition of a company claim is not independent confirmation.

## Making it enjoyable

The tone is curious, sharp and welcoming. Use the spice metaphor for exaggerated presentation, not the severity of harm. Avoid mocking affected people or assuming every dramatic claim is wrong.

Give the first version personality through colourful meters, topic chips, concise explanations and browsing choices: **Newest**, **Strong reporting** and **Most hyped**. Rating views apply to assessed articles; a visible **Unrated** option prevents incomplete coverage disappearing.

A later “Guess the hype” reveal could add a light game. It is optional; the core pleasure should come from discovering a story and learning something surprising about its presentation.

## Naming direction

The feed and ratings deserve a broader identity than a tracing tool. These are creative candidates; new suggestions have not received a full collision or availability check.

| Name | Why it fits |
| --- | --- |
| **AI, Seriously?** | Playful curiosity for astonishing developments and exaggerated headlines. Provisional creative favourite. |
| **Hype & Signal** | Names the two things readers want to distinguish; suggests rated news. |
| **The AI Edit** | Accessible and editorial, with room for discovery, ratings and explanations. |
| **Signal & Spice** | Fun and connected to the hype meter; needs an AI-news subtitle. |
| **Beyond the Buzz** | Invites readers past headlines without promising certainty. |
| **HeadlineTrail** | Retained from the previous shortlist; emphasizes sourcing more than browsing. |
| **Read the Trail** | Friendly, though less explicit about news and ratings. |
| **Behind the AI Headline** | Clear and descriptive, but longer and more serious in tone. |

**Behind the Claim** works particularly well as the evidence section's name. Avoid **ClaimTrail**, already used by an [overlapping product](https://claimtrail.dev/). No name or domain has been selected or purchased.

## Differentiation and validation

Existing services address parts of this experience: [Ground News](https://ground.news/frequently-asked-questions) compares coverage and publisher attributes; [AllSides](https://www.allsides.com/blog/introducing-allsides-bias-checker-check-bias-any-article-one-click) offers article-level bias analysis; [ClaimTrail](https://claimtrail.dev/) describes source tracing and tracking changes in claims. Their descriptions have been inspected; performance has not been benchmarked here.

Our proposition is an **enjoyable AI-news feed whose story and hype ratings can be inspected through evidence**, with explicit attention to AI risk and uncertainty. This combination is a hypothesis about value and differentiation, not proof of uniqueness or a 5/5 score.

Prepare around eight articles with manual reference notes, holding four back from development. Include supported alarming reporting, unsupported optimism, calm overstatement, shared sources and access failures. After outreach authorization, test with three to five ordinary readers, including people outside specialist AI circles.

Check browsing enjoyment, understanding of both ratings, recognition of an important limitation and willingness to return for fresh stories. Compare understanding and effort with usual news reading, a strong general-AI prompt and a relevant competing product. A tiny pilot provides directional evidence.

Acceptance targets: real refresh adds eligible entries without duplicate URLs; failed fetches show stale status; unrated items get no invented scores; quotations match inspected text; consequential unsupported judgments are corrected; serious well-supported warnings are not automatically labelled hype; and processing caps actually limit spend. Check keyboard use, contrast and labels independent of colour.

## Delivery scope, time and budget

Leyla builds solo with agent implementation support; no coding experience is assumed. Plan a small managed app with stored feed entries and assessments, bounded processing and an operator guide. Compare a visual builder with agent-written code after implementation approval. Verify source eligibility, article access and rating quality early.

Protect credentials, validate external URLs, treat article text as untrusted input and retain only necessary content. Use short attributed excerpts and links. Leyla should be able to refresh, inspect ratings, change an approved source, check costs and pause processing without debugging code.

**Essential:** connected feed, story scores, hype meter, explanations and a small evidence layer. **Later:** paired article comparison, story clustering, user-submitted URLs, accounts, personalization, notifications, scheduled monitoring, extension, PDF/OCR, games and export cards. Start with English and accessible HTML. This replaces the previous comparison-first MVP.

Preparation is flexible; start with an estimated **10 hours** for source checks, examples, rubric calibration, reader-test planning and tool familiarization. Record preparation separately. The challenge permits prior work with disclosure. [Official FAQ](https://womenaibuilders.org/conference/challenge/faq)

| Day | Leyla's hours | Intended result |
| --- | --- | --- |
| 1 | 4h setup + 3h core review + 1h reserve | Candidate sources checked; feed import and rubric feasibility established. |
| 2 | 7h core review + 1h interface | Connected feed → rated card → explanation works. |
| 3 | 4h core review + 3h interface + 1h testing | Hype meter, score breakdown, source passages and stored ratings integrated. |
| 4 | 2h interface + 4h testing + 2h reserve | Reader checks, stale/unrated states, cost controls and fixes; feature freeze. |
| 5 | 1h testing + 4h demo/submission preparation + 3h reserve | Verified journey, operating guide and reviewable submission materials. |

Total: **40 hands-on hours**, including supervision and learning. Agent work and unattended waiting are separate. Allocation remains 4h setup, 14h core review, 6h interface, 6h testing, 4h demo/submission and 6h contingency. These are planning estimates; the revised scope needs an early feasibility check.

If behind, reduce history to ten cards, process fewer articles, inspect one claim and one supporting page, and simplify filters. **Keep the connected feed and both ratings.** Replace a blocked source with another eligible source. Do not quietly revert to a static catalogue or a paste-a-URL-only tool.

Working allowance: **approximately US$200 total incremental spend through judging** — $60 tools/hosting, $40 inference/testing, $30 continued judging availability and $70 contingency/tax/currency movement. Measure per-article costs before fixing the daily cap. These are estimates, not quotes or purchase authorization. Continuing costs after judging need a separate decision.

## Challenge outcome and next steps

Demonstrate a public app without reviewer login: browse a refreshed feed, open an interesting rating, inspect its explanation and follow the evidence. Present observed tests honestly and disclose pre-sprint work. Official weights are user value 25%, execution 25%, thoughtful AI 20%, originality 15% and responsible/inclusive design 15%. [Official challenge](https://womenaibuilders.org/conference/challenge#judging)

Registration closes **6 October at 06:59 Istanbul time**; submission closes **11 October at 06:59 Istanbul time**. Target completion on 10 October. Reserve a separate estimated 1.5–3 hours for the three required peer reviews; finalist preparation, if needed, is also outside the sprint budget. [Official FAQ](https://womenaibuilders.org/conference/challenge/faq)

Next: select a name, calibrate example ratings and establish two suitable feed sources. This revised brief records Leyla's requested direction. Implementation has not begun; the original requirement for explicit implementation approval remains, alongside relevant authorization for outreach, purchases, registration, publication and submission.
