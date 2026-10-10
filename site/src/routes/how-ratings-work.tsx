import { ogImage } from "@/lib/og";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Chillies, Flags, HYPE_WORDS, GAPS_WORDS } from "@/components/RatingIcons";
import { HYPE_SECTIONS, GAPS_SECTIONS } from "@/lib/rating/scoring";

const TITLE = "How the ratings work · Decoding the Hype";
const DESC = "What our hype and evidence-gap ratings mean and how we score them.";

export const Route = createFileRoute("/how-ratings-work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      ...ogImage,
    ],
  }),
  component: HowRatingsWork,
});

const QUESTIONS: Record<string, string> = {
  H1: "Does the headline match what the story actually shows, without treating someone's claim as settled fact?",
  H2: "Does the headline keep any uncertainty, such as \"may\", \"could\" or \"says\"?",
  H3: "Is the headline free of teasers, bait questions and shock words like \"world's first\"?",
  P1: "Does the story avoid sounding surer than its source, for example turning \"may reduce\" into \"reduces\"?",
  P2: "Does the story keep the finding to its real size, without stretching a small test into a big conclusion?",
  P3: "Are predictions presented as predictions, not as certain?",
  W1: "Is the language free of exaggerated or promotional words, in either direction?",
  W2: "Does the story avoid describing AI as if it had human thoughts or intentions, or as acting on its own?",
  T1: "Are the people and organizations quoted named?",
  T2: "Is there at least one independent expert, someone not from the company, its funders or the study's authors?",
  T3: "Are any conflicts of interest disclosed?",
  T4: "Does the article link to its main source (the study, report or announcement it rests on)?",
  T5: "Does the story check its main claims, instead of just repeating what someone said?",
  S1: "Do the key claims rest on something a reader could check, like a study, data or an official record?",
  S2: "Is the evidence strong enough for a claim this big?",
  S3: "Are the key numbers explained: where they come from and what they measure?",
  S4: "Is there independent confirmation, such as another study, expert or record?",
  C1: "Does the story say what's still unproven or uncertain about the main claim?",
  C2: "Does it give the background a reader needs: what came before, who's involved and how big it is?",
  C3: "Are technical terms explained, or plain words used instead of jargon?",
  C4: "Is it clear whether the piece is news, opinion, analysis or a forecast?",
};

const HYPE_ROWS = [
  ["Says what's known, with the right amount of caution.", "Small study finds AI tool matched doctors on one type of scan"],
  ["Mostly careful, with a phrase or two that goes further than the evidence.", "AI tool matches doctors at reading scans, study finds"],
  ["Noticeably stronger than the evidence in places: a stretched finding, a prediction told as fact, or loaded words.", "AI could soon read your scans better than your doctor"],
  ["The main claim goes well beyond what's known, often starting in the headline.", "AI beats doctors at diagnosis"],
  ["Almost every claim oversells. Little of the caution the evidence calls for survives.", "Revolutionary AI will make radiologists obsolete"],
];
const GAPS_ROWS = [
  "Names its sources, links the original, brings in someone independent and says what's still unproven.",
  "Well supported, with one or two things missing, such as an independent expert.",
  "Leans heavily on one side's own figures or statements, though a reader could still check some of it.",
  "Big claims rest mostly on what the people involved say, with little anyone else has checked.",
  "The main claims rest on nothing a reader could check, such as an unlinked statement from the company itself.",
];

const TOC = [
  ["short-version", "The short version"],
  ["two-ratings", "Why two ratings, not one"],
  ["hype", "Hype: the chili scale"],
  ["evidence-gaps", "Evidence gaps: the flag scale"],
  ["checks", "The 21 checks behind the ratings"],
  ["calculation", "How the checklist becomes a rating"],
] as const;

const card = "rounded-[14px] border border-border bg-card p-5 sm:p-6";
const label = "text-xs font-bold uppercase tracking-wider text-muted-foreground";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-6 flex flex-col gap-4">
      <h2 id={`${id}-h`} tabIndex={-1} className="outline-none font-display text-[24px] font-bold leading-tight sm:text-[28px]">{title}</h2>
      {children}
    </section>
  );
}

