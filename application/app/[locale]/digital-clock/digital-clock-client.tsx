"use client";

import { useState, useEffect } from "react";
import { Settings, Clock, Maximize, X } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";
import { Button } from "@/components/ui/button";

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenClose = () => {
    setIsFullscreen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleFullscreenClose();
    }
  };

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
    <>
      {/* メインコンテンツ */}
      <div className={isFullscreen ? "overflow-hidden h-screen" : ""}>
        <ToolLayout
          locale={locale}
          t={t}
          title={t.digitalClock.title}
          description={t.digitalClock.description}
          icon={Clock}
        >
          {/* How To Use セクション */}
          <ToolSection>
            <ToolHowToUse
              title={t.digitalClock.howToUse.title}
              steps={t.digitalClock.howToUse.steps}
              features={{
                title: t.digitalClock.features.title,
                items: t.digitalClock.features.items,
              }}
            />
          </ToolSection>

          {/* Clock Display */}
          <ToolSection>
            <ToolDisplay
              background="dark"
              size="large"
              className="w-[80%] mx-auto relative"
            >
              <div className="text-3xl sm:text-6xl md:text-8xl font-mono font-bold text-green-400 mb-4 tracking-wider">
                {currentTime && formatTime(currentTime)}
              </div>
              {showDate && (
                <div className="text-md sm:text-xl md:text-2xl text-green-300 font-medium">
                  {currentTime && formatDate(currentTime)}
                </div>
              )}

              {/* 全画面表示ボタン */}
              <Button
                onClick={handleFullscreenToggle}
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-black/20 border-green-400/50 text-green-400 hover:bg-green-400/20"
              >
                <Maximize className="w-4 h-4 mr-2" />
                {t.digitalClock.fullscreen}
              </Button>
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

          {/* FAQ Section */}
          <ToolSection>
            <ToolFaq faqList={t.digitalClock.faqList} t={t} />
          </ToolSection>
        </ToolLayout>
      </div>

      {/* 全画面表示モーダル */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black cursor-pointer overflow-hidden"
          onClick={handleFullscreenClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-label={t.digitalClock.fullscreenMode}
        >
          <div className="text-center select-none">
            <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-mono font-bold text-green-400 mb-8 tracking-wider">
              {currentTime && formatTime(currentTime)}
            </div>
            {showDate && (
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-green-300 font-medium">
                {currentTime && formatDate(currentTime)}
              </div>
            )}
          </div>

          {/* 閉じるボタン */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreenClose();
            }}
            variant="outline"
            size="sm"
            className="absolute top-6 right-6 bg-black/20 border-green-400/50 text-green-400 hover:bg-green-400/20"
          >
            <X className="w-4 h-4 mr-2" />
            {t.digitalClock.exitFullscreen}
          </Button>

          {/* ESCキーのヒント */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-green-300/70 text-sm">
            ESC {t.digitalClock.exitFullscreen}
          </div>
        </div>
      )}
    </>
  );
}
