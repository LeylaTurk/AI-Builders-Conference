import { LoadError } from "@/components/LoadError";
import { ogImage } from "@/lib/og";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useId } from "react";
import { Search } from "lucide-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getStory } from "@/lib/public.functions";
import { BigMeter } from "@/components/RatingDetail";
import { btnDark } from "@/components/StoryRating";
import { DecodeStoryButton, StoryBreakdown } from "@/components/DecodeStory";
import { ExtLink } from "@/components/ExtLink";

const storyQuery = (id: string) =>
  queryOptions({ queryKey: ["story", id], queryFn: () => getStory({ data: { id } }) });

export const Route = createFileRoute("/story/$id")({
  loader: async ({ context, params }) => {
    if (!/^[0-9a-f-]{36}$/i.test(params.id)) throw notFound();
    const s = await context.queryClient.ensureQueryData(storyQuery(params.id));
    if (!s) throw notFound();
    return { headline: s.headline, summary: s.writeup?.story_summary ?? s.rating?.summary ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Story not found — Decoding the Hype" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.headline} — Decoding the Hype`;
    const desc = loaderData.summary || "Rated for hype and evidence gaps.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        ...ogImage,
      ],
    };
  },
  errorComponent: ({ reset }) => <LoadError className="mx-auto max-w-3xl p-8" message="This story couldn't load. Please refresh." reset={reset} />,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="font-display text-3xl font-bold">Story not found</h1>
      <p className="mt-3"><Link to="/">Back to the feed</Link></p>
    </main>
  ),
  component: StoryPage,
});

const focus = "focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2";

function StoryPage() {
  const { id } = Route.useParams();
  const { data: s } = useSuspenseQuery(storyQuery(id));
  if (!s) return null;
  const r = s.rating;
  const w = s.writeup;
  const empty = s.insufficient ? "Insufficient evidence to rate" : "Not rated yet";
  const date = s.published_date
    ? new Date(s.published_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    : "";
  const summary = w?.story_summary ?? r?.summary;
  const findings = w?.our_findings;
  return (
    <main className="mx-auto flex max-w-[760px] flex-col gap-6 lg:max-w-[1140px] px-5 pb-14 sm:px-8">
      <Link to="/" className="inline-flex min-h-11 items-center self-start font-semibold">← Back to the feed</Link>
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="chip">{s.kind}</span>
          <span>{s.outlet}</span>
          {date && <><span aria-hidden="true">·</span><span>{date}</span></>}
        </div>
        <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-[38px]">{s.headline}</h1>
        {s.source === "mit" && (
          <p className="text-sm text-muted-foreground">Via <ExtLink href={s.url} className="font-semibold underline">MIT News</ExtLink></p>
        )}
      </section>

      <section className="story-top grid min-w-0 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col">
          {r ? (
            <>
              {summary && <div><h2 className="story-eyebrow">Summary</h2><p className="story-lead mt-2.5">{summary}</p></div>}
              {findings && (
                <div className={summary ? "mt-6" : ""}>
                  <div className="story-find-head"><Search aria-hidden="true" />Our findings</div>
                  <p className="story-find-body">{findings}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">{s.insufficient ? "We couldn't read the article text, so it isn't rated." : "This story hasn't been rated yet."}</p>
          )}
        </div>
        <div className="story-ratings flex min-w-0 flex-col gap-5 md:border-l md:pl-6">
          <BigMeter kind="hype" level={r?.hype_level ?? null} empty={empty} />
          <BigMeter kind="gaps" level={r?.gaps_level ?? null} empty={empty} />
          <Link to="/how-ratings-work" className={`story-means inline-flex min-h-11 items-center text-sm ${focus}`}>What do these ratings mean? <span aria-hidden="true" className="ml-1">→</span></Link>
        </div>
      </section>

      {r ? <StoryBreakdown story={s} /> : <DecodeStoryButton story={s} />}

      <ReadFull url={s.url} outlet={s.outlet} />

      <KeepGoing />


    </main>
  );
}

function ReadFull({ url, outlet }: { url: string; outlet: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${btnDark} max-w-full self-start whitespace-normal ${focus}`}>
      Read the full article at {outlet}
      <span className="sr-only"> (opens in a new tab)</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
    </a>
  );
}


function KeepGoing() {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className="keep-going flex flex-col">
      <h2 id={headingId} className="keep-heading">Keep going</h2>
      <div className="keep-grid">
        <Link to="/claims" className={`keep-card keep-card-main ${focus}`}>
          <p className="keep-eyebrow">Claim Tracker</p>
          <h3 className="keep-title">Follow the big AI claims</h3>
          <p className="keep-line">See where claims about jobs, water, energy and more came from, and what the evidence says.</p>
          <span className="keep-btn">Explore the Claim Tracker <span aria-hidden="true">→</span></span>
        </Link>
        <Link to="/decode" className={`keep-card keep-card-plain ${focus}`}>
          <p className="keep-eyebrow">Decode</p>
          <h3 className="keep-title">Check another story</h3>
          <p className="keep-line">Paste a link to any AI news story and see its hype and evidence gaps.</p>
          <span className="keep-link">Decode an article <span aria-hidden="true">→</span></span>
        </Link>
      </div>
      <Link to="/" className={`keep-back inline-flex min-h-11 items-center font-semibold ${focus}`}>← Back to the feed</Link>
    </section>
  );
}
