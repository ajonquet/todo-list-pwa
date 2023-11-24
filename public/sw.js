const STATIC_CACHE_NAME = "todosApp-static.v2";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache(self.__WB_MANIFEST.map(asset => asset.url)),
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


// Network first, falling back to cache
const API_CACHE_NAME = 'todosApi.v1';
const networkWithCacheFallback = async (request) => {
  const cache = await caches.open(API_CACHE_NAME);
  try {
    const fetchedResponse = await fetch(request);
    cache.put(request, fetchedResponse.clone());
    return fetchedResponse;
  }
  catch (e) {
    return cache.match(request);
  }
}
self.addEventListener("fetch", async (event) => {
  if (!event.request.url.includes("localhost:7000/todos") || event.request.method !== "GET") {
    return;
  }
  event.respondWith(networkWithCacheFallback(event.request));
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



self.skipWaiting();