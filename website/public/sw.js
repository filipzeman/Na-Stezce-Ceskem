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

      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(request);

        cache.put(request, response.clone());

        return response;
      } catch (err) {
        // 🔥 THIS is the fix
        if (request.mode === "navigate") {
          return cache.match("/") || new Response("Offline");
        }

        return new Response("", { status: 503 });
      }
    })()
  );
});