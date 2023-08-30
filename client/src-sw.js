const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { warmStrategyCache } = require('workbox-recipes/warmStrategyCache');
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
registerRoute(({ request }) => request.mode === 'navigate', ({event}) => {
  try {
    return pageCache.handle({event});
  } catch (error) {
    return offlineFallback();
  }
});
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
//  Implement an offline fallback strategy
offlineFallback = () => {
  // Return offline fallback page
  return caches.match('/index.html');
};
