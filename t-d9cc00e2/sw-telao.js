/* Service worker só do telão: guarda a última cópia do telao.html para abrir mesmo sem internet. */
const C='telao-v2';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin||!u.pathname.endsWith('/telao.html')) return;
  e.respondWith(fetch(e.request.url,{cache:'no-cache'}).then(r=>{ const c=r.clone(); caches.open(C).then(x=>x.put(u.origin+u.pathname,c)); return r })
    .catch(()=>caches.match(u.origin+u.pathname)));
});
