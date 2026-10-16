import { Reveal } from "../reveal";

const MERITS = [
  {
    title: "話の行き違いが減る",
    body: "相談を聞いた本人がそのまま作ります。担当者間の伝言で内容がずれる、ということが起きにくい進め方です。",
  },
  {
    title: "現場に合わせて調整できる",
    body: "作りながら現場の反応を確かめ、その場で直します。出来上がってから「使いにくい」となるリスクを減らします。",
  },
  {
    title: "使い方・引き継ぎまで相談できる",
    body: "納品時に操作説明と手順書をお渡しし、担当者が変わっても回る状態を目指します。",
  },
] as const;

const TATOEBA = [
  { term: "あなたの台所", desc: "いまのExcelや紙の帳票" },
  { term: "食材", desc: "日々たまっているデータ" },
  { term: "置いていくレシピ", desc: "手順書と確認ルール" },
] as const;

export function FdeAbout() {
  return (
    <section id="fde" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <Reveal className="mb-10 sm:mb-12">
          <p className="eyebrow">HOW WE WORK</p>
          <h2 className="mt-3 font-serif text-[1.6rem] font-bold leading-snug text-sumi sm:text-[2rem]">
            聞いた人が、作る。
            <br className="sm:hidden" />
            作った人が、根づかせる。
          </h2>
          <p className="jp-body mt-4 max-w-[720px] text-[0.95rem] text-sumi-soft">
            当事務所では、相談・設計・制作・定着支援を代表が一貫して担当します。
            この進め方が、お客様にとって次の利点になります。
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {MERITS.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <div className="h-full rounded-lg border border-line bg-white p-6 shadow-sm sm:p-7">
                <p className="font-serif text-[1.35rem] font-bold text-shu">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-[1.05rem] font-bold leading-snug text-sumi">
                  {m.title}
                </h3>
                <p className="jp-body mt-3 text-[0.88rem] text-sumi-soft">
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="jp-body mt-6 max-w-[720px] text-[0.85rem] text-sumi-soft">
            納品時の操作説明と手順書の作成は制作費に含まれます。
            継続的な保守・見直しは、月額の継続契約（任意）でお引き受けします。
          </p>
        </Reveal>

        <Reveal delay={160}>
          <details className="group mt-8 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-serif text-[1rem] font-bold text-sumi [&::-webkit-details-marker]:hidden">
              「FDE」という考え方と、たとえ話
              <span
                aria-hidden="true"
                className="text-[1.2rem] font-light text-shu transition-transform group-open:rotate-45"
              >
                ＋
              </span>
            </summary>
            <div className="mt-4 border-t border-line/70 pt-5">
              <p className="jp-body text-[0.9rem] text-sumi-soft">
                FDE（Forward Deployed
                Engineer）は、現場に出向いて課題を解くエンジニアの働き方を指す言葉です。
                当事務所はこの考え方を、中小企業・個人事業主の業務改善に合う形で取り入れています。
              </p>
              <div className="mt-6 rounded-lg border-2 border-shu/30 bg-washi p-6">
                <p className="eyebrow">たとえるなら</p>
                <h3 className="mt-2 font-serif text-[1.05rem] font-bold text-sumi">
                  出張料理人のような仕事の仕方です
                </h3>
                <p className="jp-body mt-3 text-[0.88rem] text-sumi-soft">
                  料理人があなたの台所に行き、ある食材で作り、レシピを置いていくように。
                  新しい道具を押し売りするのではなく、いまの現場に合う形で作り、誰でも回せる状態を残します。
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {TATOEBA.map((t) => (
                    <div
                      key={t.term}
                      className="rounded-md border border-line bg-white px-4 py-3"
                    >
                      <p className="text-[0.78rem] font-bold tracking-wider text-shu">
                        {t.term}
                      </p>
                      <p className="mt-1 text-[0.88rem] font-bold text-sumi">
                        {t.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
