import DigitalClockClient from "./digital-clock-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

interface DigitalClockPageProps {
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
    title: `${t.digitalClock.title} | ${t.common.siteTitle}`,
    description: t.digitalClock.description,
    keywords: t.digitalClock.keywords || [],
    openGraph: {
      title: t.digitalClock.title,
      description: t.digitalClock.description,
      url: `${baseUrl}/${locale}/digital-clock`,
    },
    alternates: getAlternates(locale, "/digital-clock"),
  };
}

export default async function DigitalClockPage({
  params,
}: DigitalClockPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <DigitalClockClient locale={locale} t={t} />;
}
