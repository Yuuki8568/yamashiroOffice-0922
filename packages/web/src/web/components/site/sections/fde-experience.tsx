import { useEffect, useRef, useState } from "react";
import { Reveal } from "../reveal";
import { LINKS } from "../../../lib/links";
import { trackEvent } from "../../../lib/analytics";

type WorkKey = "mitsumori" | "nippo" | "tenki" | "toiawase";

const WORKS: Record<
  WorkKey,
  {
    label: string;
    reask: string;
    sampleIn: string;
    columns: string[];
    rows: string[][];
  }
> = {
  mitsumori: {
    label: "見積書づくり",
    reask:
      "見積のもとになる情報は、メモ・メール・電話のどれで届きますか？",
    sampleIn: "打ち合わせメモ（棚 W900×2台、取付込み、来週中に希望、色は白）",
    columns: ["品目", "数量", "備考"],
    rows: [
      ["棚 W900", "2台", "取付込み・色は白"],
      ["—", "—", "納期：来週中に希望"],
    ],
  },
  nippo: {
    label: "日報のとりまとめ",
    reask: "日報は、紙・LINE・Excelのどれで集まっていますか？",
    sampleIn: "2人分の日報（配線完了／脚立のガタつき／搬入遅れ）",
    columns: ["日付", "現場", "要対応"],
    rows: [
      ["9/30", "A現場", "脚立のガタつき"],
      ["9/30", "B現場", "搬入遅れ（配線は完了）"],
    ],
  },
  tenki: {
    label: "請求書の転記",
    reask: "請求書は、紙・PDF・メールのどれで届きますか？",
    sampleIn: "請求書の文面（サンプル商事、9/30、¥33,000、期限10/31）",
    columns: ["取引先", "請求日", "金額", "支払期限"],
    rows: [["サンプル商事", "9/30", "¥33,000", "10/31"]],
  },
  toiawase: {
    label: "問い合わせへの返信",
    reask: "よく届く質問は、どんな内容が多いですか？",
    sampleIn: "予約変更の問い合わせ（17時から18時へ）",
    columns: ["分類", "返信の下書き"],
    rows: [
      ["予約変更", "「18時への変更を承りました。当日お待ちしています」"],
    ],
  },
};

const HOURS = [5, 10, 20, 40] as const;
const RATES = [
  { label: "3割", value: 0.3 },
  { label: "5割", value: 0.5 },
  { label: "7割", value: 0.7 },
] as const;

const CONFIRM_ITEMS = [
  "手順書を受け取った",
  "確認ルールを決めた",
  "担当者が操作を試した",
  "1か月後の見直し日を決めた",
] as const;

const STEPS = ["聞く", "作る", "根づかせる"] as const;

