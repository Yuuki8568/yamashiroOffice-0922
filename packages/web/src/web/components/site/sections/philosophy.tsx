import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const SANPO = [
  {
    key: "買い手良し",
    who: "相談いただく方へ",
    body: "費用と導入の負担に見合う価値があるかを、一緒に考えます。「本当に必要か」「既存の仕組みでも解決できるか」から確認し、新しく作らない結論も提案します。",
  },
  {
    key: "売り手良し",
    who: "当事務所として",
    body: "適正な対価と工数で、責任を持てる範囲を決めます。無理のある支援は続かないため、お互いに続けられる条件を見積の段階で明確にします。",
  },
  {
    key: "世間良し",
    who: "現場と取引先へ",
    body: "改善によって誰かに作業を押し付けたり、誤りを増やしたりしないかまで確かめます。「担当者が休んでも仕事が回る」「取引先の二重入力が減る」ような、身近な良い変化を目指します。",
  },
] as const;

const PRACTICES = [
  {
    title: "必要な改善から始める",
    body: "現状維持、手順の見直し、既存ツールの活用、新規制作を比較し、必要なものだけを選びます。",
  },
  {
    title: "使う人の負担まで確かめる",
    body: "経営者の期待だけでなく、実際に使う担当者の入力・確認・学習の負担を聞き取ります。",
  },
  {
    title: "お互いに続けられる範囲を決める",
    body: "費用、納期、修正、保守、準備していただくことを、始める前に明確にします。",
  },
] as const;

export function Philosophy() {
  return (
    <section id="philosophy" className="border-y border-line bg-washi-deep py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="PHILOSOPHY"
          title="三方良しの考え方"
          lead="仕事の困りごとを整理し、人と事業に無理のない、使える仕組みへ。近江商人に伝わる「買い手良し・売り手良し・世間良し」を、業務改善の進め方に取り入れています。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {SANPO.map((s, i) => (
            <Reveal key={s.key} delay={i * 80}>
              <div className="h-full rounded-lg border border-line bg-washi p-6 shadow-sm sm:p-7">
                <p className="eyebrow">{s.who}</p>
                <h3 className="mt-2 font-serif text-[1.15rem] font-bold text-sumi">
                  {s.key}
                </h3>
                <p className="jp-body mt-3 text-[0.88rem] text-sumi-soft">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-serif text-[1.05rem] font-bold text-sumi">
              現場で大切にしている、3つの進め方
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {PRACTICES.map((p, i) => (
                <div key={p.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-shu font-serif text-[0.8rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[0.9rem] font-bold text-sumi">
                      {p.title}
                    </p>
                    <p className="jp-body mt-1.5 text-[0.82rem] text-sumi-soft">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
