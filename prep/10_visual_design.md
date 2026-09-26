# Research: visual design

**AI, Seriously? · preparation research · 26 September 2026**

**Goal:** before the mockup, decide how the app shows ratings, meters and colour-coded markup, so it is easy to read, accessible to colour-blind readers, works in light and dark mode, and shares a look with the Vox-style videos.

**Method:** web research on comparable products and studies, plus a colour-palette validator. The validator measures colour differences as people with the two most common forms of colour blindness see them, and as people with full colour vision see them; it gave the pass/fail results below.

## 1. What comparable tools do

| Tool | How it shows its judgement | Lesson for us |
| --- | --- | --- |
| **Grammarly** | Four suggestion categories, each with its own underline colour: correctness red, clarity blue, engagement purple, delivery green ([TechSpot](https://www.techspot.com/news/80977-grammarly-color-codes-suggestions-easier-classification.html), [Engadget](https://www.engadget.com/2019-07-16-grammarly-color-coded-ai-suggestions.html)) | Millions of people already understand "coloured underline = a type of issue; click for the explanation". Four groups, not more. |
| **Hemingway Editor** | Five highlight colours: yellow for long sentences, red for very hard ones, blue for weak words, purple for complex words, green for passive voice ([Hemingway help](https://hemingwayapp.com/help/docs/highlighted-issues)) | Whole-sentence highlight tints read well in running text. But five hues need a legend beside the text to stay readable. |
| **Ground News** | A left/centre/right **bias bar** per story; a publisher-level **factuality** score averaged from Ad Fontes and Media Bias/Fact Check ([rating system](https://ground.news/rating-system), [bias bar](https://ground.news/bias-bar)) | A reviewer's criticism: factuality is **publisher-level, not article-level**, so a good outlet's bad article still looks good ([StationX review](https://www.stationx.net/ground-news-review/)). **Our article-level rating fills exactly that gap.** Say so on the "How ratings work" page. |
| **Science Feedback** | Numeric credibility score plus one-word verdict tags ([process](https://science.feedback.org/process/), in `prep/sources/`) | A short word label beside every number. |
| **Nutri-Score** (food labels, A–E) | A graded colour scale with a letter. In a 12-country study of 12,015 people it was the front-of-pack label that best helped people judge healthiness ([Egnell et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6213801/)) | A **single, simple graded scale with a letter or number** is understood fast. We copy the "number + word + graded steps" idea, but not its green-to-red colours (next section). |

## 2. Colour: tested, not guessed

### Seven highlight colours fail

In an article, any two highlights can sit next to each other, so every pair of colours must be distinguishable. Tested with the validator:

| Palette | Colour-blind separation (target ≥ 8) | Full-colour separation (floor ≥ 15) | Result |
| --- | --- | --- | --- |
| **7 colours, one per category** | 3.2: green and orange look almost identical to red–green colour-blind readers | 7.1: orange and red are hard to tell apart **even with full colour vision** | **Fails** |
| **3 colour families** (blue, orange, aqua-green), light mode | 9.2 | 24.0 | **Passes** |
| **3 colour families**, dark mode | 9.4 | 20.9 | **Passes** |

The validator's rules say a highlight-style layout can carry **at most three colours**. So: **colour shows the family; icon, label and underline style show the exact category.**

### The three families match the two scores

| Family | Colour (light / dark) | Categories | Feeds which score |
| --- | --- | --- | --- |
| **🌶 Hype** | orange `#eb6834` / `#d95926` | 🟧 Overstated claim · Hyperbole · Human–AI framing | **Hype meter** |
| **🔎 Evidence & sourcing** | blue `#2a78d6` / `#3987e5` | Unexplained number · PR language / unchallenged source · Missing context | **Story score** |
| **✓ Good practice** | aqua-green `#1baf7a` / `#199e70` | Independent expert, linked study, stated limits | Story score (positive) |

So orange means hype everywhere (highlights, meter, videos) and blue means evidence everywhere. Readers learn one colour logic.

Within a family, each category gets its **own icon, label and underline style** (solid, wavy, dotted, double). This is the "secondary encoding" the accessibility rules require. It also satisfies the WCAG rule that colour must never be the only way information is conveyed.

**Contrast caveat:** the aqua-green is below 3:1 contrast on the light background, so it must always appear **with its label** (never a bare coloured mark). Highlight *tints* behind body text need their own text-contrast check (4.5:1) during the mockup.

The seven categories stay exactly as decided in the feature list; only the colour mapping changes from seven colours to three families. The 🟥🟨🟪🟦⬜ emoji in earlier notes were placeholders.

## 3. The two score displays

**The opposite-direction problem:** a **high story score is good**, but **high hype is bad**. Showed the same way, readers will mix them up. So the two must look clearly different:

| | Story score | Hype meter |
| --- | --- | --- |
| Form | Five segments in one **blue** ramp, filled up to the score | Five 🌶 chillies in one **orange** ramp, filled up to the level |
| Always shows | Number **and word**: "4/5 Strong" | Word **and number**: "A little spicy · 2/5" |
| Colour logic | One hue, lighter to darker (an *ordinal* scale) | One hue, lighter to darker |
| Not | Green-to-red traffic light: red–green is the hardest pair for colour-blind readers, and red/green are reserved for status meanings | A dial or gauge: harder to read than segments at small sizes |

The chilli icon count carries the level without colour, and matches the existing hype labels (Grounded … Off the charts). "Insufficient evidence" and "Not rated yet" appear as a **grey, empty meter with a label**, never as a low score.

## 4. Look and feel: one identity for app and videos

The Vox style is "a system": paper collage and halftone textures, bold kinetic typography, highlighted and circled text, big numbers, and every visual answering what the narrator just said ([Cliptude](https://cliptude.com/vox-style-animation/), [Storybench](https://www.storybench.org/how-vox-uses-animation-to-make-complicated-topics-digestible-for-everyone/), [PremiumBeat](https://www.premiumbeat.com/blog/replicating-vox-motion-graphic/)).

| Element | In the videos | In the app |
| --- | --- | --- |
| **Highlighter marks** | Phrases highlighted and circled on torn paper | The markup view: same three family colours |
| **Paper / newsprint texture** | Collage backgrounds | **Accents only**: the header, empty states, the "Learn" section. Never behind reading text. |
| **Torn-paper edge** | Clippings of headlines | Optional edge on featured cards |
| **Bold numbers** | Big animated statistics | Large score numbers on cards |
| **Typography** | Bold headline type | An editorial serif for headlines (newspaper feel) with a clean sans for interface text. To confirm in the mockup. |

**Tone:** curious, sharp, welcoming (from the brief). Playful in the chillies and labels; calm and plain in the reading view, so the article text stays easy to read.

## 5. Video tools for a beginner

| Tool | Strength | Free plan (per reviews) |
| --- | --- | --- |
| **Descript** | Edit video by editing the transcript like a document; strong automatic transcription. Best for talking-to-camera segments. | Free tier with **watermarked exports** |
| **CapCut** | Timeline editing, templates, effects, automatic captions. Easiest for beginners; good for collage-style effects. | Very generous: 1080p, no watermark on standard edits |

Sources: [Descript comparison](https://www.descript.com/compare/descript-vs-capcut), [ngram](https://www.ngram.com/blog/capcut-vs-descript), [Storyflow](https://storyflow.so/blog/descript-vs-capcut-for-content-creators).

**Suggestion:** CapCut for video 0 (free, captions, collage effects). Descript is worth trying if editing the talking parts becomes slow. Keep any paid plan within the project budget or treat it as a separate personal cost.

## Decisions (approved by Leyla, 26 September)

1. **Three colour families** (hype orange, evidence blue, good-practice green) instead of seven colours, with icons, labels and underline styles for the categories. *Recommended: the seven-colour version fails the tests.*
2. **Scores as segments:** blue segments for the story score, orange chillies for hype; number and word always shown.
3. **Look:** paper and highlighter accents shared with the videos; plain, readable reading view; serif headlines to be tried in the mockup.
