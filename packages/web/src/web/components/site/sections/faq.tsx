import { useState } from "react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const FAQS = [
  {
    q: "どのような業務を相談できますか？",
    a: "見積・日報・転記・問い合わせ管理など、繰り返しの事務作業がよくある例です。「うちの業務は対象になるか」という確認だけでも、メールや相談でお聞きいただけます。",
  },
  {
    q: "初回相談で何が分かりますか？",
    a: "改善の優先順位と、AIやツールに任せられる範囲を整理します。45分・無料・オンラインです。相談のみでも構いません。",
  },
  {
    q: "費用はどのように決まりますか？",
    a: "対象業務の量と成果物の範囲で決まります。初回相談で条件を確認し、見積を提示します。ここまでは無料です。",
  },
  {
    q: "どこから有料になりますか？",
    a: "有料業務は、内容と費用への合意・契約書類の取り交わしと入金確認後、双方で合意し当方が通知した開始日から着手します。初回相談と見積の提示までは無料です。",
  },
  {
    q: "AIを使わない改善も相談できますか？",
    a: "はい。既存ツールの整理や作業手順の見直しなど、AIを使わない方法も含めて検討します。",
  },
  {
    q: "導入後の修正や保守はどうなりますか？",
    a: "納品時の操作説明と手順書は制作費に含みます。契約不適合に対する無償是正は、合意済みの契約条件に従って対応し、追加の保守・変更とは区別します。追加の保守・変更は、継続契約（月額・任意）または個別合意で対応します。単発の制作・納品だけでもご依頼いただけます。",
  },
  {
    q: "資料や業務情報はどう扱いますか？",
    a: "業務資料の基本保存先はCockpit、副保存先はGoogleドライブです。案件ごとに情報管理票を作成し、実際の保存基盤・アクセス可能者・端末コピー・副保存方式・保持条件・返還削除手順・バックアップの扱いを確認・記録します。別の保存先を使う場合も個別に確認します。保存先の名称だけで権限設定や完全削除を保証しません。秘密情報・個人情報は外部AIへ未加工のまま入力しません。ただし、お客様の事前書面承諾と必要な保護措置の確認がある場合に限り、承諾された範囲で入力します。利用AIはお客様の意向・依頼内容に応じて案件ごとに選び、事業者・サービス・プラン・入力範囲・加工方法・学習利用・保持条件・必要な越境移転対応を情報管理票に記録します。サービス名だけで安全性や非学習を判断せず、未確認のサービス・設定・データ範囲では入力しません。",
  },
  {
    q: "常駐するのですか？",
    a: "常駐はしません。基本はオンライン対応で、必要な場面では内容と地域を確認のうえ訪問します。",
  },
  {
    q: "作ったものは、誰のものになりますか？",
    a: "新規の顧客専用成果物は、その成果物の対価として合意した金額の全額支払いを権利移転の条件とし、別の成果物・別契約の未払額を当然には含めません。成果物内の当方留保の汎用知財は引渡し時から、お客様の業務内で継続利用・改変でき、守秘義務を負う保守委託先と共有できます。この許諾は契約終了後も継続しますが、再販は認めません。第三者知財は許諾可能な範囲とライセンス条件を別途明示します。",
  },
  {
    q: "契約が終わったら、どうなりますか？",
    a: "手順書と確認ルールを残し、社内で回せる状態を目指します。",
  },
] as const;

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="rounded-lg border border-line bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="font-serif text-[0.95rem] font-bold text-shu">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-serif text-[0.95rem] font-bold leading-snug text-sumi sm:text-[1.02rem]">
          {q}
        </span>
        <span
          aria-hidden="true"
          className={`text-[1.2rem] font-light text-shu transition-transform ${open ? "rotate-45" : ""}`}
        >
          ＋
        </span>
      </button>
      {open && (
        <div className="border-t border-line/60 px-5 pb-5 pt-4 sm:px-6">
          <p className="jp-body text-[0.88rem] text-sumi-soft">{a}</p>
        </div>
      )}
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="よくある質問" />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i * 60, 240)}>
              <FaqItem q={f.q} a={f.a} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
