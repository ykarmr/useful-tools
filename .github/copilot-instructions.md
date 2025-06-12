# copilot-instruction

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

## ページとルーティング

### ルートページ

- `app/[locale]/page.tsx`
  - アプリケーションのルートページを定義

### サービス一覧ページ

- `app/[locale]/services/page.tsx`
  - サービス一覧ページを定義

### 機能ページ

- `app/[locale]/[feature]/page.tsx`
  - 特定の機能ページを定義

#### 機能ページの構成

機能ページは以下の構成で実装する：

```tsx
import [機能名]Client from "./[機能名]-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";

interface [機能名]PageProps {
  params: Promise<{ locale: string }>;
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

## サイトマップ

- `app/sitemap.ts`
  - サイトマップを定義

## 言語ファイルの構成

- `locales/[types]/common.ts`
  - 共通の翻訳キーを定義
- `locales/[types]/index.ts`
  - 各言語の翻訳ファイルをまとめる
- `locales/[types]/tools.ts`
  - 各ツールの翻訳キーを定義
- `locales/[言語]/pages.ts`
  - 各ページの翻訳キーを定義
- `locales/[言語]/common.ts`
  - 共通の翻訳キーを定義
- `locales/[言語]/[機能名].ts`
  - 各画面特有の翻訳キーを定義
- `locales/[言語]/index.ts`
  - 各言語の翻訳ファイルをまとめる

## 注意事項

- 実装する前に方針の確認を行うこと
- セクション毎に内容の確認を行うこと
