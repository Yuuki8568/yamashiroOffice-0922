import { useState } from "react";
import { Reveal } from "../reveal";

const QA = [
  {
    q: "相談資料はどこに保存され、誰が見ますか？",
    a: "業務資料の基本保存先はCockpit、副保存先はGoogleドライブです。案件ごとに情報管理票を作成し、実際の保存基盤・アクセス可能者・端末コピー・副保存方式・保持条件・返還削除手順・バックアップの扱いを確認・記録します。別の保存先を使う場合も個別に確認します。保存先の名称だけで権限設定や完全削除を保証しません。",
  },
  {
    q: "外部AIへ情報を送る場合の取り扱いは？",
    a: "秘密情報・個人情報は外部AIへ未加工のまま入力しません。ただし、お客様の事前書面承諾と必要な保護措置の確認がある場合に限り、承諾された範囲で入力します。利用AIはお客様の意向・依頼内容に応じて案件ごとに選び、事業者・サービス・プラン・入力範囲・加工方法・学習利用・保持条件・必要な越境移転対応を情報管理票に記録します。サービス名だけで安全性や非学習を判断せず、未確認のサービス・設定・データ範囲では入力しません。",
  },
  {
    q: "サンプル・匿名化データで確認できる範囲は？",
    a: "公開しているデモは架空データで動作します。実際の業務データを使った検証は、契約後の条件確認フェーズで個別に対応します。",
  },
  {
    q: "契約終了後のデータの取り扱いは？",
    a: "返却・削除などの取り扱いは、ご契約時に取り決めます。ご希望がある場合は、初回相談の時点でお聞かせください。",
  },
  {
    q: "契約書類は整っていますか？",
    a: "NDA（秘密保持契約）・見積書・発注請書・業務委託契約書・免責事項・AI特約・DPA（データ処理契約）・検収書・業務完了報告書の9文書を整備しています。制作に入る前に、内容を双方で確認・合意してから進めます。詳細は「サービスと料金」ページに記載しています。",
  },
] as const;

const DETAIL_CONTENT = {
  title: "自社ツールで71項目のセキュリティ検証を実施",
  lead: "自社業務管理ツール「Consulting Cockpit」に対し、基本的な動作確認に加えて、侵入を想定した試験（未認証・認証済みの両面）を実施しました。見つかった15件の弱点はすべて修正し、同じ手口で再試験して効果を確認しています。これは当方自身による検証であり、第三者機関による監査・認証ではありません。",
  facts: {
    label: "実施した試験",
    value: "71",
    unit: "項目",
    note: "第1次検証38項目＋侵入試験33項目（未認証14／認証済み9／修正後の再検証10）",
  },
  contents: [
    {
      title: "暗号の中身",
      items: [
        "AES-GCM 256bit（鍵は取り出し不可の設定）",
        "PBKDF2-SHA256 600,000回・塩32バイト",
        "200回の暗号化で初期化ベクトルの重複0件",
        "1ビットの改ざんで復号が失敗することを確認",
      ],
    },
    {
      title: "侵入を想定した試験",
      items: [
        "サインインなしでの全20手続きの呼び出し（すべて拒否）",
        "セッション偽造5パターン（すべて拒否）",
        "合言葉の当てずっぽう（回数制限で遮断）",
        "見知らぬサイトからの呼び出し（接続元の名簿で拒否）",
      ],
    },
    {
      title: "設計上の守り",
      items: [
        "パスフレーズはサーバーに送らず保存もしない",
        "サーバー側に復号処理が存在しない",
        "操作の記録はハッシュで連鎖し、書き換え・抜き取りを検知",
        "許可したメールアドレス以外はアカウントを作れない",
      ],
    },
  ],
  footer: "「データを守る設計」は最初から組み込む——これはコンサルとして提案するだけでなく、自分自身のツールで実践していることです。自分で作り、自分でテストし、弱点を直し、自分で使い続けている。だからこそ、クライアントに対しても地に足のついたセキュリティ提案ができると考えています。",
} as const;

export function Security() {
  const [open, setOpen] = useState(false);

  return (
    <section id="security" className="bg-sumi py-16 text-white sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <Reveal className="mb-10">
          <p className="eyebrow">SECURITY & DATA</p>
          <h2 className="mt-3 font-serif text-[1.6rem] font-bold leading-snug sm:text-[2rem]">
            情報の取り扱いについて
          </h2>
          <p className="jp-body mt-3 max-w-[720px] text-[0.95rem] text-white/70">
            相談・見積の段階から、お預かりする情報の取り扱いを明確にしています。
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {QA.map((item, i) => (
            <Reveal key={item.q} delay={i * 70}>
              <div className="h-full rounded-lg border border-white/15 bg-white/5 p-6">
                <h3 className="font-serif text-[0.98rem] font-bold leading-snug">
                  {item.q}
                </h3>
                <p className="jp-body mt-3 text-[0.85rem] leading-relaxed text-white/80">
                  {item.a}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="rounded-md border border-white/30 px-6 py-3 text-[0.88rem] font-bold text-white transition-colors hover:border-white/60"
            >
              自社ツールの検証詳細（71項目）を{open ? "閉じる" : "見る"}
            </button>
          </div>
        </Reveal>

        {open && (
          <div className="mt-10 rounded-lg border border-white/15 bg-white/5 p-6 sm:p-8">
            <h3 className="font-serif text-[1.15rem] font-bold">
              {DETAIL_CONTENT.title}
            </h3>
            <p className="jp-body mt-3 max-w-[720px] text-[0.9rem] leading-relaxed text-white/70">
              {DETAIL_CONTENT.lead}
            </p>

            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-[420px] rounded-lg border border-white/15 bg-white/5 p-6 text-center">
                <p className="text-[0.78rem] font-bold tracking-wider text-white/60">
                  {DETAIL_CONTENT.facts.label}
                </p>
                <p className="mt-2 font-serif text-[3rem] font-bold leading-none text-white">
                  {DETAIL_CONTENT.facts.value}
                  <span className="ml-1 text-[1.1rem] text-white/60">
                    {DETAIL_CONTENT.facts.unit}
                  </span>
                </p>
                <p className="jp-body mt-3 text-[0.78rem] leading-relaxed text-white/60">
                  {DETAIL_CONTENT.facts.note}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {DETAIL_CONTENT.contents.map((c) => (
                <div
                  key={c.title}
                  className="h-full rounded-lg border border-white/15 bg-white/5 p-6"
                >
                  <h4 className="font-serif text-[1rem] font-bold">
                    {c.title}
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-[0.82rem] text-white/80"
                      >
                        <span aria-hidden="true" style={{ color: "#E8836F" }}>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="jp-body mx-auto mt-8 max-w-[720px] text-center text-[0.86rem] text-white/70">
              {DETAIL_CONTENT.footer}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
