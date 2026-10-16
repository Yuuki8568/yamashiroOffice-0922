import { useEffect } from "react";
import { SiteHeader } from "../components/site/header";
import { SiteFooter } from "../components/site/footer";
import { Reveal } from "../components/site/reveal";
import { LINKS, OFFICE } from "../lib/links";

const DELIVERY = [
  {
    kind: "web tool",
    title: "ブラウザで動く道具",
    body: "インストール不要。ブラウザで開いて、そのまま使える形でお渡しします。",
  },
  {
    kind: "file",
    title: "ファイル一式",
    body: "表計算のひな形など、ファイルを受け取ってご自身の環境で使います。",
  },
  {
    kind: "nocode guide",
    title: "手順書つき組み立て",
    body: "手順書を見ながら、ご自身の環境で組み立てる形です。",
  },
  {
    kind: "engagement",
    title: "伴走支援",
    body: "道具の提供に、使い方が定着するまでの伴走が付く形です。",
  },
  {
    kind: "consult",
    title: "相談",
    body: "使い方を一緒に整える相談の形でお渡しします。",
  },
] as const;

const STEPS = [
  {
    no: "STEP 1",
    title: "招待リンクを受け取る",
    body: "招待リンクはこちらからお渡しします。リンクにはお渡し先のメールアドレスが結び付いています。ご希望の方は、無料相談またはメールでお問い合わせください。",
  },
  {
    no: "STEP 2",
    title: "アカウントを作る",
    body: "リンクからそのまま登録できます。ご購入は事業者としてのお申し込みに限ります。",
  },
  {
    no: "STEP 3",
    title: "価格が表示され、購入できる",
    body: "登録後は価格の表示・購入・請求書の発行まで、通常の売り場と同じように使えます。",
  },
] as const;

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

export default function Store() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `ストア（業務改善ツール直販）｜${OFFICE.name}`;
  }, []);

  return (
    <div className="min-h-screen bg-washi">
      <SiteHeader />
      <main className="pt-16">
        {/* ヒーロー */}
        <section className="border-b border-line bg-washi px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1080px]">
            <Reveal>
              <p className="eyebrow">STORE</p>
              <h1 className="mt-3 font-serif text-[1.8rem] font-bold leading-snug text-sumi sm:text-[2.3rem]">
                山代業務改善ストア
              </h1>
              <p className="jp-body mt-4 max-w-[700px] text-[0.95rem] leading-relaxed text-sumi-soft">
                現場で実際に使っている業務改善の道具を、作った本人が並べている直販サイトです。
                表計算のひな形、手順書、ブラウザで動く道具、そして使い方を一緒に整える相談まで。
                よそから仕入れた商品はありません。
              </p>
              <p className="jp-body mt-3 max-w-[700px] text-[0.95rem] leading-relaxed text-sumi-soft">
                ご購入は招待制ですが、商品の中身と条件はどなたでもご覧いただけます。
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={LINKS.shop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark"
                >
                  商品棚を見る（外部サイト）
                </a>
                <a
                  href="#how-to-buy"
                  className="rounded-md border border-line bg-white px-6 py-3 text-[0.9rem] font-bold text-sumi transition-colors hover:bg-washi"
                >
                  購入までの流れを見る
                </a>
              </div>
              <p className="mt-4 text-[0.78rem] text-sumi-soft">
                ※ ご購入は事業者からのお申し込みに限ります。ストアは別サイト（yamashirogyomukaizen.shop）で運営しています。
              </p>
            </Reveal>
          </div>
        </section>

        {/* 受け取り方は5通り */}
        <section className="border-b border-line bg-white px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <PageHeading
              eyebrow="DELIVERY"
              title="受け取り方は5通り"
              lead="道具だけでも、人の手が付いてくる形でも選べます。"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DELIVERY.map((d, i) => (
                <Reveal key={d.kind} delay={i * 70}>
                  <div className="h-full rounded-lg border border-line bg-washi p-5">
                    <p className="text-[0.68rem] font-bold tracking-[0.18em] text-shu">
                      {d.kind}
                    </p>
                    <p className="mt-1.5 text-[0.92rem] font-bold text-sumi">
                      {d.title}
                    </p>
                    <p className="jp-body mt-1.5 text-[0.82rem] leading-relaxed text-sumi-soft">
                      {d.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ご購入の流れ（招待制） */}
        <section id="how-to-buy" className="bg-washi px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-[1080px]">
            <PageHeading
              eyebrow="INVITATION ONLY"
              title="ご購入の流れ（招待制）"
              lead="道具は、渡したあとに使い方の相談ができる範囲でしか売りません。そのため、お引き受けできる数に合わせて、ご招待した方だけにご購入いただいています。"
            />
            <div className="grid gap-5 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.no} delay={i * 90}>
                  <div className="h-full rounded-lg border border-line bg-white p-6">
                    <p className="text-[0.7rem] font-bold tracking-[0.2em] text-shu">
                      {s.no}
                    </p>
                    <p className="mt-2 font-serif text-[1rem] font-bold text-sumi">
                      {s.title}
                    </p>
                    <p className="jp-body mt-2 text-[0.85rem] leading-relaxed text-sumi-soft">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-line bg-washi-deep px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-[720px] text-center">
            <Reveal>
              <h2 className="font-serif text-[1.3rem] font-bold text-sumi sm:text-[1.5rem]">
                まずは商品棚をご覧ください
              </h2>
              <p className="jp-body mt-3 text-[0.9rem] leading-relaxed text-sumi-soft">
                商品の中身・できないこと・前提条件は、招待の有無にかかわらずどなたでも読めます。
                招待をご希望の方は、無料相談またはメールでお問い合わせください。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href={LINKS.shop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-shu px-6 py-3 text-[0.9rem] font-bold text-white transition-colors hover:bg-shu-dark"
                >
                  商品棚を見る（外部サイト）
                </a>
                <a
                  href={LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line bg-white px-6 py-3 text-[0.9rem] font-bold text-sumi transition-colors hover:bg-washi"
                >
                  無料相談を予約する
                </a>
              </div>
              <p className="mt-4 text-[0.78rem] text-sumi-soft">
                メールでのお問い合わせ：
                <a
                  href={`mailto:${LINKS.email}`}
                  className="text-shu underline underline-offset-2"
                >
                  {LINKS.email}
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
