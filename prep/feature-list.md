# Approved feature list

**AI, Seriously? · approved by Leyla Amur on 25 September 2026 · updated 25 Sep (reader paste added) and 26 Sep (link checking with allowlist, colour-coded markup, visual design decisions, matching rating scales)**

This list comes out of the feature-scoping workstream (`01`–`04` in this folder). It drives the mockup, the Day 1 brief and the daily build tasks. Change it only with Leyla's approval.

## Must have (build in this order; about 27.5 hands-on hours)

1. **Live feed:** RSS import from two eligible sources, refresh with "checked at" time, URL deduplication, stale-status message on a failed fetch.
2. **Ratings:** 🌶 hype (1–5 chillies) and 🚩 evidence (1–5 flags for gaps in the evidence), both "fewer is better", plus a one-sentence explanation.
3. **Stored, versioned ratings** plus a **daily processing cap** (start at 3 articles a day) and a **hard spending limit** with the AI provider.
4. **Article cards** with a short original summary.
5. **"Not rated yet" and "Insufficient evidence to rate" states.**
6. **Evidence breakdown** in "Why this rating?" (three parts).
7. **Behind the Claim** with coverage status: up to 2 claims and 2 source pages; fallback 1 claim and 1 page.
8. **Operator controls:** **approve each feed rating before it's published** (decided 26 Sep); pause processing; withdraw or correct a rating.
9. **Accessibility basics:** keyboard use, contrast, labels that don't rely on colour.
10. **"How ratings work" page:** the rubric, what scores do and don't mean, known limits, "low hype ≠ low risk".
11. **"Check an article": readers paste a link or the article text** and get a rating (about 4 hours).
    - **Links** are fetched only from an **allowlist** of sources whose terms permit it (open-licensed outlets, press releases, company announcements). For any other site the app says: *"We can't fetch this site. Paste the article text instead."*
    - The result is shown **only to that reader**; the article text and its rating are **not saved or published**; a length limit and the shared daily spending cap apply; all input is treated as untrusted.
12. **Colour-coded markup view** (about 4 hours), shown **alongside** the score breakdown and Behind the Claim. The article is shown with highlights, each with a colour **plus an icon and label** (not colour alone). Clicking one explains the finding and, where relevant, shows the matching source passage. Categories:
    Colour shows one of **three families** (decided 26 Sep; seven separate colours failed the colour-blindness tests, see `prep/10_visual_design.md`). Each category has its own **icon, label and underline style**:
    - **🌶 Hype family (orange), feeds the hype meter:**
      - **Overstated claim**: says more than the source (Wright & Augenstein; pitfalls 8, 9)
      - **Hyperbole**: "revolutionary", sweeping future claims (pitfalls 5–7, 10)
      - **Human–AI framing**: agency, "beats doctors" (pitfalls 1, 3, 4)
    - **🚩 Evidence & sourcing family (crimson), adds evidence flags:**
      - **Unexplained number**: figures without how they were measured (pitfall 17)
      - **PR language / unchallenged source** (pitfalls 11, 12)
      - **Missing context**: a margin note, since there's nothing to underline (pitfalls 13–15)
    - **✓ Good practice (green), removes evidence flags:** independent expert, links the study, states limits

    Highlights come from the checklist findings; each quote is **matched against the article text in code** and dropped if not found; scores are calculated from the findings. For feed articles the markup is available only where the source's licence allows showing the text; for checked articles it's private to the reader.

