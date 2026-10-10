import type { ReactNode } from "react";
import type { Finding, SectionRow } from "@/lib/findings";
import { Chillies, Flags, GAPS_WORDS, HYPE_WORDS, parseLevel } from "@/components/RatingIcons";

export function BigMeter({ kind, level, empty, note }: { kind: "hype" | "gaps"; level: string | null; empty: string; note?: ReactNode }) {
  const n = parseLevel(level);
  const words = kind === "hype" ? HYPE_WORDS : GAPS_WORDS;
  return (
    <div className="flex flex-col gap-2">
      <span className="flex flex-col items-start gap-0.5">
        <span className="label-caps">{kind === "hype" ? "Hype" : "Evidence gaps"}</span>
        {note}
      </span>
      {kind === "hype" ? <Chillies n={n} size={34} /> : <Flags n={n} size={32} />}
      <span className={n ? `text-xl font-bold rounded-[4px] px-[0.3em] py-[0.05em] self-start ${kind === "hype" ? "rating-word-hype" : "rating-word-gaps"}` : "text-base font-semibold text-muted-foreground self-start"}>{n ? words[n] : empty}</span>
    </div>
  );
}

export function FindingList({ title, items, cls }: { title: string; items: Finding[]; cls: string }) {
  if (!items.length) return null;
  const groups = [...new Set(items.map((f) => f.section))];
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display text-xl font-bold">{title} · {items.length} {items.length === 1 ? "finding" : "findings"}</h3>
      {groups.map((g) => (
        <div key={g} className="flex flex-col gap-2">
          <p className="label-caps">{g}</p>
          {items.filter((f) => f.section === g).map((f) => (
            <div key={f.code} className={`${cls} rounded-[10px] p-4`}>
              <p className="label-caps !text-foreground">{title} finding</p>
              <p className="mt-1 font-semibold">{f.name}</p>
              {f.quote && (
                <blockquote className="mt-2 font-serif text-base">
                  “{f.quote}”{f.paragraph && <span className="ml-1 text-sm text-muted-foreground">[{/\d/.test(f.paragraph) ? `para ${f.paragraph.replace(/[^\d]/g, "")}` : f.paragraph}]</span>}{f.credit && <span className="ml-1 text-sm text-muted-foreground">{f.credit}</span>}
                </blockquote>
              )}
              <p className="mt-2 text-[15px] leading-relaxed">{f.reason}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Breakdown({ title, rows, words }: { title: string; rows: SectionRow[]; words: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="label-caps">{title}</p>
      {rows.map((r) => (
        <div key={r.key} className="flex flex-wrap justify-between gap-2 border-b border-border py-2 text-sm last:border-0">
          <strong>{r.label}</strong>
          <span>{r.out || !r.level ? "Not applicable" : `${words[r.level]} · ${r.level}/5 · ${r.met} of ${r.scored} checks met`}</span>
        </div>
      ))}
    </div>
  );
}

