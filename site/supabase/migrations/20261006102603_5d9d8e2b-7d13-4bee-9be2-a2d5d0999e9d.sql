-- Privacy: column-level public access only
REVOKE SELECT ON public.articles FROM anon, authenticated;
REVOKE SELECT ON public.ratings FROM anon, authenticated;

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS canonical_url text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS import_status text NOT NULL DEFAULT 'new';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS published_at timestamptz;
CREATE UNIQUE INDEX IF NOT EXISTS articles_canonical_url_key ON public.articles(canonical_url);
ALTER TABLE public.ratings ADD COLUMN IF NOT EXISTS approved_at timestamptz;
UPDATE public.ratings SET approved_at = created_at WHERE status = 'approved' AND approved_at IS NULL;

GRANT SELECT (id, headline, outlet, url, published_date, published_at, source, import_status, created_at) ON public.articles TO anon, authenticated;
GRANT SELECT (id, article_id, status, version, hype_level, gaps_level, summary, reason, partly_checked, approved_at) ON public.ratings TO anon, authenticated;

DROP POLICY IF EXISTS "Public reads articles with approved rating" ON public.articles;
CREATE POLICY "Public reads feed articles and approved ones" ON public.articles FOR SELECT TO anon, authenticated
  USING (source IS NOT NULL OR EXISTS (SELECT 1 FROM public.ratings r WHERE r.article_id = articles.id AND r.status = 'approved'));

CREATE TABLE public.feed_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  checked_at timestamptz NOT NULL DEFAULT now(),
  ok boolean NOT NULL,
  message text,
  new_items integer NOT NULL DEFAULT 0
);
CREATE INDEX feed_checks_source_time ON public.feed_checks(source, checked_at DESC);
GRANT SELECT (source, checked_at, ok) ON public.feed_checks TO anon, authenticated;
GRANT ALL ON public.feed_checks TO service_role;
ALTER TABLE public.feed_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads feed check times" ON public.feed_checks FOR SELECT TO anon, authenticated USING (true);