import { useEffect, useState, type CSSProperties } from "react";
import type { Mark } from "@/lib/check.functions";
import { CHECK_NAMES } from "@/lib/findings";
import { Chilli, Flag } from "@/components/RatingIcons";

export const PROBLEM_NAMES: Record<string, string> = {
  H1: "Headline claims more than the story shows", H2: "Headline drops the uncertainty", H3: "Clickbait wording",
  P1: "Sounds surer than the source", P2: "Finding stretched too far", P3: "Prediction stated as fact",
  W1: "Promotional language", W2: "AI described as human",
  T1: "Unnamed source", T2: "No independent expert", T3: "Conflict of interest not mentioned", T4: "Main source not linked", T5: "Claim repeated, not checked",
  S1: "Nothing a reader can check", S2: "Evidence too thin for this claim", S3: "Number not explained", S4: "No independent confirmation",
  C1: "Doesn't say what's unproven", C2: "Missing background", C3: "Unexplained jargon", C4: "Announcement presented as news",
};

export const markName = (m: Mark) =>
  m.family === "good" ? `Good practice: ${(CHECK_NAMES[m.code] ?? m.code).replace(/^./, (c) => c.toLowerCase())}` : PROBLEM_NAMES[m.code] ?? m.code;

const COLORS = {
  hype: { bg: "#FCE3D7", line: "#EB6834" },
  gaps: { bg: "#F7DCE2", line: "#B3123A" },
  good: { bg: "#D6F2E6", line: "#1BAF7A" },
} as const;
const STYLE: Record<string, CSSProperties["textDecorationStyle"]> = {
  Headline: "solid", "Claims in proportion": "wavy", Wording: "dotted", Transparency: "double", "Strength of evidence": "dashed", Context: "solid",
};

type Block = { id: string; label: string; text: string; kind: "headline" | "deck" | "para" };
type Group = { id: string; block: string; start: number; end: number; marks: Mark[] };

