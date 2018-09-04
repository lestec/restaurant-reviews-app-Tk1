const staticCacheName = 'rest-cache-v1';

//install SW and adding files to cache
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
            '/css/main.css',
            '/css/responsive.css',
            'index.html',
            'restaurant.html',
            '/img/*',
			'/js/dbhelper.js',
            '/js/main.js',
            '/js/restaurant_info.js',
            '/js/register_sw.js'
        ]).catch(function(error) {
        	//console.log(error);
        });
                
    }));
});   

//delete previous cache
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('restaurant-') && 
							cacheName !== staticCacheName;
					}).map(function(cacheName) {
						return caches.delete(cacheName);
					})
				);
			})
		);
});

/*Offline caching help from 
 *https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
 */
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open(staticCacheName).then(function(cache) {
			return cache.match(event.request).then(function(response) {
				return response || fetch(event.request).then(function(response) {
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
	);
});

