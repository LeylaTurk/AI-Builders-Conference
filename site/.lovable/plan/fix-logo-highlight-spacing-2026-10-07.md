# Fix logo highlight spacing

## Current state (confirmed)
- `src/components/SiteHeader.tsx` line 10-15: the "Hype" span uses `px-[0.16em] pt-[0.04em] pb-[0.14em]`, rotate(-2deg), origin bottom-left.
- The 0.16em left padding is what places the yellow close to the preceding word "the".
- Left/right padding is already equal in CSS (px-*), so the sides are symmetric; increasing both sides equally keeps that symmetry.

## Change
In `src/components/SiteHeader.tsx` only:

- Increase the horizontal padding on the "Hype" highlight from `px-[0.16em]` to `px-[0.26em]`.
- This moves the yellow box further from "the" and adds the same extra yellow to the left of the "H" and the right of the "e".
- Keep everything else untouched: the -2deg tilt, bottom-left transform origin, baseline alignment, `pt-[0.04em] pb-[0.14em]` (extra yellow below the y/p descenders), #FFE34D colour and 4px rounded corners.

## Verification
- Playwright screenshot of the header at desktop and phone widths: confirm the box clears "the" and the yellow margins look even either side of the word; header text contrast unchanged.
