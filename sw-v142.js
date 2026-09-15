const CORE='red-ts-ibarra-v142';
const TILES='red-ts-map-tiles-v142';
const RUNTIME='red-ts-runtime-v142';
const ASSETS=['./manifest.webmanifest','./icon.svg','./red-interurbana-ibarra.kmz'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CORE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keep=[CORE,TILES,RUNTIME];for(const k of await caches.keys())if(!keep.includes(k))await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const u=new URL(event.request.url);
  if(u.hostname.endsWith('tile.openstreetmap.org')){
    event.respondWith((async()=>{const c=await caches.open(TILES);const hit=await c.match(event.request);if(hit)return hit;try{const r=await fetch(event.request);if(r.ok)await c.put(event.request,r.clone());return r}catch(e){return new Response('',{status:504})}})());return;
  }
  if(event.request.mode==='navigate' || u.pathname.endsWith('/index.html') || u.pathname.endsWith('/')){
    event.respondWith((async()=>{try{const r=await fetch(event.request,{cache:'no-store'});if(r.ok){const c=await caches.open(CORE);await c.put('./index.html',r.clone())}return r}catch(e){return (await caches.match('./index.html')) || Response.error()}})());return;
  }
  if(u.hostname==='unpkg.com'){
    event.respondWith((async()=>{const c=await caches.open(RUNTIME);const hit=await c.match(event.request);if(hit)return hit;try{const r=await fetch(event.request);if(r.ok)await c.put(event.request,r.clone());return r}catch(e){return hit||Response.error()}})());return;
  }
  event.respondWith((async()=>{const hit=await caches.match(event.request);if(hit)return hit;try{const r=await fetch(event.request);if(r.ok)await (await caches.open(RUNTIME)).put(event.request,r.clone());return r}catch(e){return Response.error()}})());
});
