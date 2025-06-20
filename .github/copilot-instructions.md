# Copilot Instructions

## プロジェクト概要

このプロジェクトは、さまざまな便利ツールを提供する Next.js ベースの Web アプリケーションです。

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

## 開発規約とガイドライン

### コメントとドキュメント

- **コードコメントは日本語で記述する**
- 各機能の目的と動作を明確にドキュメント化する

### 国際化（i18n）対応

- **全てのページで多言語対応を実装する**
- サポート言語：日本語（ja）、英語（en）、スペイン語（es）、ロシア語（ru）、中国語（zh）
- 翻訳ファイルの場所：`application/locales/`
- **機能追加・修正時は全言語の翻訳ファイルを更新すること**
- **型安全性を確保するため、翻訳キーの型定義を先に作成する**
  - 型定義：`application/locales/types/`

### 参考実装

以下のコンポーネントを参考に新機能を実装する：

- `app/[locale]/calculator/calculator-client.tsx`
- `app/[locale]/calculator/page.tsx`
- `app/[locale]/coin-flip/coin-flip-client.tsx`
- `app/[locale]/coin-flip/page.tsx`

### UI/UX ガイドライン

- **レスポンシブデザイン**：モバイルファーストで実装
- **スタイリング**：Tailwind CSS を使用
- **スペーシング**：適切なマージンとパディングを設定
- **アイコン**：lucide-react を使用
- **アクセシビリティ**：適切な ARIA 属性を設定

### SEO と最適化

- `generateMetadata`関数でページメタデータを定義
- タイトル、説明、キーワードを適切に設定
- OGP 画像は`public/`ディレクトリに配置

### データ永続化

- **ローカルストレージまたはセッションストレージを使用**
- サーバーサイドでのデータ保存は行わない

## ページ構成とルーティング

### ルートページ

- `app/[locale]/page.tsx` - アプリケーションのホームページ

### サービス一覧ページ

- `app/[locale]/services/page.tsx` - サービス一覧ページ
- `app/[locale]/services/services-client.tsx` - サービス一覧のクライアントコンポーネント

**ツールカテゴリ管理**
`toolCategories`配列でツールをカテゴリ別に管理：

- **productivity**（生産性ツール）
- **random**（ランダム生成ツール）
- **time**（時間関連ツール）
- **network**（ネットワーク・Web 関連ツール）
- **textContent**（テキスト・コンテンツ処理ツール）
- **converter**（変換ツール）
- **health**（健康関連ツール）
- **code**（コード関連ツール）

### 実装済みツール一覧

#### 生産性ツール（Productivity）

- `app/[locale]/calculator/` - 電卓ツール
- `app/[locale]/todo/` - TODO リストツール
- `app/[locale]/scoreboard/` - スコアボードツール

#### ランダム生成ツール（Random）

- `app/[locale]/coin-flip/` - コイン投げツール
- `app/[locale]/dice-roller/` - サイコロツール
- `app/[locale]/random-number/` - 乱数生成ツール
- `app/[locale]/random-string/` - ランダム文字列生成ツール
- `app/[locale]/roulette/` - ルーレットツール
- `app/[locale]/team-generator/` - チーム生成ツール

#### 時間関連ツール（Time）

- `app/[locale]/digital-clock/` - デジタル時計ツール
- `app/[locale]/pomodoro-timer/` - ポモドーロタイマーツール
- `app/[locale]/timer/` - タイマーツール
- `app/[locale]/world-clock/` - 世界時計ツール

#### ネットワーク・Web 関連ツール（Network）

- `app/[locale]/ip-address/` - IP アドレス取得ツール
- `app/[locale]/subnet-calculator/` - サブネット計算ツール
- `app/[locale]/url-analyzer/` - URL 解析ツール
- `app/[locale]/url-encoder/` - URL エンコーダーツール
- `app/[locale]/user-agent/` - User-Agent 取得ツール

#### テキスト・コンテンツ処理ツール（Text Content）

- `app/[locale]/html-escape/` - HTML エスケープツール
- `app/[locale]/json-formatter/` - JSON 整形ツール
- `app/[locale]/markdown-preview/` - Markdown プレビューツール
- `app/[locale]/text-statistics/` - テキスト統計ツール

#### 変換ツール（Converter）

- `app/[locale]/image-converter/` - 画像変換ツール
- `app/[locale]/qr-generator/` - QR コード生成ツール
- `app/[locale]/unit-conversion/` - 単位変換ツール

#### 健康関連ツール（Health）

- `app/[locale]/bmi-calculator/` - BMI 計算ツール
- `app/[locale]/pet-age-conversion/` - ペット年齢変換ツール

#### デザイン・UI 関連ツール（Design）

- `app/[locale]/color-palette/` - カラーパレットツール

### 静的ページ

- `app/[locale]/contact/` - お問い合わせページ
- `app/[locale]/terms/` - 利用規約ページ
- `app/[locale]/privacy/` - プライバシーポリシーページ

## 機能ページの実装パターン

### サーバーコンポーネント（page.tsx）

各機能ページのサーバーコンポーネントは以下のパターンで実装する：

