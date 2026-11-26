// Service worker : fonctionnement hors ligne (stratégie « réseau d'abord, cache en secours »)
const CACHE = 'mentaliste-v3';
const ASSETS = [
  './', './index.html', './css/style.css', './manifest.webmanifest',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
  './js/app.js', './js/store.js', './js/util.js',
  './js/data/curriculum1.js', './js/data/curriculum2.js', './js/data/glossary.js', './js/data/library.js',
  './js/data/curriculum3.js', './js/data/program.js', './js/fx.js', './js/game.js', './js/player.js', './js/data/exercises.js', './js/data/sources.js', './js/tools/extra.js', './js/tools/index.js', './js/tools/memory.js', './js/tools/micro.js', './js/tools/calc.js', './js/tools/cards.js', './js/tools/reading.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))),
  );
});
