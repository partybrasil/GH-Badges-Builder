const CACHE_NAME = 'gh-badges-builder-v1';
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
    './data/templates/languages.json',
    './data/templates/frameworks.json',
    './data/templates/tools.json',
    './assets/images/logo.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
