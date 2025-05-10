import { createBrowserClient } from '@supabase/ssr';
import { config } from '@/config/config';

export function createClient() {
  return createBrowserClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
}
