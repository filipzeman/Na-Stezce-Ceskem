const CACHE_NAME = "stezka-v3";

// This block will be replaced at build time with all unique detail pages
const CORE_ASSETS = [
  "/",
  "/caste-dotazy",
  "/o-projektu",
  "/mapa",
  "/blog",
  "/itinerar",
  "/itinerar?filtr=vse",
  "/itinerar?filtr=ubytovani",
  "/itinerar?filtr=obcerstveni",
  "/itinerar?filtr=navigace",
  "/itinerar?filtr=doprava",
  "/itinerar?filtr=turisticke_cile",
  "/itinerar?filtr=ostatni",
  "/api/points.json",
  // DETAIL PAGES (injected at build time)
    "/bod/zdroj-vody-potok",
  "/bod/turisticky-pristresek-skritka-frymbulina",
  "/bod/vyhlidkove-misto",
  "/bod/rozcestnik-dlouhe",
  "/bod/turisticky-pristresek",
  "/bod/rozcestnik-nad-belovsi-czpl",
  "/bod/rozcestnik-brzozowie-pl",
  "/bod/ceska-cermna",
  "/bod/novy-hradek",
  "/bod/rozcestnik-nad-ceskou-cermnou",
  "/bod/sibenik",
  "/bod/turisticky-pristresek-u-metuje",
  "/bod/parkoviste",
  "/bod/hranicni-prechod-beloves",
  "/bod/rozcestnik-pod-kasparkou",
  "/bod/turisticka-chata-muflonka",
  "/bod/zdroj-vody-studanka",
  "/bod/vyznamny-strom-sarbochova-lipa",
  "/bod/kriz",
  "/bod/turisticky-pristresek-nad-ceskou-cermnou",
  "/bod/rozcestnik-dlouhe-czpl",
  "/bod/obec-taszow",
  "/bod/olesnice",
  "/bod/rozcestnik-klimsak",
  "/bod/turisticky-pristresek-nad-olesnici",
  "/bod/vrchol-ostruznik",
  "/bod/velke-porici",
  "/bod/nabijeci-stanice",
  "/bod/muzeum-svetelnych-reklam",
  "/bod/rozcestnik-male-porici",
  "/bod/velka-destna",
  "/bod/serlich-sedlo",
  "/bod/pristresek",
  "/bod/serlich",
  "/bod/rozcestnik-pod-jelenkou-sedlo",
  "/bod/valinuv-pramen",
  "/bod/rozcestnik-pod-homoli",
  "/bod/vrchol-tetrevec",
  "/bod/kacencin-senk-pod-homoli",
  "/bod/vrchol-homole",
  "/bod/vrchol-u-kunstatske-kaple",
  "/bod/kunstatska-kaple",
  "/bod/peticesti",
  "/bod/vrchol-komari-vrch",
  "/bod/rozcestnik-mezivrsi-anenska",
  "/bod/zastavka-bus-mezivrsi",
  "/bod/kaplicka",
  "/bod/vyhlidkove-misto-nad-neratovem",
  "/bod/neratov",
  "/bod/rozcestnik-vrchmezi",
  "/bod/vrchmezi",
  "/bod/rozcestnik-k-prameni-bele",
  "/bod/rozcestnik-polomsky-kopec"

];

// install → pre-cache
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      let completed = 0;
      const total = CORE_ASSETS.length;
      for (const url of CORE_ASSETS) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response.clone());
          }
        } catch (e) {}
        completed++;
        // Progress message
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) =>
            client.postMessage({ type: "offline-progress", completed, total })
          );
        });
      }
      // All done
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) =>
          client.postMessage({ type: "offline-ready" })
        );
      });
    })()
  );
});

// activate
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// fetch

// Network-first, cache-fallback fetch handler
self.addEventListener("fetch", (event) => {
  const { request } = event;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        // Try network first
        const response = await fetch(request);
        // Optionally update cache for navigations and core assets
        if (request.method === "GET" && (request.mode === "navigate" || CORE_ASSETS.includes(new URL(request.url).pathname))) {
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        // If offline, fallback to cache
        const cached = await cache.match(request, { ignoreSearch: true });
        if (cached) return cached;
        // For navigations, fallback to root
        if (request.mode === "navigate") {
          const fallback = await cache.match("/");
          if (fallback) return fallback;
          return new Response("Offline", { status: 503, statusText: "Offline" });
        }
        return new Response("", { status: 503 });
      }
    })()
  );
});