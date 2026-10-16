import { useState } from "react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const TABS = [
  {
    key: "コンサル",
    voice: "資料は立派。でも、誰が作るの？",
    answer:
      "資料より先に、動く試作をお見せします。話を聞いた本人が作るので、提案と現実がずれません。",
  },
  {
    key: "システム会社",
    voice: "高いし、長いし、話が伝言ゲームになる。",
    answer:
      "聞いた本人が作るので、話がずれません。1つの業務から小さく始めます。",
  },
  {
    key: "AIツール",
    voice: "入れたけれど、現場で使われない。",
    answer:
      "いまのやり方に合わせて組み込み、使われるまで伴走します。",
  },
  {
    key: "研修",
    voice: "学んだのに、仕事に落とし込めない。",
    answer:
      "学ぶ前に、まず1つの業務を一緒に変えます。",
  },
] as const;

export function Moyamoya() {
  const [active, setActive] = useState(0);
  const current = TABS[active];

  return (
    <section id="moyamoya" className="border-y border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="COMPARE"
          title="ほかのやり方と、何が違うの？"
          lead="どのやり方にも合う場面があります。相談でよく聞く声に、当事務所の進め方を交えてお答えします。"
        />

        <div
          role="tablist"
          aria-label="比較する相手を選ぶ"
          className="flex flex-wrap gap-2"
        >
          {TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`min-h-[44px] rounded-md border px-5 text-[0.9rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu ${
                active === i
                  ? "border-shu bg-shu text-white"
                  : "border-line bg-washi text-sumi hover:border-shu/50"
              }`}
            >
              {t.key}
            </button>
          ))}
        </div>

        <Reveal key={current.key}>
          <div
            role="tabpanel"
            className="mt-6 rounded-lg border border-line bg-washi p-6 sm:p-8"
          >
            <p className="font-serif text-[1.05rem] font-bold leading-relaxed text-sumi">
              「{current.voice}」
            </p>
            <div className="mt-5 border-t border-line/70 pt-5">
              <p className="text-[0.78rem] font-bold tracking-wider text-shu">
                FDE型なら
              </p>
              <p className="jp-body mt-2 text-[0.92rem] text-sumi">
                {current.answer}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
