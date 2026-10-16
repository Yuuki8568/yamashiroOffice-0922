import { Link } from "wouter";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { LINKS } from "../../../lib/links";

const DELIVERY_TYPES = [
  "ブラウザで動く道具",
  "ファイル一式",
  "手順書つき組み立て",
  "伴走支援",
  "相談",
] as const;

export function StoreSection() {
  return (
    <section id="store" className="border-y border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <SectionHeading
          eyebrow="STORE"
          title="山代業務改善ストア ── 道具の直販サイトを開いています"
          lead="現場で実際に使っている業務改善の道具を、作った本人がそのまま並べている店です。相談を挟まずに「できあいの道具だけ」を選びたい方向けの売り場を、別サイトに開いています。"
        />

        <Reveal>
          <ul className="mb-6 grid gap-2 sm:grid-cols-3">
            {[
              "既製の道具をそのまま選びたい方",
              "自社に合うか、中身を先に確認したい方",
              "自社専用の仕組みは、個別の無料相談へ",
            ].map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 rounded-md border border-line bg-washi px-4 py-3 text-[0.82rem] font-bold leading-relaxed text-sumi"
              >
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-[0.8rem] text-shu">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <div className="rounded-lg border border-line bg-washi p-6 shadow-sm sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="text-[0.8rem] font-bold tracking-wide text-sumi">
                  受け取り方は5通り
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {DELIVERY_TYPES.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-line bg-white px-2.5 py-1 text-[0.72rem] text-sumi-soft"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="jp-body mt-3 text-[0.85rem] leading-relaxed text-sumi-soft">
                  道具だけでも、人の手が付いてくる形でも選べます。商品の中身・できないこと・前提条件は、招待の有無にかかわらずどなたでもご覧いただけます。
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/store"
                  className="rounded-md bg-shu px-5 py-2.5 text-center text-[0.85rem] font-bold text-white transition-colors hover:bg-shu-dark"
                >
                  ストアの案内を見る
                </Link>
                <a
                  href={LINKS.shop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line bg-white px-5 py-2.5 text-center text-[0.85rem] font-bold text-sumi transition-colors hover:bg-washi"
                >
                  商品棚を見る（外部サイト）
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="jp-body mx-auto mt-8 max-w-[720px] text-center text-[0.85rem] text-sumi-soft">
            ご購入は招待制です。道具は、渡したあとに使い方の相談ができる範囲でしか売らないため、お引き受けできる数に合わせてご招待しています。招待をご希望の方は、無料相談またはメールでお問い合わせください。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
