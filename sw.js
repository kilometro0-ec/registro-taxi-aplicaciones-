const CACHE_NAME = 'driver-tech-v1.0.1';
const ASSETS = [
  'Dashboard.html',
  'registro_ingreso.html',
  'registro_gasto.html',
  'vehiculo_mantenimiento.html',
  'reporte_estadisticas.html',
  'configuracion.html',
  'manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
