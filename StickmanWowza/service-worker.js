self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("stickman-cache").then((cache) =>
      cache.addAll(["/", "/index.html", "/js/main.js", "/bundle.js", "/poki3.js", "/favicon.ico"])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
