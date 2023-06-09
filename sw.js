
self.addEventListener('install', function(){
    console.info('El Service worker se Instalo');

    const miCache = caches.open('mi-cache-v1').then( cache => {
        return cache.addAll([
            '/',
            'index.html',
            'app.js',
            'sw.js',
            'style.css',
            'original.png',
            'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;700;900&display=swap',
            'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
            'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2'
        ]);
    })

})

self.addEventListener('active', function(){
    console.info('El Service worker está instalado')
})


// Estrategia del cache: Cache only 
/* 
self.addEventListener('fetch', function(e){
    const url = e.request.url;
    console.log(e.request)
    const respuestaCache = caches.match( e.request);
    // Responde con lo que está en el cache
    e.respondWith( respuestaCache  );
})
 */



// Estrategia Cache Firts
/*
self.addEventListener('fetch', function(evento){
    const respuestaCache = caches.match( evento.request).then( res => {
        if (res ) {
            return res;
        } else {
            // si no hacemos un fetch
            return fetch(evento.request).then( respuesta => {
                return respuesta;
            })
        }
    })
    evento.respondWith( respuestaCache  )
})
*/

// Network Firt
self.addEventListener('fetch', function(evento){
    // Buscamos en la web
    const respuesta = fetch(evento.request).then( respuestaNetwork => {
        return caches.open( 'mi-cache-v1' ).then(  cache => {
            // Si la web responde lo guardo en cache
            cache.put(  evento.request, respuestaNetwork.clone() );
            return respuestaNetwork;
        } )
    }).catch( error => {
        // Si falla busco en el cache
        return caches.match( evento.request)
    })
   
    evento.respondWith( respuesta  )
})