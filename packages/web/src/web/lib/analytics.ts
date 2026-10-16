// GA4 + Cookie同意管理
// Googleタグ本体の読み込みは index.html 内のインラインスクリプトが担う
// （GA4管理画面のタグ検出は <head> 内の静的タグを見るため）。
// このファイルは同意状態の管理と、同意時の動的ロードのフォールバックを担当する。

const CONSENT_KEY = "ga-consent";
// index.html 側のインラインタグと必ず同じ値にすること。
export const GA_MEASUREMENT_ID = "G-4HK647VKTL";

export type ConsentState = "granted" | "denied" | null;

export function getConsent(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent("ga-consent-changed", { detail: v }));
}

let loaded = false;

// GA4が発行した分析Cookieをすべて削除する（同意撤回時に使用）。
// 名前が "_ga" で始まるもの（_ga, _ga_XXXXXXXXXX）を対象に、
// 現在のドメインと親ドメインの両方に対して期限切れを書き込む。
export function deleteGaCookies() {
  try {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    const domains = [hostname];
    if (parts.length > 2) {
      // 例: www.example.com -> .example.com
      domains.push("." + parts.slice(-2).join("."));
    }
    const cookies = document.cookie ? document.cookie.split(";") : [];
    for (const c of cookies) {
      const name = c.split("=")[0].trim();
      if (!name.startsWith("_ga")) continue;
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
      }
      // domain指定なし版も念のため
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  } catch {
    // ignore
  }
}

// index.html のタグが何らかの理由で未実行だった場合のフォールバック。
// 通常は index.html 側が先に読み込むため、このパスは通らない。
function loadGtag() {
  if (loaded || !GA_MEASUREMENT_ID) return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag === "function") {
    loaded = true;
    return;
  }
  loaded = true;

  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    (w.dataLayer as unknown[]).push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

// 同意済みの場合のみGA4へカスタムイベントを送信する。
// 拒否・未回答時は gtag が読み込まれていないため何も起きない。
// 相談内容・氏名・メールアドレス等の個人情報は送らない。
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (getConsent() !== "granted") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("event", name, params);
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID) return;
  if (getConsent() === "granted") loadGtag();

  window.addEventListener("ga-consent-changed", (e) => {
    if ((e as CustomEvent).detail === "granted") loadGtag();
  });
}
