# Cross-topic scoring calibration

Calibration date: October 6, 2026. Rubric: claims-us-1.0. Status: **scoring calibration complete for all six corrected claims.** Jobs and energy researcher responses were inspected, and all six JSON records were recalculated. The independent AI evidence-review report is the separate authority on source verification and editorial corrections. Human editorial review remains pending.

## Final after-correction results

These are the proposed scores to carry into the handoff. The saved calculator was rerun on all six revised records; output is retained in calibration-results.json. “Complete” describes scoring-method calibration, not human approval or a quantified measure of evidence confidence.

| Topic | Final exact claim | P answers / section | W answers / section | Final proposed hype |
|---|---|---|---|---|
| Water | AI data-center growth threatens local water supplies in water-stressed U.S. communities. | Y/Y/Y → 1 | Y/Y → 1 | **1 — Grounded** |
| Jobs | AI could eliminate half of US entry-level white-collar jobs within one to five years. | Y/Y/Y → 1 | Y/Y → 1 | **1 — Grounded** |
| Energy and climate | AI’s growing electricity demand could increase U.S. carbon emissions by 2030. | Y/Y/Y → 1 | Y/Y → 1 | **1 — Grounded** |
| Creativity | Generative AI can reproduce copyrighted material from its training data. | Y/Y/Y → 1 | Y/Y → 1 | **1 — Grounded** |
| Privacy | ChatGPT may use personal-account conversations to train its models, depending on your settings. | Y/Y/Y → 1 | Y/Y → 1 | **1 — Grounded** |
| Existential risk | If anyone builds artificial superintelligence using techniques and understanding like those available in 2025, everyone on Earth will die. | Y/Y/N → 3 | Y/Y → 1 | **2 — A little spicy** |

**Correction verification:** The jobs research brief's “Revision response” accepts P3=Y and identifies no distinct scale/time misrepresentation; its readable checklist, JSON, and website section E agree on 1/5. Its P2 reason now examines the actual conditional scope, rather than treating faithfulness to the occurrence alone as sufficient. The page explicitly distinguishes the wording score from the reliability or likelihood of the unvalidated half-of-jobs fraction and timetable. The original May 2025 clock remains anchored beside the claim.

The energy researcher retained the exact scored sentence and added the counterfactual meaning immediately in section A and beside the score in section E: extra emissions relative to comparable development without the extra demand, while national totals could still fall. Its brief's correction response, unchanged scope in JSON, and 1/5 calculation align. No new claim wording or score was substituted during calibration.

Creativity's separately requested legal-procedure clarification does not change the scored experimental capability claim or any checklist answer. Any later source correction that changes a score's evidential premise still requires recalculation. Qualitative evidence limitations remain the consistent proposed public treatment across the six pages; energy's optional internal gaps score is not a comparative six-topic rating.

## Preserved before-correction calculation


