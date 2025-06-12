import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";
import ImageConverterClient from "./image-converter-client";

interface ImageConverterPageProps {
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
    title: `${t.imageConverter.title} | ${t.common.siteTitle}`,
    description: t.imageConverter.description,
    keywords: t.imageConverter.keywords || [],
    openGraph: {
      title: t.imageConverter.title,
      description: t.imageConverter.description,
      url: `${baseUrl}/${locale}/image-converter`,
    },
    alternates: getAlternates(locale, "/image-converter"),
  };
}

export default async function ImageConverterPage({
  params,
}: ImageConverterPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <ImageConverterClient locale={locale} t={t} />;
}
