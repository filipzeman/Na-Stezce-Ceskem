import { getSupabase } from "../../lib/supabase";

import type { Settings } from "../../types/admin";

export async function getSettings(): Promise<Record<string, string>> {
  const { data, error } = await getSupabase().from("settings").select("*");

  if (error) {
    throw error;
  }

  return Object.fromEntries((data as Settings[]).map((item) => [item.key, item.value]));
}

export async function updateSettings(settings: Record<string, string>) {
  const updates = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
  }));

  const { error } = await getSupabase().from("settings").upsert(updates);

  if (error) {
    throw error;
  }
}
