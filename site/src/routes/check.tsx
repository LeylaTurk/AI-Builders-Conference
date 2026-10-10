import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address: the page is now "Decode an article" at /decode.
export const Route = createFileRoute("/check")({
  beforeLoad: () => { throw redirect({ to: "/decode", statusCode: 301 }); },
});
