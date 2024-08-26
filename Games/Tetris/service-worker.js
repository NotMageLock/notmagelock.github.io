self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('tetris-cache').then(function(cache) {
      return cache.addAll([
        '/Games/Tetris/',
        '/Games/Tetris/index.html',
        '/assets/favicon.ico'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
