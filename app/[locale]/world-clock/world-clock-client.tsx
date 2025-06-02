"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Globe } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import { Locale, Translations } from "@/locales";

interface TimeZone {
  id: string;
  name: string;
  timezone: string;
  country: string;
}

const POPULAR_TIMEZONES = [
  { name: "New York", timezone: "America/New_York", country: "USA" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", country: "USA" },
  { name: "London", timezone: "Europe/London", country: "UK" },
  { name: "Paris", timezone: "Europe/Paris", country: "France" },
  { name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { name: "Sydney", timezone: "Australia/Sydney", country: "Australia" },
  { name: "Dubai", timezone: "Asia/Dubai", country: "UAE" },
  { name: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", country: "Hong Kong" },
  { name: "Mumbai", timezone: "Asia/Kolkata", country: "India" },
];

interface WorldClockClientProps {
  locale: Locale;
  t: Translations;
}

export default function WorldClockClient({ locale, t }: WorldClockClientProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState<TimeZone[]>([]);
  const [availableTimezones] = useState(POPULAR_TIMEZONES);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`world-clock-${locale}`);
    if (saved) {
      setSelectedTimezones(JSON.parse(saved));
    } else {
      // Default timezones
      const defaults = [
        { id: "1", name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
        {
          id: "2",
          name: "New York",
          timezone: "America/New_York",
          country: "USA",
        },
        { id: "3", name: "London", timezone: "Europe/London", country: "UK" },
      ];
      setSelectedTimezones(defaults);
    }
  }, [locale]);

  useEffect(() => {
    localStorage.setItem(
      `world-clock-${locale}`,
      JSON.stringify(selectedTimezones)
    );
  }, [selectedTimezones, locale]);

  const addTimezone = (timezone: (typeof POPULAR_TIMEZONES)[0]) => {
    if (selectedTimezones.find((tz) => tz.timezone === timezone.timezone))
      return;

    const newTimezone: TimeZone = {
      id: Date.now().toString(),
      ...timezone,
    };
    setSelectedTimezones([...selectedTimezones, newTimezone]);
  };

  const removeTimezone = (id: string) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz.id !== id));
  };

  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString(locale, {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: locale === "en",
    });
  };

  const formatDate = (date: Date, timezone: string) => {
    return date.toLocaleDateString(locale, {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeDifference = (timezone: string) => {
    const now = new Date();
    const localOffset = now.getTimezoneOffset();
    const targetTime = new Date(
      now.toLocaleString("en-US", { timeZone: timezone })
    );
    const targetOffset = (now.getTime() - targetTime.getTime()) / (1000 * 60);
    const diff = (targetOffset - localOffset) / 60;

    if (diff === 0) return t.worldClock.local;
    const sign = diff > 0 ? "+" : "";
    return `UTC${sign}${diff}`;
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.worldClock.title}
      description={t.worldClock.description}
      icon={Globe}
    >
      {/* Time Zones Grid */}
      <ToolSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {selectedTimezones.map((timezone) => (
            <div
              key={timezone.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 relative"
            >
              <button
                onClick={() => removeTimezone(timezone.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
                aria-label={`Remove ${timezone.name} timezone`}
              >
                <Trash2 size={16} />
              </button>

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {timezone.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{timezone.country}</p>

                <div className="text-3xl font-mono font-bold text-blue-600 mb-2">
                  {formatTime(currentTime, timezone.timezone)}
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  {formatDate(currentTime, timezone.timezone)}
                </div>

                <div className="text-xs text-gray-500 bg-white rounded-full px-3 py-1 inline-block">
                  {getTimeDifference(timezone.timezone)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ToolSection>

      {/* Add Timezone */}
      <ToolSection title={t.worldClock.addTimezone} icon={Plus}>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableTimezones
              .filter(
                (tz) =>
                  !selectedTimezones.find(
                    (selected) => selected.timezone === tz.timezone
                  )
              )
              .map((timezone) => (
                <button
                  key={timezone.timezone}
                  onClick={() => addTimezone(timezone)}
                  className="p-3 bg-white rounded-lg border hover:border-primary-300 hover:bg-primary-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <div className="font-medium text-gray-900">
                    {timezone.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {timezone.country}
                  </div>
                </button>
              ))}
          </div>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
