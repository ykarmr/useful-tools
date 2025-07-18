import DigitalClockClient from "./digital-clock-client";
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

interface DigitalClockPageProps {
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
    ...generateToolMetadata(locale, "digital-clock", t.digitalClock, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "digital-clock",
          t.digitalClock,
          t.common
        ),
      ]),
    },
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
