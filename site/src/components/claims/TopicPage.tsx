import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ACT, SECTION, TOPICS, TRAIL_ROLES, usDate, type Hype, type Topic } from "@/lib/claims";
import { matchStoriesByUrl } from "@/lib/public.functions";
import { CardMeter, Chillies, Flags, GAPS_WORDS, HYPE_WORDS } from "@/components/RatingIcons";
import { Md, NewTab } from "./Md";
import { ExtLink } from "@/components/ExtLink";
import { CtIcon } from "./icons";
import { StoryTrail, trailStory } from "./Trail";
import { AlertTriangle, Briefcase, Droplet, Lock, Palette, Server, Zap, type LucideIcon } from "lucide-react";

const ROLE_COLOR: Record<string, string> = {
  origin: "var(--ct-lavender)", spread: "var(--ct-spread)", twist: "var(--ct-twist)",
  peak: "var(--ct-soft-orange)", pushback: "var(--ct-mint)", update: "var(--ct-update)",
};
const HYPE_BADGE = ["", "var(--ct-mint)", "var(--ct-pale-yellow)", "var(--ct-spread)", "var(--ct-soft-orange)", "var(--ct-twist)"];
const CHECK_NAME: Record<string, string> = { P1: "Evidence status", P2: "Scope", P3: "Future certainty", W1: "Rhetorical inflation", W2: "Agency and mechanism" };
const ANSWER: Record<string, string> = { Y: "Met", N: "Not met", NA: "Not applicable", NC: "Not checked" };

const METHOD = "We assess each claim on this page, the headline claim and the careful version, using five checks: the status of the evidence, the scope of the claim, the certainty of predictions, inflated language, and unsupported agency or intentions. The same issue is counted once. A claim that badly overstates its evidence, its scope or its certainty scores at least 4, the same way an overstated headline lifts an article's rating. Checks are marked met, not met, not applicable, or not checked. A calculated score summarizes the checked wording; an applicable unchecked item prevents a numeric score. The scale is coarse, so different claims can receive the same score. Evidence limitations and potential harm are explained separately. These claim ratings adapt the site's article checklist. The newsfeed's article ratings remain separate.";
const CALC = "Evidence-status, scope and future-certainty checks form one group; language and agency checks form the other. Within each group, the share of met answers maps to levels: 100% → 1; at least 75% → 2; at least 50% → 3; at least 25% → 4; below 25% → 5. Each group needs at least two met/not-met answers. The two group levels are averaged; an exact half rounds down. If the first group reaches level 4 or 5, the score is at least 4, just as an overstated headline lifts an article's rating. An applicable “not checked” answer means no numeric score is shown.";

function ScoreLine({ h, prefix, sep = " · " }: { h: Hype; prefix: string; sep?: string | undefined }) {
  if (!h.level) return <p className="font-bold">{prefix}: Not yet assessable{h.reason ? ` — ${h.reason}` : ""}</p>;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chillies n={h.level} size={22} />
      <span className="font-bold">{prefix}: {h.label}{sep}{h.level}/5</span>
    </div>
  );
}

function Headline({ text, word }: { text: string; word: string }) {
  const i = text.indexOf(word);
  if (i < 0) return <>{text}</>;
  return <>{text.slice(0, i)}<span className="ct-key">{word}</span>{text.slice(i + word.length)}</>;
}

const PILL_ICON: Record<string, LucideIcon> = {
  water: Droplet, jobs: Briefcase, "existential-risk": AlertTriangle, "data-centers": Server,
  "energy-climate": Zap, creativity: Palette, privacy: Lock,
};

