# Facts and true/false check (October 7, 2026)

Leyla asked for "What the headline leaves out" to become dropdowns labelled "Fact:", for everything in it to be in plain English, and for every true/false question to be fact-checked with enough context.

- Every fact and quiz answer in `handoff/interactive-layers.json` was rewritten in plain English and checked against the topic research briefs (`research/*.md`) and their linked sources.
- Quiz statements that were only "not proven" were reworded so the answer is clearly false (for example "Researchers have proven that AI caused that drop"), and every answer now explains why.
- Two sources were added beyond the research briefs, both opened on October 7, 2026:
  - Google, [Measuring the environmental impact of AI inference](https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference), August 21, 2025: a median Gemini Apps text prompt uses about 0.26 ml of water ("about five drops"). Company self-estimate; whether power-plant water is counted is not stated.
  - Rob Salkowitz, [Forbes interview with Midjourney founder David Holz](https://www.forbes.com/sites/robsalkowitz/2022/09/16/midjourney-founder-david-holz-on-the-impact-of-ai-on-art-imagination-and-the-creative-economy/), September 16, 2022: asked whether Midjourney sought consent from living artists, Holz answered "No."
- `assemble-content.py` now checks that every fact label starts with "Fact: ".
