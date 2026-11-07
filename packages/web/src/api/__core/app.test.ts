import { expect, test } from "bun:test";
import api from "../index";

test("health remains available without cross-origin credential grants", async () => {
  for (const origin of [undefined, "https://yamashirogyomukaizen.com", "https://untrusted.invalid", "null"]) {
    const response = await api.request("/api/health", {
      headers: origin ? { Origin: origin } : {},
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
    expect(response.headers.get("Access-Control-Allow-Credentials")).toBeNull();
  }
});

test("untrusted preflight does not grant API access", async () => {
  const response = await api.request("/api/health", {
    method: "OPTIONS",
    headers: { Origin: "https://untrusted.invalid", "Access-Control-Request-Method": "GET" },
  });
  expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  expect(response.headers.get("Access-Control-Allow-Credentials")).toBeNull();
});

test("same-origin starter RPC remains available", async () => {
  const response = await api.request("/api/rpc/ping", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ json: null }),
  });
  expect(response.status).toBe(200);
  expect(await response.text()).toContain("Pong!");
});
