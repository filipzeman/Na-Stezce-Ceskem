import { getSupabase } from "./supabase";

import type { Settings } from "../types/admin";

export async function getSettingsObject() {
  const { data, error } = await getSupabase().from("settings").select("*");

  if (error) {
    throw error;
  }

  return Object.fromEntries((data as Settings[]).map((item) => [item.key, item.value]));
}
