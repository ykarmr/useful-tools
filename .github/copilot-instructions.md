# copilot-instruction

## 全体のディレクトリ構成

- `application/` - Next.js アプリケーションのルートディレクトリ
- tools/ - 各種ツールの機能ページを格納するディレクトリ
  - 現在は画像生成ツールのみ

## コーディング規約

- コードは日本語でコメントを記述すること
- 各ページは i18n 対応をすること
  - `/locales`に言語ごとの翻訳ディレクトリを配置する
    - 機能追加や修正時には、全ての言語の翻訳ファイル更新すること
    - 言語ファイルは型ファイルを先に定義し、型安全にすること
      - `locales/types/*.ts` に型を定義
- 各機能ページは以下のコンポーネントを参考に実装すること
  - `app/[locale]/calculator/calculator-client.tsx`
  - `app/[locale]/calculator/page.tsx`
  - `app/[locale]/coin-flip/coin-flip-client.tsx`
  - `app/[locale]/coin-flip/page.tsx`
- レスポンシブデザインを意識し、モバイルファーストで実装すること
- マージンとパディングを考慮して、適切なスペーシングを確保すること
- style は tailwindcss を使用すること
- 各ページのメタデータは `generateMetadata` 関数を使用して定義すること
- 各ページのルーティングは `app/[locale]/[feature]/page.tsx` の形式で定義すること
- 各ページのクライアントサイドのロジックは `app/[locale]/[feature]/[機能名]-client.tsx` に記述すること
- SEO に配慮し、各ページのタイトル、説明、キーワードを設定すること
- アクセシビリティを考慮し、適切な ARIA 属性を使用すること
- 各ページのアイコンは `lucide-react` を使用すること
- 各ページのレイアウトは `components/layout` 以下のコンポーネントを使用すること
- 各機能ページのメインレイアウトは `components/layout/tool-layout.tsx` を使用すること
- 各機能ページのセクションは `components/layout/tool-section.tsx` を使用すること
- 各機能ページの表示部分は `components/layout/tool-display.tsx` を使用すること
- 各機能ページの結果表示は `components/layout/tool-result.tsx` を使用すること
- 各機能ページの入力コントロールは `components/layout/tool-input.tsx` と `components/layout/tool-controls.tsx` を使用すること
- 各機能ページの統計情報は `components/layout/tool-stats.tsx` を使用すること
- 各機能ページの FAQ セクションは `components/layout/tool-faq.tsx` を使用すること
- 広告表示は `components/layout/ad-banner.tsx` を使用すること
- 静的資材は `public` ディレクトリに配置すること
- グローバルスタイルは `app/globals.css` に記述すること
- PWA 対応のため、`app/manifest.ts` を作成し、必要なメタデータを定義すること
- `app/robots.ts` を作成し、robots.txt を生成すること
- `app/sitemap.ts` を作成し、サイトマップを生成すること
- `next.config.js` の output: "export" を設定すること
- 永続保持するデータは、クライアントサイドでのローカルストレージやセッションストレージを使用すること

## ページとルーティング

### ルートページ

- `app/[locale]/page.tsx`
  - アプリケーションのルートページを定義

### サービス一覧ページ

- `app/[locale]/services/page.tsx`
  - サービス一覧ページを定義
- `app/[locale]/services/services-client.tsx`
  - サービス一覧のクライアントコンポーネント
  - `toolCategories` 配列でツールをカテゴリ別に管理
  - カテゴリ: productivity（生産性）, random（ランダム）, time（時間）, network（ネットワーク・Web）, textContent（テキスト・コンテンツ）, converter（コンバーター）, health（健康）, code（コード）

### 機能ページ（ツール）

現在実装されているツール：

