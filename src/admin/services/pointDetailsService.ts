import { getSupabase } from "../../lib/supabase";

import type { Point } from "../../types/point";

import type { PointDetails } from "../../types/pointDetails";

export async function getPoints() {
  const supabase = getSupabase();

  const { data, error } = await supabase.from("points").select("*").order("km");

  if (error) {
    throw error;
  }

  return data as Point[];
}

export async function getPointDetails(pointId: string) {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("point_details")
    .select("*")
    .eq("point_id", pointId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data as PointDetails | null;
}

export async function savePointDetails(details: PointDetails) {
  const supabase = getSupabase();

  const { error } = await supabase.from("point_details").upsert(details, {
    onConflict: "point_id",
  });

  if (error) {
    throw error;
  }
}
