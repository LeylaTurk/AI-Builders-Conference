import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl px-5 py-4 sm:px-8">
        <Link to="/how-ratings-work" className="inline-flex min-h-11 items-center text-sm font-semibold">How the ratings work</Link>
      </div>
    </footer>
  );
}
