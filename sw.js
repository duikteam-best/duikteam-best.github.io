// Minimal service worker – required for PWA installability on Android/Chrome
const CACHE = 'dtb-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', (e) => {
  // Network-first for everything; cache as a fallback for offline shells
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
