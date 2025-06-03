import MarkdownPreviewClient from "./markdown-preview-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

interface MarkdownPreviewPageProps {
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
    title: t.markdownPreview.title,
    description: t.markdownPreview.description,
    keywords: t.markdownPreview.keywords || [],
    openGraph: {
      title: t.markdownPreview.title,
      description: t.markdownPreview.description,
      url: `${baseUrl}/${locale}/markdown-preview`,
    },
    alternates: getAlternates(locale, "/markdown-preview"),
  };
}

export default async function MarkdownPreviewPage({
  params,
}: MarkdownPreviewPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <MarkdownPreviewClient locale={locale} t={t} />;
}
