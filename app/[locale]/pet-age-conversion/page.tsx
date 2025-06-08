import { getTranslations, isValidLocale, getAlternates } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import PetAgeConversionClient from "./pet-age-conversion-client";

interface PetAgePageProps {
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
    title: `${t.petAgeConversion.title} | ${t.common.siteTitle}`,
    description: t.petAgeConversion.description,
    keywords: t.petAgeConversion.keywords || [],
    openGraph: {
      title: t.petAgeConversion.title,
      description: t.petAgeConversion.description,
      url: `${baseUrl}/${locale}/pet-age-conversion`,
    },
    alternates: getAlternates(locale, "/pet-age-conversion"),
  };
}

export default async function PetAgeConversionPage({
  params,
}: PetAgePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <PetAgeConversionClient locale={locale} t={t} />;
}
