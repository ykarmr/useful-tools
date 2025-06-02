"use client";

import { useState, useEffect } from "react";
import { Globe, MapPin, Shield, Wifi } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolResult from "@/components/layout/tool-result";
import ToolStats from "@/components/layout/tool-stats";
import { Locale, Translations } from "@/locales";

interface IPInfo {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  timezone?: string;
  postal?: string;
}

interface IPAddressClientProps {
  locale: Locale;
  t: Translations;
}

export default function IPAddressClient({ locale, t }: IPAddressClientProps) {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using ipinfo.io API for IP information
        const response = await fetch("https://ipinfo.io/json");
        if (!response.ok) {
          throw new Error("Failed to fetch IP information");
        }

        const data = await response.json();
        setIpInfo(data);
      } catch (err) {
        console.error("Error fetching IP info:", err);
        setError(
          t.ipAddress?.failedToFetch || "Failed to fetch IP information"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIPInfo();
  }, [locale]);

  const refreshIPInfo = () => {
    setIpInfo(null);
    setError(null);
    const fetchIPInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ipinfo.io/json");
        if (!response.ok) {
          throw new Error("Failed to fetch IP information");
        }
        const data = await response.json();
        setIpInfo(data);
      } catch (err) {
        console.error("Error fetching IP info:", err);
        setError(
          t.ipAddress?.failedToFetch || "Failed to fetch IP information"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchIPInfo();
  };

  if (loading) {
    return (
      <ToolLayout
        locale={locale}
        t={t}
        title={t.ipAddress.title}
        description={t.ipAddress.description}
        icon={Globe}
      >
        <ToolSection>
          <ToolDisplay size="large" centered>
            <div className="animate-pulse text-gray-500">
              {t.ipAddress?.fetchingInfo || "Fetching IP information..."}
            </div>
          </ToolDisplay>
        </ToolSection>
      </ToolLayout>
    );
  }

  if (error) {
    return (
      <ToolLayout
        locale={locale}
        t={t}
        title={t.ipAddress.title}
        description={t.ipAddress.description}
        icon={Globe}
      >
        <ToolSection>
          <ToolDisplay size="large" centered>
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={refreshIPInfo}
              className="button-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t.ipAddress?.retry || "Retry"}
            </button>
          </ToolDisplay>
        </ToolSection>
      </ToolLayout>
    );
  }

  if (!ipInfo) {
    return (
      <ToolLayout
        locale={locale}
        t={t}
        title={t.ipAddress.title}
        description={t.ipAddress.description}
        icon={Globe}
      >
        <ToolSection>
          <ToolDisplay size="large" centered>
            <div className="text-gray-500">
              {t.ipAddress?.noInfoFound || "No IP information found"}
            </div>
          </ToolDisplay>
        </ToolSection>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.ipAddress.title}
      description={t.ipAddress.description}
      icon={Globe}
    >
      {/* IP Address Display */}
      <ToolSection>
        <ToolDisplay size="large" centered>
          <div className="text-primary-600 mb-4">
            <Globe size={48} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {ipInfo.ip}
          </div>
          <div className="text-lg text-gray-600">
            {ipInfo.city &&
              ipInfo.country &&
              `${ipInfo.city}, ${ipInfo.country}`}
          </div>
        </ToolDisplay>
      </ToolSection>

      {/* IP Address Information */}
      <ToolSection title={t.ipAddress.ipInfo}>
        <ToolResult copyable copyText={ipInfo.ip} title={t.ipAddress.yourIP}>
          <div className="font-mono text-xl text-gray-900">{ipInfo.ip}</div>
        </ToolResult>
      </ToolSection>

      {/* Location Information */}
      {(ipInfo.city || ipInfo.region || ipInfo.country) && (
        <ToolSection title={t.ipAddress.location} icon={MapPin}>
          <ToolStats
            stats={[
              ...(ipInfo.city
                ? [{ label: t.ipAddress.city, value: ipInfo.city }]
                : []),
              ...(ipInfo.region
                ? [{ label: t.ipAddress.region, value: ipInfo.region }]
                : []),
              ...(ipInfo.country
                ? [{ label: t.ipAddress.country, value: ipInfo.country }]
                : []),
              ...(ipInfo.postal
                ? [{ label: t.ipAddress.postal, value: ipInfo.postal }]
                : []),
              ...(ipInfo.timezone
                ? [{ label: t.ipAddress.timezone, value: ipInfo.timezone }]
                : []),
            ]}
          />
        </ToolSection>
      )}

      {/* ISP Information */}
      {ipInfo.org && (
        <ToolSection title={t.ipAddress.isp} icon={Wifi}>
          <ToolResult copyable copyText={ipInfo.org}>
            <div className="text-gray-900">{ipInfo.org}</div>
          </ToolResult>
        </ToolSection>
      )}

      {/* Coordinates */}
      {ipInfo.loc && (
        <ToolSection title={t.ipAddress.coordinates} icon={MapPin}>
          <ToolResult copyable copyText={ipInfo.loc}>
            <div className="font-mono text-gray-900">{ipInfo.loc}</div>
          </ToolResult>
        </ToolSection>
      )}

      {/* Security Note */}
      <ToolSection title={t.ipAddress.security} icon={Shield}>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <div className="font-medium mb-1">{t.ipAddress.securityNote}</div>
              <div>{t.ipAddress.securityDescription}</div>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* Refresh Button */}
      <ToolSection>
        <div className="text-center">
          <button
            onClick={refreshIPInfo}
            className="button-secondary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {t.ipAddress?.refreshInfo || "Refresh Information"}
          </button>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