The saved claim-score.py calculator was rerun against each research/*-score.json file. These are the results **before requested corrections**:

| Topic | Exact scored claim | P answers / section | W answers / section | Calculated hype |
|---|---|---|---|---|
| Water | AI data-center growth threatens local water supplies in water-stressed U.S. communities. | Y/Y/Y → 1 | Y/Y → 1 | 1 — Grounded |
| Jobs | AI could eliminate half of US entry-level white-collar jobs within one to five years. | Y/Y/N → 3 | Y/Y → 1 | 2 — A little spicy; correction requested below |
| Energy and climate | AI’s growing electricity demand could increase U.S. carbon emissions by 2030. | Y/Y/Y → 1 | Y/Y → 1 | 1 — Grounded; nearby scope clarification requested |
| Creativity | Generative AI can reproduce copyrighted material from its training data. | Y/Y/Y → 1 | Y/Y → 1 | 1 — Grounded |
| Privacy | ChatGPT may use personal-account conversations to train its models, depending on your settings. | Y/Y/Y → 1 | Y/Y → 1 | 1 — Grounded |
| Existential risk | If anyone builds artificial superintelligence using techniques and understanding like those available in 2025, everyone on Earth will die. | Y/Y/N → 3 | Y/Y → 1 | 2 — A little spicy |

All six received records include exact claim, scope/time, source occurrence, reasons and source locators for all five hype answers. No hype check is NC or NA. Energy's optional evidence-gap record also recalculates correctly: T=1, S=1, C=3 → mean 1.667 → 2/5. The initial website should consistently use qualitative limitations across all six pages, rather than show a numeric gaps score only on energy.

## Resolved correction discussion: jobs (review trace)

The initial N was assigned to P3 for a numerical scenario unsupported by a calibrated employment model. The record itself accepts that “could” preserves uncertainty and that the displacement pathway is reasoned. Reinspection of [Amodei's January 2026 primary essay](https://darioamodei.com/essay/the-adolescence-of-technology), introductory uncertainty bullet and “Labor market disruption,” confirms a stated possibility, assumptions about capability/adoption, and an explicit discussion of diffusion. The introductory sentence says: “Nothing here is intended to communicate certainty or even likelihood.” The labor section repeats the half-jobs scenario and 1–5-year horizon.

**Recommendation sent and accepted: P3=Y, giving 1/5, unless a distinct, demonstrated misrepresentation is identified.** The initial rationale treated missing quantitative calibration as excess certainty even though the proposition does not assert probability or inevitability. Under the shared rubric, theoretical reasoning can support a conditional possibility. The exact percentage and horizon remain unvalidated as an employment forecast; explain that prominently in evidence limitations and the short answer. Passing the wording test does not endorse the scenario as likely or well estimated.

**Do not move the N mechanically to P2.** Fidelity to a public occurrence alone does not establish appropriate scope; however, a scope failure would require an identified unsupported inference, such as measured task exposure being represented as observed job replacement, or evidence from one occupation being asserted to establish a measured national effect. This is explicitly a conditional expert scenario. The lack of a validated national model, without a demonstrated extrapolation in what the claim asserts, remains a gap in the evidence.

The independent evidence reviewer separately inspected the primary essay and concurred with this concern. The coordinator returned it to the researcher, who explicitly accepted the correction before the record was changed. Preserve the original May 28, 2025 starting point for the 1–5-year clock; “within one to five years” must not silently reset on October 6, 2026 or on future page updates.

## Resolved clarification: energy (review trace)

The research record defines “increase” as additional emissions relative to otherwise similar development without the extra AI demand. The page's claim can instead be read as total national emissions rising over time. Its initial opening paraphrase repeated a total-emissions-rise framing; the counterfactual definition appeared only later in section C. The revised page resolves this as documented above.

Recommendation sent: move the counterfactual qualifier immediately next to the claim and score, or revise the exact wording consistently to **“AI’s growing electricity demand could add to U.S. carbon emissions by 2030.”** Identify it as the narrowed conditional proposition. This preserves the supported mechanism and avoids implying a national year-over-year prediction. No extra scored failure is warranted merely to force variety; clarify the intended proposition and recalculate any edited record.

The evidence source used only for public occurrence has an inaccessible underlying paper. That does not force NC if independently inspected LBNL/IEA/JLARC evidence suffices for the actual conditional proposition and paper-only forecasts remain excluded. The record explicitly follows that separation. The independent reviewer still verifies those dependencies.

## Consistency of the other conditional or capability claims

- **Water:** The selected claim explicitly narrows a public local-threat proposition and excludes universal shortages or national exhaustion. “Threatens” is interpreted as site-specific credible risk, with the location/cooling/supply conditions immediately explained. Do not score the unselected stronger headline instead. A risk can have a supported mechanism without a count of households deprived of water.
- **Creativity:** “Can reproduce” is a present capability statement. Selected extraction experiments can establish possibility without estimating everyday prevalence. The record separates output reproduction from training legality, licensing, style and creator-wide losses. Those uncertainties do not themselves defeat P1/P2/P3.
- **Privacy:** The named product, personal-account boundary, “may,” and settings condition retain the claim's modal force. Policy documents can establish the provider's stated practice without a second interview or an independent compliance audit. The page must continue to say these are company statements and avoid implying measured training-selection rates or universal safeguards.
- **Energy:** A conditional demand-to-fossil-electricity pathway is not the same as a quantified prediction of national emissions. All-data-center and global figures remain context, not substitutes for U.S. AI-only measurements.
- **Jobs:** A possible future scenario should receive the same distinction between hypothetical pathway and measured forecast as the other claims. Numerical detail merits scrutiny; its absence of calibration does not alone establish that the cautious wording misrepresents certainty.
- **Existential risk:** The claim preserves the authors' conditional premise and the 2025 methods anchor; it does not invent an unconditional prediction about today's consumer chatbots. Its consequent still asserts that everyone will die. Unlike the jobs claim's “could,” this claims inevitability once the technological condition holds, while the cited source set leaves further takeover-to-extinction and recovery assumptions unresolved. P3=N is the one relevant failure. Do not penalize the endpoint's severity again as W1 rhetoric or transfer the same global-outcome uncertainty to P2. P=3 and W=1 calculate to 2, which must never be read as a low disaster probability. The brief/JSON/page agree on this calculation; the independent reviewer checks the recent incident evidence and occurrence text separately.

Claims may be narrowed transparently for assessment. Here the draft research files name the public occurrence and disclose major exclusions. A score attaches only to that exact bounded proposition, not the full originating article, broader reader question, or all public rhetoric about the topic.

## Repeated scores, double counting, and remaining gates

Five claims score 1 after calibration. This is acceptable: the researchers selected defensible, qualified public propositions, and 1 means the assessed wording fits its evidential status. It does not mean harms are minor, evidence is complete, or the proposition is certain. These ordinal scores are not a comparative ranking of water, jobs, climate, creative rights, privacy and extinction risk.

The original jobs failure was counted once, not doubled across P2/P3/W1; its substantive appropriateness was the disputed point, resolved by the researcher’s accepted correction. The remaining records do not manufacture separate wording/agency failures from ordinary technology shorthand. Missing interviews, formatting and standalone hyperlinks do not incur penalties.

Scoring closure checks completed:

1. All six exact claims, meaningful qualifiers, occurrence boundaries and five-check records inspected.
2. Jobs researcher response accepted and verified across brief, JSON and page; no penalty transferred to P2.
3. Energy counterfactual qualification verified immediately beside claim and score; exact sentence and 1/5 unchanged.
4. All six revised scores recalculated with claims-us-1.0; no hype NC, NA or hidden manual overrides.
5. Existential risk's P3-only failure remains distinct from jobs' supported conditional possibility; harm is never the score.

Independent source-review closure is documented separately by the evidence reviewer. Human editorial review remains pending. Keep these review states separate in the final content, and reopen calibration if a subsequent substantive edit changes any scored proposition or evidence judgment.
