import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../../packages/web/public/demos/order-workshop/sw.js', import.meta.url), 'utf8');
const scope = 'https://example.test/demos/order-workshop/';
const key = r => new URL(typeof r === 'string' ? r : r.url, scope).href;
function harness(cachedRedirects = {}) {
  const stores = new Map(), listeners = new Map(), requests = [];
  const redirects = new Map(Object.entries(cachedRedirects).map(([from,to]) => [key(from), key(to)]));
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
        async match(request) {
          const response = store.get(key(request))?.clone();
          const target = redirects.get(key(request));
          if (response && target) {
            // CacheStorage preserves the final URL and redirect history of a followed precache request.
            Object.defineProperties(response, {
              url: { value: target }, redirected: { value: true }, type: { value: 'basic' },
            });
          }
          return response;
        },
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
  vm.runInNewContext(source, { self, caches, fetch: fetcher, URL, Response, Headers }, { filename: 'sw.js' });
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
test('the practice barcode opens offline without a previous visit to the image', async () => {
  const h = harness();
  await h.lifecycle('install');
  h.setOffline();
  const { response } = await h.request('sample-barcode.png');
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'ASSET');
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
  const h = harness(); h.stores.set('order-workshop-mobile-v6', new Map());
  h.stores.set('another-app', new Map()); await h.lifecycle('install'); await h.lifecycle('activate');
  assert(!h.stores.has('order-workshop-mobile-v6')); assert(h.stores.has('order-workshop-mobile-v7')); assert(h.stores.has('another-app'));
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

for (const [url, cached, final, expected] of [
  ['app.html', 'app.html', 'app', 'APP'],
  ['app?view=scan', 'app.html', 'app', 'APP'],
  ['index.html?view=review', 'index.html', './', 'PREVIEW'],
  ['migration-guide?from=offline', 'migration-guide.html', 'migration-guide', 'GUIDE'],
]) {
  test('offline navigation can consume a followed HTML redirect: ' + url, async () => {
    const h = harness({ [cached]: final });
    await h.lifecycle('install');
    const entry = h.stores.get('order-workshop-mobile-v7').get(key(cached));
    entry.headers.set('Content-Security-Policy', "default-src 'self'");
    entry.headers.set('Content-Encoding', 'br');
    entry.headers.set('Content-Length', '123');
    h.setOffline();
    const { response } = await h.request(url);
    assert.equal(response.status, 200);
    assert.equal(response.redirected, false);
    assert.equal(response.headers.get('Content-Type'), 'text/html');
    assert.equal(response.headers.get('Content-Security-Policy'), "default-src 'self'");
    assert.equal(response.headers.get('Content-Encoding'), null);
    assert.equal(response.headers.get('Content-Length'), null);
    assert.equal(await response.text(), expected);
  });
}

for (const final of ['https://other.test/demos/order-workshop/app', '/demos/other/app', 'migration-guide', 'unknown', 'app/', 'app?unexpected=1']) {
  test('offline navigation refuses an unexpected cached redirect to ' + final, async () => {
    const h = harness({ 'app.html': final });
    await h.lifecycle('install'); h.setOffline();
    for (const url of ['app.html', 'app?view=review']) {
      assert.equal((await h.request(url)).response.status, 503);
    }
  });
}

test('offline navigation rejects non-HTML content at the expected redirect URL', async () => {
  const h = harness({ 'app.html': 'app' });
  await h.lifecycle('install');
  h.stores.get('order-workshop-mobile-v7').get(key('app.html')).headers.set('Content-Type', 'text/plain');
  h.setOffline();
  assert.equal((await h.request('app.html')).response.status, 503);
});

test('an exact cached navigation can preserve the selected view through a redirect', async () => {
  const h = harness({ 'app.html?view=scan': 'app?view=scan' });
  await h.lifecycle('install');
  await h.request('app.html?view=scan');
  h.setOffline();
  const { response } = await h.request('app.html?view=scan');
  assert.equal(response.status, 200);
  assert.equal(response.redirected, false);
  assert.equal(await response.text(), 'APP');
});
