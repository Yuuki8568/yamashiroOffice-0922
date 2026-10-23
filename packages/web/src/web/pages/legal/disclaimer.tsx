import { BUSINESS_TERMS } from "../../lib/business-terms";
import {
  LegalLayout,
  LegalSection,
  LegalList,
  LegalDates,
} from "../../components/site/legal-layout";

function Disclaimer() {
  return (
    <LegalLayout title="免責事項">
      <p className="jp-body text-[0.9rem] text-sumi-soft">
        山代 悠生（屋号:
        山代業務改善事務所）は、本サイトおよびコンサルティングサービスを誠実に提供するよう努めますが、以下の事項について責任を負いかねる場合があります。
      </p>

      <LegalSection heading="第1条 情報の正確性・完全性に関する免責">
        <LegalList
          items={[
            "本サイトに掲載する情報は、公開時点での正確性・有用性を確保するよう努めますが、その完全性・正確性・最新性・特定目的への適合性を保証するものではありません。",
            "掲載情報は予告なく変更・削除されることがあります。",
            "本サイトの情報に基づいてご利用者が行った判断・行動の結果について、当方は責任を負いません。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第2条 AI生成物・AI利用支援に関する免責">
        <LegalList
          items={[
            "当方はコンサルティング業務において生成AI（Claude等）を補助的に使用することがあります。これらのAIツールには「ハルシネーション（幻覚）」と呼ばれる現象が発生しうることが知られています。",
            "当方は、AI生成物を提供する際に内容の確認・検証を行います。お客様にも利用場面に応じた確認をお願いしますが、当方の合意した提供義務や契約不適合への対応義務を免除するものではありません。",
            "当方が提案・提供するAI活用策・業務改善策は、一般的な知見および当方の経験に基づくものであり、特定の業務成果・法的遵守・安全性を保証するものではありません。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第3条 コンサルティングサービスの成果に関する免責">
        <LegalList
          items={[
            "当方のコンサルティングサービスは、善良な管理者の注意義務（善管注意義務）をもって遂行します。",
            "ただし、業務改善・生産性向上・売上増加等の特定の経営成果・事業効果を保証するものではありません。",
            "コンサルティングの成果は、お客様の事業環境・組織・実行体制・市場環境等の外部要因に大きく依存します。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第4条 外部リンク先に関する免責">
        <LegalList
          items={[
            "本サイトには第三者が運営するウェブサイトへのリンクが含まれることがあります。これらのリンク先サイトの内容・安全性・プライバシーポリシーについて、当方は責任を負いません。",
            "リンク先サイトの利用については、当該サイトの利用規約・プライバシーポリシーに従ってください。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第5条 損害賠償の範囲限定">
        <LegalList
          items={[
            "事業者向け契約における双方の損害賠償の範囲は、直接かつ通常の損害に限るものとし、逸失利益・間接損害・特別損害・結果損害・懲罰的損害賠償を含みません。",
            BUSINESS_TERMS.cap,
            BUSINESS_TERMS.capExceptions,
            "消費者契約法その他の強行法規が適用される場合は、当該法規の定めを優先します。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第6条 不可抗力">
        <p>
          天災・感染症・戦争・政府機関の行為・停電・インターネット障害・第三者のシステム障害等、当方の合理的な支配を超えた事由により、サービスの提供が遅延・不能となった場合の損害賠償責任は、個別契約及び適用法令に従います。不可抗力による終了にもお客様都合の返金不可を一律に適用せず、未提供分の精算・返金の扱いは個別契約及び適用法令により別途確認します。
        </p>
      </LegalSection>

      <p>{BUSINESS_TERMS.performance}</p>
      <p>{BUSINESS_TERMS.officeExit}</p>
      <p>{BUSINESS_TERMS.existing}</p>
      <LegalDates revised="2026年10月23日" />
    </LegalLayout>
  );
}

export default Disclaimer;
