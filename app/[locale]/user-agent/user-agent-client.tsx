"use client";

import { useState, useEffect } from "react";
import { Monitor, Smartphone, Tablet, Globe } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolResult from "@/components/layout/tool-result";
import ToolStats from "@/components/layout/tool-stats";
import { Locale, Translations } from "@/locales";

interface UserAgentInfo {
  userAgent: string;
  browser: string;
  version: string;
  os: string;
  device: string;
  mobile: boolean;
  platform: string;
}

interface UserAgentClientProps {
  locale: Locale;
  t: Translations;
}

export default function UserAgentClient({ locale, t }: UserAgentClientProps) {
  const [userAgentInfo, setUserAgentInfo] = useState<UserAgentInfo | null>(
    null
  );

  useEffect(() => {
    const parseUserAgent = () => {
      const ua = navigator.userAgent;

      // Browser detection
      let browser = "Unknown";
      let version = "Unknown";

      if (ua.includes("Chrome") && !ua.includes("Edg")) {
        browser = "Chrome";
        const match = ua.match(/Chrome\/([0-9.]+)/);
        version = match ? match[1] : "Unknown";
      } else if (ua.includes("Firefox")) {
        browser = "Firefox";
        const match = ua.match(/Firefox\/([0-9.]+)/);
        version = match ? match[1] : "Unknown";
      } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
        browser = "Safari";
        const match = ua.match(/Version\/([0-9.]+)/);
        version = match ? match[1] : "Unknown";
      } else if (ua.includes("Edg")) {
        browser = "Edge";
        const match = ua.match(/Edg\/([0-9.]+)/);
        version = match ? match[1] : "Unknown";
      }

      // OS detection
      let os = "Unknown";
      if (ua.includes("Windows")) os = "Windows";
      else if (ua.includes("Mac OS")) os = "macOS";
      else if (ua.includes("Linux")) os = "Linux";
      else if (ua.includes("Android")) os = "Android";
      else if (ua.includes("iOS")) os = "iOS";

      // Device detection
      let device = "Desktop";
      const mobile =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      if (mobile) {
        if (ua.includes("iPad")) device = "Tablet";
        else device = "Mobile";
      }

      setUserAgentInfo({
        userAgent: ua,
        browser,
        version,
        os,
        device,
        mobile,
        platform: navigator.platform || "Unknown",
      });
    };

    parseUserAgent();
  }, []);

  const getDeviceIcon = () => {
    if (!userAgentInfo) return <Monitor size={48} />;

    switch (userAgentInfo.device) {
      case "Mobile":
        return <Smartphone size={48} />;
      case "Tablet":
        return <Tablet size={48} />;
      default:
        return <Monitor size={48} />;
    }
  };

  if (!userAgentInfo) {
    return (
      <ToolLayout
        locale={locale}
        t={t}
        title={t.userAgent.title}
        description={t.userAgent.description}
        icon={Globe}
      >
        <ToolSection>
          <ToolDisplay size="large">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </ToolDisplay>
        </ToolSection>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.userAgent.title}
      description={t.userAgent.description}
      icon={Globe}
    >
      {/* Device Overview */}
      <ToolSection>
        <ToolDisplay size="large" centered>
          <div className="text-primary-600 mb-4">{getDeviceIcon()}</div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {userAgentInfo.browser} {userAgentInfo.version}
          </div>
          <div className="text-lg text-gray-600">
            {userAgentInfo.os} • {userAgentInfo.device}
          </div>
        </ToolDisplay>
      </ToolSection>

      {/* Device Information */}
      <ToolSection title={t.userAgent?.deviceInfo || "Device Information"}>
        <ToolStats
          stats={[
            {
              label: t.userAgent.browser,
              value: `${userAgentInfo.browser} ${userAgentInfo.version}`,
            },
            { label: t.userAgent.os, value: userAgentInfo.os },
            { label: t.userAgent.device, value: userAgentInfo.device },
            { label: t.userAgent.platform, value: userAgentInfo.platform },
            {
              label: t.userAgent.mobile,
              value: userAgentInfo.mobile ? t.common.yes : t.common.no,
            },
          ]}
        />
      </ToolSection>

      {/* Full User Agent String */}
      <ToolSection title={t.userAgent?.fullString || "Full User Agent String"}>
        <ToolResult copyable copyText={userAgentInfo.userAgent}>
          <div className="font-mono text-sm break-all text-gray-900 bg-gray-50 p-4 rounded-lg">
            {userAgentInfo.userAgent}
          </div>
        </ToolResult>
      </ToolSection>

      {/* Browser Capabilities */}
      <ToolSection title={t.userAgent?.capabilities || "Browser Capabilities"}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: "Cookies", supported: navigator.cookieEnabled },
            {
              name: "Local Storage",
              supported: typeof Storage !== "undefined",
            },
            {
              name: "Session Storage",
              supported: typeof sessionStorage !== "undefined",
            },
            { name: "Geolocation", supported: "geolocation" in navigator },
            { name: "Touch", supported: "ontouchstart" in window },
            {
              name: "WebGL",
              supported: !!document.createElement("canvas").getContext("webgl"),
            },
            { name: "WebRTC", supported: !!(window as any).RTCPeerConnection },
            { name: "Service Worker", supported: "serviceWorker" in navigator },
          ].map((capability) => (
            <div
              key={capability.name}
              className={`p-3 rounded-lg border text-center ${
                capability.supported
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="font-medium">{capability.name}</div>
              <div className="text-sm">
                {capability.supported
                  ? t.userAgent?.supported || "Supported"
                  : t.userAgent?.notSupported || "Not Supported"}
              </div>
            </div>
          ))}
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
