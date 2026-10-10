import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="night-header text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 pb-12 pt-6 sm:px-8">
        <div className="flex flex-col gap-1">
          <Link to="/" className="inline-flex min-h-11 flex-wrap items-center gap-y-1 font-display text-3xl font-extrabold tracking-tight text-primary-foreground hover:text-primary-foreground sm:text-4xl">
            Decoding the{" "}
            <span
              className="inline-block ml-[0.25em] rounded-[4px] bg-highlighter px-[0.15em] pt-[0.04em] pb-[0.14em] align-baseline text-foreground"
              style={{ transform: "rotate(-2deg)", transformOrigin: "bottom left" }}
            >
              Hype
            </span>
          </Link>
          <p className="font-sans text-base font-medium tracking-[0.01em] text-primary-foreground/80 sm:text-lg">AI news, headlines, and claims</p>
        </div>
        <nav aria-label="Main" className="flex w-full flex-wrap gap-1 md:w-auto">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="inline-flex min-h-11 items-center rounded-full px-3 sm:px-4 font-semibold text-primary-foreground hover:bg-highlighter/25 hover:text-primary-foreground hover:ring-1 hover:ring-highlighter/60"
            activeProps={{ className: "bg-highlighter !text-foreground hover:bg-highlighter hover:ring-0", "aria-current": "page" }}
          >
            Feed
          </Link>
          <Link
            to="/decode"
            aria-label="Decode an article"
            className="inline-flex min-h-11 items-center rounded-full px-3 sm:px-4 font-semibold text-primary-foreground hover:bg-highlighter/25 hover:text-primary-foreground hover:ring-1 hover:ring-highlighter/60"
            activeProps={{ className: "bg-highlighter !text-foreground hover:bg-highlighter hover:ring-0", "aria-current": "page" }}
          >
            <span className="min-[480px]:hidden">Decode</span><span className="hidden min-[480px]:inline">Decode an article</span>
          </Link>
          <Link
            to="/claims"
            className="inline-flex min-h-11 items-center rounded-full px-3 sm:px-4 font-semibold text-primary-foreground hover:bg-highlighter/25 hover:text-primary-foreground hover:ring-1 hover:ring-highlighter/60"
            activeProps={{ className: "bg-highlighter !text-foreground hover:bg-highlighter hover:ring-0", "aria-current": "page" }}
          >
            Claim Tracker
          </Link>
        </nav>
      </div>
    </header>
  );
}
