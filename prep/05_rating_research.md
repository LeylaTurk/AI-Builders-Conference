# Research: how to rate AI news, and where the evidence comes from

**AI, Seriously? · preparation research · 25 September 2026 · first pass**

**Question:** how should each part of the rating work, where does the information for each judgement come from, and does the approach match established practice?

**Method:** web searches only. The pages themselves could not be opened from this session (network block), so every finding below comes from search-result summaries. Items marked **(verify)** need the original page; see "Pages to check" at the end.

## 1. How established services rate news

| Service | What it rates | How | What we can borrow |
| --- | --- | --- | --- |
| **HealthNewsReview.org** (2006–2018) | Individual health news stories | 10 fixed criteria, each **Satisfactory / Unsatisfactory / Not applicable**; score = share satisfied. Applied to 2,600+ stories. Stopped reviewing in 2018 when funding ended. | The closest model to ours: article-level, checklist-based, about overstated claims. Criteria include benefits, harms, **quality of evidence**, **independent sources and conflicts of interest**, **novelty**, **availability**, **alternatives**, and "**doesn't rely solely on a news release**". Most stories failed on costs, benefits, harms, evidence quality and alternatives. [criteria](https://www.healthnewsreview.org/about-us/how-we-rate-stories/) · [AMA Journal of Ethics](https://journalofethics.ama-assn.org/article/healthnewsrevieworg-criteria-excellence-health-and-medical-journalism/2007-03) · [Wikipedia](https://en.wikipedia.org/wiki/HealthNewsReview.org) (verify exact wording) |
| **NewsGuard** | Whole websites, not articles | 9 criteria, each **pass/fail** with fixed points (0–100). Trained journalists; they contact the site before publishing a failing rating. | Pass/fail items with published weights are transparent and consistent. Relevant items: "avoids deceptive headlines", "handles news vs opinion responsibly", "gathers and presents information responsibly". [criteria](https://www.newsguardtech.com/ratings/rating-process-criteria/) |
| **Ad Fontes Media** | Articles and shows | Reliability 0–64 and bias −42 to +42. Panels of three analysts (left, centre, right). Reliability combines **veracity, expression, headline/title and graphics**. | Rate the **headline separately** from the body: headline hype is often the main problem. Using several reviewers reduces individual bias. [methodology](https://adfontesmedia.com/methodology/) |
| **Science Feedback** | Articles and claims about science | Scientists review; credibility score plus a one-word **verdict tag** explaining the reason. | Short verdict tags are a proven format for our one-sentence explanation and hype labels. [process](https://science.feedback.org/process/) (verify scale and tags) |
| **The Trust Project** | Publishers' own transparency | 8 indicators: best practices, author expertise, **type of work** (news/opinion/analysis labels), **citations and references**, **methods**, locally sourced, diverse voices, actionable feedback. | A checklist for our **source transparency** component. [indicators](https://thetrustproject.org/) |

**What they have in common:** fixed, published criteria; mostly **yes/no checklist items** rather than a free 1–5 judgement; trained humans; transparency about method. None of them rates *hype* as a separate score. That part of our idea is distinctive.

## 2. Research on exaggeration and hype

- **Sumner et al., BMJ 2014** (about 500 university press releases): 40% had exaggerated advice, 33% exaggerated causal claims, 36% exaggerated inference to humans from animal studies. When the press release exaggerated, the news usually did too (58–86%); when it didn't, news exaggeration fell to 10–18%. **Lesson:** trace claims back to the press release and the original study; that is where the exaggeration often starts. [ScienceDaily](https://www.sciencedaily.com/releases/2014/12/141210081011.htm) · [EurekAlert](https://www.eurekalert.org/news-releases/681104)
- **Wright & Augenstein, EMNLP 2021**, and follow-up work name four measurable distortions: **stronger causal claims**, **changed certainty**, **over-generalised results**, **sensationalised results**. Claim strength can be graded (for example correlational → conditional causal → direct causal). **Lesson:** these four distortions make good anchors for the hype meter. [paper](https://aclanthology.org/2021.emnlp-main.845/) · [fine-grained distortions, 2024](https://arxiv.org/html/2402.12431v1)
- **Kapoor & Narayanan, "18 pitfalls in AI journalism"** (2022; 50+ articles from NYT, CNN, FT, TechCrunch, VentureBeat). Pitfalls fall into four groups: **flawed human–AI comparisons**, **hyperbolic or misleading claims**, **uncritically repeating PR and company spokespeople**, and **limitations not addressed**. Examples: attributing agency to AI, robot imagery, reusing PR phrases, accuracy figures without saying how they were measured. **Lesson:** this is an AI-specific hype checklist ready to use. [article](https://www.normaltech.ai/p/eighteen-pitfalls-to-beware-of-in) · [PDF checklist](https://www.cs.princeton.edu/~sayashk/ai-hype/ai-reporting-pitfalls.pdf) · [ENJOI summary](https://enjoiscicomm.eu/flaws-in-reporting-on-ai_checklist-for-reporters/) (need the full list of 18)

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
| **Source transparency** | Sources are named · At least one independent expert (not the company or its funders) · Conflicts of interest disclosed · Links or names the original study, benchmark or announcement · Does more than repeat a press release | HealthNewsReview 5 and 10; Trust Project; Kapoor (PR pitfalls) |
| **Support for the selected claims** | Each traced claim matches its source in scope, number and certainty · Performance figures say how they were measured (benchmark, test conditions) · Claims about deployment match actual availability | Sumner; Wright & Augenstein; Kapoor; HealthNewsReview 9 |
| **Context and qualifications** | Limitations or risks mentioned · Compared with a baseline or alternative · Novelty accurately described · News, opinion and prediction are distinguished | HealthNewsReview 2–4, 7, 8; NewsGuard; Trust Project |

### Hype meter: count distortions, with the headline weighted more

The model checks the **headline** and the **body** separately for:
1. Stronger causal claim than the evidence supports
2. More certainty than the source expresses
3. Over-generalisation (a test becomes the real world; tasks become jobs; one benchmark becomes "AI can…")
4. Sensational or emotive framing
5. Attributing human agency or intent to AI
6. Misleading human–AI comparison
7. Company or PR claims presented as fact
8. Speculation about the future presented as current fact

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
| **The Conversation** | Creative Commons **Attribution/No Derivatives**: free to republish with author, institution and link credit; must include their page-view counter; **no edits**; **can't systematically republish all articles**. [guidelines](https://theconversation.com/us/republishing-guidelines) | Good for showing *selected* articles in full. Unclear whether highlighting evidence counts as an "edit"; ask them (us-republish@theconversation.com). |
| **Guardian Open Platform** | Free developer key, **non-commercial only**, about 5,000 calls/day; full text available via the API; **content must not be stored for more than 24 hours**. [summary](https://publicapis.io/the-guardian-api) | Full text for rating is possible, but stored quotes and summaries may conflict with the 24-hour rule. **Must read the actual terms.** |

**Recommended approach (to confirm):** link out by default; show full text only for a source whose licence clearly allows it; keep summaries short and assessment-focused.

## 6. Pages to check (blocked here)

Leyla can save these as PDFs and add them to the repo. Most important first:

1. **Kapoor & Narayanan's 18 pitfalls, full list:** [cs.princeton.edu/~sayashk/ai-hype/ai-reporting-pitfalls.pdf](https://www.cs.princeton.edu/~sayashk/ai-hype/ai-reporting-pitfalls.pdf) or [the article](https://www.normaltech.ai/p/eighteen-pitfalls-to-beware-of-in). The basis of the hype checklist.
2. **Guardian Open Platform terms and conditions:** [open-platform.theguardian.com](https://open-platform.theguardian.com/), the terms page and the access/keys page. Decides whether the Guardian is usable.
3. **HealthNewsReview "how we rate stories":** [healthnewsreview.org/about-us/how-we-rate-stories](https://www.healthnewsreview.org/about-us/how-we-rate-stories/). The exact wording of the 10 criteria and the scoring.
4. **The Conversation republishing guidelines:** [theconversation.com/us/republishing-guidelines](https://theconversation.com/us/republishing-guidelines). To confirm the "no edits" and "no systematic republishing" rules.
5. **Science Feedback process:** [science.feedback.org/process](https://science.feedback.org/process/). Their scale and verdict tags.
6. *(Optional)* Wright & Augenstein 2021 paper: [arxiv.org/pdf/2108.13493](https://arxiv.org/pdf/2108.13493). Definitions of the four distortions.

## Still to research

- The **six candidate AI-news sources**: feed availability, full text, terms (this session can't reach news sites, so it depends on the PDFs or checks by Leyla).
- Whether any **existing AI-news hype rating** exists, to confirm originality.
