import { getSupabase } from "../../lib/supabase";

import type { Post } from "../../types/post";

export async function getPosts(): Promise<Post[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("posts").select("*").order("created_at", {
    ascending: false,
  });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createPost(values: Partial<Post>) {
  const supabase = getSupabase();
  const { error } = await supabase.from("posts").insert(values);

  if (error) {
    throw error;
  }
}

export async function updatePost(id: string, values: Partial<Post>) {
  const supabase = getSupabase();
  const { error } = await supabase.from("posts").update(values).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deletePost(id: string) {
  const supabase = getSupabase();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
