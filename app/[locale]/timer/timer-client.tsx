"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import { Locale, Translations } from "@/locales";

interface TimerClientProps {
  locale: Locale;
  t: Translations;
}

export default function TimerClient({ locale, t }: TimerClientProps) {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(minutes * 60 + seconds);
    }
    setIsRunning(true);
    setIsFinished(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsFinished(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress =
    timeLeft > 0
      ? ((minutes * 60 + seconds - timeLeft) / (minutes * 60 + seconds)) * 100
      : 0;

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.timer.title}
      description={t.timer.description}
      icon={Clock}
    >
      {/* Timer Display */}
      <ToolSection>
        <ToolDisplay size="large">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="text-primary-600 transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-900">
                {timeLeft > 0
                  ? formatTime(timeLeft)
                  : formatTime(minutes * 60 + seconds)}
              </div>
            </div>
          </div>

          {isFinished && (
            <div className="text-2xl font-bold text-green-600 animate-pulse mb-4">
              {t.timer.timeUp}
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <div className="max-w-md mx-auto space-y-6">
          {!isRunning && timeLeft === 0 && (
            <div className="grid grid-cols-2 gap-4">
              <ToolInput label={t.timer.minutes}>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(Number.parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </ToolInput>
              <ToolInput label={t.timer.seconds}>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) =>
                    setSeconds(Number.parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </ToolInput>
            </div>
          )}

          <ToolControls>
            {!isRunning ? (
              <button
                onClick={startTimer}
                disabled={minutes === 0 && seconds === 0}
                className="button-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Play size={20} />
                <span>{t.timer.start}</span>
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="button-secondary flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <Pause size={20} />
                <span>{t.timer.pause}</span>
              </button>
            )}

            <button
              onClick={resetTimer}
              className="button-secondary flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <RotateCcw size={20} />
              <span>{t.timer.reset}</span>
            </button>
          </ToolControls>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