function splitVerdict(md: string) {
  const m = /^([^\[\n]+?[.?!])\s+/.exec(md);
  return m ? { verdict: m[1]!, rest: md.slice(m[0].length) } : { verdict: "", rest: md };
}

function Drawer({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="ct-drawer">
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="ct-drawer-btn">
          <span>{title}</span><span aria-hidden="true" className="ct-drawer-icon">{open ? "−" : "+"}</span>
        </button>
      </h3>
      <div id={id} hidden={!open} className="ct-drawer-body">{children}</div>
    </div>
  );
}

function Primer({ t }: { t: Topic }) {
  const { verdict, rest } = splitVerdict(t.shortAnswerMarkdown);
  const bullets = t.evidenceMarkdown.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) => `- ${p.replace(/\n/g, " ")}`).join("\n");
  return (
    <section className="ct-card ct-primer" aria-labelledby="short">
      <p className="ct-eyebrow">Before you follow the trail</p>
      <h2 id="short" className="mt-2 font-display text-[22px] font-bold sm:text-[26px]">Is the claim true?</h2>
      {verdict && <p className="ct-verdict mt-2.5">{verdict}</p>}
      <div className="mt-2.5 max-w-[62ch] text-base leading-[1.55] sm:text-[17px]"><Md>{rest}</Md></div>
      <div className="mt-[18px]">
        <Drawer title="What does this claim actually mean?"><Md>{t.meaningMarkdown}</Md></Drawer>
        <Drawer title="What evidence do we have?"><Md>{bullets}</Md></Drawer>
      </div>
      <a href="#trail" className="mt-[18px] inline-flex min-h-11 items-center font-bold" style={{ color: "var(--ct-purple)" }}
        onClick={(e) => { e.preventDefault(); const el = document.getElementById("trail"); const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches; el?.scrollIntoView({ behavior: r ? "auto" : "smooth", block: "start" }); }}
      >Now follow the claim's trail ↓</a>
    </section>
  );
}

export function TopicPage({ t, missing = false, index = false }: { t: Topic; missing?: boolean; index?: boolean }) {
  useEffect(() => { document.title = index ? "Claim Tracker · Decoding the Hype" : `${t.topic} claim · Claim Tracker · Decoding the Hype`; }, [t.topic, index]);
  const [tab, setTab] = useState(0);
  const pillsRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const row = pillsRef.current, el = row?.querySelector<HTMLElement>('[aria-current="page"]');
    if (row && el && row.scrollWidth > row.clientWidth) row.scrollLeft = el.offsetLeft - row.clientWidth / 2 + el.offsetWidth / 2;
  }, [t.slug]);
  const Icon = PILL_ICON[t.slug] ?? Droplet;
  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8">
      <h1 className="pt-8 font-display text-[28px] font-bold leading-[1.15] tracking-[-0.01em] text-foreground sm:text-[34px]">Claim Tracker</h1>
      <p className="ct-soft mt-3 max-w-[62ch] text-base leading-[1.55] sm:text-[17px]">{SECTION.introduction}</p>
      <p className="ct-soft70 mt-7 text-sm font-semibold">Pick a claim</p>
      <nav aria-label="Pick a claim" className="ct-pillwrap mt-2.5">
        <ul ref={pillsRef} className="ct-pills">
          {TOPICS.map((o) => {
            const I = PILL_ICON[o.slug] ?? Droplet;
            return (
              <li key={o.slug}><Link to="/claims/$slug" params={{ slug: o.slug }} resetScroll={false} className="ct-pill" aria-current={o.slug === t.slug && !missing ? "page" : undefined} activeProps={{}}><I aria-hidden="true" />{o.topic}</Link></li>
            );
          })}
        </ul>
      </nav>
      {missing && <p role="status" className="mt-4 rounded-[12px] px-4 py-3 font-sans text-[15px]" style={{ background: "#FFF1B8" }}>We couldn't find that claim, so here's the first one.</p>}

      <div className="mt-8">
        <div className="flex min-w-0 flex-col gap-6">
          <article className="ct-card ct-claimcard">
            <div className="ct-topic"><Icon aria-hidden="true" />{t.topic}</div>
            <div className="p-[18px] sm:p-7 sm:pt-4">
              <p className="ct-eyebrow mt-[18px]">The claim</p>
              <h2 tabIndex={-1} className="ct-h1 mt-2.5"><Headline text={t.headline} word={t.interactive.keyWord.word} /></h2>
              <div className="mt-3.5 text-base sm:text-[17px]"><ScoreLine h={t.hype} prefix="Headline hype" /></div>
            </div>
          </article>

          <Primer key={t.slug} t={t} />

          <section className="ct-card scroll-mt-6" aria-labelledby="trail">
            <h2 id="trail" className="font-display text-[22px] font-bold leading-[1.2] sm:text-[26px]">
              The claim's trail
            </h2>
            <p className="ct-soft70 mt-1.5 max-w-[60ch] text-[15px] leading-normal sm:text-base">{t.interactive.trail.intro}</p>
            {trailStory(t.slug) ? <StoryTrail t={t} s={trailStory(t.slug)!} showGlance={t.slug === "water"} /> : (
            <ol className="ct-trail mt-7">
              {t.interactive.trail.stops.map((s, i) => (
                <li key={i} id={`stop-${i + 1}`} className="ct-stop" style={{ ["--role" as string]: ROLE_COLOR[s.role] ?? "var(--ct-lavender)" }}>
                  <span className="ct-ring" aria-hidden="true" />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-muted-foreground">{s.date}</span>
                    <span className="ct-role">{TRAIL_ROLES[s.role] ?? s.role}</span>
                  </div>
                  <h3 className="mt-2 text-[17px] font-bold leading-[1.35] sm:text-lg">{s.title}</h3>
                  <blockquote className="ct-quote">“{s.quote}”</blockquote>
                  <p className="text-base leading-[1.55] text-muted-foreground">{s.note}</p>
                  <NewTab href={s.url} className="mt-1 inline-flex min-h-11 items-center text-sm font-bold">{s.linkText} →</NewTab>
                </li>
              ))}
            </ol>
            )}
          </section>

          <section className="ct-card ct-learn scroll-mt-6" aria-labelledby="learn">
            <h2 id="learn" className="font-display text-[22px] font-bold leading-[1.2] sm:text-[26px]">

              Learn more, do more
            </h2>
            <p className="ct-soft70 mt-[18px] max-w-[60ch] text-[15px] leading-normal sm:text-base">The facts behind the claim, how the news has covered it, and what you can do about the real issue.</p>
            <div className="mt-[18px]">
              <Tabs t={t} sel={tab} setSel={setTab} />
            </div>
          </section>


          <div>
            <Link to="/" className="inline-flex min-h-11 items-center font-semibold">Back to the feed</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


