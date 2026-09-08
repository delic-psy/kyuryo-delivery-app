
const CACHE="wage-delivery-pwa-v1";
const ASSETS=["./","./index.html","./manifest.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{})));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{}); return r;
  }).catch(()=>caches.match("./"))));
});
