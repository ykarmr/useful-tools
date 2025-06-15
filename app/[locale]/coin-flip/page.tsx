import CoinFlipClient from "./coin-flip-client";
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
import { generateToolStructuredData } from "@/lib/structured-data";

interface CoinFlipPageProps {
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
    ...generateToolMetadata(locale, "coin-flip", t.coinFlip, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(locale, "coin-flip", t.coinFlip, t.common),
      ]),
    },
  };
}

export default async function CoinFlipPage({ params }: CoinFlipPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <CoinFlipClient locale={locale} t={t} />;
}
