# Soft highlight behind rating words

## What changes

The rating word next to the chillies and flags ("Grounded", "Overheated", "Major"…) gets a soft tinted highlight behind it, matching the design's existing highlighter colours:

- Hype words: pale peach `#FCE3D7` (the hype highlight colour)
- Evidence gaps words: pale pink `#F7DCE2` (the evidence highlight colour)
- Style: `#16131F` bold text on the tint, ~4px rounded corners, small equal padding (about 0.05em / 0.3em) so the tint frames the word evenly.

The word text stays dark, so contrast stays well above 4.5:1. Icons keep carrying the meaning, so nothing relies on colour alone.

## Where it applies (public pages only)

All rating words are rendered in two shared components, so the change is small:

1. `src/components/RatingIcons.tsx` — `CardMeter`: the word on feed cards (home page).
2. `src/components/RatingDetail.tsx` — `BigMeter`: the large meters on the story page and on Rate an article results.

Unrated words ("Not rated yet", "Insufficient evidence to rate") keep their grey, unhighlighted look — no tint when there is no rating.

## Not changed

- The "Why this rating" boxes on story pages: their headings already sit on the same peach/pink panel colours, so a highlight there would be invisible — left as they are.
- /admin pages: keep the plain word + number display for review.
- Rating logic, prompt, scoring files, data: untouched.

## Verify

- Build log clean.
- Playwright: check a rated feed card and a rated story page at desktop and phone width — highlight visible, even padding, unrated words still grey; check a Rate an article result renders the same.
