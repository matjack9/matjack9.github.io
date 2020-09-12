/** update upon any site changes so service worker invalidates and replaces cache */
const version = '1';
const cacheName = `matt-jackson-${version}`;

const filesToCache = [
    '/index.html',
    '/contact.html',
    '/skills.html',
    '/projects.html',
    '/css/style.css',
    '/src/index.js',
    '/src/app.js',
    '/assets/flatiron.jpg'
];

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);

main().catch(console.error);

async function main() {
    await cacheFiles();
}

function onInstall() {
    console.log(`Service Worker (v${version}) installed`);
	self.skipWaiting();
}

function onActivate(event) {
    event.waitUntil(handleActivation());
}

async function handleActivation() {
    await clients.claim();
    await clearCaches();
    await cacheFiles(true);
}

async function cacheFiles(forceReload = false) {
    const cache = await caches.open(cacheName).catch(console.error);
    
    return Promise.all(
        filesToCache.map(async function put(fileLocation) {
            try {
                let content;

				if (!forceReload) {
                    content = await cache.match(fileLocation);
                    
					if (content) {
						return;
					}
                }

                content = await fetch(fileLocation);

                console.log(`Service Worker caching asset at ${fileLocation}.`);

                return cache.put(fileLocation, content);
            } catch (error) {
                console.error(error);
            }
        })
    );
}

async function clearCaches() {
    const cacheNames = await caches.keys().catch(console.error);
    
	const oldCacheNames = cacheNames.filter(function matchOldCache(cacheName) {
		let [,cacheNameVersion] = cacheName.match(/^matt-jackson-(\d+)$/) || [];
        cacheNameVersion = cacheNameVersion != null ? Number(cacheNameVersion) : cacheNameVersion;
        
		return (
			cacheNameVersion > 0 &&
			version !== cacheNameVersion
		);
    });
    
	await Promise.all(
		oldCacheNames.map(function deleteCache(cacheName) {
			return caches.delete(cacheName);
		})
    ).catch(console.error);
    
    console.log('Service Worker cleared cache.');
}

function onFetch(event) {
    event.respondWith(respond(event.request));
}

async function respond(request) {
    const url = new URL(request.url);
	const reqURL = url.pathname;
    const cache = await caches.open(cacheName).catch(console.error);
    const maybeCachedResponse = await cache.match(reqURL).catch(console.error);

    if (maybeCachedResponse) {
        console.log(`Service Worker serving cached asset at ${reqURL}.`);
        return maybeCachedResponse;
    }
    return await fetch(request).catch(console.error);
}
