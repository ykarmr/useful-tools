import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import BaseConverterClient from "./base-converter-client";

interface BaseConverterPageProps {
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
    title: `${t.baseConverter.title} | ${t.common.siteTitle}`,
    description: t.baseConverter.description,
    keywords: t.baseConverter.keywords || [],
    openGraph: {
      title: t.baseConverter.title,
      description: t.baseConverter.description,
      url: `${baseUrl}/${locale}/base-converter`,
    },
    alternates: getAlternates(locale, "base-converter"),
  };
}

export default async function BaseConverterPage({
  params,
}: BaseConverterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <BaseConverterClient locale={locale} t={t} />;
}
