import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";

const WORRIES = [
  {
    title: "何から始めればいいか分からない",
    body: "「AIを使えと言われるけれど、自社のどの業務に効くのか見当がつかない」——まずは業務の棚卸しから一緒に整理します。",
  },
  {
    title: "人手が足りず、日々の業務で手一杯",
    body: "見積書、日報、顧客メール、議事録……。繰り返しの書きもの仕事こそ、AIに任せられる領域です。",
  },
  {
    title: "AIは大企業向けの話だと思っている",
    body: "むしろ逆です。人手が限られる中小企業や個人事業主こそ、小さく・速く始められるAI業務改善の恩恵が大きいと考えています。",
  },
] as const;

export function Worries() {
  return (
    <section id="worries" className="bg-washi-deep py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="WORRIES"
          title="こんなお悩みはありませんか？"
          lead="ひとつでも当てはまれば、ご相談いただく価値があります。AIの知識はまったく不要です。"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {WORRIES.map((w, i) => (
            <Reveal key={w.title} delay={i * 90}>
              <div className="h-full rounded-lg border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <p className="font-serif text-[1.35rem] font-bold text-shu">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-[1.05rem] font-bold leading-snug text-sumi">
                  {w.title}
                </h3>
                <p className="jp-body mt-3 text-[0.88rem] text-sumi-soft">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
