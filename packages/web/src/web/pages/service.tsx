import { useEffect } from "react";
import { BUSINESS_TERMS } from "../lib/business-terms";
import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import { MobileCta } from "../components/site/mobile-cta";
import { Reveal } from "../components/site/reveal";
import { LINKS } from "../lib/links";
import { trackEvent } from "../lib/analytics";

const TIERS = [
  {
    key: "DEFEND",
    name: "守る・整える段階の支援",
    en: "Defend",
    price: "5.5万〜8.8万円",
    fit: "まず現状を整理したい方、AI利用のルールを決めたい方",
    works: ["業務の棚卸し診断", "AI利用ルールの整備"],
    deliverables: ["棚卸し結果の一覧", "AI利用ルール（文書）"],
    detail:
      "足元の業務を守り、整える段階の支援です。新しい仕組みを作る前に、いまの業務とAI利用の土台を固めます。",
  },
  {
    key: "EXTEND",
    name: "広げる・効率化する段階の支援",
    en: "Extend",
    price: "16.5万〜19.8万円",
    fit: "手間の大きい業務が1つあり、試作で確かめたい方",
    works: ["対象業務の条件確認", "試作の設計・制作", "導入と操作説明"],
    deliverables: ["動く試作", "操作手順"],
    detail:
      "1業務に絞った試作を作り、実際に動かしながら導入する段階の支援です。本番運用に広げる場合は、あらためて見積もります。",
  },
  {
    key: "TRANSFORM",
    name: "業務構造を組み替える段階の支援",
    en: "Transform",
    price: "60.5万〜88万円",
    fit: "複数の業務や部署にまたがる流れを、根本から見直したい方",
    works: ["業務全体の流れの設計", "仕組みの制作・導入", "移行の伴走"],
    deliverables: ["新しい業務フローと仕組み一式", "手順書・確認ルール"],
    detail:
      "業務の進め方そのものを組み替える、構造レベルの転換を伴走する段階の支援です。",
  },
  {
    key: "MONTHLY",
    name: "継続的な運用伴走",
    en: "月額固定",
    price: "8.8万〜11万円",
    fit: "導入後も、使われ続ける状態を保ちたい方",
    works: ["利用状況の確認", "手順書・確認ルールの更新", "定期的な見直し"],
    deliverables: ["更新された手順書", "見直しの記録"],
    detail:
      "納品後の運用を継続して支える、月額の支援です。任意の契約で、単発の制作・納品だけでもご依頼いただけます。",
  },
] as const;

const BOUNDARIES = [
  {
    label: "お受けしない業務・事前確認",
    body: BUSINESS_TERMS.serviceExclusions,
  },
  {
    label: "無料の範囲",
    body: "初回相談（45分）と、条件確認・見積の提示まで。相談のみでも構いません。",
  },
  {
    label: "有料になるのは",
    body: "有料業務は、内容と費用への合意・契約書類の取り交わしと入金確認後、双方で合意し当方が通知した開始日から着手します。初回相談と見積の提示までは無料です。",
  },
  {
    label: "試作と本番運用の違い",
    body: "試作は対象を1業務に絞った小さな仕組みです。本番運用に広げる場合は、範囲と費用をあらためて見積もります。",
  },
  {
    label: "単発と月額の違い",
    body: "単発は制作・納品まで。月額は納品後の運用を継続して支える契約です。",
  },
] as const;

const ASSURANCES = [
  {
    title: "着手前に、費用と納品内容を確認します",
    body: "見積書に費用・成果物・対象外の範囲を明示し、双方で合意してから制作に入ります。",
  },
  {
    title: "修正・保守の範囲を、始める前に決めます",
    body: "納品時の操作説明は制作費に含みます。契約不適合に対する無償是正は、合意済みの契約条件に従って対応し、追加の保守・変更とは区別します。追加の保守・変更は、月額の継続契約（任意）または個別合意で対応します。",
  },
  {
    title: "情報の取り扱いを、事前に確認します",
    body: "お預かりする資料の保存場所・閲覧者・外部AIへの送り方を、契約の前に説明し、取り決めます。",
  },
  {
    title: "納品後の連絡方法を明確にします",
    body: "納品後の問い合わせ先と対応の枠組みを、契約書類に明記します。",
  },
] as const;

