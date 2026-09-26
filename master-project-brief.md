# AI, Seriously? — master project brief

**Leyla Amur · 25 September 2026 · 5-Day AI Builder Challenge, 6–10 October 2026**  
**Stage:** product defined; feature scope approved; implementation has not begun.

**Browse AI news. Check the hype. Understand what holds up.**

This brief merges two earlier documents, both kept in `archive/`: the challenge brief (rules, profile, timeline) and the AI news feed brief (product, ratings, plan). The news feed replaces SourceCheck and the other placeholder ideas. Part 1 covers the product; Part 2 covers the challenge, preparation and deadlines.

| Item | Status |
| --- | --- |
| Challenge rules gathered | Done. Summarised in Part 2. |
| App idea | **Decided:** AI news feed with story scores and a hype meter. |
| Working name | **AI, Seriously?** (provisional; availability not yet checked). |
| Feature scope | **Approved** 25–26 September: 12 Must (including "Check an article" by link or text, and a colour-coded markup view), 3 Should (see `prep/feature-list.md`). **Musts exceed the build time even with reserve; cuts decided on Day 3.** |
| Sources | Big outlets ruled out for AI rating; feed uses press releases and openly licensed outlets, plus a hand-collected backlog (see `prep/06`, `prep/07`, `backlog/`). |
| Build stack | Open. Compare options during preparation (see Delivery). |
| AI model | Compare Claude Opus 5 and Claude Sonnet 5 on the calibration set, then choose. |
| Mockup | Next: build from the approved feature list. |
| Participant profile | Steps 1 and 3 drafted; step 2 (Skills) not reviewed. |
| Budget and time | About **US$100** through judging; **40 hands-on hours** over the sprint. |

**Next action:** build the clickable mockup from the approved feature list.

---

# Part 1 — The product

## What it is

An enjoyable news app focused on stories about artificial intelligence, with a connected feed, clear story ratings and a playful hype meter. Readers discover stories inside the app, see a quick assessment, and open "Why this rating?" when they want the explanation. Claim tracing is one supporting feature: it helps establish whether important claims hold up and explains part of the rating.

The experience starts with interesting news. Readers should find value before opening a source trail or supplying an article themselves.

**Browse the feed → see the ratings → open a story → explore the evidence if curious.**

Each card shows a headline, publisher, publication time, topic, a short original summary, a story score, a hype meter and one sentence explaining the assessment. Readers can open the publisher's article, filter by topic and sort rated stories by quality or hype. Newest is the default order; unrated stories remain accessible and clearly marked.

An example card, using an entirely fictional story and illustrative scores:

> **AI can replace 40% of workers, new study claims**  
> Work & society · Example News · 2 hours ago  
> **Story score: 2/5 — Limited**  
> **🌶️ Hype: 4/5 — Overheated**  
> The result concerns selected tasks in a supervised test. The headline turns that into a claim about replacing workers.  
> **Why this rating?** · **Read original**

Opening the explanation reveals the score breakdown and, under **Behind the Claim**, relevant passages from the story and its sources. A fictional source might say: "AI completed 40% of selected tasks in one controlled test, with human checking." The app highlights the move from tasks to workers and the missing conditions. It does not conclude that broader job displacement is impossible.

## Audience and purpose

| Audience | Reason to use it |
| --- | --- |
| **Primary: the general public** | Enjoy browsing AI news while getting help judging exaggerated claims, evidence and uncertainty. |
| **Secondary: educators, students, journalists and creators** | Find examples, understand sourcing and explain why a story deserves attention or scrutiny. |
| **Tertiary: libraries, communities and public-interest organizations** | Use stories and rating explanations for media literacy, discussion and collective engagement with AI. |

The intended benefit is better-informed public discussion and greater reader agency: helping people recognize unsupported excitement and unsupported alarm while taking substantiated risks seriously. This fits Leyla's interest in AI accountability and public understanding, and her experience with multi-agent research and fact-checking workflows (the five-agent ENKA 70 editorial pipeline), evidence synthesis, editorial judgment and community work.

These uses are hypotheses, not validated demand. BlueDot and the wider network are possible routes to feedback; no testers are committed.

**Why AI is needed (for the "thoughtful use of AI" criterion):** reading each article in full, choosing its consequential claims, finding and comparing the supporting source, and explaining the gap in plain language cannot be done by hand for a live feed. The AI does this assessment; stored ratings, a written rubric and visible evidence keep it inspectable.

