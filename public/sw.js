import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import {registerRoute} from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

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

registerRoute(
  ({event}) => event.request.url.includes("localhost:7000/todos") && event.request.method === "GET", 
  new NetworkFirst({
    cacheName: 'todos',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
      })
    ]  
  })
);

self.skipWaiting();