const STATIC_CACHE_NAME = "todosApp-static.v1";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/index.html",
      "/manifest.json",
      "/js/registerSw.js",
      "/js/app.js",
      "/css/style.css",
      "/icons/apple-touch-icon-180x180.png",
      "/icons/favicon.ico",
      "/icons/icon-512x512.png",
      "/icons/maskable-icon-512x512.png",
      "/icons/pwa-192x192.png",
      "/icons/pwa-512x512.png",
      "/icons/pwa-64x64.png",
    ]),
  );
});

self.skipWaiting();