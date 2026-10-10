import type { MouseEvent } from "react";
import story from "@/content/claim-trail-story.json";
import type { Topic } from "@/lib/claims";

type SStop = { stop: number; whatHappened: string; linkPhrase?: string; glanceValue: string; glanceCaption: string; glanceTone: "claim" | "check" | string };
type Phase = { label: string; headline: string; summary: string; stops: number[] };
type Story = { turningPointStop: number; phases: Phase[]; stops: SStop[]; glanceTitle: string; whereItStandsToday: string };

const STORIES = (story as unknown as { claims: Record<string, Story> }).claims;
export const trailStory = (slug: string): Story | undefined => STORIES[slug];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const FULL = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
export function shortDate(d: string) {
  const m = d.match(/([A-Za-z]+)\s+(?:\d{1,2},\s*)?(\d{4})/);
  if (m) { const i = FULL.indexOf(m[1]!.toLowerCase()); if (i >= 0) return `${MONTHS[i]} ${m[2]}`; }
  return d;
}

function dateParts(d: string) {
  const m = d.match(/([A-Za-z]+)\s+(?:(\d{1,2}),\s*)?(\d{4})/);
  if (!m) return { top: d, year: "" };
  const i = FULL.indexOf(m[1]!.toLowerCase());
  const mon = i >= 0 ? MONTHS[i]!.slice(0, i === 8 ? 4 : 3) : m[1]!;
  return { top: m[2] ? `${mon} ${m[2]}` : mon, year: m[3]! };
}

function What({ text, phrase, url, label }: { text: string; phrase?: string | undefined; url: string; label: string }) {
  const i = phrase ? text.indexOf(phrase) : -1;
  if (!phrase || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <a href={url} target="_blank" rel="noopener noreferrer" className="ctt-src" title={label} aria-label={`${phrase} (${label}, opens in a new tab)`}>
        {phrase}<span aria-hidden="true"> ↗</span>
      </a>
      {text.slice(i + phrase.length)}
    </>
  );
}

const CHAP = [
  { bg: "#C5A8FF", ink: "#3B1E6E", dot: "#C5A8FF" },
  { bg: "#FFD84D", ink: "#16131F", dot: "#E8B800" },
  { bg: "#F59A6A", ink: "#16131F", dot: "#F59A6A" },
  { bg: "#3B1E6E", ink: "#FFD84D", dot: "#3B1E6E" },
];

function jump(e: MouseEvent<HTMLAnchorElement>, n: number) {
  const el = document.getElementById(`stop-${n}`);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#stop-${n}`);
}

export function StoryTrail({ t, s, showGlance = false }: { t: Topic; s: Story; showGlance?: boolean }) {
  const stops = t.interactive.trail.stops;
  return (
    <>
      {showGlance && (
        <>
          <p className="ctt-label mt-6">{s.glanceTitle}</p>
          <div className="ctt-cards" role="list">
            {s.stops.map((g) => {
              const st = stops[g.stop - 1];
              const tp = g.stop === s.turningPointStop;
              return (
                <a key={g.stop} role="listitem" href={`#stop-${g.stop}`} onClick={(e) => jump(e, g.stop)} className={`ctt-card${tp ? " is-tp" : ""}`}>
                  <span className="ctt-val" style={{ color: g.glanceTone === "check" ? "#5B2EA6" : "#EB6834" }}>{g.glanceValue}</span>
                  <span className="ctt-cap">{g.glanceCaption}</span>
                  {st && <span className="ctt-date">{shortDate(st.date)}</span>}
                </a>
              );
            })}
          </div>
          <p className="ctt-hint">Orange: the claim growing. Purple: the checks. Tap a card to jump to that part of the story.</p>
        </>
      )}

      {s.phases.map((p, pi) => {
        const c = CHAP[pi % 4]!;
        return (
          <section key={pi} className="ctt-chap" aria-labelledby={`chap-${pi}`}>
            <span className="ctt-tile" style={{ background: c.bg, color: c.ink }}>{pi + 1} of {s.phases.length} · {p.label}</span>
            <h3 id={`chap-${pi}`} className="ctt-h3">{p.headline}</h3>
            <ol className="ctt-line" style={{ ["--chap" as string]: c.bg, ["--dot" as string]: c.dot }}>
              {p.stops.map((n) => {
                const st = stops[n - 1];
                const g = s.stops.find((x) => x.stop === n);
                if (!st) return null;
                const tp = n === s.turningPointStop;
                return (
                  <li key={n} id={`stop-${n}`} aria-label={st.title} className={`ctt-stop${tp ? " is-tp" : ""}`}>
                    <span className="ctt-dot" aria-hidden="true" />
                    {(() => { const dp = dateParts(st.date); return (
                      <span className="ctt-gut" aria-label={st.date}><span className="ctt-gm" aria-hidden="true">{dp.top}</span>{dp.year && <span className="ctt-gy" aria-hidden="true">{dp.year}</span>}</span>
                    ); })()}
                    {tp && <span className="ctt-tp">Turning point</span>}
                    <p className="ctt-what"><What text={g?.whatHappened ?? st.title} phrase={g?.linkPhrase} url={st.url} label={st.linkText} /></p>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}

      <div className="ctt-today">
        <p className="ctt-today-label">Where it stands today</p>
        <p className="ctt-today-text">{s.whereItStandsToday}</p>
      </div>
    </>
  );
}
