CREATE OR REPLACE FUNCTION public.store_feeds_cron_secret(_s text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM vault.secrets WHERE name = 'feeds_cron_secret';
  PERFORM vault.create_secret(_s, 'feeds_cron_secret');
END $$;
REVOKE EXECUTE ON FUNCTION public.store_feeds_cron_secret(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.store_feeds_cron_secret(text) TO service_role;