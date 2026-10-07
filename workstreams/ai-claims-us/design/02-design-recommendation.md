# Design recommendation: AI claims explained

> **Update, October 6, 2026 (Leyla's review):** each page now leads with a loud headline claim someone actually published (scored 4/5 under the new loud-claim rule; existential risk 5/5 under the certain-doom rule added October 7; creativity rescored 3/5 on October 7), with the careful version below; headlines are statements, not questions, and nuance moves into tap-to-open interactive layers (key word, claim dial, fine print, quiz, privacy picker). The headline, score, score reason and key qualification stay visible without tapping. Labels match the feed: “AI rating, not yet reviewed”. See [the review](../review/leyla-review-2026-10-06.md) and section 5b of the [Lovable prompt](../handoff/lovable-prompt.md), which override the matching rules below.

Status: final design decisions for the completed handoff. Use the finalized `claims-content.json` attachment with `lovable-prompt.md`; this specification does not authorize changing or publishing the live website.

## One small extension to the current product

Add **AI claims explained** at `/claims`, alongside **Feed** at `/`. Add six detail pages: `/claims/water`, `/claims/jobs`, `/claims/energy-climate`, `/claims/creativity`, `/claims/privacy`, and `/claims/existential-risk`. Keep the feed home route and current article routes. This makes durable background reading findable without mixing recurring-claim scores into article ratings.

Use the existing dark purple header, yellow active-navigation treatment, pale lavender background, Fraunces headlines, Public Sans body text, white rounded cards, and pepper icons. Reuse existing style tokens/components wherever practical. Do not introduce a second logo, illustrations, search, topic filtering, accounts, subscriptions, chatbot, or publishing system for six entries.

Exact landing introduction:

> Six recurring claims about AI, explained for readers in the United States. See what each claim means, what the evidence can tell us, and what you can do if you are concerned.

Exact score note on the landing page and on each detail page:

> Hype scores assess the wording of a claim against the evidence. They do not measure how serious or likely a harm is.

## Entry points and navigation

Header: logo links to `/`; two real links, **Feed** and **AI claims explained**, with `aria-current="page"` on the active section. At mobile width put the logo on row one and the two links on row two; avoid a hamburger menu for two destinations. Each link has a minimum 44px target and visible keyboard focus.

On the feed, add one compact lavender/white bordered invitation below the existing “Feed checked” timestamp, before the current story list. Its title is **Concerned about a recurring AI claim?**, body **Explore the evidence on water, jobs, climate, creativity, privacy, and existential risk.**, and link **Explore AI claims** to `/claims`. Keep it short enough that the feed remains prominent. Do not insert six cards above the newsfeed or change its querying, sorting, rating or refresh behavior.

Detail pages begin with a breadcrumb **AI claims explained / [Topic]**. End with **Explore all AI claims** and **Back to the feed**. Use normal links and browser navigation, not a modal. Update route titles to `[Topic]: AI claims explained — Decoding the Hype`. Six static local content records and a shared page component are sufficient.

## Landing cards

Use a two-column grid on desktop at 768px and up, one column below 768px, with 20–24px gaps. Keep the existing roughly 856px content width; two cards give long claims readable line lengths. Do not squeeze three columns into this column. Order: Water, Jobs, Energy and climate, Creativity, Privacy, Existential risk.

Every white card shows, in order:

1. Topic name in a serif heading, linked to the detail page.
2. Small bold text **The claim** followed by the exact finalized declarative claim. Quotation styling may help, but the label remains visible; never turn the claim into an unlabeled endorsement.
3. The exact short scope/qualification from the content attachment, close to the claim.
4. Pepper row plus text **Proposed claim hype: [label] [n]/5**, or the explicitly supplied unassessed state. Use “Proposed” while human editorial approval is pending. All peppers are decorative to assistive technology; the text is the accessible value.
5. **Read the evidence and actions** as a descriptive link whose accessible name includes the topic. The entire card must not be a button with nested links. A conventional linked heading plus the one text link is acceptable.

Do not truncate claims with ellipses or hide qualifiers in hover text. Do not squeeze the full 50–80-word short answer into cards. Put a truthful shared status below the intro and per-topic “Research checked through [date]” on each card if cutoff dates differ. No ratings inferred from an empty field; no “0/5.”

## Detail-page reading order

Keep a single reading column, maximum approximately 728px, with 20px mobile gutters. A page is regular scrolling text with sections and anchor links, plus the interactive layers named in the update note; it does not need tabs, a sticky side panel or a drawer. That keeps citations and caveats visible and makes browser Find and keyboard navigation work.

1. Topic eyebrow, headline statement as h1; metadata line with US/global scope, research cutoff and accurate review state.
2. White **The claim** panel: exact claim, its public-example citation(s), explicit scope/time horizon, and the key qualifier. Show the proposed hype score with the two- or three-sentence cited rationale immediately here. Below it show separate qualitative **Evidence limitations** from the final rubric/content. Never imply the hype score is a risk gauge. The finalized package uses qualitative evidence limitations consistently across all six topics, with null numeric evidence-gap fields. Render no numeric evidence-gap score in this release, including any diagnostic number in internal scoring material; never inherit it from the article engine. Include the score note and **How these scores work** anchor. An applicable unchecked hype item means **Not yet assessable**, without peppers or a number; an applicable unchecked evidence item means **Partly checked**, with the missing information and no numeric evidence-gap score.
3. **The short answer** (all 50–80 words, with supplied inline citations), fully visible.
4. Compact **On this page** anchor list: Meaning · Evidence · Actions · Sources and review. Use wrapping text links; no horizontally scrolling tabs.
5. **What does this claim actually mean?**: ordinary paragraphs and any supplied bullets, retaining citations.
6. **What evidence do we actually have?**: paragraphs/list items retaining supplied evidence-type labels, dates, geography, strengths and limits. Use restrained bold labels such as “Observed outcomes” or “Projection,” not colored badges that imply certainty rankings. Do not flatten an evidence table into an unlabeled list; a table in the attachment must retain its semantic relationships or be deliberately converted to labeled mobile cards.
7. **What can you do if you are still concerned?**: three to five numbered actions, each with its link and practical limit. Keep optional individual/workplace/community labels in text. No checkbox tracking or promises of safety.
8. **How these scores work**: compact shared methodology plus a native disclosure containing the complete detailed checklist. Detailed scoring may be collapsed, but never the claim, qualifier, score rationale, short answer or key evidence limitation. Show the exact claim being scored. It is separate from the feed's article ratings.
9. **Sources and review**: reference list with descriptive titles, publisher, publication date where known, supplied direct links, research cutoff, review status and any remaining limitation. Use anchor backlinks if numbered citations are supplied.
10. **Related stories from the feed** followed by back links. This is context, not additional evidence for the explainer.

## Review status and dates

Use explicit data fields, never `new Date()` as content metadata. At delivery, the default is **AI evidence review completed; human editorial review pending** only after the coordinator confirms the independent AI review is complete. Before then the state is **Draft — AI evidence review in progress**. Use per-topic review state if one remains incomplete. A human-review field stays null until a human actually reviews it; do not copy “Reviewed by Leyla” from story cards.

Display **Research checked through October 6, 2026** only for topics verified to that cutoff. Store ISO dates in data and format in American English. A deployment/rebuild does not update research, evidence review, or human review dates. Edit dates and research cutoff are separate; future changes must be deliberate edits, not background rescores. Preserve dates for source policies/court findings inside the copy.

## Related stories and empty states

Use the small hand-curated mapping in `related-stories.json` as launch candidates. Resolve IDs through the existing public article read path. Display only records successfully returned; use their live title, publisher, publication date and existing article-rating component when readily reusable. Do not duplicate the article rating into claim fields or rescore anything. Include the supplied context label. Show up to two matching stories; the launch mapping has at most one per topic. These records were actually inspected on October 6, 2026. The final selection intentionally excludes the inspected French literary-prize story because it does not closely address the finalized copying claim.

Show a quiet label above any rating included here: **Article rating — separate from the claim score**. Below the section heading, state **Reporting and commentary on this topic; these stories are not the evidence base for this explainer.** The Australia country label is required. Both Jobs and Creativity begin empty; the inspected French literary-prize story is excluded from the launch selection.

When no mapped article is available, show **No related stories are available here yet. You can still read the sources above or browse the feed.** Link “browse the feed” to `/`. Missing/unpublished/deleted articles must not create broken cards, silently match unrelated “AI” headlines, or block the explainer. A fetch failure may say **Related stories could not load. Browse the feed.** Claims and citations load independently from the feed.

## Accessibility and acceptance targets

- Use one h1, ordered h2/h3 sections, semantic navigation/main/article, lists, links and `time` elements. Add a visible-on-focus skip link to main content.
- Body text at least 16px, line height around 1.6; 65–75-character reading measure; mobile h1 about 30px as observed. Do not shrink citations/qualifiers below a comfortable 14px.
- Verify WCAG AA contrast: ordinary text 4.5:1, large text 3:1, focus/UI indicators 3:1. Reuse purple/yellow tokens only after contrast checks; yellow is an accent background, not small text on white. Ensure active navigation stays readable in focus/hover states.
- Links are underlined within body copy and citations. Avoid “click here,” title-only tooltips, hover-only caveats, color-only scores, and icon-only links.
- Keyboard focus remains visible and follows visual order. Anchor targets use `scroll-margin-top`; route changes put focus on the page h1 without trapping focus. External links may remain in the same tab; if new tabs are used, signal it consistently.
- At 320px, 390px, 768px, and 1280px no horizontal overflow or clipping. Claims, dates, scale labels, citations and related-story titles wrap. At 200% zoom no essential content disappears. Test the two-link mobile header for wrapping.
- Source links use the final attachment verbatim. Do not invent sources, fetch replacement research, summarize away caveats, create unsupported certainty badges, or turn global evidence into US evidence.
- Routes work on direct load/refresh and browser Back. The existing homepage, original-source links, article detail routes, feed refresh, partial-check labels and article-rating engine behave as before.

## Content contract for the final handoff

The final Lovable prompt requires exactly one uploaded attachment, `claims-content.json`, in the same Lovable message. Its six topic records supply `slug`, `route`, `topic`, `readerQuestion`, `claim`, `claimExampleCitations`, `scope`, `timeHorizon`, `keyQualification`, seven A–G Markdown section fields, `hype` (computed level/label and checklist), qualitative `evidenceGaps`, `sourceLinks`, `researchCutoff`, `aiEvidenceReview`, `humanEditorialReview`, `reviewStatusText`, `remainingLimitations`, and `relatedStoryCandidates`. `websiteCopyMarkdown` duplicates the exact source copy for integrity checking, not for a second on-page rendering.

Render the supplied Markdown sections once each and preserve inline links. Claims, qualifications, score rationales and source references must not be re-authored by Lovable. All six records must be present before final acceptance. The final handoff defines the exact field mapping and interface copy. Do not expose internal repository audit text, hashes or assembly details in the product. Five claims score 1/5 — Grounded; the existential-risk claim scores 2/5 — A little spicy. These are proposed claim scores, not harm ratings.
