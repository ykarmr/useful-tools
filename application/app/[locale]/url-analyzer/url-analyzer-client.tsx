"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Globe, Zap, Search, LinkIcon } from "lucide-react";
import ToolSection from "@/components/layout/tool-section";
import ToolLayout from "@/components/layout/tool-layout";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface UrlInfo {
  url: string;
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  origin: string;
  queryParams: Record<string, string>;
}

interface UrlAnalyzerClientProps {
  locale: Locale;
  t: Translations;
}
export default function UrlAnalyzerClient({
  locale,
  t,
}: UrlAnalyzerClientProps) {
  const [url, setUrl] = useState("");
  const [urlInfo, setUrlInfo] = useState<UrlInfo | null>(null);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState("");

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const parseQueryParams = (searchString: string): Record<string, string> => {
    const params: Record<string, string> = {};
    if (!searchString) return params;

    const urlParams = new URLSearchParams(searchString);
    urlParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };

  const analyzeUrl = async () => {
    if (!isValidUrl(url)) {
      setError(t.urlAnalyzer.invalidUrl);
      return;
    }

    setError("");
    setUrlInfo(null);

    const urlObj = new URL(url);
    const queryParams = parseQueryParams(urlObj.search);

    const urlInfo: UrlInfo = {
      url: urlObj.href,
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === "https:" ? "443" : "80"),
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
      queryParams,
    };
    setUrlInfo(urlInfo);
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const loadSample = () => {
    setUrl(
      "https://example.com?utm_source=google&utm_medium=cpc&page=1&sort=name&category=tech"
    );
    setError("");
  };

  const InfoRow = ({
    label,
    value,
    copyable = false,
  }: {
    label: string;
    value: string;
    copyable?: boolean;
  }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1 sm:gap-2">
      <span className="font-medium text-gray-600 text-sm sm:text-base flex-shrink-0">
        {label}:
      </span>
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-sm sm:text-base break-all flex-1 text-left sm:text-right">
          {value}
        </span>
        {copyable && value !== t.urlAnalyzer.notAvailable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(value, label)}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.urlAnalyzer.title}
      subtitle={t.urlAnalyzer.subtitle}
      description={t.urlAnalyzer.description}
      icon={LinkIcon}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.urlAnalyzer.howToUse.title}
          steps={t.urlAnalyzer.howToUse.steps}
          features={{
            title: t.urlAnalyzer.howToUse.features.title,
            items: t.urlAnalyzer.howToUse.features.items,
          }}
        />
      </ToolSection>

      <ToolSection>
        <div className="space-y-6">
          {/* 入力フォームと操作ボタン - Apple風のエレガントなデザイン */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.urlAnalyzer.urlPlaceholder}
                </label>
                <div className="relative">
                  <Input
                    type="url"
                    placeholder={t.urlAnalyzer.urlPlaceholder}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full h-12 px-4 text-base border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={analyzeUrl}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {t.urlAnalyzer.analyze}
                </Button>
                <Button
                  variant="outline"
                  onClick={loadSample}
                  className="sm:w-auto h-12 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {t.urlAnalyzer.sample}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-lg">⚠️</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {urlInfo && (
            <div className="space-y-6">
              {/* 基本情報カード - Apple風のクリーンなデザイン */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 sm:px-8 py-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {t.urlAnalyzer.basicInfo}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-6">
                    <InfoRow
                      label={t.urlAnalyzer.protocol}
                      value={urlInfo.protocol}
                      copyable
                    />
                    <InfoRow
                      label={t.urlAnalyzer.hostname}
                      value={urlInfo.hostname}
                      copyable
                    />
                    <InfoRow
                      label={t.urlAnalyzer.port}
                      value={urlInfo.port}
                      copyable
                    />
                    <InfoRow
                      label={t.urlAnalyzer.pathname}
                      value={urlInfo.pathname || "/"}
                      copyable
                    />
                    {urlInfo.search && (
                      <InfoRow
                        label={t.urlAnalyzer.search}
                        value={urlInfo.search}
                        copyable
                      />
                    )}
                    {urlInfo.hash && (
                      <InfoRow
                        label={t.urlAnalyzer.hash}
                        value={urlInfo.hash}
                        copyable
                      />
                    )}
                    <InfoRow
                      label={t.urlAnalyzer.origin}
                      value={urlInfo.origin}
                      copyable
                    />
                  </div>
                </div>
              </div>

              {/* クエリパラメータカード */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 sm:px-8 py-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Search className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {t.urlAnalyzer.queryParams}
                      </h3>
                    </div>
                    {Object.keys(urlInfo.queryParams).length > 0 && (
                      <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                        {t.urlAnalyzer.queryCount}:{" "}
                        {Object.keys(urlInfo.queryParams).length}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {Object.keys(urlInfo.queryParams).length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-lg font-medium">
                        {t.urlAnalyzer.noQueryParams}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        URLにクエリパラメータが含まれていません
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(urlInfo.queryParams).map(
                        ([key, value], index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div className="space-y-4">
                              <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  {t.urlAnalyzer.paramName}
                                </div>
                                <div className="flex items-center gap-3">
                                  <code className="flex-1 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-mono break-all border border-blue-100">
                                    {key}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      copyToClipboard(
                                        key,
                                        `param-name-${index}`
                                      )
                                    }
                                    className="h-8 w-8 p-0 hover:bg-blue-100 rounded-lg"
                                  >
                                    <Copy className="h-4 w-4 text-blue-600" />
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                                  {t.urlAnalyzer.paramValue}
                                </div>
                                <div className="flex items-center gap-3">
                                  <code className="flex-1 bg-green-50 text-green-800 px-4 py-2 rounded-lg text-sm font-mono break-all border border-green-100">
                                    {value}
                                  </code>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      copyToClipboard(
                                        value,
                                        `param-value-${index}`
                                      )
                                    }
                                    className="h-8 w-8 p-0 hover:bg-green-100 rounded-lg"
                                  >
                                    <Copy className="h-4 w-4 text-green-600" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}

                      <div className="pt-4 mt-6 border-t border-gray-200">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const queryString = Object.entries(
                              urlInfo.queryParams
                            )
                              .map(([key, value]) => `${key}=${value}`)
                              .join("&");
                            copyToClipboard(queryString, "all-params");
                          }}
                          className="w-full h-12 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {t.urlAnalyzer.copy} {t.urlAnalyzer.queryParams}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.urlAnalyzer.faqList} t={t} />
      </ToolSection>

      {copiedField && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-xs">✓</span>
            </div>
            {t.urlAnalyzer.copied}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
