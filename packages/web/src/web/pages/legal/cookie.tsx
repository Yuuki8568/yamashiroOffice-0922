import {
  LegalLayout,
  LegalSection,
  LegalList,
  LegalTable,
  LegalDates,
} from "../../components/site/legal-layout";

function CookiePolicy() {
  return (
    <LegalLayout title="Cookieポリシー">
      <p className="jp-body text-[0.9rem] text-sumi-soft">
        本サイトで利用するCookieおよびトラッキング技術の詳細を、利用者への透明性確保のため以下のとおり開示します。
      </p>

      <LegalSection heading="第1条 Cookieとは">
        <p>
          Cookieとは、ウェブサイトがご利用者のブラウザに保存する小さなテキストデータです。サイトの機能改善・アクセス状況の分析等を目的として利用されます。
        </p>
      </LegalSection>

      <LegalSection heading="第2条 本サイトで利用するCookie・タグの種別">
        <p className="font-bold text-sumi">
          2-1. 必須の保存データ（オプトアウト不可）
        </p>
        <p>
          本サイトは、サイトの基本機能のために当方が発行するCookieを使用していません。ただし、Cookie同意の選択結果を記憶するため、ブラウザのローカルストレージに以下のデータを保存します。これは当サイト内でのみ参照され、外部へ送信されません。
        </p>
        <LegalTable
          headers={["名称", "保存場所", "用途", "保持期間"]}
          rows={[
            [
              "ga-consent",
              "ブラウザのローカルストレージ",
              "分析Cookieへの同意・拒否の選択を記憶",
              "利用者がブラウザデータを削除するまで",
            ],
          ]}
        />
        <p className="font-bold text-sumi">2-2. 分析Cookie（オプトアウト可）</p>
        <p>
          分析Cookieは、初回アクセス時のCookie同意バナーで同意いただいた場合にのみ発行されます。
        </p>
        <LegalTable
          headers={["名称", "送信先", "用途", "保持期間"]}
          rows={[
            [
              "_ga",
              "Google LLC（米国）",
              "Google Analytics 4 — 利用者の識別（個人を特定しない識別子）",
              "2年",
            ],
            [
              "_ga_4HK647VKTL",
              "Google LLC（米国）",
              "Google Analytics 4 — 計測ID単位のセッション状態の保持",
              "2年",
            ],
          ]}
        />
        <p className="font-bold text-sumi">2-3. 広告Cookie</p>
        <p>現時点では広告配信Cookieは利用していません。</p>
      </LegalSection>

      <LegalSection heading="第3条 外部送信先事業者一覧（参考情報としての任意開示）">
        <LegalTable
          headers={["送信先事業者", "国", "サービス名", "用途"]}
          rows={[
            [
              "Google LLC",
              "米国",
              "Google Analytics 4",
              "アクセス解析",
            ],
          ]}
        />
        <p>
          各事業者のプライバシーポリシーは、それぞれの公式サイト（policies.google.com
          等）をご確認ください。
        </p>
      </LegalSection>

      <LegalSection heading="第4条 利用者によるオプトアウト方法">
        <p className="font-bold text-sumi">① Google Analytics のオプトアウト</p>
        <p>
          Google Analytics
          オプトアウトアドオンをブラウザにインストールすることで、Google
          Analyticsによるデータ収集を無効化できます。
        </p>
        <p className="font-bold text-sumi">
          ② ブラウザ設定によるCookie無効化
        </p>
        <LegalTable
          headers={["ブラウザ", "設定方法"]}
          rows={[
            [
              "Google Chrome",
              "設定 → プライバシーとセキュリティ → Cookieと他のサイトデータ",
            ],
            [
              "Safari",
              "環境設定 → プライバシー → Cookieとウェブサイトのデータ",
            ],
            [
              "Firefox",
              "設定 → プライバシーとセキュリティ → Cookieとサイトデータ",
            ],
            ["Microsoft Edge", "設定 → Cookieとサイトのアクセス許可"],
          ]}
        />
      </LegalSection>

      <LegalSection heading="第5条 同意取得の方針">
        <LegalList
          items={[
            "当方は、分析Cookieの利用について、初回アクセス時にCookie同意バナーにより利用者の同意を確認する方針です。",
            "同意はいつでも撤回可能です。ページ下部のフッターにある「Cookie設定」から同意バナーを再表示し、「拒否する」を選ぶと、以後は分析Cookieを発行せず、すでに発行済みの分析Cookieも削除されます。",
            "必須の保存データ（ga-consent）は同意の記憶に不可欠であるため、同意なしに保存されます。",
          ]}
        />
      </LegalSection>

      <LegalSection heading="第6条 本ポリシーの改定">
        <p>
          電気通信事業法の改正、または利用するCookieの変更に応じて、本ポリシーを随時更新します。
        </p>
      </LegalSection>

      <LegalDates />
    </LegalLayout>
  );
}

export default CookiePolicy;
