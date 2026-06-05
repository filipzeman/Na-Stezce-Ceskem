import "dotenv/config";
import { getSupabase } from "../lib/supabase.ts";
import type { Point } from "../types/point";

const supabase = getSupabase();

async function migrate() {
  const { data: points, error } = await supabase.from("points").select("*");

  if (error) {
    console.error(error);

    return;
  }

  const details = points.map((point: Point) => ({
    point_id: point.id,
    phone: point.phone ?? null,
    email: point.email ?? null,
    website: point.website ?? null,
    opening_info: point.opening_info ?? null,
    note: point.note ?? null,
    images: point.photos ?? [],
    hikers_welcome: point.hikers_welcome ?? null,
    active: point.active,
    location_id: point.location_id ?? null,
    location_name: point.location_name ?? null,
  }));

  const { error: insertError } = await supabase.from("point_details").upsert(details, {
    onConflict: "point_id",
  });

  if (insertError) {
    console.error(insertError);

    return;
  }

  console.log(`Migrated ${details.length} point details`);
}

migrate();
