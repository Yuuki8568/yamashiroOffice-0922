import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../../packages/web/public/demos/order-workshop/sw.js', import.meta.url), 'utf8');
const scope = 'https://example.test/demos/order-workshop/';
const key = r => new URL(typeof r === 'string' ? r : r.url, scope).href;
function harness() {
  const stores = new Map(), listeners = new Map(), requests = [];
  let offline = false, claimed = 0;
  const getStore = name => {
    if (!stores.has(name)) stores.set(name, new Map());
    return stores.get(name);
  };
  const caches = {
    async open(name) {
      const store = getStore(name);
      return {
        async addAll(files) { for (const file of files) store.set(key(file), await fetcher({ url: key(file) })); },
        async put(request, response) { store.set(key(request), response.clone()); },
        async match(request) { return store.get(key(request))?.clone(); },
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name) { return stores.delete(name); },
    async match(request) {
      for (const store of stores.values()) if (store.has(key(request))) return store.get(key(request)).clone();
    },
  };
  async function fetcher(request) {
    requests.push(key(request));
    if (offline) throw new TypeError('Synthetic network unavailable');
    const path = new URL(key(request)).pathname;
    const body = /\/app(?:\.html)?$/.test(path) ? 'APP' :
      /\/migration-guide(?:\.html)?$/.test(path) ? 'GUIDE' :
      path.endsWith('/') || /\/index(?:\.html)?$/.test(path) ? 'PREVIEW' : 'ASSET';
    return new Response(body, { headers: { 'Content-Type': body === 'ASSET' ? 'text/javascript' : 'text/html' } });
  }
  const self = {
    location: new URL(scope + 'sw.js'), registration: { scope },
    clients: { async claim() { claimed++; } },
    addEventListener(name, handler) { listeners.set(name, handler); },
  };
  vm.runInNewContext(source, { self, caches, fetch: fetcher, URL, Response }, { filename: 'sw.js' });
  async function lifecycle(name) {
    const jobs = []; listeners.get(name)({ waitUntil(p) { jobs.push(p); } }); await Promise.all(jobs);
  }
  async function request(path, { mode = 'navigate', method = 'GET' } = {}) {
    let result, intercepted = false; const jobs = [];
    listeners.get('fetch')({
      request: { url: new URL(path, scope).href, mode, method },
      respondWith(p) { intercepted = true; result = p; },
      waitUntil(p) { jobs.push(p); },
    });
    const response = await result; await Promise.all(jobs);
    return { response, intercepted };
  }
  return { lifecycle, request, stores, requests, setOffline() { offline = true; }, claimed: () => claimed };
}
for (const [url, expected] of [
  ['./', 'PREVIEW'], ['./?view=review', 'PREVIEW'], ['index?view=review', 'PREVIEW'],
  ['app.html?view=review', 'APP'], ['app?view=scan', 'APP'],
  ['migration-guide?from=offline', 'GUIDE'],
]) {
  test('offline navigation selects its own document: ' + url, async () => {
    const h = harness(); await h.lifecycle('install'); h.setOffline();
    const { response } = await h.request(url);
    assert(response instanceof Response); assert.equal(response.status, 200);
    assert.equal(await response.text(), expected);
  });
}
test('empty cache returns a controlled unavailable response, never undefined', async () => {
  const h = harness(); h.setOffline(); const { response } = await h.request('app?view=scan');
  assert(response instanceof Response); assert.equal(response.status, 503);
});
test('unknown offline navigation does not become the preview iframe wrapper', async () => {
  const h = harness(); await h.lifecycle('install'); h.setOffline();
  const { response } = await h.request('missing-page'); assert.equal(response.status, 503);
});
test('missing script and versioned resource never receive HTML fallback', async () => {
  const h = harness(); await h.lifecycle('install'); h.setOffline();
  for (const path of ['missing.js', 'core.js?v=unseen']) {
    const { response } = await h.request(path, { mode: 'cors' }); assert.equal(response.status, 503);
  }
});
test('cache lookup cannot pick an unrelated cache entry', async () => {
  const h = harness(); await h.lifecycle('install');
  h.stores.set('another-app', new Map([[key('uncached.js'), new Response('FOREIGN')]]));
  h.setOffline(); const { response } = await h.request('uncached.js', { mode: 'cors' });
  assert.equal(response.status, 503);
});
test('activation removes only previous order-demo caches', async () => {
  const h = harness(); h.stores.set('order-workshop-mobile-old', new Map());
  h.stores.set('another-app', new Map()); await h.lifecycle('install'); await h.lifecycle('activate');
  assert(!h.stores.has('order-workshop-mobile-old')); assert(h.stores.has('another-app'));
  assert.equal(h.claimed(), 1);
});
test('foreign origins, other demos and write requests stay outside this worker', async () => {
  const h = harness(); h.setOffline();
  for (const [url, options] of [
    ['https://other.test/demos/order-workshop/app', {}], ['/demos/shift-workshop/', {}],
    ['/api/health', {}], ['app', { method: 'POST' }],
  ]) assert.equal((await h.request(url, options)).intercepted, false);
  assert.equal(h.requests.length, 0);
});
test('successful online content is reused on a later network failure', async () => {
  const h = harness(); await h.lifecycle('install');
  const first = await h.request('app?view=review'); assert.equal(await first.response.text(), 'APP');
  h.setOffline(); const next = await h.request('app?view=review');
  assert.equal(await next.response.text(), 'APP');
});