export function FdeExperience() {
  const [step, setStep] = useState(0);
  const [work, setWork] = useState<WorkKey | null>(null);
  const [hours, setHours] = useState<number | null>(null);
  const [demo, setDemo] = useState<"idle" | "running" | "done">("idle");
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false]);
  const [rate, setRate] = useState(0.5);
  const [stamped, setStamped] = useState(false);
  const startedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allChecked = checks.every(Boolean);
  const w = work ? WORKS[work] : null;

  useEffect(() => {
    if (allChecked && !stamped) {
      timerRef.current = setTimeout(() => {
        setStamped(true);
        trackEvent("taiken_stamp", {
          work: work ?? "",
          hours: hours ?? 0,
        });
      }, 500);
    }
    if (!allChecked && stamped) {
      setStamped(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allChecked]);

  function selectWork(key: WorkKey) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("taiken_start", { work: key });
    }
    if (work !== key) {
      setWork(key);
      setDemo("idle"); // 選び直すと試作結果は消える
    }
  }

  function goStep(next: number) {
    if (next === 1 && step === 0) {
      trackEvent("taiken_step2", { work: work ?? "" });
    }
    setStep(next);
  }

  function runDemo() {
    if (demo === "running") return;
    setDemo("running");
    trackEvent("taiken_demo", { work: work ?? "" });
    setTimeout(() => setDemo("done"), 1100);
  }

  const monthly = hours !== null ? Math.round(hours * rate * 10) / 10 : null;
  const yearly = hours !== null ? Math.round(hours * rate * 12) : null;

  return (
    <section
      id="fde-experience"
      className="border-y border-line bg-washi-deep py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[840px] px-4 sm:px-6">
        <Reveal className="mb-10">
          <p className="eyebrow">TRY FDE</p>
          <h2 className="mt-3 font-serif text-[1.6rem] font-bold leading-snug text-sumi sm:text-[2rem]">
            FDEの仕事を、1分で体験する
          </h2>
          <p className="jp-body mt-3 max-w-[680px] text-[0.95rem] text-sumi-soft">
            相談から定着までの流れを、依頼票に沿って体験できます。
          </p>
          <p className="mt-3 rounded bg-white px-3 py-2 text-[0.78rem] leading-relaxed text-sumi-soft">
            ※体験版のため、サンプルデータで動きを再現しています。入力内容の送信や、AIの実処理は行いません。
          </p>
        </Reveal>

        {/* 依頼票 */}
        <div className="rounded-md border-2 border-shu/40 bg-white shadow-sm">
          {/* ステップタブ */}
          <div
            role="tablist"
            aria-label="体験のステップ"
            className="flex border-b-2 border-shu/40"
          >
            {STEPS.map((s, i) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={step === i}
                onClick={() => goStep(i)}
                className={`min-h-[44px] flex-1 px-2 py-3 text-center font-serif text-[0.85rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu sm:text-[0.95rem] ${
                  step === i
                    ? "bg-shu text-white"
                    : "text-sumi-soft hover:bg-washi"
                }`}
              >
                {i + 1} {s}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-8">
            {/* STEP 1 聞く */}
            {step === 0 && (
              <div role="tabpanel" aria-label="聞く">
                <p className="text-[0.8rem] font-bold tracking-wider text-shu">
                  問1　気になっている業務はどれですか？
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(Object.keys(WORKS) as WorkKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={work === key}
                      onClick={() => selectWork(key)}
                      className={`min-h-[44px] rounded-md border px-3 py-3 text-[0.88rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu ${
                        work === key
                          ? "border-shu bg-shu/10 text-sumi"
                          : "border-line bg-washi text-sumi-soft hover:border-shu/50"
                      }`}
                    >
                      {WORKS[key].label}
                    </button>
                  ))}
                </div>

                <p className="mt-6 text-[0.8rem] font-bold tracking-wider text-shu">
                  問2　その業務に、月にどのくらい時間を使っていますか？
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {HOURS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      aria-pressed={hours === h}
                      onClick={() => setHours(h)}
                      className={`min-h-[44px] min-w-[72px] rounded-md border px-4 py-2 text-[0.88rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu ${
                        hours === h
                          ? "border-shu bg-shu/10 text-sumi"
                          : "border-line bg-washi text-sumi-soft hover:border-shu/50"
                      }`}
                    >
                      {h}時間
                    </button>
                  ))}
                </div>

                {(work || hours !== null) && (
                  <p className="mt-6 rounded-md border border-dashed border-shu/40 bg-washi px-4 py-3 text-[0.9rem] text-sumi">
                    <span className="text-[0.75rem] font-bold tracking-wider text-sumi-soft">
                      記入内容　
                    </span>
                    <span className="font-hand text-[#2a3f95]">
                      {work ? WORKS[work].label : "（業務未選択）"}
                      ・月
                      {hours !== null ? `${hours}時間` : "（時間未選択）"}
                    </span>
                  </p>
                )}

                <div className="mt-8 text-right">
                  <button
                    type="button"
                    onClick={() => goStep(1)}
                    disabled={!work || hours === null}
                    className="min-h-[44px] rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    作る へ進む
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 作る */}
            {step === 1 && w && (
              <div role="tabpanel" aria-label="作る">
                <p className="text-[0.8rem] font-bold tracking-wider text-shu">
                  聞き直し（相談では、この質問で本当の課題を確かめます）
                </p>
                <p className="mt-3 rounded-md border border-dashed border-shu/40 bg-washi px-4 py-3 font-hand text-[0.95rem] leading-relaxed text-[#2a3f95]">
                  {w.reask}
                </p>

                <p className="mt-6 text-[0.8rem] font-bold tracking-wider text-shu">
                  届いたもの（サンプル）
                </p>
                <p className="jp-body mt-2 rounded-md border border-line bg-white px-4 py-3 text-[0.85rem] text-sumi-soft">
                  {w.sampleIn}
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={runDemo}
                    disabled={demo === "running"}
                    className="min-h-[44px] rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark disabled:opacity-50"
                  >
                    {demo === "running" ? "読み取り中…" : "試作を動かす"}
                  </button>
                </div>

                {demo === "done" && (
                  <div className="mt-6">
                    <p className="text-[0.8rem] font-bold tracking-wider text-shu">
                      整理された結果
                    </p>
                    <div className="mt-2 overflow-x-auto rounded-md border border-line">
                      <table className="w-full min-w-[320px] border-collapse text-[0.85rem]">
                        <thead>
                          <tr className="bg-washi">
                            {w.columns.map((c) => (
                              <th
                                key={c}
                                className="border-b border-line px-3 py-2 text-left font-bold text-sumi"
                              >
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {w.rows.map((row, ri) => (
                            <tr key={ri}>
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className="border-b border-line/60 px-3 py-2 text-sumi-soft"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => goStep(0)}
                    className="min-h-[44px] rounded-md border border-line bg-white px-5 py-2.5 text-[0.85rem] font-bold text-sumi-soft transition-colors hover:border-shu/50"
                  >
                    聞く に戻る
                  </button>
                  <button
                    type="button"
                    onClick={() => goStep(2)}
                    disabled={demo !== "done"}
                    className="min-h-[44px] rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    根づかせる へ進む
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 根づかせる */}
            {step === 2 && (
              <div role="tabpanel" aria-label="根づかせる">
                <p className="text-[0.8rem] font-bold tracking-wider text-shu">
                  定着の確認（タップして確認してください）
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {CONFIRM_ITEMS.map((c, i) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={checks[i]}
                      onClick={() =>
                        setChecks((prev) =>
                          prev.map((v, j) => (j === i ? !v : v)),
                        )
                      }
                      className={`flex min-h-[44px] items-center gap-3 rounded-md border px-4 py-3 text-left text-[0.85rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu ${
                        checks[i]
                          ? "border-shu bg-shu/10 text-sumi"
                          : "border-line bg-washi text-sumi-soft hover:border-shu/50"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[0.75rem] ${
                          checks[i]
                            ? "border-shu bg-shu text-white"
                            : "border-line bg-white"
                        }`}
                      >
                        {checks[i] ? "✓" : ""}
                      </span>
                      {c}
                    </button>
                  ))}
                </div>

                {/* 判子 */}
                <div className="mt-6 flex min-h-[72px] items-center justify-end">
                  {stamped && (
                    <div
                      className="motion-safe:animate-[stamp_0.5s_ease-out] flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c23b2b] font-serif text-[0.8rem] font-bold text-[#c23b2b]"
                      role="status"
                    >
                      確認済
                    </div>
                  )}
                </div>

                {/* 試算 */}
                <div className="mt-2 rounded-md border border-line bg-washi p-5">
                  <p className="text-[0.8rem] font-bold tracking-wider text-shu">
                    削減率を選ぶと、浮く時間を試算できます
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {RATES.map((r) => (
                      <button
                        key={r.label}
                        type="button"
                        aria-pressed={rate === r.value}
                        onClick={() => setRate(r.value)}
                        className={`min-h-[44px] rounded-md border px-4 py-2 text-[0.85rem] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu ${
                          rate === r.value
                            ? "border-shu bg-shu/10 text-sumi"
                            : "border-line bg-white text-sumi-soft hover:border-shu/50"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                  {monthly !== null && yearly !== null && (
                    <div className="mt-4">
                      <p className="text-[0.95rem] text-sumi">
                        月{" "}
                        <mark className="bg-[#ffeb85] px-1 font-serif text-[1.15rem] font-bold">
                          {monthly}時間
                        </mark>
                        　年間{" "}
                        <mark className="bg-[#ffeb85] px-1 font-serif text-[1.15rem] font-bold">
                          {yearly}時間
                        </mark>
                      </p>
                      <p className="mt-2 text-[0.75rem] leading-relaxed text-sumi-soft">
                        ※試算であり、成果を保証するものではありません。
                      </p>
                    </div>
                  )}
                </div>

                <p className="mt-8 text-center font-hand text-[1.05rem] text-[#2a3f95]">
                  まず45分、いちばん手間な業務を聞かせてください。
                </p>
                <div className="mt-4 text-center">
                  <a
                    href={LINKS.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("cta_booking", { location: "fde_experience" })
                    }
                    className="inline-block min-h-[44px] rounded-md bg-shu px-8 py-3.5 text-[0.95rem] font-bold text-white shadow-sm transition-colors hover:bg-shu-dark"
                  >
                    無料相談を予約する
                  </a>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => goStep(1)}
                    className="min-h-[44px] rounded-md border border-line bg-white px-5 py-2.5 text-[0.85rem] font-bold text-sumi-soft transition-colors hover:border-shu/50"
                  >
                    作る に戻る
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
