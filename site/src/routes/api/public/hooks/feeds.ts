import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

// Scheduled job: { "task": "import" } checks all feeds then rates new items; { "task": "rate" } rates the next queued items.
export const Route = createFileRoute("/api/public/hooks/feeds")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;
        const body = (await request.json().catch(() => ({}))) as { task?: string; rate?: number };
        const { importAllFeeds, rateQueued } = await import("@/lib/feeds.server");
        const imported = body.task === "import" ? await importAllFeeds() : null;
        const max = Math.min(Math.max(Number(body.rate) || 15, 0), 40);
        const rated = await rateQueued(max);
        return Response.json({ imported, rated });
      },
    },
  },
});