// Same-length normalisation so indices still line up with the original text.
const norm = (s: string) => s.replace(/[\u2018\u2019\u201B]/g, "'").replace(/[\u201C\u201D\u201F]/g, '"').replace(/[\u2013\u2014]/g, "-").toLowerCase();
const cleanQuote = (q: string) => q.trim().replace(/^["'\u201C\u201D\u2018\u2019]+|["'\u201C\u201D\u2018\u2019]+$/g, "").replace(/\s*(\.\.\.|…)\s*$/, "").trim();

function targetBlock(p: string | null, blocks: Block[]) {
  const s = (p ?? "").toLowerCase();
  if (s.includes("headline")) return "headline";
  if (s.includes("deck")) return "deck";
  const n = s.replace(/[^\d]/g, "");
  return n ? `p${n}` : null;
}

export function locate(marks: Mark[], blocks: Block[]) {
  const ranges: { block: string; start: number; end: number; mark: Mark }[] = [];
  const missing: Mark[] = [];
  for (const m of marks) {
    if (!m.quote) { if (m.family !== "good") missing.push(m); continue; }
    const q = norm(cleanQuote(m.quote));
    const want = targetBlock(m.paragraph, blocks);
    const order = [...blocks.filter((b) => b.id === want), ...blocks.filter((b) => b.id !== want)];
    let hit: { block: string; start: number } | null = null;
    for (const b of order) {
      const i = q ? norm(b.text).indexOf(q) : -1;
      if (i >= 0) { hit = { block: b.id, start: i }; break; }
    }
    if (hit) ranges.push({ block: hit.block, start: hit.start, end: hit.start + q.length, mark: m });
    else if (m.family !== "good") missing.push(m);
  }
  // One highlight and one note per sentence, and each problem name only once.
  // Priority: Evidence gaps, then Hype, then Good practice; then check-list order.
  const FAM = { gaps: 0, hype: 1, good: 2 } as const;
  const ORDER = Object.keys(PROBLEM_NAMES);
  const rank = (m: Mark) => FAM[m.family] * 100 + (ORDER.indexOf(m.code) + 1 || 99);
  const sentenceOf = (blockId: string, at: number) => {
    const text = blocks.find((b) => b.id === blockId)!.text;
    const re = /[^.!?]+(?:[.!?]+["'\u201D\u2019)\]]*|$)\s*/g;
    let m: RegExpExecArray | null, i = 0;
    while ((m = re.exec(text))) { if (at < m.index + m[0].length) return `${blockId}:${i}`; i++; if (!m[0]) break; }
    return `${blockId}:${i}`;
  };
  const usedCodes = new Set<string>(), usedSent = new Set<string>();
  const kept: typeof ranges = [];
  for (const r of [...ranges].sort((x, y) => rank(x.mark) - rank(y.mark))) {
    const key = sentenceOf(r.block, r.start);
    if (usedCodes.has(r.mark.code) || usedSent.has(key)) continue;
    if (kept.some((k) => k.block === r.block && r.start < k.end && k.start < r.end)) continue;
    usedCodes.add(r.mark.code); usedSent.add(key); kept.push(r);
  }
  const blockIdx = (id: string) => blocks.findIndex((b) => b.id === id);
  kept.sort((x, y) => blockIdx(x.block) - blockIdx(y.block) || x.start - y.start);
  const groups: Group[] = kept.map((r, i) => ({ id: `g${i}`, block: r.block, start: r.start, end: r.end, marks: [r.mark] }));
  // Unplaced findings go to "What's missing" unless that problem already has a note.
  const seen = new Set<string>();
  const missingOut = missing.filter((m) => !usedCodes.has(m.code) && !seen.has(m.code) && seen.add(m.code));
  missing.length = 0; missing.push(...missingOut);
  return { groups, missing };
}

function Icon({ m }: { m: Mark }) {
  if (m.family === "hype") return <Chilli lit size={16} />;
  if (m.family === "gaps") return <Flag lit size={15} color="var(--flag-4)" />;
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
  );
}

export function NotePill({ m }: { m: Mark }) {
  const c = COLORS[m.family];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-bold text-foreground" style={{ background: c.bg, boxShadow: `inset 0 0 0 1px ${c.line}` }}>
      <Icon m={m} />{markName(m)}
    </span>
  );
}

type TextIn = { headline: string | null; deck: string | null; paragraphs: string[] };
function toBlocks({ headline, deck, paragraphs }: TextIn): Block[] {
  return [
    ...(headline ? [{ id: "headline", label: "H", text: headline, kind: "headline" as const }] : []),
    ...(deck ? [{ id: "deck", label: "D", text: deck, kind: "deck" as const }] : []),
    ...paragraphs.map((t, i) => ({ id: `p${i + 1}`, label: String(i + 1), text: t, kind: "para" as const })),
  ];
}

/** Findings with nothing to underline: no quote, or the quote isn't in the text. */
export const missingMarks = (t: TextIn, marks: Mark[]) => locate(marks, toBlocks(t)).missing;

export const noteCount = (t: TextIn, marks: Mark[]) => locate(marks, toBlocks(t)).groups.length;

/** Notes per type: highlighted sentences plus that type's "What's missing" items. */
export function familyCounts(t: TextIn, marks: Mark[]) {
  const { groups, missing } = locate(marks, toBlocks(t));
  const n = (f: "hype" | "gaps") => groups.filter((g) => g.marks[0]!.family === f).length + missing.filter((m) => m.family === f).length;
  return { hype: n("hype"), gaps: n("gaps") };
}

/** A request from outside (the meters) to open the first note of one type. */
export type FocusRequest = { family: "hype" | "gaps"; nonce: number };

const Num = ({ n, color }: { n: number; color: string }) => (
  <span aria-hidden="true" className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 align-[2px] font-sans text-[11px] font-bold text-primary-foreground" style={{ background: color, textDecoration: "none" }}>{n}</span>
);

function useDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function NoteBody({ m, n }: { m: Mark; n: number }) {
  return (
    <>
      <span className="flex flex-wrap items-center gap-2"><Num n={n} color="var(--primary)" /><NotePill m={m} /></span>
      <span className="text-[15px] leading-relaxed">{m.reason}</span>
    </>
  );
}

export function MarkedText({ marks, focus, ...t }: TextIn & { marks: Mark[]; focus?: FocusRequest | null | undefined }) {
  const blocks = toBlocks(t);
  const { groups } = locate(marks, blocks);
  const desktop = useDesktop();
  const [active, setActive] = useState<string | null>(null);
  const [offscreen, setOffscreen] = useState(false);
  // Desktop opens on note 1; mobile starts with nothing open.
  useEffect(() => { setActive(desktop && groups.length ? groups[0]!.id : null); }, [desktop, groups.length]); // eslint-disable-line react-hooks/exhaustive-deps
  const idx = groups.findIndex((g) => g.id === active);
  const cur = idx >= 0 ? groups[idx]! : null;

  // Track whether the selected highlight is visible (desktop "Show in article").
  useEffect(() => {
    setOffscreen(false);
    if (!desktop || !active) return;
    const el = document.getElementById(`hl-${active}`);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e!.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [active, desktop]);

  const reveal = (id: string, mobile: boolean) => {
    const el = document.getElementById(mobile ? `note-${id}` : `hl-${id}`) ?? document.getElementById(`hl-${id}`);
    if (!el) return;
    const behavior = reduceMotion() ? "auto" : "smooth";
    if (mobile) el.scrollIntoView({ behavior, block: "nearest" });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 3, behavior });
    document.getElementById(`hl-${id}`)?.focus({ preventScroll: true });
  };
  const select = (id: string) => setActive((a) => (!desktop && a === id ? null : id));
  const go = (d: number) => {
    if (!groups.length) return;
    const i = idx < 0 ? (d > 0 ? 0 : groups.length - 1) : idx + d;
    if (i < 0 || i >= groups.length) return;
    const id = groups[i]!.id;
    setActive(id);
    requestAnimationFrame(() => reveal(id, !desktop));
  };
  // Open the first note of the requested type; fall back to "What's missing" when it has no highlight.
  useEffect(() => {
    if (!focus) return;
    const g = groups.find((x) => x.marks[0]!.family === focus.family);
    if (!g) {
      document.getElementById("whats-missing")?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
      return;
    }
    setActive(g.id);
    requestAnimationFrame(() => requestAnimationFrame(() => reveal(g.id, !desktop)));
  }, [focus?.nonce, desktop]); // eslint-disable-line react-hooks/exhaustive-deps

  const navBtn = "min-h-11 rounded-full border border-border bg-card px-4 text-sm font-semibold hover:bg-secondary focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50";
  const counter = idx < 0 ? `${groups.length} notes` : `Note ${idx + 1} of ${groups.length}`;
  const nav = (
    <>
      <button type="button" className={navBtn} onClick={() => go(-1)} disabled={idx === 0}>Previous</button>
      <span className="text-sm font-bold">{counter}</span>
      <button type="button" className={navBtn} onClick={() => go(1)} disabled={idx === groups.length - 1}>Next</button>
    </>
  );

  const article = blocks.map((b) => {
    const gs = groups.filter((g) => g.block === b.id);
    const parts: React.ReactNode[] = [];
    let pos = 0;
    for (const g of gs) {
      if (g.start > pos) parts.push(b.text.slice(pos, g.start));
      const m = g.marks[0]!;
      const c = COLORS[m.family];
      const on = active === g.id;
      const n = groups.indexOf(g) + 1;
      parts.push(
        <span key={g.id} id={`hl-${g.id}`} role="button" tabIndex={0} onClick={() => select(g.id)}
          aria-pressed={desktop ? on : undefined} aria-expanded={desktop ? undefined : on} aria-controls={!desktop && on ? `note-${g.id}` : undefined}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(g.id); } }}
          aria-label={`Note ${n}: ${b.text.slice(g.start, g.end)} — ${markName(m)}${desktop ? "" : on ? " (note open)" : " (note closed)"}`}
          className="cursor-pointer scroll-mt-24 rounded-[3px] px-0.5 py-0.5 text-foreground [box-decoration-break:clone] focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2"
          style={{ background: on ? `color-mix(in srgb, ${c.bg} 70%, ${c.line} 30%)` : c.bg, textDecorationLine: "underline", textDecorationColor: c.line, textDecorationStyle: STYLE[m.section] ?? "solid", textDecorationThickness: "2px", textUnderlineOffset: "4px", outline: on ? `2px solid ${c.line}` : undefined }}>
          {b.text.slice(g.start, g.end)}
          <span aria-hidden="true" className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 align-[2px] font-sans text-[11px] font-bold text-primary-foreground"
            style={{ background: "var(--primary)", boxShadow: on ? `0 0 0 2px var(--card), 0 0 0 4px ${c.line}` : undefined }}>{n}</span>
        </span>,
      );
      pos = g.end;
    }
    if (pos < b.text.length) parts.push(b.text.slice(pos));
    const textCls = b.kind === "headline" ? "font-display text-2xl font-bold leading-snug" : b.kind === "deck" ? "font-serif text-lg italic leading-relaxed" : "font-serif text-[17px] leading-[1.7]";
    const open = !desktop ? gs.find((g) => g.id === active) : undefined;
    return (
      <div key={b.id} className="py-2">
        <p className={textCls}>{parts}</p>
        {open && (() => {
          const m = open.marks[0]!; const c = COLORS[m.family];
          return (
            <div id={`note-${open.id}`} className="mt-2 flex scroll-mt-24 flex-col items-start gap-2 rounded-[10px] border border-border bg-card p-4 animate-in fade-in slide-in-from-top-2 duration-200" style={{ borderLeft: `4px solid ${c.line}` }}>
              <NoteBody m={m} n={groups.indexOf(open) + 1} />
              <button type="button" className={`${navBtn} self-end`} onClick={() => { setActive(null); document.getElementById(`hl-${open.id}`)?.focus(); }}>Close</button>
            </div>
          );
        })()}
      </div>
    );
  });

  if (!desktop) {
    return (
      <div className="flex flex-col gap-1">
        {groups.length > 0 && (
          <div className="sticky top-0 z-10 -mx-2 mb-2 flex items-center justify-between gap-3 rounded-[10px] border border-border bg-card/95 px-3 py-1.5 backdrop-blur">{nav}</div>
        )}
        {article}
      </div>
    );
  }

  const cm = cur?.marks[0];
  return (
    <div className="grid grid-cols-[minmax(0,680px)_380px] gap-12">
      <div className="flex min-w-0 flex-col gap-1">{article}</div>
      {groups.length > 0 && (
        <div className="relative">
          <aside aria-label="Notes" className="sticky top-6 flex max-h-[calc(100vh-48px)] flex-col gap-3 overflow-y-auto rounded-[10px] border border-border bg-card p-4"
            style={cm ? { borderLeft: `4px solid ${COLORS[cm.family].line}` } : undefined}>
            <div className="flex items-center justify-between gap-2">{nav}</div>
            <div aria-live="polite" className="flex flex-col items-start gap-2">
              {cm && cur ? <NoteBody m={cm} n={idx + 1} /> : <span className="text-[15px] text-muted-foreground">Select a highlight to see its note.</span>}
            </div>
            {cur && offscreen && (
              <button type="button" className="min-h-11 self-start text-sm font-semibold text-link underline underline-offset-4 hover:text-link-hover" onClick={() => reveal(cur.id, false)}>Show in article</button>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export function Legend() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Highlight types">
      {([["hype", "Hype"], ["gaps", "Evidence gaps"], ["good", "Good practice"]] as const).map(([f, l]) => (
        <li key={f} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-bold" style={{ background: COLORS[f].bg, boxShadow: `inset 0 0 0 1px ${COLORS[f].line}` }}>
          <Icon m={{ family: f } as Mark} />{l}
        </li>
      ))}
    </ul>
  );
}