```tsx
import [機能名]Client from "./[機能名]-client";
import { getTranslations, isValidLocale, getSupportedLocales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";

interface [機能名]PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  return {
    title: `${t.[機能名].title} | ${t.common.siteTitle}`,
    description: t.[機能名].description,
    keywords: t.[機能名].keywords || [],
    openGraph: {
      title: t.[機能名].title,
      description: t.[機能名].description,
      url: `${baseUrl}/${locale}/[機能名]`,
    },
    alternates: getAlternates(locale, "[機能名]"),
  };
}

export default async function [機能名]Page({
  params,
}: [機能名]PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <[機能名]Client locale={locale} t={t} />;
}
```

### クライアントコンポーネント（\*-client.tsx）

クライアントサイドのロジックは以下のパターンで実装する：

```tsx
"use client";

import { useState } from "react";
import { [アイコン名] } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";

interface [機能名]ClientProps {
  locale: Locale;
  t: Translations;
}

export default function [機能名]Client({ locale, t }: [機能名]ClientProps) {
  // ステート管理
  // 機能ロジック

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.[機能名].title}
      description={t.[機能名].description}
      icon={[アイコン名]}
    >
      {/* メインコンテンツセクション */}
      <ToolSection>
        {/* ツールの入力・表示・操作要素 */}
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.[機能名].faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
```

## プロジェクト構造とファイル配置

### アプリケーション構造

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

### コンポーネント構造

```
components/
├── theme-provider.tsx - テーマプロバイダー
├── layout/
│   ├── ad-banner.tsx - 広告バナー
│   ├── footer.tsx - フッター
│   ├── header.tsx - ヘッダー
│   ├── main-layout.tsx - メインレイアウト
│   ├── tool-controls.tsx - ツール操作コントロール
│   ├── tool-display.tsx - ツール表示部分
│   ├── tool-faq.tsx - FAQ セクション
│   ├── tool-input.tsx - ツール入力部分
│   ├── tool-layout.tsx - ツール用メインレイアウト
│   ├── tool-result.tsx - ツール結果表示
│   ├── tool-section.tsx - ツールセクション
│   └── tool-how-to-use.tsx - ツールの使い方セクション
│   └── tool-stats.tsx - ツール統計情報
└── ui/ - shadcn/ui コンポーネント
```

### ライブラリとユーティリティ

```
lib/
├── const.ts - 定数定義
├── i18n.ts - 国際化関連ユーティリティ
└── utils.ts - 共通ユーティリティ関数

hooks/
├── use-mobile.tsx - モバイル検出フック
└── use-toast.ts - トースト通知フック
```

## サイトマップ

- `app/sitemap.ts`
  - サイトマップを定義

## 言語ファイルの構成

### 型定義ファイル（`locales/types/`）

- `locales/types/common.ts` - 共通の翻訳キーの型を定義
- `locales/types/ad.ts` - 広告関連の翻訳キーの型を定義
- `locales/types/faq.ts` - FAQ 関連の翻訳キーの型を定義
- `locales/types/footer.ts` - フッターの翻訳キーの型を定義
- `locales/types/header.ts` - ヘッダーの翻訳キーの型を定義
- `locales/types/pages/` - 各ページの翻訳キーの型を定義
  - `contact.ts`, `privacy.ts`, `services.ts`, `terms.ts`
- `locales/types/pages/tools/` - 各ツールの翻訳キーの型を定義
  - 29 個のツール用型定義ファイル（`calculator.ts`, `coin-flip.ts`など）
  - `home.ts`（ホームページ用）
- `locales/types/index.ts` - 全ての型定義をまとめる

### 言語ファイル（`locales/[言語]/`）

- `locales/[言語]/common.ts` - 共通の翻訳キーを定義
- `locales/[言語]/ad.ts` - 広告関連の翻訳キーを定義
- `locales/[言語]/footer.ts` - フッターの翻訳キーを定義
- `locales/[言語]/header.ts` - ヘッダーの翻訳キーを定義
- `locales/[言語]/pages/` - 各ページの翻訳キーを定義
  - `contact.ts`, `home.ts`, `privacy.ts`, `services.ts`, `terms.ts`
- `locales/[言語]/pages/tools/` - 各ツールの翻訳キーを定義
  - `calculator.ts`, `coin-flip.ts` など（全 29 ツール分）
- `locales/[言語]/index.ts` - 各言語の翻訳ファイルをまとめる

## 開発ワークフロー

### 新機能追加時の手順

1. **型定義の作成**

   - `locales/types/pages/tools/[機能名].ts` に型定義を追加
   - `locales/types/index.ts` に型をエクスポート

2. **翻訳ファイルの作成**

   - 全ての言語（ja, en, es, ru, zh）に翻訳ファイルを作成
   - `locales/[言語]/pages/tools/[機能名].ts`
   - `locales/[言語]/index.ts` に翻訳をエクスポート

3. **ページコンポーネントの作成**

   - `app/[locale]/[機能名]/page.tsx` - サーバーコンポーネント
   - `app/[locale]/[機能名]/[機能名]-client.tsx` - クライアントコンポーネント

