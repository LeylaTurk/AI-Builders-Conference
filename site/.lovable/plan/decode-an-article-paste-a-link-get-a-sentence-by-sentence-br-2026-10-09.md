# "Decode an article": paste a link, get a sentence-by-sentence breakdown

Unchanged: rating prompt, answer format, scores and scoring files, feed, story pages (except the button), header, fonts, colours, meters, highlight colours, problem names, daily limits (10 a day overall, 3 per visitor).

## 1. New name
- "Decode an article" in the menu, page title, meta and heading, with your intro text.
- Page moves to /decode; /rate and /check both redirect there.
- Story page box: "Have another article?" + button "Decode it" going to /decode. (There are no Highlights pages yet, so that button is skipped.)
- "[n] breakdowns left today"; limit message "Today's breakdowns are used up. Please try again tomorrow."

## 2. The form
- One field "Link to the article" (placeholder "https://…") and a "Decode it" button. Non-links get your "That doesn't look like a link…" message.
- Collapsed "More about this article": "What kind of page is it?" (independent news outlet, press release, company announcement, don't know; default don't know).
- Social media post option and everything only used for posts removed. Note: "Don't paste links to private pages or anything with someone's personal details."
- Steps shown while working: "Opening the page…", "Reading the article…", "Decoding it… this takes about a minute".

## 3. Reading the page (on the server, only when "Decode it" is pressed)
- Plain user agent naming Decoding the Hype; checks robots.txt; no cookies, no logins, no paywall tricks.
- Max 3 redirects, 10 seconds, 3 MB, HTML only; refuses private and local addresses (including IPv6 forms), checked again after every redirect.
- Reader-mode extraction: headline, deck, outlet, date, paragraphs; ads, menus, captions, related stories etc. dropped.
- Over 12,000 characters: rates whole paragraphs up to the limit and says "This article is long, so we decoded the first [n] paragraphs."
- Nothing saved: not the link, page, text or result.

## 4. When a page can't be read
Friendly box, never uses up a breakdown. Messages for: paywall/login, site blocks us ("[Site] doesn't let tools like ours read its pages."), not found / down / timeout, and not an article (under 200 characters, home page, video, PDF, list). Under all but the last: "Paste the text instead", which opens the old headline / deck / article text form (200 minimum, 12,000 limit).

## 5. "Your breakdown"
1. "Private · not saved · AI breakdown, not reviewed".
2. Headline linking to the original, then "[Outlet] · [date]".
3. Top box as now: Summary and Our findings; Hype meter above Evidence gaps meter.
4. "[n] things to notice in this article" with a legend (Hype, Evidence gaps, Good practice: colour + icon).
5. Sentence by sentence (below).
6. What's missing (as now).
7. Reader tip box (as now).
8. "Read the full article at [outlet]" and "Decode another article" (clears the form).

## 6. Sentence by sentence
- Same markup, colours, underlines, margin notes on wide screens, notes under paragraphs on phones.
- At most one highlight and one note per sentence: Evidence gaps first, then Hype, then Good practice; ties by check list order (H1 to C4). Dropped ones still count in scores but aren't shown anywhere.
- Each problem name appears once on the page; extra quotes from the same check stay unmarked.
- Notes numbered 1, 2, 3… in reading order, with a small number circle at the end of the highlight and on the note.
- Sticky bar at the top of the text: "Previous", "Note 2 of 7", "Next" — scrolls to and outlines the highlight and its note. Tab still moves through highlights in order.

## 7. Privacy note
Your new wording ("We open the link you give us…").

## Check after building
- Decode a working link (e.g. a Guardian or BBC AI story): steps show, result with numbered notes, Previous/Next works, one note per sentence, phone layout.
- A blocked or paywalled link shows the right box and doesn't reduce "breakdowns left"; "Paste the text instead" works.
- A localhost / 192.168 link is refused. /rate and /check land on /decode.
- Uses roughly 1–2 of today's 10 breakdowns.

## Technical details
- `src/routes/decode.tsx` (from rate.tsx); `rate.tsx` and `check.tsx` become 301 redirects. SiteHeader and story CTA updated.
- New `src/lib/fetch-article.server.ts`: URL validation, DNS-over-HTTPS lookup to reject private IPs (workerd has no DNS API) before each hop, manual redirects (max 3), AbortController 10s, streamed body capped at 3 MB, content-type check, robots.txt parse, `@mozilla/readability` + `linkedom` (works on Workers) for extraction, paywall heuristics (short text + subscribe/sign-in markers), error kinds mapped to the four messages.
- `check.functions.ts`: new `decodeLink` server fn — fetch/extract first, claim a usage slot only after the article is readable, then `scoreArticle` as now. Returns extracted headline/deck/outlet/date/paragraphs (the visitor's own requested page, short-lived, not stored) plus marks, so the browser can draw the markup. Text-fallback path keeps the existing news-only fn; post branch removed.
- `MarkedText.tsx`: sentence splitting, one-mark-per-sentence and one-note-per-check selection, numbering, sticky Previous/Next bar.
- AGENTS.md: update the /rate rule (link fetched server-side, extracted text returned to that visitor only, never stored).
