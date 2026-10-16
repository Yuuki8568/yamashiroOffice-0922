import { useState } from "react";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { LINKS } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

const QUESTIONS = [
  "同じ業務を、毎月くり返している",
  "紙やExcelの転記・照合が多い",
  "市販ツールやAIを試したが、現場で定着しなかった",
] as const;

type Answer = boolean | null;

export function FitCheck() {
  const [answers, setAnswers] = useState<Answer[]>([null, null, null]);
  const [sent, setSent] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const yesCount = answers.filter((a) => a === true).length;
  const fit = yesCount >= 2;

  function answer(i: number, v: boolean) {
    const next = answers.map((a, j) => (j === i ? v : a));
    setAnswers(next);
    if (next.every((a) => a !== null) && !sent) {
      setSent(true);
      trackEvent("fit_result", {
        result: next.filter((a) => a === true).length >= 2 ? "fde" : "off_the_shelf",
      });
    }
  }

  return (
    <section id="fit-check" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="FIT CHECK"
          title="その業務、FDEが必要？"
          lead="3つの質問で、合うやり方を確かめます。合わない場合は、その旨を正直にお伝えします。"
        />

        <Reveal>
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
            <ol className="space-y-5">
              {QUESTIONS.map((q, i) => (
                <li key={q}>
                  <p className="text-[0.92rem] font-bold text-sumi">
                    <span className="mr-2 font-serif text-shu">Q{i + 1}</span>
                    {q}
                  </p>
                  <div className="mt-2 flex gap-2">
                    {[
                      { label: "はい", value: true },
                      { label: "いいえ", value: false },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        aria-pressed={answers[i] === opt.value}
                        onClick={() => answer(i, opt.value)}
                        className={`min-h-[44px] min-w-[88px] rounded-md border px-4 py-2 text-[0.88rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu ${
                          answers[i] === opt.value
                            ? "border-shu bg-shu text-white"
                            : "border-line bg-washi text-sumi-soft hover:border-shu/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ol>

            {allAnswered && (
              <div className="mt-8 rounded-md border border-line bg-washi p-5 text-center">
                {fit ? (
                  <>
                    <p className="font-serif text-[1.1rem] font-bold text-sumi">
                      FDE向きです
                    </p>
                    <p className="jp-body mt-2 text-[0.88rem] text-sumi-soft">
                      くり返しの業務があり、定着に課題がある状況は、話を聞いて作るやり方と相性がよい場面です。
                    </p>
                    <a
                      href={LINKS.booking}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("cta_booking", { location: "fit_check" })
                      }
                      className="mt-4 inline-block min-h-[44px] rounded-md bg-shu px-8 py-3.5 text-[0.95rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark"
                    >
                      無料相談を予約する
                    </a>
                  </>
                ) : (
                  <>
                    <p className="font-serif text-[1.1rem] font-bold text-sumi">
                      市販のツールで足りるかもしれません
                    </p>
                    <p className="jp-body mt-2 text-[0.88rem] text-sumi-soft">
                      いまの回答内容なら、既成ツールの活用や手順の見直しが先かもしれません。判断に迷う場合は、相談で一緒に整理できます。
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
