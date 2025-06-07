import CoinFlipClient from "./coin-flip-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";

interface CoinFlipPageProps {
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
    title: `${t.coinFlip.title} | ${t.common.siteTitle}`,
    description: t.coinFlip.description,
    keywords: t.coinFlip.keywords || [],
    openGraph: {
      title: t.coinFlip.title,
      description: t.coinFlip.description,
      url: `${baseUrl}/${locale}/coin-flip`,
    },
    alternates: getAlternates(locale, "/coin-flip"),
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
