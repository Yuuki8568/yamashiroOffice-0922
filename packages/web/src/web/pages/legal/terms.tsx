import { BUSINESS_TERMS } from "../../lib/business-terms";
import {
  LegalLayout,
  LegalSection,
  LegalList,
  LegalOList,
  LegalDates,
} from "../../components/site/legal-layout";

function Terms() {
  return (
    <LegalLayout title="利用規約">
      <p className="jp-body text-[0.9rem] text-sumi-soft">
        本規約は、山代 悠生（屋号:
        山代業務改善事務所）が運営するウェブサイトの利用条件を定めるものです。本サイトをご利用いただくすべての方は、本規約に同意したものとみなします。
      </p>

      <LegalSection heading="第1条 適用範囲・定義">
        <LegalOList
          items={[
            "本規約は、本サイト上のすべてのコンテンツ、情報、サービス（コンサルティングサービスへの申し込みを含む）の利用に適用されます。",
            "本規約において「コンテンツ」とは、本サイトに掲載されたテキスト・画像・動画・ソースコード・設計書・プロンプト・その他の著作物を指します。",
            "本規約において「AI生成コンテンツ」とは、生成AI（当方が利用するものを含む）を用いて生成または補助されたコンテンツを指します。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第2条 禁止事項">
        <LegalList
          items={[
            "本サイトのコンテンツの無断複製・転載・二次配布（商用・非商用を問わない）",
            "本サイトへのリバースエンジニアリング・逆コンパイル・逆アセンブル",
            "自動化ツール（クローラー・スクレイパー等）による本サイトへの大量アクセス・データ収集",
            "AIモデルの学習を目的とした本サイトコンテンツの収集・利用（訓練データ、ファインチューニングデータとしての利用を含む）",
            "本サイトのサーバー・ネットワークへの不正アクセス・過負荷をかける行為",
            "当方または第三者の著作権・商標権・プライバシー権・名誉等を侵害する行為",
            "虚偽の情報を提供して当方を欺く行為",
            "法令または公序良俗に違反する行為",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第3条 知的財産権の帰属">
        <LegalOList
          items={[
            "本サイトに掲載されたすべてのコンテンツの著作権その他の知的財産権は、当方または正当な権利を有する第三者に帰属します。",
            "本サイトの閲覧は、コンテンツの著作権等を移転するものではなく、私的使用の範囲を超える利用を許諾するものでもありません。",
            "有料サービスの成果物に係る知的財産権の帰属・利用許諾は、個別契約に定めます。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第4条 リンク・引用ポリシー">
        <LegalList
          items={[
            "リンク：本サイトへのリンクは、非営利・情報提供目的であれば原則として自由とします。ただし、当方の名誉を損なう文脈でのリンク、フレーム内表示等は禁止します。",
            "引用：著作権法第32条に定める「公正な引用」の要件を満たす場合に限り引用を認めます。引用部分の改変は認めません。",
            "商用利用・転載を希望する場合は、事前にお問い合わせください。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第5条 免責（コンサルティングサービスに関する注意事項）">
        <LegalOList
          items={[
            "本サイトに掲載する情報は、完全性・正確性・最新性を保証するものではありません。",
            "当方が提供するコンサルティングサービスは、善管注意義務をもって遂行するものであり、特定の経営成果・業務改善効果を保証するものではありません。",
            "AI生成物を含む成果物は当方が確認・検証します。お客様にも利用場面に応じた確認をお願いしますが、これにより当方の契約上の提供義務・契約不適合への対応義務が免除されるものではありません。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第6条 規約の変更">
        <LegalOList
          items={[
            "当方は、必要に応じて本規約を変更することができます。",
            "重要な変更を行う場合は、本サイト上での告知を少なくとも7日前に行います。",
            "変更後も本サイトを引き続き利用した場合、改定後の規約に同意したものとみなします。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第7条 準拠法・合意管轄">
        <LegalOList
          items={[
            "本規約は、日本法に準拠し、日本法に従って解釈されます。",
            "本サイトの利用または本規約に関連して生じる紛争については、福島地方裁判所白河支部を第一審の専属的合意管轄裁判所とします。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="事業者向けサービスの契約条件">
        <LegalList items={[BUSINESS_TERMS.scope, BUSINESS_TERMS.ip, BUSINESS_TERMS.jurisdiction, BUSINESS_TERMS.performance, BUSINESS_TERMS.nda, BUSINESS_TERMS.priority, BUSINESS_TERMS.caseGate, BUSINESS_TERMS.existing]} />
      </LegalSection>
      <LegalDates revised="2026年10月23日" />
    </LegalLayout>
  );
}

export default Terms;
