import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import UnitConversionClient from "./unit-conversion-client";

interface TodoPageProps {
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
    title: `${t.unitConversion.title} | ${t.common.siteTitle}`,
    description: t.unitConversion.description,
    keywords: t.unitConversion.keywords || [],
    openGraph: {
      title: t.unitConversion.title,
      description: t.unitConversion.description,
      url: `${baseUrl}/${locale}/unit-conversion`,
    },
    alternates: getAlternates(locale, "/unit-conversion"),
  };
}

export default async function UnitConversionPage({ params }: TodoPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <UnitConversionClient locale={locale} t={t} />;
}
