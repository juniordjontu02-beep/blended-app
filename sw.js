const CACHE_NAME = "blended-v3";
const urlsToCache = [
  "/blended-app/",
  "/blended-app/index.html",
  "/blended-app/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
