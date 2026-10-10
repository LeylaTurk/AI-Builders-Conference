CREATE TABLE public.check_usage (
  day date NOT NULL,
  visitor text NOT NULL,
  count int NOT NULL DEFAULT 0,
  PRIMARY KEY (day, visitor)
);
GRANT ALL ON public.check_usage TO service_role;
ALTER TABLE public.check_usage ENABLE ROW LEVEL SECURITY;

-- Atomically claims one check. Returns checks left today after this one, or -1 when a limit is reached.
CREATE OR REPLACE FUNCTION public.claim_check(_visitor text, _global_cap int, _visitor_cap int)
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE total int; mine int;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('claim_check'));
  SELECT coalesce(sum(count),0) INTO total FROM check_usage WHERE day = (now() at time zone 'utc')::date;
  SELECT coalesce(max(count),0) INTO mine FROM check_usage WHERE day = (now() at time zone 'utc')::date AND visitor = _visitor;
  IF total >= _global_cap OR mine >= _visitor_cap THEN RETURN -1; END IF;
  INSERT INTO check_usage(day, visitor, count) VALUES ((now() at time zone 'utc')::date, _visitor, 1)
  ON CONFLICT (day, visitor) DO UPDATE SET count = check_usage.count + 1;
  RETURN least(_global_cap - total - 1, _visitor_cap - mine - 1);
END $$;

-- Gives a claimed check back (used when the rating fails).
CREATE OR REPLACE FUNCTION public.release_check(_visitor text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE check_usage SET count = greatest(count - 1, 0) WHERE day = (now() at time zone 'utc')::date AND visitor = _visitor;
$$;

REVOKE ALL ON FUNCTION public.claim_check(text,int,int) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_check(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_check(text,int,int) TO service_role;
GRANT EXECUTE ON FUNCTION public.release_check(text) TO service_role;