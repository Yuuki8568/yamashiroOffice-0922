# 山代業務改善事務所 — Design System

## Positioning
個人ポートフォリオではなく「事務所のサービスサイト」。士業事務所に近い誠実さ・清潔感。
ターゲット: 中小企業経営者・個人事業主（40〜60代想定、スマホ閲覧多め）。
最重要ゴール: 見やすさ・わかりやすさ・「頼んでみたい」と思わせること。

## Color Palette (Light base)
- `--washi`: #F7F5F0 — 和紙のようなオフホワイト背景
- `--washi-deep`: #EFECE4 — セクション交互背景
- `--sumi`: #1C2B3A — 濃紺（本文・見出し）
- `--sumi-soft`: #4A5A6A — サブテキスト
- `--shu`: #B93A26 — 深い朱色（アクセント・CTA。唯一のアクセント色）
- `--shu-dark`: #9C2F1D — CTA hover
- `--line`: #DCD7CC — 罫線
- White cards: #FFFFFF with subtle border, very soft shadow

Accent is used ONLY for: CTA buttons, section eyebrow labels, key numbers, hanko-style accents. Never large surfaces.

## Typography
- Headings: "Noto Serif JP" (600/700) — 事務所らしい品格
- Body: "Noto Sans JP" (400/500/700) — 可読性
- Self-hosted via fontsource packages. Line-height 1.9 for body paragraphs (Japanese text), 1.4 for headings.
- Eyebrow labels: small, letter-spacing 0.2em, shu color, with short rule line.

## Layout & Components
- Max width 1080px content column. Generous vertical padding (py-24 desktop / py-16 mobile).
- Alternating washi / washi-deep section backgrounds. Subtle vertical hairline motif (和風の縦罫).
- Hanko (印鑑) motif: square vermillion seal with 「山代」 as logo mark.
- Cards: white, 1px line border, rounded-lg (8px, not overly round), soft shadow on hover.
- Flow diagram: 4 numbered steps with connecting line, numbers in serif.
- FAQ: accordion, plus/minus, generous padding.
- CTA block: sumi (dark navy) band with white text + shu button — appears mid-page and at end.
- Header: sticky, washi/95 blur, logo left (hanko + 縦書き風 wordmark horizontal), nav center, CTA button right. Mobile: hamburger sheet.

## Motion
- One staggered reveal on scroll per section (IntersectionObserver + CSS). Subtle: translateY 16px + fade, 500ms.
- No parallax, no marquee (現行サイトのマーキーは廃止). Calm and trustworthy.

## Tone of copy
- 誇張禁止・事実ベース。専門用語は平易に。体験談風NG。数字は現行サイト記載の事実のみ。
- 料金は載せない。「ヒアリング後にお見積り／相談だけでもOK」。

## Pages
- `/` one-page: Hero → お悩み共感 → ご相談の流れ(4step) → 強み4つ → プロジェクト実例2件 → セキュリティ54項目 → 代表プロフィール → FAQ(7問) → お問い合わせ → Footer
- Legal: /privacy /terms /tokusho /disclaimer /cookie — shared LegalLayout, 事業者名「山代 悠生（屋号: 山代業務改善事務所）」
