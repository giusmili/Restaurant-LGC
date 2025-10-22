const CACHE_NAME = "la-cantine-lgc-v2";
const URLS_TO_CACHE = [
  // Pages clés
  "/",
  "/index.html",
  "/menu.html",
  "/reservation.html",
  "/offline.html",

  // CSS critiques
  "/css/style.css",
  "/css/reset.css",
  "/css/menu.css",
  "/css/reservation.css",
  "/css/burger.css",
  "/css/galerie.css",
  "/css/contact.css",
  "/css/apropos.css",

  // JS clés
  "/js/app.js",
  "/js/pages.js",
  "/js/ajoutPanier.js",
  "/js/avis.js",
  "/js/galery.js",
  "/js/reservation.js",
  "/js/apropos.js",
  "/js/panier.js",
  "/js/modules/cart.js",
  "/js/pages/burger.js",
  "/js/pages/shop.js",

  // Icônes/manifest (pour installabilité et favicon)
  "/favicon/site.webmanifest",
  "/favicon/favicon.ico",
  "/favicon/favicon-16x16.png",
  "/favicon/favicon-32x32.png",
  "/favicon/apple-touch-icon.png",
  "/favicon/android-chrome-192x192.png",
  "/favicon/android-chrome-512x512.png",
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

// Réseau d'abord pour HTML; cache‑first pour assets statiques
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // ne gère que les GET

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Navigations/documents: stratégie network‑first -> offline
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Assets statiques: cache‑first puis réseau et mise en cache
  const isAsset = [
    'style', 'script', 'image', 'font'
  ].includes(req.destination) || /\.(css|js|png|jpe?g|svg|webp|ico|woff2?|ttf)$/i.test(url.pathname);

  if (sameOrigin && isAsset) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((resp) => {
          // ne met en cache que les réponses valides
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return resp;
        });
      })
    );
    return;
  }

  // Par défaut: réseau avec repli cache si dispo
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
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
