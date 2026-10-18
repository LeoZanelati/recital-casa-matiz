/* Service worker só do telão: guarda a última cópia do telao.html e os arquivos de videos/ (playbacks e vídeos) para abrir e tocar mesmo sem internet. */
const C='telao-v2', M='telao-media-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  if(u.pathname.endsWith('/telao.html')){
    e.respondWith(fetch(e.request.url,{cache:'no-cache'}).then(r=>{ const c=r.clone(); caches.open(C).then(x=>x.put(u.origin+u.pathname,c)); return r })
      .catch(()=>caches.match(u.origin+u.pathname)));
  } else if(u.pathname.includes('/videos/') && !e.request.headers.has('range')){
    e.respondWith(caches.open(M).then(c=>c.match(u.origin+u.pathname).then(hit=>hit||fetch(e.request).then(r=>{ if(r.ok&&r.status===200) c.put(u.origin+u.pathname,r.clone()); return r }))));
  }
});
