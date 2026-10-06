# Repository audit and adaptation record

Inspected October 6, 2026, through the connected GitHub plugin using read-only fetch calls. No repository or live website was modified.

## Version verified

Repository: [LeylaTurk/AI-Builders-Conference](https://github.com/LeylaTurk/AI-Builders-Conference).
The repository metadata names **main** as the default branch. The branch endpoint returned commit **dc88b53d7750ad5c39403428815ff82b7d575b74**, authored/committed October 6, 2026 at 11:02:02 UTC. It exactly matches the user's supplied reference. All four files below were then read by that immutable commit, rather than a moving branch name.

| File inspected | Git blob SHA | Purpose |
|---|---|---|
| [engine/rating-prompt.md](https://github.com/LeylaTurk/AI-Builders-Conference/blob/dc88b53d7750ad5c39403428815ff82b7d575b74/engine/rating-prompt.md) | 853ba3ec4ed3cd8309761d222d622778859185b3 | 21 checks, source-access rules, wording/evidence separation |
| [engine/scoring.ts](https://github.com/LeylaTurk/AI-Builders-Conference/blob/dc88b53d7750ad5c39403428815ff82b7d575b74/engine/scoring.ts) | fd864345608dde7011b0cdaadd786082537ef29c | Actual section thresholds, aggregation, floors, source-rule overrides, quote verification |
| [engine/rating-schema.json](https://github.com/LeylaTurk/AI-Builders-Conference/blob/dc88b53d7750ad5c39403428815ff82b7d575b74/engine/rating-schema.json) | 4fb62a3484f1100615a3f8ef7c68be10ccb08098 | Required structured answers, quote/reason/location fields, source-status enum |
| [master-project-brief.md](https://github.com/LeylaTurk/AI-Builders-Conference/blob/dc88b53d7750ad5c39403428815ff82b7d575b74/master-project-brief.md) | 7b170b4f26299a210e87e8c62b7401481288751e | Labels, public framing, review states, prior claims-page scope |

UTF-8 snapshots are saved in source-snapshots/ under this directory. Repository metadata and branch were independently fetched; these are not an inference from the supplied SHA. The current commission overrides the older brief's “Common claims” aggregation-only concept.

## What the engine actually does

The prompt instructs the model to fill a checklist, not choose scores. Schema answers are **Y, N, NA, NC** (“met,” “not met,” “not applicable,” “not checked”). Each answer requires an answer, quote, paragraph, and reason. Separate metadata includes key_claims, main_source (description, URL, read/locked/unlinked/none), claim_type, summary, reason, and unscored other_observations.

Hype sections: H (H1–H3, headline), P (P1–P3, proportionality), W (W1–W2, wording).
Evidence-gap sections: T (T1–T5, transparency), S (S1–S4, evidence strength), C (C1–C4, context).

For each section, code counts Y and N only. Fewer than two checked applicable answers puts a section out; the reason is “not checked” if any NC exists, otherwise “not applicable.” Among scoreable sections the fraction Y/(Y+N) maps to levels: 1→1; ≥.75→2; ≥.5→3; ≥.25→4; otherwise5. At least two sections must remain. The average is rounded to the nearest integer, with exact .5 rounded down. Hype has a floor of 4 when H=5; evidence gaps has a floor of 4 when S=5.

The brief verifies all five hype labels: **Grounded; A little spicy; Turning it up; Overheated; Off the charts**. It separately names five evidence-gap labels: None; Minor; Some; Major; Unsupported. The adapted claim rubric preserves the hype labels but uses plain numeric gaps plus a limitations explanation if numeric gaps are calculated; article gap descriptions involving interviews cannot transfer unchanged.

The prompt and code distinguish linked-but-unread, unlinked, and no outside source. Code forces T4=Y and P1=NC for locked; T4=N and P1=NA for unlinked; T4=NA and P1=NA for none. The prompt separately requires NC/N/NA for other source-dependent checks by status; code does **not** mechanically identify and override every such check. Do not overstate the code's enforcement.

Quote verification normalizes typography and spaces and searches the indicated paragraph, falling back to all paragraphs. A failed quote is dropped from display, while the answer still counts. The brief's review guidance says an unmatched quote should hold back a rating, but this file alone does not establish that end-to-end holdback is implemented. This audit is limited to the four required files; it is not a live deployment parity or whole-system security audit.

## Check-by-check mapping

| Original check | Treatment for recurring claims |
|---|---|
| H1 headline matches body | Irrelevant to a standalone proposition; omitted. Claim occurrence fidelity is an editorial gate, never a score of our rewriting. |
| H2 headline preserves uncertainty | Omitted as a separate item; meaningful certainty is assessed once by P1 or P3. |
| H3 no headline clickbait | Article headline teasers are irrelevant; substantive rhetorical inflation belongs once in W1. |
| P1 no stronger than main source | Adapted to current evidence status across the inspected source set, not just an article's linked main source. |
| P2 finding not stretched | Retained; explicit place, system, denominator, population and time scope added to operational guidance. |
| P3 predictions framed as predictions | Retained; also tests unsupported certainty in dismissals. Pure prediction certainty belongs here, not additionally P1. |
| W1 no exaggeration | Retained, but no duplicate N for the same P1/P2/P3 problem. Severity of a accurately described harm is not hyperbole. |
| W2 no anthropomorphism | Adapted: unsupported human intention or misleading mechanism is tested. Ordinary causal shorthand is not automatically N; the engine's blanket “AI replaces workers” rule is not transferred. |
| T1 named people/organizations | Adapted to traceability of the evidence base (new T1). A short claim needs no interview list. |
| T2 independent quoted expert | Not required. Independent corroboration of an empirical inference belongs in new S2, without a quotation/interview quota. |
| T3 conflicts disclosed | Relevant evidence-source interests included in new T1; absence of a disclosure paragraph in the claim is irrelevant. |
| T4 main-source hyperlink in article | Not applied to claim wording. New T2 assesses inspectability across relevant evidence. |
| T5 original checking/reporting | Not applied as a duty of the claim author. Evidence corroboration is assessed in new S2. |
| S1 checkable evidence | Retained in spirit across new T2 and S1, addressing distinct inspectability and directness questions. |
| S2 evidence fits claim size | Split conceptually: wording extrapolation is P2; empirical directness is new S1. Do not duplicate one finding across ledgers. |
| S3 explained key numbers | Adapted to the intelligibility of underlying quantitative inputs (new S3), not whether an isolated sentence explains them. |
| S4 independent confirmation | New S2. One authoritative policy/court text can establish what that instrument says without a second expert. |
| C1 states uncertainty | An isolated claim's evidential certainty is P1/P3. New C2 assesses unresolved competing explanations in the evidence itself. |
| C2 background/context | New C1 assesses coverage gaps. Missing article background is irrelevant to claim scoring. |
| C3 jargon explained | Editorial readability requirement for the new page, not a scored failure of the public claim. |
| C4 opinion/forecast labeled | A missing article-type label is irrelevant. Actual future certainty remains P3. |

## Deliberate departures and practical limits

The adaptation drops article headline section H and its special floor; the remaining P and W sections both must qualify. It retains the engine's per-section formula, equal section weighting, tie rule, and 1–5 labels. The resulting instrument is coarser than a many-item scale: a single failure among three P checks gives P=3, and with W=1 produces hype=2. Several topics may therefore receive 2 for quite different substantive reasons. That is an expected feature, not a reason to add failures or engineer variety.

The new rubric adds a conservative publication safeguard: any applicable NC withholds a numeric rating. Existing article code may still calculate a “partly checked” rating; this claim workflow instead avoids silently rewarding unchecked evidence. A demonstrated uncertainty is not automatically NC: one can assess whether “could” or “will” accurately represents known uncertainty even when the future outcome is unknown.

The prompt's “if unsure, N” rule is superseded here by explicit uncertainty handling. Article source-link penalties, interview requirements, and strict headline rules are also not transferred. These changes follow the current commission's prohibition on penalizing an isolated claim for article omissions or treating hypothetical outcomes as inherently exaggerated.

The optional claim evidence-gap calculation is separate from hype and may be left qualitative in the initial design. No combined score is produced. The method is a documented editorial checklist, not an empirically validated psychometric scale. Human editorial review remains pending until it actually occurs.