function Scale({ kind }: { kind: "hype" | "gaps" }) {
  const words = kind === "hype" ? HYPE_WORDS : GAPS_WORDS;
  return (
    <ol className="flex flex-col gap-3">
      {[1, 2, 3, 4, 5].map((n) => (
        <li key={n} className={`${card} grid gap-3 sm:grid-cols-[150px_1fr] sm:items-start`}>
          <div className="flex flex-col gap-1.5">
            {kind === "hype" ? <Chillies n={n} size={22} /> : <Flags n={n} size={22} />}
            <p className="font-bold">{n} · {words[n]}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>{kind === "hype" ? HYPE_ROWS[n - 1]![0] : GAPS_ROWS[n - 1]}</p>
            {kind === "hype" && (
              <p className="text-sm text-muted-foreground"><span className={label}>Example</span> <span className="font-display italic text-foreground">"{HYPE_ROWS[n - 1]![1]}"</span></p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

const QUADRANTS = [
  { title: "Calm and well sourced", example: "\u201cSmall study finds AI tool matched doctors on one type of scan,\u201d with a link to the study and an independent expert", hype: 1, gaps: 1 },
  { title: "Calm but thinly sourced", example: "\u201cCompany says its new AI assistant saves staff an hour a day\u201d", hype: 1, gaps: 5 },
  { title: "Hyped but well sourced", example: "\u201cAI beats doctors at diagnosis,\u201d headline on a story that links the peer-reviewed study", hype: 4, gaps: 1 },
  { title: "Hyped and unsupported", example: "\u201cRevolutionary AI will make radiologists obsolete, says its maker\u201d", hype: 5, gaps: 5 },
] as const;

const tocLink = "focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2";
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  (el.querySelector("h2") as HTMLElement | null)?.focus({ preventScroll: true });
}

function useActiveSection() {
  const [active, setActive] = useState<string>(TOC[0][0]);
  useEffect(() => {
    const onScroll = () => {
      let cur: string = TOC[0][0];
      for (const [id] of TOC) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) cur = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = TOC[5][0];
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return active;
}

function SideToc({ active }: { active: string }) {
  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-6 flex flex-col gap-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#5B2EA6]">On this page</p>
        <ol className="flex flex-col gap-2.5">
          {TOC.map(([id, t], i) => {
            const on = active === id;
            return (
              <li key={id}>
                <a href={`#${id}`} aria-current={on ? "location" : undefined}
                  onClick={(e) => { e.preventDefault(); goTo(id); }}
                  className={`flex gap-2 border-l-[3px] py-0.5 pl-3 text-[15px] leading-snug no-underline hover:text-foreground ${tocLink} ${on ? "border-[#5B2EA6] font-bold text-foreground" : "border-transparent text-foreground/70"}`}>
                  <span>{i + 1}.</span><span>{t}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

function JumpMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="On this page" className="lg:hidden">
      <button type="button" aria-expanded={open} aria-controls="jump-list" onClick={() => setOpen((o) => !o)}
        className={`flex min-h-12 w-full items-center justify-between rounded-[12px] border border-[#E4D6FF] bg-card px-4 text-left font-semibold ${tocLink}`}>
        Jump to a section
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={open ? "rotate-180" : ""}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <ol id="jump-list" className="mt-2 flex flex-col rounded-[12px] border border-[#E4D6FF] bg-card py-1">
          {TOC.map(([id, t], i) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "location" : undefined}
                onClick={(e) => { e.preventDefault(); setOpen(false); goTo(id); }}
                className={`flex min-h-11 items-center gap-2 px-4 text-[15px] no-underline ${tocLink} ${active === id ? "font-bold text-foreground" : "text-foreground/75"}`}>
                <span>{i + 1}.</span><span>{t}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}


function CheckRow({ code }: { code: string }) {
  return (
    <li className="flex items-start gap-3 border-t border-[#E4D6FF] py-3 first:border-t-0">
      <span className="w-7 shrink-0 pt-1 text-xs font-semibold text-muted-foreground">{code}</span>
      <span className="min-w-0 flex-1 text-base font-semibold">{QUESTIONS[code]}</span>
    </li>
  );
}

function Groups({ kind, title, sections }: { kind: "hype" | "gaps"; title: string; sections: Record<string, { label: string; codes: readonly string[] }> }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="flex items-center gap-2.5 font-display text-[21px] font-bold leading-tight sm:text-[24px]">
        {kind === "hype" ? <Chillies n={1} size={22} /> : <Flags n={1} size={22} />}
        {title}
      </h3>
      {Object.values(sections).map((s, i) => (
        <div key={s.label} className={card}>
          <h4 className="flex items-center gap-2.5 text-[18px] font-bold">
            <span aria-hidden="true" className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[#5B2EA6] text-sm text-white">{i + 1}</span>
            <span><span className="sr-only">{i + 1}. </span>{s.label}</span>
          </h4>
          <ul className="mt-2">
            {s.codes.map((c) => <CheckRow key={c} code={c} />)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function HowRatingsWork() {
  const active = useActiveSection();
  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 pb-16 pt-8 sm:px-8 lg:grid lg:grid-cols-[220px_minmax(0,728px)] lg:gap-12">
    <SideToc active={active} />
    <main className="flex min-w-0 max-w-[728px] flex-col gap-12">
      <header className="flex flex-col gap-4">
        <h1 className="font-display text-[28px] font-semibold leading-[1.15] sm:text-[34px]">How the ratings work</h1>
        <p className="text-lg">Every AI story in our feed gets two ratings: how much it hypes things up, and how much evidence it leaves out. Here's what each level means and exactly how we score them.</p>
        <JumpMenu active={active} />
      </header>

      <Section id="short-version" title="The short version">
        <ul className={`${card} flex flex-col gap-3`}>
          <li className="flex gap-3"><Chillies n={1} size={18} /><span><strong>Hype (chilis)</strong>: how much the story oversells what's known. 1 is calm and careful, 5 is off the charts.</span></li>
          <li className="flex gap-3"><Flags n={1} size={18} /><span><strong>Evidence gaps (flags)</strong>: how much the story leaves out that you'd need to check it. 1 means few gaps, 5 means the claims are unsupported.</span></li>
          <li>For both, fewer is better.</li>
          <li>Each story is checked against the same 21 questions. Code, not the AI, turns the answers into the ratings.</li>
        </ul>
      </Section>

      <Section id="two-ratings" title="Why two ratings, not one">
        <p>Hype asks how loud a story is. Evidence gaps asks how well you could check it. The two don't always go together: a calm story can rest on a single company press release, and an excited one can be backed by a solid study. One combined score would hide which problem a story has, so we keep them separate and never add them together.</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {QUADRANTS.map((q) => (
            <li key={q.title} className={`${card} flex flex-col gap-2.5`}>
              <p className="font-bold">{q.title}</p>
              <p className="italic text-foreground/75">{q.example}</p>
              <div className="mt-auto flex flex-col gap-1.5 pt-1 text-sm">
                <div className="flex flex-wrap items-center gap-2"><Chillies n={q.hype} size={18} /><span>Hype: {HYPE_WORDS[q.hype]} {q.hype}/5</span></div>
                <div className="flex flex-wrap items-center gap-2"><Flags n={q.gaps} size={18} /><span>Evidence gaps: {GAPS_WORDS[q.gaps]} {q.gaps}/5</span></div>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">Examples we wrote to show the difference.</p>
      </Section>

      <Section id="hype" title="Hype: the chili scale">
        <p>Hype measures how much the headline and story claim compared with what's actually known.</p>
        <Scale kind="hype" />
        <p className="text-sm text-muted-foreground">Example headlines are ones we wrote to show the difference. A real rating comes from the whole checklist below, not from the headline alone.</p>
      </Section>

      <Section id="evidence-gaps" title="Evidence gaps: the flag scale">
        <p>Evidence gaps measure how much a reader would need, but doesn't get, to check the story.</p>
        <Scale kind="gaps" />
        <p className="text-sm text-muted-foreground">These describe what each level usually looks like. The level itself is calculated from the checklist.</p>
      </Section>

      <Section id="checks" title="The 21 checks behind the ratings">
        <p>Every story is checked against the same 21 questions. 8 of them make up the Hype rating and 13 make up the Evidence gaps rating.</p>
        <Groups kind="hype" title="Hype: 8 checks" sections={HYPE_SECTIONS} />
        <Groups kind="gaps" title="Evidence gaps: 13 checks" sections={GAPS_SECTIONS} />
        <div className={card}>
          <h3 className="font-display text-lg font-bold">A few rules the checklist follows</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>If the AI isn't sure a check is met, it counts as not met.</li>
            <li>Words a story quotes from a company, report or official still count, unless the story questions them.</li>
            <li>Words like "world's first" or "better than doctors" in a headline count, even in quotation marks.</li>
            <li>Writing as if AI acts on its own ("AI will wipe out millions of jobs") counts as describing AI as human.</li>
            <li>A company's claims about itself aren't evidence a reader can check.</li>
          </ul>
        </div>
      </Section>

      <Section id="calculation" title="How the checklist becomes a rating">
        <ol className="flex flex-col gap-3">
          <li className={card}>
            <p className={label}>Step 1 · The answers</p>
            <p className="mt-2">For each check the AI answers met, not met, doesn't apply, or couldn't be checked, with the exact words from the article and a one-line reason.</p>
            <p className="mt-2">A couple of answers are set automatically: if the article doesn't link its main source, that check counts as not met, even if the source is easy to find.</p>
          </li>
          <li className={card}>
            <p className={label}>Step 2 · Each group gets a level</p>
            <p className="mt-2">We count the checks met out of the checks that apply. "Doesn't apply" and "couldn't be checked" are left out. A group needs at least two answered checks to count.</p>
          </li>
          <li className={card}>
            <p className={label}>Step 3 · The rating</p>
            <p className="mt-2">The rating is the average of its groups' levels, rounded to the nearest whole number. An exact half rounds down, in the story's favor. At least two groups must count. If fewer than two count, the story is marked "Insufficient evidence to rate".</p>
          </li>
          <li className={card}>
            <p className={label}>Step 4 · Two safety rules</p>
            <p className="mt-2">If the headline fails its checks (its group is at level 5), Hype is at least 4, because the headline is often all people read. If the Strength of evidence group is at level 5, Evidence gaps is at least 4.</p>
          </li>
        </ol>
        <p>The AI fills in the checklist; it never picks the number. The same answers always give the same rating.</p>
      </Section>
    </main>
    </div>
  );
}
