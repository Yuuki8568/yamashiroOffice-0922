import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { OFFICE } from "../../../lib/links";

const PRINCIPLES = [
  "「AIを導入したい」でも「何から始めればいいか分からない」という経営者の声を起点にしています。",
  "難しい技術の話ではなく、「今の業務がどう変わるか」を具体的に見せることを大切にしています。",
  "提案書を渡して終わりにしません。実際に動くものを作り、使い続けられるまで伴走します。",
  "自分のビジネスでもAIを毎日使っているから、「現場で使えるか」の判断ができます。",
] as const;

export function Profile() {
  return (
    <section id="profile" className="bg-washi-deep py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading eyebrow="PROFILE" title="代表紹介" />
        <div className="grid gap-10 md:grid-cols-[300px_1fr]">
          <Reveal>
            <div className="rounded-lg border border-line bg-white p-6 text-center shadow-sm">
              <img
                src="/images/profile-1x.webp"
                alt={`代表 ${OFFICE.owner}`}
                width={180}
                height={180}
                loading="lazy"
                className="mx-auto rounded-full border border-line object-cover"
              />
              <h3 className="mt-4 font-serif text-[1.2rem] font-bold text-sumi">
                {OFFICE.owner}
              </h3>
              <p className="text-[0.75rem] tracking-[0.15em] text-sumi-soft">
                {OFFICE.ownerKana}
              </p>
              <p className="mt-2 text-[0.82rem] text-sumi-soft">
                {OFFICE.name} 代表
              </p>
              <div className="mt-4 rounded-md border border-line bg-white px-4 py-5">
                <img
                  src="/images/g-general-2026-5.png"
                  alt="JDLA Deep Learning for GENERAL 2026#5 合格ロゴ"
                  width={1200}
                  height={731}
                  loading="lazy"
                  className="mx-auto h-14 w-auto"
                />
                <p className="mt-4 text-[0.75rem] font-bold leading-snug text-sumi">
                  JDLA Deep Learning for GENERAL
                  <br />
                  2026#5 合格
                </p>
                <p className="mt-1 text-[0.68rem] text-sumi-soft">
                  一般社団法人ディープラーニング協会 主催
                </p>
              </div>
              <div className="mt-3 rounded-md border border-shu/25 bg-shu/5 px-3 py-2.5">
                <p className="text-[0.75rem] font-bold text-shu">
                  Google提供のAI講座 修了証4件
                </p>
                <p className="mt-0.5 text-[0.68rem] text-sumi-soft">
                  Coursera 発行 · 2026年3月修了
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <blockquote className="rounded-lg border-l-4 border-shu bg-white p-6 shadow-sm sm:p-7">
                <p className="jp-body font-serif text-[1.02rem] font-semibold text-sumi">
                  「AIコンサルとして提案するだけでなく、自分の事業でもAIを実運用する実践者でありたいと考えています」
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={100}>
              <p className="jp-body mt-6 text-[0.92rem] text-sumi-soft">
                自身の事業運営でも、顧客対応や日々の業務フローをAIツールで効率化しています。
                コンサルティングで提案する手法は、まず自分の事業で試し、実際に使い続けているものです。
              </p>
            </Reveal>
            <Reveal delay={160}>
              <h3 className="mt-8 font-serif text-[1.05rem] font-bold text-sumi">
                仕事で大切にしている4つのこと
              </h3>
              <ol className="mt-4 space-y-3">
                {PRINCIPLES.map((p, i) => (
                  <li
                    key={p}
                    className="flex gap-4 rounded-lg border border-line bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-shu font-serif text-[0.85rem] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="jp-body text-[0.88rem] text-sumi-soft">{p}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
