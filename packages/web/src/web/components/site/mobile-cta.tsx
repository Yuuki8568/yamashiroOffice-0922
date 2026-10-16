import { useEffect, useState } from "react";
import { LINKS } from "../../lib/links";

/**
 * モバイル用の追従CTA。ヒーローを過ぎてから表示し、
 * コンタクト欄・フッターが見えている間は隠す。
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const inView = new Set<Element>();
    const update = () => {
      setVisible(inView.size === 0 && window.scrollY > 600);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inView.add(e.target);
          else inView.delete(e.target);
        }
        update();
      },
      { threshold: 0.05 },
    );
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");
    if (contact) io.observe(contact);
    if (footer) io.observe(footer);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  const show = visible && !dismissed;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-3 rounded-lg border border-white/10 bg-sumi/95 px-3.5 py-2.5 shadow-lg backdrop-blur">
        <p className="shrink-0 text-[0.68rem] leading-tight text-white/70">
          初回45分・無料
          <br />
          オンライン
        </p>
        <a
          href={LINKS.booking}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="flex-1 rounded-md bg-shu px-4 py-2.5 text-center text-[0.85rem] font-bold text-white transition-colors hover:bg-shu-dark"
        >
          無料相談を予約する
        </a>
        <button
          type="button"
          aria-label="この案内を閉じる"
          tabIndex={show ? 0 : -1}
          onClick={() => setDismissed(true)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" />
              <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
