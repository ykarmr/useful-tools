import IpAddressClient from "./ip-address-client";
import { getTranslations, isValidLocale, getAlternates } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";

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
    ...generateToolMetadata(locale, "ip-address", t.ipAddress, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(locale, "ip-address", t.ipAddress, t.common),
      ]),
    },
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
