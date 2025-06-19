# 画像アセット生成ツールの使用方法

## 必要な依存関係のインストール

```bash
cd tools
npm install
```

## 基本的な使用方法

### 1. すべての画像アセットを一括生成
```bash
cd tools
npm run dev
```

### 2. 個別コンポーネントの生成
```bash
# ロゴのみ
npm run generate:logo

# ファビコンのみ
npm run generate:favicon

# OGP画像のみ（メイン画像）
npm run generate:ogp

# 全ページのOGP画像を一括生成
npm run generate:ogp-all
```

### 3. 特定言語のみ生成

```bash
# 日本語のみ全ページOGP画像を生成
npm run cli ogp-all -- -l ja

# 英語のみ全ページOGP画像を生成
npm run cli ogp-all -- -l en
```

## 生成される画像の説明

### ロゴ（512×512px PNG）

- 各言語版のロゴが生成されます
- プライマリブルーのグラデーション背景
- 歯車アイコンと言語固有のタイトル文字
- 出力先: `../application/public/images/logo/`

### ファビコン（複数サイズ）

- 16px から 512px まで各サイズのPNG
- favicon.ico ファイル
- Apple Touch Icon（180×180px）
- PWAアイコンセット（72px〜512px）
- 出力先: `../application/public/images/favicon/`

### OGP画像（1200×630px PNG）

- ソーシャルメディア用の美しいOGP画像
- グラデーション背景とブランドカラー
- 各言語のタイトル、サブタイトル、説明文
- ロゴアイコンと装飾要素
- メインサイト用OGP画像: `../application/public/images/ogp/`
- 各ページ用OGP画像: `../application/public/images/ogp/pages/`

## カスタマイズ

### 色の変更

`src/config/index.ts` の `COLORS` オブジェクトを編集

### 言語の追加

`src/config/index.ts` の `SUPPORTED_LOCALES` と `FALLBACK_LOCALES` を編集

### サイズの変更

`src/config/index.ts` の `SIZES` オブジェクトを編集

## 注意点

- このツールはNext.jsアプリとは独立して動作します
- 生成された画像は自動的に `../application/public/images/` ディレクトリに保存されます
- `generate:ogp-all` コマンドは全ツールページと静的ページのOGP画像を生成します
