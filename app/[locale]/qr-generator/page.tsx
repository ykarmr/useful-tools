import QrGeneratorClient from "./qr-generator-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

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
    title: t.qrGenerator.title,
    description: t.qrGenerator.description,
    keywords: t.qrGenerator.keywords || [],
    openGraph: {
      title: t.qrGenerator.title,
      description: t.qrGenerator.description,
      url: `${baseUrl}/${locale}/qr-generator`,
    },
    alternates: getAlternates(locale, "/qr-generator"),
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