> **Time check (updated 26 Sep):** the Musts total about **27.5 hours**. With setup and planning moved before 6 October, the sprint has about **28 build hours plus 4 reserve**, so they fit, just. **Leyla decides any cuts on Day 3.** Cut order, first to last:
> 1. Behind the Claim at fallback size (1 claim, 1 source page)
> 2. Operator controls simplified (pause via the provider's spending limit; withdraw by editing the database). **The approve-before-publishing step stays.**
> 3. Live feed reduced to one source and 10 cards
> 4. Evidence breakdown panel dropped, since the markup view shows the same findings
>
> Never cut: the live feed itself, both ratings, the "Not rated" and "Insufficient evidence" states, the spending cap, accessibility.

## Should have (only if Day 3 ends on schedule; about 4 hours)

13. **Sorts:** Newest (default), Best evidence, Most hyped, Unrated.
14. **Topic filter chips.**
15. **Scheduled daily rating run**, only after the cap is tested.
16. **"Learn" section** (about 1 hour): video 0 plus four learner videos ("coming soon" until made), captions and transcripts, and a "▶ Learn this in 60 seconds" link on each highlight category. See `prep/09_video_plan.md`.

## Later (after the challenge)

Guess the hype · share/export cards · cost view · "Disagree with this rating?" link · PDF/OCR sources · Turkish coverage · story clustering · paired article comparison · fetching links from any site · accounts, personalization and notifications · browser extension.

## Decisions recorded

- **Model:** compare **Claude Opus 5** and **Claude Sonnet 5** on the eight calibration articles, then choose the one whose ratings on the four held-back articles are closest to Leyla's manual ratings, within the $45 AI allowance. Use prompt caching and the Batch API to reduce cost.
- **Sources:** big outlets (Reuters, AP, CNN, WIRED, Fox, BBC, NYT, the Guardian) are **not** fetched or AI-rated, because their terms prohibit it or don't clearly allow it (`prep/06_source_research.md`). The rated feed uses press releases, company announcements and openly licensed outlets (`prep/07_press_release_sources.md`), plus the hand-collected `backlog/`. Readers can still check any article by pasting its text; links are fetched only from the allowlist.
- **Source pages** are fetched by the app itself, not by the AI provider's web-fetch tool.
- **Quotes** in Behind the Claim are checked against the fetched text in code before display.
- **Visual design (26 Sep, partly superseded below):** three colour families (hype orange, evidence ~~blue~~ crimson, good-practice green); ~~story score as blue segments with number and word ("4/5 Strong")~~; hype as orange chillies with word and number ("A little spicy · 2/5"); no green-to-red traffic lights; "Insufficient evidence" as an empty grey meter; paper-and-highlighter accents shared with the videos, plain reading view. See `prep/10_visual_design.md`.
- **Colour direction (26 Sep): "Night edition"**: deep violet header (`#2B1B5E`) with a yellow highlighter logo (`#FFE34D`), pale lilac page (`#F6F3FF`), violet links and buttons (`#5B3FD1`, `#2B1B5E`). All text pairs checked at 4.5:1 or better. The three highlight families are unchanged.
- **Rating display (26 Sep): Option D.** The **chilli meter is the only meter** on cards (1–5 chillies with its word, e.g. "Overheated"). The story score is shown as an **evidence label in plain words** ("🔎 Evidence: Limited", from Weak to Very strong), not as a second scale, because two look-alike scales pointing in opposite directions confused readers. Both are still scored 1–5; the detail page shows the numbers and an "Evidence breakdown". Replaces the blue score segments in the earlier visual design decision.
- **Matching scales (26 Sep, replaces the evidence label above):** Leyla kept two separate ratings (combining them would merge the cases readers most need told apart) and asked for both scales to match. Both now read **"fewer is better"**: 🌶 **Hype**, 1–5 orange chillies (Grounded … Off the charts), and 🚩 **Red flags**, 1–5 **crimson** flags (Well supported, Minor gaps, Some gaps, Major gaps, Unsupported). Red flags = 6 − the evidence score, so the rubric is unchanged. The evidence highlight family moves from blue to crimson `#B3123A` so red always means evidence problems; orange, crimson and green pass the colour-blindness tests in light mode (dark mode needs tuning).
- **Name of the evidence rating (26 Sep, provisional, to revisit):** labelled **"Evidence"** in the app for now, shown with 1–5 crimson flag icons and a word (e.g. "Evidence 🚩🚩🚩🚩 Major gaps"). Not "red flags" and not "story score" ("score" suggests higher is better). The icons carry the meaning.
- **How ratings are produced (26 Sep):** checklist method with quoted evidence and code-calculated ratings, plus unscored "other observations"; severity-weighted hype formula (minor 1, major 2, headline ×2; 0→1, 1–2→2, 3–4→3, 5–6→4, 7+→5; major central-claim distortion in the headline → at least 4); human review before publishing feed ratings ("Reviewed by Leyla"; pasted checks labelled "AI assessment, not reviewed"); outlet name hidden from the AI but source type kept; the two ratings cleanly separated so each finding counts once, with the evidence part "support for the selected claims" renamed "strength of the evidence behind the key claims". Details in `master-project-brief.md`.
