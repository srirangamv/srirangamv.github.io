const DATA_CACHE_NAME = 'offline';
const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', function(event) {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
    await cache.addAll(filesToCache);
  })());
  
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});

var filesToCache = [
  'https://viksrirangam.github.io/',
  'https://viksrirangam.github.io/blog/index.html',
  'https://viksrirangam.github.io/index.html',
  'https://viksrirangam.github.io/css/style.css',
  'https://viksrirangam.github.io/css/syntax.css',
  'https://viksrirangam.github.io/images/BlipkartArchitecture.png',
  'https://viksrirangam.github.io/images/FactoryMethodPattern.png',
  'https://viksrirangam.github.io/images/FactoryPattern.png',
  'https://viksrirangam.github.io/images/FluxDemo.png',
  'https://viksrirangam.github.io/images/VueJsDemo.png',
  'https://viksrirangam.github.io/images/PythonBanner.jpg',
  'https://viksrirangam.github.io/images/Lnkdn.jpeg',
  'https://viksrirangam.github.io/images/Enable71_Two.png',
  'https://viksrirangam.github.io/images/Enable71_Three.png',
  'https://viksrirangam.github.io/images/ES6Enums.png',
  'https://viksrirangam.github.io/images/firstapp_flask_code.png',
  'https://viksrirangam.github.io/images/firstapp_code.png',
  'https://viksrirangam.github.io/images/firstapp_code_2.png',
  'https://viksrirangam.github.io/images/docker-restart.png',
  'https://viksrirangam.github.io/images/BridgePattern.png',
  'https://viksrirangam.github.io/images/ObserverPattern.png',
  'https://viksrirangam.github.io/images/StrategyPattern.png',
  'https://viksrirangam.github.io/images/TemplatemethodPattern.png'
];