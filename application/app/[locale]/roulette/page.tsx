import RouletteClient from "./roulette-client";
import { getTranslations, isValidLocale, getAlternates, getSupportedLocales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}
interface RoulettePageProps {
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
    ...generateToolMetadata(locale, "roulette", t.roulette, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(locale, "roulette", t.roulette, t.common),
      ]),
    },
  };
}

export default async function RoulettePage({ params }: RoulettePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <RouletteClient locale={locale} t={t} />;
}
