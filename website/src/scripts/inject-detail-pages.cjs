
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

// Import slugify from the Astro utility (as CommonJS)
const slugifyPath = path.join(__dirname, "../utils/slugify.ts");
let slugify;
try {
  // Try to require compiled JS if available (for production)
  slugify = require("../../dist/utils/slugify.js").slugify;
} catch (e) {
  // Fallback: simple slugify implementation (should match your utility)
  slugify = (text) => text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

// Load env variables (adjust as needed)
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase env vars");
}

const swPath = path.join(__dirname, "../../public/sw.js");

// 1. Fetch points from Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  const { data: points, error } = await supabase.from("points").select("*");
  if (error) throw error;

  // 2. Group by location_id or standalone
  const seenLocationIds = new Set();
  const detailSlugs = new Set();

  for (const point of points) {
    if (point.location_id && point.location_name) {
      if (!seenLocationIds.has(point.location_id)) {
        detailSlugs.add(`/bod/${point.location_id}`);
        seenLocationIds.add(point.location_id);
      }
    } else if (point.point_name) {
      const slug = slugify(point.point_name);
      detailSlugs.add(`/bod/${slug}`);
    }
  }

  // 3. Prepare the string to inject
  const detailPagesString = Array.from(detailSlugs)
    .map((slug) => `  "${slug}"`)
    .join(",\n");

  // 4. Inject into sw.js
  let swSrc = fs.readFileSync(swPath, "utf8");
  swSrc = swSrc.replace(
    "// __DETAIL_PAGES__",
    detailPagesString + "\n  // __DETAIL_PAGES__"
  );

  fs.writeFileSync(swPath, swSrc, "utf8");
  console.log(`Injected ${detailSlugs.size} detail pages into sw.js!`);
}

main();