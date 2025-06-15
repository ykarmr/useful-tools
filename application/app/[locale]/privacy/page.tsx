import type { Metadata } from "next";
import { getTranslations, interpolate, isValidLocale } from "@/locales";
import {
  getAlternates,
  getLocaleMapping,
  getSupportedLocales,
} from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return getSupportedLocales().map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {
      title: "Page Not Found",
    };
  }

  const t = getTranslations(locale);

  return generatePageMetadata(locale, "privacy", t.privacy, t.common);
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  const t = getTranslations(locale);
  const currentDate = new Date().toLocaleDateString(getLocaleMapping(locale));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t.privacy.title}
          </h1>

          <p className="text-sm text-gray-600 mb-8">
            {interpolate(t.privacy.lastUpdated, { date: currentDate })}
          </p>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t.privacy.introduction}
            </p>

            <div className="space-y-8">
              {Object.entries(t.privacy.sections).map(([key, section]) => (
                <section key={key}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
