You are coordinating a research and design workstream for Decoding the Hype, an existing AI-news website built in Lovable:
https://hype-decoder-shell.lovable.app/
The website already has a live newsfeed and an article-rating engine. We want to add a section explaining recurring claims about AI: what the claim means, what evidence supports or challenges it, and what concerned readers can do.
The audience is nontechnical adults in the United States. Use American English, US-relevant evidence and examples, and practical US resources. Clearly identify when evidence is global or comes from another country.
Complete the research, editorial review, design recommendation, and Lovable handoff. This workstream produces content and implementation instructions; it does not modify or publish the live website.
1. Create and coordinate the subagents
Use one dedicated research subagent for each of these six topics:
Subagent	Topic	Starting reader question
Water researcher	Water	Is AI draining our water supplies?
Jobs researcher	Jobs	Will AI replace my job?
Energy researcher	Energy and climate	How bad is AI for the environment?
Creativity researcher	Creativity	Is AI copying other people’s work?
Privacy researcher	Privacy	What happens to the information I give AI?
Existential-risk researcher	Existential risk	Will AI kill us all?
Also create:
* Scoring specialist: inspects the existing GitHub rating system and adapts it for recurring claims.
* Evidence reviewer and editor: independently checks citations, reasoning, US applicability, and scoring consistency across all six topics.
* Product designer: examines the existing website, recommends how to introduce the section, and writes the final Lovable implementation prompt.
You are the coordinator and final editor. Give each subagent a concrete assignment and its own output files. Run independent assignments concurrently where available; use batches when concurrency is limited. Do not omit topics because there are fewer available agent slots.
Start the scoring specialist and the designer’s site inspection first. Topic research can begin immediately, but researchers must receive the shared rubric before assigning final scores. After research, complete independent evidence review, corrections, cross-topic calibration, and the designer’s final handoff.
Do not invent subagent participation if delegation is unavailable; explain the limitation and complete the work sequentially.
2. Establish the existing rating system
Locate the project’s GitHub repository through the connected project, available GitHub access, or existing project references. Inspect the actual scoring instructions, prompts, definitions, and relevant code. Record the repository URL, file paths, and commit or version inspected.
If the repository cannot be identified, ask me once for its URL while continuing research and design work that does not depend on it.
The live site currently displays a 1–5 hype scale:
1. Grounded
2. A little spicy
3. Turning it up
4. Overheated
5. Off the charts
It also displays a separate evidence-gaps score. Verify these against the repository when possible. Do not infer the underlying calculation from the visible labels.
Create a short, shared rubric loosely based on the existing system, explaining which elements you retain and which require adaptation from article ratings to claim ratings.
If repository access remains unavailable, supply a clearly labeled provisional rubric using the visible scale. Do not claim that it reproduces the GitHub engine.
3. Turn each question into a claim
Each researcher must turn their question into a concise, declarative claim under examination.
Find actual examples of the claim in public discussion before settling its wording. Cite those examples. Preserve meaningful distinctions such as “could,” “will,” “already does,” and “always.” Do not manufacture an extreme claim merely to give it a high hype score.
For broad questions such as privacy, identify one recognizable central claim and explain its narrower components.
The claim should be understandable without technical knowledge and specific enough to assess. State its geographic scope and time horizon where relevant. Separate materially different versions rather than quietly moving between them.
Label it clearly as “The claim”, so visitors understand that displaying it does not mean the website endorses it.
Do not describe these as the “most common” claims unless you have evidence measuring their prevalence. “Recurring AI claims” is an acceptable editorial description.
4. Required research and website copy for every topic
Produce a research brief with an evidence table, plus concise website-ready copy using the same structure across topics:
A. The claim
A short declarative statement, with citations showing where this claim or a faithful version appears.
B. The short answer
Approximately 50–80 words explaining what a reader can reasonably conclude. Include citations for substantive factual statements. Make uncertainty understandable without making the answer evasive.
C. What does this claim actually mean?
Explain the mechanisms, definitions, scope, and assumptions in plain English. Break bundled claims into their important components.
This section must contain citations too. Explanations of how cooling, job automation, model training, data retention, or hypothetical loss of control work must be sourced.
D. What evidence do we actually have?
Present the strongest relevant evidence, including findings that support, limit, or challenge the claim. Clearly distinguish:
* Observed real-world outcomes.
* Controlled experiments.
* Models and projections.
* Surveys and expert judgments.
* Hypothetical scenarios or theoretical arguments.
For each major finding, state what it shows, what it does not establish, its date, and its relevance to US readers. Identify important disagreements and gaps without giving weak evidence equal weight merely for balance.
E. Hype score and explanation
Assign a proposed 1–5 hype score using the shared rubric. State the exact claim being scored and explain the result in two or three sentences tied to cited evidence.
Keep the hype score, evidence limitations, and potential seriousness of harm conceptually separate.
F. What can you do if you are still concerned?
Provide three to five realistic, proportionate actions for a US reader. Where useful, distinguish individual choices, workplace or community actions, and ways to participate in public decisions.
Link to specific, current resources. Explain what an action can reasonably accomplish and any important limits. Do not imply that individual behavior can eliminate a structural or global risk.
Avoid vague instructions such as “do your research,” unsupported product recommendations, and guaranteed protection or employment outcomes.
G. Sources and review information
Include sources, publication dates, the research cutoff date, and an accurate review status. Distinguish AI research review from human editorial review. Never label material “Reviewed by Leyla” unless I have actually reviewed it.
Aim for roughly 400–650 words of website copy per topic, excluding references. Keep deeper detail in the research brief.
5. Topic-specific research requirements
Water
Distinguish AI from data centers overall; water withdrawal from water consumption; direct cooling from indirect electricity-related water use; and national totals from local watershed impacts. Check location, season, cooling method, water source, and assumptions behind per-query estimates. Investigate relevant US utility, permitting, or public-information resources for concerned residents.
Jobs
Distinguish tasks from occupations, technical exposure from adoption, forecasts from observed employment changes, and layoffs attributed to AI from demonstrated causation. Examine US evidence on hiring, wages, job quality, and entry-level work where available. Avoid predicting an individual reader’s job prospects from occupation-wide exposure alone. Ground practical advice in credible US workforce resources.
Energy and climate
Distinguish AI-specific demand from all data-center demand, electricity use from emissions, and current measurements from forecasts. Examine electricity supply, geographic differences, efficiency, and the assumptions behind claimed environmental benefits. Coordinate definitions and sources with the water researcher while keeping the two pages distinct.
Creativity
Distinguish training on creative work, memorization, reproducing material in outputs, stylistic imitation, licensing, and economic effects on creators. Separate ethical arguments from legal findings. Use current US legal sources; identify jurisdiction, date, and whether a statement concerns an allegation, interim ruling, final decision, or unresolved question. Do not present one case as settling every use of generative AI.
Privacy
Distinguish consumer chatbots from business or enterprise products, model training from retention, optional settings from defaults, and provider access from public disclosure. Check current official policies for any named service and date the findings. Explain US federal and state differences where relevant; do not imply a universal right or setting exists. Make practical advice specific and verifiable.
Existential risk
Define human extinction, catastrophic harm, malicious human use, and loss of control separately. Examine observed capabilities, experimental conditions, assumptions connecting capabilities to catastrophe, and disagreements about likelihood and timing.
My starting view is skeptical of media hype based on hypothetical scenarios. Treat that as a viewpoint to investigate, not a conclusion to prove. Test sweeping dismissals with the same rigor as sweeping predictions.
Do not treat “hypothetical” as automatically false, or a laboratory result as proof of an eventual catastrophe. Label expert probability estimates as judgments with assumptions, not measured frequencies. Practical actions should support informed participation without overstating individual control.
6. Citation and evidence standards
Use current browsing and inspect the actual sources. Prioritize original research, official datasets, national laboratories, government agencies, court documents, official service policies, and authoritative research syntheses.
Use journalism to establish public claims and context; follow technical claims back to their underlying evidence whenever possible. Distinguish company self-reporting from independent verification.
Both the claim breakdown and the evidence assessment require inline citations, as do factual assertions behind practical advice. A reference list alone is insufficient.
For each topic, maintain an evidence table containing:
* The exact factual assertion.
* Its supporting source and direct URL.
* Publication date and relevant data period.
* Geography and population or system studied.
* Evidence type and limitations.
* Page, section, table, or passage supporting the assertion.
* Whether the source supports, challenges, or qualifies the claim.
Use descriptive links or stable numbered references. Open and verify links. Do not cite search snippets as evidence, fabricate citations, or treat several reports of the same underlying study as independent findings.
Use enough strong sources to cover the claim; do not pad the bibliography to meet a quota. If a source cannot be inspected, state that limitation and avoid relying on it for a strong conclusion.
7. Scoring safeguards and independent review
The hype score evaluates how the wording and certainty of a claim compare with the evidence. It is not a probability of disaster, a measure of personal safety, or a general rating of the topic.
A serious risk can be described accurately. A hypothetical scenario can be responsibly presented. A reassuring claim can also be exaggerated.
Do not automatically increase hype because an outcome is uncertain, a source discusses a future risk, or an expert-authored explanation lacks a second quoted expert. Do not average together unrelated claims.
The evidence reviewer must independently inspect support for the central claim, key numbers, major qualifications, practical resources, and scoring rationale. Check for citation mismatches, misleading extrapolations, stale policies, and US/global confusion.
Return problems to the relevant researcher, verify corrections, and calibrate all six scores against the same standard. If a claim is too broad to score defensibly, narrow it transparently or mark it as not yet assessable.
8. Designer assignment and Lovable handoff
Inspect the live homepage and at least one story page on desktop and mobile where possible:
https://hype-decoder-shell.lovable.app/
Work with the existing visual identity: purple, pale lavender, yellow accents, serif headlines, rounded cards, and pepper-based hype indicators. Verify the current design instead of assuming these observations remain complete.
Recommend one feasible design for adding this material as a new section alongside the newsfeed. Decide:
* The section name and introduction.
* Its placement and navigation.
* How six topic cards appear on desktop and mobile.
* Which information is immediately visible.
* How readers open the detailed claim, evidence, and action sections.
* How citations, uncertainty, review dates, and score explanations appear.
* How topic pages connect to relevant existing stories.
* How the layout behaves when no related stories are available.
Make the claim-under-examination label unambiguous. Display important qualifications near the claim and score. Support keyboard navigation, readable contrast, descriptive links, and text labels alongside icons.
Keep the initial implementation manageable for a solo Lovable builder. Avoid adding accounts, subscriptions, chatbots, or a complex publishing system unless essential to this section.
Produce a concrete wireframe or annotated layout specification, then a complete, copy-ready prompt addressed to Lovable. It must include:
* The chosen layout, navigation, and responsive behavior.
* The exact finalized copy and scores for all six topics, with their citations.
* Clearly structured content fields and source links.
* Integration instructions that preserve the working feed and rating engine.
* Accurate review-status and update-date behavior.
* Related-story behavior grounded in actual available content.
* Acceptance checks for all six topics, mobile usability, citation links, and existing-feed functionality.
Lovable will not have this conversation or local Codex files. Make the handoff self-contained, or provide a clearly identified content attachment with exact instructions for supplying it. Do not leave the factual content for Lovable to invent or independently rewrite.
9. Final deliverables
Save the work under workstreams/ai-claims-us/ as clearly named Markdown files, with any structured content in JSON if useful.
Deliver:
1. Six research briefs and six concise website-ready explainers.
2. The shared scoring rubric and its relationship to the inspected GitHub system.
3. The evidence-review report, corrections, and remaining limitations.
4. The design recommendation and wireframe or annotated layout.
5. The final Lovable prompt and any required content attachment.
6. A short decision summary listing the six final claims, proposed scores, and unresolved issues.
Continue through research, review, revisions, and final handoff. Make routine editorial and design decisions autonomously. Ask only for information that materially blocks progress, and continue independent work while waiting.

