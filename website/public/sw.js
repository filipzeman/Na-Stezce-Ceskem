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
  "/itinerar?filtr=ostatni",
  "/api/points.json"
];

// install → pre-cache
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Okamžitě aktivovat nový SW
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
      if (cached) {
        return cached;
      }
      // Navigační požadavky (HTML stránky)
      if (request.mode === "navigate") {
        const url = new URL(request.url);
        const pathname = url.pathname;
        // Zkus přesnou shodu bez search
        let matchNoSearch = await cache.match(pathname, { ignoreSearch: true });
        if (!matchNoSearch && pathname.endsWith("/")) {
          // Zkus bez trailing slash
          matchNoSearch = await cache.match(pathname.slice(0, -1), { ignoreSearch: true });
        }
        if (!matchNoSearch && !pathname.endsWith("/")) {
          // Zkus s trailing slash
          matchNoSearch = await cache.match(pathname + "/", { ignoreSearch: true });
        }
        if (matchNoSearch) {
          return matchNoSearch;
        }
        // Fallback na root
        const fallback = await cache.match("/");
        if (fallback) {
          return fallback;
        }
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