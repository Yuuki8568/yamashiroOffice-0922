import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const STRENGTHS = [
  {
    key: "即実装力",
    title: "動くものをすぐ見せる",
    body: "「試してみたい」をその場で形にします。提案書を渡して終わりにせず、動くものをすぐ見せます。シンプルな業務課題であれば、10〜30分でプロトタイプをお見せできるケースもあります。",
  },
  {
    key: "独自フレームワーク",
    title: "独自の診断ロジック",
    body: "自社にAIが合うかどうか、独自の診断ロジックで約2分で可視化できます。難しい知識は不要で、分岐式の質問に答えるだけです。",
  },
  {
    key: "実践者として",
    title: "自分の事業でもAIを使っている",
    body: "自分のビジネスでもAIを毎日使っています。「使えるか不安」な気持ちは、自分も経験しています。机上の空論ではなく、実運用に基づいた提案をします。",
  },
  {
    key: "Google提供のAI講座",
    title: "Google提供のAI講座 修了証4件",
    body: "Google および Google Cloud が提供するAI関連オンライン講座を4件修了しています（Coursera、2026年3月）。体系的に学んだ知識をベースに提案します。",
    sub: "Google AI Essentials ／ Google AI Specialization ／ Google Prompting Essentials ／ Generative AI Leader（Google Cloud）",
  },
] as const;

export function Strengths() {
  return (
    <section id="strengths" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="STRENGTHS"
          title="支援で大切にしていること"
          lead="AI業務改善を「提案」で終わらせない、実践者としての姿勢です。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {STRENGTHS.map((s, i) => (
            <Reveal key={s.key} delay={i * 80}>
              <div className="flex h-full gap-5 rounded-lg border border-line bg-washi p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-shu font-serif text-[1.05rem] font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif text-[1.08rem] font-bold text-sumi">
                    {s.title}
                  </h3>
                  <p className="jp-body mt-2.5 text-[0.88rem] text-sumi-soft">
                    {s.body}
                  </p>
                  {"sub" in s && s.sub && (
                    <p className="mt-3 rounded bg-washi px-3 py-2 text-[0.75rem] leading-relaxed text-sumi-soft">
                      {s.sub}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
