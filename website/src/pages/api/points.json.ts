import { getSupabase
} from "../../lib/supabase";

export async function GET() {
  const supabase = getSupabase();

  const { data
  } = await supabase
    .from("points")
    .select("*");

  return new Response(JSON.stringify(data),
  {
    headers: {
      "Content-Type": "application/json",
    },
  });
}