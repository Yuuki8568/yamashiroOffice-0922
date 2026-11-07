import { expect, test } from "bun:test";
import worker from "./cloudflare";

const html = '<!doctype html><script>window.test=true</script><script src="/app.js"></script><button onclick="bad()">test</button>';
const assets = { ASSETS: { fetch: async () => new Response(html, { headers: { "Content-Type": "text/html", ETag: '"old"' } }) } };

test("HTML receives an unpredictable matching nonce and cannot be shared-cached", async () => {
  const nonces = new Set<string>();
  for (let i = 0; i < 3; i++) {
    const response = await worker.fetch(new Request("https://example.com/"), assets);
    const policy = response.headers.get("Content-Security-Policy")!;
    const nonce = policy.match(/'nonce-([^']+)'/)![1];
    expect(nonce.length).toBe(32);
    nonces.add(nonce);
    const body = await response.text();
    expect(body.split(`nonce="${nonce}"`).length - 1).toBe(2);
    expect(policy).toContain("script-src-attr 'none'");
    expect(policy.split(";")[1]).not.toContain("unsafe-inline");
    expect(policy).not.toContain("unsafe-eval");
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("ETag")).toBeNull();
  }
  expect(nonces.size).toBe(3);
});

test("demo policy permits workers and blob images but no analytics", async () => {
  const response = await worker.fetch(new Request("https://example.com/demos/order-workshop/app"), assets);
  const policy = response.headers.get("Content-Security-Policy")!;
  expect(policy).not.toContain("google");
  expect(policy).toContain("worker-src 'self'");
  expect(policy).toContain("img-src 'self' data: blob:");
});

test("HTML revalidation cannot attach a new policy to a cached body", async () => {
  const response = await worker.fetch(new Request("https://example.com/", { headers: { "If-None-Match": '"old"', "Range": "bytes=0-10" } }), {
    ASSETS: { fetch: async request => {
      expect(request.headers.has("If-None-Match")).toBe(false);
      expect(request.headers.has("Range")).toBe(false);
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    } },
  });
  expect(response.status).toBe(200);
  expect(await response.text()).toContain("nonce=");
});

test("redirects, JS assets and API responses retain their behavior", async () => {
  for (const original of [new Response(null, { status: 307, headers: { Location: "/app" } }), new Response("export default 1", { headers: { "Content-Type": "text/javascript", "Cache-Control": "public, max-age=3600" } })]) {
    const response = await worker.fetch(new Request("https://example.com/app.js"), { ASSETS: { fetch: async () => original } });
    expect(response).toBe(original);
  }
  const response = await worker.fetch(new Request("https://example.com/api/health"), { ASSETS: { fetch: async () => { throw Error("API must not fetch HTML"); } } });
  expect(await response.json()).toEqual({ status: "ok" });
});
