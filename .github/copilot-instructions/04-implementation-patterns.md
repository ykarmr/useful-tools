# 04-implementation-patterns.md

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