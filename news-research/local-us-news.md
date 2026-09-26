# Local US news on AI: candidate stories for rating calibration

**Collected:** 2026-09-26 by a research agent for Leyla's AI-news feed project.

**How these were collected:** web searches aimed at local TV stations, public radio stations, regional newspapers and local nonprofit or digital newsrooms, grouped by state and topic. Every URL below appeared in a search result. None was invented or guessed.

**Important caveats:**

- **No link was opened.** This session's network egress proxy blocked both `WebFetch` and `curl` to every news domain tried (WBUR, OPB, Axios, azfamily, KNOE, WAFB and others, all returning `EGRESS_BLOCKED` / 403). So "Link verified?" is **No** for every row. Each link was seen in a search result only. Spot-check before relying on them.
- **Headlines** are as shown in search results. They may differ slightly from the live page.
- **Dates** come from the URL path where one exists. "n.d." means the date was not visible in the URL or snippet. For month-only paths (e.g. `/2026/09/`), only the month is given.
- **"Why it's interesting for rating"** is a hypothesis based on the headline and search snippet, not a reading of the article. Treat it as a reason to pick the story for calibration, not as a rating.
- **Paywall** is based on the outlet's general model (for example, AJC, Star Tribune, Inquirer and Salt Lake Tribune are metered). It was not checked per article.
- Several items on local TV sites are **syndicated wire/network copy** (AP, CNN, Consumer Reports, NPR). These are flagged. They are useful for testing "local outlet repeating national copy", but they are not original local reporting.
- Some search domains are also **not reachable by Anthropic's crawler** and could not be searched at all: chicagotribune.com, cleveland.com, freep.com, bizjournals.com, azcentral.com, denverpost.com, jsonline.com, latimes.com, nola.com, nj.com, al.com, richmond.com, kcci.com, koat.com, wlky.com. This matters for feed eligibility too.
- Do not store full article text. The summaries below are short original paraphrases of search snippets.

## Stories

