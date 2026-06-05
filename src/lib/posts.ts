import { getSupabase } from "./supabase";

import type { Post } from "../types/post";

export async function getPublishedPosts() {
  const { data, error } = await getSupabase()
    .from("posts")
    .select("*")
    .eq("is_published", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await getSupabase()
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    return null;
  }

  return data as Post;
}
