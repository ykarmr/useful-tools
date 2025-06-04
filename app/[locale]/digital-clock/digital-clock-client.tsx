"use client";

import { useState, useEffect } from "react";
import { Settings, Clock } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import { Locale, Translations } from "@/locales";

interface DigitalClockClientProps {
  locale: Locale;
  t: Translations;
}

export default function DigitalClockClient({
  locale,
  t,
}: DigitalClockClientProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      ...(showSeconds && { second: "2-digit" }),
      hour12: !is24Hour,
    };
    return date.toLocaleTimeString(locale, options);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(locale, options);
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.digitalClock.title}
      description={t.digitalClock.description}
      icon={Clock}
    >
      {/* Clock Display */}
      <ToolSection>
        <ToolDisplay
          background="dark"
          size="large"
          className="max-w-sm mx-auto"
        >
          <div className="text-3xl sm:text-6xl md:text-8xl font-mono font-bold text-green-400 mb-4 tracking-wider">
            {currentTime && formatTime(currentTime)}
          </div>
          {showDate && (
            <div className="text-md sm:text-xl md:text-2xl text-green-300 font-medium">
              {currentTime && formatDate(currentTime)}
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* Settings */}
      <ToolSection title={t.digitalClock.settings} icon={Settings}>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={is24Hour}
                onChange={(e) => setIs24Hour(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {t.digitalClock.format24Hour}
              </span>
            </label>

            <label className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={showSeconds}
                onChange={(e) => setShowSeconds(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {t.digitalClock.showSeconds}
              </span>
            </label>

            <label className="flex items-center justify-center space-x-3 p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={showDate}
                onChange={(e) => setShowDate(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {t.digitalClock.showDate}
              </span>
            </label>
          </div>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