- `app/[locale]/bmi-calculator/` - BMI 計算ツール
- `app/[locale]/calculator/` - 電卓ツール
- `app/[locale]/coin-flip/` - コイン投げツール
- `app/[locale]/color-palette/` - カラーパレットツール
- `app/[locale]/dice-roller/` - サイコロツール
- `app/[locale]/digital-clock/` - デジタル時計ツール
- `app/[locale]/html-escape/` - HTML エスケープツール
- `app/[locale]/image-converter/` - 画像変換ツール
- `app/[locale]/ip-address/` - IP アドレス取得ツール
- `app/[locale]/json-formatter/` - JSON 整形ツール
- `app/[locale]/markdown-preview/` - Markdown プレビューツール
- `app/[locale]/pet-age-conversion/` - ペット年齢変換ツール
- `app/[locale]/pomodoro-timer/` - ポモドーロタイマーツール
- `app/[locale]/qr-generator/` - QR コード生成ツール
- `app/[locale]/random-number/` - 乱数生成ツール
- `app/[locale]/random-string/` - ランダム文字列生成ツール
- `app/[locale]/roulette/` - ルーレットツール
- `app/[locale]/scoreboard/` - スコアボードツール
- `app/[locale]/subnet-calculator/` - サブネット計算ツール
- `app/[locale]/team-generator/` - チーム生成ツール
- `app/[locale]/text-statistics/` - テキスト統計ツール
- `app/[locale]/timer/` - タイマーツール
- `app/[locale]/todo/` - TODO リストツール
- `app/[locale]/unit-conversion/` - 単位変換ツール
- `app/[locale]/url-analyzer/` - URL 解析ツール
- `app/[locale]/url-encoder/` - URL エンコーダーツール
- `app/[locale]/user-agent/` - User-Agent 取得ツール
- `app/[locale]/world-clock/` - 世界時計ツール

### 機能ページ

- `app/[locale]/[feature]/page.tsx`
  - 特定の機能ページを定義

### 問い合わせページ

- `app/[locale]/contact/page.tsx`
  - 問い合わせページを定義

### 規約ページ

- `app/[locale]/terms/page.tsx`
  - 規約ページを定義

### プライバシーポリシーページ

- `app/[locale]/privacy/page.tsx`
  - プライバシーポリシーページを定義

#### 機能ページの構成

機能ページは以下の構成で実装する：

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

#### クライアントコンポーネントの構成

クライアントサイドのロジックは `app/[locale]/[feature]/[機能名]-client.tsx` に記述：

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



  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.[機能名].title}
      description={t.[機能名].description}
      icon={[アイコン名]}
    >
      {/* メインコンテンツ（必要な数だけセクションは増やしてOK） */}
      <ToolSection>

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

### 型定義ファイル (`locales/types/`)

- `locales/types/common.ts`
  - 共通の翻訳キーの型を定義
- `locales/types/ad.ts`
  - 広告関連の翻訳キーの型を定義
- `locales/types/faq.ts`
  - FAQ 関連の翻訳キーの型を定義
- `locales/types/footer.ts`
  - フッターの翻訳キーの型を定義
- `locales/types/header.ts`
  - ヘッダーの翻訳キーの型を定義
- `locales/types/pages/`
  - 各ページの翻訳キーの型を定義
  - `contact.ts`, `privacy.ts`, `services.ts`, `terms.ts`
- `locales/types/pages/tools/`
  - 各ツールの翻訳キーの型を定義
  - `calculator.ts`, `coin-flip.ts`, `[機能名].ts` など
- `locales/types/index.ts`
  - 全ての型定義をまとめる

### 言語ファイル (`locales/[言語]/`)

- `locales/[言語]/common.ts`
  - 共通の翻訳キーを定義
- `locales/[言語]/ad.ts`
  - 広告関連の翻訳キーを定義
- `locales/[言語]/footer.ts`
  - フッターの翻訳キーを定義
- `locales/[言語]/header.ts`
  - ヘッダーの翻訳キーを定義
- `locales/[言語]/pages/`
  - 各ページの翻訳キーを定義
  - `contact.ts`, `home.ts`, `privacy.ts`, `services.ts`, `terms.ts`
- `locales/[言語]/pages/tools/`
  - 各ツールの翻訳キーを定義
  - `calculator.ts`, `coin-flip.ts`, `[機能名].ts` など
- `locales/[言語]/index.ts`
  - 各言語の翻訳ファイルをまとめる

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
   - `public/ogp/[機能名].png` を作成
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
