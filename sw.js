// sw.js - Service Worker para Driver & Tech Companion
const CACHE_NAME = 'driver-tech-v11';
const urlsToCache = [
  '/registro-taxi-aplicaciones-/',
  '/registro-taxi-aplicaciones-/Dashboard.html',
  '/registro-taxi-aplicaciones-/registro_ingreso.html',
  '/registro-taxi-aplicaciones-/registro_gasto.html',
  '/registro-taxi-aplicaciones-/vehiculo_mantenimiento.html',
  '/registro-taxi-aplicaciones-/reporte_estadisticas.html',
  '/registro-taxi-aplicaciones-/configuracion.html',
  '/registro-taxi-aplicaciones-/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});
