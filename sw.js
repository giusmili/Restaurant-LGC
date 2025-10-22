const CACHE_NAME = "la-cantine-lgc-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/menu.html",
  "/reservation.html",
  "/offline.html",
];

// Installation → mise en cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        URLS_TO_CACHE.map((url) =>
          fetch(url)
            .then((resp) => {
              if (!resp.ok) throw new Error(`Échec chargement ${url}`);
              return cache.put(url, resp);
            })
            .catch((err) =>
              console.warn("⚠️ Non ajouté au cache :", url, err)
            )
        )
      );
    })
  );
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Si échec (offline), on sert la page offline.html
      if (event.request.mode === "navigate") {
        return caches.match("/offline.html");
      }
      return caches.match(event.request);
    })
  );
});

// Activation → nettoyage des anciens caches si besoin
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

if (typeof window !== 'undefined' && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("✅ Service Worker enregistré !"))
    .catch((err) => console.error("❌ SW échec :", err));
}
