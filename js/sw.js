const CACHE_NAME = "restaurant-lgc-v1";
const URLS_TO_CACHE = [
  "/Restaurant-LGC/",
  "/Restaurant-LGC/index.html",
  "/Restaurant-LGC/menu.html",
  "/Restaurant-LGC/styles.css",
  "/Restaurant-LGC/script.js",
  "/Restaurant-LGC/offline.html"
];

// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Activation (nettoyage anciens caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Fetch (mise en cache dynamique)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("/Restaurant-LGC/offline.html"))
      );
    })
  );
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/Restaurant-LGC/sw.js")
    .then(() => console.log("Service Worker enregistré !"))
    .catch(err => console.error("SW échec :", err));
}
