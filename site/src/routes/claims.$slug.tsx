import { ogImage } from "@/lib/og";
import { createFileRoute } from "@tanstack/react-router";
import { TOPICS, topicBySlug } from "@/lib/claims";
import { TopicPage } from "@/components/claims/TopicPage";

export const Route = createFileRoute("/claims/$slug")({
  loader: ({ params }) => {
    const found = topicBySlug(params.slug);
    const t = found ?? TOPICS[0]!;
    return { slug: t.slug, missing: !found, headline: t.headline, topic: t.topic, keyQualification: t.keyQualification };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Claim Tracker · Decoding the Hype" }] };
    const title = `${loaderData.topic} claim · Claim Tracker · Decoding the Hype`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.topic}: ${loaderData.keyQualification}` },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.keyQualification },
        { property: "og:type", content: "article" },
        ...ogImage,
        ...(loaderData.missing ? [{ name: "robots", content: "noindex" }] : []),
      ],
    };
  },
  component: ClaimRoute,
});

function ClaimRoute() {
  const { slug, missing } = Route.useLoaderData();
  return <TopicPage key={slug} t={topicBySlug(slug)!} missing={missing} />;
}
