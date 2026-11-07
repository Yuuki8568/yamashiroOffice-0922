import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { LINKS } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

const PLANS = [
  {
    name: "守る・整える段階の支援",
    sub: "Defend（防御）",
    price: "5.5万〜8.8万円（税込（消費税10%））",
    fit: "まず現状を整理したい方、AI利用のルールを決めたい方",
    works: ["業務の棚卸し診断", "AI利用ルールの整備"],
    deliverables: ["棚卸し結果の一覧", "AI利用ルール（文書）"],
  },
  {
    name: "広げる・効率化する段階の支援",
    sub: "Extend（拡張）",
    price: "16.5万〜19.8万円（税込（消費税10%））",
    fit: "手間の大きい業務が1つあり、試作で確かめたい方",
    works: ["対象業務の条件確認", "試作の設計・制作", "導入と操作説明"],
    deliverables: ["動く試作", "操作手順"],
  },
  {
    name: "業務構造を組み替える段階の支援",
    sub: "Transform（転換）",
    price: "60.5万〜88万円（税込（消費税10%））",
    fit: "複数の業務や部署にまたがる流れを、根本から見直したい方",
    works: ["業務全体の流れの設計", "仕組みの制作・導入", "移行の伴走"],
    deliverables: ["新しい業務フローと仕組み一式", "手順書・確認ルール"],
  },
  {
    name: "継続的な運用伴走",
    sub: "月額固定（任意）",
    price: "8.8万〜11万円（税込（消費税10%））",
    fit: "導入後も、使われ続ける状態を保ちたい方",
    works: ["利用状況の確認", "手順書・確認ルールの更新", "定期的な見直し"],
    deliverables: ["更新された手順書", "見直しの記録"],
  },
] as const;

const BOUNDARIES = [
  {
    label: "無料の範囲",
    body: "初回相談（45分）と、条件確認・見積の提示まで。相談のみでも構いません。",
  },
  {
    label: "有料になるのは",
    body: "内容と費用に合意し、契約書類を取り交わした後の設計・制作からです。",
  },
  {
    label: "試作と本番運用の違い",
    body: "試作は対象を1業務に絞った小さな仕組みです。本番運用に広げる場合は、範囲と費用をあらためて見積もります。",
  },
  {
    label: "単発と月額の違い",
    body: "単発は制作・納品まで。月額は納品後の運用を継続して支える契約で、どちらか一方だけでも選べます。",
  },
] as const;

const FACTORS = [
  {
    title: "対象となる業務の量と複雑さ",
    body: "1種類の帳票だけを扱うか、複数の帳票や部署にまたがるかで、作業量が変わります。",
  },
  {
    title: "成果物の範囲",
    body: "入力用フォームだけか、帳票テンプレートや操作手順まで含めるか。仕上げるものの量で変わります。",
  },
  {
    title: "外部ツール・サービスとの連携",
    body: "既存の会計ソフトや表計算ツールとつなぐ必要があるかどうか。外部サービスの利用料は、初期費用とは別に発生する場合があります。",
  },
  {
    title: "継続・保守契約の有無",
    body: "制作して納品するだけか、その後の保守・運用支援も含めるか。継続契約（月額）は任意で、単発の制作・納品だけでもご依頼いただけます。",
  },
] as const;

