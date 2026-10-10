import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export function LoadError({ message, reset, className = "p-8" }: { message: string; reset?: () => void; className?: string }) {
  const router = useRouter();
  const qc = useQueryClient();
  return (
    <div className={className} role="alert">
      <p>{message}</p>
      <button
        type="button"
        onClick={() => { void qc.resetQueries(); void router.invalidate(); reset?.(); }}
        className="mt-3 inline-flex min-h-11 items-center rounded-full border border-border bg-card px-5 font-semibold text-foreground hover:bg-chip"
      >
        Try again
      </button>
    </div>
  );
}
