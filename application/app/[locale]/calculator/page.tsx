import CalculatorClient from "./calculator-client";
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

interface CalculatorPageProps {
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
    ...generateToolMetadata(locale, "calculator", t.calculator, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "calculator",
          t.calculator,
          t.common
        ),
        generateFAQStructuredData(t.calculator.faqList || []),
      ]),
    },
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <CalculatorClient locale={locale} t={t} />;
}
