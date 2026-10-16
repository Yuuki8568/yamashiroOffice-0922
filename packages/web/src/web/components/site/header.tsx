import { useState } from "react";
import { Logo } from "./logo";
import { LINKS, OFFICE } from "../../lib/links";

const NAV = [
  { href: "/#work-examples", label: "業務の例" },
  { href: "/#projects", label: "制作例・デモ" },
  { href: "/#pricing", label: "費用・流れ" },
  { href: "/service", label: "サービスと料金" },
  { href: "/#faq", label: "よくある質問" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-washi/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <Logo size={36} />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-[0.95rem] font-bold tracking-wide text-sumi sm:text-[1.05rem]">
              {OFFICE.name}
            </span>
            <span className="text-[0.62rem] tracking-[0.18em] text-sumi-soft">
              AI業務改善コンサルティング
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.85rem] font-medium text-sumi-soft transition-colors hover:text-shu"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={LINKS.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-shu px-3 py-2 text-[0.8rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark sm:px-4 sm:text-[0.85rem]"
          >
            無料相談
          </a>
          <button
            type="button"
            aria-label="メニュー"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white text-sumi lg:hidden"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
              {open ? (
                <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="2" y1="2" x2="16" y2="12" />
                  <line x1="16" y1="2" x2="2" y2="12" />
                </g>
              ) : (
                <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="1" y1="1" x2="17" y2="1" />
                  <line x1="1" y1="7" x2="17" y2="7" />
                  <line x1="1" y1="13" x2="17" y2="13" />
                </g>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-washi px-4 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-3 text-[0.95rem] font-medium text-sumi"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={LINKS.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-md bg-shu px-4 py-3 text-center text-[0.95rem] font-bold text-white"
          >
            無料相談を予約する
          </a>
        </nav>
      )}
    </header>
  );
}
