// Imports AI news from the approved feeds only. Never fetches any other site.
import { runRating } from "./rate-article.server";
import { deckFromDescription, dropTrailingBoilerplate } from "./text-clean";

export type FeedSource = {
  key: "openai" | "propublica" | "conversation" | "microsoft" | "deepmind" | "meta" | "mit" | "foxnews" | "nbcnews" | "guardian" | "arstechnica" | "bbc" | "techcrunch";
  outlet: string;
  url: string;
  domain: string; // article pages may only be fetched from this domain
  sourceType: string;
  aiFilter: boolean;
  extraDomains?: string[]; // other domains article pages may be read from
  fetchPages?: boolean; // default true; false = use feed text only, never fetch the site
  delayMs?: number; // minimum gap between page requests
  maxPageFetches?: number; // page reads per run; the rest wait for the next run
};

export const FEED_SOURCES: FeedSource[] = [
  { key: "openai", outlet: "OpenAI", url: "https://openai.com/news/rss.xml", domain: "openai.com", sourceType: "company announcement about its own product", aiFilter: false },
  { key: "propublica", outlet: "ProPublica", url: "https://www.propublica.org/feeds/propublica/main", domain: "propublica.org", sourceType: "independent news outlet", aiFilter: true },
  { key: "conversation", outlet: "The Conversation", url: "https://theconversation.com/topics/artificial-intelligence-ai-90/articles.atom", domain: "theconversation.com", sourceType: "independent news outlet", aiFilter: false },
  { key: "microsoft", outlet: "Microsoft", url: "https://news.microsoft.com/source/feed/", domain: "microsoft.com", sourceType: "company announcement about its own product", aiFilter: true, delayMs: 10000, maxPageFetches: 10 },
  { key: "deepmind", outlet: "Google DeepMind", url: "https://deepmind.google/blog/rss.xml", domain: "deepmind.google", extraDomains: ["blog.google"], sourceType: "company announcement about its own product", aiFilter: false, delayMs: 2000, maxPageFetches: 15 },
  { key: "meta", outlet: "Meta", url: "https://about.fb.com/news/feed/", domain: "about.fb.com", sourceType: "company announcement about its own product", aiFilter: true, fetchPages: false },
  { key: "mit", outlet: "MIT News", url: "https://news.mit.edu/rss/topic/artificial-intelligence2", domain: "news.mit.edu", sourceType: "press release from the institution that did the study", aiFilter: false, fetchPages: false },
  { key: "foxnews", outlet: "Fox News", url: "https://moxie.foxnews.com/google-publisher/tech.xml", domain: "foxnews.com", sourceType: "independent news outlet", aiFilter: true, delayMs: 2000, maxPageFetches: 15 },
  { key: "nbcnews", outlet: "NBC News", url: "https://feeds.nbcnews.com/nbcnews/public/tech", domain: "nbcnews.com", sourceType: "independent news outlet", aiFilter: true, delayMs: 2000, maxPageFetches: 15 },
  { key: "guardian", outlet: "The Guardian", url: "https://www.theguardian.com/technology/artificialintelligenceai/rss", domain: "theguardian.com", sourceType: "independent news outlet", aiFilter: false, delayMs: 2000, maxPageFetches: 15 },
  { key: "arstechnica", outlet: "Ars Technica", url: "https://arstechnica.com/tag/ai/feed/", domain: "arstechnica.com", sourceType: "independent news outlet", aiFilter: false, delayMs: 2000, maxPageFetches: 15 },
  { key: "bbc", outlet: "BBC News", url: "https://feeds.bbci.co.uk/news/technology/rss.xml", domain: "bbc.co.uk", extraDomains: ["bbc.com"], sourceType: "independent news outlet", aiFilter: true, delayMs: 2000, maxPageFetches: 15 },
  { key: "techcrunch", outlet: "TechCrunch", url: "https://techcrunch.com/category/artificial-intelligence/feed/", domain: "techcrunch.com", sourceType: "independent news outlet", aiFilter: false, delayMs: 2000, maxPageFetches: 15 },
];
// EurekAlert! is skipped: it no longer publishes a working RSS feed (checked Oct 2026).

const UA = "Mozilla/5.0 (compatible; DecodingTheHype/1.0; +https://hype-decoder-shell.lovable.app)";
const MAX_NEW_PER_SOURCE = 30;

type Item = { title: string; link: string; date: string | null; summary: string; descHtml: string; html: string; categories: string[] };
type Link = { text: string; url: string };

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
const stripTags = (s: string) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function tag(block: string, name: string): string | null {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? m[1]! : null;
}

