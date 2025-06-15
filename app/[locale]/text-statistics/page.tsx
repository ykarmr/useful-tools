import { getTranslations, isValidLocale, getAlternates } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";
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
    ...generateToolMetadata(
      locale,
      "text-statistics",
      t.textStatistics,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "text-statistics",
          t.textStatistics,
          t.common
        ),
      ]),
    },
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
