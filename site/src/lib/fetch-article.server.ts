// Fetches one article page for "Decode an article" and pulls out the story text.
// Safe fetching: http(s) only, no private/local addresses (checked on every hop), max 3 redirects,
// 10 s total, 3 MB, HTML only, robots.txt respected, no cookies or logins.
import { Readability } from "@mozilla/readability";
import { parseHTML } from "linkedom";
import { cleanDeckText, dropTrailingBoilerplate } from "./text-clean";

export const USER_AGENT = "DecodingTheHypeBot/1.0 (+https://hype-decoder-shell.lovable.app; reads one article when a visitor asks)";
const MAX_BYTES = 3 * 1024 * 1024;
const MAX_REDIRECTS = 3;

export type FetchFail = { kind: "badurl" | "private" | "blocked" | "unavailable" | "paywall" | "notarticle"; site: string };
export type Extracted = { url: string; headline: string; deck: string | null; outlet: string; date: string | null; paragraphs: string[] };

class Fail extends Error { constructor(public kind: FetchFail["kind"]) { super(kind); } }

function ipv4Private(ip: string) {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return false;
  const [a, b] = p as [number, number];
  return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}
function ipv6Private(ip: string) {
  const s = ip.toLowerCase().replace(/^\[|\]$/g, "");
  if (s === "::" || s === "::1") return true;
  const mapped = s.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return ipv4Private(mapped[1]!);
  return /^(fc|fd|fe8|fe9|fea|feb|ff)/.test(s);
}
const isIpv4 = (h: string) => /^\d+\.\d+\.\d+\.\d+$/.test(h);
const isIpv6 = (h: string) => h.includes(":");