export function parseFeed(xml: string): Item[] {
  const items: Item[] = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  for (const b of blocks) {
    const title = stripTags(decode(tag(b, "title") ?? ""));
    let link = decode(tag(b, "link") ?? "").trim();
    if (!link) {
      const m = b.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i) ?? b.match(/<link[^>]*href="([^"]+)"/i);
      link = m ? decode(m[1]!) : "";
    }
    const date = tag(b, "pubDate") ?? tag(b, "published") ?? tag(b, "updated") ?? tag(b, "dc:date");
    const summaryRaw = tag(b, "description") ?? tag(b, "summary") ?? "";
    const html = decode(tag(b, "content:encoded") ?? tag(b, "content") ?? "");
    const categories = [...b.matchAll(/<category(?:\s[^>]*?term="([^"]*)")?[^>]*?(?:\/>|>([\s\S]*?)<\/category>)/gi)].map((m) => stripTags(decode(m[1] ?? m[2] ?? "")));
    if (title && link) items.push({ title, link, date: date ? decode(date).trim() : null, summary: stripTags(decode(summaryRaw)), descHtml: decode(summaryRaw), html, categories });
  }
  return items;
}

export function normalizeUrl(u: string): string {
  try {
    const url = new URL(u.trim());
    url.hash = "";
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    for (const k of [...url.searchParams.keys()]) {
      if (/^utm_|^(fbclid|gclid|mc_cid|mc_eid|ref|cmp|src)$/i.test(k)) url.searchParams.delete(k);
    }
    url.protocol = "https:";
    let s = url.toString();
    if (s.endsWith("/")) s = s.slice(0, -1);
    return s;
  } catch {
    return u.trim();
  }
}

const AI_WORDS = /\b(artificial intelligence|chatbots?|machine learning|algorithms?|algorithmic|facial recognition)\b/i;
const AI_ABBR = /\bA\.?I\b/;
function isAboutAI(it: Item): boolean {
  const text = [it.title, it.summary, ...it.categories].join(" ");
  return AI_WORDS.test(text) || AI_ABBR.test(text);
}

const allowed = (u: string, src: FeedSource) => [src.domain, ...(src.extraDomains ?? [])].some((d) => onDomain(u, d));

function onDomain(u: string, domain: string): boolean {
  try {
    const h = new URL(u).hostname.toLowerCase();
    return h === domain || h.endsWith(`.${domain}`);
  } catch {
    return false;
  }
}

// Pulls body paragraphs and links out of article HTML.
export function extractText(html: string, base: string): { paragraphs: string[]; links: Link[] } {
  let body = html.replace(/<(script|style|noscript|svg|figure|figcaption|aside|nav|header|footer|form)[\s\S]*?<\/\1>/gi, " ");
  const art = body.match(/<article[\s\S]*?<\/article>/i);
  if (art) body = art[0];
  const paragraphs: string[] = [];
  const links: Link[] = [];
  const seen = new Set<string>();
  for (const m of body.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)) {
    const inner = m[1]!;
    const text = stripTags(inner);
    if (text.length < 40 || /^the post .* appeared first on/i.test(text)) continue;
    paragraphs.push(text);
    for (const a of inner.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
      let url = decode(a[1]!);
      try { url = new URL(url, base).toString(); } catch { continue; }
      if (!/^https?:/.test(url) || seen.has(url)) continue;
      seen.add(url);
      links.push({ text: stripTags(a[2]!) || url, url });
    }
  }
  return { paragraphs: dropTrailingBoilerplate(paragraphs).kept, links };
}

const RATE_WORDS = /\b(artificial intelligence|chatbots?|machine learning|large language models?|algorithms?|generative|ChatGPT|Claude|Gemini|OpenAI|Anthropic|facial recognition)\b/i;
// Checked before rating: headline or feed summary must mention AI as whole words ("AI" in capitals).
export function mentionsAI(headline: string, summary: string): boolean {
  const t = `${headline} ${summary}`;
  return RATE_WORDS.test(t) || /\bAI\b/.test(t);
}

const enough = (p: string[]) => p.length >= 3 && p.join(" ").split(/\s+/).length >= 150;

