import type { AnchorHTMLAttributes, ReactNode } from "react";

/** True for absolute http(s) links, i.e. links to other websites. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Link to another website. Always opens in a new tab, with an aria-hidden ↗
 * and visually hidden "(opens in a new tab)" for screen readers.
 */
export function ExtLink({
  href,
  children,
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span aria-hidden="true">{" ↗"}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
