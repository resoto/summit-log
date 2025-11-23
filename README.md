# Summit Log - 登山ログアプリ

Cloudflare Workers上で動作する登山記録アプリケーションです。

## 特徴

- 🏔️ 登山記録の管理（山名、日付、標高、メモ）
- 📊 統計情報の表示（総登山回数、総獲得標高、最高到達点）
- 💾 LocalStorageによるデータ永続化
- 🎨 プレミアムなダークモードデザイン
- ⚡ Cloudflare Workersで高速動作

## 技術スタック

- **フレームワーク**: [Hono](https://hono.dev/)
- **デプロイ**: Cloudflare Workers
- **スタイリング**: Vanilla CSS（グラスモーフィズム、アニメーション）
- **データ保存**: LocalStorage（クライアントサイド）

## セットアップ

### 必要な環境

- Node.js 16以上
- npm

### インストール

```bash
npm install
```

### ローカル開発

```bash
npm run dev
```

ブラウザで http://localhost:8787 にアクセスしてください。

### デプロイ

```bash
npm run deploy
```

## プロジェクト構成

```
woe/
├── src/
│   ├── index.tsx       # メインアプリケーション
│   ├── assets.ts       # 静的アセット（CSS/JS）
│   ├── views/
│   │   └── layout.tsx  # レイアウトコンポーネント
│   ├── styles.css      # CSSファイル（参照用）
│   └── client.js       # クライアントサイドJS（参照用）
├── package.json
├── wrangler.toml       # Cloudflare Workers設定
└── tsconfig.json       # TypeScript設定
```

## 機能

### ダッシュボード
- 総登山回数
- 総獲得標高
- 最高到達点

### 登山を記録
- 山名
- 日付
- 標高（メートル）
- メモ

### 履歴
- 過去の登山記録一覧
- 日付と標高の表示
- メモの閲覧

## ライセンス

MIT
