# Cloudflare移行手順

対象: `Yuuki8568/yamashiroOffice-0922` / 山代業務改善事務所ホームページ

## 構成と移行範囲

- フロントエンド: React + Vite。`packages/web/dist` をWorkers Static Assetsで配信。
- サーバー: Cloudflare Workerで既存の `/api/health` と `/api/rpc/*` を提供。Bunの常駐サーバー・PM2は不要。
- DB: スキーマは空で、ホームページからのDB呼び出しなし。今回の移行にDBやDB認証情報は不要。
- 予約: 既存のGoogleカレンダー予約リンク。問い合わせ: 既存のmailtoリンク。
- `/demo`: ブラウザ内の固定サンプル照合・確認メモ。サーバーに送信・保存しない。
- 写真・ロゴ・OGP・画面画像: リポジトリ内の画像を配信。
- 計測: 同意後に読み込む既存のGA4を維持。Runableの計測スクリプトと編集用ランタイムを除去。
- インストール対象: webだけ。元テンプレートのmobile/desktopは資料として残すが公開しない。

**ホームページ本体の独立と、リンク先の別アプリの独立は別作業です。**

| リンク先 | 現在のURL | 今回の扱い |
|---|---|---|
| 案件整理デモ | https://yamashi-itbomyl.runable.site/ | 既存リンクを維持。別プロジェクトのコードが必要 |
| シフト工房 | https://app-nah86it.runable.site/ | 既存リンクを維持。別プロジェクトのコードが必要 |
| AI適性診断 | https://ai-gyoumu-shindan.pages.dev/ | 既存リンクを維持 |
| ストア・ブログ・予約 | `packages/web/src/web/lib/links.ts` 参照 | 各外部サービスを継続 |

Runable解約・削除前に、上記2アプリを移すか公開終了するか決めてください。

## ローカル確認

Node.js 22以降とBun 1.3.14を使用します。

```bash
bun install --frozen-lockfile
bun run build:cloudflare
bun run test:web
bun run check:cloudflare
bun run dev:cloudflare
```

ビルドはフロントエンド・Worker・Vite設定のTypeScriptチェックを含みます。
`check:cloudflare` はアップロードしないdry-runです。
`dev:cloudflare` のローカルURLで、以下の各ページを直接開いて再読み込みします。

`/`、`/service`、`/store`、`/demo`、`/privacy`、`/terms`、`/tokusho`、`/disclaimer`、`/cookie`

`/api/health` は `{"status":"ok"}`、未定義の `/api/*` は404を返す構成です。

## 先に仮URLへ公開

CloudflareのWorkers & PagesからGitHubリポジトリを接続し、次を設定します。

| 項目 | 値 |
|---|---|
| リポジトリ | `Yuuki8568/yamashiroOffice-0922` |
| Worker名 | `yamashiro-office` |
| 初回のデプロイブランチ | `feat/cloudflare-independent` |
| ルートディレクトリ | リポジトリルート（空欄または `/`） |
| ビルドコマンド | `bun run build:cloudflare` |
| デプロイコマンド | `bun run deploy:cloudflare` |
| Bunのバージョン | `1.3.14`（必要ならビルド変数 `BUN_VERSION` に設定） |
| アプリ実行用シークレット | 不要 |

依存インストールにはリポジトリの `bun.lock` を使用します。
CLIからの公開は、対象Cloudflareアカウントで認証後に `bun run deploy:cloudflare` です。
APIトークンをソース・GitHub・チャットに書き込まないでください。

最初は発行されたworkers.dev URLで確認します。URLは公開結果から取得し、推測しません。
`_headers` によりworkers.devには `X-Robots-Tag: noindex` が付きます。
これは検索除外の指定であり、認証・アクセス制限ではありません。
公開ホームページなので、Cockpit用のOwner only制限はこのサイトに適用しません。

確認項目:

1. 上記9ページの直接アクセス・再読み込み、画像・日本語フォント。
2. スマホ幅でのメニュー・無料相談ボタン・デモ操作。
3. 予約ボタンのリンク先とメール宛先（実予約・実送信は確認に不要）。
4. Cookie同意前にGoogleタグが読み込まれず、同意後に既存GA4へ接続すること。
5. `runable.js`、`r.lilstts.com`、`collector.onedollarstats.com` への自動通信がないこと。
6. 上記の別Runableアプリ2件は、クリックした場合に外部サイトとして開くこと。

## 本番ドメインの切り替え

仮URLの確認が済んだ後に行います。`wrangler.jsonc` に本番ドメインを自動登録する設定は入れていません。

1. 現行のDNSレコードとRunable公開先を記録し、戻せる状態を作る。
2. Workerの Settings → Domains & Routes → Add → Custom domain で `yamashirogyomukaizen.com` を設定する。
3. 同じホストに既存のCNAMEがある場合は競合するため、そのレコードだけを記録してから置き換える。実際のDNS構成を確認して作業する。
4. `www` を現在使用している場合は、その設定・転送動作も確認して引き継ぐ。
5. HTTPS、主要ページ、予約・メール導線を本番URLでも確認する。
6. 本番ホストに `X-Robots-Tag: noindex` が付いていないことを確認する。

メール用MX・SPF/DKIM等のTXT、`cockpit` のDNS/Worker/Access設定は、ホームページの切り替え対象に含めません。
ネームサーバーを入れ替える移行ではありません。
切り替え後も、安定確認と別デモの移行が済むまでは旧Runableプロジェクトを残します。

## 戻し方と更新運用

- 初回の切り替えで問題が起きた場合: 新しいホームページ用Custom Domainを外し、記録した元のDNS設定を復元する。
- Cloudflare稼働後の更新で問題が起きた場合: Deploymentsから確認済みの直前バージョンへ戻す。
- GitHubの移行ブランチを公開元に使い、移行完了後にPRをmainへ統合してCloudflare側の公開ブランチも合わせる。
- 同時期にRunableからmainへ書き戻す場合は競合に注意し、独立版の変更を上書きしない。

## 今回の検証記録（2026-10-18）

- TypeScriptチェック・Cloudflare用Viteビルド: 成功。
- 既存のデモ照合・確認メモのテスト: 10件成功。
- Wranglerによるデプロイdry-run: 成功。実アップロードは未実施。
- 公開成果物: Runableの計測先・編集SDKのコードが含まれないことを確認。
- `runable.js` はキャッシュ済みHTMLから呼ばれた場合に備え、通信しないコメントのみのファイルに変更。
- ローカルWorkerの起動: この作業環境のネットワークインターフェース取得エラーにより未完了。
- Cloudflareの仮URLでの画面確認・DNS切り替え・本番確認: Cloudflareへのログイン後に実施。

## 公式資料

- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/workers/static-assets/headers/
- https://developers.cloudflare.com/workers/ci-cd/builds/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
