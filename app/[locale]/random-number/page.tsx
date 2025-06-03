import RandomNumberClient from "./random-number-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAlternates } from "@/lib/getLocaleMapping";

interface RandomNumberPageProps {
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
  const baseUrl = "https://useful-tools.vercel.app";

  return {
    title: t.randomNumber.title,
    description: t.randomNumber.description,
    keywords: t.randomNumber.keywords || [],
    openGraph: {
      title: t.randomNumber.title,
      description: t.randomNumber.description,
      url: `${baseUrl}/${locale}/random-number`,
    },
    alternates: getAlternates(locale, "/random-number"),
  };
}

export default async function RandomNumberPage({
  params,
}: RandomNumberPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <RandomNumberClient locale={locale} t={t} />;
}
