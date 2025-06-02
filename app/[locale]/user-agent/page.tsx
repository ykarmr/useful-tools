import UserAgentClient from "./user-agent-client";
import { getTranslations, isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { baseUrl } from "@/lib/const";

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
    title: t.userAgent.title,
    description: t.userAgent.description,
    keywords: t.userAgent.keywords || [],
    openGraph: {
      title: t.userAgent.title,
      description: t.userAgent.description,
      url: `${baseUrl}/${locale}/user-agent`,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/user-agent`,
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
