'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "e3c8797119135e3d13f140ce196cd387",
"assets/AssetManifest.bin.json": "ff1a5613a087352880cf4829f6eb5c30",
"assets/AssetManifest.json": "f22aae8dd90482275c5c5ffacc5538e6",
"assets/assets/fonts/Lexend/Lexend-VariableFont_wght.ttf": "a5144e9ee41f343224a9efc3efcbf1bc",
"assets/assets/icons/app.png": "63f3bebc5585e70b5fb5723b0d509b15",
"assets/assets/icons/automation.png": "12ca81e16126a2c41286ae4361fcb211",
"assets/assets/icons/bin.png": "b5037c3249955d1dc43b94e05bac58ad",
"assets/assets/icons/business.png": "af0656ba68c948c0eb4eaabf21c8ceb4",
"assets/assets/icons/businessPayments.png": "a9b6b7d9f19e730162bc3abae2496ec7",
"assets/assets/icons/campaigns.png": "896e40d81f5842655acc4c12eae8ee63",
"assets/assets/icons/clone.png": "c54d8ad06372f220d01ee58cfb0fe1a7",
"assets/assets/icons/customer.png": "783317d4851e2c9957960bc95880213a",
"assets/assets/icons/customers.png": "3bd150195a5218732687a04e6d52f5d6",
"assets/assets/icons/dashboard.png": "1ebada4340cee2e9e585be6b878f45bc",
"assets/assets/icons/done.png": "83dad0f55f00a3aef00f23da34dd82eb",
"assets/assets/icons/edit.png": "fcbba1a886af635fab14f1b88b950ecc",
"assets/assets/icons/leadGen.png": "0d924d98da41b9dc3d0b7375ef3ced84",
"assets/assets/icons/loyalty.png": "b67da1b8a3648b65439474195826ccdc",
"assets/assets/icons/personalization.png": "b2353cac7fe34cba3cde6f42a1d58b87",
"assets/assets/icons/promotions.png": "371fc18de37a081e845f2da6bab00754",
"assets/assets/icons/reward.png": "928f6d6c14733034f9ad3404c038a44a",
"assets/assets/icons/template.png": "5a0ac6c192eddca8058da4b13dfe8be0",
"assets/assets/icons/utils.png": "fb82a82778a75c470b1d4811ee160906",
"assets/FontManifest.json": "b984eb6714ee60ed8fc84d9410138351",
"assets/fonts/MaterialIcons-Regular.otf": "20e7e6348df991f7dbbb98f81cf9c9c0",
"assets/NOTICES": "0ca6ce7522f717b140b9a39a6e61670d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "3b38740a5adbef01f4bdb191cbed9cae",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"flutter_bootstrap.js": "ace1d0add35edf7f71b1fd66a499d4f7",
"icons/Icon-192.png": "52da04811327c3787a32e5538a97d910",
"icons/Icon-512.png": "f19c4cc71acb75125443929d8ac2525d",
"icons/Icon-maskable-192.png": "52da04811327c3787a32e5538a97d910",
"icons/Icon-maskable-512.png": "f19c4cc71acb75125443929d8ac2525d",
"index.html": "02a987feb58b774be589aba9ea83ce18",
"/": "02a987feb58b774be589aba9ea83ce18",
"main.dart.js": "55b1427659b526736c575a2a43fc9882",
"manifest.json": "3de983bf308434ebbfd19ccd5364dc6c",
"version.json": "3cd4c3e7c0a19a3d827474b4171f74b1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
