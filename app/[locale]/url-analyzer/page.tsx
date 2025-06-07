import type { Metadata } from "next";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import ToolLayout from "@/components/layout/tool-layout";
import UrlAnalyzerClient from "./url-analyzer-client";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  return {
    title: `${t.urlAnalyzer.title} | ${t.common.siteTitle}`,
    description: t.urlAnalyzer.description,
    keywords: t.urlAnalyzer.keywords || [],
    openGraph: {
      title: t.urlAnalyzer.title,
      description: t.urlAnalyzer.description,
      url: `${baseUrl}/${locale}/url-analyzer`,
    },
    alternates: getAlternates(locale, "/url-analyzer"),
  };
}

export default async function UrlAnalyzerPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <UrlAnalyzerClient locale={locale} t={t} />;
}
