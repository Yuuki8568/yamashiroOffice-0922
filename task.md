# 山代業務改善事務所サイト構築 — 進捗

## 決定事項
- 屋号: 山代業務改善事務所 / 料金非掲載(要相談) / 現行ポートフォリオ置き換え
- ライト基調: washi #F7F5F0 / sumi #1C2B3A / shu #B93A26。Noto Serif JP + Noto Sans JP (fontsource導入済)
- 素材: packages/web/public/images/ に profile-1x.webp, ss-shindan.webp, ss-etsy.webp 移植済
- 法務原文: /home/user/site_assets/legal_*.txt (5本)。事業者名は「山代 悠生（屋号: 山代業務改善事務所）」に統一
- リンク集/事務所定数: src/web/lib/links.ts
- 現行サイト全文: /home/user/site_text.txt。FAQ7問全文はチャット履歴のbash出力に取得済
- 数字: 最短開発10分/資格4冠/診断2分/1人全工程 (現行サイト事実のみ)

## 完了
- [x] app_init, design.md, styles.css(テーマ), links.ts, reveal.tsx, hanko.tsx, header.tsx

## 残り
- [ ] sections: hero/worries/flow/strengths/projects/security/profile/faq/contact + cta-band + footer
- [ ] pages/index.tsx 組み込み
- [ ] 法務5ページ (legal-layout + 5ページ, wouterルート追加)
- [ ] index.html (lang=ja, title, meta, OG)
- [ ] favicon.ico + og-image.png (ヘッドレスChromeでhanko描画→magick変換)
- [ ] bun run build 検証 → dev起動(port 4200) → mb でスマホ/PC確認 → deliver

## 完了 (2026-08-09)
- 法務5ページすべて作成 (privacy/terms/tokusho/disclaimer/cookie)、事業者名を「山代 悠生（屋号: 山代業務改善事務所）」に統一
- tokusho: 価格行は「お見積りにより確定」形式（金額なし）
- app.tsx ルート追加、index.html (lang=ja, title, OG) 更新
- favicon.ico + og-image.png 生成（判子ロゴ、mb+magick）
- bun run build 成功、dev :4200 稼働 (tmux: yamashiro)
- 検証済み: 全セクション desktop 1440 / mobile 375、FAQアコーディオン、モバイルメニュー、法務5ルート、誇張表現なし、価格記載なし

