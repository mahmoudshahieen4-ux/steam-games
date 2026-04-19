// Service Worker for caching and offline functionality
const CACHE_NAME = "steam-integration-v1";
const STATIC_CACHE = "steam-integration-static-v1";
const DYNAMIC_CACHE = "steam-integration-dynamic-v1";

// Resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/src/assets/logo.png",
  "/manifest.json",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip Chrome extension requests
  if (url.protocol === "chrome-extension:") return;

  // Handle API requests with network-first strategy
  if (url.hostname.includes("api.rawg.io")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        }),
    );
    return;
  }

  // Handle static assets with cache-first strategy
  if (STATIC_ASSETS.some((asset) => url.pathname.endsWith(asset))) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      }),
    );
    return;
  }

  // Default: network-first for other requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request);
      }),
  );
});
