import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";
import ChartGeneratorClient from "./chart-generator-client";

interface ChartGeneratorPageProps {
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
    ...generateToolMetadata(
      locale,
      "chart-generator",
      t.chartGenerator,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "chart-generator",
          t.chartGenerator,
          t.common
        ),
      ]),
    },
  };
}

export default async function ChartGeneratorPage({
  params,
}: ChartGeneratorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <ChartGeneratorClient locale={locale} t={t} />;
}
