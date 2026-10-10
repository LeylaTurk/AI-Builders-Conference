import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { checksLeft, decodeStory } from "@/lib/check.functions";
import { Legend, MarkedText, NotePill, familyCounts, missingMarks, type FocusRequest } from "@/components/MarkedText";
import { ExtLink } from "@/components/ExtLink";
import { requestDecode } from "@/lib/decode-intent";
import type { PublicStory } from "@/lib/public.functions";

const eureka = (s: PublicStory) => s.source === "eurekalert" || /eurekalert/i.test(s.outlet);
const focus = "focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2";

function CantDecode({ s }: { s: PublicStory }) {
  if (eureka(s)) return (
    <p className="text-sm text-muted-foreground">
      EurekAlert! doesn't allow us to show text from its releases, so this one can't be decoded.{" "}
      <ExtLink href={s.url} className="font-semibold underline">Read it at EurekAlert!</ExtLink>
    </p>
  );
  return (
    <p className="text-sm text-muted-foreground">
      We can't read this article from {s.outlet}, so we can't decode it here. You can still{" "}
      <Link to="/decode" search={{ paste: "1", headline: s.headline }} className="font-semibold underline">paste its text</Link>.
    </p>
  );
}

// Story page: big primary button, or a note when we hold no readable text.
export function DecodeStoryButton({ story: s }: { story: PublicStory }) {
  const getLeft = useServerFn(checksLeft);
  const free = !!s.rating;
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => { if (s.decodable && !free) getLeft().then((r) => setLeft(r.left)).catch(() => {}); }, [s.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!s.decodable) return <CantDecode s={s} />;
  const out = !free && left === 0;
  const cls = `flex min-h-14 w-full items-center justify-center gap-2 rounded-[12px] border border-primary bg-primary px-5 py-3 text-center text-lg font-bold text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground ${focus}`;
  return (
    <div className="flex flex-col gap-1.5">
      {out ? (
        <button type="button" disabled className={`${cls} cursor-not-allowed opacity-60`}>Decode this story</button>
      ) : (
        <Link to="/decode" search={{ story: s.id }} onClick={() => requestDecode(s.id)} className={cls}>
          <Magnifier /> Decode this story
        </Link>
      )}
      <p className="text-[15px]">See where the article turns up the hype and what evidence it leaves out.</p>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {free ? "Free · opens instantly" : out ? "Today's breakdowns are used up. Please try again tomorrow." : left !== null ? `Uses 1 of your ${left} ${left === 1 ? "breakdown" : "breakdowns"} left today` : ""}
      </p>
    </div>
  );
}

// Feed card: small text button next to the outlet link.
export function DecodeCardLink({ story: s }: { story: PublicStory }) {
  if (!s.decodable) return null;
  return (
    <Link to="/decode" search={{ story: s.id }} onClick={() => requestDecode(s.id)}
      className={`inline-flex min-h-11 items-center gap-1.5 px-2 font-semibold text-link underline underline-offset-4 hover:text-link-hover ${focus}`}>
      <Magnifier /> Sentence-by-sentence breakdown
    </Link>
  );
}

function Magnifier() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
}

// Story page: the full sentence-by-sentence breakdown for a rated story, built from the saved rating (no AI call).
// Loaded in the browser after the page opens, so the article text never sits in the page sent to search engines.
type Breakdown = Awaited<ReturnType<typeof decodeStory>>;
export type NoteCounts = { hype: number; gaps: number };
export function StoryBreakdown({ story: s, focus, onCounts }: { story: PublicStory; focus?: FocusRequest | null; onCounts?: (c: NoteCounts | null) => void }) {
  const run = useServerFn(decodeStory);
  const [b, setB] = useState<Breakdown | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => { run({ data: { id: s.id } }).then(setB).catch(() => setErr(true)); }, [s.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (b?.result && b.article) onCounts?.(familyCounts(b.article, b.result.marks));
  }, [b]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!s.decodable) return <CantDecode s={s} />;
  const box = "flex flex-col gap-3 rounded-[14px] border border-border bg-card p-5 sm:p-7 scroll-mt-4";
  if (err || (b && (!b.result || !b.article))) return <section id="breakdown" className={box}><p className="text-muted-foreground">The sentence-by-sentence breakdown couldn't load. Please refresh.</p></section>;
  if (!b) return <section id="breakdown" className={box} aria-busy="true"><h2 className="font-display text-2xl font-extrabold">Decoded</h2><p className="text-muted-foreground">Loading the breakdown…</p></section>;
  const res = b.result!, a = b.article!;
  const missing = missingMarks(a, res.marks);
  return (
    <>
      <section id="breakdown" className={box}>
        <h2 className="font-display text-2xl font-extrabold">Decoded</h2>
        <p className="text-sm font-semibold text-muted-foreground">{b.story?.reviewed ? "Built from our rating · Reviewed by Leyla" : "Built from our expert-designed AI rating system · not yet reviewed"}</p>
        {b.cut && <p className="text-[15px] font-semibold">This article is long, so we decoded the first {b.cut} paragraphs.</p>}
        <Legend />
        <MarkedText headline={a.headline} deck={a.deck} paragraphs={a.paragraphs} marks={res.marks} focus={focus} />
        {s.source === "microsoft" && <p className="text-sm text-muted-foreground">© Microsoft</p>}
      </section>
      {missing.length > 0 && (
        <section id="whats-missing" className={box}>
          <h2 className="font-display text-xl font-extrabold">What's missing</h2>
          <ul className="flex flex-col gap-3">
            {missing.map((m) => <li key={m.code} className="flex flex-col items-start gap-1.5"><NotePill m={m} /><span className="text-[15px] leading-relaxed">{m.reason}</span></li>)}
          </ul>
        </section>
      )}
    </>
  );
}
