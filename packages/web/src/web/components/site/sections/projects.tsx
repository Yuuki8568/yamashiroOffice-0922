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
    title: "シフト工房 ── 自動シフト作成デモ",
    subtitle: "Auto Shift Scheduling Demo",
    image: "/images/ss-shift.webp",
    before:
      "毎月のシフト表づくりに時間がかかる。希望休・必要人数・資格・連勤の上限などの条件を、担当者が手作業で突き合わせている。",
    after:
      "条件を登録すると1か月分のシフト案を自動作成。生成後はドラッグで手直しでき、勤務時間の集計や人件費の概算も確認できる。",
    meta: [
      { label: "対応業種", value: "飲食・介護福祉・小売・クリニック・製造・事務所の6業種サンプルを収録" },
      { label: "特徴", value: "ログイン不要。入力データは原則ブラウザ内にのみ保存されます（AI提案・Excel出力の実行時を除く）。各社の勤務体系に合わせて条件を調整可能" },
      { label: "位置づけ", value: "商談用のデモ。実際の導入時は各社の運用に合わせて設計します" },
    ],
    link: { href: LINKS.shiftKobo, label: "シフト工房を試す（無料）", internal: false },
  },
  {
    tags: ["商談用デモ", "業務ツール化"],
    title: "業務ツールデモスイート",
    subtitle: "Business Tools Demo Suite",
    image: "/images/ss-demosuite.webp",
    before:
      "「業務ツールを作ってもらうと、どんなものができるのか」がイメージしづらく、依頼のハードルが高い。",
    after:
      "問い合わせ管理・日報ダッシュボード・見積/請求の3ツールを1つのデモにまとめ、業種を切り替えると画面全体がその業種向けに変わる。完成イメージを見ながら相談できる。",
    meta: [
      { label: "収録ツール", value: "問い合わせ管理／日報ダッシュボード／見積・請求" },
      { label: "業種切替", value: "製造・建設設備・卸小売の3業種サンプル" },
      { label: "位置づけ", value: "商談用のデモ。「こんな形で作れます」を体験いただくためのものです" },
    ],
    link: { href: LINKS.demoSuite, label: "デモスイートを試す（無料）", internal: false },
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