## Features (approved)

Approved on 25 September 2026 through the feature-scoping workstream; details, estimates and reasoning are in `prep/`. The Must set takes about 19.5 of the roughly 18–20 feature-building hours in the sprint, so Should items are built only if Day 3 ends on schedule.

| Tier | Features |
| --- | --- |
| **Must have** (in build order) | 1. Live feed: import, refresh, dedup, stale state · 2. Story score, hype meter, one-sentence explanation · 3. Stored, versioned ratings with daily cap and spending limit · 4. Cards with a short summary · 5. "Not rated yet" and "Insufficient evidence" states · 6. Score breakdown · 7. Behind the Claim with coverage status · 8. Operator controls: pause, withdraw or correct a rating · 9. Accessibility basics · 10. "How ratings work" page · 11. "Check an article": link (allowlisted sources) or pasted text, private result, nothing stored · 12. Colour-coded markup view: highlights by category with icon and label, click for the reason and source passage |
| **Should have** | Sorts (Newest, Strong reporting, Most hyped, Unrated) · topic filter chips · scheduled daily rating run |
| **Later** | Guess the hype · share/export cards · cost view · "Disagree with this rating?" link · PDF/OCR · Turkish coverage · story clustering · paired article comparison · links from any site (allowlisted links and pasted text are Musts) · accounts, personalization, notifications · browser extension |

The sections below describe the three core features in detail.

### 1. A connected AI-news feed

Start with **two eligible RSS sources**, approximately **20 recent article cards**, and a working refresh action that fetches new entries. Show when the feed was checked. Each card represents one publisher's article, even when several cover the same event. Deduplicate repeated URLs; grouping coverage into story clusters is a later feature.

Fresh entries can appear as **Not rated yet**. Initially process a capped batch of up to **three new articles per day**, store assessments and reuse them across visitors. Raise or lower the cap after measuring cost and latency, within the budget. Show rating time separately from feed-check time. A failed fetch leaves the previous feed visible with a stale-status message.

Cached examples can support a demo but cannot replace the connected feed. Check source eligibility and access to article text before selecting providers. RSS availability alone does not establish permission for this app's intended use; for example, the Guardian describes its RSS use as personal and non-commercial. [Publisher guidance](https://help.theguardian.com/article/how-do-i-use-the-guardian-s-rss-feeds)

### 2. Story ratings and a hype meter

Give sufficiently assessed articles two distinct, visible ratings:

- **Story score, 1–5:** an assessment of sourcing, support for selected important claims, and useful context.
- **Hype meter, 1–5:** how much the article's framing exceeds what its inspected evidence supports.

Use colourful cards, a readable meter and memorable labels. A one-sentence explanation gives immediate value. Topic filters and rating sorts make the assessments useful for browsing.

### 3. "Why this rating?" with claim tracing

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

## Tone and enjoyment

The tone is curious, sharp and welcoming. Use the spice metaphor for exaggerated presentation, not the severity of harm. Avoid mocking affected people or assuming every dramatic claim is wrong.

Give the first version personality through colourful meters and concise explanations. If time allows (Should have), add topic chips and the browsing choices **Newest**, **Strong reporting** and **Most hyped**; rating views apply to assessed articles, and a visible **Unrated** option prevents incomplete coverage disappearing. A later "Guess the hype" reveal could add a light game; the core pleasure should come from discovering a story and learning something surprising about its presentation.

## Name

**Working name: AI, Seriously?** It suits playful curiosity about astonishing developments and exaggerated headlines. It has not had a collision, trademark or domain check; do this during preparation. No name or domain has been purchased.

