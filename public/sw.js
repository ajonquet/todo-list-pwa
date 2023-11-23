const STATIC_CACHE_NAME = "todosApp-static.v2";

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


// background.css
self.addEventListener("fetch", (event) => {
  // Si la requête cible une url contenant le fichier background.css
  if (event.request.url.includes("background.css")) {
    // La réponse produite sera
    event.respondWith(
      // Le résultat de la requête vers le fichier background.css
      fetch(event.request)
      // Ou en cas d'échec
      .catch(() => {
        // une réponse fabriquée avec un fond orange
        return new Response(".main {background: orange;}", { headers: { "Content-Type": "text/css" }});
      })
    )
  }
});

// Cache first, 
const cacheFirst = async (request) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const responseFromCache = await cache.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});


const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = [STATIC_CACHE_NAME];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
  self.clients.claim();
});



// self.skipWaiting();