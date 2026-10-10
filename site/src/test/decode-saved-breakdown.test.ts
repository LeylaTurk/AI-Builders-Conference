// Regression: decoding a link we've already rated shows the saved breakdown
// with no AI call and without claiming a daily breakdown slot.
import { beforeEach, describe, expect, it, vi } from "vitest";

const ARTICLE_URL = "https://example.com/news/ai-story";
const STORY_ID = "11111111-1111-4111-8111-111111111111";
const paragraphs = Array.from({ length: 4 }, (_, i) => `Paragraph ${i} `.repeat(20).trim());

const rpc = vi.fn(async () => ({ data: 4, error: null }));
const scoreArticle = vi.fn();
const fetchArticle = vi.fn();

// Minimal chainable query builder; every call returns itself, awaiting resolves `result`.
function query(result: unknown) {
  const q: Record<string, unknown> = {};
  for (const m of ["select", "eq", "in", "or", "limit"]) q[m] = () => q;
  q["maybeSingle"] = async () => result;
  q["single"] = async () => result;
  q["then"] = (res: (v: unknown) => unknown) => Promise.resolve(result).then(res);
  return q;
}

const savedArticle = {
  id: STORY_ID, headline: "AI does a thing", deck: null, outlet: "Example News", url: ARTICLE_URL, source: "example",
  source_type: "independent news outlet", paragraphs, published_date: "2026-10-01",
  ratings: [{ version: 1, status: "approved", checks: {}, quotes_verified: {}, hype_level: "3", gaps_level: "2", summary: "s", reason: "r", partly_checked: false, writeup: null }],
};

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => {
    let validate: (d: unknown) => unknown = (d) => d;
    const b = {
      inputValidator: (v: typeof validate) => { validate = v; return b; },
      handler: (fn: (o: { data: unknown }) => unknown) => (o: { data?: unknown } = {}) => fn({ data: validate(o.data) }),
    };
    return b;
  },
}));
vi.mock("@tanstack/react-start/server", () => ({ getRequestHeader: () => "203.0.113.7" }));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    rpc,
    from: (table: string) => {
      if (table === "settings") return query({ data: { decode_global_cap: 50, decode_visitor_cap: 5 } });
      if (table === "check_usage") return query({ data: [{ visitor: "x", count: 1 }] });
      return {
        select: (cols: string) => query(cols === "id" ? { data: { id: STORY_ID } } : { data: savedArticle }),
      };
    },
  },
}));
vi.mock("@/lib/public.functions", () => ({ publicClient: () => ({ from: () => query({ data: { id: STORY_ID, import_status: "new" } }) }) }));
vi.mock("@/lib/feeds.server", () => ({ normalizeUrl: (u: string) => u }));
vi.mock("@/lib/rate-article.server", () => ({ scoreArticle }));
vi.mock("@/lib/fetch-article.server", () => ({ fetchArticle }));

describe("decode an already-rated link", () => {
  beforeEach(() => { rpc.mockClear(); scoreArticle.mockClear(); fetchArticle.mockClear(); });

  it("returns the saved breakdown without an AI call or a daily slot", async () => {
    const { readLink } = await import("@/lib/check.functions");
    const r = (await (readLink as unknown as (o: { data: unknown }) => Promise<Record<string, any>>)({ data: { url: ARTICLE_URL } }));

    expect(r["known"]).toBe(true);
    expect(r["result"]).toMatchObject({ hype_level: "3", gaps_level: "2" });
    expect(r["story"]).toMatchObject({ id: STORY_ID, approved: true });
    expect(r["left"]).toBeNull(); // count is not touched
    expect(scoreArticle).not.toHaveBeenCalled();
    expect(fetchArticle).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalledWith("claim_check", expect.anything());
    expect(rpc).not.toHaveBeenCalled();
  });
});
