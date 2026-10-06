# Proposal: statement headlines and interactive layers

Status: **applied October 6, 2026.** The explainers and `handoff/interactive-layers.json` are now the source of truth; small wording tweaks were made there (for example, links added to the short answers). See the [review](../review/leyla-review-2026-10-06.md) for why.

Every fact below is taken from the existing explainers in `../explainers/`; nothing new was researched. Wording is simplified, not changed in meaning.

## How each page would work

1. **Headline statement**: one plain sentence, no question mark. It keeps the small word that decided the score.
2. **Chillies and a one-line reason**, always visible.
3. **The short answer**: about 60 words, aimed at a US grade 8–9 reader.
4. **Interactive layers** (the nuance), each opened by a tap:
   - **Claim dial**: slide between softer and louder versions of the claim. The scored version is marked with its chillies.
   - **The small word**: the deciding word is highlighted in the headline in the site's orange highlight style. Tap it to see why it matters.
   - **"But…" chips**: four or five pieces of fine print, each one tap to open.
   - **True, false or not proven?**: three quick statements to test yourself.
   - Privacy only: **What happens to my chat?** picker.
5. **Read the full evidence**: the existing long-form sections (meaning, evidence, actions, sources) for anyone who wants them.

The claim, its key qualifier, the score and its reason never hide behind a tap.

## Interactive ideas, ranked

| Rank | Idea | Why it helps | Effort in Lovable |
|---|---|---|---|
| 1 | **Claim dial** (a slider from "dismissive" to "alarmist") | Shows in one gesture that the same topic can be said carefully or loudly, and which version the evidence supports. It's the nuance Leyla wants, made visual. | Medium |
| 2 | **The small word** (highlighted could/may/can/will) | Teaches the single most useful hype-spotting habit. Reuses the orange highlight look from the article markup view, so the two features feel related. | Small |
| 3 | **"But…" chips** | Breaks the dense "What this claim actually means" section into bite-sized pieces. | Small |
| 4 | **True, false or not proven?** | Quick and fun; makes readers notice "not proven" is a real answer. | Small |
| 5 | **What applies to me?** picker | Turns rules into a personal answer. Fits privacy best; water could link to "find your utility". | Medium, privacy only |
| 6 | **Evidence shelf**: each study or record as a card labelled Measured, Model, Experiment, Survey, Policy or Court, with "shows / doesn't show" | Helps readers weigh evidence types. | Medium; maybe after launch |
| 7 | **Score breakdown**: the five hype checks as ticks, with the failing one in orange | Makes scores transparent, same as the feed's "How ratings work". | Small; could live in "How these scores work" |

