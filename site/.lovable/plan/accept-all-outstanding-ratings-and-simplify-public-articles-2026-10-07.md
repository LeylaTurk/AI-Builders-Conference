# Accept all outstanding ratings and simplify public articles

## 1. Mark every outstanding rating as reviewed
- Change all 94 `live` ratings and all 16 `pending` ratings to `approved` in the backend.
- Set the review time when the change is made, so all 110 are recorded as reviewed by Leyla.
- Leave the 8 ratings already approved unchanged.
- This intentionally approves the 16 ratings previously held back for quote-check concerns, as requested.

## 2. Remove public rating-status notes
- On feed cards, remove the entire small line that currently shows review status and “Partly checked: source not read”.
- On story pages, remove both the review-status line and the separate note explaining that the original source could not be opened.
- Keep the ratings, summary, findings, reason, source credits, article links, and all other page content unchanged.
- Keep the detailed source-check information visible inside `/admin`; only the public feed and story pages lose these notes.

## Verification
- Confirm the backend has 118 approved ratings and no `live` or `pending` ratings afterward.
- Check a feed card and a story page to confirm neither public status note remains and the surrounding article content is unchanged.

## Technical details
- Update the existing rating rows directly; no schema or access-rule changes are needed.
- Limit code edits to `src/components/StoryRating.tsx` and `src/routes/story.$id.tsx`.