const PHASES = [
  {
    step: "01",
    title: "受注前〜契約締結",
    theme: "リスクを遮断し、着手条件を明確化",
    documents: ["NDA", "見積書", "発注請書", "業務委託契約書", "免責事項"],
    body: "NDA・見積書・発注請書・業務委託契約書・免責事項の5文書で合意します。秘密保持、生成AI出力（ハルシネーション等）の免責と責任範囲、支援内容・前払い条件の明示（フリーランス保護法第3条準拠）を、制作に入る前に取り決めます。",
  },
  {
    step: "02",
    title: "特約・覚書",
    theme: "AI利用と個人情報取扱の厳格化",
    documents: ["AI特約", "DPA"],
    body: "秘密情報・個人情報は外部AIへ未加工のまま入力しません。ただし、お客様の事前書面承諾と必要な保護措置の確認がある場合に限り、承諾された範囲で入力します。利用AIはお客様の意向・依頼内容に応じて案件ごとに選び、事業者・サービス・プラン・入力範囲・加工方法・学習利用・保持条件・必要な越境移転対応を情報管理票に記録します。サービス名だけで安全性や非学習を判断せず、未確認のサービス・設定・データ範囲では入力しません。",
  },
  {
    step: "03",
    title: "履行〜完了",
    theme: "成果物の納品・検収と取引完了",
    documents: ["検収書", "業務完了報告書"],
    body: "検収書（みなし検収14日適用）と業務完了報告書で、成果物の検収と取引を完了させます。",
  },
] as const;

const WE_DO = [
  "業務の聞き取りと整理",
  "試作の設計・制作",
  "手順書・確認ルールの作成",
  "導入後の確認と見直し",
] as const;

const PLEASE = [
  "社内窓口となる方の決定",
  "現行の帳票・手順など資料の共有",
  "試作の確認とフィードバック",
] as const;

