import { useEffect, useState } from "react";
import {
  GA_MEASUREMENT_ID,
  getConsent,
  setConsent,
  deleteGaCookies,
} from "../../lib/analytics";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 測定IDが未設定（未発行）の間はバナーも出さない
    if (!GA_MEASUREMENT_ID) return;
    // 初回: 未回答なら表示
    setVisible(getConsent() === null);

    // フッター等からの「Cookie設定」要求で再表示
    const onOpen = () => setVisible(true);
    window.addEventListener("open-cookie-settings", onOpen);
    return () => window.removeEventListener("open-cookie-settings", onOpen);
  }, []);

  if (!visible) return null;

  const decide = (v: "granted" | "denied") => {
    if (v === "denied") {
      // 同意済み → 拒否への切替（撤回）時に、発行済みの分析Cookieを削除する
      deleteGaCookies();
    }
    setConsent(v);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookieの利用について"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-[720px] rounded-lg border border-line bg-white p-5 shadow-xl sm:p-6">
        <p className="text-[0.85rem] font-bold text-sumi">
          Cookieの利用について
        </p>
        <p className="jp-body mt-2 text-[0.8rem] leading-relaxed text-sumi-soft">
          当サイトでは、アクセス解析のための分析Cookie（Google Analytics
          4）を利用しています。分析Cookieはサイト改善のみに使い、個人を特定する情報は含みません。詳しくは
          <a href="/cookie" className="text-shu underline underline-offset-2">
            Cookieポリシー
          </a>
          をご確認ください。
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-md bg-shu px-5 py-2.5 text-[0.85rem] font-bold text-white transition-colors hover:bg-shu-dark"
          >
            同意する
          </button>
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-md border border-line px-5 py-2.5 text-[0.85rem] font-bold text-sumi transition-colors hover:bg-washi"
          >
            拒否する
          </button>
        </div>
      </div>
    </div>
  );
}
