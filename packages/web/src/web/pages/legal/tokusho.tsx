import { BUSINESS_TERMS } from "../../lib/business-terms";
import {
  LegalLayout,
  LegalSection,
  LegalList,
  LegalTable,
  LegalDates,
} from "../../components/site/legal-layout";
import { OFFICE } from "../../lib/links";

function Tokusho() {
  return (
    <LegalLayout title="特定商取引法に基づく表記">
      <p className="jp-body text-[0.9rem] text-sumi-soft">
        {BUSINESS_TERMS.scope}
      </p>

      <LegalSection heading="販売事業者">
        <LegalTable
          headers={["項目", "内容"]}
          rows={[
            ["販売事業者名", "山代 悠生（屋号: 山代業務改善事務所）"],
            ["運営責任者", "山代 悠生"],
            ["事業形態", "個人事業主"],
            ["所在地", `${OFFICE.postal} ${OFFICE.address}`],
            ["適格請求書発行事業者 登録番号", OFFICE.invoice],
            [
              "電話番号",
              "請求があった場合、遅滞なく（原則7日以内に）開示します。お問い合わせよりご請求ください。",
            ],
            [
              "メール・問い合わせ",
              "サイト内に記載のお問い合わせ先メールアドレスよりご連絡ください",
            ],
          ]}
        />
      </LegalSection>

      <LegalSection heading="提供役務・販売商品">
        <LegalList
          items={[
            "AI業務改善コンサルティングサービス",
            "AI業務診断ライト（業務AI活用ポイントの診断）",
            "スポット相談（単発の相談対応）",
            "業務改善設計（単発）（現状分析・改善設計書の作成）",
            "設計＋伴走（設計書作成および1ヶ月の伴走支援）",
            "集中伴走（3ヶ月の実装伴走・社内定着支援）",
            "定着サポート（月次の運用支援・保守）",
            "社内研修（半日／1日）",
            "関連デジタル制作物・情報コンテンツの販売（別途告知する場合）",
          ]}
        />
      </LegalSection>

      <LegalSection heading="価格・支払方法・支払時期">
        <LegalTable
          headers={["項目", "内容"]}
          rows={[
            [
              "価格",
              BUSINESS_TERMS.price,
            ],
            [
              "支払方法",
              "銀行振込（別途ご案内）、その他当方が指定する方法",
            ],
            [
              "支払時期",
              BUSINESS_TERMS.payment,
            ],
            ["追加料金", "振込手数料はお客様のご負担とします。"],
          ]}
        />
      </LegalSection>

      <LegalSection heading="役務提供時期">
        <p>{BUSINESS_TERMS.start}</p>
      </LegalSection>

      <LegalSection heading="返品・キャンセルポリシー">
        <LegalList
          items={[
            BUSINESS_TERMS.cancelBefore,
            BUSINESS_TERMS.cancelAfter,
            BUSINESS_TERMS.officeExit,
            BUSINESS_TERMS.nextRefund,
            BUSINESS_TERMS.refundTiming,
            "キャンセルのお申し出はメールにて承ります。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="動作環境（デジタル成果物がある場合）">
        <LegalTable
          headers={["項目", "推奨環境"]}
          rows={[
            [
              "OS",
              "Windows 10以降、macOS 12以降、ChromeOS（最新版推奨）",
            ],
            [
              "ブラウザ",
              "Google Chrome・Mozilla Firefox・Safari・Microsoft Edge（各最新版）",
            ],
            [
              "ファイル形式",
              "PDF、Markdown、Googleドキュメント/スプレッドシート形式にて納品",
            ],
          ]}
        />
      </LegalSection>

      <LegalSection heading="単発・月額の契約と更新">
        <LegalList items={[BUSINESS_TERMS.renewal, BUSINESS_TERMS.notice, BUSINESS_TERMS.lateInvoice, BUSINESS_TERMS.feeDetails, BUSINESS_TERMS.performance]} />
        <p>{BUSINESS_TERMS.existing}</p>
      </LegalSection>
      <LegalDates revised="2026年10月23日" />
    </LegalLayout>
  );
}

export default Tokusho;
