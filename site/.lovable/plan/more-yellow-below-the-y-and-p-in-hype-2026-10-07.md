# More yellow below the "y" and "p" in "Hype"

## Change

In `src/components/SiteHeader.tsx`, replace the equal vertical padding on the yellow
"Hype" highlight span (`py-[0.04em]`) with asymmetric padding:

- Keep top padding at 0.04em (so the box still frames the capital H and the small letters the same as now).
- Increase bottom padding to about 0.14em, so the yellow extends clearly below the descenders of "y" and "p".

Because the span is `align-baseline`, the extra yellow hangs below the text line without
moving "Hype" off the shared baseline with "Decoding the". The -2deg tilt, yellow
#FFE34D, dark text and 4px rounded corners stay as they are. No other part of the
header or any page changes.

## Verification

- Playwright screenshot of the header (desktop and phone width) to confirm the yellow
  visibly covers the descenders of "y" and "p" and the baseline alignment is unchanged.
- Check build log is clean.
