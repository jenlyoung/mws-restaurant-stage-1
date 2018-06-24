self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('testcache').then(function(cache){
            console.log('loading');
            return cache.addAll([
                "/",
                "/css/styles.css",
                "/data/restaurants.json",
                "/js/dbhelper.js",
                "/js/main.js",
                "/js/register.js",
                "/js/restaurant_info.js",
                "/index.html",
                "/restaurant.html"
                ]);
        })
    );
});


self.addEventListener('fetch', event => {
    console.log(`Fetching: ${event.request.url}`);

    const requestUrl = new URL(event.request.url);

    console.log(requestUrl.origin, location.origin);

    if (requestUrl.origin === location.origin){
        if (requestUrl.pathname ==='/restaurant.html'){
            event.respondWith(caches.match('/restaurant.html'));
            return;
        }
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).then(fr=>{
                    return caches.open("testcache").then(c=>{
                        c.put(event.request, fr.clone());
                        return fr;
                    })
                });
            })
            .catch(reason => {
            console.log(reason);
        })
    );
});