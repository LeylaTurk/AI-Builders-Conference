// Sticker-style "Reader tip" box (highlighter yellow, violet border, offset shadow).
// Shared by the story page and /rate. Text comes from src/lib/tips.ts.
import { useId } from "react";

export function TipBox({ tips }: { tips: string[] }) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className="my-2 flex flex-col gap-5 rounded-[14px] border-2 border-primary bg-highlighter p-7 shadow-[6px_6px_0_0_var(--primary)]"
    >
      <span className="inline-flex -rotate-2 items-center gap-1.5 self-start rounded-full bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.4 1 2.5h6c0-1.1.3-1.9 1-2.5A6 6 0 0 0 12 3Z" />
        </svg>
        Reader tip
      </span>
      <h2 id={headingId} className="font-display text-2xl font-extrabold">Next time you read a story like this</h2>
      <ol className="flex flex-col gap-4">
        {tips.map((t, i) => (
          <li key={t} className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground"
            >
              {i + 1}
            </span>
            <span className="max-w-[680px] pt-1.5 text-[16px] leading-relaxed">{t}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
