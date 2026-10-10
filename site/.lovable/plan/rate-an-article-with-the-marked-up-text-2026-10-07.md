# "Rate an article" with the marked-up text

Unchanged: rating prompt, answer format, scores and scoring files, the daily limits (10 a day overall, 3 per visitor), and the privacy rules. The pasted text stays in the visitor's browser for the markup and is never stored or sent back from the server.

## 1. Rename
- "Rate an article" in the menu, page title and meta. Page heading: "Rate an article or post".
- Page moves to /rate; /check redirects to /rate.
- Story page "Have another article?" button now goes to /rate. (There are no Highlights pages yet, so that button is skipped.)
- Submit button "Rate it"; result heading "Your rating"; "[n] ratings left today"; the used-up message stays as written.
- /admin's own "Check an article" form heading is left alone (admin is out of scope).

## 2. Result layout
1. Label "Private · not saved · AI rating, not reviewed".
2. Top box like the story page: left "Summary" and "Our findings" (the AI's summary and reason); right, Hype meter above Evidence gaps meter, always shown with icons, word and number.
3. "Your text, marked up".
4. "What's missing" (hidden when empty).
5. "Next time you read a story like this", the same tip box and tips as the story page.
- Removed: "What we found" finding cards and the Breakdown box.
- "Insufficient evidence to rate" message kept.

## 3. Your text, marked up
- Headline, deck (if any) and every paragraph in Source Serif 4, with small grey paragraph numbers in the left margin. Posts show the paragraphs only.
- Each finding with a verified quote is located in the headline, deck or the paragraph it names (exact words), and highlighted:
  - Hype: #FCE3D7 background, #EB6834 underline.
  - Evidence gaps: #F7DCE2 background, #B3123A underline.
  - Good practice (Y checks with a quote): #D6F2E6 background, #1BAF7A underline.
  - Underline style by section: Headline solid, Claims in proportion wavy, Wording dotted, Transparency double, Strength of evidence dashed, Context solid.
- Overlapping or identical quotes merge into one highlight carrying all their notes.
- Margin notes (900px and wider): text column ~640px, notes column ~300px, each note level with its paragraph, stacked in reading order. A note: coloured pill with chilli / flag / tick icon and the problem name from your list (or "Good practice: [short name]"), then the finding's reason.
- Highlights are real buttons, tabbable in reading order. Clicking a highlight outlines it and its notes; clicking a note outlines its highlight.
- Under 900px: no margin column; each note sits in a small box right under its paragraph with a coloured left border.
- A quote that can't be found leaves the text unmarked and its note goes to "What's missing".

## 4. What's missing
- Box after the text: failed checks with no quote or a quote not found, each with its problem name and one sentence.

## Check after building
- Paste the Microsoft "AI super factory" story: headline highlighted in orange with notes beside it; paragraph 9's water quote is one highlight with stacked notes; "No independent confirmation" under "What's missing". I need the test text: please paste the contents of test-microsoft-story.md, or I'll use the stored Microsoft/WSB-TV story text for the test only, inside the sandbox.
- Phone width: notes move under their paragraphs.
- /check lands on /rate.
- One rating used up by each test (out of today's 10).

## Technical details
- `src/routes/rate.tsx` (moved from check.tsx); `src/routes/check.tsx` becomes a `beforeLoad` redirect to /rate. SiteHeader and story CTA updated.
- `check.functions.ts` result adds `marks`: every check with answer N or (Y with a verified quote), with code, family, section, verified quote, paragraph, reason. Pasted text never comes back from the server; the browser already has it.
- Tip selection (`pickTips` + TIPS text) moves from public.functions.ts into a shared `src/lib/tips.ts`, used by both the story page and /rate.
- New `src/components/MarkedText.tsx`: client-side exact-match location per block (headline / deck / paragraph n, falling back to searching all blocks), range merging, highlight buttons, notes column with per-paragraph grid rows, mobile inline notes, active-state outlines. Problem names in a `PROBLEM_NAMES` map; good-practice names from CHECK_NAMES.
