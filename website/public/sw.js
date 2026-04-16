const CACHE_NAME = "stezka-v2";

const CORE_ASSETS = [
  "/",
  "/itinerar",
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

  // cache-first for everything
  event.respondWith(
    caches.match(request).then((cached) => {
      return (
        cached ||
        fetch(request)
          .then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
          .catch(() => cached)
      );
    })
  );
});