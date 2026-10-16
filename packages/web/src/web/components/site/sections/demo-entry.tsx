import { Link } from "wouter";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { LINKS } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

const DEMOS = [
  {
    worry: "月末の確認・照合に時間がかかる",
    name: "月末確認デモ",
    who: "受注一覧と完了一覧を、目視で突き合わせている方",
    experience: "一致・金額不一致・記録不足の一覧と、次の確認先の示し方",
    adjust: "帳票の形式と、照合に使うルール",
    href: "/demo",
    internal: true,
  },
  {
    worry: "シフト作成を楽にしたい",
    name: "シフト工房",
    who: "飲食・介護・小売など、シフト勤務の職場の管理者の方",
    experience: "条件登録から1か月分の自動作成、手直しと勤務時間の集計",
    adjust: "各社の勤務体系と、希望休・人数などの条件",
    href: LINKS.shiftKobo,
    internal: false,
  },
  {
    worry: "問い合わせや案件の状況を整理したい",
    name: "業務ツールデモスイート",
    who: "問い合わせ・日報・見積の情報があちこちに散らばっている方",
    experience: "3つのツールと、業種を切り替えると画面が変わる仕組み",
    adjust: "管理したい項目と、業種に合わせた画面の内容",
    href: LINKS.demoSuite,
    internal: false,
  },
  {
    worry: "AIが自社に合うか分からない",
    name: "AI業務診断ツール",
    who: "AIを使えるかどうか自体を確かめたい方",
    experience: "分岐式の質問への回答で、導入適性をスコアで確認",
    adjust: "診断結果の見方と、次の一手の選び方",
    href: LINKS.shindan,
    internal: false,
  },
] as const;

export function DemoEntry() {
  return (
    <section id="demo" className="border-y border-line bg-washi-deep py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="DEMO"
          title="困りごとから選べる、体験デモ"
          lead="すべて架空データで動く体験用です。登録・資料のアップロードは不要です。実際の導入では、各社の業務に合わせて調整します。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {DEMOS.map((d, i) => (
            <Reveal key={d.name} delay={i * 70}>
              <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
                <h3 className="font-serif text-[1.05rem] font-bold leading-snug text-sumi">
                  {d.worry}
                </h3>
                <p className="mt-1 text-[0.78rem] font-bold tracking-wider text-shu">
                  {d.name}
                  {!d.internal && "（外部サイト）"}
                </p>
                <dl className="mt-4 space-y-2.5">
                  <div className="flex gap-3 text-[0.85rem]">
                    <dt className="w-24 shrink-0 font-bold text-sumi">
                      誰向け
                    </dt>
                    <dd className="jp-body text-sumi-soft">{d.who}</dd>
                  </div>
                  <div className="flex gap-3 text-[0.85rem]">
                    <dt className="w-24 shrink-0 font-bold text-sumi">
                      体験できること
                    </dt>
                    <dd className="jp-body text-sumi-soft">{d.experience}</dd>
                  </div>
                  <div className="flex gap-3 text-[0.85rem]">
                    <dt className="w-24 shrink-0 font-bold text-sumi">
                      導入時に調整
                    </dt>
                    <dd className="jp-body text-sumi-soft">{d.adjust}</dd>
                  </div>
                </dl>
                <div className="mt-auto pt-5">
                  {d.internal ? (
                    <Link
                      href={d.href}
                      onClick={() =>
                        trackEvent("cta_demo", { location: `demo_entry_${d.name}` })
                      }
                      className="inline-flex min-h-[44px] items-center rounded-md bg-shu px-6 py-3 text-[0.88rem] font-bold text-white transition-colors hover:bg-shu-dark"
                    >
                      このデモを試す
                    </Link>
                  ) : (
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("cta_demo", { location: `demo_entry_${d.name}` })
                      }
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-shu px-6 py-3 text-[0.88rem] font-bold text-white transition-colors hover:bg-shu-dark"
                    >
                      このデモを試す
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                  {!d.internal && (
                    <p className="mt-2 text-[0.72rem] text-sumi-soft">
                      外部サイトへ移動します
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <p className="jp-body mx-auto mt-8 max-w-[720px] text-center text-[0.88rem] text-sumi-soft">
            自社の業務でも使えるか知りたい方は、
            <a
              href={LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("cta_booking", { location: "demo_entry" })}
              className="font-bold text-shu underline decoration-shu/40 underline-offset-4 transition-colors hover:text-shu-dark"
            >
              無料相談でお聞かせください
            </a>
            （初回45分・無料）。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