**Behind the Claim** is the name of the evidence section. Avoid **ClaimTrail**, already used by an [overlapping product](https://claimtrail.dev/).

Fallbacks if the check fails: **Hype & Signal**, **The AI Edit**, **Signal & Spice**, **Beyond the Buzz**, **HeadlineTrail**.

## Differentiation and validation

Existing services address parts of this experience: [Ground News](https://ground.news/frequently-asked-questions) compares coverage and publisher attributes; [AllSides](https://www.allsides.com/blog/introducing-allsides-bias-checker-check-bias-any-article-one-click) offers article-level bias analysis; [ClaimTrail](https://claimtrail.dev/) describes source tracing and tracking changes in claims. Their descriptions have been inspected; performance has not been benchmarked here.

Our proposition is an **enjoyable AI-news feed whose story and hype ratings can be inspected through evidence**, with explicit attention to AI risk and uncertainty. This combination is a hypothesis about value and differentiation, not proof of uniqueness.

Prepare around eight articles with manual reference notes, holding four back from development. Include supported alarming reporting, unsupported optimism, calm overstatement, shared sources and access failures. After outreach authorization, test with three to five ordinary readers, including people outside specialist AI circles.

Check browsing enjoyment, understanding of both ratings, recognition of an important limitation and willingness to return for fresh stories. Compare understanding and effort with usual news reading, a strong general-AI prompt and a relevant competing product. A tiny pilot provides directional evidence only.

**Acceptance targets:** real refresh adds eligible entries without duplicate URLs; failed fetches show stale status; unrated items get no invented scores; quotations match inspected text; consequential unsupported judgments are corrected; serious well-supported warnings are not automatically labelled hype; and processing caps actually limit spend. Check keyboard use, contrast and labels independent of colour.

## Responsible design

- Protect credentials, validate external URLs, treat article text as untrusted input and retain only necessary content.
- Use short attributed excerpts and links back to publishers.
- Show what the AI read, what it could not access, and when a rating was made and with which rubric version.
- Human oversight: Leyla can refresh, inspect ratings, correct or withdraw a rating, change an approved source, check costs and pause processing without debugging code.
- Accessibility: keyboard use, contrast, and labels that don't rely on colour. Start with English and accessible HTML.

---

# Part 2 — Challenge, preparation and delivery

## The challenge

The 5-Day AI Builder Challenge is run by Women AI Builders (WomenTech Network) as part of the AI Builders Global Conference, 14–16 October 2026. There are no tracks; every project is scored against the same rubric. [Official challenge](https://womenaibuilders.org/conference/challenge) · [FAQ](https://womenaibuilders.org/conference/challenge/faq)

| Parameter | Rule |
| --- | --- |
| Format | Virtual and global. Solo, or a team of up to 4. Free; includes an Explorer conference pass. |
| Stack | None required. Code, low-code and no-code are scored the same way. |
| Topic | Any real problem. Inspiration areas are examples, not tracks. |
| Build window | 6–10 October. Earlier work is allowed if declared as the starting point; reviewers judge what was added during the sprint. |
| Must have | AI as a meaningful part of the solution, and a public working link reviewers can open without logging in. Source code can stay private. |

| Criterion | Weight | What the judges ask | How this project answers it |
| --- | --- | --- | --- |
| Problem and user value | 25% | Is the problem clear for a specific user, and does the project meaningfully improve things for them? | General readers can't easily tell AI hype from substance; the app gives a quick, explained judgement on every story. |
| Working execution | 25% | Does the public project work reliably and usably? | A live feed that refreshes, stored ratings, clear stale and unrated states, and a tested public link. |
| Thoughtful use of AI | 20% | Is AI used for a clear reason, strengthening the result? | AI reads articles and sources, traces claims and explains gaps: work that can't be done by hand at feed scale. |
| Originality and approach | 15% | A distinctive idea, insight or combination? | Enjoyable news browsing combined with inspectable story and hype ratings focused on AI. |
| Responsible and inclusive design | 15% | Data use, transparency, accessibility, oversight, harm? | Visible evidence, "Insufficient evidence" instead of guessing, "low hype ≠ low risk", cost caps, operator controls, accessibility checks. |

**Submission package (required):** project title and one-line value proposition; concise summary; problem and users; public working link; starting point before the sprint; what was built during the challenge; the role of AI; notes on building responsibly. **Optional:** recorded demo, walkthrough, architecture notes or short deck, screenshots.

**Judging:** eligibility check → three peer reviews per project (Leyla must also review three projects) → internal shortlist → exactly 10 validated finalists → one Jury Winner. **Community Choice** is a separate public vote open to every eligible public project; its cash prize is capped at USD 5,000.

## Timeline

Deadlines are set in Eastern Time, 7 hours behind Istanbul in October.

| Date (2026) | Istanbul time | What happens |
| --- | --- | --- |
| 25 Sep – 5 Oct | — | Preparation (below). |
| 5 Oct | — | Kick-off webinar. |
| 6 Oct | **06:59** | **Signup closes** (5 Oct, 11:59 PM ET). Profile and team must be confirmed. |
| 6–10 Oct | — | Five-day build sprint. |
| 11 Oct | **01:00** (target) | Aim to submit by 6 PM ET on 10 Oct. |
| 11 Oct | **06:59** | **Projects due** (10 Oct, 11:59 PM ET). |
| 10–12 Oct | — | Peer review: Leyla reviews three projects (about 1.5–3 hours, outside the sprint budget). |
| 12–13 Oct | — | Jury reviews the 10 finalists. |
| 15 Oct | — | Community Showcase and Awards. |

## Preparation before 6 October

The official Day 1 mission is "Define & Set Up", so final scope is allowed to settle on Day 1. Going in with decisions made, though, frees the sprint for building. Before 6 October, **plan, design, check and set up, but don't write the app itself.** Everything done now is recorded in the starting-point note. Estimated preparation: about **10 hours**, logged separately from the 40 sprint hours.

| By | Task | Output |
| --- | --- | --- |
| ~~28 Sep~~ | ~~Run the **feature-scoping workstream** and approve the feature list~~ **Done 25 Sep** | `prep/feature-list.md` |
| 30 Sep | Build the **clickable mockup** from the approved list | Mockup link |
| 30 Sep | Check the name *AI, Seriously?* (existing products, domain) | Name confirmed or fallback chosen |
| 1 Oct | Choose **two eligible RSS sources**: permitted use, full-text access | Source notes |
| 2 Oct | Prepare **eight calibration articles** with manual ratings (four held back), write the rubric anchors, and compare **Opus 5 vs Sonnet 5** on them | Calibration set; model choice |
| 3 Oct | **Compare stacks** and pick one: set up accounts, run a quick "hello" test of the AI model, set a hard spending limit | Stack decision |
| 4 Oct | Write the **starting-point note** and block calendar time for 6–12 Oct | Starting-point note |
| 5 Oct | Finish the **participant profile**, update the project name and one-liner on the dashboard, attend the kick-off webinar | Signup complete |

## Feature-scoping workstream

**Status: stages 1–4 and the gate done on 25 September;** reports in `prep/`. This replaces the idea-picking workstream from the earlier challenge brief. The idea is chosen; this workstream decides **which features go into the app**. Each stage saves a short report in `prep/`.

| Stage | Job | Output |
| --- | --- | --- |
| 1. Feature inventory | List every candidate feature from Part 1, including "Later" items, with a one-line description. | `01_feature_inventory.md` |
| 2. User and judge lens | For each feature: what it does for a general reader, and which scoring criterion it helps. | `02_value_map.md` |
| 3. Feasibility and cost | Estimate build hours, AI cost per article and risks (source access, permissions, rating difficulty). | `03_feasibility.md` |
| 4. Ranking | Sort into **Must have**, **Should have** and **Later**, weighting the official rubric against 40 hours and US$100. | `04_ranked_features.md` |
| Gate | **Leyla approves** the feature list or asks for changes. | Approved `feature-list.md` |
| 5. Builder | Turns the approved list into the mockup, the Day 1 brief and daily build tasks; helps build each Daily Mission. | Mockup, build plan, app, submission draft |

Ground rules: cite claims and label sources as official, independent or tertiary; say which pages couldn't be reached; keep everything shippable to a public link by 10 October. Nothing is built before the gate.

## Five-day build plan

Aligned to the official Daily Missions. 8 hands-on hours a day, 40 in total, including supervision and learning; agent work and unattended waiting are separate.

| Day | Official mission | Leyla's hours | Output by end of day |
| --- | --- | --- | --- |
| **1 · 6 Oct** | Define & Set Up | 2h brief + starting point · 4h setup · 2h feed import | Final focused brief and honest starting-point record; stack running; the two RSS sources importing into stored entries. |
| **2 · 7 Oct** | Build the Core | 7h core rating · 1h review | One real article → story score, hype meter, one-sentence explanation and Behind the Claim passages, end to end, saved as an example. Biggest remaining gap noted. |
| **3 · 8 Oct** | Integrate & Develop | 5h interface + integration · 1h failure states · 1h first user try · 1h reserve | Feed → rated card → "Why this rating?" connected, with stored ratings; stale, "Not rated yet" and "Insufficient evidence" states handled; one person tries the main flow without instructions. |
| **4 · 9 Oct** | Test, Evaluate & Deploy | 4h testing · 1h accessibility · 1h deploy · 2h reserve | Tested on a typical story, a difficult one (a well-supported alarming warning) and one it should decline to rate; held-back articles compared with the manual ratings; top failure fixed; limitations recorded; cost cap verified; **public link opened in a private browser window**. Feature freeze. |
| **5 · 10 Oct** | Finalize & Submit | 1h polish · 4h submission + demo video · 3h reserve | Main journey polished; all submission fields complete; short backup demo recorded; every answer reviewed once; **submitted by 01:00 Istanbul, 11 Oct**. |

**If behind:** reduce history to ten cards, rate fewer articles, inspect one claim and one supporting page, and simplify filters. **Keep the connected feed and both ratings.** Replace a blocked source with another eligible one. Do not quietly revert to a static catalogue or a paste-a-URL-only tool.

## Delivery, stack and budget

Leyla builds solo with agent support; no coding experience is assumed. Plan a small managed app with stored feed entries and ratings, bounded processing and a short operator guide.

**Stack: open, decided by 3 October.** Compare two options with a short trial:

- **Agent-written code with free hosting** (for example Claude Code or Cursor with Vercel), which gives more control over stored ratings, scheduled fetching and cost caps.
- **A visual builder** (for example Lovable, Bolt or Replit), which is quicker to start but may be harder to cap costs in and to store ratings in.

Choose on: can it fetch RSS on demand, store ratings, enforce a spending cap, publish a public link without login, and let Leyla operate it without debugging code?

**Budget: about US$100 total incremental spend through judging.**

| Item | Allowance |
| --- | --- |
| Tools and hosting (free tiers first) | $15 |
| AI calls: calibration, testing and live ratings | $45 |
| Keeping the app live and rating through judging | $15 |
| Contingency, tax and currency movement | $25 |

Measure cost per rated article during preparation before fixing the daily cap; start at three articles a day. Planning estimates for about 130 ratings through judging: $20–60 on Claude Opus 5, $8–23 on Claude Sonnet 5 (see `prep/03_feasibility.md`). Cache the fixed rubric instructions, use the Batch API for the daily run, and have the app fetch source pages itself. Set a hard spending limit with the AI provider. These are estimates, not quotes or purchase authorization; costs after judging need a separate decision.

## Participant profile

| Field | Entry |
| --- | --- |
| Country | Türkiye |
| Timezone | Europe/Istanbul |
| Primary role | Independent Researcher & Builder |
| Experience | I have shipped AI projects |
| Team | Solo |
| Public display | Tick it (needed for Community Choice and the Showcase) |
| Project name | AI, Seriously? |
| One-line idea | An AI-news feed that rates every story for quality and hype, and shows the evidence behind each rating. |

**Short introduction (draft):**
> Independent researcher and builder based in Istanbul. I design multi-agent AI workflows that take on research-heavy work: gathering sources, fact-checking, drafting and editing, with a human approving each step. I care about AI that people can trust, so I build in clear sourcing and human oversight from the start. Here to build something useful in five days, learn from this community, and trade feedback. Say hello!

## Next steps

- [x] Run the feature-scoping workstream and approve the feature list
- [ ] Build the clickable mockup
- [ ] Check the name and choose two eligible RSS sources
- [ ] Prepare the eight calibration articles and rubric anchors
- [ ] Trial and choose a stack; set up accounts and a spending cap
- [ ] Finish the profile: review step 2 (Skills), agree to the Code of Conduct, tick public display, click Finish profile
- [ ] Update the project name and one-line idea on the dashboard
- [ ] Write the starting-point note
- [ ] Block time for 6–10 October, and for three peer reviews on 10–12 October

## Open questions

Check the FAQ, Terms and Code of Conduct:

- Who owns the IP in submitted projects?
- How do peer-review scores feed into the finalist shortlist?
- What happens if a participant misses their three peer reviews?
- Do any Challenge Partners offer credits (for example free AI or hosting credits) or special awards?
- Should the same project also enter the AI Startup Pitch Competition?

Implementation still needs Leyla's explicit approval, as do outreach to testers, purchases, registration, publication and submission.

## Sources

- Challenge page and FAQ, from the saved PDF and page text gathered on 25 September 2026: [challenge](https://womenaibuilders.org/conference/challenge), [FAQ](https://womenaibuilders.org/conference/challenge/faq).
- Daily Missions preview on the challenge dashboard (screenshots, 25 September 2026).
- Earlier briefs, archived in `archive/`: `challenge-brief-2026-09-25.docx` and `news-feed-brief-2026-09-25.md`. The challenge brief refers to `WAIB_Challenge/` files on branch `claude/intelligent-cray-4ioglx`, which are not in this repository.
