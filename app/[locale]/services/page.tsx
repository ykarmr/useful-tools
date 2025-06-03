import ServicesClient from "./services-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/getLocaleMapping";

interface ServicesPageProps {
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
    title: t.services.title,
    description: t.services.subtitle,
    keywords: t.services.keywords || [],
    openGraph: {
      title: t.services.title,
      description: t.services.subtitle,
      url: `${baseUrl}${locale}/services`,
    },
    alternates: getAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <ServicesClient locale={locale} t={t} />;
}
