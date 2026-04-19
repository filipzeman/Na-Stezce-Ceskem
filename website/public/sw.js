const CACHE_NAME = "stezka-v2";

// This block will be replaced at build time with all unique detail pages
const CORE_ASSETS = [
  "/",
  "/caste-dotazy",
  "/o-projektu",
  "/mapa",
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
  // __DETAIL_PAGES__
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