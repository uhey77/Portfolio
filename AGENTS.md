# AGENTS.md

このファイルは、このリポジトリで作業するCodex（Codex.ai/code）向けのガイドです。

## プロジェクト概要

Astro 5、Tailwind CSS v4、TypeScriptで構築された、日本語・英語対応の個人ポートフォリオサイトです。Cloudflare Workersの `https://portfolio.yuheiyamada.workers.dev` にデプロイされています。

## コマンド

- `task dev` — 開発サーバーを起動（localhost:4321、ホットリロード対応）
- `task build` — 本番用サイトを `dist/` にビルド
- `task preview` — 本番用サイトをビルドしてローカルで確認
- `task deploy` — Wranglerの認証を確認し、ビルドしてCloudflare Workersへデプロイ
- `task deploy:dry-run` — 公開せずにビルドとCloudflareへのデプロイ内容を検証

テストランナーとリンターは設定されていません。

## アーキテクチャ

- **Astro 5**：`src/pages/` のファイルベースルーティングを使用する静的サイト
- **i18n**：Astro組み込みのi18nルーティングを使用し、`astro.config.mjs` でロケール `ja`（デフォルト）と `en`、`prefixDefaultLocale: false` を設定しています。日本語版は `/`、英語版は `/en/` で配信し、`public/_redirects` により旧 `/ja` ルートを `/` へ恒久的にリダイレクトします。
- **ページ**：`src/pages/index.astro` と `src/pages/en/index.astro` は、`<PortfolioPage lang="…" />` を表示する薄いラッパーです。ページの全マークアップは `src/components/PortfolioPage.astro` にあります。
- **コンテンツはマークアップではなくデータで管理**：
  - `src/i18n/translations.ts` — ロケールごとのUI文言。`src/i18n/types.ts` の `PortfolioTranslations` で型付け
  - `src/data/portfolio.ts` — 学歴、職歴、受賞歴、論文、ソーシャルリンク。多言語フィールドには `LocalizedText`（`Record<Locale, string>`）を使用
  - 新しい項目は `.astro` のマークアップではなく、これらのファイルへ追加してください。
- **レイアウト**：単一の `Layout.astro` が全ページをラップし、メタタグ、canonical、`hreflang` 代替リンク（`getAbsoluteLocaleUrl` を使用）、Google Fonts（Inter、Noto Sans JP）、グローバルCSSを設定
- **コンポーネント**：`Navbar.astro`（レスポンシブ対応、`lang` プロパティ、`getRelativeLocaleUrl` による言語切替）、`Timeline.astro`（学歴・職歴・受賞歴で共用するタイムライン）、`ContactForm.astro`、`Footer.astro`
- **お問い合わせフォーム**：`PUBLIC_CONTACT_FORM_ENDPOINT`（`.env.example` を参照）へ送信します。未設定の場合、フォームを無効化し、未設定であることを示すメッセージを表示します。
- **スタイル**：`@tailwindcss/vite` プラグイン経由でTailwind CSS v4を使用。カスタムスタイルは `src/styles/global.css`（グラデーション、ナビゲーションのぼかし効果、カードの影）に定義
- **クライアント側JavaScript**：モバイルメニューの切替とスクロール連動ナビゲーションにVanilla DOM操作のみを使用し、JavaScriptフレームワークは使用していません。

## デプロイ

Cloudflare Workers Static Assetsのデプロイ設定は `wrangler.jsonc` にあります。Cloudflare Buildsでは `npm run build` と `npx wrangler deploy` を使用し、手動デプロイには `task deploy` を使用します。

**重要な設定**：`astro.config.mjs` では `site: 'https://portfolio.yuheiyamada.workers.dev'` と `base: '/'` を設定しています。`public/_redirects` には、Cloudflare Workers Static Assetsがネイティブに処理するリダイレクトを定義しています。

`PUBLIC_CONTACT_FORM_ENDPOINT` は、同名のCloudflare Builds変数からビルド時に注入されます。`.env` はGitの管理対象外であり、この値はコミットしません。
