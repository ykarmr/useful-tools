import DataConverterClient from "./data-converter-client";
import {
  getTranslations,
  isValidLocale,
  getAlternates,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import {
  generateToolStructuredData,
  generateFAQStructuredData,
} from "@/lib/structured-data";

interface DataConverterPageProps {
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
      "data-converter",
      t.dataConverter,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "data-converter",
          t.dataConverter,
          t.common
        ),
        generateFAQStructuredData(t.dataConverter.faqList),
      ]),
    },
  };
}

export default async function DataConverterPage({
  params,
}: DataConverterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <DataConverterClient locale={locale} t={t} />;
}
