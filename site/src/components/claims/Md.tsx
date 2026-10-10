import ReactMarkdown from "react-markdown";
import { Link } from "@tanstack/react-router";
import { ExtLink, isExternal } from "@/components/ExtLink";

/** Safe Markdown: raw HTML is not rendered. Internal /claims/<slug> links use the router. */
export function Md({ children }: { children: string }) {
  return (
    <div className="ct-md">
      <ReactMarkdown
        components={{
          a: ({ href = "", children: c }) => {
            const m = /^\/claims\/([a-z-]+)$/.exec(href);
            if (m) return <Link to="/claims/$slug" params={{ slug: m[1]! }}>{c}</Link>;
            if (isExternal(href)) return <ExtLink href={href}>{c}</ExtLink>;
            return <a href={href}>{c}</a>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export function NewTab({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <ExtLink href={href} className={className}>
      {children}
    </ExtLink>
  );
}
