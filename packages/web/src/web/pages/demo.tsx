import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import { Reveal } from "../components/site/reveal";
import { LINKS, OFFICE } from "../lib/links";
import { trackEvent } from "../lib/analytics";
import {
  reconcile,
  buildMemo,
  yen,
  SAMPLE_ORDERS,
  SAMPLE_COMPLETIONS,
  WORRY_OPTIONS,
  PLACE_OPTIONS,
  ASSIGNEE_OPTIONS,
  type CaseResult,
  type MemoAnswers,
} from "../lib/demo-logic";

type Scenario = "normal" | "unavailable" | "handover";

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: "normal", label: "通常の照合" },
  { id: "unavailable", label: "データが届かない場合" },
  { id: "handover", label: "担当者へ引き継ぐ場合" },
];

const STATUS_STYLE: Record<
  CaseResult["kind"],
  { label: string; className: string }
> = {
  candidate: {
    label: "請求候補・人の確認待ち",
    className: "border-shu/40 bg-shu/5 text-shu",
  },
  mismatch: {
    label: "金額不一致",
    className: "border-[#e8836f]/50 bg-[#e8836f]/10 text-[#9c4632]",
  },
  "no-record": {
    label: "完了記録の確認待ち",
    className: "border-line bg-washi-deep text-sumi",
  },
};

function FictionNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[0.75rem] text-sumi-soft ${className}`}>
      ※ 架空データによる機能説明です。実績の紹介ではありません。
    </p>
  );
}

function PageHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[1.4rem] font-bold leading-snug text-sumi sm:text-[1.7rem]">
        {title}
      </h2>
      {lead && (
        <p className="jp-body mt-3 max-w-[680px] text-[0.92rem] text-sumi-soft">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

export default function Demo() {
  const [started, setStarted] = useState(false);
  const [scenario, setScenario] = useState<Scenario>("normal");
  const resultRef = useRef<HTMLDivElement>(null);

  const result = useMemo(
    () =>
      reconcile(
        SAMPLE_ORDERS,
        scenario === "unavailable" ? null : SAMPLE_COMPLETIONS,
      ),
    [scenario],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `体験デモ（月末の確認作業）｜${OFFICE.name}`;
  }, []);

  const startDemo = () => {
    setStarted(true);
    setScenario("normal");
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  return (
    <div className="min-h-screen bg-washi">
      <SiteHeader />
      <main className="pt-16">
        {/* ヒーロー */}
        <section className="border-b border-line bg-washi px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1080px]">
            <Reveal>
              <p className="eyebrow">DEMO</p>
              <h1 className="mt-3 font-serif text-[1.8rem] font-bold leading-snug text-sumi sm:text-[2.3rem]">
                月末の確認作業を、サンプルで体験
              </h1>
              <p className="jp-body mt-4 max-w-[700px] text-[0.95rem] leading-relaxed text-sumi-soft">
                受注した一覧と、完了した一覧が別々にある。請求の準備の前に、どれを・誰が・何を確認するか。
                このページでは、架空のサンプルデータを使って、仕事の整理の進め方と「どこから先は人が判断するか」の境界を体験できます。
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["架空データを使用", "登録・資料のアップロード不要", "ブラウザ内だけで動作"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-white px-3 py-1 text-[0.75rem] text-sumi-soft"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
              <p className="jp-body mt-5 max-w-[700px] text-[0.82rem] leading-relaxed text-sumi-soft">
                このデモの照合は、決まったルールだけで動いています。AIがリアルタイムで判断するものではありません。
                自由記述の整理などにAIを使う実際の支援とは、分けて説明しています。
              </p>

              {/* 図解：入力 → 照合 → 人の確認 */}
              <div
                className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
                aria-label="処理の流れ：入力、照合、人の確認"
              >
                {[
                  { title: "入力", body: "受注一覧と完了一覧" },
                  { title: "照合", body: "決まったルールで突き合わせ" },
                  { title: "人の確認", body: "確認する人と事項を提示" },
                ].map((s, i) => (
                  <div key={s.title} className="flex items-center gap-2 sm:flex-1">
                    <div className="flex-1 rounded-lg border border-line bg-white px-4 py-3 text-center">
                      <p className="text-[0.85rem] font-bold text-sumi">{s.title}</p>
                      <p className="mt-0.5 text-[0.72rem] text-sumi-soft">{s.body}</p>
                    </div>
                    {i < 2 && (
                      <span aria-hidden="true" className="hidden text-shu sm:inline">
                        →
                      </span>
                    )}
                    {i < 2 && (
                      <span aria-hidden="true" className="self-center text-shu sm:hidden">
                        ↓
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <FictionNote className="mt-4" />
            </Reveal>
          </div>
        </section>

        {/* STEP 1：元の情報 */}
        <section className="border-b border-line bg-white px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <PageHeading
              eyebrow="STEP 1"
              title="まず、元の情報を見ます"
              lead="Web制作・受託開発のように、複数人で案件を進める法人向けサービスの場面を想定した架空のサンプルです。"
            />

            <div className="grid gap-6 lg:grid-cols-2">
              {/* 受注一覧 */}
              <Reveal>
                <div className="rounded-lg border border-line bg-washi p-5 sm:p-6">
                  <h3 className="text-[0.95rem] font-bold text-sumi">受注一覧</h3>
                  <div className="mt-3 hidden overflow-x-auto md:block">
                    <table className="w-full border-collapse text-[0.83rem]">
                      <thead>
                        <tr>
                          {["案件ID", "架空の案件名", "受注金額", "確認担当"].map((h) => (
                            <th
                              key={h}
                              className="border border-line bg-washi-deep px-3 py-2 text-left font-bold text-sumi"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {SAMPLE_ORDERS.map((o) => (
                          <tr key={o.id}>
                            <td className="border border-line bg-white px-3 py-2 text-sumi-soft">
                              {o.id}
                            </td>
                            <td className="border border-line bg-white px-3 py-2 text-sumi-soft">
                              {o.name}
                            </td>
                            <td className="border border-line bg-white px-3 py-2 text-right text-sumi-soft">
                              {yen(o.amount!)}
                            </td>
                            <td className="border border-line bg-white px-3 py-2 text-sumi-soft">
                              {o.owner}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className="mt-3 space-y-2 md:hidden">
                    {SAMPLE_ORDERS.map((o) => (
                      <li key={o.id} className="rounded-md border border-line bg-white p-3">
                        <p className="text-[0.82rem] font-bold text-sumi">
                          {o.id}｜{o.name}
                        </p>
                        <p className="mt-1 text-[0.78rem] text-sumi-soft">
                          受注金額 {yen(o.amount!)}／確認担当 {o.owner}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* 完了一覧 */}
              <Reveal delay={90}>
                <div className="rounded-lg border border-line bg-washi p-5 sm:p-6">
                  <h3 className="text-[0.95rem] font-bold text-sumi">完了一覧</h3>
                  <div className="mt-3 hidden overflow-x-auto md:block">
                    <table className="w-full border-collapse text-[0.83rem]">
                      <thead>
                        <tr>
                          {["案件ID", "記録された完了金額", "記録状態"].map((h) => (
                            <th
                              key={h}
                              className="border border-line bg-washi-deep px-3 py-2 text-left font-bold text-sumi"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {SAMPLE_COMPLETIONS.map((c) => (
                          <tr key={c.id}>
                            <td className="border border-line bg-white px-3 py-2 text-sumi-soft">
                              {c.id}
                            </td>
                            <td className="border border-line bg-white px-3 py-2 text-right text-sumi-soft">
                              {yen(c.amount!)}
                            </td>
                            <td className="border border-line bg-white px-3 py-2 text-sumi-soft">
                              完了の記録あり
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className="mt-3 space-y-2 md:hidden">
                    {SAMPLE_COMPLETIONS.map((c) => (
                      <li key={c.id} className="rounded-md border border-line bg-white p-3">
                        <p className="text-[0.82rem] font-bold text-sumi">{c.id}</p>
                        <p className="mt-1 text-[0.78rem] text-sumi-soft">
                          完了金額 {yen(c.amount!)}／完了の記録あり
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <p className="jp-body mt-4 text-[0.78rem] text-sumi-soft">
                金額はすべて架空の照合用の数値です。料金・売上の実績ではありません。税計算は行いません。
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent("demo_run", { scenario });
                    startDemo();
                  }}
                  className="rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark"
                >
                  情報を照合する
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STEP 2：結果 */}
        {started && (
          <section className="border-b border-line bg-washi px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-[1080px]">
              <PageHeading
                eyebrow="STEP 2"
                title="結果は「次にすること」まで示します"
              />

              {/* シナリオ切り替え */}
              <div
                role="group"
                aria-label="シナリオの切り替え"
                className="flex flex-wrap gap-2"
              >
                {SCENARIOS.map((s) => {
                  const active = scenario === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setScenario(s.id)}
                      className={`rounded-md border px-4 py-2 text-[0.82rem] font-bold transition-colors ${
                        active
                          ? "border-shu bg-shu text-white"
                          : "border-line bg-white text-sumi hover:bg-washi"
                      }`}
                    >
                      {s.label}
                      {active && <span className="sr-only">（選択中）</span>}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[0.75rem] text-sumi-soft" aria-live="polite">
                表示中のシナリオ：
                {SCENARIOS.find((s) => s.id === scenario)?.label}
              </p>

              <div
                ref={resultRef}
                tabIndex={-1}
                aria-live="polite"
                className="mt-6 outline-none"
              >
                {result.status === "unavailable" ? (
                  <UnavailableView />
                ) : scenario === "handover" ? (
                  <HandoverView />
                ) : (
                  <>
                    <div className="grid gap-4 md:grid-cols-3">
                      {result.results.map((r) => {
                        const st = STATUS_STYLE[r.kind];
                        return (
                          <div
                            key={r.id}
                            className="rounded-lg border border-line bg-white p-5"
                          >
                            <p className="text-[0.78rem] font-bold text-sumi">{r.id}</p>
                            <p
                              className={`mt-2 inline-block rounded border px-2.5 py-1 text-[0.75rem] font-bold ${st.className}`}
                            >
                              {st.label}
                            </p>
                            <dl className="mt-3 space-y-2 text-[0.8rem]">
                              <div>
                                <dt className="font-bold text-sumi">根拠</dt>
                                <dd className="jp-body mt-0.5 text-sumi-soft">
                                  {r.reason}
                                  {r.kind === "mismatch" && r.diff !== undefined && (
                                    <>
                                      <br />
                                      差額は{yen(Math.abs(r.diff))}です。
                                    </>
                                  )}
                                </dd>
                              </div>
                              <div>
                                <dt className="font-bold text-sumi">確認先</dt>
                                <dd className="mt-0.5 text-sumi-soft">{r.owner}</dd>
                              </div>
                              <div>
                                <dt className="font-bold text-sumi">次の行動</dt>
                                <dd className="jp-body mt-0.5 text-sumi-soft">{r.next}</dd>
                              </div>
                            </dl>
                          </div>
                        );
                      })}
                    </div>

                    {result.holds.length > 0 && (
                      <div className="mt-5 rounded-lg border border-line bg-white p-5">
                        <p className="text-[0.85rem] font-bold text-sumi">
                          保留したデータ（照合せず、結果にも混ぜていません）
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.8rem] text-sumi-soft">
                          {result.holds.map((h, i) => (
                            <li key={`${h.id}-${i}`}>
                              {h.where === "order" ? "受注一覧" : "完了一覧"}の{h.id}
                              ：{h.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="jp-body mt-4 text-[0.8rem] leading-relaxed text-sumi-soft">
                      「請求候補」は、人が確認する候補という意味です。請求可能性の確定や、会計上の判断ではありません。
                      請求の確定・対外への送信・振込・会計の判断は、このデモでは行いません。
                    </p>
                    <FictionNote className="mt-2" />
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        <MemoSection />
        <ConsultCta started={started} />
      </main>
      <SiteFooter />
    </div>
  );
}

/* データが届かない場合 */
function UnavailableView() {
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-line bg-white p-6">
        <p className="inline-block rounded border border-line bg-washi-deep px-2.5 py-1 text-[0.75rem] font-bold text-sumi">
          照合未実施
        </p>
        <p className="jp-body mt-3 text-[0.88rem] leading-relaxed text-sumi">
          完了一覧を取得できなかったため、対象範囲を確認できません。
        </p>
        <p className="jp-body mt-2 text-[0.82rem] leading-relaxed text-sumi-soft">
          前に表示した結果を、今回の有効な結果として残すことはしません。
          このデモで「止める」とは、照合と候補の表示を止めることです。実際のシステムの停止や復旧を示すものではありません。
        </p>
      </div>

      <div className="rounded-lg border border-line bg-white p-6">
        <h3 className="text-[0.95rem] font-bold text-sumi">
          その場合の手作業の進め方（簡略した手順）
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.85rem] text-sumi-soft">
          <li>原資料の取得先を確認する</li>
          <li>受注IDごとに原資料と突き合わせる</li>
          <li>不明な案件は保留にする</li>
          <li>担当者が判断する</li>
        </ol>
        <p className="jp-body mt-3 text-[0.78rem] leading-relaxed text-sumi-soft">
          実際の業務で期限内に実行できるかは、件数や資料の状態によって変わります。別途の検証が必要です。
        </p>
      </div>
    </div>
  );
}

/* 担当者へ引き継ぐ場合 */
function HandoverView() {
  const blocks = [
    {
      title: "データ項目",
      body: "受注一覧：案件ID・案件名・受注金額・確認担当。完了一覧：案件ID・記録された完了金額。",
    },
    {
      title: "公開サンプルの判定条件",
      body: "IDと金額が一致し完了記録がある → 請求候補・人の確認待ち。金額が一致しない → 金額不一致。完了記録がない → 完了記録の確認待ち。",
    },
    {
      title: "確認担当",
      body: "受注一覧の「確認担当」欄に従います（サンプルでは営業担当・案件担当・作業担当）。",
    },
    {
      title: "未処理一覧",
      body: "照合できなかったデータは結果に混ぜず、保留として一覧に残して担当者へ渡します。",
    },
    {
      title: "手作業への戻し方",
      body: "原資料の取得先を確認 → 受注IDごとに原資料と突合 → 不明な案件は保留 → 担当者が判断、の順に戻せます。",
    },
  ];
  return (
    <div className="rounded-lg border border-line bg-white p-6">
      <h3 className="text-[0.95rem] font-bold text-sumi">
        担当者へ引き継ぐときの手順見本
      </h3>
      <p className="jp-body mt-2 text-[0.82rem] leading-relaxed text-sumi-soft">
        引き継ぎでは、次の5点をまとめて渡します。以下は公開サンプルをもとにした見本です。
      </p>
      <dl className="mt-4 space-y-4">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-md border border-line bg-washi p-4">
            <dt className="text-[0.85rem] font-bold text-sumi">{b.title}</dt>
            <dd className="jp-body mt-1 text-[0.8rem] leading-relaxed text-sumi-soft">
              {b.body}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* 確認メモ */
function MemoSection() {
  const [worries, setWorries] = useState<string[]>([]);
  const [places, setPlaces] = useState<string[]>([]);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "ok" | "ng">("idle");
  const [saveState, setSaveState] = useState<"idle" | "ng">("idle");
  const memoRef = useRef<HTMLPreElement>(null);
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  // 複数選択で「未確認」は他の回答と同時に選べない
  const toggleMulti = (
    code: string,
    list: string[],
    setter: (v: string[]) => void,
    unknownCode: string,
  ) => {
    if (list.includes(code)) {
      setter(list.filter((c) => c !== code));
    } else if (code === unknownCode) {
      setter([unknownCode]);
    } else {
      setter([...list.filter((c) => c !== unknownCode), code]);
    }
  };

  const generate = () => {
    const answers: MemoAnswers = { worries, places, assignee };
    const today = new Date().toLocaleDateString("sv-SE");
    setMemo(buildMemo(answers, today));
    setCopyState("idle");
    setSaveState("idle");
    requestAnimationFrame(() => memoRef.current?.focus());
  };

  const reset = () => {
    setWorries([]);
    setPlaces([]);
    setAssignee(null);
    setMemo(null);
    setCopyState("idle");
    setSaveState("idle");
  };

  const copy = async () => {
    if (!memo) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("unsupported");
      await navigator.clipboard.writeText(memo);
      setCopyState("ok");
    } catch {
      setCopyState("ng");
      requestAnimationFrame(() => fallbackRef.current?.select());
    }
  };

  const save = () => {
    if (!memo) return;
    try {
      const a = document.createElement("a");
      if (!("download" in a)) throw new Error("unsupported");
      const blob = new Blob([memo], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = "consultation-memo.md";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setSaveState("ng");
    }
  };

  return (
    <section className="border-b border-line bg-white px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-[1080px]">
        <PageHeading
          eyebrow="STEP 3"
          title="あなたの会社なら、どこを確認できると助かりますか？"
          lead="デモを完了しなくても使えます。選択式の回答だけで、相談の準備に使える確認メモを作れます。名前・会社名・メールアドレス・取引先・実際の金額・秘密情報は入力しないでください。"
        />

        <div className="space-y-8">
          <fieldset>
            <legend className="text-[0.9rem] font-bold text-sumi">
              1. 困りごと（複数選択できます）
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {WORRY_OPTIONS.map((o) => (
                <label
                  key={o.code}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-washi px-3 py-2 text-[0.82rem] text-sumi transition-colors has-checked:border-shu has-checked:bg-shu/5"
                >
                  <input
                    type="checkbox"
                    checked={worries.includes(o.code)}
                    onChange={() => toggleMulti(o.code, worries, setWorries, "W9")}
                    className="accent-[#0e7490]"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.9rem] font-bold text-sumi">
              2. 現在の管理場所（複数選択できます）
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLACE_OPTIONS.map((o) => (
                <label
                  key={o.code}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-washi px-3 py-2 text-[0.82rem] text-sumi transition-colors has-checked:border-shu has-checked:bg-shu/5"
                >
                  <input
                    type="checkbox"
                    checked={places.includes(o.code)}
                    onChange={() => toggleMulti(o.code, places, setPlaces, "P9")}
                    className="accent-[#0e7490]"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.9rem] font-bold text-sumi">
              3. 最終確認をする担当者
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {ASSIGNEE_OPTIONS.map((o) => (
                <label
                  key={o.code}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-washi px-3 py-2 text-[0.82rem] text-sumi transition-colors has-checked:border-shu has-checked:bg-shu/5"
                >
                  <input
                    type="radio"
                    name="assignee"
                    checked={assignee === o.code}
                    onChange={() => setAssignee(o.code)}
                    className="accent-[#0e7490]"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={generate}
              className="rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark"
            >
              確認メモを作る
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-md border border-line bg-white px-5 py-3 text-[0.85rem] font-bold text-sumi transition-colors hover:bg-washi"
            >
              選択をリセット
            </button>
            <p className="text-[0.75rem] text-sumi-soft">
              分からない項目は「未確認」を選べます。未選択の項目は「未確認」として扱います。
            </p>
          </div>

          {memo && (
            <div className="rounded-lg border border-line bg-washi p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[0.95rem] font-bold text-sumi">
                  自社で確認したいことメモ（相談準備用）
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-md border border-line bg-white px-4 py-2 text-[0.8rem] font-bold text-sumi transition-colors hover:bg-washi-deep"
                  >
                    コピー
                  </button>
                  <button
                    type="button"
                    onClick={save}
                    className="rounded-md border border-line bg-white px-4 py-2 text-[0.8rem] font-bold text-sumi transition-colors hover:bg-washi-deep"
                  >
                    Markdown保存
                  </button>
                </div>
              </div>

              <pre
                ref={memoRef}
                tabIndex={-1}
                aria-live="polite"
                className="jp-body mt-4 max-h-[380px] overflow-auto whitespace-pre-wrap rounded-md border border-line bg-white p-4 text-left text-[0.8rem] leading-relaxed text-sumi-soft outline-none"
              >
                {memo}
              </pre>

              <div aria-live="polite">
                {copyState === "ok" && (
                  <p className="mt-2 text-[0.78rem] font-bold text-shu">
                    コピーしました。
                  </p>
                )}
                {copyState === "ng" && (
                  <div className="mt-3">
                    <p className="text-[0.78rem] font-bold text-[#9c4632]">
                      自動でコピーできませんでした。下の枠内の文章を選択して、手動でコピーしてください。
                    </p>
                    <textarea
                      ref={fallbackRef}
                      readOnly
                      value={memo}
                      rows={8}
                      className="mt-2 w-full rounded-md border border-line bg-white p-3 text-[0.78rem] text-sumi-soft"
                    />
                  </div>
                )}
                {saveState === "ng" && (
                  <p className="mt-2 text-[0.78rem] font-bold text-[#9c4632]">
                    この環境ではファイル保存に対応していないようです。「コピー」で持ち帰ってください。
                  </p>
                )}
              </div>

              <p className="jp-body mt-3 text-[0.75rem] leading-relaxed text-sumi-soft">
                このメモはブラウザ内の一時的な状態だけに保持され、ページを更新すると消えます。
                サーバーへの送信は行われていません。持ち帰る場合はコピーか保存をご利用ください。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* 相談CTA */
function ConsultCta({ started }: { started: boolean }) {
  return (
    <section className="bg-washi-deep px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-[720px] text-center">
        <Reveal>
          <h2 className="font-serif text-[1.3rem] font-bold text-sumi sm:text-[1.5rem]">
            自社の業務に置き換えて、確認してみませんか。
          </h2>
          <p className="jp-body mt-3 text-[0.9rem] leading-relaxed text-sumi-soft">
            初回無料・オンライン45分。対象業務や確認したいことを一緒に整理します。
            相談の中で試作品の完成をお約束するものではありません。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark"
            >
              このメモをもとに、自社で使えるか相談する
            </a>
          </div>
          <p className="jp-body mt-4 text-[0.78rem] leading-relaxed text-sumi-soft">
            ボタンを押しても、メモや選択内容が送信されることはありません。
            必要ならメモを保存して、相談のときに共有してください。
            外部の予約ページ（Googleカレンダー）へ移ります。
          </p>
          <p className="jp-body mt-2 text-[0.78rem] leading-relaxed text-sumi-soft">
            このデモに当てはまらない業務のご相談も、同じ相談入口からお受けしています。
            {!started && (
              <>
                <br />
                デモを試していない場合も、そのままご相談いただけます。
              </>
            )}
          </p>
          <p className="mt-4 text-[0.78rem] text-sumi-soft">
            メールでのお問い合わせ：
            <a
              href={`mailto:${LINKS.email}`}
              className="text-shu underline underline-offset-2"
            >
              {LINKS.email}
            </a>
          </p>
          <p className="mt-6">
            <Link
              href="/"
              className="text-[0.8rem] text-sumi-soft underline underline-offset-2 hover:text-shu"
            >
              ← サイトトップへ戻る
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
