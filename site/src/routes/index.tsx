import { LoadError } from "@/components/LoadError";
import { ogImage } from "@/lib/og";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { listFeed, type PublicStory } from "@/lib/public.functions";
import { StoryCard, fmtTime } from "@/components/StoryRating";
import { Chillies, Flags } from "@/components/RatingIcons";
import { SECTION } from "@/lib/claims";

const storiesQuery = queryOptions({ queryKey: ["feed"], queryFn: () => listFeed() });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Decoding the Hype — AI news, headlines, and claims" },
      { name: "description", content: "Be on top of the news and under the hype." },
      { property: "og:title", content: "Decoding the Hype" },
      { property: "og:description", content: "AI news, headlines, and claims — rated for hype and evidence gaps." },
      { property: "og:type", content: "website" },
      ...ogImage,
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(storiesQuery),
  errorComponent: ({ reset }) => <LoadError message="Stories couldn't load. Please refresh." reset={reset} />,
  notFoundComponent: () => <p className="p-8">Not found.</p>,
  component: Index,
});

const SORTS = ["Newest", "Most hyped", "Least hyped"] as const;
type Sort = (typeof SORTS)[number];
const lvl = (s: PublicStory, k: "hype_level" | "gaps_level") => (s.rating ? Number(s.rating[k]) || null : null);

function sortStories(list: PublicStory[], sort: Sort) {
  const newest = (a: PublicStory, b: PublicStory) => (b.published_at ?? "").localeCompare(a.published_at ?? "");
  const out = [...list];
  if (sort === "Newest") return out.sort(newest);
  const dir = sort === "Most hyped" ? -1 : 1;
  return out.sort((a, b) => {
    const x = lvl(a, "hype_level"), y = lvl(b, "hype_level");
    if (x === null && y === null) return newest(a, b);
    if (x === null) return 1;
    if (y === null) return -1;
    const gx = lvl(a, "gaps_level") ?? 99, gy = lvl(b, "gaps_level") ?? 99;
    return (x - y) * dir || gx - gy || newest(a, b);
  });
}

const PAGE = 12;

function Index() {
  const { data: { stories, checkedAt, allFailed } } = useSuspenseQuery(storiesQuery);
  const [sort, setSort] = useState<Sort>("Newest");
  const [count, setCount] = useState(PAGE);
  const listRef = useRef<HTMLUListElement>(null);
  const focusIndexRef = useRef<number | null>(null);
  const shown = useMemo(() => sortStories(stories, sort), [stories, sort]);
  const visible = shown.slice(0, count);
  const allShown = visible.length >= shown.length;

  const changeSort = (s: Sort) => {
    setSort(s);
    setCount(PAGE);
    focusIndexRef.current = null;
  };

  const showMore = () => {
    focusIndexRef.current = count;
    setCount((c) => c + PAGE);
  };

  useEffect(() => {
    const i = focusIndexRef.current;
    if (i === null) return;
    focusIndexRef.current = null;
    const item = listRef.current?.children[i];
    item?.querySelector<HTMLElement>("a")?.focus();
  }, [count]);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8">
      <h1 className="max-w-[24ch] pt-8 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] sm:text-[clamp(28px,3.6vw,34px)]">Be on top of the news and under the hype</h1>
      <p className="mt-4 max-w-[60ch] text-[17px] font-normal leading-[1.55] text-foreground/75 sm:text-[20px]">AI is changing how we work, learn and live. Sensational headlines pull the public debate towards the wrong fears and the wrong promises. We decode the hype so we can talk about what's actually happening.</p>
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="flex min-w-0 flex-col gap-5">
          <div>
            <h2 className="font-display text-[22px] font-bold leading-[1.2] sm:text-2xl">Latest AI stories</h2>
            <p className="mt-1.5 text-sm font-normal leading-[1.4] text-muted-foreground">
              {checkedAt ? `Feed checked ${fmtTime(checkedAt)} · ` : ""}rated from sources that permit it
            </p>
            {allFailed && <p role="status" className="mt-4 font-semibold">Couldn't refresh the feed. Showing the last stories we found.</p>}
          </div>
          <div role="group" aria-label="Sort stories" className="flex flex-wrap gap-2">
            {SORTS.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sort === s}
                onClick={() => changeSort(s)}
                className={`min-h-11 rounded-full border px-[18px] text-[15px] ${sort === s ? "font-semibold border-primary bg-primary text-primary-foreground" : "font-medium border-[#CFC8DD] bg-card text-foreground hover:bg-secondary"}`}
              >
                {s}
              </button>
            ))}
          </div>
          {shown.length === 0 ? (
            <p className="text-base">Rated stories coming soon.</p>
          ) : (
            <>
              <ul ref={listRef} className="mt-1 grid gap-5">
                {visible.map((s) => <li key={s.id}><StoryCard story={s} /></li>)}
              </ul>
              {allShown ? (
                <p className="mt-6 text-center text-[15px] text-muted-foreground">
                  You're all caught up. <Link to="/claims" className="font-semibold text-[#5B2EA6] underline-offset-2 hover:underline">Explore the Claim Tracker →</Link>
                </p>
              ) : (
                <div className="mt-6 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={showMore}
                    className="flex h-12 items-center rounded-full border border-[#E4D6FF] bg-card px-6 text-base font-semibold text-[#5B2EA6] hover:bg-secondary"
                  >
                    Show more stories
                  </button>
                  <p className="text-sm text-muted-foreground" aria-live="polite">Showing {visible.length} of {shown.length} stories</p>
                </div>
              )}
            </>
          )}
        </main>
        <aside className="flex flex-col gap-5">
          <section id="reading-the-ratings" className="scroll-mt-6 flex flex-col gap-4 rounded-[14px] border border-border bg-card p-5">
            <h2 className="font-display text-xl font-extrabold">Reading the ratings</h2>
            <div className="flex flex-col gap-1.5">
              <Chillies n={3} size={20} />
              <p className="text-sm leading-snug"><strong>Hype</strong>: how much the story oversells what's known. More chilis, more hype.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Flags n={2} size={20} />
              <p className="text-sm leading-snug"><strong>Evidence gaps</strong>: gaps in the evidence, such as missing sources, a weak or unreadable study, or limits left out. More flags, bigger gaps.</p>
            </div>
            <Link to="/how-ratings-work" className="inline-flex min-h-11 items-center text-sm font-semibold">How the ratings work →</Link>
          </section>
          <ClaimsInvite />
        </aside>
      </div>
    </div>
  );
}

function ClaimsInvite({ className }: { className?: string }) {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className={`rounded-[14px] border-2 border-primary bg-chip p-5 shadow-[5px_5px_0_0_var(--primary)] ${className ?? ""}`}>
      <span className="inline-flex -rotate-2 items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.6-3.6" />
        </svg>
        {SECTION.name}
      </span>
      <h3 id={headingId} className="mt-3 font-display text-lg font-extrabold leading-tight">{SECTION.feedInvitationTitle}</h3>
      <p className="mt-1.5 text-sm leading-snug">{SECTION.feedInvitationBody}</p>
      <Link
        to="/claims"
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-primary bg-primary px-4 text-center text-sm font-semibold text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
      >
        {SECTION.feedInvitationLinkText}
      </Link>
    </section>
  );
}
