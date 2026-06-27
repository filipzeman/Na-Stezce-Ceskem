import { getSupabase } from "../../lib/supabase";
import type { Point } from "../../types/point";

export async function updatePoint(point: Point) {
  const supabase = getSupabase();

  const { error } = await supabase
    .from("points")
    .update({
      point_name: point.point_name,

      category: point.category,

      type: point.type,

      km: point.km,

      elevation: point.elevation,

      latitude: point.latitude,

      longitude: point.longitude,

      crossroad_number: point.crossroad_number,

      navigation_color: point.navigation_color,

      location_id: point.location_id,

      location_name: point.location_name,
    })
    .eq("id", point.id);

  if (error) {
    throw error;
  }
}
