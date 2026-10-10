import { ogImage } from "@/lib/og";
import { createFileRoute } from "@tanstack/react-router";
import { SECTION, TOPICS } from "@/lib/claims";
import { TopicPage } from "@/components/claims/TopicPage";

const first = TOPICS[0]!;

export const Route = createFileRoute("/claims/")({
  head: () => ({
    meta: [
      { title: "Claim Tracker · Decoding the Hype" },
      { name: "description", content: SECTION.introduction },
      { property: "og:title", content: "Claim Tracker — Decoding the Hype" },
      { property: "og:description", content: SECTION.introduction },
      { property: "og:type", content: "website" },
      ...ogImage,
    ],
  }),
  component: () => <TopicPage key={first.slug} t={first} index />,
});