type PageBudget = { left: number; last: number };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Returns text, null (unreadable) or "later" (page-read budget used up this run).
async function getFullText(src: FeedSource, it: Item, budget: PageBudget): Promise<{ paragraphs: string[]; links: Link[]; og?: string | null } | null | "later"> {
  if (it.html) {
    const r = extractText(it.html, it.link);
    if (enough(r.paragraphs)) return r;
  }
  if (src.fetchPages === false || !onDomain(it.link, src.domain)) return null;
  if (budget.left <= 0) return "later";
  budget.left--;
  const wait = (src.delayMs ?? 0) - (Date.now() - budget.last);
  if (wait > 0) await sleep(wait);
  try {
    const res = await fetch(it.link, { headers: { "user-agent": UA, accept: "text/html" }, redirect: "follow", signal: AbortSignal.timeout(15000) });
    if (!res.ok || !allowed(res.url || it.link, src)) return null;
    const html = await res.text();
    const r = extractText(html, it.link);
    const og = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i)?.[1] ?? null;
    return enough(r.paragraphs) ? { ...r, og: og ? decode(og) : null } : null;
  } catch {
    return null;
  } finally {
    budget.last = Date.now();
  }
}

function toDate(d: string | null): Date | null {
  if (!d) return null;
  const t = new Date(d);
  return isNaN(t.getTime()) ? null : t;
}

export async function importSource(src: FeedSource) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  try {
    const res = await fetch(src.url, { headers: { "user-agent": UA, accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`Feed returned ${res.status}`);
    let items = parseFeed(await res.text());
    if (items.length === 0) throw new Error("Feed had no items");
    if (src.aiFilter) items = items.filter(isAboutAI);
    items = items
      .filter((i) => onDomain(i.link, src.domain))
      .sort((a, b) => (toDate(b.date)?.getTime() ?? 0) - (toDate(a.date)?.getTime() ?? 0))
      .slice(0, MAX_NEW_PER_SOURCE);

    const canon = items.map((i) => normalizeUrl(i.link));
    const { data: existing } = await supabaseAdmin.from("articles").select("canonical_url").in("canonical_url", canon);
    const have = new Set((existing ?? []).map((e) => e.canonical_url));
    const { data: sameSrc } = await supabaseAdmin.from("articles").select("headline").eq("source", src.key).limit(2000);
    const heads = new Set((sameSrc ?? []).map((e) => e.headline.trim().toLowerCase()));
    let added = 0;
    let later = 0;
    let dupes = 0;
    const budget: PageBudget = { left: src.maxPageFetches ?? 30, last: 0 };
    for (const it of items) {
      const c = normalizeUrl(it.link);
      const h = it.title.slice(0, 500).trim().toLowerCase();
      if (have.has(c) || heads.has(h)) { dupes++; continue; }
      have.add(c);
      heads.add(h);
      const got = await getFullText(src, it, budget);
      if (got === "later") { later++; continue; }
      const text = got;
      const when = toDate(it.date);
      const deck = deckFromDescription(it.descHtml, stripTags, text?.og ?? null);
      const { error } = await supabaseAdmin.from("articles").insert({
        headline: it.title.slice(0, 500),
        deck: deck ? deck.slice(0, 1000) : null,
        outlet: src.outlet,
        url: it.link,
        canonical_url: c,
        source: src.key,
        source_type: src.sourceType,
        published_at: when?.toISOString() ?? null,
        published_date: when ? when.toISOString().slice(0, 10) : null,
        paragraphs: text?.paragraphs ?? [],
        links: text?.links ?? [],
        import_status: !text ? "insufficient" : mentionsAI(it.title, it.summary) ? "new" : "skipped_not_ai",
      });
      if (!error) added++;
    }
    await supabaseAdmin.from("feed_checks").insert({ source: src.key, ok: true, new_items: added, message: `${items.length} AI items, ${added} new, ${dupes} duplicates${later ? `, ${later} left for next check` : ""}` });
    return { source: src.key, ok: true, added };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Check failed";
    await supabaseAdmin.from("feed_checks").insert({ source: src.key, ok: false, message });
    return { source: src.key, ok: false, message };
  }
}

export async function importAllFeeds() {
  return Promise.all(FEED_SOURCES.map(importSource));
}

// Rates queued feed articles oldest first; stops at the daily cap (enforced inside runRating) or after `max`.
export async function rateQueued(max: number, days = 7) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - days * 86400000).toISOString();
  const { data } = await supabaseAdmin
    .from("articles")
    .select("id, ratings(id)")
    .not("source", "is", null)
    .eq("import_status", "new")
    .gte("published_at", since)
    .order("published_at", { ascending: false })
    .limit(300);
  const queue = (data ?? []).filter((a) => !(a.ratings as unknown[])?.length).slice(0, max);
  const results: { id: string; ok: boolean; error?: string }[] = [];
  for (const a of queue) {
    const r = await runRating(a.id);
    if ("error" in r) {
      results.push({ id: a.id, ok: false, error: r.error });
      if (r.error.startsWith("Daily limit")) break;
    } else results.push({ id: a.id, ok: true });
  }
  return results;
}
