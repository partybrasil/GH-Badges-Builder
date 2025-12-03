// Cache version - increment this when deploying updates
const CACHE_VERSION = 2;
const CACHE_NAME = `gh-badges-builder-v${CACHE_VERSION}`;

const ASSETS = [
    './',
    './index.html',
    './css/reset.css',
    './css/variables.css',
    './css/main.css',
    './css/components.css',
    './css/layout.css',
    './css/themes.css',
    './css/responsive.css',
    './js/app.js',
    './js/config.js',
    './js/utils/helpers.js',
    './js/modules/BadgeGenerator.js',
    './js/modules/TemplateManager.js',
    './js/modules/StorageManager.js',
    './js/modules/UIManager.js',
    './js/modules/DragDropManager.js',
    './js/modules/ExportManager.js',
    './js/modules/IconManager.js',
    './data/templates/languages.json',
    './data/templates/frameworks.json',
    './data/templates/tools.json',
    './data/templates/databases.json',
    './data/templates/cloud.json',
    './data/templates/cicd.json',
    './assets/images/logo.svg'
];

// Install event - cache assets and skip waiting to activate immediately
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
            .then(() => self.skipWaiting()) // Activate new SW immediately
    );
});

// Activate event - delete old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName.startsWith('gh-badges-builder-') && cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => self.clients.claim()) // Take control of all pages immediately
    );
});

// Fetch event - Network first for HTML/JSON, Cache first for static assets
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // For HTML and JSON files, use network-first strategy
    if (event.request.mode === 'navigate' || 
        url.pathname.endsWith('.html') || 
        url.pathname.endsWith('.json')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Clone the response before caching
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }
    
    // For other assets (CSS, JS, images), use cache-first with network fallback
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then((response) => {
                    // Cache the new resource
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                });
            })
    );
});
