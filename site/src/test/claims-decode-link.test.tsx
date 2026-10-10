import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TopicPage } from "@/components/claims/TopicPage";
import { TOPICS } from "@/lib/claims";

function renderClaim(slug: string) {
  const t = TOPICS.find((o) => o.slug === slug)!;
  const rootRoute = createRootRoute();
  const route = createRoute({
    getParentRoute: () => rootRoute,
    path: "/claims/$slug",
    component: () => <TopicPage t={t} />,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([route]),
    history: createMemoryHistory({ initialEntries: [`/claims/${slug}`] }),
    context: { queryClient: new QueryClient() },
  });
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

const isInternal = (a: HTMLAnchorElement) => {
  const href = a.getAttribute("href") ?? "";
  return href.startsWith("/") || href.startsWith("#");
};

describe("Claim Tracker 'Decode an article' link", () => {
  it.each(TOPICS.map((t) => t.slug))(
    "opens in a new tab on /claims/%s while every other internal link stays in the same tab",
    async (slug) => {
      renderClaim(slug);

      fireEvent.click(await screen.findByRole("tab", { name: "Act on what's real" }));

      const decode = await screen.findByRole("link", { name: /Decode an article/i });
      expect(decode).toHaveAttribute("href", "/decode");
      expect(decode).toHaveAttribute("target", "_blank");
      expect(decode.getAttribute("rel")).toContain("noopener");
      expect(within(decode).getByText("(opens in a new tab)")).toBeInTheDocument();

      // Every other internal link on the page must open in the same tab.
      const others = (screen.getAllByRole("link") as HTMLAnchorElement[]).filter(
        (a) => a !== decode && isInternal(a),
      );
      expect(others.length).toBeGreaterThan(0);
      for (const a of others) {
        expect(a, `internal link "${a.textContent}" must not open a new tab`).not.toHaveAttribute(
          "target",
          "_blank",
        );
      }
    },
  );
});
