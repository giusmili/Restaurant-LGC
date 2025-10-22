const CACHE_NAME = "la-cantine-lgc-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/menu.html",
  "/reservation.html",
  "/offline.html",
];

// Installation – pré‑cache des pages clés
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        URLS_TO_CACHE.map((url) =>
          fetch(url)
            .then((resp) => {
              if (!resp.ok) throw new Error(`Echec chargement ${url}`);
              return cache.put(url, resp);
            })
            .catch((err) => console.warn("Non ajouté au cache:", url, err))
        )
      );
    })
  );
});

// Réseau d'abord avec repli hors‑ligne
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      if (event.request.mode === "navigate") {
        return caches.match("/offline.html");
      }
      return caches.match(event.request);
    })
  );
});

// Activation – purge des anciens caches et prise de contrôle immédiate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

