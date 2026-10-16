import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { LINKS } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

const STEPS = [
  {
    step: "01",
    title: "初回無料相談",
    body: "困り事を確認し、改善の優先順位を整理します。AIやツールに任せられる範囲も一緒に見ます。",
    note: "約45分・費用: 無料",
  },
  {
    step: "02",
    title: "対象業務・条件の確認",
    body: "元データの形式、利用人数、外部連携の有無など、見積に必要な条件を確認します。",
    note: "資料は任意",
  },
  {
    step: "03",
    title: "提案・見積・合意",
    body: "成果物、費用、納期、対象外の範囲を明示してお出しします。ここまでは無料です。",
    note: "合意後に制作へ",
  },
  {
    step: "04",
    title: "制作・確認・引き渡し",
    body: "操作説明を行い、契約範囲に応じて運用支援も引き受けます。保守は個別合意による任意の継続契約です。",
    note: "保守は任意",
  },
] as const;

export function Flow() {
  return (
    <section id="flow" className="border-y border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="FLOW"
          title="ご相談から納品までの流れ"
          lead="初回相談から引き渡しまで、すべてオンラインで完結します。まずは話を聞いてみるだけでも構いません。"
        />
        <ol className="grid gap-5 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 90}>
              <li className="relative h-full rounded-lg border border-line bg-washi p-6 shadow-sm">
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[14px] top-1/2 z-10 hidden -translate-y-1/2 text-line md:block"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 5l7 7-7 7"
                        stroke="#0E7490"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
                <p className="font-serif text-[1.5rem] font-bold text-shu">
                  {s.step}
                </p>
                <h3 className="mt-2 font-serif text-[1.02rem] font-bold text-sumi">
                  {s.title}
                </h3>
                <p className="jp-body mt-3 text-[0.85rem] text-sumi-soft">
                  {s.body}
                </p>
                <p className="mt-4 inline-block rounded border border-shu/30 bg-shu/5 px-2.5 py-1 text-[0.72rem] font-bold text-shu">
                  {s.note}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <a
              href={LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_booking", { location: "flow" })}
              className="inline-block rounded-md bg-shu px-8 py-3.5 text-[0.95rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark"
            >
              まずは無料相談から始める
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
