console.log('inicio')

if( navigator.serviceWorker){
    
    navigator.serviceWorker.register('sw.js');

} else {
    document.querySelector('main').innerHTML = '<h2> El navegador no ServiceWorker </h2>';
}



if( 'caches' in window){
    console.log('Todo listo para usar el cache');
} else {
    document.querySelector('header').innerText = 'El navegador no soporta Cache';
}



/* caches.has('mi-cache-v1').then( res => {
    console.log('Existe? ' ,res)
})

caches.delete('mi-cache').then( res => {
    console.log(res)
})

caches.keys().then( res => {
    console.log(res)
}) */