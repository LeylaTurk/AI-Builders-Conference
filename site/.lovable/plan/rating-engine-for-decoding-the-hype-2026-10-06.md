# Rating engine for Decoding the Hype

Uses the existing rules in src/lib/rating/ unchanged (prompt, schema, scoring).

## 1. Database
- **articles**: headline, deck, outlet, url, published date, source type, paragraphs (text list), links (list of text + address), main source text (optional), created at.
- **ratings**: article, version number, model, raw Claude answers, checks after source rules, overrides, hype level + sections, evidence gaps level + sections, headline rule / safety rule applied, partly checked, claim type, summary, reason, other observations, quote check results, input/output tokens, status (pending / approved / rejected), created at.
- **settings**: one row holding the daily cap (starts at 20).
- **admin role** table, with leylaamur@gmail.com as the only admin.
- Public can read only approved ratings and their articles. No public writes; all writes happen in server functions after checking the admin role.

## 2. rateArticle (server function, admin only)
- Loads the article, numbers paragraphs [1], [2]..., builds the message in the prompt's order: source type (never outlet name), headline, deck, numbered paragraphs, links, then main source text or "Main source text is not available."
- Calls Anthropic directly with ANTHROPIC_API_KEY, model claude-sonnet-5-5, system = RATING_PROMPT with prompt caching, one forced tool whose input schema is RATING_SCHEMA, 8000 output tokens.
- Runs applySourceRules (with Claude's source status), rateHype, rateGaps, verifyQuote on every quote, partlyChecked; saves a new pending rating with the next version number.
- Refuses with a clear message once today's (UTC) ratings reach the cap.

## 3. Admin page /admin
- Magic-link sign-in, only for leylaamur@gmail.com (other emails rejected; no sign-up).
- Form: headline, deck, outlet, url, published date, source type (4 choices), article text (blank-line paragraphs), links (`text | address` per line), main source text. Save creates the article and runs the rating.
- Result view: both ratings with word and level, each section's level, all 21 checks (answer, quote, paragraph, reason, quote found yes/no), overrides, token counts.
- List of recent ratings with Approve and Reject buttons.

## 4. Public pages
- **/story/$id**: headline, outlet, date, "Read original", summary, reason, Hype chillies (Grounded / A little spicy / Turning it up / Overheated / Off the charts), Evidence gaps flags (None / Minor / Some / Major / Unsupported) in level colours, always with word + number. Shows "Insufficient evidence to rate", "Not rated yet", "Partly checked: source not read" when they apply. Only verified quotes are ever shown.
- **Home**: list of approved stories (headline, chillies, flags, reason), or "Rated stories coming soon." if none. "Check connection" button stays.
- Night edition design rules applied throughout.

## Technical details
- Server functions in src/lib/*.functions.ts using requireSupabaseAuth + has_role check; admin client loaded inside handlers.
- Public reads via a server publishable client with anon SELECT policies limited to approved rows.
- Magic link via Cloud email auth with sign-ups disabled for new users; admin user created up front.
- No Lovable AI; no live feed yet.
