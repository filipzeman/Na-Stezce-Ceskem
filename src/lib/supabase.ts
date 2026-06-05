import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = import.meta.env?.PUBLIC_SUPABASE_URL;
  const key = import.meta.env?.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key);
}