async function assertPublicHost(host: string) {
  const h = host.replace(/^\[|\]$/g, "").toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal")) throw new Fail("private");
  if (isIpv4(h)) { if (ipv4Private(h)) throw new Fail("private"); return; }
  if (isIpv6(h)) { if (ipv6Private(h)) throw new Fail("private"); return; }
  // Workers have no DNS API, so resolve over DNS-over-HTTPS and refuse private answers.
  for (const type of ["A", "AAAA"]) {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(h)}&type=${type}`, { headers: { accept: "application/dns-json" } });
    if (!r.ok) continue;
    const j = (await r.json()) as { Answer?: { type: number; data: string }[] };
    for (const a of j.Answer ?? []) {
      if (a.type === 1 && ipv4Private(a.data)) throw new Fail("private");
      if (a.type === 28 && ipv6Private(a.data)) throw new Fail("private");
    }
  }
}

async function readCapped(res: Response, signal: AbortSignal) {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (!signal.aborted) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    chunks.push(value);
    if (size >= MAX_BYTES) { await reader.cancel(); break; }
  }
  const all = new Uint8Array(Math.min(size, MAX_BYTES));
  let o = 0;
  for (const c of chunks) { const n = Math.min(c.byteLength, all.length - o); all.set(c.subarray(0, n), o); o += n; if (o >= all.length) break; }
  return new TextDecoder("utf-8", { fatal: false }).decode(all);
}

// Fetch with manual redirects so each hop is checked.
async function safeFetch(start: URL, signal: AbortSignal, accept: string) {
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Fail("badurl");
    await assertPublicHost(url.hostname);
    const res = await fetch(url.toString(), { redirect: "manual", signal, headers: { "user-agent": USER_AGENT, accept } });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      url = new URL(res.headers.get("location")!, url);
      continue;
    }
    return { res, url };
  }
  throw new Fail("unavailable");
}

function robotsAllows(txt: string, path: string) {
  const groups: { agents: string[]; rules: { allow: boolean; path: string }[] }[] = [];
  let cur: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1]!.toLowerCase(), val = m[2]!.trim();
    if (key === "user-agent") {
      if (!cur || !lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (cur && (key === "allow" || key === "disallow")) cur.rules.push({ allow: key === "allow", path: val });
    }
  }
  const mine = groups.filter((g) => g.agents.some((a) => a !== "*" && "decodingthehypebot".includes(a)));
  const use = mine.length ? mine : groups.filter((g) => g.agents.includes("*"));
  let best: { allow: boolean; len: number } = { allow: true, len: -1 };
  for (const g of use) for (const r of g.rules) {
    if (!r.path) continue;
    const re = new RegExp("^" + r.path.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\\\$$/, "$"));
    if (re.test(path) && r.path.length > best.len) best = { allow: r.allow, len: r.path.length };
  }
  return best.allow;
}

const meta = (doc: Document, ...names: string[]) => {
  for (const n of names) {
    const el = doc.querySelector(`meta[property="${n}"], meta[name="${n}"]`);
    const c = el?.getAttribute("content")?.trim();
    if (c) return c;
  }
  return null;
};
// Homepages, sections and listings: rejected before any AI call or daily slot.
const LISTING_FIRST = /^(topics?|tags?|category|categories|section|sections|author|authors|profile|search|archive|latest|page)$/i;
const SECTION_ONLY = /^([a-z]{2}(-[a-z]{2})?|news|technology|tech|science|business|world|politics|ai|artificial-intelligence|opinion|culture|health|environment|economy|home|index(\.html?)?|us|uk|en|international|innovation|latest)$/i;
export function isListingPath(pathname: string) {
  const segs = pathname.split("/").filter(Boolean);
  if (segs.length === 0) return true;
  if (LISTING_FIRST.test(segs[0] ?? "")) return true;
  return segs.length === 1 && SECTION_ONLY.test(segs[0] ?? "");
}
const ARTICLE_TYPES = /^(Article|NewsArticle|ReportageNewsArticle|ReportageNews|BlogPosting|AnalysisNewsArticle|OpinionNewsArticle|ReviewNewsArticle|ScholarlyArticle|TechArticle|Report)$/;
function hasArticleLd(doc: Document) {
  const hit = (v: unknown): boolean => {
    if (!v || typeof v !== "object") return false;
    if (Array.isArray(v)) return v.some(hit);
    const o = v as Record<string, unknown>;
    const t = o["@type"];
    if ((Array.isArray(t) ? t : [t]).some((x) => typeof x === "string" && ARTICLE_TYPES.test(x))) return true;
    return hit(o["@graph"]) || hit(o["mainEntity"]);
  };
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try { if (hit(JSON.parse(s.textContent ?? ""))) return true; } catch { /* ignore bad JSON-LD */ }
  }
  return false;
}
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

export async function fetchArticle(rawUrl: string): Promise<{ ok: true; article: Extracted } | { ok: false; fail: FetchFail }> {
  let site = "This site";
  try {
    const start = new URL(rawUrl);
    site = start.hostname.replace(/^www\./, "");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
    try {
      // robots.txt (a missing file means allowed; a failure to read it doesn't block).
      try {
        const { res } = await safeFetch(new URL("/robots.txt", start), ctrl.signal, "text/plain");
        if (res.ok) {
          const txt = (await readCapped(res, ctrl.signal)).slice(0, 500_000);
          if (!robotsAllows(txt, start.pathname + start.search)) throw new Fail("blocked");
        } else await res.body?.cancel();
      } catch (e) { if (e instanceof Fail) throw e; }

      const { res, url } = await safeFetch(start, ctrl.signal, "text/html,application/xhtml+xml");
      site = url.hostname.replace(/^www\./, "");
      if ([401, 403, 429].includes(res.status)) throw new Fail("blocked");
      if (!res.ok) throw new Fail("unavailable");
      const type = res.headers.get("content-type") ?? "";
      if (!/text\/html|application\/xhtml/i.test(type)) { await res.body?.cancel(); throw new Fail("notarticle"); }
      const html = await readCapped(res, ctrl.signal);

      const { document } = parseHTML(html);
      const doc = document as unknown as Document;
      const outlet = meta(doc, "og:site_name", "application-name") ?? site;
      const ogTitle = meta(doc, "og:title", "twitter:title");
      const deckMeta = meta(doc, "og:description", "description");
      const date = meta(doc, "article:published_time", "datePublished", "pubdate", "date") ?? doc.querySelector("time[datetime]")?.getAttribute("datetime") ?? null;
      const ogType = meta(doc, "og:type");
      const h1 = doc.querySelector("h1")?.textContent;
      const paywallHint = /"isAccessibleForFree"\s*:\s*(false|"false")/i.test(html) || /(subscribe to (continue|read)|sign in to (continue|read)|log in to (continue|read)|already a subscriber|create a free account to)/i.test(html);

      // Quick check: page metadata must mark it as an article.
      const articleMeta = /article/i.test(ogType ?? "") || hasArticleLd(doc);
      if (isListingPath(url.pathname) || !articleMeta) throw new Fail("notarticle");
      const bodyEl = doc.body;
      const pageText = clean(bodyEl?.textContent ?? "").length;
      let linkText = 0;
      for (const a of bodyEl?.querySelectorAll("a") ?? []) linkText += clean(a.textContent ?? "").length;
      if (pageText > 0 && linkText / pageText > 1 / 3) throw new Fail("notarticle");

      const parsed = new Readability(doc.cloneNode(true) as Document, { charThreshold: 200 }).parse();
      const paragraphs: string[] = [];
      if (parsed?.content) {
        const { document: inner } = parseHTML(`<html><body>${parsed.content}</body></html>`);
        for (const p of inner.querySelectorAll("p, li, blockquote")) {
          if (p.closest("figcaption, figure, aside, nav")) continue;
          if (p.tagName !== "P" && p.querySelector("p")) continue;
          const t = clean(p.textContent ?? "");
          if (t.length >= 25 && !/^(advertisement|sign up|subscribe|share this|related:|read more)/i.test(t)) paragraphs.push(t);
        }
      }
      paragraphs.splice(0, paragraphs.length, ...dropTrailingBoilerplate(paragraphs).kept);
      const total = paragraphs.join(" ").length;
      if (paywallHint && total < 1500) throw new Fail("paywall");
      const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
      if (!paywallHint && words < 300) throw new Fail("notarticle");
      if (total < 200 || paragraphs.length < 2 || (ogType === "website" && start.pathname.length <= 1)) throw new Fail("notarticle");

      const headline = clean(h1 ?? ogTitle ?? parsed?.title ?? "") || clean(parsed?.title ?? "Untitled");
      const deckClean = cleanDeckText(deckMeta);
      const deck = deckClean && deckClean !== headline && !paragraphs[0]?.startsWith(deckClean.slice(0, 60)) ? deckClean.slice(0, 1000) : null;
      return { ok: true, article: { url: url.toString(), headline: headline.slice(0, 500), deck, outlet: clean(outlet).slice(0, 120), date, paragraphs } };
    } finally { clearTimeout(timer); }
  } catch (e) {
    if (e instanceof Fail) return { ok: false, fail: { kind: e.kind, site } };
    return { ok: false, fail: { kind: "unavailable", site } };
  }
}
