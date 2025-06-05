import UrlEncoderClient from "./url-encoder-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

interface UrlEncoderPageProps {
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
    title: `${t.urlEncoder.title} | ${t.common.siteTitle}`,
    description: t.urlEncoder.description,
    keywords: t.urlEncoder.keywords || [],
    openGraph: {
      title: t.urlEncoder.title,
      description: t.urlEncoder.description,
      url: `${baseUrl}/${locale}/url-encoder`,
    },
    alternates: getAlternates(locale, "/url-encoder"),
  };
}

export default async function UrlEncoderPage({ params }: UrlEncoderPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <UrlEncoderClient locale={locale} t={t} />;
}
