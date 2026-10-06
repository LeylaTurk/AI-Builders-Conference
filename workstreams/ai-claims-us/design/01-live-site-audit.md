# Live-site inspection

Designer inspection: October 6, 2026. Read-only inspection in the Codex browser, using both the rendered page and its accessibility tree. No live site or repository modification, publishing, account access, or rating changes.

## Pages and viewports actually inspected

| Page | Viewport / inspection | Result |
| --- | --- | --- |
| [Homepage](https://hype-decoder-shell.lovable.app/) | Desktop, 1280 × 720 screenshot and full accessibility tree; mobile, explicit 390 × 844 viewport screenshot and tree | Live feed rendered. Header has logo and one navigation item, Feed. A single column of story cards is visible on both sizes. |
| [Microsoft datacenter story](https://hype-decoder-shell.lovable.app/story/dcf19ba9-804b-4919-8bf2-950f0d29c7d6) | Desktop 1280 × 720 and mobile 390 × 844, screenshots and trees | Actual detail route rendered, with publisher/date, headline, original-source link, rating card, explanation, summary, review label. |
| [Australia chatbot-privacy story](https://hype-decoder-shell.lovable.app/story/3ab33723-4d75-430a-aa22-ce61606ff8b7) | Mobile 390 × 844, destination accessibility tree | Actual detail route and publisher/date/source link rendered. Australia context is explicit. |
| [WarGames AI-control story](https://hype-decoder-shell.lovable.app/story/0cbb21e6-cf82-437f-94d1-d7ed6d6bb1a5) | Mobile 390 × 844, destination accessibility tree | Actual detail route rendered. A commentary about control, specification and safeguards, not direct evidence of extinction. |
| [French literary-prize story](https://hype-decoder-shell.lovable.app/story/db415410-d65f-4c92-9ab4-1371b15d750d) | Mobile 390 × 844, destination accessibility tree | Actual detail route rendered. French authorship/AI-accusation context, not a US legal finding. |

The explicit mobile viewport override was reset and the temporary inspection tab closed after inspection. Mobile means a responsive viewport, not physical-device testing.

## Verified visual identity and interaction

- Dark purple header with a subtle dot texture and an irregular lower edge. The white serif logo contains a yellow rectangle behind “Hype.” Feed has a yellow active pill in the desktop homepage view.
- Pale lavender page background, white rounded story/rating cards, fine neutral borders, purple story links, dark text. Cards use generous padding and roughly 16-pixel corners. No hero photographs or topic imagery appear in the inspected feed.
- Rendered CSS read from the story page: body background `rgb(246, 243, 255)` / `#F6F3FF`; body font `Public Sans, system-ui, sans-serif`; headline font `Fraunces, Georgia, serif`; headline text `rgb(22, 19, 31)` / `#16131F`; mobile story headline 30px. Reuse existing tokens in implementation instead of replacing fonts or recreating approximations.
- Desktop homepage content spans approximately 856px centered within a 1280px viewport. Story details use a narrower approximately 728px reading column. Mobile content uses approximately 20px side gutters.
- The feed card contains uppercase publisher, linked serif headline, pepper-based Hype scale, a separate flag-based Evidence gaps scale, explanation, and rating/review metadata; unrated stories say “Not rated yet.” Some show “PARTLY CHECKED: SOURCE NOT READ.”
- The detail page is spare: publisher/date, h1, “Read original,” then one white card for scores, explanation, story summary and review status. Only Feed is in the header navigation. No related-story block was visible on the inspected detail page.
- Mobile cards stack and text wraps. On the inspected datacenter story, evidence-gap icons and their text label wrap onto separate lines. The Lovable badge overlays a small lower-right area; do not place a new essential control there.
- Existing feed review labels vary between “AI rating, not yet reviewed” and “Reviewed by Leyla · Rated …”. These describe existing stories only and must not be inherited by new explainers.

## Actual related content available at inspection

These are site records, not independent verification of the news or underlying studies. An explainer's evidence citations must come from the reviewed research attachment, not these feed summaries. Article ratings remain article ratings.

| Topic | Existing story and verified date | Intended treatment |
| --- | --- | --- |
| Water; Energy and climate | WSB-TV, November 13, 2025: [Microsoft reveals new datacenter for Atlanta, will be world’s first ‘AI super factory’](https://hype-decoder-shell.lovable.app/story/dcf19ba9-804b-4919-8bf2-950f0d29c7d6). Source link: [WSB-TV](https://www.wsbtv.com/news/local/atlanta/microsoft-reveals-new-datacenter-atlanta-be-help-create-worlds-1st-ai-superfactory/NPLE2ASPKJG2FEC6BNF7CYFXDY/). | Relevant company-claim coverage of cooling/infrastructure; do not turn its “almost zero water” claim or article score into our claim conclusion. |
| Privacy | The Conversation, October 1, 2026: [Australia’s proposed laws could help regulate privacy risks from chatbots – if we get the details right](https://hype-decoder-shell.lovable.app/story/3ab33723-4d75-430a-aa22-ce61606ff8b7). | Label “Australia · international context” next to the link. It is not US law or a practical US rights resource. |
| Existential risk | The Conversation, September 29, 2026: [The ‘WarGames’ problem: Computer science has long understood what it takes to keep AI under control](https://hype-decoder-shell.lovable.app/story/0cbb21e6-cf82-437f-94d1-d7ed6d6bb1a5). | Label “Commentary · AI control.” Related public debate, not evidence that catastrophe is inevitable or impossible. |
| Creativity | The Conversation, September 28, 2026: [A bestselling novel was pulled from a French literary prize after AI accusations – what next?](https://hype-decoder-shell.lovable.app/story/db415410-d65f-4c92-9ab4-1371b15d750d). | Label “France · authorship debate.” A peripheral contextual story; do not imply that accusations or AI detection establish copying, or that this settles US copyright law. |
| Jobs | No direct job-displacement or labor-market story was found in the 25 feed cards inspected. “Want to use AI to improve your work? Have it disagree with you” was visible but does not directly address job displacement. | Launch with an empty-state message rather than force a weak match. |

## Limits and implementation implications

This was visual/interaction inspection of public rendered pages. It was not a source-code audit, a complete accessibility audit, verification of original articles, a physical-device test, or a guarantee that these feed records will remain available. The feed said “Feed checked: 6 Oct 2026, 12:00 UTC.” It may update after this inspection. Current story IDs must be resolved through the existing read path at implementation and missing IDs omitted.

Do not infer scoring calculations from visible peppers or flags. The separate scoring specialist owns the repository audit and claim-rubric adaptation. Preserve the current article engine and feed behavior.
