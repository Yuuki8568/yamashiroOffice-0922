import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const SERVICES = [
  {
    no: "01",
    title: "AI導入支援",
    sub: "診断から導入計画まで",
    body: "業務の棚卸しと独自の診断ロジックで「どの業務にAIを使うと、どう楽になるか」を整理し、無理のない導入計画に落とし込みます。ツールありきではなく、業務ありきで考えます。",
    tags: ["業務の棚卸し", "AI適性診断", "導入計画づくり"],
  },
  {
    no: "02",
    title: "事務ワークフローのツール化",
    sub: "繰り返し作業を、動く仕組みに",
    body: "見積書・日報・シフト表・顧客メール・議事録・データ転記など、事務系の繰り返し作業の流れをそのままAIツールに落とし込みます。提案書ではなく、実際に動くものをお渡しします。",
    tags: ["書類・メール作成の仕組み化", "シフト作成", "業務アプリ開発", "既存ツールとの連携"],
  },
  {
    no: "03",
    title: "保守管理つき伴走支援",
    sub: "つくって終わりにしない",
    body: "導入したツールの保守管理を引き受けながら、現場に定着するまで運用に伴走します。業務の変化に合わせて仕組みを直し続けられるのが、一人で全工程を担う事務所の強みです。",
    tags: ["保守・運用管理", "定着サポート", "継続的な改善"],
  },
] as const;

export function Services() {
  return (
    <section id="services" className="border-y border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="SERVICES"
          title="支援内容 ── 3つの柱"
          lead="AIの導入から、事務ワークフローのツール化、導入後の保守管理まで。一気通貫でお引き受けします。"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={i * 90}>
              <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
                <p className="font-serif text-[1.35rem] font-bold text-shu">
                  {s.no}
                </p>
                <h3 className="mt-3 font-serif text-[1.1rem] font-bold leading-snug text-sumi">
                  {s.title}
                </h3>
                <p className="mt-1 text-[0.78rem] font-bold tracking-wide text-shu">
                  {s.sub}
                </p>
                <p className="jp-body mt-3 text-[0.88rem] text-sumi-soft">
                  {s.body}
                </p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-line bg-washi px-2.5 py-1 text-[0.72rem] text-sumi-soft"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="jp-body mx-auto mt-10 max-w-[720px] text-center text-[0.85rem] text-sumi-soft">
            「診断だけ」「ツール化だけ」の部分的なご依頼も可能です。
            費用は業務内容と規模によって変わるため、ヒアリングのうえお見積りします。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
