ALTER TABLE public.ratings DROP CONSTRAINT IF EXISTS ratings_status_check;
ALTER TABLE public.ratings ADD CONSTRAINT ratings_status_check CHECK (status IN ('pending','live','approved','rejected','withdrawn'));
DROP POLICY IF EXISTS "Public reads approved ratings" ON public.ratings;
CREATE POLICY "Public reads live or approved ratings" ON public.ratings FOR SELECT TO anon, authenticated USING (status IN ('live','approved'));
DROP POLICY IF EXISTS "Public reads feed articles and approved ones" ON public.articles;
CREATE POLICY "Public reads feed articles and rated ones" ON public.articles FOR SELECT TO anon, authenticated
  USING (source IS NOT NULL OR EXISTS (SELECT 1 FROM public.ratings r WHERE r.article_id = articles.id AND r.status IN ('live','approved')));