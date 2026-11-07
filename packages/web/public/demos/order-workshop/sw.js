// The cache is limited to this demo. No background order submission.
const CACHE='order-workshop-mobile-v5';
const FILES=['./','index.html','app.html','preview.css','preview.js','migration.js','operations-import.js','migration-guide.html','import-ui.js','app.js','core.js','workflow.js','scanner.js','scan-logic.js','scanner-lib.js','style.css','manifest.webmanifest','icon-192.png','icon-512.png'];
// Only known static documents may ignore the view query when offline.
// Cloudflare canonical URLs omit .html; keep each document's identity intact.
const OFFLINE_DOCUMENTS=new Map([
 ['','./'],['index','index.html'],['index.html','index.html'],
 ['app','app.html'],['app.html','app.html'],
 ['migration-guide','migration-guide.html'],['migration-guide.html','migration-guide.html'],
]);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('order-workshop-mobile-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url),scope=new URL(self.registration.scope);
 if(event.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(scope.pathname))return;
 event.respondWith(fetch(event.request).then(response=>{
  if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(event.request,copy)));}
  return response;
 }).catch(async()=>{
  const cache=await caches.open(CACHE),exact=await cache.match(event.request);
  if(exact)return exact;
  if(event.request.mode==='navigate'){
   const relative=u.pathname.slice(scope.pathname.length).replace(/\/$/,'');
   const document=OFFLINE_DOCUMENTS.get(relative);
   if(document){const saved=await cache.match(new URL(document,scope).href);if(saved)return saved;}
  }
  return new Response('オフラインのため開けません。オンラインで一度この画面を開いてください。',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}});
 }));
});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{const scope=self.registration.scope;const found=list.find(c=>c.url.startsWith(scope));return found?found.focus():self.clients.openWindow(scope+'?view=review');}));});
