# Shared recurring-claim scoring rubric

Version: claims-us-1.2 (1.0 plus the loud-claim rule, October 6, 2026, and the certain-doom rule, October 7, 2026) · Research cutoff: October 6, 2026 · Status: proposed adaptation, AI research review; not human editorial approval.

Repository basis: [LeylaTurk/AI-Builders-Conference](https://github.com/LeylaTurk/AI-Builders-Conference), default branch main, inspected at commit [dc88b53d7750ad5c39403428815ff82b7d575b74](https://github.com/LeylaTurk/AI-Builders-Conference/commit/dc88b53d7750ad5c39403428815ff82b7d575b74). This matches the supplied reference. See repository-audit.md for the article-to-claim mapping.

## What is being rated

Rate the exact declarative public claim under examination, with its stated scope, qualifiers, and time horizon. Cite a real public occurrence or a faithful, explicitly identified paraphrase before scoring. Do not rate the new explainer's writing quality, the topic, or a source's reputation. Do not average unrelated versions. “Could,” “will,” “already,” “all,” and “some” are materially different.

Hype means wording or certainty exceeding the evidence. Evidence gaps describe limits in the underlying evidence base. Potential harm is described separately in prose. None of these is a measured probability of catastrophe or personal safety. Serious warnings, careful hypothetical arguments, and cautious reassurance can all score 1.

## Checklist answers and records

For every check record: code; Y/N/NA/NC; exact claim phrase where relevant; one specific reason; supporting source URL(s); and source passage/table/section. A research brief evidence-row ID may supplement but cannot replace a direct URL.

- **Y — met:** the wording fits the inspected evidence, or the defined problem does not occur.
- **N — not met:** an inspected passage or evidence comparison establishes this specific failure. Explain it; do not infer a failure merely from uncertainty.
- **NA — not applicable:** the defined test does not fit. Explain why. This is never a default for missing research.
- **NC — not checked:** necessary information could not be inspected, or a check cannot yet be resolved from the research. State what is missing. NC is not N, Y, or a claim that the proposition is false.

No penalty for an isolated claim omitting interviews, hyperlinks, an opinion label, background paragraphs, or numerical estimates it never makes. Evidence unknown to the researcher is NC; a demonstrated gap in the available evidence is an evidence-gap N. Neither automatically raises hype.

## Hype checklist: answer all five

| Code | A check is met when… | Failure examples and boundaries |
|---|---|---|
| P1 — evidence status | The claim represents the kind and strength of current evidence faithfully. | Correlation asserted as demonstrated causation; benchmark success asserted as proven deployed capability; allegations asserted as adjudicated facts. For pure future certainty use P3 instead; record Y here unless there is a distinct evidence-status problem. |
| P2 — scope | The population, system, place, scale, denominator, and time span asserted fit the evidence. | Tasks turned into entire jobs; all data centers treated as AI; one product's policy applied to all AI; local impacts made nationwide. Absent detail is not a failure unless the ordinary reading positively implies an unsupported generalization. |
| P3 — future certainty | Predictions and possibilities retain uncertainty appropriate to the evidence. | “Will,” “inevitable,” or a firm deadline asserted without sufficient support; “impossible” used to dismiss an unresolved future pathway. Y if there is no future assertion. “Could” is not automatically Y: the proposed pathway must have an evidenced or reasoned basis, with assumptions identified in the assessment. |
| W1 — rhetorical inflation | Language adds no unsupported emotional, promotional, or dismissive force beyond its factual proposition. | “Magic,” “a hoax,” or a sensational metaphor that materially changes readers' impression. An accurate description of severe harm is Y. Do not count a scope or certainty error again as rhetoric. |
| W2 — agency and mechanism | The claim does not depend on unsupported human feelings, intentions, or misleading assignment of agency to an AI system. | Literal assertions that a model wants revenge or has human emotions without evidence. Ordinary shorthand such as “AI uses electricity” or “AI changes jobs” is Y unless it conceals a materially false mechanism. Behavioral terms in research can be legitimate; inspect the definition and conditions. |

**One problem, one scored check.** Assign future certainty to P3, scope to P2, current evidence status to P1, added rhetoric to W1, and unsupported intention/agency to W2. If a phrase triggers two candidates, score the primary problem once and mark the other Y with “no distinct additional problem.” Different problems in the same sentence can receive separate N answers only with distinct reasons. The same missing-data finding must not be copied into both the hype and evidence-gap ledgers.

## Calculate hype; do not choose the number

Use section P = P1/P2/P3 and section W = W1/W2. H1/H2/H3 and the article headline floor are omitted because there is no headline/body comparison. Preserve the repository's section calculation:

1. Exclude NA and NC from a section's fraction. It needs at least two Y/N answers.
2. Fraction met = Y / (Y + N). A fraction of 1 gives level 1; at least .75 gives 2; at least .50 gives 3; at least .25 gives 4; below .25 gives 5.
3. Both P and W must be scoreable. Average their section levels, round to the nearest whole number, and round an exact .5 **down**.
4. **Loud-claim rule (added in 1.1, October 6, 2026):** if section P reaches level 4 or 5, the hype score is **at least 4**. This mirrors the article headline rule: a claim is read like a headline, and with only two wording checks a badly overstated claim would otherwise average down to 2.
5. **Certain-doom rule (added in 1.2, October 7, 2026):** if the loud-claim rule applies (section P at level 4 or 5), P3 is N (the claim states the outcome as certain), and the claim says everyone will die, the hype score is **5**. Record this as `certain_doom: {"answer": true, "reason": …}`. A careful, conditional version whose section P stays below level 4 is not affected. Leyla chose this on a decision card: the most extreme claim possible, stated as certain and stretched beyond its evidence, belongs at the top of the scale.
6. **Additional claim safeguard:** any applicable hype NC makes the publishable score **“Not yet assessable”**. Keep a provisional computed diagnostic privately if useful; never render it as the final rating. A claim too ambiguous to apply the checklist also gets no number until narrowed transparently.

| Level | Preserved display label |
|---|---|
| 1 | Grounded |
| 2 | A little spicy |
| 3 | Turning it up |
| 4 | Overheated |
| 5 | Off the charts |

These are ordinal checklist categories, not interval measurements or percentages. With five checks the scale is coarse and multiple different problems may produce the same score. The visible two- or three-sentence rationale must identify the actual failing check(s), and the full checklist must remain available.

Example calculation (synthetic, not a topic finding): P=Y/N/Y gives 2/3 met → level 3; W=Y/Y gives level 1; average 2 → **A little spicy**. A single scope problem does not become several failures just to obtain a more dramatic number.

## Separate evidence-gap assessment

Evaluate the inspected evidence base relevant to the exact claim, not missing prose in the claim or polish in our explainer. Use these adapted checks if providing a numeric evidence-gap score; always accompany it with the concrete remaining limitations.

| Section/code | What “met” means |
|---|---|
| T1 — traceability | Relevant sources' authors or responsible institutions and material interests can be identified. |
| T2 — inspectability | The decisive methods, official policy text, records, or underlying arguments can be inspected sufficiently to audit the central inference. Inaccessible decisive material is NC; inspected opaque methods are N. |
| S1 — directness | Evidence directly addresses the material mechanism/outcome being assessed, or the stated conditional pathway. Record N when only indirect proxies leave a material inferential step unresolved, not just because something is a forecast. |
| S2 — corroboration | Independent evidence corroborates the material empirical inference; repeated coverage of one study is one source. NA when the proposition is about what a particular official policy or court order says and that inspected instrument is the authoritative evidence. |
| S3 — quantities | Central numerical inputs have intelligible definitions, denominators, methods, and dates. NA if no central quantitative inference is involved. |
| C1 — coverage | Evidence covers the populations, system variants, places, and periods materially needed to assess this claim. N for demonstrated coverage gaps; do not repeat a P2 wording failure here—describe the separate data limitation. |
| C2 — unresolved alternatives | Available evidence can distinguish the main plausible competing explanations or bound the important uncertainty sufficiently to assess the claim's proposition. N where central alternatives remain empirically unresolved; not merely because a confidence interval or uncertainty exists. |

Calculate T, S, C sections with the same fraction thresholds; require at least two scored sections. Average and round exact .5 down. Preserve the repository's evidence safeguard: if S is level 5, the total is at least 4. If any applicable evidence check is NC, withhold the public numeric gaps score and use **“Partly checked”** with the missing information. Display numeric gaps only as **“Evidence gaps: n/5”**; do not reuse hype labels.

This is a new claim-evidence checklist. It is not the existing article engine's output and must not change that engine or its stored ratings.

## Required handoff and calibration

Every researcher delivers the exact scored claim; public occurrence citation; scope/time; five hype answers with evidence and calculation; evidence limitations (optional calculated gap score with all seven answers); and 2–3 explanatory sentences. Use accurate review states: “AI research draft,” then “AI evidence review completed; human editorial review pending” only after that review occurs.

Reviewer checks the claim occurrence, meaningful qualifiers, each N/NC, source independence and geography, and arithmetic. Return disagreements to researchers; keep changes in the correction log. Apply the same standards to alarming and reassuring claims. Do not increase a score to create variety across cards or to match intuitive seriousness. A material wording change requires rescoring and a new content version.

