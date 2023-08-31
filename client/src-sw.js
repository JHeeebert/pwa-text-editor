import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { warmStrategyCache } from 'workbox-recipes';
// Pre cache the assets using __WB_Manifest
precacheAndRoute(self.__WB_MANIFEST);
// Create cache first strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Cache pages for a maximum of 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
// Warm the cache with a route to the home page
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});
// Register the pageCache strategy for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Create a stale while revalidate strategy for assets { styles, scripts, workers, etc. }
registerRoute(({ request }) => [ 'style', 'script', 'worker' ].includes(request.destination), 
new StaleWhileRevalidate({
  cacheName: 'assets-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Cache assets for a maximum of 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
}));

