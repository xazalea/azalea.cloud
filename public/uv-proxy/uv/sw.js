/*global UVServiceWorker,__uv$config*/
/*
 * Stock service worker script.
 * Users can provide their own sw.js if they need to extend the functionality of the service worker.
 * Ideally, this will be registered under the scope in uv.config.js so it will not need to be modified.
 * However, if a user changes the location of uv.bundle.js/uv.config.js or sw.js is not relative to them, they will need to modify this script locally.
 */
try {
    importScripts('uv.bundle.js');
    importScripts('uv.config.js');
    
    // Check if UV is available before using it
    if (typeof self.Ultraviolet !== 'undefined' && typeof UVServiceWorker !== 'undefined') {
        const uv = new UVServiceWorker();
        
        async function handleRequest(event) {
            try {
                if (uv && uv.route && uv.route(event)) {
                    return await uv.fetch(event);
                }
            } catch (e) {
                console.error('[UV SW] Error handling request:', e);
            }
            
            return await fetch(event.request);
        }
        
        self.addEventListener('fetch', (event) => {
            event.respondWith(handleRequest(event));
        });
    } else {
        // Fallback: just pass through requests if UV is not available
        self.addEventListener('fetch', (event) => {
            event.respondWith(fetch(event.request));
        });
    }
} catch (e) {
    console.error('[UV SW] Service worker initialization error:', e);
    // Fallback: just pass through requests
    self.addEventListener('fetch', (event) => {
        event.respondWith(fetch(event.request));
    });
}