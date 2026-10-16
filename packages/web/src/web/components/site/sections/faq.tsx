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
    a: "初回相談と見積の提示までは無料です。内容と費用に合意し、契約書類を取り交わした後の設計・制作から有料になります。支払い条件は契約書類に明示します。",
  },
  {
    q: "AIを使わない改善も相談できますか？",
    a: "はい。既存ツールの整理や作業手順の見直しなど、AIを使わない方法も含めて検討します。",
  },
  {
    q: "導入後の修正や保守はどうなりますか？",
    a: "納品時の操作説明と手順書は制作費に含みます。納品後の保守・修正は、継続契約（月額・任意）または個別合意で対応します。単発の制作・納品だけでもご依頼いただけます。",
  },
  {
    q: "資料や業務情報はどう扱いますか？",
    a: "相談資料はパスワード等で保護したクラウドに保存し、閲覧は代表のみです。外部AIへは未加工のまま送らず、仮名化・マスキングを行います。契約終了後の取り扱いは、ご契約時に取り決めます。",
  },
  {
    q: "常駐するのですか？",
    a: "常駐はしません。基本はオンライン対応で、必要な場面では内容と地域を確認のうえ訪問します。",
  },
  {
    q: "作ったものは、誰のものになりますか？",
    a: "権利の取り扱いは個別契約書に明記します。納品後もお客様が継続して使える形を前提に、契約時にご確認いただけます。",
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
