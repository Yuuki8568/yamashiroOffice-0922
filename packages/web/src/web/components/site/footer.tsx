import { Link } from "wouter";
import { Logo } from "./logo";
import { LINKS, OFFICE } from "../../lib/links";

const LEGAL = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/tokusho", label: "特定商取引法に基づく表記" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/cookie", label: "Cookieポリシー" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-washi-deep">
      <div className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={34} />
              <div className="leading-tight">
                <p className="font-serif text-base font-bold text-sumi">
                  {OFFICE.name}
                </p>
                <p className="text-[0.7rem] tracking-[0.14em] text-sumi-soft">
                  {OFFICE.tagline}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[0.82rem] text-sumi-soft">
              {OFFICE.postal} {OFFICE.address}
            </p>
            <p className="mt-1 text-[0.82rem] text-sumi-soft">
              代表 {OFFICE.owner}（{OFFICE.ownerKana}）
            </p>
            <p className="mt-1 text-[0.75rem] text-sumi-soft/80">
              適格請求書発行事業者 登録番号：{OFFICE.invoice}
            </p>
            <a
              href={`mailto:${LINKS.email}`}
              className="mt-1 inline-block text-[0.82rem] text-shu underline-offset-2 hover:underline"
            >
              {LINKS.email}
            </a>
            <div className="mt-6 flex items-center gap-5">
              <img
                src="/images/g-general-2026-5.png"
                alt="JDLA Deep Learning for GENERAL 2026#5 合格ロゴ"
                width={1200}
                height={731}
                loading="lazy"
                className="h-9 w-auto"
              />
              <p className="text-[0.72rem] leading-snug text-sumi-soft">
                JDLA Deep Learning for GENERAL
                <br />
                2026#5 合格
              </p>
            </div>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              <li>
                <Link
                  href="/store"
                  className="text-[0.82rem] font-bold text-sumi transition-colors hover:text-shu"
                >
                  ストア（業務改善ツール直販）
                </Link>
              </li>
              <li>
                <a
                  href={LINKS.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.82rem] text-sumi-soft transition-colors hover:text-shu"
                >
                  AI業務改善ブログ（外部サイト）
                </a>
              </li>
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.82rem] text-sumi-soft transition-colors hover:text-shu"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-cookie-settings"))
                  }
                  className="text-[0.82rem] text-sumi-soft transition-colors hover:text-shu"
                >
                  Cookie設定
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center">
          <p className="text-[0.75rem] text-sumi-soft">
            © 2026 {OFFICE.name} — {OFFICE.tagline}
            <br className="sm:hidden" />
            <span className="sm:ml-2">
              All rights reserved. 無断転載・複製禁止
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
