import IpAddressClient from "./ip-address-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { getAlternates } from "@/lib/i18n";

interface IpAddressPageProps {
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
    title: `${t.ipAddress.title} | ${t.common.siteTitle}`,
    description: t.ipAddress.description,
    keywords: t.ipAddress.keywords || [],
    openGraph: {
      title: t.ipAddress.title,
      description: t.ipAddress.description,
      url: `${baseUrl}/${locale}/ip-address`,
    },
    alternates: getAlternates(locale, "/ip-address"),
  };
}

export default async function IpAddressPage({ params }: IpAddressPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <IpAddressClient locale={locale} t={t} />;
}
