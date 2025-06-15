import { getTranslations, isValidLocale, getAlternates, getSupportedLocales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";
import PetAgeConversionClient from "./pet-age-conversion-client";

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}
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
    ...generateToolMetadata(
      locale,
      "pet-age-conversion",
      t.petAgeConversion,
      t.common
    ),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "pet-age-conversion",
          t.petAgeConversion,
          t.common
        ),
      ]),
    },
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
