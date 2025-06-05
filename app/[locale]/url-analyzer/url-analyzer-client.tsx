"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Copy,
  Globe,
  Shield,
  Zap,
  Trash2,
  Search,
  LinkIcon,
} from "lucide-react";
import { getTranslations } from "@/lib/i18n";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolResult from "@/components/layout/tool-result";
import ToolLayout from "@/components/layout/tool-layout";
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
    <div className="flex justify-between items-center py-2">
      <span className="font-medium text-gray-600">{label}:</span>
      <div className="flex items-center gap-2">
        <span className="text-right break-all max-w-xs">{value}</span>
        {copyable && value !== t.urlAnalyzer.notAvailable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(value, label)}
            className="h-6 w-6 p-0"
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
      description={t.urlAnalyzer.description}
      icon={LinkIcon}
    >
      <ToolSection>
        <div className="space-y-4">
          <ToolControls>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder={t.urlAnalyzer.urlPlaceholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={analyzeUrl} variant="outline">
                {t.urlAnalyzer.analyze}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadSample}>
                {t.urlAnalyzer.sample}
              </Button>
            </div>
          </ToolControls>

          {error && (
            <ToolResult>
              <div className="text-red-600 text-center">{error}</div>
            </ToolResult>
          )}

          {urlInfo && (
            <ToolResult>
              <div className="space-y-6">
                {/* Basic URL Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      {t.urlAnalyzer.basicInfo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
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
                  </CardContent>
                </Card>

                {/* Query Parameters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      {t.urlAnalyzer.queryParams}
                      {Object.keys(urlInfo.queryParams).length > 0 && (
                        <Badge variant="secondary">
                          {t.urlAnalyzer.queryCount}:{" "}
                          {Object.keys(urlInfo.queryParams).length}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(urlInfo.queryParams).length === 0 ? (
                      <div className="text-gray-500 text-center py-4">
                        {t.urlAnalyzer.noQueryParams}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(urlInfo.queryParams).map(
                          ([key, value], index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-3 bg-gray-50"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                  <div className="text-sm font-medium text-gray-600 mb-1">
                                    {t.urlAnalyzer.paramName}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
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
                                      className="h-6 w-6 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-600 mb-1">
                                    {t.urlAnalyzer.paramValue}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-mono break-all">
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
                                      className="h-6 w-6 p-0"
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                        <div className="mt-4 pt-3 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const queryString = Object.entries(
                                urlInfo.queryParams
                              )
                                .map(([key, value]) => `${key}=${value}`)
                                .join("&");
                              copyToClipboard(queryString, "all-params");
                            }}
                            className="w-full"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            {t.urlAnalyzer.copy} {t.urlAnalyzer.queryParams}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </ToolResult>
          )}
        </div>
      </ToolSection>

      {copiedField && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {t.urlAnalyzer.copied}
        </div>
      )}
    </ToolLayout>
  );
}
