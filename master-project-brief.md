# Decoding the Hype — master project brief

**Leyla Amur · updated 26 September 2026 (latest: rating scales and names) · 5-Day AI Builder Challenge, 6–10 October 2026**  
**Stage:** product, features, sources, visual design and rating display decided; mockup done; implementation has not begun.

**Browse AI news. Check the hype. Understand what holds up.**

This brief merges the two earlier documents in `archive/` (the challenge brief and the AI news feed brief) and records every decision made since. Part 1 covers the product; Part 2 covers the challenge, preparation and delivery. Supporting research and plans are in `prep/`, the article backlog in the private repo `LeylaTurk/ai-news-articles` (wishlist and instructions in `backlog/`), and the clickable mockup in `mockup/`.

| Item | Status |
| --- | --- |
| Idea | **Decided:** an AI-news website that rates each story for hype and for gaps in its evidence, with the evidence shown. |
| Name | **Decoding the Hype**, subtitle *AI news, headlines, and claims* (renamed 6 Oct; subtitle and tagline not final; name and domain not yet checked). |
| Feature scope | **Approved** 25–26 Sep: 12 Musts, 4 Shoulds (see [Features](#features-approved) and `prep/feature-list.md`). |
| Ratings | **Decided** 26 Sep: two separate ratings on **matching scales where fewer is better**: 🌶 **Hype** (1–5 chillies) and 🚩 **Evidence gaps** (1–5 flags for gaps in the evidence). |
| Sources | **Decided:** big outlets are not fetched or AI-rated; the feed uses press releases, company announcements and openly licensed outlets, plus a hand-collected backlog. Readers can check any article by pasting it. |
| Visual design | **Decided:** "Night edition" colours; three highlight colour families; shared look with the videos. |
| Mockup | **Done** 26 Sep: four clickable screens plus option boards ([canvas](https://claude.ai/artifact/NWzfGeYbTxNZkCLAfrVFLr), private until shared; source in `mockup/`). |
| Videos | **Planned:** video 0 before the sprint; four learner videos after. |
| Sprint approach | **Decided:** front-load prep; build-first sprint, not the official Daily Missions. |
| Build stack | **Lovable** (decided 5 Oct); set up on Tue 6 Oct. |
| AI model | **Decided 6 Oct: Claude Sonnet 5.5.** Compared with Opus 5.5 on the 4 build stories: both matched 66 of 84 hand answers; Sonnet costs about half (estimated 3–7 cents a story against 7–14). Switching is one setting if the held-back stories show a problem. |
| Budget and time | About **US$100** through judging; **40 hands-on hours** in the sprint, plus prep. |

**Next actions:** video 0 script (30 Sep); name check and source terms (30 Sep); collect and hand-rate the backlog (2 Oct).

---

# Part 1 — The product

## What it is

An enjoyable news website about artificial intelligence. Readers browse a live feed, see at a glance **how hyped** each story is and **how big the gaps** in its evidence are, and open "Why this rating?" to see the article marked up with the reasons. They can also **check any article themselves** by pasting a link or its text.

**Browse the feed → see the chillies and flags → open a story → see the marked-up evidence.**

An example card (fictional story):

> **AI can replace 40% of workers, new study claims**  
> Work & society · News article · Example News · 2 hours ago  
> A study tested an AI system on selected office tasks under human supervision. The article presents the result as a forecast about jobs.  
> 🌶🌶🌶🌶 **Hype: Overheated** · 🚩🚩🚩🚩 **Evidence gaps: Major**  
> The result concerns selected tasks in a supervised test. The headline turns that into a claim about replacing workers.  
> **Why this rating?** · **Read original ↗**

Readers see the headline, a short summary written by the site, the two ratings and a one-line reason. The full article stays on the publisher's site behind "Read original", unless the source's licence allows showing it (see [Sources](#sources-and-permissions)).

## Audience and purpose

| Audience | Reason to use it |
| --- | --- |
| **Primary: the general public** | Enjoy browsing AI news while getting help judging exaggerated claims, evidence and uncertainty. |
| **Secondary: educators, students, journalists and creators** | Find examples, understand sourcing, explain why a story deserves attention or scrutiny, and use the explainer videos. |
| **Tertiary: libraries, communities and public-interest organizations** | Use stories, ratings and videos for media literacy and discussion. |

The benefit is better-informed public discussion: helping people recognise unsupported excitement and unsupported alarm while taking substantiated risks seriously. Accurate public understanding of AI's abilities *and* risks matters for AI safety. The project draws on Leyla's interest in AI accountability, her multi-agent research and fact-checking experience (the five-agent ENKA 70 editorial pipeline), and her editorial and community work. These uses are hypotheses, not validated demand; no testers are committed yet.

**Why AI is needed:** reading each article, picking its key claims, comparing them with the source and explaining the gap cannot be done by hand for a live feed. The AI does the checklist assessment; published criteria, stored ratings, quote-checking and visible evidence keep it inspectable.

**Where it fits:** Ground News rates *publishers*, not individual articles, and reviewers name that as its main weakness (a trusted outlet's weak article still looks fine). Decoding the Hype rates **each article**, and no established service rates **hype** separately.

## Features (approved)

Full list with hours and details: `prep/feature-list.md`.

| Tier | Features |
| --- | --- |
| **Must have** (build order) | 1. Live feed: RSS import, refresh with "checked at", dedup, stale state · 2. Ratings: hype (chillies) and gaps (flags), plus a one-line reason · 3. Stored, versioned ratings with a daily cap (start at 3 a day) and a hard spending limit · 4. Cards with a short summary · 5. "Not rated yet" and "Insufficient evidence to rate" states · 6. Evidence gaps breakdown (three parts) · 7. Behind the Claim with coverage status · 8. Operator controls: **review each feed rating** (live straight away, labelled until reviewed; changed 6 Oct); pause; withdraw or correct a rating · 9. Accessibility basics · 10. "How ratings work" page · 11. **"Check an article"**: link (allowlisted sources) or pasted text, private result, nothing stored · 12. **Colour-coded markup view**: highlights by category, click for the reason and the source passage |
| **Should have** (only if Day 3 ends on schedule) | Sorts (Newest, Fewest evidence gaps, Most hyped, Unrated) · topic filter chips · scheduled daily rating run · **"Learn" section** with the explainer videos · **"Common claims" page** (added 2 Oct; built last, if time allows; see below) |
| **Later** | Guess the hype · share/export cards · cost view · "Disagree with this rating?" link · PDF/OCR sources · Turkish coverage · story clustering · paired comparison · fetching links from any site · accounts and notifications · browser extension · dark mode · phone-optimised layout (to be checked in the mockup) |

**Plan for the actual hours (decided 2 Oct):** Leyla has **5.5 hours a day** in the challenge week (27.5 h) plus about 9.5 hours of prep. Changes from the list above: **all four candidate feed sources** whose terms allow it (EurekAlert, The Conversation, ProPublica, OpenAI news); the **archive with Highlights pages is required**; **links in "Check an article" and the Common claims page are built only if ahead**; Behind the Claim checks 1 claim against 1 source page; the evidence gaps breakdown panel is dropped (the markup shows the same findings); operator controls are the approve step (pause via the provider's spending limit); video 0 moves to after the challenge (a 2-minute screen recording is the demo video); no reserve, so the cut order is the safety net. The day-by-day plan and progress tracker is the private "Decoding the Hype Sprint Plan" page. The original estimate follows for reference.

**Time (original estimate):** the Musts total about 27.5 hours against about 28 build hours plus 4 reserve. Leyla decides any cuts on Day 3, in this order: (1) Behind the Claim at its smaller size, (2) simpler operator controls (the approve step stays), (3) one feed source and 10 cards, (4) drop the breakdown panel (the markup shows the same findings). **Never cut:** the live feed, both ratings, the "Not rated" and "Insufficient evidence" states, the spending cap, accessibility.

### 1. The live feed

Two eligible feed sources, about **20 recent cards**, and a refresh that fetches new entries and shows when the feed was checked. Duplicate URLs are removed. New entries show **"Not rated yet"** until the daily rating run reaches them (start at **three a day**, adjusted after measuring cost). A failed fetch keeps the previous feed with a stale-status message. Rating time is shown separately from feed-check time. The feed is read by the site's server on a schedule, not embedded from other sites. Cached examples can support a demo but cannot replace the connected feed.

### 2. "Check an article"

Readers paste a **link** or the **article text** and get a private rating with the markup.
- **Links are fetched only from an allowlist** of sources whose terms permit it (open-licensed outlets, press releases, company announcements). For any other site: *"We can't fetch this site. Paste the article text instead."*
- The result is **shown only to that reader**; the article and its rating are **not saved or published**. A length limit and the shared daily spending cap apply; all input is treated as untrusted.

### 3. "Why this rating?" and the colour-coded markup

The detail page shows the two ratings, the one-line reason, the **article marked up like an editor would**, an **evidence gaps breakdown**, and **Behind the Claim**:
- **Markup:** each finding is highlighted in the text. Click it to see the explanation, the matching source passage and which rating it affects. The markup is shown for feed articles only where the source's licence allows showing the text; for checked articles it's private to the reader.
- **Behind the Claim:** up to **two key claims** traced to up to **two source pages** (fallback: one and one), with exact passages, links, what was read, partly read or unavailable, and what the evidence says about risks and unknowns. Quotes are **checked against the fetched text in code** before display.

### Archive and "Highlights" story pages (decided 2 Oct)

**Required.** The website shows the hand-collected archive (`LeylaTurk/ai-news-articles`) as an **archive page**: each story's headline, outlet, date, a **"Read original"** link, a short summary in Leyla's words, one or two short credited quotes, and **Leyla's hand ratings, labelled "Rated by Leyla"** ("Not rated yet" for the rest). **No full article text from outlets that don't allow it** (CNN, NBC, CBS, ABC, NPR, Fox and others): reproducing it would breach their copyright and undercut the "publishers' terms respected" answer to the Responsible design criterion. Stories from newsrooms that invite republishing (e.g. Texas Tribune, CalMatters, CT Mirror, Chalkbeat, Wisconsin Watch, Capitol News Illinois, Inside Climate News) may appear in full, following their terms.

**Two kinds of story page:**
- **Full markup:** the whole article with highlights inline, for sources whose terms allow showing the text (the feed sources and permissive archive stories).
- **Highlights:** for big-outlet stories. Each finding appears as a **short excerpt (a sentence or less)** in reading order, with its position ("paragraph 9 of 14"), its colour, icon and label, and the explanation; Behind the Claim uses short quotes too. Mockup: `mockup/project/Highlights.dc.html`.

**Three things that make Highlights feel complete:** (1) every card and story page says **"Full markup"** or **"Highlights"**, and the story page explains why ("We show highlights only, to respect [outlet]'s copyright"); (2) **"Open the full article at [outlet] ↗"** so readers can follow along with paragraph numbers; (3) **"See every highlight in the full text"** opens Check an article, where the reader pastes the article and gets the complete markup privately (not stored). For this to work, hand-rated findings record the **exact short quote** and its paragraph.

### "Common claims" (added 2 Oct)

**Decided 2 Oct: built last, only if time allows.** Each rating also tags the story's main claim with **one type from a fixed list** of common AI claims. A **Common claims** page groups rated stories by claim type and shows, for each: how many stories made it, their typical Hype and Evidence gaps, and the best-supported and most hyped examples (linking to their story pages). It's separate from Behind the Claim, which checks one story's claim against that story's own source.

**Starting list (tuned after seeing real tags):** (1) AI will take jobs or replace workers · (2) AI beats experts (doctors, lawyers, programmers) · (3) AI could wipe out humanity, or we'll lose control · (4) AI acts on its own (rogue agents, "wants", "decides") · (5) a company's "world's first / most capable" claim · (6) data centers bring jobs and growth · (7) AI saves time or money · (8) AI harms children or mental health · (9) other.

**Enough stories to group (decided 2 Oct):** on Day 2, rate a **one-off batch of 30–40 recent stories** from the feed source, then return to the daily cap. Approving the batch takes about an hour. The archive's big-outlet stories can't appear here. **Estimate:** about 30 minutes for the claim tag in the rating step (cheap enough to include from the start, so the data exists either way) plus 1.5–2 hours for the page.

### "AI claims explained" (added 6 Oct)

A separate, hand-researched section at `/claims`, beside the Feed: **six claims** (water, jobs, energy and climate, creativity, privacy, existential risk), each led by a **loud headline claim** someone actually published (a statement, never a question; e.g. "AI will take all our jobs"), scored against the evidence, next to a **careful version** that the evidence supports, also scored, a plain short answer, and **interactive layers** for the nuance (highlighted key word, "One claim, five ways", a draggable semicircle gauge with the five hype labels that shows the same claim said five ways, one per level (the headline and careful version are real; the other three are examples written and scored with the same checks), fine-print chips, a true-or-false quiz, and a "what happens to my chat?" picker for privacy). At the bottom, **"In the news" cards** show three real articles per claim (makes the claim, reports it carefully, pushes back), each led by its hype label, rated with the feed's own article checklist and linking to the story page when the story is in the feed (added 7 Oct). Labels match the feed: "AI rating, not yet reviewed" until Leyla marks a page reviewed. Only hype is scored; evidence limits are described in words, without flags. **Loud-claim rule (claims rubric 1.1, 6 Oct):** like the article headline rule, a claim whose accuracy checks reach level 4 or 5 scores at least 4. It **does not replace "Common claims"**, which stays as above (built last, only if time allows). Research, content and Lovable prompt: `workstreams/ai-claims-us/`.

## How the ratings work

### Two ratings, matching scales: fewer is better

**Decided 26 Sep; renamed 6 Oct.** The evidence rating is called **"Evidence gaps"** and shown with flag icons. (It was "Gaps" until 6 Oct; Leyla renamed it so the name says what the gaps are in. Code names such as `rateGaps` stay as they are.) Like "Hype", it names a *problem*, so the name points the same way as the icons (more flags, bigger gaps) and the two read as parallel warnings. Rejected: "Red flags" (the icons already say it), "story score" and "Evidence" (positive words that invite reading more flags as better), "Doubts" (sounds like opinion), "Loose ends" and "Holes" (less clear or harsher). Two separate ratings are kept because they answer different questions (the **packaging** versus the **substance**), and the cases where they disagree are the ones readers most need flagged. Any single combined number would give a strong study with a clickbait headline and a calm but unsupported story nearly the same score. Both ratings use the **same direction**: more icons means more to worry about.

| | 🌶 **Hype** | 🚩 **Evidence gaps** |
| --- | --- | --- |
| **Question** | How far does the framing go beyond the evidence? | How big are the gaps in the evidence? |
| **Shown as** | 1–5 orange chillies + word | 1–5 crimson flags + word |
| **1** | **Grounded:** the framing matches the evidence's scope and certainty. | **None:** sources are named and independent, the key claims rest on evidence you can read, and the limits are stated. |
| **2** | **A little spicy:** some flourish, without a major change in meaning. | **Minor:** small omissions (e.g. no independent expert, one limit missing) that don't change what a reader should conclude. |
| **3** | **Turning it up:** noticeable inflation or missing qualifications affect how the story is understood. | **Some:** gaps a reader should know about, e.g. a single interested source, an unexplained number, limits buried at the end. |
| **4** | **Overheated:** major extrapolation or unjustified certainty drives the story. | **Major:** the key claims rest on thin or unchecked evidence, e.g. one press release, a tiny or single-site study, no independent voice. |
| **5** | **Off the charts:** the central framing goes far beyond the evidence. | **Unsupported:** no real, readable evidence behind the key claims. |

The formulas below decide the level; these descriptions (starting drafts, 26 Sep) are for hand rating and the "How ratings work" page.

The **gaps** rating combines three parts, each shown in the breakdown (formula: see "How ratings are produced", point 3):

| Part | Checks for gaps in |
| --- | --- |
| **Source transparency** | The people and organisations quoted are named; at least one independent expert; conflicts of interest disclosed; the article **points readers straight to its source**: the study, report, press release or announcement is linked, or cited exactly (title, publisher and date); if a reader has to search for it, this check fails; more than a reworded press release. |
| **Strength of the evidence behind the key claims** | The key claims rest on something checkable (a study, data, a document, an official record or a named first-hand statement); the evidence is strong enough for the size of the claim (e.g. one CEO's word for "most companies will", or a single-hospital study for "AI beats doctors", is flagged); key numbers are explained (where they come from and what they measure); independent confirmation exists. Whether the *wording* overstates the source is scored under hype, not here. |
| **Context** (changed 5 Oct) | Does the reader get what they need to judge the story? Four checks: says what's unproven or uncertain about the key claim; gives the background and context needed, including scale; explains concepts clearly and avoids jargon; news, opinion and prediction distinguished. (A separate "not buried or brushed off as skeptics" check was dropped on 5 Oct.) Human labour behind an AI system moved to Hype (agency framing: "the AI did it" when people did much of the work). |

**Checks fit any kind of story (decided 26 Sep).** The checklist is worded for any key claim, not only studies: company decisions, announcements, policy, court cases and incidents too. **A check that doesn't fit this kind of story is "not applicable" and doesn't count;** only "no" means the story should have done it and didn't. Found while hand-rating the Block layoffs story, where study-only wording turned three irrelevant checks into gaps.

(Internally, gaps = 6 − the evidence score in the original rubric, so the anchors and research are unchanged.)

**Hype (changed 5 Oct): does the story make AI sound bigger, surer or scarier than the evidence?** A checklist in three sections, scored like Evidence gaps. **Headline:** matches what the story shows; keeps any uncertainty; no clickbait. **Claims in proportion:** doesn't sound surer than the source (needs the source); doesn't stretch the finding further than it goes; predictions presented as predictions. **Wording:** no exaggerated or promotional language, in either direction; no anthropomorphising (AI described as having human thoughts, feelings or intentions, or credited for work people did; fine when attributed to researchers as a description of behaviour). Every N records the exact words and paragraph, which become the orange highlights.

### Rules that don't change

- **Low hype doesn't mean low risk.** A serious, well-evidenced warning should show 1 chilli and 1 flag.
- **Hype is not added again** into the gaps rating.
- **No guessing:** if the **article** can't be read, show **"Insufficient evidence to rate"** (an empty grey meter) for both ratings, never a made-up rating. A headline or feed snippet alone can't earn a rating.
- **Article readable, source not (decided 26 Sep; source rule tightened 5 Oct):** "source" means the main thing the story rests on: a study, report, press release or announcement. **The article must link to it (decided 5 Oct).** If it's only named, quoted or described, that counts as a **gap** even if the rater could find it by searching: a source that's easy to find on the day may be gone or buried a few days later, and the site's AI follows only links in the article, so hand ratings and AI ratings use the same rule. T4 is N, every check that needs the source is N, and "stronger claim than the source" isn't scored. (This replaces the 26 Sep "found by digging" option.) If the source is **linked but can't be read** (paywall, dead link), checks that need it count as **not checked**, not failed; the other checks still count. **Hype** then scores only the checks that need just the article (hyperbole, agency framing, headline versus its own body, promotional wording, clickbait); "stronger claim than the source" isn't scored. Both ratings carry the label **"Partly checked: source not read"**, and Behind the Claim shows the source as unavailable. If there's **no outside source** (the reporter's own interviews, records or an event they attended), T4 and the source checks are NA and Part S is judged on the reporting itself.
- Ratings are **stored with the article version, date and rubric version**, so they don't change on refresh.
- A rating is an assessment of how well **this article** supports what it says, not a verdict on truth or on the outlet. Ratings are AI-assisted and can be corrected.

### Built on published research

HealthNewsReview.org's review criteria; NewsGuard's pass/fail criteria; the Trust Project indicators; Science Feedback's credibility criteria and verdict tags; Sumner et al. (BMJ 2014) on exaggeration starting in press releases; Wright & Augenstein (2021) on claim strength and exaggeration; and Kapoor & Narayanan's "Eighteen pitfalls in AI journalism" (2022), 17 of which map onto the checklist. Details: `prep/05_rating_research.md`; source PDFs in `prep/sources/`.

### How ratings are produced (decided 26 Sep)

1. **Checklist method.** The AI answers specific **yes / no / not applicable** checklist questions, each backed by a **quoted passage**. **Code** turns the answers into both ratings, and every quote is matched against the article text before it's shown. An **"other observations"** field lets the AI note anything the checklist doesn't cover; it is shown but **not scored**. Reasons: steadier results than an overall AI judgement (which research found agrees with experts only moderately), every rating explainable finding by finding, the markup view *is* the rating, and weights can be tuned without re-prompting. This is the HealthNewsReview/NewsGuard approach of fixed, published criteria.
2. **Hype formula (changed 5 Oct; replaces the 26 Sep findings-and-points formula).** Hype uses the **same method as Evidence gaps**: each section's level comes from the share of applicable checks met (all → 1 · 75% or more → 2 · 50–74% → 3 · 25–49% → 4 · under 25% → 5); Hype is the average of the three sections, ties rounded down; a section needs at least 2 checks answered Y or N, and with two or more sections out Hype is **"Insufficient evidence"**. **Headline rule:** if the Headline section is 5, Hype is **at least 4**, because many people read only the headline. Repeats don't count extra (one exaggeration or ten both make that check N), and minor/major severity is no longer recorded: the sections and the headline rule do that job more consistently. *Why it changed:* the points formula was hard to apply consistently and "distortion" was unclear; the checklist matches Evidence gaps, so both ratings are explained the same way.
3. **Evidence gaps formula (decided 26 Sep; starting draft, tuned on the hand-rated backlog).** Each part is a short checklist answered **yes / no / not applicable**. A part's level comes from the **share of applicable items met**: **all → 1 None · 75% or more → 2 Minor · 50–74% → 3 Some · 25–49% → 4 Major · under 25% → 5 Unsupported**. **Evidence gaps = the average of the three parts**, with ties (e.g. 2.5) rounded **down** to fewer flags. **Safety rule:** if *Strength of the evidence behind the key claims* is 5 (Unsupported), Evidence gaps is **at least 4**, so named sources and good context can't hide a story with no real evidence. **Parts that don't apply (decided 26 Sep):** a part needs **at least 2 applicable, checked items** to be scored; otherwise the breakdown shows it as **"not applicable"** or **"not checked"** (never zero or a midpoint). With one part out, Evidence gaps is the average of the other two; with two or more out, Evidence gaps shows **"Insufficient evidence to rate"**. The safety rule applies only when *Strength of the evidence* was scored.
4. **Human review, visible on every rating (changed 6 Oct).** Feed ratings go live as soon as they're made, labelled **"AI rating, not yet reviewed"**; once Leyla checks one it shows **"Reviewed by Leyla"**, and she can correct or withdraw any rating at any point. A rating with a quote that isn't found in the article, missing text or an error is held back for her instead. (Until 6 Oct every feed rating waited for her approval; Leyla changed this once the engine matched her hand rating.) **Pasted checks** are instant and private, so they're labelled **"AI assessment, not reviewed"**.
5. **Outlet name hidden, source type kept.** The AI doesn't see the outlet's name or brand, to reduce reputation and political bias, but it is told the **source type** (e.g. "press release from the institution that did the study", "company announcement about its own product", "independent news outlet"), because the conflict-of-interest and independent-expert checks depend on who is speaking.
6. **The two ratings are cleanly separated; each finding counts once.** **Hype** = the gap between the article's *wording* and its evidence ("beats radiologists" versus "matched"). **Evidence gaps** = the *strength of what's underneath*: named and independent sources, a study that exists and can be read, its design and limits. The Evidence gaps part "support for the selected claims" becomes **"strength of the evidence behind the key claims"**. An accurate press release about a single-hospital study therefore gets low hype but some evidence flags.
   - **Borderline findings (decided 26 Sep).** *PR material:* promotional words adopted in the outlet's own voice ("revolutionary", "world's first") → **Hype**; a company or press release as the only, unchecked source → **Evidence gaps** (unchallenged source). *Predictions:* a future claim stated with unjustified certainty → **Hype**; a piece not marked as opinion, analysis or forecast → **Evidence gaps** (context). **One quoted passage produces one finding:** if it fits both, it goes to Hype when the problem is wording or certainty, and to Evidence gaps when it's a missing source or label.

## The colour-coded markup categories

Colour shows the **family**; each category also has its own **icon, label and underline style**, so colour is never the only cue.

| Family | Colour | Categories | Affects |
| --- | --- | --- | --- |
| **🌶 Hype** | orange `#EB6834` | Overstated claim (solid) · Hyperbole, including promotional wording (wavy) · Human–AI framing (dotted) | Adds chillies |
| **🚩 Evidence & sourcing** | crimson `#B3123A` | Unexplained number (double) · Unchallenged source (dashed) · Missing context (margin note) | Adds gaps |
| **✓ Good practice** | green `#1BAF7A` | Independent expert, linked study, stated limits | Met item: counted in the Evidence gaps score, no bonus |

The three colours passed colour-blindness tests in light mode (seven separate colours failed). Dark mode is borderline for orange against crimson and needs tuning before a dark theme is built.

## Visual design

**Decided 26 Sep** (details: `prep/10_visual_design.md`):
- **Night edition colours:** deep violet header `#2B1B5E` with a yellow highlighter logo `#FFE34D`; pale lilac page `#F6F3FF`; violet links and buttons `#5B3FD1`. Every text pair checked at 4.5:1 or better.
- **Reading areas stay white and calm;** colour lives in the header, buttons, meters and highlights.
- **Typography:** an editorial serif (Fraunces) for headlines; Public Sans for the interface; Source Serif for article text.
- **Shared identity with the videos:** highlighter marks, paper texture, torn-paper edges, the same three highlight colours.
- **Accessibility:** real buttons and links, keyboard focus, 44 px touch targets, icons and labels on every colour.

## Explainer videos

**Decided 26 Sep** (details: `prep/09_video_plan.md`). Leyla on camera plus voice-over collage in a Vox-like style, with captions and transcripts on every video.

| # | Video | When |
| --- | --- | --- |
| 0 | "Why AI hype matters now": the state of AI headlines, why it matters for AI safety, what the website does (2–3 min) | Before the sprint: script 30 Sep, film 2 Oct, publish 4 Oct |
| 1 | Overstated claims & unexplained numbers | After the challenge |
| 2 | Hyperbole & human–AI framing | After |
| 3 | PR language & missing context | After |
| 4 | What good AI reporting looks like | After |

Scripts are checked against the site's own checklist. Video work stays outside the 40 sprint hours. Suggested tool: CapCut (free, captions, collage effects); Descript for talking-to-camera editing.

## Sources and permissions

**Decided.** Research: `prep/06`–`08`; terms PDFs in `prep/sources/`.

- **Big outlets are not fetched or AI-rated.** Reuters and AP have no public RSS and license their content; CNN, Fox, the NYT and others prohibit or don't clearly allow automated or AI use; **the Guardian's terms (clause 6(g)) forbid AI analysis, text and data mining and bots on its API, website and RSS feeds.** Many publishers added such clauses in 2023–24, so a public feed doesn't mean AI use is allowed.
- **The rated feed uses four sources (terms checked 6 Oct; PDFs in `prep/sources/`):** EurekAlert! press releases, OpenAI news, The Conversation and ProPublica. Each feed story shows the headline, a link back, the rating, a short summary in our own words and, except for EurekAlert, one or two short credited quotes. No full text is shown.
- **The Conversation (checked):** free to republish selected articles unedited with credit and their page counter; extracts and quotes with a link are allowed; not all articles systematically. Evidence highlights go in the site's own panel, not marked up inside their text.
- **ProPublica (checked 6 Oct):** CC BY-NC-ND; no wholesale or automatic republishing, and stories are picked one by one. Rating and linking isn't republishing, and only AI stories are rated.
- **EurekAlert! (checked 6 Oct; decided 6 Oct):** its terms (section 7) allow downloading or redistributing content only for personal, non-commercial use without written permission from EurekAlert! and AAAS. **Decided: headline, link, rating and our own summary only, no quotes.** Leyla chose this over asking for permission. **6 Oct: no working EurekAlert feed was found, so it isn't imported for now.**
- **OpenAI news (checked 6 Oct):** OpenAI's Terms of Use cover ChatGPT and its other services; no separate terms for the openai.com website were found. Its news feed is published for subscribers, so rating, linking and short quotes are used. **6 Oct: OpenAI's site blocks the feed from reading its article pages, so these stories can't be rated and are kept off the home page** (Leyla can paste one into /admin by hand).
- **Summaries stay short and about the assessment,** because a 2026 US ruling found that AI summaries substituting for articles may infringe.
- **Headline-and-link demos** of big outlets are assessed in `prep/08_headline_demo_assessment.md` (local development vs private hosting vs public).
- **Readers can check any article** by pasting its text.

## Tone

Curious, sharp and welcoming. The spice metaphor is for exaggerated presentation, not the severity of harm. Don't mock affected people or assume every dramatic claim is wrong.

## Name

**Name (decided 6 Oct): Decoding the Hype**, with the working subtitle **"AI news, headlines, and claims"** (subtitle and tagline not final). It replaces "AI Decoded: Don't fall for the hype" (4 Oct), which was already used elsewhere, and the first working name "AI, Seriously?". The logo reads "Decoding the **Hype**" with "Hype" on the yellow highlighter mark; the subtitle sits under it on the feed. **Not yet checked** for existing products or a domain; nothing purchased. **Behind the Claim** names the evidence section. Avoid **ClaimTrail** ([existing product](https://claimtrail.dev/)).

## Testing and acceptance

- **Calibration set:** 8–12 backlog articles rated by hand (4 held back), covering supported alarm, unsupported optimism, calm overstatement, shared sources and access failures (wishlist: `backlog/wishlist.md`). The AI's ratings are compared with Leyla's to choose the model and tune the rubric.
- **The backlog lives in the private repo `LeylaTurk/ai-news-articles`** (decided 26 Sep), never in this public repo, because it holds article text. It already contains 52 free news stories saved by an agent on 26 Sep (Set: `archive`; summary, short exact quotes and links, with the full text pasted in later by Leyla; 11 marked for hand rating in `archive-rating-picks.md`). Since 2 Oct they also feed the site's **archive page** (see [Archive and "Highlights" story pages](#archive-and-highlights-story-pages-decided-2-oct)): big-outlet stories appear only as **Highlights** (short quotes, links, Leyla's ratings), and their full text stays in the private repo; stories from newsrooms that allow republishing may appear in full.
- **Reader tests:** three to five ordinary readers, including people outside AI circles (after outreach is authorised): browsing enjoyment, understanding both ratings, spotting a key limitation, wanting to return.
- **Acceptance targets:** refresh adds entries without duplicates; failed fetches show stale status; unrated items get no invented ratings; quotes match the source text; a serious well-supported warning isn't labelled hype; caps actually limit spend; blocked sites get the paste message; keyboard use, contrast and non-colour labels work.

## Responsible design

- Protect credentials, validate URLs, treat all article and pasted text as untrusted, and keep only what's needed.
- Respect publishers' terms: allowlist for fetching, short attributed excerpts, links back.
- Show what the AI read and couldn't read, when a rating was made and with which rubric version.
- Human oversight: **every feed rating is labelled until Leyla reviews it, and doubtful ones are held back for her**; she can also refresh, correct or withdraw ratings, change sources, check costs and pause processing without code. Pasted checks are labelled as unreviewed AI assessments.
- Accessibility as above; start in English.

---

# Part 2 — Challenge, preparation and delivery

## The challenge

The 5-Day AI Builder Challenge is run by Women AI Builders (WomenTech Network) as part of the AI Builders Global Conference, 14–16 October 2026. [Challenge](https://womenaibuilders.org/conference/challenge) · [FAQ](https://womenaibuilders.org/conference/challenge/faq)

| Parameter | Rule |
| --- | --- |
| Format | Virtual and global. Solo, or a team of up to 4. Free; includes an Explorer conference pass. |
| Stack | None required. Code, low-code and no-code are scored the same way. |
| Build window | 6–10 October. Earlier work is allowed if declared as the starting point; reviewers judge what was added during the sprint. |
| Must have | AI as a meaningful part of the solution, and a **public working link reviewers can open without logging in**. Source code can stay private. |

| Criterion | Weight | How this project answers it |
| --- | --- | --- |
| Problem and user value | 25% | Readers can't easily tell AI hype from substance; every story gets an explained rating, and any article can be checked. |
| Working execution | 25% | A live feed, stored ratings, clear stale/unrated/insufficient states, a tested public link. |
| Thoughtful use of AI | 20% | AI checks each article against a published checklist with quoted evidence; code computes the ratings and verifies quotes; outlet names hidden to reduce bias. |
| Originality and approach | 15% | Article-level hype and evidence-gap ratings with editor-style markup, plus explainer videos. |
| Responsible and inclusive design | 15% | Visible evidence, no guessing, publishers' terms respected, private checks, cost caps, every feed rating labelled until a person reviews it, accessibility. |

**Submission (required):** title and one-line value proposition; summary; problem and users; public link; starting point; what was built during the challenge; role of AI; building responsibly. **Optional:** demo video, walkthrough, architecture notes or deck, screenshots.

**Judging:** eligibility check → three peer reviews per project (Leyla also reviews three) → shortlist → 10 finalists → Jury Winner. **Community Choice** is a separate public vote (prize capped at USD 5,000).

## Timeline

| Date (2026) | Istanbul time | What happens |
| --- | --- | --- |
| 25 Sep – 5 Oct | — | Preparation (below) |
| 5 Oct | — | Kick-off webinar |
| 6 Oct | **06:59** | **Signup closes** (5 Oct, 11:59 PM ET) |
| 6–10 Oct | — | Build sprint |
| 11 Oct | **01:00** (target) | Aim to submit (6 PM ET on 10 Oct) |
| 11 Oct | **06:59** | **Projects due** (10 Oct, 11:59 PM ET) |
| 10–12 Oct | — | Peer review: Leyla reviews three projects (1.5–3 hours, outside the sprint) |
| 12–13 Oct | — | Jury reviews finalists |
| 15 Oct | — | Community Showcase and Awards |

## Preparation before 6 October

**Approach:** do as much as possible before the sprint. **Do early:** research, rubric, mockup, source checks, backlog and manual ratings, prompt drafts, accounts, spending limits, an empty test deployment, video 0. **Keep for the sprint:** the web app itself, which is what judges score as "built during the challenge". Everything done early goes in `prep/starting-point-log.md`, which becomes the "starting point" submission field.

| By | Task | Status |
| --- | --- | --- |
| 25–26 Sep | Brief merged; feature scoping; rating, source and design research; video plan; mockup | ✅ Done |
| 30 Sep | Video 0 script, checked against the rubric | To do |
| 30 Sep | Name check; confirm feed sources and allowlist terms (save PDFs) | Terms done 6 Oct; name check to do |
| 2 Oct | Film video 0 | To do |
| 2 Oct | Collect the backlog and rate it by hand (8+ articles, 4 held back) | To do |
| 3 Oct | Rating prompt and output format drafted; compare Opus 5 vs Sonnet 5; measure cost per article | Done 6 Oct (`engine/`); Sonnet 5.5 chosen; real cost per article measured once Lovable runs it |
| 4 Oct | Edit, caption and publish video 0 | To do |
| 4 Oct | Pick and set up the stack: accounts, API key, spending limit, empty web app at a public URL | To do |
| 5 Oct | Sprint task list with cut order; starting-point log final; profile and dashboard complete; kick-off webinar | To do |

## Five-day build plan

Leyla's own build-first plan, not the official Daily Missions (which are guidance only). About **28 of the 40 hours go to building**, plus 5 testing, 3 submission and demo video, and 4 reserve.

| Day | Build focus | Done by end of day |
| --- | --- | --- |
| **1 · 6 Oct** | Rating engine + feed import | Real article → checklist findings → both ratings and reason, end to end; feed importing and stored; **deployed to the public URL from day one** |
| **2 · 7 Oct** | Feed and cards | Rated cards; stored, versioned ratings; "Not rated yet" and "Insufficient evidence"; daily cap and spending limit working |
| **3 · 8 Oct** | "Check an article" + markup view | Allowlisted link or pasted text → private rating with highlights; **someone tries it without instructions**; cut decision if behind |
| **4 · 9 Oct** | Explanations, controls, polish | Breakdown, Behind the Claim, operator controls, "How ratings work", accessibility; held-back articles compared with manual ratings; **public link checked in a private window**; feature freeze |
| **5 · 10 Oct** | Test, submit | Fixes; submission fields; demo video; **submitted by 01:00 Istanbul, 11 Oct** |

**If behind:** follow the cut order above. Keep the connected feed and both ratings; replace a blocked source with another eligible one; don't fall back to a static catalogue.

## Stack and budget

Leyla builds solo with agent support; no coding experience assumed. It's a **web app**: people open it at a public web address, with no download. **Naming (decided 26 Sep):** readers see **"website"**; the challenge submission and technical notes say **"web app"**; a bare "app" is avoided in anything readers see, because it suggests something to install. **Stack decided by 4 Oct** after a short trial: agent-written code with free hosting (e.g. Claude Code with Vercel) versus a visual builder (e.g. Lovable, Bolt, Replit). Choose on: fetching feeds on a schedule, storing ratings, enforcing a spending cap, a public link without login, and operating it without code.

**Decided 5 Oct: Lovable.** Setup moves to the first 1.5 hours of Tue 6 Oct; the rubric work (hand ratings, rating instructions, model choice) comes first on Mon 5 Oct because the rating engine needs it, but the blank site itself doesn't. Things to get right in Lovable: (1) the AI provider's API key is stored as a **backend secret** and every rating call runs in a backend function, never in the browser; (2) feed fetching and the daily rating run need a **scheduled backend job**; (3) ratings are stored in the backend database with the approve step before publishing; (4) the Hype and Evidence gaps **scores are calculated by code** (port the formulas from the Rating Desk), not by the AI; (5) check that the Lovable plan's credits cover a week of building; (6) the hard spending limit is still set with the AI provider.

**Budget: about US$100 through judging:** $15 tools and hosting (free tiers first), $45 AI calls, $15 keeping it live through judging, $25 contingency. Estimated AI cost for about 130 ratings: $20–60 on Claude Opus 5, $8–23 on Claude Sonnet 5 (`prep/03_feasibility.md`); pasted-article checks share the same daily cap. Use prompt caching, the Batch API for the daily run, and the site's own fetching of source pages. Set a hard spending limit with the AI provider. Video tools stay on free plans or are a separate personal cost.

## Participant profile

| Field | Entry |
| --- | --- |
| Country / timezone | Türkiye · Europe/Istanbul |
| Primary role | Independent Researcher & Builder |
| Experience | I have shipped AI projects |
| Team | Solo |
| Public display | Tick it (needed for Community Choice and the Showcase) |
| Project name | Decoding the Hype: AI news, headlines, and claims |
| One-line idea | An AI-news feed that rates every story for hype and for gaps in its evidence, and shows the evidence behind each rating. |

**Short introduction (draft):**
> Independent researcher and builder based in Istanbul. I design multi-agent AI workflows that take on research-heavy work: gathering sources, fact-checking, drafting and editing, with a human approving each step. I care about AI that people can trust, so I build in clear sourcing and human oversight from the start. Here to build something useful in five days, learn from this community, and trade feedback. Say hello!

## Next steps

- [x] Merge the briefs; run feature scoping; approve the feature list
- [x] Research ratings, sources and visual design; plan the videos
- [x] Build the clickable mockup; choose colours and rating display
- [x] Decide how ratings are produced (checklist method, hype formula, human review, hidden outlet name, clean separation)
- [x] Name the evidence rating: "Evidence gaps"
- [ ] Video 0: script (30 Sep), film (2 Oct), publish (4 Oct)
- [ ] Check the name; confirm feed sources and allowlist terms
- [ ] Collect and hand-rate the backlog; compare models; measure cost
- [ ] Choose and set up the stack; empty public deployment (Lovable chosen 5 Oct; setup Tue 6 Oct)
- [ ] Finish the profile (step 2 Skills, Code of Conduct, public display) and update the dashboard name and one-liner
- [ ] Write the sprint task list; finalise the starting-point log
- [ ] Block time for 6–10 October and the peer reviews on 10–12 October
- [ ] Share the mockup with anyone who should see it (it's private until shared)

## Open questions for the challenge

Check the FAQ, Terms and Code of Conduct: who owns the IP in submitted projects; how peer-review scores feed the shortlist; what happens if peer reviews are missed; whether partners offer credits or special awards; whether to also enter the AI Startup Pitch Competition.

Implementation still needs Leyla's explicit approval, as do outreach to testers, purchases, registration, publication and submission.

## Sources

- Challenge page and FAQ (saved PDF and page text, 25 Sep 2026); Daily Missions preview (screenshots, 25 Sep 2026).
- Earlier briefs in `archive/`. The challenge brief refers to `WAIB_Challenge/` files on another branch, not in this repository.
- Research files `prep/05`–`10` and source PDFs in `prep/sources/`.