const ESTIMATE_FLOW = [
  {
    step: "1",
    title: "初回無料相談（45分）",
    body: "一番手間に感じている作業を1つお聞きし、改善の優先順位を整理します。",
  },
  {
    step: "2",
    title: "対象業務・条件の確認",
    body: "元データの形式や件数、使う人、外部連携の有無など、見積に必要な条件を確認します。",
  },
  {
    step: "3",
    title: "提案・見積の提示",
    body: "成果物、費用、納期、対象外の範囲を明示してお出しします。ここまでは無料です。",
  },
  {
    step: "4",
    title: "合意後に制作へ",
    body: "内容と費用にご納得いただいてから、設計・制作を始めます。",
  },
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="PRICING"
          title="費用は、対象業務と必要な対応範囲で決まります"
          lead="すべてのメニューの入口は、初回相談（45分・無料・オンライン）です。おおまかなプランと料金の目安（税込（消費税10%））は以下の通りです。料金は業務の量や成果物の範囲で変わるため、確認のうえ個別にお見積りします。"
        />

        <Reveal>
          <div className="rounded-lg border border-shu/40 bg-washi p-5 text-center shadow-sm sm:p-6">
            <p className="text-[0.8rem] font-bold tracking-wider text-shu">
              初回相談（45分・オンライン）
            </p>
            <p className="mt-1.5 font-serif text-[1.5rem] font-bold text-sumi">
              0円
              <span className="ml-2 text-[0.85rem] font-normal text-sumi-soft">
                無料・見積の提示まで
              </span>
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div className="flex h-full flex-col rounded-lg border border-line bg-washi p-6 shadow-sm">
                <p className="text-[0.72rem] font-bold tracking-[0.18em] text-shu">
                  {p.sub}
                </p>
                <h3 className="mt-1.5 font-serif text-[1.05rem] font-bold leading-snug text-sumi">
                  {p.name}
                </h3>
                <p className="mt-3 font-serif text-[1.3rem] font-bold leading-tight text-shu">
                  {p.price}
                </p>
                <div className="mt-4 space-y-3 border-t border-line/70 pt-4">
                  <div>
                    <p className="text-[0.72rem] font-bold tracking-[0.18em] text-sumi-soft">
                      向いている状況
                    </p>
                    <p className="jp-body mt-1 text-[0.85rem] text-sumi">
                      {p.fit}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-bold tracking-[0.18em] text-sumi-soft">
                      主な作業
                    </p>
                    <ul className="mt-1 space-y-1">
                      {p.works.map((w) => (
                        <li
                          key={w}
                          className="jp-body flex gap-2 text-[0.85rem] text-sumi-soft"
                        >
                          <span aria-hidden="true" className="text-shu">
                            ―
                          </span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-bold tracking-[0.18em] text-sumi-soft">
                      納品物の例
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {p.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded border border-line bg-white px-2.5 py-1 text-[0.72rem] text-sumi-soft"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="jp-body mt-5 space-y-1.5 rounded-md border border-line bg-washi-deep px-4 py-3 text-[0.82rem] leading-relaxed text-sumi-soft">
            <p>
              ※金額はいずれも目安で、税込（消費税10%）表示です。対象業務の量と成果物の範囲を確認のうえ、個別にお見積りします。見積の提示までは無料です。
            </p>
            <p>
              ※期間の目安・納品後の修正の範囲・外部サービスの利用料など別途発生し得る費用・対象外となる作業は、見積書に明示してご確認いただきます。
            </p>
          </div>
        </Reveal>

        {/* 無料と有料の境界 */}
        <Reveal>
          <div className="mt-10 rounded-lg border border-shu/30 bg-shu/5 p-6 sm:p-8">
            <h3 className="font-serif text-[1.05rem] font-bold text-sumi">
              無料と有料の境界を、はっきりさせています
            </h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {BOUNDARIES.map((b) => (
                <div
                  key={b.label}
                  className="rounded-md border border-line bg-white p-4"
                >
                  <dt className="text-[0.8rem] font-bold tracking-wider text-shu">
                    {b.label}
                  </dt>
                  <dd className="jp-body mt-1.5 text-[0.85rem] text-sumi-soft">
                    {b.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="mt-14 font-serif text-[1.1rem] font-bold text-sumi">
            費用が変わる、4つの要因
          </h3>
        </Reveal>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {FACTORS.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="h-full rounded-lg border border-line bg-washi p-6 shadow-sm">
                <h3 className="font-serif text-[1rem] font-bold text-sumi">
                  {f.title}
                </h3>
                <p className="jp-body mt-2.5 text-[0.86rem] text-sumi-soft">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-lg border border-line bg-washi-deep p-6 sm:p-8">
            <h3 className="font-serif text-[1.1rem] font-bold text-sumi">
              見積までの流れ
            </h3>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ESTIMATE_FLOW.map((s) => (
                <li key={s.step} className="relative">
                  <p className="font-serif text-[1.35rem] font-bold text-shu">
                    {s.step}
                  </p>
                  <h4 className="mt-2 font-serif text-[0.95rem] font-bold text-sumi">
                    {s.title}
                  </h4>
                  <p className="jp-body mt-2 text-[0.82rem] text-sumi-soft">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
            <p className="jp-body mt-6 text-center text-[0.82rem] text-sumi-soft">
              段階ごとの詳しい説明と契約書類の流れは、
              <a
                href="/service"
                className="font-bold text-shu underline decoration-shu/40 underline-offset-4 transition-colors hover:text-shu-dark"
              >
                サービスと料金
              </a>
              のページでご確認いただけます。
            </p>
            <div className="mt-8 text-center">
              <a
                href={LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_booking", { location: "pricing" })}
                className="inline-block rounded-md bg-shu px-8 py-3.5 text-[0.95rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark"
              >
                見積の相談を始める（無料）
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
