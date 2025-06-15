import QrGeneratorClient from "./qr-generator-client";
import { getTranslations, isValidLocale, getAlternates } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";

interface QrGeneratorPageProps {
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
    ...generateToolMetadata(locale, "qr-generator", t.qrGenerator, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(
          locale,
          "qr-generator",
          t.qrGenerator,
          t.common
        ),
      ]),
    },
  };
}

export default async function QrGeneratorPage({
  params,
}: QrGeneratorPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <QrGeneratorClient locale={locale} t={t} />;
}
