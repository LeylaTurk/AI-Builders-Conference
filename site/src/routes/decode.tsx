import { ogImage } from "@/lib/og";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { checkArticle, checksLeft, readLink, rateRead, writeupFor, decodeStory, storyInfo, type DecodeFail, type StoryRef } from "@/lib/check.functions";
import { cachedBreakdown, saveBreakdown, takeDecode, cleanLink } from "@/lib/decode-intent";
import { BigMeter } from "@/components/RatingDetail";
import { parseLevel } from "@/components/RatingIcons";
import { Legend, MarkedText, NotePill, missingMarks, noteCount } from "@/components/MarkedText";
import { btnDark } from "@/components/StoryRating";
import { TipBox } from "@/components/TipBox";
import { ExtLink } from "@/components/ExtLink";
import { matchStoriesByUrl } from "@/lib/public.functions";

export const Route = createFileRoute("/decode")({
  head: () => ({
    meta: [
      { title: "Decode an article — Decoding the Hype" },
      { name: "description", content: "Paste a link to an AI news story and see, sentence by sentence, where it turns up the hype and what evidence it leaves out. Nothing is saved." },
      { property: "og:title", content: "Decode an article — Decoding the Hype" },
      { property: "og:description", content: "Sentence-by-sentence hype and evidence gaps for any AI news story. Private, nothing is saved." },
      { property: "og:type", content: "website" },
      ...ogImage,
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: z.object({ story: z.string().uuid().optional().catch(undefined), paste: z.coerce.string().max(4).optional().catch(undefined), headline: z.coerce.string().max(500).optional().catch(undefined), url: z.string().url().max(2000).optional().catch(undefined) }),
  component: DecodePage,
});

type Result = NonNullable<Awaited<ReturnType<typeof checkArticle>>["result"]>;
type Shown = { headline: string | null; deck: string | null; paragraphs: string[]; url: string | null; outlet: string | null; date: string | null; cut: number | null; source?: string | null };
type Info = { id: string; headline: string; outlet: string; url: string; approved: boolean; reviewed?: boolean };
type WToken = { payload: string; sig: string } | null;
type Saved = { shown: Shown; res: Result; story: StoryRef };
const MAX = 12000;
const STEPS = ["Opening the page…", "Reading the article…", "Finding the hype and the gaps… usually 30–60 seconds"];
const STORY_STEPS = ["Reading the article…", "Finding the hype and the gaps… usually 30–60 seconds"];
const PASTE_STEPS = ["Finding the hype and the gaps… usually 30–60 seconds"];
const GIVE_UP_MS = 120_000;
const TIMEOUT = Symbol("timeout");
const withTimeout = <T,>(p: Promise<T>, ms: number) => Promise.race([p, new Promise<typeof TIMEOUT>((r) => setTimeout(() => r(TIMEOUT), ms))]);
const GIVE_UP: DecodeFail = { kind: "storyfail", site: "" };

const field = "w-full rounded-[10px] border border-[#CFC8DD] bg-card px-3.5 py-3 text-base text-foreground";
const labelCls = "text-[15px] font-bold";
const linkBtn = "min-h-11 font-semibold text-link underline underline-offset-4 hover:text-link-hover";

function failText(f: DecodeFail) {
  switch (f.kind) {
    case "storyfail": return "We couldn't decode this right now. It wasn't counted; please try again later.";
    case "nostory": return "We couldn't find that story. Paste its link instead.";
    case "paywall": return "This article is behind a paywall or login, so we can only see the start of it.";
    case "blocked": if (/eurekalert/i.test(f.site)) return "EurekAlert! doesn't allow us to show text from its releases, so this one can't be decoded.";
      return `${f.site} doesn't let tools like ours read its pages.`;
    case "notarticle": return "This looks like a homepage or section page, not a single article. Open the story you want to check and paste its link here.";
    case "private": case "badurl": return "We can't open that address. Please use a link to a public news page.";
    default: return "We couldn't open that page. Check the link and try again.";
  }
}

function fmtDate(d: string | null) {
  if (!d) return null;
  const t = new Date(d);
  return isNaN(t.getTime()) ? null : t.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function DecodePage() {
  const readLink_ = useServerFn(readLink);
  const rateText = useServerFn(rateRead);
  const getWriteup = useServerFn(writeupFor);
  const runText = useServerFn(checkArticle);
  const getLeft = useServerFn(checksLeft);
  const runStory = useServerFn(decodeStory);
  const getInfo = useServerFn(storyInfo);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [url, setUrl] = useState("");
  const [pasteMode, setPasteMode] = useState(search.paste === "1");
  const [info, setInfo] = useState<Info | null>(null);
  const [storyRef, setStoryRef] = useState<StoryRef | null>(null);
  const [steps, setSteps] = useState(STEPS);
  const storyMode = !!search.story && !!info;

  const [headline, setHeadline] = useState(search.headline ?? "");
  const [deck, setDeck] = useState("");
  const [text, setText] = useState("");
  const [left, setLeft] = useState<number | null>(null);
  const [step, setStep] = useState<number | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [fail, setFail] = useState<DecodeFail | null>(null);
  const [retry, setRetry] = useState<null | { kind: "link"; url: string } | { kind: "story"; info: Info }>(null);
  const [res, setRes] = useState<Result | null>(null);
  const [shown, setShown] = useState<Shown | null>(null);
  const [origin, setOrigin] = useState<"link" | "paste" | null>(null);
  const timers = useRef<number[]>([]);
  const running = useRef(false);
  const [elapsed, setElapsed] = useState(0);
  const [rated, setRated] = useState(0);
  const [summaryWait, setSummaryWait] = useState(false);
  const topRef = useRef<HTMLInputElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { getLeft().then((r) => setLeft(r.left)).catch(() => {}); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Feed story: show a saved breakdown from this tab, start straight away if the reader pressed a decode button, or wait.
  useEffect(() => {
    const id = search.story;
    if (!id) return;
    reset(); setInfo(null);
    const auto = takeDecode(id);
    const saved = cachedBreakdown<Saved>(id);
    getInfo({ data: { id } }).then((i) => {
      if (!i) { setMsg("We couldn't find that story. Paste its link instead."); return; }
      setInfo(i);
      if (saved) { setShown(saved.shown); setRes(saved.res); setStoryRef(saved.story); }
      else if (auto) runFeedStory(i);
    }).catch(() => setMsg("This story couldn't load. Please refresh."));
  }, [search.story]); // eslint-disable-line react-hooks/exhaustive-deps

  // Link handed over in the address (e.g. from the Claim Tracker): fill the box and wait for the reader,
  // unless it's already been decoded — then show it straight away (saved results cost no AI call or slot).
  useEffect(() => {
    const u = search.url;
    if (!u || search.story) return;
    setUrl(u);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => { topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); topRef.current?.focus({ preventScroll: true }); }, 50);
    if (cachedBreakdown<Saved>(`link:${cleanLink(u)}`)) { void runLink(u); return; }
    matchStoriesByUrl({ data: { urls: [u] } }).then((m) => { if (m[u]) void runLink(u); }).catch(() => {});
  }, [search.url]); // eslint-disable-line react-hooks/exhaustive-deps

  const fillWriteup = (sh: Shown, r0: Result, w: WToken, key: string | null, story: StoryRef | null) => {
    if (!w) { if (key) saveBreakdown(key, { shown: sh, res: r0, story }); return; }
    setSummaryWait(true);
    getWriteup({ data: w }).then((x) => {
      const r1 = x ? { ...r0, summary: x.summary, reason: x.reason } : r0;
      setRes((cur) => (cur === r0 ? r1 : cur));
      if (key) saveBreakdown(key, { shown: sh, res: r1, story });
    }).catch(() => { if (key) saveBreakdown(key, { shown: sh, res: r0, story }); }).finally(() => setSummaryWait(false));
  };
  const show = (r: { result: Result | null; article: Omit<Shown, "cut"> | null; cut: number | null; story: StoryRef | null; wtoken?: WToken }, key?: string) => {
    if (!r.result || !r.article) return;
    const sh: Shown = { ...r.article, cut: r.cut };
    setShown(sh); setRes(r.result); setStoryRef(r.story); setRated((n) => n + 1);
    fillWriteup(sh, r.result, r.wtoken ?? null, r.story ? r.story.id : key ?? null, r.story);
    if (key && r.story) saveBreakdown(key, { shown: sh, res: r.result, story: r.story });
  };

  const runFeedStory = async (i: Info) => {
    if (running.current) return;
    running.current = true;
    reset();
    if (!i.approved) { setSteps(STORY_STEPS); setStep(0); startClock(); timers.current.push(window.setTimeout(() => setStep(1), 1500)); }
    try {
      const r = await withTimeout(runStory({ data: { id: i.id } }), GIVE_UP_MS);
      if (r === TIMEOUT) { setFail({ ...GIVE_UP, site: i.outlet }); setRetry({ kind: "story", info: i }); return; }
      if (r.left !== null) setLeft(r.left);
      if (r.fail) setFail(r.fail);
      else if (r.error) setMsg(r.error);
      else show(r);
    } catch {
      setFail({ kind: "storyfail", site: i.outlet });
      setRetry({ kind: "story", info: i });
    } finally { stopSteps(); running.current = false; }
  };

  const startClock = () => {
    const t0 = Date.now(); setElapsed(0);
    timers.current.push(window.setInterval(() => setElapsed(Math.floor((Date.now() - t0) / 1000)), 1000));
  };
  const stopSteps = () => { timers.current.forEach((t) => { clearTimeout(t); clearInterval(t); }); timers.current = []; setStep(null); };
  const reset = () => { setMsg(null); setFail(null); setRetry(null); setRes(null); setShown(null); setStoryRef(null); };

  // Keep the working panel in view while it runs, and move focus to the result when it lands.
  useEffect(() => {
    if (step !== null && progressRef.current) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      progressRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
    }
  }, [step !== null]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (res && shown && resultRef.current) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultRef.current.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      resultRef.current.focus({ preventScroll: true });
    }
  }, [res, shown]);

  // The link run, separated from form validation so a timeout can rerun it directly.
  const runLink = async (u: string) => {
    if (running.current) return; // one press, one run
    reset(); setOrigin("link");
    // Same link again in this tab: show it straight away, no breakdown used. Nothing goes to the server.
    const key = `link:${cleanLink(u)}`;
    const saved = cachedBreakdown<Saved>(key);
    if (saved) { setShown(saved.shown); setRes(saved.res); setStoryRef(saved.story ?? null); return; }
    if (left === 0) return setMsg("Today's breakdowns are used up. Please try again tomorrow.");
    running.current = true;
    const t0 = Date.now();
    setSteps(STEPS); setStep(0); startClock();
    timers.current.push(window.setTimeout(() => setStep((s) => (s === 0 ? 1 : s)), 1500));
    try {
      const r = await withTimeout(readLink_({ data: { url: u } as never }), GIVE_UP_MS);
      if (r === TIMEOUT) { setFail({ ...GIVE_UP, site: "" }); setRetry({ kind: "link", url: u }); return; }
      if (r.left !== null) setLeft(r.left);
      if (r.fail) { setFail(r.fail); return; }
      if (r.error) { setMsg(r.error); return; }
      if (r.known) { show(r, key); return; }
      if (!r.article) { setFail({ ...GIVE_UP, site: "" }); setRetry({ kind: "link", url: u }); return; }
      // Show the article straight away, unmarked, while the notes are made.
      const sh: Shown = { ...r.article, cut: r.cut };
      setShown(sh); setStep(2);
      const x = await withTimeout(rateText({ data: { headline: sh.headline ?? "", deck: sh.deck, paragraphs: sh.paragraphs } as never }), GIVE_UP_MS - (Date.now() - t0));
      if (x === TIMEOUT) { setShown(null); setFail({ ...GIVE_UP, site: "" }); setRetry({ kind: "link", url: u }); return; }
      if (x.left !== null) setLeft(x.left);
      if (x.error || !x.result) { setShown(null); setFail({ ...GIVE_UP, site: "" }); setRetry({ kind: "link", url: u }); return; }
      setRes(x.result); setRated((n) => n + 1);
      fillWriteup(sh, x.result, x.wtoken, key, null);
    } catch {
      setShown(null); setFail({ ...GIVE_UP, site: "" });
      setRetry({ kind: "link", url: u });
    } finally { stopSteps(); running.current = false; }
  };

  const runRetry = () => {
    if (!retry || running.current) return;
    if (retry.kind === "link") { setUrl(retry.url); void runLink(retry.url); }
    else void runFeedStory(retry.info);
  };

  const submitLink = async (e: FormEvent) => {
    e.preventDefault();
    const u = url.trim();
    let ok = false;
    try { ok = /^https?:$/.test(new URL(u).protocol); } catch { ok = false; }
    reset(); setOrigin("link");
    if (!ok) return setMsg("That doesn't look like a link. Copy the address from your browser's address bar.");
    void runLink(u);
  };

  const submitText = async (e: FormEvent) => {
    e.preventDefault();
    setMsg(null); setRes(null); setShown(null); setOrigin("paste");
    if (!headline.trim()) return setMsg("Please add the headline.");
    if (text.trim().length < 200) return setMsg("This is too short to decode. Paste the whole article.");
    if (left === 0) return setMsg("Today's breakdowns are used up. Please try again tomorrow.");
    if (running.current) return;
    running.current = true;
    setSteps(PASTE_STEPS); setStep(0); startClock();
    try {
      const r = await runText({ data: { headline, text, ...(deck.trim() ? { deck } : {}) } as never });
      if (r.left !== null) setLeft(r.left);
      if (r.error) setMsg(r.error);
      else if (r.result) {
        setFail(null);
        // The pasted text stays in this browser only; it's what the markup is drawn on.
        setShown({ headline: headline.trim(), deck: deck.trim() || null, paragraphs: text.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean), url: /^https?:\/\//.test(url.trim()) ? url.trim() : null, outlet: null, date: null, cut: null });
        setRes(r.result); setRated((n) => n + 1);
        fillWriteup({ headline: headline.trim(), deck: null, paragraphs: [], url: null, outlet: null, date: null, cut: null }, r.result, r.wtoken, null, null);
      }
    } catch {
      setMsg("The breakdown couldn't run. Please try again.");
    } finally { stopSteps(); running.current = false; }
  };

  const another = () => {
    if (search.story || search.paste || search.headline) navigate({ to: "/decode", search: {} });
    reset(); setInfo(null); setUrl(""); setHeadline(""); setDeck(""); setText(""); setPasteMode(false); setOrigin(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => topRef.current?.focus(), 300);
  };

  const busy = step !== null;
  const missing = res && shown ? missingMarks(shown, res.marks) : [];
  const notes = res && shown ? noteCount(shown, res.marks) : 0;
  const insufficient = res && (!parseLevel(res.hype_level) || !parseLevel(res.gaps_level));
  const outlet = shown?.outlet ?? (shown?.url ? new URL(shown.url).hostname.replace(/^www\./, "") : null);
  const approved = !!storyRef?.approved;
  const fromFeed = !!storyRef;
  const leftLine = left === null ? "" : `${left} ${left === 1 ? "breakdown" : "breakdowns"} left today`;

  const spinner = <span className="h-[18px] w-[18px] flex-none animate-spin rounded-full border-2 border-[#E4D6FF] border-t-[#5B2EA6]" aria-hidden="true" />;

  const stepList = busy && (
    <ol className="flex flex-col gap-1 text-[15px]">
      {steps.map((s, i) => <li key={s} className={i <= step! ? "font-semibold text-foreground" : "text-muted-foreground"}>{i < step! ? "✓ " : i === step ? "→ " : ""}{s}</li>)}
      {timers.current.length > 0 && <li className="text-sm text-muted-foreground tabular-nums" aria-live="off">{elapsed} s</li>}
      {elapsed >= 75 && <li className="text-sm text-muted-foreground">Still working, long articles take a bit longer.</li>}
    </ol>
  );

  const progressPanel = busy && (
    <div ref={progressRef} aria-live="polite" className="flex flex-col gap-3 rounded-xl border border-[#E4D6FF] bg-card p-4">
      <p className="flex items-center gap-2.5 text-[15px] font-semibold">{spinner}Reading the article and checking it against our 21 questions. This usually takes under a minute.</p>
      {stepList}
    </div>
  );

  const failBlock = fail && (
    <section role="alert" className="grey-box flex flex-col gap-2">
      <p className="text-[17px] font-semibold">{failText(fail)}</p>
      <p className="text-sm">This didn't use up one of your breakdowns.</p>
      {fail.kind === "storyfail" && retry && (
        <button type="button" className={`${btnDark} self-start`} onClick={runRetry}>Try again</button>
      )}
      {fail.kind === "blocked" && /eurekalert/i.test(fail.site) && info && (
        <ExtLink href={info.url} className={`${linkBtn} self-start`}>Read it at EurekAlert!</ExtLink>
      )}
      {!(fail.kind === "blocked" && /eurekalert/i.test(fail.site)) && fail.kind !== "nostory" && !pasteMode && (
        <button type="button" className={`${linkBtn} self-start`} onClick={() => { if (info && !headline) setHeadline(info.headline); setPasteMode(true); }}>Paste the text instead</button>
      )}
    </section>
  );

  const resultBlock = shown && (res || busy) && (
    <section aria-live="polite" aria-busy={!res} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 ref={resultRef} tabIndex={-1} className="font-display text-2xl font-extrabold outline-none">Your breakdown</h2>
        {(storyRef?.reviewed || approved) && <span className="rounded-full bg-secondary px-3 py-1.5 text-[13px] font-bold">{storyRef?.reviewed ? "Built from our rating · Reviewed by Leyla" : "Built from our AI rating · not yet reviewed"}</span>}
      </div>
      {shown.headline && (
        <div className="flex flex-col gap-1">
          {shown.url ? <ExtLink href={shown.url} className="font-display text-xl font-bold text-link underline underline-offset-4 hover:text-link-hover">{shown.headline}</ExtLink>
            : <p className="font-display text-xl font-bold">{shown.headline}</p>}
          {(outlet || shown.date) && <p className="text-sm text-muted-foreground">{[outlet, fmtDate(shown.date)].filter(Boolean).join(" · ")}</p>}
          {shown.source === "mit" && shown.url && <p className="text-sm text-muted-foreground">Via <ExtLink href={shown.url} className="font-semibold underline">MIT News</ExtLink></p>}
        </div>
      )}
      {shown.cut && <p className="text-[15px] font-semibold">This article is long, so we decoded the first {shown.cut} paragraphs.</p>}
      <div className="grid gap-6 rounded-[14px] border border-border bg-card p-5 sm:p-7 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {!res ? (
          <div className="flex flex-col gap-3" aria-hidden="true">
            <div className="h-3 w-24 animate-pulse rounded bg-secondary" /><div className="h-4 w-full animate-pulse rounded bg-secondary" /><div className="h-4 w-4/5 animate-pulse rounded bg-secondary" />
            <div className="mt-2 h-3 w-28 animate-pulse rounded bg-secondary" /><div className="h-4 w-full animate-pulse rounded bg-secondary" /><div className="h-4 w-3/5 animate-pulse rounded bg-secondary" />
          </div>
        ) : (
        <div className={`flex flex-col gap-4 ${summaryWait ? "opacity-70" : ""}`}>
          {res.summary && <div><h3 className="label-caps">Summary</h3><p className="mt-1 text-[17px] leading-relaxed">{res.summary}</p></div>}
          {res.reason && <div><h3 className="label-caps">Our findings</h3><p className="mt-1 text-[17px] leading-relaxed">{res.reason}</p></div>}
        </div>
        )}
        <div className="flex flex-col gap-5 md:border-l md:border-border md:pl-6">
          {res ? <>
            <BigMeter kind="hype" level={res.hype_level} empty="Insufficient evidence to rate" />
            <BigMeter kind="gaps" level={res.gaps_level} empty="Insufficient evidence to rate" />
          </> : <div className="flex flex-col gap-3" aria-hidden="true"><div className="h-16 animate-pulse rounded-[10px] bg-secondary" /><div className="h-16 animate-pulse rounded-[10px] bg-secondary" /></div>}
        </div>
      </div>
      {insufficient && (
        <div className="grey-box">
          <strong>Insufficient evidence to rate{parseLevel(res.hype_level) || parseLevel(res.gaps_level) ? " one of the two scores" : ""}.</strong>{" "}
          Too few of the checks applied to give a score.
        </div>
      )}
      <section key={rated} className={`flex flex-col gap-3 rounded-[14px] border border-border bg-card p-5 sm:p-7 ${res && rated ? "notes-in" : ""}`}>
        <h2 className="font-display text-2xl font-extrabold">Decoded</h2>
        {res ? <p className="text-[15px] font-semibold">{notes} {notes === 1 ? "thing" : "things"} to notice in this article</p>
          : <p role="status" className="rounded-[10px] bg-secondary px-3 py-2 text-[15px] font-semibold">Notes are on their way… you can start reading.</p>}
        <Legend />
        <p className="text-sm text-muted-foreground">Select a highlight to see its note. Underline style shows the section: Headline and Context solid, Claims in proportion wavy, Wording dotted, Transparency double, Strength of evidence dashed.</p>
        <MarkedText headline={shown.headline} deck={shown.deck} paragraphs={shown.paragraphs} marks={res?.marks ?? []} />
        {shown.source === "microsoft" && <p className="text-sm text-muted-foreground">© Microsoft</p>}
      </section>
      {missing.length > 0 && (
        <section className="flex flex-col gap-3 rounded-[14px] border border-border bg-card p-5 sm:p-7">
          <h2 className="font-display text-xl font-extrabold">What's missing</h2>
          <ul className="flex flex-col gap-3">
            {missing.map((m) => <li key={m.code} className="flex flex-col items-start gap-1.5"><NotePill m={m} /><span className="text-[15px] leading-relaxed">{m.reason}</span></li>)}
          </ul>
        </section>
      )}
      {shown.url && (
        <ExtLink href={shown.url} className={`${storyMode ? "inline-flex min-h-11 items-center rounded-full border-2 border-primary bg-card px-5 font-semibold text-foreground hover:bg-secondary" : btnDark} self-start`}>Read the full article at {outlet}</ExtLink>
      )}
      {res && res.tips.length > 0 && <TipBox tips={res.tips} />}
      <div className="flex flex-wrap gap-3">
        {storyMode && <Link to="/story/$id" params={{ id: info.id }} className={btnDark}>Back to the story</Link>}
        <button type="button" onClick={another} className="min-h-11 rounded-full border-2 border-primary bg-card px-5 font-semibold text-foreground hover:bg-secondary">Decode another article</button>
      </div>
    </section>
  );

  // Loading, errors and the result all appear under the form that was used.
  const feedback = (
    <>
      {progressPanel}
      {msg && <p role="alert" className="font-semibold">{msg}</p>}
      {failBlock}
      {resultBlock}
    </>
  );

  return (
    <div className="mx-auto w-full max-w-[1140px] px-5 pb-14 pt-2 sm:px-8">
      <main className="flex min-w-0 flex-col gap-6">
        {storyMode ? (
          <div className="flex flex-col gap-2.5">
            <Link to="/story/$id" params={{ id: info.id }} className="inline-flex min-h-11 items-center self-start font-semibold">← Back to the story</Link>
            <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-[38px]">Decoding: {info.headline}</h1>
            <p className="text-sm text-muted-foreground">{info.outlet}</p>
            {!res && !busy && !fail && !msg && (
              <div className="flex flex-col items-start gap-2 pt-2">
                <button type="button" className={btnDark} onClick={() => runFeedStory(info)}>Decode it</button>
                <span className="text-sm text-muted-foreground">{info.approved ? "Free · opens instantly" : leftLine ? `Uses 1 of your ${leftLine.replace(" left today", "")} left today` : ""}</span>
              </div>
            )}
            {feedback}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5">
              <h1 className="font-display text-3xl font-extrabold sm:text-[40px]">Decode an article</h1>
              <p className="max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                Paste a link to a news story about AI. We'll read it and show you, sentence by sentence, where it turns up the hype and what evidence it leaves out. <strong className="text-foreground">We don't save the link, the article or the result.</strong>
              </p>
            </div>

            <form onSubmit={submitLink} className="flex flex-col gap-4 rounded-[14px] border border-border bg-card p-5 sm:p-7" noValidate>
              <label className="flex flex-col gap-1.5"><span className={labelCls}>Link to the article</span>
                <input ref={topRef} className={field} type="url" inputMode="url" placeholder="https://…" value={url} onChange={(e) => setUrl(e.target.value)} maxLength={2000} readOnly={busy} /></label>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-muted-foreground">{leftLine}</span>
                <button className={`${btnDark} disabled:opacity-70`} disabled={busy}>{busy && origin === "link" ? <span className="inline-flex items-center gap-2">{spinner}Decoding…</span> : "Decode it"}</button>
              </div>
            </form>
            {origin === "link" && feedback}
          </>
        )}




        {pasteMode && (
          <>
          <form onSubmit={submitText} className="flex flex-col gap-4 rounded-[14px] border border-border bg-card p-5 sm:p-7" noValidate>
            <h2 className="font-display text-xl font-extrabold">Paste the article text</h2>
            <label className="flex flex-col gap-1.5"><span className={labelCls}>Headline</span>
              <input className={field} value={headline} onChange={(e) => setHeadline(e.target.value)} maxLength={500} required readOnly={busy} /></label>
            <label className="flex flex-col gap-1.5"><span className={labelCls}>Line under the headline <span className="font-normal text-muted-foreground">(optional)</span></span>
              <input className={field} value={deck} onChange={(e) => setDeck(e.target.value)} maxLength={1000} readOnly={busy} /></label>
            <label className="flex flex-col gap-1.5"><span className={labelCls}>Article text</span>
              <textarea className={`${field} resize-y leading-normal`} rows={10} value={text} maxLength={MAX} onChange={(e) => setText(e.target.value)} placeholder="Paste the article text. Leave a blank line between paragraphs." readOnly={busy} /></label>
            <p className="text-[13px] text-muted-foreground" aria-live="polite">{text.length.toLocaleString("en-GB")} / 12,000 characters · minimum 200</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold text-muted-foreground">{leftLine}</span>
              <button className={`${btnDark} disabled:opacity-70`} disabled={busy}>{busy && origin === "paste" ? <span className="inline-flex items-center gap-2">{spinner}Decoding…</span> : "Decode it"}</button>
            </div>
          </form>
          {origin === "paste" && feedback}
          </>
        )}

        <section className="flex flex-col gap-3 rounded-[14px] border border-border bg-card p-5">
          <h2 className="font-display text-xl font-extrabold">Your privacy</h2>
          {fromFeed && shown ? <p className="text-[15px] leading-relaxed">We read this story's text, which we collected from {shown.outlet ?? "the publisher"}'s feed, and send it to Claude, our AI model, to break it down. We don't save the result, and only you see it.</p>
          : <p className="text-[15px] leading-relaxed">We open the link you give us, read the article, and send its text to Claude, our AI model, to break it down. We don't save the link, the article or the result, and only you see it.</p>}
        </section>
      </main>
    </div>
  );
}
