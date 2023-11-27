import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import {registerRoute} from 'workbox-routing';

const exludeAssets = ["background.css"]

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST.filter(asset => !exludeAssets.some(excludeAsset => asset.url.endsWith(excludeAsset))));

registerRoute(({url}) => url.pathname.endsWith("background.css"), ({event}) => {
  // La réponse produite sera
  event.respondWith(
    // Le résultat de la requête vers le fichier background.css
    fetch(event.request)
    // Ou en cas d'échec
    .catch(() => {
      // une réponse fabriquée avec un fond orange
      return new Response(".main {background: orange;}", { headers: { "Content-Type": "text/css" }});
    })
  );
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


self.skipWaiting();