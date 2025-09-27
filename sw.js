const CACHE_NAME = "restaurant-lgc-v1";
const URLS_TO_CACHE = [
  "/Restaurant-LGC/",
  "/Restaurant-LGC/index.html",
  "/Restaurant-LGC/menu.html",
  "/Restaurant-LGC/styles.css",
  "/Restaurant-LGC/script.js",
  "/Restaurant-LGC/offline.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        URLS_TO_CACHE.map(url =>
          fetch(url)
            .then(resp => {
              if (!resp.ok) throw new Error(`Échec chargement ${url}`);
              return cache.put(url, resp);
            })
            .catch(err => console.warn("⚠️ Non ajouté au cache :", url, err))
        )
      );
    })
  );
});
  if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/Restaurant-LGC/sw.js")
                .then(() => console.log("Service Worker enregistré !"))
                .catch(err => console.error("SW échec :", err));
            }