| # | Headline | Outlet | City/State | Outlet type | Date | Topic | Why it's interesting for rating | Paywall? | Link verified? | URL |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | School districts, slowly, build guidance around AI learning in classrooms | WBUR | Boston, MA | Radio | 2026-09-22 | AI in schools | Multi-district comparison; likely well sourced | No | No (search only) | https://www.wbur.org/news/2026/09/22/massachusetts-schools-ai-use |
| 2 | Oregon data centers by the numbers: 111 facilities consume nearly one-quarter of state's power, according to new report | OPB | Portland, OR | Radio | 2026-09-17 | Data centers / energy | Report-based statistic; check what the report actually measures | No | No (search only) | https://www.opb.org/article/2026/09/17/oregon-data-centers-consume-quarter-state-power-report/ |
| 3 | A data center proposed at a quiet corner of East Texas leaves a community bracing for a boom | Texas Tribune | East Texas, TX | Digital (nonprofit) | 2026-07-09 | Data centers / community | Community-level reporting; likely balanced | No | No (search only) | https://www.texastribune.org/2026/07/09/data-center-backlash-east-texas/ |
| 4 | Google data centers totaling $40 billion coming to Texas | Texas Tribune | Austin, TX | Digital (nonprofit) | 2025-11-14 | Data centers / investment | Big-number investment announcement; check for company framing | No | No (search only) | https://www.texastribune.org/2025/11/14/texas-google-data-centers-ai/ |
| 5 | The data center backlash is here — and Big Tech is spending big to combat it | CalMatters | Sacramento, CA | Digital (nonprofit) | 2026-08 | Data centers / lobbying | Lobbying records; accountability reporting | No | No (search only) | https://calmatters.org/economy/technology/2026/08/california-data-center-backlash-big-tech-lobbying/ |
| 6 | Western Pa. tests the "right way" to build data centers | Axios Pittsburgh | Pittsburgh, PA | Digital (Axios Local) | 2026-09-25 | Data centers | "Right way" framing; check whose claim that is | No | No (search only) | https://www.axios.com/local/pittsburgh/2026/09/25/data-centers-local-opposition-western-pennsylvania |
| 7 | Chicago mayor proposes 12-month moratorium on new data centers | Axios Chicago | Chicago, IL | Digital (Axios Local) | 2026-09-23 | Data centers / local government | Short, straight policy news | No | No (search only) | https://www.axios.com/local/chicago/2026/09/23/chicago-12-month-moratorium-data-centers-ai-johnson-pritzker-trump |
| 8 | Small Minnesota data center projects fueling bigger AI backlash | Axios Twin Cities | Minneapolis, MN | Digital (Axios Local) | 2026-07-10 | Data centers / public opinion | Poll-driven; check poll scope | No | No (search only) | https://www.axios.com/local/twin-cities/2026/07/10/small-minnesota-data-centers-polls |
| 9 | Pro-data center party comes to D.C. amid national backlash | Axios Washington D.C. | Washington, DC | Digital (Axios Local) | 2026-09-24 | Data centers / industry PR | Industry event coverage; possible PR echo | No | No (search only) | https://www.axios.com/local/washington-dc/2026/09/24/ai-data-centers-party-pubkey-partiful |
| 10 | Gov. JB Pritzker assembling Illinois Artificial Intelligence Cabinet to assess AI threats | WBEZ Chicago | Chicago, IL | Radio | 2026-09-23 | State AI policy | Official announcement; check how "threats" are framed | No | No (search only) | https://www.wbez.org/technology/2026/09/23/illinois-ai-cabinet-artificial-intelligence-pritzker |
| 11 | Pritzker Establishes AI Cabinet Amid Calls For Greater Regulation | Block Club Chicago | Chicago, IL | Digital (nonprofit) | 2026-09-23 | State AI policy | Same event as #10; compare coverage | No | No (search only) | https://blockclubchicago.org/2026/09/23/pritzker-establishes-ai-cabinet-amid-calls-for-greater-regulation/ |
| 12 | Here's how some Chicago small businesses are ramping up their use of AI | WBEZ / Chicago Sun-Times | Chicago, IL | Radio / paper | 2026-09-12 | Business adoption | Company-supplied figures (e.g. valuation, funding) | No | No (search only) | https://www.wbez.org/business/2026/09/12/ai-artificial-intelligence-small-businesses-chicago |
| 13 | How is artificial intelligence affecting Chicago workers? | WBEZ Chicago | Chicago, IL | Radio (talk show) | 2026-08-12 | Jobs | Cites Chicago Fed; "job change, not loss" nuance | No | No (search only) | https://www.wbez.org/say-more-with-mary-dixon-patrick-smith/2026/08/12/how-is-artificial-intelligence-affecting-chicago-workers |
| 14 | CT laws effective Oct. 1: AI, Flock cameras, ICE enforcement | CT Mirror | Hartford, CT | Digital (nonprofit) | 2026-09-23 | State AI law / surveillance | Explainer of enacted law; low-hype baseline | No | No (search only) | https://ctmirror.org/2026/09/23/ct-laws-oct-1-ai-flock-cameras-immigration-distracted-driving/ |
| 15 | Connecticut passes AI regulations after years in development | CT Mirror | Hartford, CT | Digital (nonprofit) | 2026-05-01 | State AI law | Legislative reporting with vote counts | No | No (search only) | https://ctmirror.org/2026/05/01/artificial-intelligence-house-regulation-passage-ct/ |
| 16 | Colorado's AI compromise would drop requirement that companies explain how their technology works | Colorado Sun | Denver, CO | Digital | 2026-05-01 | State AI law | Specific policy detail; strong context likely | No | No (search only) | https://coloradosun.com/2026/05/01/colorado-ai-law-change-bill-introduced/ |
| 17 | What's the status of massive data centers in Colorado? | Colorado Sun | Denver, CO | Digital | 2026-06-18 | Data centers | Explainer / roundup | No | No (search only) | https://coloradosun.com/2026/06/18/colorado-data-center-update-pollution-protests-moratoriums/ |
| 18 | These groups are driving the DeFlock movement in Austin. Now, they're ready for statewide action | KUT | Austin, TX | Radio | 2026-09-16 | Policing / surveillance | Advocate-centered; check for police/vendor response | No | No (search only) | https://www.kut.org/crime-justice/2026-09-16/austin-tx-texas-flock-deflock-movement-license-plate-readers |
| 19 | Furor over Flock's AI-powered license plate readers in Delaware as police laud cameras | WHYY | Wilmington, DE / Philadelphia | Radio | n.d. | Policing / surveillance | Presents both sides (police vs. critics) | No | No (search only) | https://whyy.org/articles/flock-cameras-license-plate-readers-delaware-artificial-intelligence/ |
| 20 | New Bedford City Council wants Flock cameras taken down, but it may not happen | WBUR | New Bedford, MA | Radio | 2026-08-27 | Policing / surveillance | Misuse allegation plus local politics | No | No (search only) | https://www.wbur.org/news/2026/08/27/new-bedford-flock-camera-vote-police-surveillance |
| 21 | Police used AI facial recognition to arrest a Tennessee woman for crimes committed in a state she says she's never visited | KTVZ (CNN syndicated) | Bend, OR | TV | 2026-03-29 | Policing / facial recognition | Alarming but documented; syndicated CNN copy | No | No (search only) | https://ktvz.com/news/national-world/cnn-national/2026/03/29/police-used-ai-facial-recognition-to-arrest-a-tennessee-woman-for-crimes-committed-in-a-state-she-says-shes-never-visited/ |
| 22 | Fort Worth hospital using AI to find guns on campus | WFAA | Dallas–Fort Worth, TX | TV | n.d. | Healthcare / security | Vendor (ZeroEyes) partnership; possible vendor claims | No | No (search only) | https://www.wfaa.com/article/news/local/jps-hospital-artificial-intelligence-find-guns-shooting-ai-detection-fort-worth/287-dd618941-8185-47e3-ad91-636f7602f206 |
| 23 | Is AI ready to take over your prescriptions? Doctors are wary of Utah's automated refill program | WRAL (AP syndicated) | Raleigh, NC (story: Utah) | TV | n.d. | Healthcare | Skeptical experts; AP wire copy | No | No (search only) | https://www.wral.com/news/ap/cf94c-is-ai-ready-to-take-over-your-prescriptions-doctors-are-wary-of-utahs-automated-refill-program/ |
| 24 | Washington enacts first AI chatbot safety law | KING 5 | Seattle, WA | TV | n.d. (2026) | State AI law / chatbots | "First" claim to check | No | No (search only) | https://www.king5.com/article/news/local/washington-state-enacts-first-ai-chatbot-safety-law/281-117b2eed-0406-46d0-92b1-93d2c5109b79 |
| 25 | Microsoft reveals new datacenter for Atlanta, will be world's first 'AI super factory' | WSB-TV | Atlanta, GA | TV | n.d. | Data centers | Repeats company superlative ("world's first") | No | No (search only) | https://www.wsbtv.com/news/local/atlanta/microsoft-reveals-new-datacenter-atlanta-be-help-create-worlds-1st-ai-superfactory/NPLE2ASPKJG2FEC6BNF7CYFXDY/ |
| 26 | ChatGPT company to build massive data center in Georgia | WSB-TV | Atlanta, GA | TV | n.d. (2026) | Data centers / jobs | Utility's "thousands of jobs" claim | No | No (search only) | https://www.wsbtv.com/news/local/openai-plans-massive-data-center-facility-with-georgia-power-development-start-2028/377IZ4C4LFBGZNEFRENVWR7IMU/ |
| 27 | Atlanta surpasses Northern Virginia to lead US in data center construction | Atlanta Journal-Constitution | Atlanta, GA | Paper | 2026-09 | Data centers | Single-source industry data (CBRE) | Yes (metered) | No (search only) | https://www.ajc.com/business/2026/09/atlanta-surpasses-northern-virginia-to-lead-us-in-data-center-construction/ |
| 28 | OpenAI in Georgia: How $20B data center plan secretly took root in Effingham | Atlanta Journal-Constitution | Atlanta, GA | Paper | 2026-08 | Data centers / transparency | Investigative, likely document-based | Yes (metered) | No (search only) | https://www.ajc.com/news/2026/08/openai-in-georgia-how-20b-data-center-plan-secretly-took-root-in-effingham/ |
| 29 | Anatomy of a secret Coastal Georgia data center deal | WABE | Atlanta, GA | Radio | n.d. | Data centers / transparency | Investigative; compare with #28 | No | No (search only) | https://www.wabe.org/anatomy-of-a-secret-coastal-georgia-data-center-deal/ |
| 30 | How Virginia became the world's data center capital and how it's going | Virginia Mercury | Richmond, VA | Digital (nonprofit) | 2026-07-06 | Data centers | Context-rich explainer | No | No (search only) | https://virginiamercury.com/2026/07/06/how-virginia-became-the-worlds-data-center-capital-and-how-its-going/ |
| 31 | Arizona call center workers face uncertain future amid AI rise | Arizona's Family (KTVK/KPHO) | Phoenix, AZ | TV | 2026-09-25 | Jobs | Job-loss framing; check evidence vs. speculation | No | No (search only) | https://www.azfamily.com/2026/09/25/arizona-call-center-workers-face-uncertain-future-amid-ai-rise/ |
| 32 | Parents, educators raise concerns over AI use in Arizona classrooms | Arizona's Family | Phoenix, AZ | TV | 2026-09-24 | AI in schools | Concern-driven; anecdote vs. data | No | No (search only) | https://www.azfamily.com/2026/09/24/parents-educators-raise-concerns-over-ai-use-arizona-classrooms/ |
| 33 | Kris Mayes calls for no new AI data centers as Arizona faces water, power crunch | Arizona Mirror | Phoenix, AZ | Digital (nonprofit) | 2026-08-31 | Data centers / water | Official's position; check water data | No | No (search only) | https://azmirror.com/2026/08/31/kris-mayes-targets-ai-data-centers-as-arizona-faces-water-power-crunch/ |
| 34 | Arizona governor launches AI initiative to cut $100 million in state waste | Arizona's Family | Phoenix, AZ | TV | 2026-03-14 | Government use of AI | Repeats official savings target | No | No (search only) | https://www.azfamily.com/2026/03/14/arizona-governor-launches-ai-initiative-cut-100-million-state-waste/ |
| 35 | AI home-selling platform launches in Arizona, offering flat-fee alternative | Arizona's Family | Phoenix, AZ | TV | 2026-07-23 | Consumer / business | Reads like a product launch press release | No | No (search only) | https://www.azfamily.com/2026/07/23/ai-home-selling-platform-launches-arizona-offering-flat-fee-alternative/ |
| 36 | 'Dad, they've got me': Vancouver dad feared for daughter's life after scammers used AI to clone her voice | KGW | Portland, OR / Vancouver, WA | TV | n.d. | Scams / deepfakes | Single anecdote; is AI use confirmed? | No | No (search only) | https://www.kgw.com/article/news/local/vancouver/vancouver-dad-feared-for-daughters-life-scammers-used-ai-to-clone-her-voice/283-ada0a129-da03-43d3-9abb-a1695fa12614 |
| 37 | St. Louis County man says scam callers faked his daughter's voice with AI | KSDK | St. Louis, MO | TV | n.d. | Scams / deepfakes | "Says"; attribution of AI unverified | No | No (search only) | https://www.ksdk.com/article/news/investigations/st-louis-county-man-targeted-by-ai-scam-that-impersonated-his-daughters-voice/63-e13905d9-a76e-4b5c-8357-3926a036ae04 |
| 38 | Scammers using AI to target seniors with fake crisis calls, officials warn | WBIR | Knoxville, TN | TV | n.d. | Scams / deepfakes | Official warning; consumer-safety piece | No | No (search only) | https://www.wbir.com/article/news/local/scammers-ai-target-seniors-fake-crisis-calls/51-eca14fda-c541-49e2-8d2c-5510605d8720 |
| 39 | Content creator warns of deepfake scam after AI uses her image to sell life insurance | FOX19 | Cincinnati, OH | TV (video) | 2026-03-09 | Scams / deepfakes | Personal testimony; video only | No | No (search only) | https://www.fox19.com/video/2026/03/09/content-creator-warns-deepfake-scam-after-ai-uses-her-image-sell-life-insurance/ |
| 40 | NYC to ban student AI tools in 2-K through 8th grade and limit classroom screen time | Chalkbeat New York | New York, NY | Digital (nonprofit) | 2026-09-02 | AI in schools | Specialist education reporting; strong baseline | No | No (search only) | https://www.chalkbeat.org/newyork/2026/09/02/nyc-schools-to-set-ai-policy-ban-screen-time-limits/ |
| 41 | Illinois State Board of Education issues AI guidance to teachers | Chalkbeat Chicago | Chicago, IL | Digital (nonprofit) | 2026-07-10 | AI in schools | Straight policy news; low hype | No | No (search only) | https://www.chalkbeat.org/chicago/2026/07/10/illinois-teachers-get-guidance-on-how-to-use-ai-in-schools/ |
| 42 | NYC and LA are restricting AI in schools. What will San Francisco do? | San Francisco Standard | San Francisco, CA | Digital | 2026-09-03 | AI in schools | Comparative framing across three cities | Unknown | No (search only) | https://sfstandard.com/2026/09/03/la-nyc-sf-ai-policy/ |
| 43 | So, is AI going to kill us? 11 experts, 11 answers. | San Francisco Standard | San Francisco, CA | Digital | 2026-09-21 | AI risk | Opinion roundup; alarm vs. evidence test | Unknown | No (search only) | https://sfstandard.com/2026/09/21/experts-ai-doom/ |
| 44 | Newsom Orders California Agencies to Develop New AI Safety Plans After Rejecting Tougher Law | KQED | San Francisco, CA | Radio | n.d. (2026) | State AI policy | "Catastrophic harms" language; check attribution | No | No (search only) | https://www.kqed.org/news/12100624/newsom-orders-california-agencies-to-develop-new-ai-safety-plans-after-rejecting-tougher-law |
| 45 | Chatbots, Data Centers and Surveillance: 5 Silicon Valley Bills Land on Newsom's Desk | KQED | San Francisco, CA | Radio | n.d. (2026) | State AI law | Legislative explainer | No | No (search only) | https://www.kqed.org/news/12097632/chatbots-data-centers-and-surveillance-5-silicon-valley-bills-land-on-newsoms-desk |
| 46 | Palm Beach County commissioners put a halt on massive artificial intelligence data centers | WLRN | Miami / Palm Beach, FL | Radio | 2026-08-27 | Data centers / local government | Straight vote coverage | No | No (search only) | https://www.wlrn.org/government-politics/2026-08-27/palm-beach-county-artificial-intelligence-data-centers |
| 47 | OpenAI, Anthropic and other artificial intelligence companies hire Tennessee lobbyists | Tennessee Lookout | Nashville, TN | Digital (nonprofit) | 2026-09-24 | Lobbying / state policy | Public-records based | No | No (search only) | https://tennesseelookout.com/2026/09/24/openai-anthropic-and-other-artificial-intelligence-companies-hire-tennessee-lobbyists/ |
| 48 | Florida Speaker kills DeSantis' AI regulation, vaccine repeal bills on first day of special session | Florida Phoenix | Tallahassee, FL | Digital (nonprofit) | 2026-04-28 | State AI law | Political process reporting | No | No (search only) | https://floridaphoenix.com/2026/04/28/florida-speaker-kills-desantis-ai-regulation-vaccine-repeal-bills-on-first-day-of-special-session/ |
| 49 | Gov. Landry, Meta formally announce Louisiana data center's historic expansion | KNOE | Monroe, LA | TV | 2026-07-13 | Data centers / investment | Announcement coverage; likely repeats press release | No | No (search only) | https://www.knoe.com/2026/07/13/gov-landry-meta-formally-announce-louisiana-data-centers-historic-expansion/ |
| 50 | Meta data center in Richland Parish brings jobs, tax growth to northeast Louisiana | WAFB | Baton Rouge, LA | TV | 2026-07-29 | Data centers / jobs | Booster framing; check job/tax figures | No | No (search only) | https://www.wafb.com/2026/07/29/meta-data-center-richland-parish-brings-jobs-tax-growth-northeast-louisiana/ |
| 51 | Louisiana PSC allows Meta to keep Richland Parish data center details confidential | WVUE FOX 8 | New Orleans, LA | TV | 2026-08-13 | Data centers / transparency | Accountability counterpoint to #49–50 | No | No (search only) | https://www.fox8live.com/2026/08/13/louisiana-psc-allows-meta-keep-richland-parish-data-center-details-confidential/ |
| 52 | Data centers bring change to rural communities in America | WVUE FOX 8 | New Orleans, LA | TV | 2026-09-24 | Data centers / rural | Possibly syndicated feature; check origin | No | No (search only) | https://www.fox8live.com/2026/09/24/how-data-centers-shift-landscape-rural-communities/ |
| 53 | Despite lawsuit, Minnesota's nudification law is in effect | MPR News | St. Paul, MN | Radio | 2026-08-04 | Deepfakes / state law | Legal reporting; "first state" claim to check | No | No (search only) | https://www.mprnews.org/story/2026/08/04/despite-lawsuit-minnesotas-nudification-law-is-in-effect |
| 54 | In Minneapolis, OpenAI executive talks about need to 'pace the frontier' on AI development | KARE 11 | Minneapolis, MN | TV | n.d. (2026) | AI industry / risk | Company executive quoted; interested party | No | No (search only) | https://www.kare11.com/article/news/local/in-minneapolis-openai-executive-talks-about-need-to-pace-the-frontier-on-ai-development/89-8bcce791-02ef-4b5b-a982-1ec92940c92e |
| 55 | AI slop hits the Minnesota campaign trail | Star Tribune | Minneapolis, MN | Paper | n.d. (2026) | Elections / deepfakes | Loaded term ("slop"); check examples | Yes (metered) | No (search only) | https://www.startribune.com/ai-slop-hits-the-minnesota-campaign-trail/601884635 |
| 56 | As Pennsylvania implements AI tools for government employees, efficiency is the goal, not job cuts | Philadelphia Inquirer | Philadelphia, PA | Paper | 2026-08-10 | Government use of AI / jobs | Headline echoes the official line | Yes (metered) | No (search only) | https://www.inquirer.com/politics/pennsylvania/pennsylvania-state-government-employees-ai-tools-protections-20260810.html |
| 57 | PA's AI boom is repeating old patterns of exploitation | Spotlight PA | Harrisburg, PA | Digital (nonprofit) | 2026-09 | Data centers / economy | Report-based critical framing; check report | No | No (search only) | https://www.spotlightpa.org/news/2026/09/pennsylvania-ai-data-center-exploitation-environment |
| 58 | Developer sues Upper Merion Township over rejected King of Prussia data center proposals | Philadelphia Inquirer | King of Prussia, PA | Paper | 2026-09-18 | Data centers / local government | Court-filing based; low hype | Yes (metered) | No (search only) | https://www.inquirer.com/news/pennsylvania/data-centers-upper-merion-township-lawsuit-20260918.html |
| 59 | Data center backlash unites some Missouri and Kansas towns against lawmakers and big tech | KCUR | Kansas City, MO | Radio | 2026-09-02 | Data centers / community | Multi-town reporting | No | No (search only) | https://www.kcur.org/housing-development-section/2026-09-02/data-center-backlash-missouri-kansas |
| 60 | Kansas City's AI data center building boom could hurt regional job market in the long term | KCUR | Kansas City, MO | Radio | 2026-03-22 | Data centers / jobs | Forecast ("could"); check the basis | No | No (search only) | https://www.kcur.org/housing-development-section/2026-03-22/kansas-citys-ai-data-center-building-boom-could-hurt-regional-job-market-in-the-long-term |
| 61 | Indiana's data center boom: Growth, debate and the high cost of powering AI | WTHR | Indianapolis, IN | TV | n.d. | Data centers / energy | Pros and cons feature | No | No (search only) | https://www.wthr.com/article/money/business/indiana-data-center-boom-growth-debate-and-the-high-cost-of-powering-ai-tech-google-amazon-business-money/531-babfc1d1-ae63-4282-8c70-5b823c506923 |
| 62 | In a Wisconsin land rush, data centers made them millionaires | Wisconsin Watch | Madison, WI | Digital (nonprofit) | 2026-07 | Data centers / land | Property-records reporting | No | No (search only) | https://wisconsinwatch.org/2026/07/wisconsin-land-rush-data-centers-millionaires-port-washington-properties/ |
| 63 | 'This is a time to negotiate': Recent AI data center deals signal boom for some Wisconsin businesses | WPR | Madison, WI | Radio | n.d. (2026) | Data centers / business | Company deal figures (e.g. Generac) | No | No (search only) | https://www.wpr.org/news/recent-ai-data-center-deals-signal-boom-for-wisconsin-businesses |
| 64 | Tech giants announce $7B data center, Michigan's first hyperscale campus | Bridge Michigan | Detroit/Lansing, MI | Digital (nonprofit) | n.d. (2025–26) | Data centers | Announcement; value figure attributed to WSJ | No | No (search only) | https://bridgemi.com/michigan-environment-watch/dte-consumers-advance-plans-for-power-hungry-data-centers-in-michigan/ |
| 65 | Columbus will become second-largest data center hub in the Great Lakes region, report says | WVXU | Cincinnati, OH | Radio | 2026-01-19 | Data centers | "Report says"; forecast attribution | No | No (search only) | https://www.wvxu.org/2026-01-19/columbus-will-become-second-largest-data-center-hub-in-the-great-lakes-region-report-says |
| 66 | NC bill would steer $10 million to Khan Academy for AI tool of debatable value | NC Newsline | Raleigh, NC | Digital (nonprofit) | 2026-06-01 | AI in schools / spending | Skeptical headline; check evidence cited | No | No (search only) | https://ncnewsline.com/2026/06/01/nc-bill-would-steer-10-million-to-khan-academy-for-ai-tool-of-debatable-value/ |
| 67 | NC commerce secretary says state needs to capitalize on AI boom | WFAE | Charlotte, NC | Radio | 2026-08-18 | Economic development | Official optimism; "boom" framing | No | No (search only) | https://www.wfae.org/2026-08-18/nc-commerce-secretary-says-state-needs-to-capitalize-on-ai-boom |
| 68 | 'AI is for everyone:' NC Central opens artificial intelligence institute | WUNC | Durham, NC | Radio | 2026-08-10 | Higher education | "First of its kind" institutional claim | No | No (search only) | https://www.wunc.org/education/2026-08-10/nc-central-artificial-intelligence-institute |
| 69 | Accuracy concerns with AI weapon detection systems | 11Alive (WXIA) | Atlanta, GA | TV | n.d. | School safety / AI detection | Skeptical, expert-sourced; cites FTC–Evolv case | No | No (search only) | https://www.11alive.com/article/news/education/metro-atlanta-schools-weapon-detection-tech-experts-question-accuracy/85-f1ce683b-31a7-45a7-8a9f-9296ce95d940 |
| 70 | DeKalb County credits weapon detection system with stopping weapon from getting into school | WSB-TV | Atlanta, GA | TV | n.d. | School safety / AI detection | Relies on district's own claim; pair with #69 | No | No (search only) | https://www.wsbtv.com/news/local/dekalb-county/dekalb-county-credits-new-technology-with-stopping-weapon-getting-into-school/KC6ZI7R7AVCMJNAIUFYK7B4RGE/ |
| 71 | Kenston Local School District installs AI gun detection software with ZeroEyes | WKYC | Cleveland, OH | TV | n.d. | School safety / AI detection | Vendor description of how it works | No | No (search only) | https://www.wkyc.com/article/news/education/education-station/kenston-local-school-district-ai-gun-detection-software-zeroeyes-security-cameras/95-d4e422ac-490b-4cc6-a909-c74d25791a20 |
| 72 | City of Austin rolling out new AI system, speeding up zoning review process for developers | KXAN | Austin, TX | TV | n.d. | Local government use of AI | Efficiency claims from city/vendor | No | No (search only) | https://www.kxan.com/news/local/austin/city-of-austin-rolling-out-new-ai-system-speeding-up-zoning-review-process-for-developers/ |
| 73 | More than 2,000 calls a day: Inside San Antonio's 311 operation | Texas Public Radio | San Antonio, TX | Radio | 2026-08-11 | Local government use of AI | Department-supplied metrics on AI assistant | No | No (search only) | https://www.tpr.org/public-health/2026-08-11/more-than-2-000-calls-a-day-inside-san-antonios-311-operation |
| 74 | Nevada pursues limited regulation on AI despite Trump's warning against it | The Nevada Independent | Las Vegas/Reno, NV | Digital (nonprofit) | n.d. (2026) | State AI law | Policy context; low hype | No | No (search only) | https://thenevadaindependent.com/article/nevada-pursues-limited-regulation-on-ai-despite-trumps-warning-against-it |
| 75 | Washington passes new AI laws to crack down on misinformation, protect minors | KUOW | Seattle, WA | Radio | 2026-03 | State AI law | Straight legislative news; compare with #24 | No | No (search only) | https://www.kuow.org/stories/washington-passes-new-ai-laws-to-crack-down-on-misinformation-protect-minors |
| 76 | Oregon Employment Department will implement some AI tools as it works to improve service | OPB | Portland, OR | Radio | 2026-03-05 | Government use of AI | Agency plans; promise vs. result | No | No (search only) | https://www.opb.org/article/2026/03/05/oregon-employment-department-ai/ |
| 77 | University of Utah will offer a new bachelor's degree in artificial intelligence | Salt Lake Tribune | Salt Lake City, UT | Paper | 2026-06-12 | Higher education | Institutional announcement | Yes (metered) | No (search only) | https://www.sltrib.com/news/education/2026/06/12/university-utah-will-offer-new/ |

