import type { Metadata } from "next";
import { getTranslations, isValidLocale, getAlternates } from "@/lib/i18n";
import UrlAnalyzerClient from "./url-analyzer-client";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";
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
    ...generateToolMetadata(locale, "url-analyzer", t.urlAnalyzer, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "url-analyzer",
          t.urlAnalyzer,
          t.common
        ),
      ]),
    },
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
