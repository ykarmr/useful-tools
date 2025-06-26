# プロジェクトのディレクトリ構成

このファイルでは、プロジェクトのディレクトリ構成やファイル配置について詳しく説明します。

## 全体のディレクトリ構成

```
useful-tools/
├── application/         # Next.jsアプリケーションのルートディレクトリ
│   ├── app/             # Next.js App Routerのページとレイアウト
│   ├── components/      # Reactコンポーネント
│   ├── hooks/           # カスタムReactフック
│   ├── lib/             # ユーティリティとライブラリ
│   ├── locales/         # 国際化（i18n）の翻訳ファイル
│   └── public/          # 静的ファイル
└── tools/               # 開発用CLIツール
```

## アプリケーション構造

```
app/
├── globals.css - グローバルスタイル
├── layout.tsx - ルートレイアウト
├── manifest.ts - PWAマニフェスト
├── robots.ts - robots.txt生成
├── sitemap.ts - サイトマップ生成
└── [locale]/
    ├── layout.tsx - 多言語対応レイアウト
    ├── page.tsx - ルートページ
    ├── services/ - サービス一覧ページ
    ├── contact/ - 問い合わせページ
    ├── terms/ - 利用規約ページ
    ├── privacy/ - プライバシーポリシーページ
    └── [各ツール]/ - 機能ページ
```

## コンポーネント構造

```
components/
├── theme-provider.tsx - テーマプロバイダー
├── layout/
│   ├── ad-banner.tsx - 広告バナー
│   ├── footer.tsx - フッター
│   ├── header.tsx - ヘッダー
│   ├── main-layout.tsx - メインレイアウト
│   ├── tool-display.tsx - ツール表示部分
│   ├── tool-faq.tsx - FAQ セクション
│   ├── tool-layout.tsx - ツール用メインレイアウト
│   ├── tool-section.tsx - ツールセクション
│   └── tool-how-to-use.tsx - ツールの使い方セクション
│   └── tool-stats.tsx - ツール統計情報
└── ui/ - shadcn/ui コンポーネント
```

## ライブラリとユーティリティ

```
lib/
├── const.ts - 定数定義
├── i18n.ts - 国際化関連ユーティリティ
└── utils.ts - 共通ユーティリティ関数

hooks/
├── use-mobile.tsx - モバイル検出フック
└── use-toast.ts - トースト通知フック
```

## 注意事項

- プロジェクトのディレクトリ構成は、機能の拡張やメンテナンスを容易にするために設計されています。
- 各ディレクトリには、特定の機能や役割に応じたファイルが配置されています。