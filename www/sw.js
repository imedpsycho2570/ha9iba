// ============================================
// Service Worker - حقيبة الأستاذ
// AI.DZ technologie
// ============================================

const CACHE_NAME = 'ha9iba-v1';

const PRECACHE_URLS = [
  './index.html',
  'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js',
  'https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js',
  'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching resources...');
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
    .catch((err) => { console.warn('[SW] Precache failed:', err); return self.skipWaiting(); })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.hostname.includes('firebasedatabase.app')) {
    event.respondWith(
      fetch(event.request).then(r => { if(r.ok){ const c=r.clone(); caches.open(CACHE_NAME).then(ca=>ca.put(event.request,c)); } return r; })
      .catch(() => caches.match(event.request))
    ); return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        event.waitUntil(fetch(event.request).then(r=>{ if(r&&r.ok){ caches.open(CACHE_NAME).then(ca=>ca.put(event.request,r)); } }).catch(()=>{}));
        return cached;
      }
      return fetch(event.request).then(r => {
        if(r&&r.ok){ const c=r.clone(); caches.open(CACHE_NAME).then(ca=>ca.put(event.request,c)); } return r;
      }).catch(() => {
        if(event.request.mode==='navigate') return caches.match('./index.html');
        return new Response('Offline',{status:503});
      });
    })
  );
});