GitHub reference and scoring instructions
The confirmed repository is LeylaTurk/AI-Builders-Conference.
The scoring specialist must read:
* engine/rating-prompt.md — checklist definitions and editorial rules.
* engine/scoring.ts — calculation rules.
* engine/rating-schema.json — structured answers and supporting evidence.
* master-project-brief.md — project context, subject to the newer instructions in this workstream.
These files were verified on October 6, 2026, at commit dc88b53d7750ad5c39403428815ff82b7d575b74. Check the current default branch and record the version actually used.
The existing engine separates:
* Hype: headline framing, claims in proportion, and wording.
* Evidence gaps: transparency, strength of evidence, and context.
It uses checklist answers of met, not met, not applicable, and not checked. Code calculates the scores rather than letting the model choose an unexplained number.
Adapt this approach for the six recurring claims. Produce a documented, repeatable scoring method and share it with every topic researcher before final scoring.
Explain which article-specific checks transfer, which need modification, and which do not apply. A claim assessed against several sources is different from an individual article assessed against its main source.
Score the exact public claim under examination. Do not accidentally score the quality of our own newly written explainer, or penalize a standalone claim merely because it lacks an article’s interviews or formatting.
Preserve the existing distinction that low hype does not mean low risk. Support each scoring judgment with evidence, handle insufficient information explicitly, and have the evidence reviewer check consistency across all six topics.
All other research, US-audience, citation, subagent, design, and Lovable-deliverable requirements in the workstream prompt remain in effect.
