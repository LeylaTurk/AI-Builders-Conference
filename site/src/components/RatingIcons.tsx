export const HYPE_WORDS = ["", "Grounded", "A little spicy", "Turning it up", "Overheated", "Off the charts"];
export const GAPS_WORDS = ["", "None", "Minor", "Some", "Major", "Unsupported"];
const FLAG_VARS = ["", "var(--flag-1)", "var(--flag-2)", "var(--flag-3)", "var(--flag-4)", "var(--flag-5)"];

export function Chilli({ lit, size = 26 }: { lit: boolean; size?: number | undefined }) {
  const grey = "var(--unlit)";
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <path
        d="M8.2 27.6c-1.6.5-2.6-.6-1.6-1.6 4.4-1.6 7.7-4.8 9-9.6.9-3.4 1.6-6 4.4-6.9 3.3-1 6.3 1.4 6.6 5 .5 5.5-4.6 11.6-11.6 13-2.4.5-4.6.5-6.8.1z"
        fill={lit ? "var(--chilli)" : "none"}
        stroke={lit ? "var(--chilli)" : grey}
        strokeWidth={lit ? 1 : 1.2}
        strokeLinejoin="round"
      />
      <path
        d="M18.6 11.6c.4-1.6 1.8-2.6 3.4-2.4 1.2-1.2 3.4-1.1 4.4.4 1.3.2 2.1 1.4 1.8 2.6-1.2-.5-2.4-.3-3.2.4-1.3-.9-3-.9-4.2 0-.7-.6-1.5-.9-2.2-1z"
        fill={lit ? "var(--chilli-cap)" : "none"}
        stroke={lit ? "var(--chilli-cap)" : grey}
        strokeWidth=".9"
        strokeLinejoin="round"
      />
      <path d="M24 9.4c.2-2.4 1.6-4.4 4-5.4" fill="none" stroke={lit ? "var(--chilli-cap)" : grey} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Flag({ lit, color, size = 24 }: { lit: boolean; color: string; size?: number | undefined }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M6 21V3.5" fill="none" stroke={lit ? "var(--foreground)" : "var(--unlit)"} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 4h11.5l-2.6 4.2 2.6 4.3H6z" fill={lit ? color : "none"} stroke={lit ? color : "var(--unlit)"} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function parseLevel(level: string | number | null | undefined): number | null {
  const n = Number(level);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

export function Chillies({ n, size }: { n: number | null; size?: number | undefined }) {
  return <span className="flex gap-0.5" aria-hidden="true">{[1, 2, 3, 4, 5].map((i) => <Chilli key={i} size={size} lit={n !== null && i <= n} />)}</span>;
}

export function Flags({ n, size }: { n: number | null; size?: number | undefined }) {
  const color = n ? FLAG_VARS[n]! : "var(--unlit)";
  return <span className="flex gap-px" aria-hidden="true">{[1, 2, 3, 4, 5].map((i) => <Flag key={i} size={size} lit={n !== null && i <= n} color={color} />)}</span>;
}

/** Compact labelled meter for feed cards. Unrated: grey icons and the given word, no number. */
export function CardMeter({ kind, level, emptyWord }: { kind: "hype" | "gaps"; level: string | null; emptyWord: string }) {
  const n = parseLevel(level);
  const words = kind === "hype" ? HYPE_WORDS : GAPS_WORDS;
  const label = kind === "hype" ? "Hype" : "Evidence gaps";
  const text = n ? words[n] : emptyWord;
  return (
    <div className="flex flex-wrap items-center gap-2.5" aria-label={`${label}: ${text}`} role="img">
      <span className="label-caps">{label}</span>
      {kind === "hype" ? <Chillies n={n} /> : <Flags n={n} />}
      <span className={n ? `text-base font-bold rounded-[4px] px-[0.3em] py-[0.05em] ${kind === "hype" ? "rating-word-hype" : "rating-word-gaps"}` : "text-sm font-semibold text-muted-foreground"}>{text}</span>
    </div>
  );
}

export function HypeRating({ level }: { level: string }) {
  const n = parseLevel(level);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chillies n={n} size={22} />
      <span className="text-sm font-semibold">Hype: {n ? `${HYPE_WORDS[n]} ${n}/5` : "Insufficient evidence to rate"}</span>
    </div>
  );
}

export function GapsRating({ level }: { level: string }) {
  const n = parseLevel(level);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Flags n={n} size={22} />
      <span className="text-sm font-semibold">Evidence gaps: {n ? `${GAPS_WORDS[n]} ${n}/5` : "Insufficient evidence to rate"}</span>
    </div>
  );
}
