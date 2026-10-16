import { Reveal } from "../reveal";
import { LINKS, OFFICE } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

const CHANGES = [
  "繰り返す入力や確認の手間を減らす",
  "散らばった情報を扱いやすくする",
  "担当者しか分からない仕事を、他の人も扱える状態にする",
  "今あるExcelやツールを生かして改善する",
] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* subtle vertical hairlines motif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden justify-between px-[12%] opacity-40 md:flex"
      >
        <span className="h-full w-px bg-line" />
        <span className="h-full w-px bg-line" />
        <span className="h-full w-px bg-line" />
        <span className="h-full w-px bg-line" />
      </div>

      <div className="relative mx-auto max-w-[1080px] px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <p className="eyebrow">中小企業・個人事業主の業務改善支援</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-serif text-[1.75rem] font-bold leading-[1.45] text-sumi sm:text-[2rem] md:text-[2.2rem] lg:text-[2.6rem]">
                あなたの現場に合う、
                <span className="inline-block text-shu">業務改善を。</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="jp-body mt-6 max-w-[560px] text-[0.95rem] text-sumi-soft">
                中小企業・個人事業主の、日々の仕事の手間を減らします。
                例えば、このような変化です。
              </p>
              <ul className="mt-4 max-w-[560px] space-y-2">
                {CHANGES.map((c) => (
                  <li
                    key={c}
                    className="flex items-start gap-2.5 text-[0.92rem] font-bold leading-relaxed text-sumi"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-[0.85rem] text-shu"
                    >
                      ✓
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cta_booking", { location: "hero" })}
                  className="rounded-md bg-shu px-6 py-3.5 text-[0.95rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark"
                >
                  無料相談を予約する
                </a>
                <a
                  href="#projects"
                  onClick={() => trackEvent("cta_demo", { location: "hero" })}
                  className="rounded-md border border-sumi/25 bg-white px-6 py-3.5 text-[0.95rem] font-bold text-sumi transition-colors hover:border-shu hover:text-shu"
                >
                  改善例とデモを見る
                </a>
              </div>
              <p className="mt-3 text-[0.78rem] font-bold text-sumi">
                初回45分・無料／オンライン対応／相談のみでも可
              </p>
              <p className="mt-2 text-[0.78rem] leading-relaxed text-sumi-soft">
                相談では、改善の優先順位と、AIやツールに任せられる範囲を整理します。
                契約をお勧めする前に、今のやり方のままがよい場合はその旨をお伝えします。
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="justify-self-center md:justify-self-end">
            <figure className="relative">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-lg border border-shu/30" />
              <img
                src="/images/profile-1x.webp"
                alt={`代表 ${OFFICE.owner}`}
                width={280}
                height={280}
                className="relative rounded-lg border border-line bg-white object-cover shadow-md"
              />
              <figcaption className="relative mt-3 text-center text-[0.8rem] text-sumi-soft">
                代表　{OFFICE.owner}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
