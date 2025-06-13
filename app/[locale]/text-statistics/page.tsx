import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import TextStatisticsClient from "./text-statistics-client";

interface TextStatisticsPageProps {
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
    title: `${t.textStatistics.title} | ${t.common.siteTitle}`,
    description: t.textStatistics.description,
    keywords: t.textStatistics.keywords || [],
    openGraph: {
      title: t.textStatistics.title,
      description: t.textStatistics.description,
      url: `${baseUrl}/${locale}/text-statistics`,
    },
    alternates: getAlternates(locale, "/text-statistics"),
  };
}

export default async function TextStatisticsPage({
  params,
}: TextStatisticsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <TextStatisticsClient locale={locale} t={t} />;
}
