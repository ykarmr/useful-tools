"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import { interpolate, Locale, Translations } from "@/locales";

interface PomodoroTimerClientProps {
  locale: Locale;
  t: Translations;
}

type PomodoroPhase = "work" | "shortBreak" | "longBreak";

export default function PomodoroTimerClient({
  locale,
  t,
}: PomodoroTimerClientProps) {
  const [currentPhase, setCurrentPhase] = useState<PomodoroPhase>("work");
  const [currentSession, setCurrentSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phaseDurations = {
    work: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  };

  const totalSessions = 4;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseComplete();
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

  const handlePhaseComplete = () => {
    setIsRunning(false);

    if (currentPhase === "work") {
      if (currentSession === totalSessions) {
        // Long break after 4 work sessions
        setCurrentPhase("longBreak");
        setTimeLeft(phaseDurations.longBreak);
      } else {
        // Short break
        setCurrentPhase("shortBreak");
        setTimeLeft(phaseDurations.shortBreak);
      }
    } else if (currentPhase === "shortBreak") {
      // Next work session
      setCurrentSession((prev) => prev + 1);
      setCurrentPhase("work");
      setTimeLeft(phaseDurations.work);
    } else if (currentPhase === "longBreak") {
      // Complete cycle
      setIsCompleted(true);
    }
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentPhase("work");
    setCurrentSession(1);
    setTimeLeft(phaseDurations.work);
    setIsCompleted(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "work":
        return "text-red-600";
      case "shortBreak":
        return "text-green-600";
      case "longBreak":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case "work":
        return t.pomodoroTimer.workTime;
      case "shortBreak":
        return t.pomodoroTimer.breakTime;
      case "longBreak":
        return t.pomodoroTimer.longBreakTime;
      default:
        return "";
    }
  };

  const progress =
    ((phaseDurations[currentPhase] - timeLeft) / phaseDurations[currentPhase]) *
    100;

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.pomodoroTimer.title}
      description={t.pomodoroTimer.description}
      icon={Timer}
    >
      {/* Session Info */}
      <ToolSection>
        <ToolDisplay size="medium" centered>
          <div className="text-lg font-semibold text-gray-700 mb-2">
            {interpolate(t.pomodoroTimer.session, {
              current: currentSession.toString(),
              total: totalSessions.toString(),
            })}
          </div>
          <div className={`text-xl font-bold ${getPhaseColor()}`}>
            {getPhaseText()}
          </div>
        </ToolDisplay>
      </ToolSection>

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
                className={`transition-all duration-1000 ease-linear ${
                  currentPhase === "work"
                    ? "text-red-500"
                    : currentPhase === "shortBreak"
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-900">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          {isCompleted && (
            <div className="text-2xl font-bold text-green-600 animate-pulse mb-4">
              {t.pomodoroTimer.completed}
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* Phase Indicators */}
      <ToolSection>
        <div className="flex justify-center space-x-4 mb-6">
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              currentPhase === "work"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {t.pomodoroTimer.work}
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              currentPhase === "shortBreak"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {t.pomodoroTimer.shortBreak}
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              currentPhase === "longBreak"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {t.pomodoroTimer.longBreak}
          </div>
        </div>
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <ToolControls>
          {!isRunning ? (
            <button
              onClick={startTimer}
              disabled={isCompleted}
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
      </ToolSection>
    </ToolLayout>
  );
}