### Suggested calibration picks

These are hypotheses to confirm after reading each article.

- **Probably strong and low-hype:** #3, #14, #28, #29, #40, #47, #58, #62, #69.
- **Likely company or official framing repeated (repeats company claim):** #25 (Microsoft "world's first AI superfactory"), #26, #34, #35, #49, #50, #56, #67.
- **Alarming but possibly well supported:** #21 (wrongful facial-recognition arrest), #20, #51, #57.
- **Possible hype or overheated framing:** #31 (call-center jobs), #43 (AI "kill us"), #55 ("AI slop"), #60 ("could hurt" jobs).
- **Same event from different outlets:**
  - #10 and #11 (Illinois AI cabinet)
  - #49, #50 and #51 (Meta in Louisiana)
  - #28 and #29 (OpenAI in Georgia)
  - #69 and #70 (weapon detection)
  - #24 and #75 (Washington laws)
- **Anecdote-driven scam stories (AI attribution may be unverified):** #36, #37, #39.

## One-sentence summaries

These are paraphrased from search-result snippets only, not from the articles.

1. Massachusetts districts such as Boston, Lexington and Medfield are writing their own AI classroom policies in the absence of uniform guidance.
2. A new report says Oregon's 111 data centers use nearly a quarter of the state's electricity.
3. A proposed data center in rural East Texas has residents preparing for major change.
4. Google announced about $40 billion in Texas data center investment.
5. As local opposition grows, tech companies are spending heavily on lobbying in California over data center rules.
6. Western Pennsylvania communities are trying approaches meant to make data center development more acceptable locally.
7. Chicago's mayor proposed a one-year pause on new data centers so a task force can study air, water and energy impacts.
8. Small data center projects in Minnesota are feeding wider public skepticism about AI, according to polling.
9. A pro-data-center industry party in D.C. took place amid national backlash.
10. Governor Pritzker created an Illinois AI Cabinet to assess risks to residents and critical infrastructure.
11. Block Club Chicago's version of the AI Cabinet story, framed around calls for more regulation.
12. Some Chicago small businesses and local startups are expanding their use of AI tools.
13. A WBEZ talk segment on how AI is affecting Chicago jobs, including a Chicago Fed view that change is likelier than outright loss.
14. Connecticut laws taking effect October 1 include AI and license-plate-camera provisions.
15. Connecticut's legislature passed a broad AI law covering frontier models, youth chatbot safeguards and employer notices.
16. A Colorado compromise bill would drop a requirement that companies explain how their AI decision systems work and delay the law.
17. An update on Colorado data center proposals, local moratoriums and pollution concerns.
18. Austin activists opposing Flock license-plate cameras are organizing for statewide action.
19. Delaware police praise Flock AI license-plate readers while critics raise concerns.
20. New Bedford councilors want Flock cameras removed after alleged misuse, but removal may not happen.
21. A Tennessee woman was jailed for months after an AI facial-recognition match linked her to crimes in North Dakota.
22. JPS hospital in Fort Worth is working with ZeroEyes to use AI to detect guns on camera.
23. Doctors and experts question a Utah pilot that lets an AI chatbot handle prescription refills.
24. Washington enacted a chatbot safety law requiring self-harm detection and crisis referrals.
25. Microsoft announced an Atlanta data center it describes as part of the world's first "AI superfactory."
26. OpenAI plans a large Georgia data center with Georgia Power, starting in 2028.
27. CBRE data show metro Atlanta overtook Northern Virginia in data center construction in the first half of 2026.
28. The AJC traces how OpenAI's $20 billion Effingham County data center plan came together out of public view.
29. WABE examines the confidential dealmaking behind a coastal Georgia data center.
30. An explainer on how Virginia became the world's largest data center hub and what it has meant.
31. Arizona's roughly 90,000 call-center workers face uncertainty as AI handles more customer service.
32. Arizona parents and teachers raise concerns about classroom AI in the absence of statewide rules.
33. Arizona's attorney general calls for no new AI data centers given water and power constraints.
34. Governor Hobbs launched an AI initiative aimed at finding $100 million in state waste over three years.
35. An AI-based home-selling platform offering flat fees launched in Arizona.
36. A Vancouver, Washington father describes a scam call that used an AI-cloned version of his daughter's voice.
37. A St. Louis County man says scammers used AI to fake his daughter's voice.
38. East Tennessee officials warn that scammers use AI to target seniors with fake emergency calls.
39. A content creator warns that AI-generated videos used her likeness to sell life insurance.
40. NYC will ban student-facing generative AI tools in 2-K through 8th grade and limit classroom screen time.
41. The Illinois State Board of Education issued guidance to help districts write classroom AI policies.
42. With NYC and LA restricting AI in schools, San Francisco is only starting to set its policy.
43. The SF Standard asked 11 experts whether AI poses an existential threat.
44. Newsom directed state agencies to draft AI safety plans after declining to sign a stricter bill.
45. Five Bay Area AI bills on chatbots, data centers and surveillance reached Newsom's desk.
46. Palm Beach County commissioners voted 7-0 for a one-year moratorium on large AI data centers.
47. OpenAI, Anthropic and other AI firms registered Tennessee lobbyists for the first time.
48. Florida's House Speaker blocked DeSantis's AI regulation push at a special session.
49. Governor Landry and Meta announced a major expansion of the Richland Parish data center.
50. WAFB reports the Meta data center is bringing jobs and tax revenue to northeast Louisiana.
51. Louisiana regulators allowed Meta to keep details of its data center confidential.
52. A feature on how data centers are changing rural US communities.
53. Minnesota's ban on AI "nudification" tools is in effect despite a lawsuit from xAI.
54. An OpenAI executive in Minneapolis spoke about the need to "pace the frontier" of AI development.
55. AI-generated imagery is spreading through Minnesota's midterm campaigns.
56. Pennsylvania has expanded AI tools to more than 3,000 state employees and says the goal is efficiency, not job cuts.
57. A report cited by Spotlight PA finds little evidence of job growth from Pennsylvania's data center boom.
58. A developer is suing Upper Merion Township after it rejected King of Prussia data center proposals.
59. Towns in Missouri and Kansas are pushing back against data centers, their lawmakers and big tech.
60. KCUR reports that Kansas City's data center construction boom could weaken the regional job market over time.
61. A WTHR overview of Indiana's data center growth, the debate around it and its power costs.
62. Some Wisconsin landowners became millionaires by selling land for data centers.
63. Wisconsin suppliers such as Generac are landing large contracts tied to AI data centers.
64. OpenAI, Oracle and Related Digital were revealed as developers of a proposed Michigan hyperscale campus.
65. A report projects Columbus will become the Great Lakes region's second-largest data center hub.
66. A North Carolina bill would send $10 million to Khan Academy for an AI tool whose value is debated.
67. North Carolina's commerce secretary says the state should capitalize on the AI boom.
68. NC Central University opened an AI institute that it describes as the first of its kind at an HBCU.
69. Experts question the accuracy of AI weapon-detection systems used in metro Atlanta schools.
70. DeKalb County schools credit their weapon-detection system with stopping a weapon from entering a school.
71. Kenston schools in Ohio installed ZeroEyes AI gun-detection software on their cameras.
72. Austin is rolling out an AI system to speed up zoning and plan review.
73. San Antonio's 311 center uses an AI virtual assistant that the city says resolves about 20,000 extra calls a month.
74. Nevada is pursuing narrow, sector-specific AI rules despite federal pressure against state regulation.
75. Washington passed laws on AI chatbot disclosures, content provenance and protections for minors.
76. Oregon's Employment Department plans to use AI tools, including a public-facing chatbot, to improve service.
77. The University of Utah will offer a bachelor's degree in artificial intelligence.

