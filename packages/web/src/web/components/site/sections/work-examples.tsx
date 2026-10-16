import { useState } from "react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const EXAMPLES = [
  {
    letter: "A",
    worry: "同じ情報を、何度も転記している",
    support: "元の情報から、必要な帳票へ反映する流れを整える",
    deliverables: ["入力用フォーム", "帳票テンプレート", "操作手順"],
    conditions: ["元データ", "出力形式", "例外処理", "外部連携の有無"],
  },
  {
    letter: "B",
    worry: "日報や問い合わせの状況が、あちこちに散らばっている",
    support: "一覧と対応状況を確認できる画面に整理する",
    deliverables: ["管理画面", "運用ルール", "操作手順"],
    conditions: ["利用人数", "管理項目", "担当者", "権限"],
  },
  {
    letter: "C",
    worry: "毎月の集計や、金額の照合に手間がかかる",
    support: "集計と照合を行い、人が確認する項目を一覧にする",
    deliverables: ["集計・照合ツール", "確認事項の一覧", "操作手順"],
    conditions: ["データ形式", "集計条件", "件数", "確認担当"],
  },
] as const;

function ExampleCard({
  example,
}: {
  example: (typeof EXAMPLES)[number];
}) {
  const [open, setOpen] = useState(false);
  const detailId = `work-example-detail-${example.letter}`;

  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
      <p className="font-serif text-[1.35rem] font-bold text-shu">
        {example.letter}
      </p>
      <h3 className="mt-3 font-serif text-[1.05rem] font-bold leading-snug text-sumi">
        {example.worry}
      </h3>

      <div className="mt-4">
        <p className="text-[0.72rem] font-bold tracking-[0.18em] text-sumi-soft">
          支援例
        </p>
        <p className="jp-body mt-1.5 text-[0.88rem] text-sumi">
          {example.support}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[0.72rem] font-bold tracking-[0.18em] text-sumi-soft">
          成果物の例
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {example.deliverables.map((d) => (
            <li
              key={d}
              className="rounded border border-line bg-washi px-2.5 py-1 text-[0.72rem] text-sumi-soft"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={detailId}
          className="text-[0.8rem] font-bold text-shu underline-offset-4 hover:underline"
        >
          確認すること（前提条件）{open ? "を閉じる" : "を見る"}
        </button>
        {open && (
          <ul
            id={detailId}
            className="mt-3 space-y-1.5 rounded-md border border-line bg-washi p-4"
          >
            {example.conditions.map((c) => (
              <li key={c} className="flex gap-2 text-[0.8rem] text-sumi-soft">
                <span aria-hidden="true" className="text-shu">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function WorkExamples() {
  return (
    <section id="work-examples" className="border-y border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="EXAMPLES"
          title="相談できる業務の例"
          lead="ここにない業務でも相談いただけます。まずは「一番手間に感じている作業」をお聞かせください。"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {EXAMPLES.map((e, i) => (
            <Reveal key={e.letter} delay={i * 90}>
              <ExampleCard example={e} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="jp-body mx-auto mt-8 max-w-[720px] text-center text-[0.82rem] text-sumi-soft">
            いずれも支援内容の例です。対応範囲は現状を確認して決めます。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