4. **サービス一覧画面への追加**

   - `app/[locale]/services/services-client.tsx` の `toolCategories` 配列に新しいツールを追加
   - 適切なカテゴリ（productivity, random, time, network, textContent, converter, health, code）に配置
   - ツールのキー、アイコン、href を設定
   - 例：
     ```tsx
     {
       key: "textContent",
       tools: [
         // ...existing tools...
         { key: "newTool", icon: NewIcon, href: "/new-tool" },
       ],
     }
     ```

5. **サイトマップの更新**

   - `app/sitemap.ts` に新しいページを追加

6. **OGP 画像の作成**
   - `public/images/ogp/pages/ogp-[機能名]-[言語名].png` を作成
   - OGP 画像はツールのタイトルと説明を含むデザインにする
   - tools ディレクトリの USAGE.md を参考にする

### コンポーネント使用例

```tsx
// ツールレイアウトの基本構成
<ToolLayout
  locale={locale}
  t={t}
  title={t.[機能名].title}
  description={t.[機能名].description}
  icon={[アイコン名]}
>
  {/* How To Use セクション */}
  <ToolSection>
    {/* ツールの使い方を説明するコンテンツ */}
    <ToolHowToUse
      title={t.[機能名].howToUse.title}
      steps={t.[機能名].howToUse.steps}
      features={{
        title: t.[機能名].features.title,
        items: t.[機能名].features.items,
      }}
    />
  </ToolSection>
  {/* メイン機能セクション */}
  <ToolSection>
    <ToolDisplay>
      {/* 結果表示エリア */}
    </ToolDisplay>
    <ToolInput>
      {/* 入力フォーム */}
    </ToolInput>
    <ToolControls>
      {/* 操作ボタン */}
    </ToolControls>
  </ToolSection>

  {/* 統計情報セクション（必要に応じて） */}
  <ToolSection>
    <ToolStats>
      {/* 統計データ */}
    </ToolStats>
  </ToolSection>

  {/* 結果セクション（必要に応じて） */}
  <ToolSection>
    <ToolResult>
      {/* 処理結果 */}
    </ToolResult>
  </ToolSection>

  {/* FAQ セクション */}
  <ToolSection>
    <ToolFaq faqList={t.[機能名].faqList} t={t} />
  </ToolSection>
</ToolLayout>
```

## 注意事項

- 実装する前に方針の確認を行うこと
- セクション毎に内容の確認を行うこと
- ブラウザ内の機能のみで完結するツールを実装すること
- API Route(/api)は使用しないこと
- `useEffect`の使用は最小限に抑えること
- `application/components/ui/toast.tsx`は使用しないこと
- このアプリのサイト名は USEFUL TOOLS であることを忘れないこと
- 機能の修正をした際は、How To Use セクションと FAQ セクションの内容も更新すること
- css のクラス名は、Tailwind CSS のユーティリティクラスを使用すること
- contact, terms, privacy ページは、同じ系統のレイアウトにすること
- tools ページは、同じ系統のレイアウトにすること
- 自然な文章になるように作成すること
- 18n 対応を忘れないこと
- Apple 製のアプリ のようなシンプルで洗練されたユーザフレンドリーなデザインを目指すこと
- SEO とアクセシビリティに配慮すること
- ツールの使い方や特徴を明確に伝えること
- ツールの操作方法や結果の解釈を分かりやすく説明すること
- ツールの目的や使用シーンを明確にする
- ユーザーが直感的に操作できるようにすること
- レスポンシブデザインを意識し、モバイルファーストで実装すること
- 個人情報に関するデータは参照していないです。
- お知らせの配信は行わないこと
- データの取得は Google Analytics 以外の外部サービスを使用しないこと
- 個人で制作しているプロジェクトであることを明記すること
- 機能修正時に、規約とプライバシーポリシーの更新が必要な場合は、必ず行うこと
- 翻訳ガイドラインに従って、各言語の翻訳を行うこと
- meta 情報の設定は Google Search Console のガイドラインに従うこと

## 翻訳ガイドライン

- 機械的な直訳は避けてください
- 指定言語のネイティブスピーカーが違和感なく理解できる自然な文章にしてください
- Web アプリに適した簡潔で明快な命令文または中立的な説明文にしてください
- 文体・語順・トーンは、対象言語の Web アプリスタイルガイドに従ってください

【スタイルガイド（参照規格）】

- 日本語原文：JTF 日本語スタイルガイド／Microsoft 日本語スタイルガイド（UI 用）
- 英語翻訳：Microsoft Writing Style Guide／Google Developer Style Guide
- ロシア語翻訳：Яндекс Главред UX ガイド／ГОСТ 7.0.97（翻訳品質基準）
- 中国語翻訳（簡体字）：百度翻译风格指南／GB/T 19363.1-2008（国家標準）
- スペイン語翻訳：Fundéu スタイルガイド／欧州委員会 Style Guide (Spanish)

【トーンと文体】

- トーン：丁寧だが簡潔で中立的（不要に堅苦しくせず、明快に）
- 文体：命令文または簡潔な説明文（例：「○○ してください」→「○○」）
