import { type ReactNode, useEffect } from "react";
import { Link } from "wouter";
import { Logo } from "./logo";
import { OFFICE } from "../../lib/links";

const LEGAL_NAV = [
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/tokusho", label: "特定商取引法" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/cookie", label: "Cookieポリシー" },
] as const;

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title}｜${OFFICE.name}`;
  }, [title]);

  return (
    <div className="min-h-screen bg-washi">
      <header className="border-b border-line bg-washi">
        <div className="mx-auto flex h-16 max-w-[840px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={32} />
            <span className="font-serif text-[0.95rem] font-bold text-sumi">
              {OFFICE.name}
            </span>
          </Link>
          <Link
            href="/"
            className="text-[0.8rem] font-medium text-sumi-soft hover:text-shu"
          >
            ← サイトトップへ戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[840px] px-4 py-12 sm:px-6 sm:py-16">
        <p className="eyebrow">LEGAL</p>
        <h1 className="mt-3 font-serif text-[1.6rem] font-bold text-sumi sm:text-[1.9rem]">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </main>

      <footer className="border-t border-line bg-washi-deep py-8">
        <div className="mx-auto max-w-[840px] px-4 sm:px-6">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.78rem] text-sumi-soft hover:text-shu"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4 text-[0.75rem] text-sumi-soft">
            © 2026 {OFFICE.name}
          </p>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="border-l-4 border-shu pl-3 font-serif text-[1.1rem] font-bold text-sumi">
        {heading}
      </h2>
      <div className="jp-body mt-4 space-y-3 text-[0.88rem] text-sumi-soft">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalOList({ items }: { items: readonly string[] }) {
  return (
    <ol className="list-decimal space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export function LegalTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[0.83rem]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border border-line bg-washi-deep px-3 py-2 text-left font-bold text-sumi"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-line bg-white px-3 py-2 align-top text-sumi-soft"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalDates({ revised = "2026年8月" }: { revised?: string }) {
  return (
    <p className="mt-10 border-t border-line pt-6 text-[0.8rem] text-sumi-soft">
      制定日：2026年5月　／　最終改定日：{revised}
    </p>
  );
}
