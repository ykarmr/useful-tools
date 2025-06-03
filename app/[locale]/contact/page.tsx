import type { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import { isValidLocale } from "@/locales";
import { baseUrl } from "@/lib/const";
import ContactClient from "./contact-client";
import { notFound } from "next/navigation";
import { getAlternates } from "@/lib/getLocaleMapping";

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  return {
    title: `${t.contact.title} | ${t.common.siteTitle}`,
    description: t.contact.description,
    keywords: t.contact.keywords || [],
    openGraph: {
      title: t.contact.title,
      description: t.contact.description,
      url: `${baseUrl}/${locale}/contact`,
    },
    alternates: getAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <ContactClient t={t} />;
}
