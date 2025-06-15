import UserAgentClient from "./user-agent-client";
import { getTranslations, isValidLocale, getAlternates, getSupportedLocales } from "@/lib/i18n";
import { generateToolMetadata } from "@/lib/metadata";
import { generateToolStructuredData } from "@/lib/structured-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}
interface UserAgentPageProps {
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
    ...generateToolMetadata(locale, "user-agent", t.userAgent, t.common),
    other: {
      "structured-data": JSON.stringify([
        generateToolStructuredData(locale, "user-agent", t.userAgent, t.common),
      ]),
    },
  };
}

export default async function UserAgentPage({ params }: UserAgentPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  return <UserAgentClient locale={locale} t={t} />;
}
