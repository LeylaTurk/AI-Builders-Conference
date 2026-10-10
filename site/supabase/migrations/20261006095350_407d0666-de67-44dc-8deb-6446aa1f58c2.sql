CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  daily_rating_cap int NOT NULL DEFAULT 20
);
INSERT INTO public.settings (id, daily_rating_cap) VALUES (1, 20);
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL,
  deck text,
  outlet text NOT NULL,
  url text NOT NULL,
  published_date date,
  source_type text NOT NULL,
  paragraphs jsonb NOT NULL DEFAULT '[]'::jsonb,
  links jsonb NOT NULL DEFAULT '[]'::jsonb,
  main_source_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT ALL ON public.articles TO service_role;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  version int NOT NULL,
  model text NOT NULL,
  raw_answers jsonb NOT NULL,
  checks jsonb NOT NULL,
  overrides jsonb NOT NULL DEFAULT '[]'::jsonb,
  source_status text NOT NULL,
  hype_level text NOT NULL,
  hype_sections jsonb NOT NULL,
  headline_rule_applied boolean NOT NULL DEFAULT false,
  gaps_level text NOT NULL,
  gaps_sections jsonb NOT NULL,
  safety_rule_applied boolean NOT NULL DEFAULT false,
  partly_checked boolean NOT NULL DEFAULT false,
  claim_type text,
  summary text,
  reason text,
  other_observations jsonb NOT NULL DEFAULT '[]'::jsonb,
  quotes_verified jsonb NOT NULL DEFAULT '{}'::jsonb,
  input_tokens int,
  output_tokens int,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (article_id, version)
);
CREATE INDEX ratings_created_idx ON public.ratings (created_at);
GRANT SELECT ON public.ratings TO anon, authenticated;
GRANT ALL ON public.ratings TO service_role;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads approved ratings" ON public.ratings FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Public reads articles with approved rating" ON public.articles FOR SELECT TO anon, authenticated
  USING (EXISTS (SELECT 1 FROM public.ratings r WHERE r.article_id = articles.id AND r.status = 'approved'));