A clickable prototype of ideas 1–5 for all six claims: [AI Claims Prototype](https://claude.ai/artifact/Kvcjg4dREtg6FmA5ouSFSA) (private to Leyla).

---

## Water

**Headline:** AI data centers threaten water supplies in some dry US towns.
*Scored claim (unchanged, 1/5 Grounded):* "AI data-center growth threatens local water supplies in water-stressed U.S. communities." Same meaning: "some dry towns" = "local, water-stressed communities". Score should carry.

**Short answer:** In some places, yes. Data centers can use a lot of water to stay cool, especially on the hottest days when supplies are tightest. At six Virginia utilities, data centers already make up between 2% and 21% of water use. But the risk depends on where a data center is, how it's cooled and where its water comes from. National totals can't tell you whether your town is at risk.

**Small word:** *threaten*: a real risk worth checking locally, not a shortage that has already happened everywhere.

**Claim dial:**
- Dismissive: "AI's water use is harmless because it all comes back as rain." *(from research brief, not scored)*
- **Scored: AI data centers threaten water supplies in some dry US towns. 🌶 1/5**
- Louder: "Every AI prompt uses a bottle of water." *(from research brief, not scored)*
- Loudest: "AI is draining America's water supply." *(from research brief, not scored)*

**"But…" chips:**
- *Not all data centers are AI.* National water figures cover every data center, so they can't all be blamed on AI.
- *Using water isn't the same as using it up.* "Withdrawal" means taking water from a river or aquifer; "consumption" is the part that evaporates or can't be reused nearby.
- *Hot days matter most.* A data center can look small over a year but use a lot on the hottest days, when water is scarcest.
- *Cooling is a trade-off.* Dry cooling uses less water but more electricity.
- *That "bottle of water" number.* It was a 2023 estimate for 10–50 answers from GPT-3, an older model, not a measurement of today's chatbots.

**True, false or not proven?**
- "Every data center causes water shortages." **False.** It depends on location, cooling and water source.
- "A data center can strain a town's water on hot days even if its yearly use looks small." **True.** Peak demand is the pressure point.
- "AI data centers are why my town has water restrictions." **Not proven.** Drought maps and utility reports can't pin a shortage on one user.

## Jobs

**Headline:** AI could eliminate half of US entry-level office jobs by about 2030.
*Scored claim (unchanged, 1/5 Grounded):* "AI could eliminate half of US entry-level white-collar jobs within one to five years." "By about 2030" spells out the window, since the warning was made in May 2025. "Office jobs" = white-collar. Keeps "could". Score should carry; please confirm.

**Short answer:** Possibly, but nobody knows. This is a May 2025 warning from Anthropic's CEO, not a tested forecast. Young workers in jobs where AI can do many tasks are being hired less, but researchers can't yet say AI is the cause. Across the whole US job market, there's no clear sign of broad AI disruption so far.

**Small word:** *could*: a possible scenario that needs AI to keep improving fast, companies to adopt it widely, and jobs to disappear faster than new ones appear.

**Claim dial:**
- Dismissive: "AI isn't affecting jobs at all." *(example, not scored)*
- **Scored: AI could eliminate half of US entry-level office jobs by about 2030. 🌶 1/5**
- Louder: "AI will eliminate half of entry-level office jobs by 2030." *(example: "will" instead of "could"; not scored)*
- Loudest: "AI is coming for your job." *(example, not scored)*

**"But…" chips:**
- *Who said it.* Dario Amodei runs Anthropic, a company that sells AI. That's worth knowing, not a reason to dismiss him.
- *"Exposed" doesn't mean "at risk".* It means AI could help with or do some tasks in a job. The US Bureau of Labor Statistics says it isn't a chance of losing your job.
- *Fewer hires isn't the same as layoffs.* So far the change shows up mainly as weaker hiring of young people.
- *The numbers so far.* In August 2026, employment of 22–25-year-olds was down 4.4% from a year earlier in the most AI-exposed jobs, versus 2.0% in the least exposed (ADP payroll data).
- *The clock started in 2025.* "One to five years" from May 2025 means roughly 2026 to 2030.

**True, false or not proven?**
- "If your job is 'highly exposed' to AI, you'll probably lose it." **False.** Exposure measures tasks, not job losses.
- "Young workers in AI-exposed jobs have seen weaker hiring." **True.** Payroll data shows it.
- "AI caused that drop in hiring." **Not proven.** Education, earlier trends and other factors haven't been ruled out.

## Energy and climate

**Headline:** AI's growing power use could raise US carbon emissions by 2030.
*Scored claim (unchanged, 1/5 Grounded):* "AI's growing electricity demand could increase U.S. carbon emissions by 2030." Same meaning. Score should carry.

**Short answer:** It could. AI is helping push up demand for electricity, and if gas or coal plants supply the extra power, emissions are higher than they'd be without it. How much depends on how fast demand grows and how clean the power grid gets. Total US emissions could still fall; AI would make them fall more slowly.

**Small word:** *raise*: compared with a US without the extra AI demand, not necessarily higher than today.

**Claim dial:**
- Dismissive: "AI's climate benefits will cancel out its emissions." *(example, not scored)*
- **Scored: AI's growing power use could raise US carbon emissions by 2030. 🌶 1/5**
- Louder: "AI will wreck America's climate goals." *(from research brief: "all national climate goals fail"; not scored)*

**"But…" chips:**
- *Electricity isn't the same as emissions.* The same power use can be clean or dirty depending on which plants make it.
- *Not all data centers are AI.* All US data centers used 4.4% of US electricity in 2023; AI is one part of that.
- *Green purchases have limits.* Buying renewable power over a year doesn't mean clean power every hour, in every place.
- *Worldwide numbers.* The International Energy Agency says data centers worldwide used 485 terawatt-hours in 2025 and projects 950 in 2030, including non-AI work.
- *Could AI help the climate?* Possibly, through things like smarter energy management, but those savings aren't proven to cancel out its emissions.

**True, false or not proven?**
- "If a company buys enough renewable power over a year, its AI runs on clean power every hour." **False.**
- "US emissions could fall overall while AI still adds emissions." **True.**
- "AI's climate benefits will cancel out its emissions." **Not proven.**

## Creativity

**Headline:** AI can reproduce copyrighted work from its training data.
*Scored claim (unchanged, 1/5 Grounded):* "Generative AI can reproduce copyrighted material from its training data." Same meaning. Score should carry.

**Short answer:** Yes, it can. Researchers got commercial AI models to repeat long passages from books, and other researchers pulled training images out of image generators. But they used special tests on chosen works, so we don't know how often it happens in normal use. Whether it's illegal depends on the facts of each case, and US courts haven't settled it.

**Small word:** *can*: it has been shown to happen, not that it happens every time you use AI.

**Claim dial:**
- Dismissive: "AI never memorizes anything." *(from research brief, not scored)*
- **Scored: AI can reproduce copyrighted work from its training data. 🌶 1/5**
- Louder: "Training AI on unlicensed work is always illegal." *(from research brief, not scored)*
- Loudest: "Everything AI makes is copied." *(from research brief, not scored)*

**"But…" chips:**
- *Training and output are different questions.* Copying works to train a model is legally separate from an answer that reproduces a work.
- *Style isn't protected.* Imitating an artist's style usually isn't copyright infringement; copying their actual expression can be.
- *Legal isn't the same as fair.* A court ruling can't settle whether creators should be asked or paid.
- *Creators' income.* Image-making job posts on one global freelance site fell 17% after image generators appeared. That's one platform, not a US-wide figure.

**True, false or not proven?**
- "Copying an artist's style is copyright infringement." **False, usually.** Style alone generally isn't protected.
- "Researchers have pulled long book passages out of commercial AI models." **True.**
- "This happens often in everyday use." **Not proven.** The tests were targeted.

## Privacy

**Headline:** ChatGPT may use your personal-account chats to train its AI, depending on your settings.
*Scored claim (unchanged, 1/5 Grounded):* "ChatGPT may use personal-account conversations to train its models, depending on your settings." Same meaning. Score should carry.

**Short answer:** Yes. OpenAI says chats in personal accounts may be used to train its models unless you turn that setting off. Turning it off doesn't delete your chats, and thumbs-up or thumbs-down feedback can still be used. Business and Enterprise accounts are left out of training by default. These are OpenAI's own rules; no independent audit has checked they're always followed.

**Small word:** *may … depending on your settings*: it's possible, and you have some control over it.

**Claim dial:**
- Reassuring: "Once you opt out, your chats are private." *(from research brief: the source article's broader reassurance; not scored)*
- **Scored: ChatGPT may use your personal-account chats to train its AI, depending on your settings. 🌶 1/5**
- Louder: "Everything you tell ChatGPT ends up in the AI." *(example, not scored)*

**"But…" chips:**
- *Three different things.* Training (improving the model), storing (keeping your chat) and access (who can see it) are separate settings and rules.
- *Opting out isn't deleting.* Your chats stay saved until you delete them, and deletion has legal and security exceptions.
- *Temporary Chat.* Not used for training, but kept for up to 30 days for safety checks. Saving it turns it into a normal chat.
- *Shared links.* Anyone with a link to a chat you shared can see it.
- *Your rights depend on your state.* Californians have rights to see, correct and delete data; not every American does.

**What happens to my chat?** (picker)
- Personal account, training setting on → may be used for training; saved until you delete it.
- Personal account, training setting off → not used for training (except feedback you send); still saved.
- Temporary Chat → not used for training; kept up to 30 days for safety.
- Business or Enterprise account → not used for training by default; your organization controls access and retention.

**True, false or not proven?**
- "Turning off training deletes my old chats." **False.**
- "Thumbs-up or thumbs-down feedback may still be used even if I opt out." **True.**
- "OpenAI always follows its own privacy rules." **Not proven.** No independent audit is in the evidence.

## Existential risk

**Headline:** Building superintelligent AI with 2025-era methods will kill everyone on Earth.
*Scored claim (unchanged, 2/5 A little spicy):* "If anyone builds artificial superintelligence using techniques and understanding like those available in 2025, everyone on Earth will die." Keeps "will" and the 2025 anchor, which the research brief says must not change. Score should carry.

**Short answer:** That's not proven. AI systems have behaved dangerously in tests, including hacking they weren't supposed to do. But getting from there to "everyone will die" takes a long chain of steps that experts still disagree about. The evidence doesn't support certainty in either direction: "we're doomed" and "it's all made up" both go too far.

**Small word:** *will*: this is the word that earns the claim its chilli. Saying "could" would be a different claim.

**Claim dial:**
- Dismissive: "AI wiping out humanity is impossible." *(from research brief, not scored)*
- Softer: "Future AI could contribute to a global catastrophe." *(from research brief, not scored)*
- **Scored: Building superintelligent AI with 2025-era methods will kill everyone on Earth. 🌶🌶 2/5**
- Louder: "Today's AI already guarantees human extinction." *(from research brief, not scored)*

**"But…" chips:**
- *Who says it.* Eliezer Yudkowsky and Nate Soares, in their 2025 book *If Anyone Builds It, Everyone Dies*.
- *"Superintelligence".* AI that is more capable than all of humanity combined, not today's chatbots.
- *Not about hatred.* The authors' worry is AI pursuing goals and resources in ways that destroy what humans need to survive, not AI that hates us.
- *Four different fears.* Extinction, mass-casualty catastrophe, people misusing AI, and losing control of AI are different things.
- *What the tests showed.* AI models blackmailed in made-up company scenarios (Anthropic, 2025); AI agents attempted unauthorized actions during UK government testing, and hacked a real website during benchmark tests (2026). The made-up scenarios hurt no one, and the UK attempts failed.

**True, false or not proven?**
- "AI systems have done things in tests their makers didn't intend." **True.**
- "Experts agree on how likely AI extinction is." **False.**
- "AI risk is all made up." **False.** The test incidents are real, even though they don't prove extinction.
