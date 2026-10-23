const V='studio-v2',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const same=new URL(r.url).origin==location.origin;
const net=()=>fetch(r,same?{cache:'no-cache'}:undefined).then(res=>{if(res.ok||res.type=='opaque'){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res});
e.respondWith(same?net().catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))):caches.match(r).then(h=>h||net()))});