export default function Service() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "サービスと料金｜山代業務改善事務所";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "段階別の料金目安（税込（消費税10%））、各段階で受け取れるもの、無料と有料の境界、契約前に確認できる安心材料を公開しています。",
      );
  }, []);

  return (
    <div className="min-h-screen bg-washi">
      <SiteHeader />
      <main className="pb-20 pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">SERVICE & PRICE</p>
            <h1 className="mt-3 font-serif text-[1.6rem] font-bold leading-snug text-sumi sm:text-[2rem]">
              サービスと料金
            </h1>
            <p className="jp-body mt-4 max-w-[720px] text-[0.95rem] text-sumi-soft">
              段階別の料金目安と、各段階で受け取れるもの、契約前に確認できることを公開しています。
              すべてのメニューの入口は、初回相談（45分・無料・オンライン）です。
            </p>
          </Reveal>

          {/* 段階別料金目安 */}
          <Reveal>
            <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-serif text-[1.25rem] font-bold text-sumi sm:text-[1.4rem]">
                段階別の料金目安
              </h2>
              <p className="text-[0.8rem] font-bold tracking-wider text-shu">
                いずれも税込（消費税10%）・目安
              </p>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {TIERS.map((t, i) => (
              <Reveal key={t.key} delay={i * 60}>
                <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm">
                  <p className="text-[0.72rem] font-bold tracking-[0.18em] text-shu">
                    {t.en}
                  </p>
                  <h3 className="mt-1.5 font-serif text-[1.08rem] font-bold leading-snug text-sumi">
                    {t.name}
                  </h3>
                  <p className="mt-3 font-serif text-[1.35rem] font-bold leading-tight text-shu">
                    {t.price}
                  </p>
                  <p className="jp-body mt-3 text-[0.84rem] text-sumi-soft">
                    {t.detail}
                  </p>
                  <div className="mt-4 space-y-3 border-t border-line/70 pt-4">
                    <div>
                      <p className="text-[0.72rem] font-bold tracking-[0.18em] text-sumi-soft">
                        向いている状況
                      </p>
                      <p className="jp-body mt-1 text-[0.85rem] text-sumi">
                        {t.fit}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.72rem] font-bold tracking-[0.18em] text-sumi-soft">
                        主な作業
                      </p>
                      <ul className="mt-1 space-y-1">
                        {t.works.map((w) => (
                          <li
                            key={w}
                            className="jp-body flex gap-2 text-[0.84rem] text-sumi-soft"
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
                        {t.deliverables.map((d) => (
                          <li
                            key={d}
                            className="rounded border border-line bg-washi px-2.5 py-1 text-[0.72rem] text-sumi-soft"
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
              <h2 className="font-serif text-[1.1rem] font-bold text-sumi">
                無料と有料の境界を、はっきりさせています
              </h2>
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

          {/* 契約前に確認できること */}
          <Reveal>
            <div className="mt-14">
              <h2 className="font-serif text-[1.25rem] font-bold text-sumi sm:text-[1.4rem]">
                契約の前に、必ず確認できること
              </h2>
              <p className="jp-body mt-3 max-w-[760px] text-[0.9rem] text-sumi-soft">
                契約書類を用意しているだけでなく、始める前に次の4点を双方で確認してから進めます。
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {ASSURANCES.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-lg border border-line bg-white p-6 shadow-sm"
                  >
                    <h3 className="font-serif text-[0.98rem] font-bold leading-snug text-sumi">
                      {a.title}
                    </h3>
                    <p className="jp-body mt-2.5 text-[0.85rem] text-sumi-soft">
                      {a.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 詳細：契約書類の流れ（折りたたみ） */}
          <Reveal>
            <details className="group mt-10 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-serif text-[1.05rem] font-bold text-sumi [&::-webkit-details-marker]:hidden">
                詳しく見る：契約書類と3段階の流れ（9文書）
                <span
                  aria-hidden="true"
                  className="text-[1.2rem] font-light text-shu transition-transform group-open:rotate-45"
                >
                  ＋
                </span>
              </summary>
              <div className="mt-4 space-y-5 border-t border-line/70 pt-5">
                <p className="jp-body text-[0.88rem] text-sumi-soft">
                  受注前から完了まで、3つの段階で9つの書類を取り交わします。
                  書類の有無ではなく、内容の確認と合意を重ねることを目的にしています。
                </p>
                {PHASES.map((ph) => (
                  <div
                    key={ph.step}
                    className="rounded-lg border border-line bg-washi p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <p className="font-serif text-[1.2rem] font-bold text-shu">
                        {ph.step}
                      </p>
                      <h3 className="font-serif text-[1rem] font-bold text-sumi">
                        {ph.title}
                      </h3>
                      <p className="text-[0.8rem] font-bold text-sumi-soft">
                        {ph.theme}
                      </p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ph.documents.map((d) => (
                        <span
                          key={d}
                          className="rounded-md border border-shu/40 bg-white px-3 py-1.5 text-[0.8rem] font-bold text-sumi"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                    <p className="jp-body mt-3 text-[0.85rem] text-sumi-soft">
                      {ph.body}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </Reveal>

          {/* 詳細：A/F比率（折りたたみ） */}
          <Reveal>
            <details className="group mt-5 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-serif text-[1.05rem] font-bold text-sumi [&::-webkit-details-marker]:hidden">
                詳しく見る：料金の妥当性の考え方（A/F比率）
                <span
                  aria-hidden="true"
                  className="text-[1.2rem] font-light text-shu transition-transform group-open:rotate-45"
                >
                  ＋
                </span>
              </summary>
              <div className="mt-4 border-t border-line/70 pt-5">
                <p className="jp-body max-w-[760px] text-[0.9rem] text-sumi-soft">
                  見積の妥当性は、継続価値に基づいて評価します。お客様がほかの手段（自社での対応・既製ツールの導入など）で同じ成果を得る場合の最良代替費用（A）と、当事務所の料金（F）を比較し、AがFの1.5倍以上になることを価格設定の目安としています。見積の提示時に、この根拠をあわせてご説明します。
                </p>
                <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1 rounded-md border border-line bg-washi p-4 text-center">
                    <p className="text-[0.75rem] font-bold tracking-wider text-shu">
                      顧客の最良代替費用（A）
                    </p>
                    <p className="jp-body mt-1 text-[0.8rem] text-sumi-soft">
                      ほかの手段で同じ成果を得る費用
                    </p>
                  </div>
                  <p
                    aria-hidden="true"
                    className="text-center font-serif text-[1.1rem] font-bold text-sumi"
                  >
                    ≧ 1.5 ×
                  </p>
                  <div className="flex-1 rounded-md border border-shu/40 bg-shu/5 p-4 text-center">
                    <p className="text-[0.75rem] font-bold tracking-wider text-shu">
                      料金（F）
                    </p>
                    <p className="jp-body mt-1 text-[0.8rem] text-sumi-soft">
                      当事務所へのお支払い
                    </p>
                  </div>
                </div>
                <p className="jp-body mt-4 text-[0.78rem] leading-relaxed text-sumi-soft">
                  ※これは当事務所内部の価格設定の目安です。代替費用の試算は目安であり、成果を保証するものではありません。
                </p>
              </div>
            </details>
          </Reveal>

          {/* 役割分担 */}
          <Reveal delay={120}>
            <div className="mt-12 grid gap-5 rounded-lg border border-line bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
              <div>
                <h2 className="font-serif text-[1.02rem] font-bold text-sumi">
                  当事務所がやること
                </h2>
                <ul className="mt-3 space-y-2">
                  {WE_DO.map((x) => (
                    <li
                      key={x}
                      className="jp-body flex gap-2 text-[0.88rem] text-sumi-soft"
                    >
                      <span aria-hidden="true" className="text-shu">
                        ―
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-[1.02rem] font-bold text-sumi">
                  お願いすること
                </h2>
                <ul className="mt-3 space-y-2">
                  {PLEASE.map((x) => (
                    <li
                      key={x}
                      className="jp-body flex gap-2 text-[0.88rem] text-sumi-soft"
                    >
                      <span aria-hidden="true" className="text-shu">
                        ―
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-10 text-center">
              <p className="font-hand text-[1.05rem] text-[#2a3f95]">
                まず45分、いちばん手間な業務を聞かせてください。
              </p>
              <a
                href={LINKS.booking}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("cta_booking", { location: "service_page" })
                }
                className="mt-4 inline-block min-h-[44px] rounded-md bg-shu px-8 py-3.5 text-[0.95rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark"
              >
                無料相談を予約する
              </a>
              <p className="mt-3 text-[0.78rem] text-sumi-soft">
                Googleカレンダーの予約ページへ移動します
              </p>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
      <MobileCta />
    </div>
  );
}