function CheckGroup({ title, sub, h, prefix, t, sep }: { title: string; sub: string; h: Hype; prefix: string; t: Topic; sep?: string | undefined }) {
  const titleFor = (url: string) => t.sourceLinks.find((s) => s.url === url)?.title;
  return (
    <section className="mt-4">
      <h4 className="font-display text-lg font-bold">{title}</h4>
      <p className="mt-1">{sub}</p>
      <div className="mt-2"><ScoreLine h={h} prefix={prefix} sep={sep} /></div>
      <ul className="mt-3 grid gap-3">
        {Object.entries(h.checklist).map(([k, c]) => (
          <li key={k} className="rounded-xl border border-border p-3">
            <p><span className="font-bold">{CHECK_NAME[k] ?? k}:</span> {ANSWER[c.answer] ?? c.answer}</p>
            {c.claim_phrase ? <p className="mt-1 text-sm">Wording checked: “{c.claim_phrase}”</p> : null}
            <p className="mt-1 text-sm leading-relaxed">{c.reason}</p>
            {c.sources?.length ? (
              <ul className="mt-1 text-sm">
                {c.sources.map((s, i) => (
                  <li key={i}>
                    <ExtLink href={s.url} className="underline">{titleFor(s.url) ?? `Evidence for ${(CHECK_NAME[k] ?? k).toLowerCase()} — source ${i + 1}`}</ExtLink>
                    {s.locator ? <span className="text-muted-foreground"> · Where to look: {s.locator}</span> : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

const TABS = [
  { id: "facts", name: "The Facts", color: "var(--ct-yellow)", ink: "var(--ct-ink)" },
  { id: "news", name: "In the news", color: "var(--ct-soft-orange)", ink: "var(--ct-ink)" },
  { id: "act", name: "Act on what's real", color: "var(--ct-act)", ink: "#FFFFFF" },
] as const;

function Tabs({ t, sel, setSel }: { t: Topic; sel: number; setSel: (i: number) => void }) {
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const n = TABS.length;
    const next = e.key === "ArrowRight" ? (sel + 1) % n : e.key === "ArrowLeft" ? (sel + n - 1) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault(); setSel(next); refs.current[next]?.focus();
  };
  const tab = TABS[sel]!;
  return (
    <div id="ct-tabs" className="scroll-mt-6">
      <div role="tablist" aria-label="More about this claim" className="flex gap-2" onKeyDown={onKey}>
        {TABS.map((x, i) => (
          <button
            key={x.id} ref={(el) => { refs.current[i] = el; }} type="button" role="tab" id={`${base}-${x.id}-tab`}
            aria-selected={sel === i} aria-controls={`${base}-${x.id}`} tabIndex={sel === i ? 0 : -1}
            onClick={() => setSel(i)} className="ct-tab" style={{ ["--tab" as string]: x.color, ["--tab-ink" as string]: x.ink }}
          >{x.name}</button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-${tab.id}`} aria-labelledby={`${base}-${tab.id}-tab`} tabIndex={0} className="ct-panel mt-2.5" style={{ ["--tab" as string]: tab.color, ["--tab-ink" as string]: tab.ink }}>
        {tab.id === "facts" && <Facts t={t} />}
        {tab.id === "news" && <News t={t} />}
        {tab.id === "act" && <Act t={t} />}
      </div>
    </div>
  );
}

function Banner({ title, hint }: { title: React.ReactNode; hint: string }) {
  return <div className="ct-banner"><h2 className="font-display text-[26px] font-bold">{title}</h2><p className="mt-1 text-[15px]">{hint}</p></div>;
}

function useCols() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const f = () => setCols(mq.matches ? 3 : 2);
    f(); mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return cols;
}

function Facts({ t }: { t: Topic }) {
  const facts = t.interactive.finePrint;
  const [open, setOpen] = useState<number | null>(null);
  const cols = useCols();
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const rowEnd = open === null ? -1 : Math.min(Math.ceil((open + 1) / cols) * cols - 1, facts.length - 1);
  const pid = useId();
  return (
    <>
      <Banner title="The Facts" hint="Tap a fact to learn more." />
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {facts.map((f, i) => (
            <Fragment key={i}>
              <button
                ref={(el) => { tiles.current[i] = el; }} type="button" className="ct-tile" aria-expanded={open === i}
                aria-controls={open === i ? pid : undefined} onClick={() => setOpen(open === i ? null : i)}
              >
                <CtIcon name={f.iconName} />
                <span className="ct-eyebrow">{f.tag}</span>
                <span className="text-sm font-semibold leading-snug">{f.label.replace(/^Fact:\s*/, "")}</span>
                {open !== i && <span className="mt-auto text-xs font-bold" style={{ color: "var(--ct-purple)" }}>Learn more ▾</span>}
              </button>
              {i === rowEnd && open !== null && (
                <div id={pid} className="col-span-full rounded-2xl border-2 p-4" style={{ borderColor: "var(--ct-purple)" }}>
                  <p className="leading-relaxed">{facts[open]!.text}</p>
                  <NewTab href={facts[open]!.url} className="mt-2 inline-flex min-h-11 items-center font-semibold underline">{facts[open]!.linkText}</NewTab>
                  <div>
                    <button type="button" className="min-h-11 font-bold" style={{ color: "var(--ct-purple)" }} onClick={() => { const o = open; setOpen(null); tiles.current[o]?.focus(); }}>Close ▴</button>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
        {t.interactive.situationPicker && <Picker p={t.interactive.situationPicker} />}
      </div>
    </>
  );
}

function Picker({ p }: { p: NonNullable<Topic["interactive"]["situationPicker"]> }) {
  const [v, setV] = useState<number | null>(null);
  const name = useId();
  return (
    <fieldset className="mt-6">
      <legend><h3 className="font-display text-xl font-bold">{p.title}</h3></legend>
      <p className="text-sm text-muted-foreground">Pick the one that fits you. Based on OpenAI's published policies.</p>
      <div className="mt-3 grid gap-2">
        {p.options.map((o, i) => (
          <label key={i} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-4 py-2 has-[:checked]:border-[var(--ct-purple)]">
            <input type="radio" name={name} checked={v === i} onChange={() => setV(i)} className="h-4 w-4" />
            {o.label}
          </label>
        ))}
      </div>
      <div aria-live="polite">
        {v !== null && <p className="mt-3 rounded-xl p-4" style={{ background: "var(--ct-pale-lavender)", color: "var(--ct-ink)" }}>{p.options[v]!.result}</p>}
      </div>
    </fieldset>
  );
}

function News({ t }: { t: Topic }) {
  const urls = t.articleCards.map((a) => a.url);
  const q = useQuery({ queryKey: ["claim-stories", t.slug], queryFn: () => matchStoriesByUrl({ data: { urls } }), retry: false, staleTime: 60_000 });
  const matches = q.data ?? {};
  return (
    <>
      <Banner title="In the news" hint="Real stories about this claim, rated with the same checklist as our feed." />
      <div className="p-4">
        <ul className="grid gap-4 lg:grid-cols-3">
          {t.articleCards.map((a, i) => {
            const m = matches[a.url];
            const hype = m?.hype ?? a.hype, gaps = m?.gaps ?? a.gaps;
            return (
              <li key={i}>
                <article className="flex h-full flex-col gap-2 rounded-2xl border border-border p-4">
                  <div className="flex flex-col gap-2">
                    <CardMeter kind="hype" level={String(hype)} emptyWord="Not rated" />
                    <CardMeter kind="gaps" level={String(gaps)} emptyWord="Not rated" />
                  </div>
                  <p className="text-sm text-muted-foreground">{a.outlet} · <time dateTime={a.published}>{usDate(a.published)}</time>{a.contextLabel ? ` · ${a.contextLabel}` : ""}</p>
                  <h3 className="font-display text-lg font-bold leading-snug">{a.headline}</h3>
                  <p className="text-sm text-muted-foreground">{a.ratingNote}</p>
                  <p className="label-caps mt-1">Why it's here</p>
                  <p className="text-sm">{a.whyHere}</p>
                  <div className="mt-auto">
                    {m ? (
                      <Link to="/story/$id" params={{ id: m.id }} className="inline-flex min-h-11 items-center text-sm font-bold">See our full rating</Link>
                    ) : (
                      <NewTab href={a.url} className="inline-flex min-h-11 items-center text-sm font-bold">Read the article at {a.outlet}</NewTab>
                    )}
                    <a href={`/decode?url=${encodeURIComponent(a.url)}`} target="_blank" rel="noopener" className="mt-2 flex min-h-11 items-center text-sm font-semibold">
                      Decode this article<span aria-hidden="true">&nbsp;↗</span><span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm">Want to see how we rate a story? <Link to="/" className="font-semibold underline">Browse the feed</Link></p>
      </div>
    </>
  );
}

function Act({ t }: { t: Topic }) {
  const a = t.interactive.actOnWhatsReal;
  const cards = [
    { name: "Learn", icon: "book-open", bg: "var(--ct-pale-yellow)", items: a.learn, site: true },
    { name: "Speak up", icon: "megaphone", bg: "var(--ct-pale-lavender)", items: a.speakUp, site: false },
    { name: "Take action", icon: "map-pin", bg: "var(--ct-peach)", items: a.takeAction, site: false },
  ];
  return (
    <>
      <Banner title={<>Act on what's <span className="ct-hl">real</span></>} hint={a.intro} />
      <div className="p-4">
        <div className="grid gap-3 min-[720px]:grid-cols-3">
          {cards.map((c) => (
            <section key={c.name} className="rounded-2xl p-3.5" style={{ background: c.bg, color: "var(--ct-ink)" }}>
              <div className="flex items-center gap-2" style={{ ["--ct-icon-line" as string]: "var(--ct-deep)" }}>
                <CtIcon name={c.icon} size={40} />
                <h3 className="font-display text-xl font-bold">{c.name}</h3>
              </div>
              <ul className="mt-3 grid gap-2">
                {c.items.map((it, i) => (
                  <li key={i} className="rounded-xl p-3" style={{ background: "rgb(255 255 255 / .7)" }}>
                    <p className="font-bold">{it.title}</p>
                    <p className="mt-1 text-sm">{it.text}</p>
                    <NewTab href={it.url} className="mt-1 inline-flex min-h-11 items-center text-[13px] font-bold">{it.linkText}</NewTab>
                  </li>
                ))}
                {c.site && (
                  <li className="rounded-xl p-3" style={{ background: "rgb(255 255 255 / .7)" }}>
                    <p className="font-bold">{ACT.siteItem.title}</p>
                    <p className="mt-1 text-sm">{ACT.siteItem.text}</p>
                    <Link to="/decode" target="_blank" rel="noopener" className="mt-1 inline-flex min-h-11 items-center text-[13px] font-bold">{ACT.siteItem.linkText}<span aria-hidden="true">{" ↗"}</span><span className="sr-only"> (opens in a new tab)</span></Link>
                  </li>
                )}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-muted-foreground">{ACT.footer}</p>
      </div>
    </>
  );
}
