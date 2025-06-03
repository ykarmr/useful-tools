import CalculatorClient from "./calculator-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

interface CalculatorPageProps {
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
    title: t.calculator.title,
    description: t.calculator.description,
    keywords: t.calculator.keywords || [],
    openGraph: {
      title: t.calculator.title,
      description: t.calculator.description,
      url: `${baseUrl}/${locale}/calculator`,
    },
    alternates: getAlternates(locale, "/calculator"),
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
