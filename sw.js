const V='fgo-shell-v3',RT='fgo-api-v1',OFF='fgo-off',SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>![V,RT,OFF].includes(x)).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  const netFirst=name=>fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(name).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreVary:true}).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error())));
  if(u.origin===location.origin)e.respondWith(netFirst(V));
  else if(u.hostname==='api.atlasacademy.io')e.respondWith(netFirst(RT));
  else if(u.hostname==='static.atlasacademy.io')e.respondWith(caches.match(r,{ignoreVary:true}).then(h=>h||fetch(r)));
});
