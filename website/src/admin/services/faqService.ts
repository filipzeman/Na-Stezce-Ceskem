import { getSupabase } from "../../lib/supabase";

import type { FaqItem } from "../../types/faq";

export async function getFaqItems(): Promise<FaqItem[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .order("category")
    .order("order_index");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createFaq(item: Partial<FaqItem>) {
  const supabase = getSupabase();
  const { error } = await supabase.from("faq").insert(item);

  if (error) {
    throw error;
  }
}

export async function updateFaq(id: string, item: Partial<FaqItem>) {
  const supabase = getSupabase();
  const { error } = await supabase.from("faq").update(item).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteFaq(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from("faq").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
