import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { LINKS } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

const PROJECTS = [
  {
    tags: ["商談用デモ", "月末の確認作業"],
    title: "月末確認デモ",
    image: "/images/ss-getsumatsu-demo.webp",
    subtitle: "Month-end Reconciliation Demo",
    before:
      "受注一覧と完了一覧を突き合わせる作業。一致・金額不一致・記録不足を、担当者が目視で確認している。",
    after:
      "2つの一覧を照合し、一致・金額不一致・記録不足のどれかを一覧にして、次の確認先を示す。",
    meta: [
      { label: "対象", value: "受注一覧と完了一覧を突き合わせる作業" },
      { label: "見られること", value: "一致・金額不一致・記録不足と、次の確認先" },
      { label: "明示①", value: "架空データによる機能説明。顧客導入実績ではありません" },
      { label: "明示②", value: "決まったルールに基づく照合です。AIがリアルタイムで判断するものではありません" },
    ],
    link: { href: "/demo", label: "サンプルで確認作業を試す", internal: true },
  },
  {
    tags: ["公開診断ツール", "中小企業"],
    title: "AI業務診断ツール",
    subtitle: "AI Readiness Diagnosis",
    image: "/images/ss-shindan.webp",
    before:
      "「AIが自社に使えるのかわからない」「何から始めればいいかわからない」という中小企業が多く、最初の一歩を踏み出せない。",
    after:
      "分岐式の質問に答えるだけで、約2分でAI導入適性をスコアで可視化。難しい知識は不要。",
    meta: [
      { label: "ターゲット", value: "「AIって自社に使えるの？」と思っている中小企業の経営者" },
      { label: "設計思想", value: "独自フレームワークによる診断ロジック" },
    ],
    link: { href: LINKS.shindan, label: "診断ツールを試す（無料・約2分）", internal: false },
  },
  {
    tags: ["商談用デモ", "シフト勤務の職場"],
    title: "シフト工房 ── 実績を次のシフトに活かすデモ",
    subtitle: "Shift Planning & Demand Forecast Demo",
    image: "/images/ss-shift-evolve.webp",
    before:
      "毎月のシフト表づくりに時間がかかる。希望休・必要人数・役割・連勤の上限を確認し、急な欠勤や繁閑の変化にも対応したい。",
    after:
      "希望と勤務条件からシフト案を作成し、セルを選んで手直し。欠勤時の交代候補、勤務時間・人件費の概算、過去の実績から予測した必要人数を確認できます。",
    meta: [
      { label: "対応業種", value: "飲食・小売の架空サンプル。7〜31日間、最大30人のシフトを体験できます" },
      { label: "特徴", value: "ログイン不要。入力データはブラウザ内で処理し、端末保存・JSON保存・CSV出力ができます" },
      { label: "実績の活用", value: "記録した実績から、曜日・時間帯別の需要を統計的に予測。必要人数への反映は利用者が確認して決めます" },
      { label: "位置づけ", value: "架空データによるデモ。自動作成は下書きです。実際の導入時は勤務体系や運用に合わせて設計します" },
    ],
    link: { href: LINKS.shiftKobo, label: "シフト工房を試す（無料）", internal: true },
  },
  {
    tags: ["商談用デモ", "小売・在庫管理"],
    title: "発注工房 ── 実績から学ぶAI発注デモ",
    subtitle: "Demand Forecast & Replenishment Demo",
    image: "/images/ss-order-workshop.webp",
    before:
      "欠品を避けようと多く仕入れると、在庫や廃棄が増えてしまう。天候・販促・納期の変化も、担当者の経験だけで判断している。",
    after:
      "スマホでバーコードを読み取り、商品・棚卸数を登録。販売実績から発注案を更新し、確認待ちの一覧で根拠を見ながら承認・保留できます。",
    meta: [
      { label: "体験内容", value: "架空の小売店・初期4商品。バーコード読取、商品追加、棚卸、発注案の個別承認と実績記録" },
      { label: "学習の確認", value: "曜日平均と要因を加えた統計モデルを比較。欠品・休業・未確認日は需要ゼロとして学習しません" },
      { label: "位置づけ", value: "端末内で動く体験デモ。閉じている間の定時処理・通知、POS連携、実発注は未接続です" },
    ],
    link: { href: LINKS.orderWorkshop, label: "AI発注デモを試す（無料）", internal: true },
  },
] as const;

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="PROJECTS"
          title="制作例・デモ"
          lead="架空データで動作する体験用デモと、公開している診断ツールです。顧客導入実績ではありません。困りごとから選ぶ一覧は、この下の「体験デモ」にもあります。"
        />
        <div className="flex flex-col gap-10">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <article className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
                <div className={`grid md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="border-b border-line bg-washi-deep p-6 md:border-b-0 md:p-8">
                    <img
                      src={p.image}
                      alt={`${p.title} スクリーンショット`}
                      loading="lazy"
                      className="w-full rounded-md border border-line shadow-sm"
                    />
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-line bg-washi px-2.5 py-1 text-[0.7rem] font-bold tracking-wider text-sumi-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 font-serif text-[1.25rem] font-bold text-sumi">
                      {p.title}
                    </h3>
                    <p className="text-[0.78rem] tracking-wide text-sumi-soft">
                      {p.subtitle}
                    </p>

                    <div className="mt-5 space-y-3">
                      <div className="rounded-md border border-line bg-washi p-4">
                        <p className="text-[0.7rem] font-bold tracking-[0.2em] text-sumi-soft">
                          想定する困り事
                        </p>
                        <p className="jp-body mt-1.5 text-[0.85rem] text-sumi-soft">
                          {p.before}
                        </p>
                      </div>
                      <div className="rounded-md border border-shu/30 bg-shu/5 p-4">
                        <p className="text-[0.7rem] font-bold tracking-[0.2em] text-shu">
                          このデモで確認できること
                        </p>
                        <p className="jp-body mt-1.5 text-[0.85rem] text-sumi">
                          {p.after}
                        </p>
                      </div>
                    </div>

                    <dl className="mt-5 space-y-2">
                      {p.meta.map((m) => (
                        <div key={m.label} className="flex gap-3 text-[0.82rem]">
                          <dt className="w-20 shrink-0 font-bold text-sumi">
                            {m.label}
                          </dt>
                          <dd className="text-sumi-soft">{m.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <a
                      href={p.link.href}
                      target={p.link.internal ? undefined : "_blank"}
                      rel={p.link.internal ? undefined : "noopener noreferrer"}
                      onClick={() => trackEvent("cta_demo", { location: `projects_${p.title}` })}
                      className="mt-6 inline-flex items-center gap-2 text-[0.88rem] font-bold text-shu underline-offset-4 hover:underline"
                    >
                      {p.link.label}
                      {!p.link.internal && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
