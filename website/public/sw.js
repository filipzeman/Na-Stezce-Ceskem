const CACHE_NAME = "stezka-v2";

const CORE_ASSETS = [
  "/",
  "/itinerar",
  "/itinerar?filtr=vse",
  "/itinerar?filtr=ubytovani",
  "/itinerar?filtr=obcerstveni",
  "/itinerar?filtr=navigace",
  "/itinerar?filtr=doprava",
  "/itinerar?filtr=turisticke_cile",
  "/itinera?filtr=ostatni",
  "/api/points.json"
];

// install → pre-cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);

      // fetch points data
      const response = await fetch("/api/points.json");
      const points = await response.json();

      // cache images
      const imageUrls = points
        .flatMap((p) => p.images || [])
        .filter(Boolean);

      await Promise.all(
        imageUrls.map((url) =>
          fetch(url)
            .then((res) => {
              if (res.ok) {
                cache.put(url, res.clone());
              }
            })
            .catch(() => {})
        )
      );
    })
  );
});

// activate
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// fetch
self.addEventListener("fetch", (event) => {
  const { request } = event;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);

      // Pokud je v cache přesná shoda, vrať ji
      if (cached) {
        return cached;
      }

      // Pokud je navigační požadavek (HTML stránka)
      if (request.mode === "navigate") {
        // Zkus najít stránku bez query parametrů
        const url = new URL(request.url);
        const pathname = url.pathname;

        // 1. Zkus přesnou shodu bez search
        const matchNoSearch = await cache.match(pathname, { ignoreSearch: true });
        if (matchNoSearch) {
          return matchNoSearch;
        }
        // 2. Zkus fallback na root
        const fallback = await cache.match("/");
        if (fallback) {
          return fallback;
        }
        // 3. Jinak prázdná odpověď
        return new Response("Offline", { status: 503, statusText: "Offline" });
      }

      // Ostatní požadavky (např. obrázky, data)
      try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
      } catch (err) {
        return new Response("", { status: 503 });
      }
    })()
  );
});