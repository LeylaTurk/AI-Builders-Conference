# Lovable prompt: Claim Tracker as one page, like the prototype

Paste everything below the line into the existing **Decoding the Hype** project in Lovable. No attachment is needed: the project already has `claims-content.json` (version `claims-us-content-1.5`) from the last Claim Tracker prompt. If Lovable says the content is missing, attach `claims-content.json` again in the same message.

---

Please change the **Claim Tracker** so it is **one page that shows one claim at a time**, not a grid of cards that link out. It should look and behave like my prototype: a small page title and intro, a row of claim pills, and under it the selected claim with its hype score, its trail, the short version and the three tabs. Work in preview only; do not publish. Do not change the feed, story pages, ratings, the article engine or any stored data, and do not change any text in `claims-content.json`.

## 1. Remove the card grid

On `/claims`, delete the grid of claim cards (headline, chillies, qualification and “Follow the claim's trail” link). Nothing on the Claim Tracker should be a card that only links to another page.

## 2. Page order on `/claims`

One centred reading column, about **760px** wide, with about 16px side padding on phones and about 20px space at the top. From top to bottom:

1. **Page label:** “CLAIM TRACKER” in small uppercase letters (about 13px, bold, letter-spaced, muted grey-purple). This is a label, not a heading.
2. **Intro:** `section.introduction` (“Big claims about AI travel fast and change as they go. We follow each one back to where it started, show how it grew, and check it against the evidence.”) in muted text, about 15px, directly under the label, with about 14px of space below. Do not show `section.scoreNote` here; it stays in **The full evidence** further down.
3. **Claim pills:** one row of seven pill buttons, wrapping onto more rows when needed, about 8px apart, with about 20px of space below. Use the `topic` names in JSON order: Water, Jobs, Existential risk, Data centers, Energy and climate, Creativity, Privacy. Each pill is white with a 1px light border, fully rounded, 14px semibold dark text, about 8px × 14px padding and at least 40px tall. The selected pill is filled with the site yellow `#FFD84D` (dark text, yellow border) and has `aria-current="page"`. This row replaces the cards and the breadcrumb.
4. **The claim card** for the selected claim, exactly as the topic page already has it: the small eyebrow “THE CLAIM”, the `headline` as the page's **only h1** with `interactive.keyWord.word` highlighted (soft peach marker and orange wavy underline, plain text, not clickable), the chillies and **Headline hype: [label] · [n]/5** right under it, a thin divider, then **The claim's trail** with its intro and the full vertical timeline of stops.
5. **Is the claim true? The short version** card.
6. **The three tabs** (The Facts, In the news, Act on what's real) with their colour banners and panels, The Facts open by default.
7. **The full evidence** disclosures.
8. A link **Back to the feed** to `/`.

Items 4–8 are the existing topic-page sections; reuse those components and keep their content, colours and behaviour unchanged. Remove the breadcrumb and the **Explore the Claim Tracker** link, since the pills now do that job.

## 3. Choosing a claim and the URLs

- `/claims` shows the first claim, **Water**, selected.
- `/claims/[slug]` (the seven existing routes, such as `/claims/data-centers`) shows the **same one page** with that claim's pill selected. Old links and shared links keep working; nothing redirects to a card page.
- Clicking or tapping a pill swaps the claim card, the trail, the short version, the tabs and the full evidence to that claim **without a full page reload**, and updates the address to that claim's `/claims/[slug]` (a normal history entry, so the browser Back button returns to the previous claim). Keep the page scrolled so the pill row stays in view; do not jump to the top of the site.
- When the claim changes, reset the tabs to **The Facts**, close any open fact panel and close the full-evidence disclosures.
- Update the browser tab title to “[headline] · Claim Tracker · Decoding the Hype”.
- An unknown slug, such as `/claims/xyz`, shows the page with Water selected and a short note: “We couldn't find that claim, so here's the first one.”
- The header's **Claim Tracker** link goes to `/claims` and stays active on every `/claims` address. The feed invitation link still goes to `/claims`.

## 4. Look and feel to match the prototype

- Page background is the site lavender (`#F6F3FF` or the existing token); the claim card and the short-version card are white, with about 16px corners, a 1px light border and about 22px padding, and about 16px between them.
- No extra page heading such as a big “Claim Tracker” h1 above the pills; the claim headline is the h1 (Fraunces, about 34px on desktop and 26px on phones).
- Keep the existing site header, colours and fonts. Use only the site palette already in the content prompt: deep purple `#3B1E6E`, purple `#5B2EA6`, lavender `#C5A8FF`, yellow `#FFD84D`, chilli orange `#EB6834`, soft orange `#F59A6A`, pale yellow `#FFF1B8`, pale lavender `#E4D6FF`, soft peach `#FDE6DC`, ink `#16131F`.
- At 390px wide the pills wrap onto three rows and nothing scrolls sideways.

## 5. Checks before you finish

Report pass or fail for each:

- `/claims` shows the label, intro, seven pills (Water selected) and Water's claim card, trail, short version, tabs and full evidence, with no card grid anywhere.
- Each of the seven `/claims/[slug]` addresses loads directly, and on refresh, with the right pill selected and the right claim shown.
- Clicking each pill swaps the whole claim section without a reload, updates the address and the tab title, and Back/Forward move between claims.
- There is exactly one h1 (the selected claim's headline). Pills work with Tab and Enter/Space, have a visible focus ring and are at least 40px tall.
- The trail, tabs, icons, Act on what's real, article cards and full evidence look and work exactly as before for every claim.
- No horizontal scrolling at 320px, 390px, 768px and 1280px.
- The feed, story pages and ratings are unchanged.
