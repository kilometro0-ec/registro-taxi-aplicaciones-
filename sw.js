const CACHE_NAME = 'driver-tech-v1';
const urlsToCache = [
  '/registro-taxi-aplicaciones-/',
  '/registro-taxi-aplicaciones-/Dashboard.html',
  '/registro-taxi-aplicaciones-/registro_ingreso.html',
  '/registro-taxi-aplicaciones-/registro_gasto.html',
  '/registro-taxi-aplicaciones-/vehiculo_mantenimiento.html',
  '/registro-taxi-aplicaciones-/reporte_estadisticas.html',
  '/registro-taxi-aplicaciones-/configuracion.html',
  '/registro-taxi-aplicaciones-/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Para recursos externos (CDN), solo red y NO cache
  if (event.request.url.startsWith('https://cdn.tailwindcss.com') ||
      event.request.url.startsWith('https://fonts.googleapis.com')) {
    event.respondWith(fetch(event.request));
    return;
  }
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
