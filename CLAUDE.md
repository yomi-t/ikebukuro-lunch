# ikebukuro-lunch

池袋でのランチ投票アプリ。Next.js (App Router) + Firebase (クライアント SDK) の静的サイトを Cloudflare Workers (Static Assets) で配信する。

## コマンド

- `npm run dev` — 開発サーバー
- `npm run build` — 静的エクスポート (`out/` に出力)
- `npm run lint` — ESLint (flat config: `eslint.config.mjs`)
- `npx tsc --noEmit` — 型チェック
- `npm run preview` — ビルドして `wrangler dev` でローカル確認
- `npm run deploy` — ビルドして `wrangler deploy`
- `npm run plop` — コンポーネント雛形の生成
- `npm run tcm` — CSS Modules の型定義 (`*.module.css.d.ts`) を watch 生成

## 構成

- `src/app/` — ルート。ページは `/` のみ
- `src/components/{ui,common,features,pages}/<Name>/` — `index.ts` / `<Name>.tsx` / `style.module.css` の 3 点セット。新規作成は `npm run plop`
- `src/model/` — Firestore の読み書きとフック (`restaurant`, `user`, `votingStatus`, `auth`)
- `src/data/` — 型定義。`src/context/` — React Context。`src/libs/firebase.ts` — Firebase 初期化
- スタイルは CSS Modules。`*.module.css.d.ts` は生成物なので `tcm` で更新する

## デプロイ

- `next.config.mjs` で `output: "export"` を指定している。サーバー機能 (API Route、Server Actions、`next/headers`、`next/image` の最適化など) は使えない
- `wrangler.jsonc` が `out/` を配信し、存在しないパスは `404.html` を返す
- Firebase の `NEXT_PUBLIC_*` はビルド時に埋め込まれる。Workers Builds では「ビルド変数」に設定する (実行時変数では反映されない)
- ローカルは `.env` (未追跡) を使う。**`.env` の中身をコミット・出力・外部送信しない**

## 規約

- Prettier: セミコロンなし、`printWidth` 120、`trailingComma: none`、`singleAttributePerLine`
- ESLint の `react-hooks/exhaustive-deps` と `react-hooks/set-state-in-effect` は意図的にオフ
- TypeScript は 6 系に固定 (typescript-eslint が 7 に未対応)。7 へ上げない
- コミットメッセージは `add:` / `change:` / `fix:` / `chore:` の接頭辞 + 簡潔な説明
- `AGENTS.md` は `next dev` が自動生成するため管理対象外

## Git

- `origin` は moyotsukai/ikebukuro-lunch、`yomi` は yomi-t/ikebukuro-lunch。push 先はユーザーに確認する
