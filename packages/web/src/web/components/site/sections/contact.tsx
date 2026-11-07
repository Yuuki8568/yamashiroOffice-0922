import { BUSINESS_TERMS } from "../../../lib/business-terms";
import { Reveal } from "../reveal";
import { LINKS, OFFICE } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

const QUICK_MAIL = `mailto:${LINKS.email}?subject=${encodeURIComponent(
  "【事前確認】相談対象になるか教えてほしい",
)}&body=${encodeURIComponent(
  "・困っている作業：\n\n・今のやり方：\n\n・聞きたいこと：\n",
)}`;

export function Contact() {
  return (
    <section id="contact" className="bg-sumi py-16 text-white sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <div className="mx-auto max-w-[640px] text-center">
          <Reveal>
            <p className="eyebrow">CONTACT</p>
            <h2 className="mt-3 font-serif text-[1.7rem] font-bold leading-snug sm:text-[2.1rem]">
              45分で、改善の最初の一歩を整理します
            </h2>
            <p className="jp-body mx-auto mt-5 max-w-[520px] text-[0.95rem] text-white/70">
              相談では、次の3点を整理します。
            </p>
            <ul className="mx-auto mt-6 max-w-[520px] space-y-2.5 text-left">
              {[
                "どの業務から改善を始めるか",
                "AIやツールに任せられる範囲",
                "今は変更せず、人が確認する方がよい部分",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 rounded-md border border-white/15 bg-white/5 px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[0.9rem]"
                    style={{ color: "#E8836F" }}
                  >
                    ✓
                  </span>
                  <span className="text-[0.88rem] leading-relaxed text-white/85">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
            <p className="jp-body mt-6 text-[0.85rem] text-white/70">
              まずは、一番手間に感じている作業を1つ教えてください。
            </p>
            <p className="jp-body mt-4 text-[0.8rem] leading-relaxed text-white/60">
              初回相談で、ツールの完成をお約束するものではありません。
              具体的な設計・制作は、内容と費用に合意してから進めます。
            </p>
            <p className="jp-body mt-4 text-left text-[0.8rem] leading-relaxed text-white/70">
              {BUSINESS_TERMS.serviceExclusions}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_booking", { location: "contact" })}
                className="rounded-md bg-shu px-7 py-3.5 text-[0.95rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark"
              >
                無料相談を予約する
              </a>
              <a
                href={`mailto:${LINKS.email}`}
                onClick={() => trackEvent("cta_mail", { location: "contact" })}
                className="rounded-md border border-white/30 px-7 py-3.5 text-[0.95rem] font-bold text-white transition-colors hover:border-white/60"
              >
                メールで問い合わせる
              </a>
            </div>
            <p className="mt-4 text-[0.78rem] text-white/50">
              Googleカレンダーの予約ページへ移動します（初回45分・無料）
            </p>
            <p className="mt-1 text-[0.78rem] text-white/50">{LINKS.email}</p>
          </Reveal>

          {/* 軽い入口：メールでの事前確認 */}
          <Reveal delay={80}>
            <div className="mt-10 rounded-lg border border-white/15 bg-white/5 p-6 text-left sm:p-7">
              <h3 className="font-serif text-[1.05rem] font-bold leading-snug">
                45分の相談はまだ早いと感じる方へ
              </h3>
              <p className="jp-body mt-3 text-[0.88rem] leading-relaxed text-white/75">
                「自分の困りごとが相談の対象になるか」だけでも、メールでお聞きいただけます。
                下のボタンを押すと、3つの記入欄が入ったメールが開きます。
              </p>
              <ul className="mt-4 space-y-1.5">
                {["困っている作業", "今のやり方", "聞きたいこと"].map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 text-[0.85rem] text-white/85"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[0.8rem]"
                      style={{ color: "#E8836F" }}
                    >
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-center">
                <a
                  href={QUICK_MAIL}
                  onClick={() =>
                    trackEvent("cta_mail", { location: "contact_quick" })
                  }
                  className="inline-flex min-h-[44px] items-center rounded-md border border-white/30 px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:border-white/60"
                >
                  この3点をメールで送る
                </a>
                <p className="mt-3 text-[0.75rem] leading-relaxed text-white/50">
                  お使いのメールソフトが開きます。このボタンはサイト独自の問い合わせフォームに内容を保存・送信するものではありません。送信されたメールはGoogle Workspaceで受信・管理します。個人情報の取扱いはプライバシーポリシーをご確認ください。
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* アクセス */}
        <Reveal delay={120}>
          <div className="mt-14 border-t border-white/10 pt-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="eyebrow">ACCESS</p>
                <h3 className="mt-3 font-serif text-[1.25rem] font-bold leading-snug">
                  {OFFICE.name}
                </h3>
                <p className="jp-body mt-4 text-[0.9rem] leading-relaxed text-white/75">
                  {OFFICE.postal}
                  <br />
                  {OFFICE.address}
                </p>
                <p className="jp-body mt-4 text-[0.82rem] leading-relaxed text-white/60">
                  基本はオンライン対応です（全国対応可）。訪問は内容と地域によりご相談のうえ対応します。
                </p>
                <a
                  href={LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_maps", { location: "contact" })
                  }
                  className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-white/30 px-5 py-2.5 text-[0.85rem] font-bold text-white transition-colors hover:border-white/60"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Googleマップで開く
                </a>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/15 shadow-sm">
                <iframe
                  title={`${OFFICE.name}の地図`}
                  src={LINKS.googleMapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[280px] w-full border-0 sm:h-[320px]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
