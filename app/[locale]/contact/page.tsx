import type { Metadata } from "next";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";
import ContactClient from "./contact-client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  return generatePageMetadata(locale, "contact", t.contact, t.common);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <ContactClient t={t} />;
}
