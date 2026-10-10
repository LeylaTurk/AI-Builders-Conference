# Raise today's breakdown limits for testing

## What changes

- Raise the daily breakdown caps in the settings row so testing isn't cut off:
  - Total per day (all visitors): 50 → 500
  - Per visitor per day: 5 → 50
- No code changes — the /decode page reads these numbers from settings, so they take effect immediately in the preview and on the live site.
- Nothing else changes: ratings, feeds, story pages and the 8/day feed-rating cap stay as they are.

## After testing

- When you're done testing, tell me and I'll set the limits back to 50 total / 5 per visitor (or whatever numbers you'd like).

## Technical details

- Update the single row in the `settings` table: `decode_global_cap` and `decode_visitor_cap`.
- `src/lib/check.functions.ts` reads both values at request time, so the new caps apply to the very next breakdown with no publish needed.
