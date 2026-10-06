# Annotated wireframe

This is a layout specification. Bracketed values bind to the final `claims-content.json` attachment; `lovable-prompt.md` supplies exact field mappings and implementation instructions. See `02-design-recommendation.md` for shared interface copy and behaviors.

## Desktop /claims — centered 856px column

```text
┌──────────────────── Existing purple patterned header ────────────────────┐
│ Decoding the [Hype]                       Feed    [AI claims explained]   │ ①
└──────────────────── Existing irregular lower edge ───────────────────────┘

  AI claims explained                                                     ②
  Six recurring claims about AI, explained for readers in the United
  States. See what each claim means, what the evidence can tell us,
  and what you can do if you are concerned.
  [Accurate AI/human review status]
  Hype scores assess the wording of a claim against the evidence.
  They do not measure how serious or likely a harm is.

  ┌──────────────────────────────────┐ ┌──────────────────────────────────┐
  │ Water                         ↗  │ │ Jobs                          ↗  │
  │ THE CLAIM                        │ │ THE CLAIM                        │ ③
  │ [Exact assessed wording]         │ │ [Exact assessed wording]         │
  │ [Scope/key qualification]        │ │ [Scope/key qualification]        │
  │ 🌶 … Proposed claim hype: n/5    │ │ 🌶 … Proposed claim hype: n/5    │ ④
  │ [Label, e.g. Grounded]            │ │ [Final label]                    │
  │ Read the evidence and actions →  │ │ Read the evidence and actions →  │
  └──────────────────────────────────┘ └──────────────────────────────────┘
  ┌──────────────────────────────────┐ ┌──────────────────────────────────┐
  │ Energy and climate               │ │ Creativity                       │
  │ [same content structure]         │ │ [same content structure]         │
  └──────────────────────────────────┘ └──────────────────────────────────┘
  ┌──────────────────────────────────┐ ┌──────────────────────────────────┐
  │ Privacy                          │ │ Existential risk                 │
  │ [same content structure]         │ │ [same content structure]         │
  └──────────────────────────────────┘ └──────────────────────────────────┘
```

① Logo and Feed keep their current destinations. New section uses the existing yellow active treatment. The ↗ in this schematic means a link affordance, not a requirement to open a new window; implementation can use the current arrow icon or omit it.

② One concise introduction, visible status and scope; no new hero image or giant banner pushing six topics down.

③ Label accompanies every claim. Topic heading is a link; claim itself is normal text. Card height follows content; no truncation. At least 20px padding.

④ Full numeric/label text alongside decorative pepper icons. Final score metadata only. A shared note does not replace topic-specific caveats.

## Mobile /claims — 390px example, valid down to 320px

```text
┌─────────────────────────────────┐
│ Decoding the [Hype]              │
│ Feed    [AI claims explained]    │ ⑤
└─────────────────────────────────┘
  AI claims explained
  [Intro; scope and review status]
  [Score meaning note]
  ┌─────────────────────────────┐
  │ Water                       │
  │ THE CLAIM                   │
  │ [Full claim wraps]          │
  │ [Visible qualification]     │
  │ 🌶 …                       │
  │ Proposed claim hype: n/5    │
  │ [Final label]               │
  │ Read the evidence           │
  │ and actions →              │
  └─────────────────────────────┘
  [Jobs]
  [Energy and climate]
  [Creativity]
  [Privacy]
  [Existential risk]
```

⑤ Two explicit navigation links on a second header row. At least 44px tap targets. No horizontally scrolling tab strip. Cards occupy available width after 20px gutters, reducing only if required at 320px. Scale icons may wrap independently, but each text label remains complete.

## Topic detail — same order desktop and mobile

```text
  AI claims explained / [Topic]
  [Starting reader question as h1]
  [Scope] · Research checked through [date]
  [AI review status] · [Human review status]

  ┌─────────────────────────────────────────────────────────┐
  │ THE CLAIM                                               │ ⑥
  │ [Exact declarative claim] [public-example citations]     │
  │ [Scope/time horizon and important qualification]        │
  │                                                         │
  │ 🌶 … Proposed claim hype: [label] n/5                  │ ⑦
  │ [Cited explanation of this exact claim's score]          │
  │ Evidence limitations: [final supplied text; no number]        │
  │ Hype scores assess the wording …                        │
  │ How these scores work ↓                                 │
  └─────────────────────────────────────────────────────────┘

  The short answer                                        ⑧
  [50–80 words with their inline citations]

  On this page: Meaning · Evidence · Actions · Sources

  What does this claim actually mean?
  [Final explanation and citations]

  What evidence do we actually have?
  [Finding, evidence type, geography/date, limit, citations]
  [Findings repeat as readable prose or labeled list]

  What can you do if you are still concerned?
  1. [Action, specific resource link, benefit and limit]
  2. [Action, specific resource link, benefit and limit]
  3. [Action, specific resource link, benefit and limit]
  [4–5 only if present in final content]

  How these scores work
  [Shared method; exact scoring target; evidence gaps separate]
  ▸ Detailed scoring checks (native disclosure)

  Sources and review                                      ⑨
  [Descriptive references; source dates; citation backlinks]
  [Research cutoff; independent AI check; human review state]
  [Remaining limitation supplied in the content]

  Related stories from the feed                           ⑩
  Reporting and commentary on this topic; these stories
  are not the evidence base for this explainer.
  ┌─────────────────────────────────────────────────────────┐
  │ [Publisher · date · country/context label]               │
  │ [Actual current story title → /story/verified-ID]        │
  │ [Existing article rating, if reused, clearly labeled]    │
  └─────────────────────────────────────────────────────────┘
  OR: No related stories are available here yet. You can
      still read the sources above or browse the feed.

  Explore all AI claims        Back to the feed
```

⑥ The panel does not imply endorsement: label, cited public wording and immediate qualification remain together. The title/question never silently changes the statement being scored.

⑦ A low hype score is not a safety signal. Text and numeric scores are separate from any risk/evidence language. No green “safe” or red “danger” status. Put the final score rationale near the score; do not bury it in a tooltip.

⑧ Short answer is above the jump links and always expanded. This makes the useful conclusion visible without interaction while retaining full sourced sections below.

⑨ Citations are text links, not hover popups. External sources open in the same tab by default. Metadata dates are content fields, never deployment time. Human review remains pending unless performed.

⑩ Resolve only curated actual IDs. The final Water/Energy candidate is the Atlanta datacenter story; Privacy has an Australia label; Existential risk has a commentary label; Jobs and Creativity both have intentional empty states. The inspected French literary-prize story is excluded because it is peripheral to the final copying claim. The Energy and climate route is `/claims/energy-climate`. A failed related-story lookup must not remove this explainer.

## Feed invitation — only addition inside current feed body

```text
  AI news, headlines, and claims
  Feed checked: [existing value unchanged]

  Concerned about a recurring AI claim?
  Explore the evidence on water, jobs, climate, creativity,
  privacy, and existential risk.     Explore AI claims →

  [Existing story list, queries, card ratings and actions]
```

This is intentionally one compact invitation rather than the entire claims grid. In implementation acceptance, verify the first actual news card still appears promptly on mobile and the feed timestamp/rating engine still comes from its original data path.
