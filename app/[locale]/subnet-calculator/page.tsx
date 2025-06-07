import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";
import SubnetCalculatorClient from "./subnet-calculator-client";

interface SubnetCalculatorPageProps {
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
    title: `${t.subnetCalculator.title} | ${t.common.siteTitle}`,
    description: t.subnetCalculator.description,
    keywords: t.subnetCalculator.keywords || [],
    openGraph: {
      title: t.subnetCalculator.title,
      description: t.subnetCalculator.description,
      url: `${baseUrl}/${locale}/subnet-calculator`,
    },
    alternates: getAlternates(locale, "/subnet-calculator"),
  };
}

export default async function SubnetCalculatorPage({
  params,
}: SubnetCalculatorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <SubnetCalculatorClient locale={locale} t={t} />;
}
