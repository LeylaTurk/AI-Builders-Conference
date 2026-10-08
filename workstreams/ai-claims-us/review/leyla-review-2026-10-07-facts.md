# Facts and true/false check (October 7, 2026)

Leyla asked for "What the headline leaves out" to become dropdowns labelled "Fact:", for everything in it to be in plain English, and for every true/false question to be fact-checked with enough context.

- Every fact and quiz answer in `handoff/interactive-layers.json` was rewritten in plain English and checked against the topic research briefs (`research/*.md`) and their linked sources.
- Quiz statements that were only "not proven" were reworded so the answer is clearly false (for example "Researchers have proven that AI caused that drop"), and every answer now explains why.
- Two sources were added beyond the research briefs, both opened on October 7, 2026:
  - Google, [Measuring the environmental impact of AI inference](https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference), August 21, 2025: a median Gemini Apps text prompt uses about 0.26 ml of water ("about five drops"). Company self-estimate; whether power-plant water is counted is not stated.
  - Rob Salkowitz, [Forbes interview with Midjourney founder David Holz](https://www.forbes.com/sites/robsalkowitz/2022/09/16/midjourney-founder-david-holz-on-the-impact-of-ai-on-art-imagination-and-the-creative-economy/), September 16, 2022: asked whether Midjourney sought consent from living artists, Holz answered "No."
- `assemble-content.py` now checks that every fact label starts with "Fact: ".

## Fuller facts with sources (October 8, 2026)

Leyla asked for no overlap between each short answer and its facts, a full-sentence label with context for each fact, a paragraph in each dropdown, and one low-hype, well-evidenced source per fact. Each source below was opened on October 8, 2026 and checked against the paragraph. Points already made in a short answer were left out of the facts.

**water**
- In 2023, AI servers used less electricity than ordinary servers in US data centers, so most data center totals cover much more than AI. [Berkeley Lab’s 2024 report](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report.pdf?stream=top)
- Water that a data center takes in is not all lost, because experts separate water taken from a source and water used up. [USGS water glossary](https://water.usgs.gov/water-basics_glossary.html)
- Some data centers use cooling systems that need almost no water on site, but those systems usually need more electricity instead. [Li and colleagues’ study](https://arxiv.org/html/2304.03271v5)
- In August 2025, Google estimated that a typical text question to its Gemini AI used about five drops of water. [Google’s August 2025 paper](https://arxiv.org/abs/2508.15734)
- Virginia’s state audit found that most data centers there use about as much water as a large office building, though a few use far more. [Virginia’s 2024 state audit](https://rga.lis.virginia.gov/Published/2025/RD206/PDF)

**jobs**
- Musk pictured a future where AI and robots supply what people need, so jobs become optional instead of leaving people broke. [Elon Musk says AI will take all our jobs](https://www.wral.com/story/elon-musk-says-ai-will-take-all-our-jobs/21447203/)
- The US Bureau of Labor Statistics says an AI “exposure” rating for a job is not a forecast of job losses or worker replacement. [guide to AI exposure categories](https://www.bls.gov/emp/publications/ai-exposure-categories.htm)
- In a 2026 Census Bureau survey of US businesses, only 2% of firms reported cutting jobs because of AI. [The Microstructure of AI Diffusion](https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html)
- Separate Census Bureau records also show fewer young hires in AI-exposed industries, but interest-rate changes may explain part of that drop. [You’re (not) Hired](https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-27.html)
- In a 2026 Gallup survey, 31% of US workers who use AI said it had led their employer to give them more responsibilities. [AI Benefits at Work Unevenly Distributed](https://news.gallup.com/poll/714602/benefits-work-unevenly-distributed.aspx)

**energy-climate**
- US data centers used about 4.4% of the country’s electricity in 2023, and that share covers all their work, not just AI. [2024 United States Data Center Energy Usage Report](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report.pdf?stream=top)
- The International Energy Agency expects data centers worldwide to use about twice as much electricity in 2030 as in 2025. [Key Questions on Energy and AI](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary)
- Each AI answer is using less energy than before, yet AI’s total electricity use can still rise. [2026 executive summary](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary)
- A data center company that buys clean power on paper may still run partly on gas or coal power from the grid. [full 2026 report](https://iea.blob.core.windows.net/assets/3179f7f8-01f6-4dd6-bffa-c9f7b73f1dc9/KeyQuestionsonEnergyandAI.pdf)
- Virginia’s legislative watchdog warned in 2024 that data center growth could keep older fossil fuel power plants running longer. [Data Centers in Virginia](https://rga.lis.virginia.gov/Published/2025/RD206/PDF)

**creativity**
- In a 2022 interview, Midjourney’s founder said the company did not ask living artists for permission before training its AI on their images. [Forbes interview with Midjourney’s founder](https://www.forbes.com/sites/robsalkowitz/2022/09/16/midjourney-founder-david-holz-on-the-impact-of-ai-on-art-imagination-and-the-creative-economy/)
- Building an AI model usually means copying creative works several times, which is a separate step from anything the finished model later produces. [Copyright and Artificial Intelligence, Part 3](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf)
- In the US, an artist’s original work is protected by copyright from the moment it is created, even if it is never registered. [Copyright in General FAQ](https://www.copyright.gov/help/faq/faq-general.html)
- One study found that job posts for image-making work fell about 17% on one global freelance website after AI image tools appeared. [Who Is AI Replacing? The Impact of Generative AI on Online Freelancing Platforms](https://www.ifo.de/sites/default/files/docbase/docs/cesifo1_wp11276.pdf)
- Anthropic agreed to pay $1.5 billion to settle book authors’ claims over pirated copies, but the deal left claims about AI outputs open. [Order Granting Final Approval of Class Action Settlement](https://docs.justia.com/cases/federal/district-courts/california/candce/4:2024cv05417/434709/680)

**privacy**
- Turning off ChatGPT’s training setting doesn’t delete or hide the chats already saved in your personal account. [Data controls in ChatGPT](https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt)
- OpenAI says chats you delete are erased from its systems within 30 days, though some can be kept for security or legal reasons. [How OpenAI handles data in consumer services](https://help.openai.com/en/articles/7039943-how-openai-handles-data-in-consumer-services)
- ChatGPT’s Temporary Chat isn’t used for training while it stays temporary, but OpenAI may keep a copy for up to 30 days. [Temporary chat in ChatGPT](https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt)
- If you share a ChatGPT chat by link from a personal account, anyone who has that link can read it. [Sharing conversations and scheduled tasks in ChatGPT](https://help.openai.com/en/articles/7925741-sharing-conversations-and-scheduled-tasks-in-chatgpt)
- California’s privacy law gives residents the right to know, delete and correct personal information that businesses have collected about them. [Rights under the California Consumer Privacy Act](https://privacy.ca.gov/california-privacy-rights/rights-under-the-california-consumer-privacy-act/)

**existential-risk**
- The book’s warning is about “superintelligence,” a kind of AI that the authors themselves say has not been built yet. [the authors’ one-year update](https://www.lesswrong.com/posts/BFrRJYgpBvziuuJLs/if-anyone-builds-it-everyone-dies-one-year-closer)
- Co-author Nate Soares says the danger he sees is not that AI would hate people, but that it would not care about them. [Will AI Kill Us All? Nate Soares on His Controversial Bestseller](https://carnegieendowment.org/podcasts/the-world-unpacked/will-ai-kill-us-all-nate-soares-on-his-controversial-bestseller?center=middle-east)
- A major 2026 international expert report says today’s AI systems cannot yet cause a true “loss of control,” but are improving in relevant skills. [International AI Safety Report 2026](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026)
- In a 2023 survey, the middle answer from AI researchers gave a 5% chance that AI causes human extinction or something similarly severe. [Thousands of AI Authors on the Future of AI](https://arxiv.org/html/2401.02843v3)
- An early-2026 outside review found AI agents used inside four major AI companies could plausibly start small, unapproved operations on their own. [Frontier Risk Report](https://metr.org/blog/2026-05-19-frontier-risk-report/)

## Sixth facts (October 8, 2026)

Added so each claim has six facts for the icon grid. Every number was checked against the linked source.

- **creativity:** Human authors only. [Thaler v. Perlmutter](https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf)
- **data-centers:** Tax breaks too. [December 2024 audit](https://jlarc.virginia.gov/pdfs/summary/Rpt598Sum.pdf)
- **energy-climate:** On-site gas power. [on-site gas power](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary)
- **existential-risk:** Forecasters vs experts. [Forecasting Existential Risks](https://forecastingresearch.org/pdf/existential-risk-persuasion-tournament.pdf)
- **jobs:** Official job outlook. [official 10-year job projections](https://www.bls.gov/news.release/ecopro.nr0.htm)
- **privacy:** Police data requests. [Government Requests for User Data report](https://cdn.openai.com/trust-and-transparency/report-2025h2-government-requests-for-user-data.pdf)
- **water:** Power plant water. [Berkeley Lab’s 2024 report](https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report.pdf?stream=top) (figures from the water research brief, rows W03–W04)
