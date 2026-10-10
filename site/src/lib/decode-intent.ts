// One-time "start the breakdown now" flag, set when a reader presses a decode button inside the app.
// It lives in memory only, so a typed, shared or refreshed /decode?story=… address never starts a run by itself.
let pending: string | null = null;
export const requestDecode = (id: string) => { pending = id; };
export const takeDecode = (id: string) => { const ok = pending === id; pending = null; return ok; };

const KEY = (id: string) => `dth:breakdown:${id}`;
export function cachedBreakdown<T>(id: string): T | null {
  try { const v = sessionStorage.getItem(KEY(id)); return v ? (JSON.parse(v) as T) : null; } catch { return null; }
}
export function saveBreakdown(id: string, v: unknown) {
  try { sessionStorage.setItem(KEY(id), JSON.stringify(v)); } catch { /* storage full or blocked */ }
}
export const hasCachedBreakdown = (id: string) => { try { return !!sessionStorage.getItem(KEY(id)); } catch { return false; } };

// A pasted link with tracking bits removed, used as this tab's cache key only (never sent anywhere).
export function cleanLink(u: string) {
  try {
    const url = new URL(u.trim());
    url.hash = "";
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    for (const k of [...url.searchParams.keys()]) if (/^utm_|^(fbclid|gclid|mc_cid|mc_eid|ref|cmp|src)$/i.test(k)) url.searchParams.delete(k);
    url.protocol = "https:";
    return url.toString().replace(/\/$/, "");
  } catch { return u.trim(); }
}
