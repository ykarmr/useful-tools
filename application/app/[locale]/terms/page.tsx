import type { Metadata } from "next";
import { getTranslations, interpolate, isValidLocale } from "@/locales";
import {
  getAlternates,
  getLocaleMapping,
  getSupportedLocales,
} from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";

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

  return generatePageMetadata(locale, "terms", t.terms, t.common);
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const t = getTranslations(locale);

  const currentDate = new Date().toLocaleDateString(getLocaleMapping(locale));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t.terms.title}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {interpolate(t.terms.lastUpdated, { date: currentDate })}
            </p>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t.terms.introduction}
          </p>

          <div className="space-y-8">
            {Object.entries(t.terms.sections).map(([key, section], index) => (
              <section key={key} className="group">
                <div className="border-l-4 border-blue-200 pl-6 hover:border-blue-400 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm font-semibold">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                        {section.title}
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* フッターセクション */}
        <div className="mt-12 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{t.common.siteTitle}</span>
              <span>•</span>
              <span>{t.terms.title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
