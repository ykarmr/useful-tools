import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import BmiCalculatorClient from "./bmi-calculator-client";

interface BmiCalculatorPageProps {
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
    title: `${t.bmiCalculator.title} | ${t.common.siteTitle}`,
    description: t.bmiCalculator.description,
    keywords: t.bmiCalculator.keywords || [],
    openGraph: {
      title: t.bmiCalculator.title,
      description: t.bmiCalculator.description,
      url: `${baseUrl}/${locale}/bmi-calculator`,
    },
    alternates: getAlternates(locale, "bmi-calculator"),
  };
}

export default async function BmiCalculatorPage({
  params,
}: BmiCalculatorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <BmiCalculatorClient locale={locale} t={t} />;
}
