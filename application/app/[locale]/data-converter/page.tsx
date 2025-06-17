import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import DataConverterClient from "./data-converter-client";

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
    title: `${t.dataConverter.title} | ${t.common.siteTitle}`,
    description: t.dataConverter.description,
    keywords: t.dataConverter.keywords || [],
    openGraph: {
      title: t.dataConverter.title,
      description: t.dataConverter.description,
      url: `${baseUrl}/${locale}/data-converter`,
    },
    alternates: getAlternates(locale, "data-converter"),
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
