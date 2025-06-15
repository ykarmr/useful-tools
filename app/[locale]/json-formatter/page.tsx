import JsonFormatterClient from "./json-formatter-client";
import { getTranslations, isValidLocale, getAlternates, getSupportedLocales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import {
  generateToolStructuredData,
  generateFAQStructuredData,
} from "@/lib/structured-data";

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}
interface JsonFormatterPageProps {
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
      "json-formatter",
      t.jsonFormatter,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "json-formatter",
          t.jsonFormatter,
          t.common
        ),
        generateFAQStructuredData(t.jsonFormatter.faqList || []),
      ]),
    },
  };
}

export default async function JsonFormatterPage({
  params,
}: JsonFormatterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <JsonFormatterClient locale={locale} t={t} />;
}
