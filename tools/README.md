# 画像アセット生成ツール

このツールは、Useful Toolsアプリケーション用の多言語対応ロゴ、ファビコン、OGP画像を自動生成するTypeScriptベースのツールです。

## 機能

- 🎨 **多言語対応ロゴ生成**: 日本語、英語、中国語、スペイン語、ロシア語対応
- ⭐ **ファビコン生成**: 各種サイズのファビコン、ICOファイル、Apple Touch Icon、PWAアイコン
- 🖼️ **OGP画像生成**: ソーシャルメディア用の美しいOGP画像
- 🌐 **完全自動化**: 一つのコマンドですべての言語・サイズの画像を生成

## インストール

```bash
cd tools
npm install
```

## 使用方法

### すべての画像アセットを生成

```bash
npm run dev
# または
npm run generate:all
```

### 個別生成

```bash
# ロゴのみ生成
npm run generate:logo

# ファビコンのみ生成
npm run generate:favicon

# OGP画像のみ生成
npm run generate:ogp
```

### ビルド後に実行

```bash
npm run build
npm start
```

## 生成される画像

### ロゴ
- `../public/images/logo/logo-ja.png` - 日本語版ロゴ
- `../public/images/logo/logo-en.png` - 英語版ロゴ
- `../public/images/logo/logo-zh.png` - 中国語版ロゴ
- `../public/images/logo/logo-es.png` - スペイン語版ロゴ
- `../public/images/logo/logo-ru.png` - ロシア語版ロゴ
- `../public/images/logo/logo.png` - デフォルトロゴ（英語版）

### ファビコン
- `../public/images/favicon/favicon-16x16.png` - 16×16px
- `../public/images/favicon/favicon-32x32.png` - 32×32px
- `../public/images/favicon/favicon-48x48.png` - 48×48px
- ... その他各サイズ
- `../public/images/favicon/favicon.ico` - ICOファイル
- `../public/images/favicon/apple-touch-icon.png` - Apple Touch Icon
- `../public/images/favicon/pwa/icon-*.png` - PWA用アイコン

### OGP画像
- `../public/images/ogp/ogp-ja.png` - 日本語版OGP画像
- `../public/images/ogp/ogp-en.png` - 英語版OGP画像
- ... その他各言語
- `../public/images/ogp/ogp.png` - デフォルトOGP画像

## 設定のカスタマイズ

### 色の変更
`src/config/index.ts`の`COLORS`オブジェクトを編集：

```typescript
export const COLORS = {
  primary: '#3B82F6',    // メインカラー
  secondary: '#8B5CF6',  // セカンダリカラー
  // ...
};
```

### 言語の追加・変更
`src/config/index.ts`の`LOCALES`オブジェクトを編集：

```typescript
export const LOCALES: Record<string, LocaleConfig> = {
  ja: {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
    title: '便利ツール',
    subtitle: '日常の作業を効率化',
    description: '...'
  },
  // 新しい言語を追加
};
```

### サイズの変更
`src/config/index.ts`の`SIZES`オブジェクトを編集：

```typescript
export const SIZES = {
  logo: { width: 512, height: 512 },
  ogp: { width: 1200, height: 630 },
  favicon: { sizes: [16, 32, 48, 64, 96, 128, 192, 256, 512] }
};
```

## 技術スタック

- **TypeScript**: 型安全性とコード品質の向上
- **Canvas API**: ロゴとOGP画像の動的生成
- **Sharp**: 高性能な画像処理とリサイズ
- **Node.js**: サーバーサイド実行環境

## ファイル構造

```
tools/
├── src/
│   ├── config/
│   │   └── index.ts          # 設定ファイル（色、言語、サイズ等）
│   ├── generators/
│   │   ├── logo-generator.ts    # ロゴ生成クラス
│   │   ├── favicon-generator.ts # ファビコン生成クラス
│   │   └── ogp-generator.ts     # OGP画像生成クラス
│   ├── utils/
│   │   └── index.ts          # ユーティリティ関数
│   └── index.ts              # メインエントリーポイント
├── package.json
├── tsconfig.json
└── README.md
```

## 開発・拡張

### 新しいジェネレーターの追加

1. `src/generators/`に新しいジェネレータークラスを作成
2. `src/index.ts`にインポートとコマンドを追加
3. `package.json`のscriptsにコマンドを追加

### デザインの変更

各ジェネレーターの描画メソッドを編集して、デザインをカスタマイズできます：

- ロゴ: `LogoGenerator.drawBaseLogo()`
- OGP画像: `OgpGenerator.drawBackground()`, `OgpGenerator.drawText()`

## トラブルシューティング

### Canvasのインストールエラー
```bash
# macOS
brew install pkg-config cairo pango libpng jpeg giflib librsvg

# Ubuntu/Debian
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# CentOS/RHEL
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
```

### Sharpのインストールエラー
```bash
npm install --platform=darwin --arch=x64 sharp
```

## ライセンス

MIT License
