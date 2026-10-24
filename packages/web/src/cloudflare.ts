import api from "./api";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

// Keep the existing health check and starter RPC on the standard Fetch API.
// Static assets are served directly by Cloudflare; Bun/PM2 is not deployed.
export default {
  fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      return api.fetch(request);
    }
    return env.ASSETS.fetch(request);
  },
};
