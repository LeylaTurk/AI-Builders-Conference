import { Link } from "@tanstack/react-router";
import type { PublicStory } from "@/lib/public.functions";
import { CardMeter } from "@/components/RatingIcons";

export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC";

export function timeAgo(iso: string | null) {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} hours ago`;
  const d = Math.round(s / 86400);
  if (d < 30) return d === 1 ? "1 day ago" : `${d} days ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

const btnDark = "inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-primary bg-primary px-[18px] font-semibold text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground";
const btnLine = "inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#CFC8DD] bg-card px-[18px] font-semibold text-foreground hover:bg-secondary hover:text-foreground";
const focus = "focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2";

export function StoryCard({ story: s }: { story: PublicStory }) {
  const r = s.rating;
  const empty = s.insufficient ? "Insufficient evidence" : "Not rated yet";
  return (
    <article className="story-card relative flex flex-col gap-3.5 rounded-[14px] border border-border bg-card p-5 sm:px-7 sm:py-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span className="chip">{s.kind}</span>
        <span>{s.outlet}</span>
        <span aria-hidden="true">·</span>
        <span>{timeAgo(s.published_at)}</span>
      </div>
      <h2 className="card-headline font-display text-xl font-semibold leading-tight text-foreground">{s.headline}</h2>
      {r?.summary && <p className="text-base leading-relaxed text-muted-foreground">{r.summary}</p>}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <CardMeter kind="hype" level={r?.hype_level ?? null} emptyWord={empty} />
        <CardMeter kind="gaps" level={r?.gaps_level ?? null} emptyWord={empty} />
      </div>
      {r ? (
        r.reason && <div className="why-box">{r.reason}</div>
      ) : s.insufficient ? (
        <div className="grey-box"><strong>Insufficient evidence to rate.</strong> We couldn't read the article text.</div>
      ) : (
        <div className="grey-box">Not rated yet.</div>
      )}
      <div className="flex flex-col items-start gap-x-4 gap-y-1 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/story/$id" params={{ id: s.id }} aria-label={`Decode this article: ${s.headline}`} className="card-cta inline-flex min-h-11 items-center after:absolute after:inset-0 after:rounded-[14px] after:content-['']">
          Decode this article<span className="card-arrow ml-1.5" aria-hidden="true">→</span>
        </Link>
        <a href={s.url} target="_blank" rel="noopener noreferrer" className={`card-source relative z-10 inline-flex min-h-11 items-center gap-1 px-1 underline underline-offset-4 hover:text-link-hover ${focus}`}>
          Read original<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

export { btnLine, btnDark };