## 更新 (2026-08-09 第2回)
- ロゴ刷新: ユーザー支給の矢印アイコン(紺→シアン) → public/images/logo.png (背景透過処理済)。hanko.tsx削除→logo.tsx。favicon.ico/og-image.png再生成
- アクセント色: 朱 #B93A26 → 藍 #0e7490 (dark #155e75)。変数名--shuは維持(値のみ変更)
- メール統一: info@yamashirokaizen.com (links.ts)
- 「無料30分相談」→「無料相談」全置換 (header/hero/contact/flow)
- 新セクション services.tsx (#services「支援内容──3つの柱」: AI導入支援/事務ワークフローのツール化/保守管理つき伴走支援)。ナビに「支援内容」追加
- hero文言・flow step04・index.htmlメタを保守管理つき伴走に合わせて更新
- 検証済み: build成功、desktop 1440 (hero/services/contact/footer/tokusho)、mobile 375

## 更新 (2026-08-09 第3回)
- 支援内容②にシフト作成を追加（本文にシフト表、タグ「シフト作成」）
- Etsy/KokoroInkArt 全削除: projects(Etsyアプリ実例ごと削除・診断ツールのみ), profile(SOCIALリンク・本文), faq(Q2回答), contact(LINKS一覧), tokusho(提供役務), links.ts(etsyApp/etsyShop), ss-etsy.webp削除
- rg検索でEtsy/Kokoro残存ゼロ確認、build成功、1440pxで表示確認済み

## 第4回更新 (2026-08-09)
- 実例セクションに2デモ追加完了:
  - シフト工房 (https://app-nah86it.runable.site/, /images/ss-shift.webp)
  - 業務ツールデモスイート (https://yamashi-itbomyl.runable.site/, /images/ss-demosuite.webp)
- links.ts に demoSuite / shiftKobo 追加済み
- build成功、1440px/375px 表示確認済み (3カード・交互レイアウト・BEFORE/AFTER・リンク)
- 注意: dev HMRで一時 root が空になる現象あり → フルリロードで解消 (コード起因ではない)

## 第5回更新 (2026-08-09)
- note / X / LinkedIn リンクを全削除（ユーザー指示）
  - links.ts: note/x/linkedin エントリ削除
  - contact.tsx: LINK_LIST から3件削除（AI業務診断ツールのみ残す）
  - profile.tsx: SOCIAL 配列とリスト表示を削除
- Vite キャッシュ stale 問題 → dev サーバー再起動で解消（tmux yamashiro 再作成、:4200 稼働中）
- build 成功、1440px/375px で表示確認済み
- 実例セクションの2デモ（シフト工房/デモスイート）は追加済みを確認

## 第6回更新 (2026-08-11) ファクトチェック報告書の反映
ユーザー提供の監査報告書（A判定全件+B-7+A-5補足）を反映:
- A-1/A-2(案2): 「Google公認AI資格4冠」→「Google提供のAI講座 修了証4件」(hero/strengths/profile/faq)。講座名列挙をGoogle AI Essentials/Google AI Specialization/Google Prompting Essentials/Generative AI Leader(Google Cloud)に修正
- A-3: ヒーロー「10分 最短開発時間」→「10〜30分 簡易ツールの試作時間」
- A-4/A-14: 「2分」→「約2分」(hero/strengths)
- A-5: セキュリティ見出し「自社ツールで54項目のセキュリティ検証を実施」+第三者監査でない旨の1文+バッジ補足「自社検証」。補足対応: PBKDF2の反復回数(100,000回)表示を削除(OWASP推奨60万回未満のため)
- A-6: terms 管轄 東京地裁→福島地裁白河支部
- A-7: privacy第5条 委託先表を6行に差替(Gemini/Verdent/GA4/公開基盤事業者を追加、Cloudflare削除)
- A-8: privacy第6条 データ基準型に全面差替
- A-9: privacy第8条 個情法28条ベースに差替(EU-US DPF削除)
- A-10: privacy第10条 5年→7年(所得税法)
- A-11: cookie 冒頭の外部送信規律文言を任意開示に変更、2-2に導入前暫定文追加、第3条見出し変更+任意開示追記
- A-12: tokusho 提供役務7プラン+役務提供時期4行に差替、冒頭にBtoB適用対象外の文言
- A-13: tokusho 価格欄をインボイス未登録(免税事業者)の記載に差替
- 教訓: 同一ファイルへの並列edit呼び出しは競合で消失する→同一ファイルはpythonで一括patch
- 残存チェック(rg)ゼロ、build成功、表示確認済み
- 注: GA4+同意バナーの実装は未着手(別タスク)。実装完了後にcookie 2-2の暫定文を削除すること

## 第7回更新 (2026-08-11) GA4測定タグ＋Cookie同意バナー実装
A-11で確定した方針の実装。測定IDは未発行のため **無効状態で出荷**。ID発行後は1箇所設定するだけで有効化される設計。
- 新規 `packages/web/src/web/lib/analytics.ts`: `GA_MEASUREMENT_ID = ""`（未発行）。getConsent/setConsent/initAnalytics を提供。同意状態は localStorage `ga-consent`("granted"/"denied")、変更時に `ga-consent-changed` イベント発火
- 新規 `packages/web/src/web/components/site/cookie-banner.tsx`: 同意バナー。`GA_MEASUREMENT_ID` が空なら一切非表示（実態のないCookie告知を出さないため）。「同意する」「拒否する」+ `/cookie` へのリンク
- `packages/web/src/web/app.tsx`: CookieBanner 組込み + initAnalytics() 呼出し
- 同意前は分析Cookieを発火させない（consent granted 時のみ gtag スクリプトを動的ロード、anonymize_ip 有効）
- 動作検証: ダミーID `G-TESTDUMMY` で バナー表示/同意→localStorage granted+gtag挿入/リロード後も非表示維持/拒否→denied/拒否時gtag非ロード をすべて確認後、IDを `""` に戻した
- 本番状態（ID空）: バナー非表示・gtag非ロードを確認、build成功
- 【将来の有効化手順】GA4測定ID発行後、analytics.ts の `GA_MEASUREMENT_ID` に `"G-XXXXXXXXXX"` を入れるだけでバナーと計測が有効化される。その際 **cookie.tsx 2-2 の暫定文（「現在、分析Cookieの導入準備を進めています…」）を削除すること**

## 第7回更新 追補 (2026-08-11) GA4有効化
ユーザー提供のGA4測定ID **G-4HK647VKTL** を analytics.ts の `GA_MEASUREMENT_ID` に設定し有効化。
- cookie.tsx 2-2 の暫定文を削除→「分析Cookieは、初回アクセス時のCookie同意バナーで同意いただいた場合にのみ発行されます。」に差替
- cookie-banner.tsx の文言を「利用する予定です」→「利用しています」に修正
- HMR不反映のため tmux yamashiro を再起動、配信確認済み
- 動作検証（実IDで実施）:
  - バナー表示: 「Cookieの利用について」「同意する」「拒否する」検出、初期 localStorage `ga-consent`=null
  - 同意: `ga-consent=granted`、`window.gtag`=function、googletagmanager スクリプト挿入を確認
  - 拒否: `ga-consent=denied`、gtag=undefined、スクリプトなし、バナー消滅
  - 再訪問: denied 保存状態でリロード→バナー非表示・gtag非ロード
  - 文言修正後: 「利用しています」の配信・表示を確認。検証後 localStorage はクリア済み（バナー初期状態に復帰）
- build 成功

## 第7回更新 追補2 (2026-08-11) GA4タグをindex.html静的配置へ変更
GA4管理画面の「タグが検出されませんでした」エラー対応。原因: タグが同意後のJS動的挿入のみで、GA4の検出ボット（同意操作をしない・React実行前のHTMLを見る）には存在しなかった。
- 対応: `packages/web/index.html` の `<head>` 内にGoogleタグを**静的インライン配置**。同意状態(localStorage `ga-consent`)を見て、granted時のみ googletagmanager スクリプトを動的appendChildで読み込む方式（同意前発火防止の原則は維持）
- `analytics.ts` はロード処理をフォールバック化（index.html側が先に実行されるため通常はno-op）。測定IDは index.html と analytics.ts の2箇所に同値で存在することに注意（将来ID変更時は両方更新）
- 動作検証: curlでHTMLにタグ配信を確認 / 未同意: gtag非ロード+バナー表示 / 同意済(granted保存): gtag=function・GTMスクリプト挿入・dataLayer動作・バナー非表示 / 検証後localStorageクリアで初期状態復帰
- build成功、dist/index.htmlにもタグ入りを確認
- 残課題: GA4検出が通るには**公開URL上のサイト**である必要がある（devサーバーやローカルには到達不可）。公開後にGA4管理画面で「検出を再試行」すること

## 第8回更新 (2026-08-11) サイト残件6件の修正（S-1〜S-6）
実機検証で見つかった残件6件をすべて修正。緊急度「高」なし。
- S-1 /cookie: `_gid`（旧UA・実在しない）を削除、`_ga_*` を実名 `_ga_4HK647VKTL` に置換。用途もGA4表記に更新
- S-2 /cookie: 2-1「必須Cookie=セッションCookie」は実在しないため「必須の保存データ」に改め、実際に使う `ga-consent`(localStorage) の表に差替
- S-3 同意撤回手段がなかった → **案1採用（実装あり）**。フッターに「Cookie設定」ボタン追加（`open-cookie-settings` イベントでバナー再表示）。拒否切替時に `deleteGaCookies()` で発行済み `_ga`/`_ga_*` を削除する処理を analytics.ts に追加。cookie.tsx 第5条の文言も実装に合わせ更新
- S-4 トップ シフト工房: 「データはブラウザ内保存」の断定に但し書き追加「原則ブラウザ内にのみ保存（AI提案・Excel出力の実行時を除く）」
- S-5 /privacy 第5条: デモツールのAI機能で外部送信が起きる旨と「デモに実在の個人情報・秘密情報を入力しないでください」の注意を表の下に追記
- S-6 /tokusho 支払時期: 「請求書発行日から14日以内」に「支払期日は受領日起算60日以内（中小受託取引適正化法の規律に沿った運用）」を追記し定義書と整合
- 撤回機能の実測: 同意→本物_ga発行→Cookie設定→拒否→ `_ga` が (empty) になることを確認。HMR不反映があったため tmux yamashiro 再起動で解消
- 全ページ表示確認・build成功・dist反映確認。検証後 localStorage クリアで初期（バナー表示）状態に復帰

## 第9回更新 (2026-08-11) 本番公開・GA4実機検証完了
yamashirogyomukaizen.com が公開され、本番環境で全動作を実機確認。
- 公開URL https://yamashirogyomukaizen.com/ が HTTP 200 で応答、生HTMLの <head> に G-4HK647VKTL / googletagmanager を確認
- 初回訪問: 同意バナー表示・ga-consent=null・gtag未定義（同意前は非計測）
- 同意: granted・gtag=function・googletagmanagerスクリプト挿入・`_ga`/`_ga_4HK647VKTL` 発行を確認
- 撤回: フッター「Cookie設定」→再表示→拒否→ `_ga` 系Cookieが全削除（empty）・denied保存を確認
- 検証後は localStorage をクリアし、本番を初回訪問状態（バナー表示）に復帰
- 【ユーザー作業】GA4管理画面で「タグを検出」を再試行すれば検出される状態。検出後は同意した訪問者のデータのみが収集される

## 第10回更新 (2026-08-11) 無料相談リンクのURL変更
- LINKS.booking を `calendar.app.google/darBsMw74eCs4Txe8` → `calendar.app.google/EmoGevH38APT6JUw8` に変更
- 参照箇所はすべて LINKS.booking 経由（hero/flow/contact/header×2）のため1箇所変更で全反映
- build成功・distに新URLのみ存在することを確認（旧URLは残存なし）
- ※本番への反映には再デプロイが必要

## 第11回更新 (2026-08-13) セキュリティセクションを Consulting Cockpit v4 検証報告に合わせ更新
添付の「Consulting_Cockpit_v4 セキュリティ検証報告」（検証日2026-08-13・開発環境localhost:4200対象）の事実に合わせ、トップの Security セクションを全面改訂。
- 旧：「54項目のセキュリティ検証実施」「54/54 ALL PASSED」の単一スコア＋3カテゴリ（暗号化系8/防御18/静的28）
- 新：報告書の区分に合わせ「実施した試験71項目（第1次38＋侵入試験33）」「修正した弱点15件」「残る弱点5件」の3カード表示
- 内容は報告書の事実ベース：暗号（AES-GCM 256bit／PBKDF2-SHA256 600,000回・塩32バイト／IV重複0件／1ビット改ざんで復号失敗）、侵入を想定した試験（全20手続き未認証呼出拒否／セッション偽造5件拒否／当てずっぽう回数制限遮断／接続元名簿で拒否）、設計上の守り（パスフレーズはサーバーに送らず保存しない／サーバー側に復号処理なし／操作記録はハッシュ連鎖で改ざん検知／許可メール以外はアカウント不可）
- 「自社検証・第三者機関による監査・認証ではない」旨は維持。誇張せず「残る弱点5件は運用で補う前提」と正直に記載
- build成功・表示確認済み（has71/has15/has5/第三者機関 = true、旧54/ALL PASSEDなし）。スクリーンショットでレイアウト確認
- 注意：検証は開発環境（localhost）対象のため、公開後の環境は報告書上「未検証」。この前提はサイト文面に反映しない（セクションの対象はあくまでツール自身の検証実績）

## 第11回更新 追補 (2026-08-13) セキュリティカードを71項目のみに絞る
ユーザー指示により、上部の数字カードは「実施した試験71項目（第1次38＋侵入試験33）」のみに変更。15件/5件のカードは非表示。
- FACTS配列を1件に削減し、中央寄せの単一カードにレイアウト調整
- build成功・表示確認（71のみ表示、15/5のカードは非表示）
- 下段の「暗号の中身／侵入を想定した試験／設計上の守り」3カラムと締めの文は据え置き

## 第12回更新 (2026-09-12) ストア（業務改善ツール直販サイト）への導線を大々的に設置（案C）
自社ツール直販サイト「山代業務改善ストア」(https://yamashirogyomukaizen.shop/) への導線を、案C（/store中継ぎページ新設＋トップに大型セクション）で実装。
- links.ts に `shop: "https://yamashirogyomukaizen.shop/"` 追加（ストアURLはこの1箇所で管理）
- /store ページ新設（pages/store.tsx）：ヒーロー（「商品棚を見る」外部CTA＋購入の流れアンカー）／売り場の3つの決まり／いま並べているもの（商品カード「AI導入ROI・コスト削減シミュレーター」WEB TOOL・招待制バッジ）／受け取り方5通り／ご購入の流れ（招待制・3STEP）／CTA帯（商品棚＋無料相談＋メール）。招待の受け取り導線は「無料相談またはメール」と明記
- トップに StoreSection（sections/store.tsx 新規）を Projects と Security の間に挿入：3つの決まり＋受け取り方5通りchips＋商品カード＋/store内部リンク＋shop外部リンク
- ヘッダーNAVに「ストア」追加（全アンカーを /#xxx 絶対パス化し /store からも遷移可能に）、フッターnav先頭に「ストア（業務改善ツール直販）」追加
- 記載は実測で確認した事実のみ（招待制・商品は1点・他は掲載準備中・3つの決まり・並び順は実績ベース・広告枠なし・購入3STEP）
- 表示確認済み：/store（title/h1/5つのh2/外部リンク3件・ヘッダー・フッター導線）、トップ（セクション順 実例→ストア→セキュリティ、shopリンク1件）
- build成功
- ※本番への反映には再デプロイが必要
- 教訓：新規ページ/セクション追加時はimport漏れでランタイムエラーになり得る（esbuildは型検査しない）。今回 app.tsx の Store import と index.tsx の StoreSection import が欠落しており、ブラウザで白紙/旧表示の原因だった。追加後は必ず mb logs でコンソールエラーを確認する

## 第12回更新 追補 (2026-09-12) ストア導線のスリム化
ユーザー指示：「いま並べているもの」（商品一覧）は随時更新の負担が大きいため削除、「買う前に分かること ── 売り場の3つの決まり」も削除。
- /storeページ：2セクション削除。残構成＝ヒーロー／受け取り方は5通り／ご購入の流れ（招待制・3STEP）／CTA帯
- トップStoreSection：3つの決まり（左カラム）と商品カード（右カラム）も同内容のため一体で削除し、1枚パネル（受け取り方5通りchips＋/store案内ボタン＋商品棚外部ボタン）＋招待制注記のスリム構成に刷新
- これにより事務所サイト側は商品名を一切持たず、商品情報の更新はストア側（yamashirogyomukaizen.shop）だけで済む構成になった
- 表示確認済み（トップ・/storeとも削除対象0件・リンク導線は維持）、build成功
- ※本番への反映には再デプロイが必要

## 第12回更新 追補2 (2026-09-12) AEOブログへのリンクをフッターに追加
https://gyomu-ai.pro/（AI業務改善ブログ、AEO専用・毎日1本配信）への導線。ユーザー判断で「ひっそり載せる」方針確定。
- 理由：AEOブログの流入元はAI回答経由のためサイトナビに大きく載せても効果薄／事務所サイトの役割は相談予約への収束のため目立つ導線は逆効果／ただしクローラーに両ドメインを同一主体として結びつけてもらうためHTML上は確実に辿れる形で残す
- links.ts に `blog: "https://gyomu-ai.pro/"` 追加
- footer.tsx のナビ（ストア直下・法務リンク上）に「AI業務改善ブログ（外部サイト）」を target=_blank で1行追加
- ヘッダーには入れない方針（相談予約・ストア導線を薄めない）
- 表示確認済み（フッターにリンク1件）、build成功
- ※本番への反映には再デプロイが必要

## 第12回更新 追補3 (2026-09-15) 事務所所在地を公開に更新
オフィス契約に伴い所在地を公開表記に変更。
- links.ts の OFFICE に `postal: "〒107-0061"` と `address: "東京都港区北青山1-3-3 三橋ビル 3階"` を追加（1箇所管理）
- tokusho.tsx：所在地を「請求があった場合…開示」から公開表記に変更（法対応の観点でも特商法表記としてより堅い）
- privacy.tsx 第1条：所在地を同様に公開表記に変更
- footer.tsx（SiteFooter）：代表名の上に所在地行を追加（実店舗の所在明記＝信頼性向上）
- LegalDates を改定月を受け取れる形に拡張し、privacy/tokusho の最終改定日を「2026年9月」に更新（他ページは2026年8月のまま）
- 電話番号は従来どおり請求時開示のまま
- 表示確認済み（トップフッター・tokusho・privacy）、build成功
- ※本番への反映には再デプロイが必要

## 第12回更新 追補4 (2026-09-17) 代表写真を差し替え
ユーザー添付の新しい写真に変更。public/images/profile-1x.webp を新画像（1024x1024 PNG → 512x512 webp, 17KB）に置き換え。コード変更不要（パス同一）。丸型表示（rounded-full）に適合する正方形。表示確認済み、build成功。※本番反映には再デプロイが必要

## 第12回更新 追補5 (2026-09-17) インボイス登録番号を控えめに表記
適格請求書発行事業者 登録番号 T3810986792894 を目立たせず掲載。
- links.ts の OFFICE に `invoice: "T3810986792894"` 追加（1箇所管理）
- SiteFooter：代表名の下に一段小さい文字（0.75rem/透明度80%）で1行追加
- tokusho.tsx：販売事業者テーブルに「適格請求書発行事業者 登録番号」行を追加
- 表示確認済み（両箇所）、build成功。※本番反映には再デプロイが必要

## 第13回更新 (2026-09-20) 体験デモ「月末の確認作業を、サンプルで体験」を新設
仕様書 /home/user/Attachments/pasted-1_ERlq18.txt「体験から相談へつなぐ仕組み」に基づく実装。生成AIは一切使わず、決定論的な照合ロジックで「人が判断しやすい形」を体験してもらうデモ。

### 実装内容
- 新規 packages/web/src/web/lib/demo-logic.ts：照合ロジック（純粋関数）。reconcile() は受注3件×完了記録2件の架空サンプルを照合し、請求候補（確認待ち）/金額不一致/完了記録なしの3分類＋保留（holds）を返す。重複ID・受注にない完了ID・金額欠落は保留に回し、推測補完なし。メモ生成 buildMemo()（形式名 website-consultation-memo v1.0、免責・一時状態注記入り、金額を含まない）
- 新規 demo-logic.test.ts：受入試験対応のユニット試験10件（10 pass / 0 fail）
- 新規 pages/demo.tsx：ヒーロー（入力→照合→人の確認の図解、AI不使用明記）→ STEP1 元データ2表＋照合ボタン → STEP2 結果（シナリオ3切替＝通常/データが届かない/引継ぎ、aria-live、結果カード＝状態バッジ+根拠+確認先+次の行動、「請求候補≠請求確定」注記）→ STEP3 確認メモ（選択式のみ、未確認は他選択と排他・未選択は未確認扱い、コピー失敗時は成功表示せずtextareaフォールバック、Markdown保存はBlob download、サーバー送信なし）→ 相談CTA（予約は外部ページ遷移のみ、メモの自動送信・URL埋め込みなし、デモ対象外業務も相談可の一文あり）
- 新規 sections/demo-entry.tsx：トップの Services と Flow の間に入口セクション（「月末、この確認に時間を取られていませんか？」＋主ボタン「サンプルで確認作業を試す」＋架空データ注記）
- app.tsx に /demo ルート追加、header.tsx ナビに「体験デモ」（実例の後・ストアの前）

### 検証
- bun test 10件全合格（2026-09-20 再実行でも 10 pass / 0 fail）
- build 成功
- ブラウザ実機：照合実行→3カード・差額20,000円・請求確定でない注記／シナリオ切替3種（unavailable時に古い結果が消え安全停止の注記、handover時に手順見本5項目、通常復帰で結果復元）／メモ＝排他トグル（W9選択で他解除・逆も同様）・未選択は「未確認（未選択）」・金額を含まない・コピー成功表示・リセットで全解除＋メモ消去、すべて合格
- モバイル360px（Playwright＋実Chrome）：横スクロール・見切れなし、表はカード表示、結果カード縦積み、シナリオボタン縦並びで可読
- ※検証中に旧devサーバ（tmux website_4200、9/12起動）が残っていて古いモジュールを配信していた問題を発見。両セクション停止→新規1本に統一して解消（今後は tmux ls で多重起動を確認）

### 制約遵守（仕様書§2）
- 既存の料金・サービス・予約先は一切変更なし。変更はデモ追加＋ナビ/トップ入口のみ
- 「FDE」「回帰テスト」等の用語は主見出しに不使用／誇張表現なし／色だけに頼らない状態表示（バッジ文字併記）
- ※本番公開はユーザー承認まで実施しない（全変更はプレビューのみ、本番反映には再デプロイが必要）

## 第14回更新 (2026-09-20) サイト全体の整理整頓＋相談動線の強化
「全体的にみやすく」「相談したいと思わせる動線」がテーマ。コンテンツ（料金・サービス内容・実績表現）は変えず、構成・導線・モバイル対応を改善。

### セクション順の再編（ファネル順に）
旧: Hero→お悩み→支援内容→体験デモ→相談の流れ→強み→実例→ストア→セキュリティ→代表→FAQ→お問い合わせ
新: Hero→お悩み→【新】3つの入口→支援内容→体験デモ→実例→強み→セキュリティ→代表→ストア→相談の流れ→FAQ→お問い合わせ
- 共感(お悩み)→入口→支援内容→体験→証拠(実例)→強み→安心(セキュリティ)→人(代表)→別入口(ストア)→手順→疑問解消→行動、の流れ
- 「ご相談の流れ」を証拠群の後ろ・FAQ直前に移動（不安解消は行動の直前に置く構成）
- 背景色の交互リズムも全て隣接不一致になるよう調整（Flow を bg-washi-deep に変更）

### 新設「はじめての方へ ── 3つの入口」（sections/entry-router.tsx）
- お悩み直後に配置。①無料相談（初回45分・無料・オンライン、藍の主カード）②AI業務診断（約2分・無料、外部）③体験デモ（登録不要、/demo内部リンク）
- 迷った訪問者を3つの準備度別に振り分け。診断ツールが実例セクション埋もれから解放

### 相談ハードルを下げる具体情報の追加（事実のみ）
- ヒーロー補足に「初回45分・無料」を追加（オンライン・相談のみOKは既存）
- Flow STEP01 の注記を「約45分・費用: 無料」に
- Contact にチップ3個（初回45分／無料／オンライン・全国対応）＋「こんな話題で構いません」3例を追加

### モバイル対応
- ヘッダーの「無料相談」ボタンをモバイルでも常時表示（旧: sm以上のみ）。事務所名をモバイルで一段小さくして360px幅に収まることを確認
- 追従CTA（components/site/mobile-cta.tsx）新設：600px以上スクロールで下端に浮出、お問い合わせ・フッター表示中は自動で隠す、×で閉じられる、lg以上では非表示
- ナビを9項目→6項目に整理（支援内容／体験デモ／実例／ご相談の流れ／よくある質問／ストア）

### 検証
- build 成功。/demo・/store 両ページにJSエラーなし・新ナビ反映確認
- Playwright実機：セクション順・新ナビ・45分表記・入口カード・Contact話題例 すべて反映確認。360pxで横スクロールなし、ヘッダーCTA収まりOK、追従CTAの表示/非表示/閉じる動作OK
- bun run lint は packages/mobile のテンプレート規約エラー1件で失敗するが、これは8/9テンプレート生成時からの既存事項（今回の変更とは無関係・webの動作に影響なし）
- ※作業中に header.tsx / flow.tsx の編集がファイルシステムの同期競合で一度巻き戻る事象があった。全ファイルを再確認・再適用し、配信内容まで検証済み
- ※本番公開はユーザー承認まで実施しない（全変更はプレビューのみ、本番反映には再デプロイが必要）

## 第15回更新 (2026-09-24) G検定（JDLA Deep Learning for GENERAL 2026#5）合格ロゴの設置
代表が G検定に合格。JDLA公式ロゴ（添付zip）をレギュレーション遵守で3箇所に設置。

### レギュレーション確認（G_regulation_v1.1）
- 色変換禁止（CMYK 90/64/0/0厳守）・変形禁止・白抜き版は暗背景用
- アイソレーション（ロゴ周囲の保護エリアに他要素を入れない）→ 各設置箇所で余白を確保
- 変形・色変更・効果なし、公式PNGをそのまま使用（小型印刷物対応のsmall版をWeb用に採用）

### アセット
- packages/web/public/images/g-general-2026-5.png（Normal版 1200x731・透過）
- packages/web/public/images/g-general-2026-5-white.png（WhiteOnImage版・未使用だが暗背景用に保管）
- ※元ファイル名の「#」はURLのフラグメント識別子と衝突するためリネーム

### 設置箇所（権威性重視・表記は正式名称「JDLA Deep Learning for GENERAL 2026#5 合格」＋「一般社団法人ディープラーニング協会 主催」）
1. Hero：STATS直下に資格ストリップ新設（ロゴ h-11 + 合格表記。モバイルは縦積み中央揃え）
2. Profile代表カード：Google修了証ボックスの上にロゴバッジボックス新設（ロゴ h-14、白背景・border-line）
3. Footer左カラム：メールアドレス下にロゴ h-9 + 合格表記（小さめ）
- Security（暗背景）には敢えて置かず：同セクションは「第三者認証ではない」自己検証の正直な framing のため混在させない判断

### 検証
- build 成功（2 successful）。dev再起動後 /images/g-general-2026-5.png が 200
- Playwright実機（1440px/360px）：3箇所のロゴ表示・画像ロード完了・JDLA表記3箇所・協会名2箇所・横スクロールなし・コンソールエラーなし
- モバイルのReveal途中撮影で一瞬フェードに見えたが、opacity=1 を数値確認済み
- ※本番公開はユーザー承認まで実施しない（プレビューのみ）

## 第16回更新 (2026-09-25) 改善指示書による全面改修（仕上げ・最終検証）
ユーザー添付の改善指示書（homepage_improvement_prompt_kEDF-c.md 全15節）に基づく全面改修の最終セッション。6問の確認回答に基づき実装済みの内容を検証・修正し完了させた。

### 確定した方針（ユーザー回答）
- 料金：公開画面には「料金が変わる条件」「見積までの流れ」のみ。参考見積は非公開下書き（pricing-estimates.draft.tsx）
- 有料化境界：初回相談（45分）・見積提示まで無料。合意後の設計・制作から有料
- 継続・保守契約：任意（単発制作・納品のみも可）
- 相談資料：保護したクラウドに保存、閲覧は代表のみ
- 契約終了後データ：公開せず「ご契約時に取り決めます」表現に留める

### 本セッションの修正
- pricing.tsx：lead文の文字化け（U+FFFD×3）を「お見積り」に修復。編集ミスでSectionHeadingが二重化したのを検出し Python で残骸除去・完全修復
- security.tsx QA4：「未定です。公開前に確定させ…」→「返却・削除などの取り扱いは、ご契約時に取り決めます。ご希望は初回相談時にお聞かせください」
- faq.tsx Q7：同様に「未定」内部文言を除去→「契約終了後の取り扱いは、ご契約時に取り決めます」
- ソース全体をスイープ（U+FFFD・未定・確定させ・公開前に）→ CLEAN
- projects.tsx：月末確認デモカードの仮画像（ss-demosuite.webp流用）を /demo 実ページのスクリーンショット ss-getsumatsu-demo.webp（960x522）に差替え

### 検証（全合格）
- build 2 successful（複数回）
- check-widths.py：390px/768px/1366px すべて h1=2行・横スクロールなし（768pxの「みに。」孤立はmd用フォントサイズ追加で解消）
- verify-v3.py：PC・モバイルとも全文言チェック true、セクション順正しい、旧FAQ削除、console_errors なし
- 目視：pricing（お見積り表示）・FAQ Q7開閉・768pxヒーロー・制作例先頭カード新画像 すべて正常

### ユーザーへの申し送り（未対応・手動事項）
- Googleカレンダー予約ページの名称変更（推奨「山代業務改善事務所｜業務改善の初回無料相談（45分）」）はカレンダー側設定のため手動
- 予約完了は外部遷移のため未計測（手動集計の運用が必要）
- entry-router「3つの入口」は残置中（指示書に明示削除指示なし。削除するかはユーザー判断）
- 本番公開はユーザー承認まで実施しない

## 第16回追補 (2026-09-25) ヒーロー見出し変更
- h1を「見積・日報・転記の手間を、使える仕組みに。」→「あなたの現場に合う、業務改善を。」に変更（ユーザー指示）
- 改行が「業務改/善を。」と単語途中で切れたため、色付きspanにinline-blockを付与→「あなたの現場に合う、」/「業務改善を。」の2行で全幅（390/768/1366px）きれいに表示
- index.html の og:description も新見出しに合わせて更新
- build 2 successful、console errors 0、横スクロールなし

## 第17回更新 (2026-09-28) 三方良しの思想をサイトに組み込み
ユーザー添付「01_事業方針とサービス設計.md」（三方良しを活かすアイディア提案集 v1.1）から公開サイト向けの要素を選定して実装。

### 採用した要素（公開向け）
- 新セクション philosophy.tsx（id="philosophy"、配置=StrengthsとSecurityの間、bg-white）
- タイトル「三方良しの考え方」＋リードに提案書のキャッチ候補「仕事の困りごとを整理し、人と事業に無理のない、使える仕組みへ。」を採用（ヒーローh1はユーザー指定の「あなたの現場に合う、業務改善を。」を維持）
- 三方良し3カード：買い手良し（本当に必要か/既存の仕組みでも解決できるかから確認・新しく作らない結論も提案）／売り手良し（適正対価と工数・続けられる条件を見積段階で明確化）／世間良し（作業の押し付け・誤り増加を防ぐ、担当者が休んでも回る等の身近な変化）
- サブブロック「現場で大切にしている、3つの進め方」：必要な改善から始める／使う人の負担まで確かめる／お互いに続けられる範囲を決める（提案書の案A/B/C）

### 採用しなかった要素（サイト非公開が適切と判断）
- 採算・実工数など内部管理指標（6-2）、採否検討メモ表（10）、商品案の料金設計（5章）、営業メール関連（別資料03）
- サービス名称の変更（「三方良しの業務改善支援」等）は既存名称を維持

### 検証
- build 2 successful、console errors 0、1366/390px で横スクロールなし、全文言チェック合格、セクション順確認

## 第18回更新 (2026-10-01) FDE型リニューアル仕様書の要素を統合
ユーザー添付「yamashirogyomukaizen.com_追加仕様書（FDE型リニューアル）」PDFから、ユーザー確定方針に沿って要素を統合。トップページ現行構成を維持しつつFDE要素を追加。

### 確定方針（ユーザー回答より）
1. トップは現行維持＋FDE要素追加（全面作り替えではない）
2. 現行ブランド（和紙・ティール・Noto）維持、依頼票モチーフのみ採用。手書きフォント Klee One(weight600) は選択表示部のみ（font-hand、#2a3f95）
3. 確定済み料金を「◯円から」形式で公開（診断5万／AIルール3万／設計・試作+伴走 月15万／定着 月8万〜、全て税別）※料金非公開方針からの転換
4. 契約書類完備（NDA・業務委託基本契約書・個別契約書）の旨を提示
5. /partner ページは公開しない

### 実装
- 新規4セクション: fde-about(id=fde, 出張料理人のたとえ3カード) / moyamoya(id=moyamoya, 4タブ) / fde-experience(id=fde-experience, 聞く→作る→根づかせる3ステップ依頼票、サンプルデータ・判子0.5秒motion-safe・試算 M=H×r/Y=H×r×12・蛍光mark・成果保証しない注記) / fit-check(id=fit-check, 3問、はい2つ以上→FDE向き+CTA、以下→市販ツール)
- 新規ページ /service（MENUS 4件・含まれないもの明記・やること/お願い2列・継続契約は任意の注記・固有title/description）
- index.html: title/description/OG をFDE型に更新、Klee One追加、構造化データ JSON-LD（ProfessionalService + FAQPage 10問）
- faq.tsx: 3問追加（常駐しない／権利は個別契約書に明記／終了後は手順書と確認ルール）→計10問
- security.tsx: 契約書類QA追加 / pricing.tsx: lead変更・/serviceリンク追加 / header.tsx: ナビに「サービスと料金」追加（計5項目）
- セクション順: Hero→FdeAbout→Moyamoya→WorkExamples→DemoEntry→FdeExperience→Projects→Pricing→Flow→FitCheck→Profile→Strengths→Philosophy→Security→Services→EntryRouter→StoreSection→Faq→Contact
- 計測: taiken_start/taiken_step2/taiken_demo/taiken_stamp/fit_result/cta_booking(location: fde_experience|fit_check|service_page) — 同意granted時のみ（既存analytics.ts）

### バグ修正
- app.tsx に Service import 欠落、index.tsx に新規4コンポーネント import 欠落（"not defined"で描画崩壊）→ 両方修正

### 検証（.verify/verify-fde.py、23項目 ALL PASS）
- セクション順17件・FDE体験全フロー（問1→問2→試作1.1秒→4確認→判子「確認済」→試算 月10時間/年間120時間）・タブ切替・向きチェック両結果・/service 表示と固有title/description・JSON-LD 2種・FAQPage 10問・横スクロールなし(390/768/1366)・Klee One読込・console errors 0・sweep.py CLEAN・/demo /store /privacy 無事

### 見送り（仕様書にあるが実装しない）
- /industry、/seminar、/partner、自前相談フォーム（Googleカレンダー導線維持）、現場ノート、デモツール4つの公開

### 未対応
- OGP画像の更新（仕様書: ヒーロー見出し＋依頼票の1200×630画像。現行 /og-image.png のまま）
- 本番公開はユーザー承認まで実施しない

## 第19回更新 (2026-10-01) トップの費用セクションに料金目安を追加
ユーザー指摘「おおまかなプランと最低金額◯円〜がない」に対応。#pricing（ナビ「費用・流れ」の着地先）に金額を直接表示。
- 初回相談 0円（45分・無料・見積提示まで）のバナー追加
- 4プランカード追加: 棚卸し診断 50,000円〜／AI利用ルール 30,000円〜／設計・試作＋伴走 月額150,000円〜／定着サポート 月額80,000円〜（全て税別、/serviceと同一内容）
- 詳細（含まれないもの等）は /service へ誘導するリンク、継続契約は任意の注記
- 既存の要因4カードに小見出し「費用が変わる、4つの要因」追加、見積までの流れは維持
- 検証: build成功、価格4件+0円の表示確認、横スクロールなし(390/768/1366)、console errors 0

## 第20回更新 (2026-10-01) /service をNotebookLM資料のフレームで再構築
ユーザー添付画像「AIコンサルティングの契約・法務プロセスと単価設計の決定基準」（NotebookLM生成、実運用・料金と合致の確認済み）に基づき /service を全面作り替え。

### /service 新構成
- 段階別料金目安4カード: Defend（防御）5万〜8万円=現状維持・基盤強化 / Extend（拡張）15万〜18万円=業務の拡張・効率化 / Transform（転換）55万〜80万円=業務構造の抜本転換 / 月額固定 8万〜10万円=継続的な運用伴走支援
- 補足: 金額は目安・税抜表示・個別見積・見積提示まで無料・月額は任意（ユーザー指示）
- A/F比率1.5以上ブロック: 顧客の最良代替費用(A)≧1.5×料金(F) を価格設定の目安とし、見積提示時に根拠を説明する旨。代替費用の試算は目安で成果保証でない注記
- 9つの法務書類と運用フロー: 01受注前〜契約締結（NDA・見積書・発注請書・業務委託契約書・免責事項、ハルシネーション免責、フリーランス保護法第3条準拠）/ 02特約・覚書（AI特約=学習無効化・加工義務、DPA、オプトアウト設定）/ 03履行〜完了（検収書=みなし検収14日、業務完了報告書）
- 役割分担（やること/お願い）と予約CTAは維持
- meta description更新

### 整合のための連動修正
- トップ #pricing の4プランカードを旧メニュー（3万/5万/15万/8万）から段階別料金（5万〜8万/15万〜18万/55万〜80万/8万〜10万、税抜）に置換、leadも「目安（税抜）」表記に
- security「契約書類は整っていますか？」の回答を9文書版に更新
- FAQ「どこから有料になりますか？」を「契約書類を取り交わした後」「支払い条件は契約書類に明示」に更新、FAQPage JSON-LD も同期

### 検証
- build成功、verify-fde.py（/serviceチェックを新料金体系に更新）ALL PASS、console errors 0、横スクロールなし(/・/service、390/768/1366)、sweep.py CLEAN
- devサーバが古いモジュールを配信する事象あり（curlで確認）→ tmux再起動で解消。検証前にcurlで鮮度確認する手順を次回以降も使う

## 第21回更新 (2026-10-01) Googleマップをお問い合わせセクションに挿入
ユーザーのGoogleビジネスプロフィール共有リンク（maps.app.goo.gl/Bg7nEYxQw27YZS7Q7）を展開・確認し、#contact セクション下部にアクセスブロックを追加。
- links.ts: googleMaps（プロフィールへのリンク、クリーンURL化）と googleMapsEmbed 定数を追加
- レイアウト: 左に事務所名・住所（〒107-0061 東京都港区北青山1-3-3 三橋ビル3階）・オンライン対応の注記・「Googleマップで開く」ボタン（SVGピンアイコン、cta_mapsイベント）、右に地図iframe（2カラム→モバイル縦積み）
- 埋め込みURLの試行錯誤: q=事務所名&output=embed は世界地図で表示、cid=指定も同様に失敗 → q=住所（東京都港区北青山1-3-3 三橋ビル）&hl=ja&z=16 で正しい地点・ピン・日本語表記を確認
- iframe: loading=lazy, referrerPolicy=no-referrer-when-downgrade, title属性付き
- 絵文字📍はヘッドレス環境で豆腐になるためSVGアイコンに置換
- 検証: build成功、地図の表示地点確認、console errors 0、横スクロールなし(390/1366)、sweep.py CLEAN

## 第22回 (2026-10-10) 9s改善プロンプト対応【作業中】
「初見の中小企業・個人事業主が安心して相談に進める」ための文章・構成・導線の全面改修。

### 照合結果（事前レビュー指摘 × 現状）
1. ヒーロー抽象的 → 未解消。「あなたの現場に合う、業務改善を。」のまま → 4つの身近な変化を直下に追加
2. 困りごとより先にFDE説明・料理人たとえ・比較 → 未解消（Hero→FdeAbout→Moyamoya の順）→ セクション順を再編
3. 伴走説明の重複 → hero/fde-about/profile/strengths/services で重複 → 各所の役割を整理
4. 料金と成果物・期間・範囲の結びつき弱い → 未解消 → プランカード拡充＋共通注記
5. 実運用事例が弱い → 未解消（全てデモ）→ 架空事例は作らず管理者向け入力ひな型を docs/ に用意
6. 45分以外の軽い入口がない → 未解消 → mailtoテンプレ付き事前問い合わせ入口（送信基盤=APIパッケージ不在のためフォームは見せかけない）
7. 代表デモが月末確認に偏る → 未解消（demo-entry が月末のみ）→ 困りごと選択式4デモに改修
8. /service の専門用語・契約書類が重い → 未解消 → 日本語主表記・A/F比率と9文書を折りたたみに格下げ・安心材料を先に

### 新セクション順
Hero→Worries(新設)→WorkExamples→Projects→DemoEntry→Services→Pricing→FdeAbout→Profile→Strengths→Philosophy→Flow→FdeExperience→FitCheck→Moyamoya→Security→StoreSection→Faq→Contact
（EntryRouter は重複のため削除）

### 実施内容（第22回・完了）
- hero.tsx: h1維持＋4つの変化リスト（CHANGES）。主ボタン「無料相談を予約する」／副ボタン「改善例とデモを見る」(#projects)。「初回45分・無料／オンライン対応／相談のみでも可」
- index.tsx: セクション順を上記に再編。entry-router.tsx 削除（役割重複）
- fde-about.tsx: 利点3点（MERITS）を先に。操作説明・手順書は制作費込み注記。FDE英語説明＋出張料理人たとえは `<details>` に格下げ
- pricing.tsx: プランを日本語主表記（英語名はsub）＋fit/works/deliverables。BOUNDARIES「無料と有料の境界」4項目追加。費用変動4要因・見積流れは維持
- demo-entry.tsx: 困りごと選択式4カード（誰向け/体験できること/導入時に調整）。外部リンクは表記＋注記。末尾に無料相談導線
- contact.tsx: QUICK_MAIL（mailto＋3記入欄テンプレ、encodeURIComponent）。「45分の相談はまだ早い方へ」ブロック。ACCESS注記をオンライン基本に統一
- service.tsx: TIERS日本語主表記＋fit/works/deliverables/detail。BOUNDARIES・ASSURANCES 4項目。9文書3段階とA/F比率は `<details>` 2件に格下げ。meta更新
- store.tsx: 個別支援との違い3行リスト追加（招待制は維持）
- projects.tsx: leadにデモ一覧への誘導1文追加
- header.tsx: NAV先頭を「業務の例(#work-examples)」に
- faq.tsx: Q1「よくある例」表現＋メール確認導線、Q6に手順書込み追記、Q8オンライン基本に統一
- index.html: title/description/OG更新。FAQPage JSON-LD（Q1/Q6/Q8）をfaq.tsxに同期
- moyamoya.tsx: 「どのやり方にも合う場面があります」（他職種一括否定の回避）
- docs/case-study-template.md 新設（管理者向け事例ひな型、非公開）
- 背景交互の整合: work-examples白/services plain/strengths白/philosophy washi-deep/flow白

### 検証（第22回）
- bun run build: 2 successful
- verify-fde.py: 45項目 ALL PASS（セクション順18/18、FDE体験・タブ・fit-check、hero 4変化/主副ボタン、contact mailto、demo 4困りごと、pricing日本語表記+境界、fde折りたたみ開閉、/service details開いて9文書・A/F比率検証、JSON-LD、FAQPage 10問、横スクロールなし390/768/1366）
- sweep.py CLEAN、/demo /store /privacy /service すべて200、console errors 0
- スクリーンショット目視確認済み（/tmp/9s-{pc,sp}-*.png、表示崩れなし）

### 残課題（第22回時点）
- OGP画像未更新（旧来の課題）
- Googleカレンダー予約画面の6確認項目は外部サービスのため手動設定が必要
- 事例は実例確認後に docs/case-study-template.md で追加
- 管理者の事実確認待ち: 各プランの期間目安・修正範囲・別途費用・対象外作業の具体値、メール返信目安の掲載可否、オンライン/訪問の対応範囲の確定
