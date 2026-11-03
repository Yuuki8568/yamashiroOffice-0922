import api from "./api";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export function contentSecurityPolicy(nonce: string, demo: boolean): string {
  const google = demo ? "" : " https://www.googletagmanager.com";
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://challenges.cloudflare.com${google}`,
    "script-src-attr 'none'",
    `style-src 'self' 'unsafe-inline'${demo ? "" : " https://fonts.googleapis.com"}`,
    `font-src 'self'${demo ? "" : " https://fonts.gstatic.com"}`,
    `img-src 'self' data: blob:${demo ? "" : " https://*.google-analytics.com https://www.googletagmanager.com"}`,
    `connect-src 'self'${demo ? "" : " https://*.google-analytics.com https://www.googletagmanager.com"}`,
    `frame-src 'self' https://challenges.cloudflare.com${demo ? "" : " https://maps.google.com https://www.google.com"}`,
    "worker-src 'self'", "media-src 'self' blob:", "object-src 'none'",
    "base-uri 'self'", "form-action 'self'", "frame-ancestors 'self'",
  ].join("; ");
}

export default {
  async fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return api.fetch(request);
    }
    // Conditional HTML responses could combine a cached body with a fresh nonce.
    // Asset binding still handles redirects and non-HTML resources normally.
    const assetRequest = new Request(request);
    for (const name of ["if-none-match", "if-modified-since", "range", "if-range"]) assetRequest.headers.delete(name);
    const response = await env.ASSETS.fetch(assetRequest);
    if (response.status !== 200 || !response.headers.get("content-type")?.toLowerCase().startsWith("text/html")) return response;
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(24))));
    const secured = new Response(response.body, response);
    secured.headers.set("Content-Security-Policy", contentSecurityPolicy(nonce, pathname.startsWith("/demos/")));
    secured.headers.set("Cache-Control", "private, no-store");
    for (const name of ["etag", "last-modified", "content-length"]) secured.headers.delete(name);
    // Only immutable, repository-owned HTML from ASSETS is rewritten, never API
    // responses or user input. Cloudflare can also nonce its injected detection script.
    return new HTMLRewriter().on("script", {
      element(element) { element.setAttribute("nonce", nonce); },
    }).transform(secured);
  },
};
