import {
  getTranslations,
  isValidLocale,
  getSupportedLocales,
} from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import AgeCalculatorClient from "./age-calculator-client";

interface AgeCalculatorPageProps {
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
    title: `${t.ageCalculator.title} | ${t.common.siteTitle}`,
    description: t.ageCalculator.description,
    keywords: t.ageCalculator.keywords || [],
    openGraph: {
      title: t.ageCalculator.title,
      description: t.ageCalculator.description,
      url: `${baseUrl}/${locale}/age-calculator`,
    },
    alternates: getAlternates(locale, "age-calculator"),
  };
}

export default async function AgeCalculatorPage({
  params,
}: AgeCalculatorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <AgeCalculatorClient locale={locale} t={t} />;
}
