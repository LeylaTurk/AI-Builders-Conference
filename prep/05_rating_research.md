# Research: how to rate AI news, and where the evidence comes from

**AI, Seriously? · preparation research · 25 September 2026 · second pass (six sources checked against the originals)**

**Question:** how should each part of the rating work, where does the information for each judgement come from, and does the approach match established practice?

**Method:** web searches, then the originals for six key sources, supplied by Leyla as PDFs and saved in `prep/sources/`. Findings from the originals are marked **✓ checked**. The rest still come from search-result summaries; items marked **(verify)** need the original page (see "Pages to check" at the end).

## 1. How established services rate news

| Service | What it rates | How | What we can borrow |
| --- | --- | --- | --- |
| **HealthNewsReview.org** (2006–2018) | Individual health news stories | 10 fixed criteria, each **Satisfactory / Unsatisfactory / Not applicable**; score = share satisfied. Applied to 2,600+ stories. Stopped reviewing in 2018 when funding ended. | The closest model to ours: article-level, checklist-based, about overstated claims. Criteria include benefits, harms, **quality of evidence**, **independent sources and conflicts of interest**, **novelty**, **availability**, **alternatives**, and "**doesn't rely solely on a news release**". Most stories failed on costs, benefits, harms, evidence quality and alternatives. [criteria](https://www.healthnewsreview.org/about-us/how-we-rate-stories/) · [AMA Journal of Ethics](https://journalofethics.ama-assn.org/article/healthnewsrevieworg-criteria-excellence-health-and-medical-journalism/2007-03) · [Wikipedia](https://en.wikipedia.org/wiki/HealthNewsReview.org) (verify exact wording) |
| **NewsGuard** | Whole websites, not articles | 9 criteria, each **pass/fail** with fixed points (0–100). Trained journalists; they contact the site before publishing a failing rating. | Pass/fail items with published weights are transparent and consistent. Relevant items: "avoids deceptive headlines", "handles news vs opinion responsibly", "gathers and presents information responsibly". [criteria](https://www.newsguardtech.com/ratings/rating-process-criteria/) |
| **Ad Fontes Media** | Articles and shows | Reliability 0–64 and bias −42 to +42. Panels of three analysts (left, centre, right). Reliability combines **veracity, expression, headline/title and graphics**. | Rate the **headline separately** from the body: headline hype is often the main problem. Using several reviewers reduces individual bias. [methodology](https://adfontesmedia.com/methodology/) |
| **Science Feedback** ✓ checked | Articles and claims about science | Scientists rate articles from **+2 (very high) to −2 (very low)** credibility; the final rating is the **average of the reviewers**, and if reviewers largely disagree **no rating is issued** ("debated"). Seven criteria: factual accuracy, scientific understanding, **context and limitations** ("not overly simplified, overstated or over-hyped"), logic, precision, **source quality** (independent experts, conflicts of interest), fairness. Every review is checked by a second editor before publication. | Keyword tags map straight onto our labels: **Exaggerating**, **Overstates scientific confidence**, **Clickbait headline**, **Lack of context**, **Cherry-picking**, **Undisclosed conflict of interest**, **Conflates facts and opinions**, **Inappropriate sources**. Their "debated, no rating" rule supports our "Insufficient evidence to rate". [process](https://science.feedback.org/process/) |
| **The Trust Project** | Publishers' own transparency | 8 indicators: best practices, author expertise, **type of work** (news/opinion/analysis labels), **citations and references**, **methods**, locally sourced, diverse voices, actionable feedback. | A checklist for our **source transparency** component. [indicators](https://thetrustproject.org/) |

**What they have in common:** fixed, published criteria; mostly **yes/no checklist items** rather than a free 1–5 judgement; trained humans; transparency about method. None of them rates *hype* as a separate score. That part of our idea is distinctive.

## 2. Research on exaggeration and hype

- **Sumner et al., BMJ 2014** (about 500 university press releases): 40% had exaggerated advice, 33% exaggerated causal claims, 36% exaggerated inference to humans from animal studies. When the press release exaggerated, the news usually did too (58–86%); when it didn't, news exaggeration fell to 10–18%. **Lesson:** trace claims back to the press release and the original study; that is where the exaggeration often starts. [ScienceDaily](https://www.sciencedaily.com/releases/2014/12/141210081011.htm) · [EurekAlert](https://www.eurekalert.org/news-releases/681104)
- **Wright & Augenstein, EMNLP 2021** ✓ checked: frame exaggeration as comparing a report with its source and labelling it **downplays / same / exaggerates**. They grade claim strength on a 4-step scale: **no relationship → correlation ("estimated") → conditional causation ("cautious", "can") → direct causation ("proven")**. Their benchmark has 563 expert-labelled press-release/abstract pairs: 144 exaggerate, 113 **downplay**, 406 match. The best automatic method reached only about **47–61 macro-F1** on these tasks. **Lessons:** (1) the claim-strength scale is a ready anchor for "support for claims" and hype; (2) under-selling happens too, which fits our "low hype ≠ low risk" rule; (3) automatic exaggeration detection is genuinely hard (with 2021-era models), so calibration and human checks are essential. [paper](https://aclanthology.org/2021.emnlp-main.845/) · follow-up work adds certainty, generalisation and sensationalism as further distortion types [2024](https://arxiv.org/html/2402.12431v1) (verify)
- **Kapoor & Narayanan, "Eighteen pitfalls to beware of in AI journalism"** ✓ checked (30 September 2022; 50+ AI articles from the NYT, CNN, FT, TechCrunch and VentureBeat). The full list, in four groups:

| Group | Pitfalls | Where it goes in our rubric |
| --- | --- | --- |
| **Flawed human–AI comparison** | 1 Attributing agency to AI · 2 Suggestive imagery (humanoid robots) · 3 Comparison with human intelligence · 4 Comparison with human skills | Hype: 1, 3, 4. (2 needs images; skip in the first version.) |
| **Hyperbolic, incorrect or non-falsifiable claims** | 5 Hyperbole ("revolutionary" without evidence) · 6 Uncritical comparison with historical transformations · 7 Unjustified claims about future progress · 8 False claims about progress · 9 Incorrect claims about what a study reports · 10 Deep-sounding terms for banal actions | Hype: 5, 6, 7, 10. Support for claims: 8, 9 (checked against the traced source). |
| **Uncritically platforming those with self-interest** | 11 Treating company spokespeople and researchers as neutral · 12 Repeating PR terms and statements | Source transparency: 11. Hype: 12. |
| **Limitations not addressed** | 13 No discussion of limitations · 14 Limitations de-emphasised (buried at the end) · 15 Limitations in a "skeptics" framing · 16 Downplaying human labour · 17 Performance numbers without uncertainty or conditions · 18 Fallacy of inscrutability ("black box") | Context: 13, 14, 15, 16, 18. Support for claims: 17. |

This covers 17 of the 18 pitfalls (all but imagery) with text-only checks, and each comes with real published examples we can use to calibrate. [article](https://www.normaltech.ai/p/eighteen-pitfalls-to-beware-of-in) · [PDF checklist](https://www.cs.princeton.edu/~sayashk/ai-hype/ai-reporting-pitfalls.pdf)

## 3. Can an AI do this reliably?

- LLM credibility ratings of *outlets* agree with each other strongly (ρ ≈ 0.79) but only **moderately with human experts** (ρ ≈ 0.50). They spot clearly unreliable sites well, but some studies found **political skew**: right-leaning outlets rated less reliable. [arXiv 2304.00228](https://arxiv.org/html/2304.00228) · [ACM WebSci 2025](https://dl.acm.org/doi/10.1145/3717867.3717903)
- Fact-checking research: larger models do better, and **giving the model the evidence** (rather than relying on its memory) improves every model. Answers can vary between runs; consistency methods help. [arXiv 2502.08909](https://arxiv.org/html/2502.08909) · [arXiv 2601.02574](https://arxiv.org/abs/2601.02574)

**Implication:** a model asked "rate this article 1–5" is not reliable enough on its own. It becomes much more defensible when it:
1. answers **specific yes/no checklist questions**, each backed by a quoted passage;
2. works from the **fetched article and source text**, not its memory;
3. has its scores **computed by code** from the answers, not chosen freely;
4. is **checked against Leyla's manual ratings** (the calibration set) and spot-checked by a human.

## 4. Recommended changes to the rubric

These change *how* scores are produced, not what the reader sees.

### Story score: each component becomes a short checklist

The model answers each item **Yes / No / Not applicable**, with a quote as evidence. The component score (1–5) is the share of applicable items met, mapped to the scale.

| Component | Checklist items (draft) | Borrowed from |
| --- | --- | --- |
| **Source transparency** | Sources are named · At least one independent expert (not the company, its funders or the tool's builders) · Conflicts of interest disclosed · Links or names the original study, benchmark or announcement · Does more than repeat a press release | HealthNewsReview 5 and 10; Trust Project; Science Feedback "source quality"; pitfall 11 |
| **Support for the selected claims** | Each traced claim matches its source in scope, number and **claim strength** (correlation / conditional / causal) · Nothing is claimed that the source doesn't report (pitfalls 8, 9) · Performance figures say how and where they were measured (pitfall 17) · Deployment claims match actual availability | Wright & Augenstein; Sumner; pitfalls 8, 9, 17; HealthNewsReview 9 |
| **Context and qualifications** | Limitations or risks discussed (13) · …and not buried at the end (14) · …or dismissed as "skeptics" (15) · Human labour behind the system acknowledged (16) · No "black box" excuse for developers (18) · Compared with a baseline or alternative · News, opinion and prediction distinguished | Pitfalls 13–16, 18; HealthNewsReview 2–4, 7, 8; Science Feedback "context and limitations" |

### Hype meter: count distortions, with the headline weighted more

The model checks the **headline** and the **body** separately for:
1. **Stronger claim than the source**: moves up the claim-strength scale (for example correlation → causation) or adds certainty (Wright & Augenstein; Science Feedback "overstates scientific confidence")
2. **Over-generalisation**: a test becomes the real world, tasks become jobs, one benchmark becomes "AI can…"
3. **Hyperbole** without evidence: "revolutionary", "breakthrough" (pitfall 5), including historical-revolution comparisons (6)
4. **Unjustified future claims** presented as near-certain (7)
5. **Attributing agency** to AI (1), or **comparing it with human intelligence or skills** (3, 4)
6. **PR terms and company claims** repeated as fact (12)
7. **Deep-sounding terms** for ordinary operations: "the magic of AI" (10)
8. **Clickbait headline** the article doesn't support (Science Feedback)

Proposed mapping (to calibrate): 0 distortions → 1 Grounded; 1 minor → 2; 2 or one major → 3; 3–4 → 4; 5+ or a distortion in the central headline claim → 5. The explanation names the distortions found, so readers see *why*.

### Process safeguards

- **Hide the publisher name** from the model while it rates, to reduce reputation and political bias (research above). Show it to readers as normal.
- **Human spot-check:** at 3 ratings a day, Leyla could approve each rating before it's shown ("Reviewed by a human"). It takes about 5 minutes a day and scores strongly on oversight. *Decision for Leyla.*
- Record the checklist answers with each stored rating, so "Why this rating?" can show them.

**Verdict:** checklist-based, evidence-quoted ratings with published criteria are **consistent with established practice** (HealthNewsReview, NewsGuard). An AI-produced hype score is new; that's the originality, and why calibration and transparency matter.

## 5. Showing articles: sources and licences

| Option | What's allowed (per search results) | Fit |
| --- | --- | --- |
| **Link out** (headline, short summary, brief quotes, link) | Standard aggregator practice. **Caution:** a March 2026 US ruling (publishers v. Cohere) found that "substitutive" AI summaries that mirror an article's structure may infringe. Keep summaries to 1–2 sentences about the *assessment*, not a replacement for the article. [Copyright Lately](https://copyrightlately.com/court-rules-ai-news-summaries-may-infringe-copyright/) | Default for all sources. |
| **The Conversation** ✓ checked | Creative Commons **Attribution/No Derivatives**. Free to republish online if you: make **no edits** (material edits need the author's approval); credit authors, institutions and The Conversation with a link; include their **invisible page-view counter**; check image licences; and **don't systematically republish all** their articles. Explicitly allowed: **extracts** (the first few lines or paragraphs plus "Read the full article on The Conversation") and **quotes** with a link. Note: "commercial, non-journalism usage: licence fees may apply". [guidelines](https://theconversation.com/us/republishing-guidelines) | Good fit. Show selected articles in full *unaltered*, and put Behind the Claim highlights in **our own panel as linked quotes**, not marked up inside their text (that could count as an edit). Confirm the app counts as non-commercial with us-republish@theconversation.com. |
| **The Guardian** ✓ checked: **ruled out** | The Open Platform terms (clause 6(g), added January 2024) forbid using Guardian content, its API **or its RSS feeds and website** "with any machine learning and/or artificial intelligence technologies to generate any data or content", for "text and data aggregation, analysis or mining", and with any bot, crawler or automated tool. They also forbid distorting an article's meaning "by association, implication or juxtaposition", require deleting all content within **24 hours**, limit the free key to **500 requests a day** (not 5,000 as search results said), and allow end users personal, non-commercial use only. [terms](https://www.theguardian.com/open-platform/terms-and-conditions) | **Not usable in any form**, including RSS: AI rating is exactly the prohibited use. Readers can still find Guardian stories elsewhere; the app simply won't include them. |

**Wider lesson from the Guardian terms:** since 2023–24 many publishers have added clauses that reserve their content against AI use and text-and-data mining (in the EU this is the Article 4(3) opt-out under the 2019 Copyright Directive). **An RSS feed being public doesn't make it usable for AI rating.** Every candidate source needs its terms checked for an AI or text-and-data-mining clause, and its `robots.txt` for AI crawler blocks.

**Recommended approach:** link out by default; show full text only where the licence clearly allows it; keep summaries short and assessment-focused; **only use sources whose terms don't prohibit AI analysis**, favouring openly licensed publishers (such as The Conversation) and sources that explicitly permit reuse.

## 6. Pages to check

**Done** (PDFs in `prep/sources/`): Kapoor & Narayanan checklist and article · Wright & Augenstein 2021 · Science Feedback process · The Conversation republishing guidelines.

Also done: Guardian Open Platform terms (`prep/sources/guardian-open-platform-terms.pdf`).

**Not available:** the HealthNewsReview site won't open for Leyla either (the project stopped in 2018). Its criteria are used here at summary level, as published in the [AMA Journal of Ethics](https://journalofethics.ama-assn.org/article/healthnewsrevieworg-criteria-excellence-health-and-medical-journalism/2007-03) and [Wikipedia](https://en.wikipedia.org/wiki/HealthNewsReview.org). That's enough, because our checklist wording is our own.

## Still to research

- The **candidate AI-news sources**: feed availability, full text, and above all **an AI or text-and-data-mining clause in the terms** (this session can't reach news sites, so it depends on PDFs or checks by Leyla). The Guardian is out; The Conversation is the leading candidate.
- Whether any **existing AI-news hype rating** exists, to confirm originality.