## Good local sources with AI coverage

Having an RSS feed **does not mean permission** to use the content in the app. Check each publisher's terms. Many nonprofit newsrooms (States Newsroom, Texas Tribune, CalMatters) publish Creative Commons or republication policies, which are worth reading first for eligibility.

Only feed URLs that appeared in search results are listed. **None were fetched or verified.**

| Outlet | Region | Why it's useful | RSS (from search results, unverified) |
|---|---|---|---|
| CalMatters | California | Strong data center, AI-law and lobbying coverage | `https://calmatters.org/feed` |
| KQED | Bay Area, CA | Frequent AI policy and Silicon Valley coverage | `https://ww2.kqed.org/news/feed` |
| Texas Tribune | Texas | Data centers and grid | `feeds.texastribune.org` (exact path not confirmed) |
| OPB | Oregon | Data centers, state AI rules | Feed index page: https://www.opb.org/rss-feeds/ |
| Colorado Public Radio | Colorado | Data centers, AI law | https://www.cpr.org/feed/ |
| Colorado Sun | Colorado | Detailed AI-law coverage | `coloradosun.com/feed` |
| States Newsroom network (Arizona Mirror, Florida Phoenix, Tennessee Lookout, Virginia Mercury, NC Newsline, Georgia Recorder, Kansas Reflector, Iowa Capital Dispatch, Indiana Capital Chronicle, SC Daily Gazette, Source NM and others) | Many states | Consistent statehouse AI and data center coverage | Feed index page: https://statesnewsroom.com/rss-feeds/ |
| KOAA News5 | Colorado Springs, CO | Local TV example with public RSS | https://www.koaa.com/news/rss |
| WBUR | Massachusetts | AI in schools, Flock cameras, data centers | Not found |
| WBEZ / Chicago Sun-Times | Chicago | AI Cabinet, workers, small business | Not found |
| Block Club Chicago | Chicago | Neighborhood angle on state AI policy | Not found |
| CT Mirror | Connecticut | Comprehensive CT AI-law coverage | Not found |
| Chalkbeat | NYC, Chicago, others | Best education/AI policy coverage | Not found (a search snippet only mentioned a Chalkbeat Colorado feed without a URL) |
| KCUR / Iowa Public Radio (Harvest Public Media) | Midwest | Data center backlash in rural Midwest | Not found |
| Wisconsin Watch | Wisconsin | Investigative data center reporting | Not found |
| Spotlight PA | Pennsylvania | Data centers, AI in government | Not found |
| Axios Local (Pittsburgh, Chicago, Twin Cities, Seattle, DC) | Many cities | Short, frequent local AI/data center items | Not found (axios.com also blocked by egress proxy here) |
| AJC / WABE | Georgia | OpenAI/Microsoft data center investigations | Not found (AJC metered) |
| TEGNA TV group (WFAA, KARE 11, KING 5, KGW, KSDK, WBIR, WKYC, 11Alive, WUSA9, 9News, WTHR) | Many markets | Shared "VERIFY" scam explainers plus local stories | Not found |
| Gray TV group (KNOE, WAFB, FOX 8 New Orleans, FOX19, Arizona's Family) | South / Midwest / AZ | Heavy data center and announcement coverage; good for "repeats press release" examples | Not found |
