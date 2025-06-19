"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Timer, Settings } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolFaq from "@/components/layout/tool-faq";
import ToolInput from "@/components/layout/tool-input";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { interpolate, Locale, Translations } from "@/locales";

interface PomodoroTimerClientProps {
  locale: Locale;
  t: Translations;
}

type PomodoroPhase = "work" | "shortBreak" | "longBreak";

interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  totalSessions: number;
  autoStart: boolean;
  soundEnabled: boolean;
}

interface PomodoroState {
  currentPhase: PomodoroPhase;
  currentSession: number;
  timeLeft: number;
  isRunning: boolean;
  isCompleted: boolean;
  settings: PomodoroSettings;
}

export default function PomodoroTimerClient({
  locale,
  t,
}: PomodoroTimerClientProps) {
  // デフォルト設定
  const defaultSettings: PomodoroSettings = {
    workDuration: 25 * 60, // 25分
    shortBreakDuration: 5 * 60, // 5分
    longBreakDuration: 15 * 60, // 15分
    totalSessions: 4,
    autoStart: false,
    soundEnabled: true,
  };

  // 初期状態（SSRとCSRで一致するように）
  const getInitialState = (): PomodoroState => {
    return {
      currentPhase: "work",
      currentSession: 1,
      timeLeft: defaultSettings.workDuration,
      isRunning: false,
      isCompleted: false,
      settings: defaultSettings,
    };
  };

  const [state, setState] = useState<PomodoroState>(getInitialState);
  const [isClient, setIsClient] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const backgroundStartTimeRef = useRef<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  // 通知権限を要求
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Web Worker初期化
  useEffect(() => {
    // インラインWeb Workerを作成
    const workerCode = `
      let intervalId = null;
      let lastTick = Date.now();
      
      self.onmessage = function(e) {
        const { action, data } = e.data;
        
        if (action === 'start') {
          lastTick = Date.now();
          intervalId = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - lastTick) / 1000);
            if (elapsed >= 1) {
              self.postMessage({ type: 'tick', elapsed });
              lastTick = now;
            }
          }, 100);
        } else if (action === 'stop') {
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      };
    `;

    const blob = new Blob([workerCode], { type: "application/javascript" });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    workerRef.current.onmessage = (e) => {
      const { type, elapsed } = e.data;
      if (type === "tick" && state.isRunning && elapsed > 0) {
        const newState = { ...state };
        newState.timeLeft = Math.max(0, newState.timeLeft - elapsed);

        if (newState.timeLeft === 0) {
          const completedState = handlePhaseCompleteForState(newState);
          saveState(completedState);
          workerRef.current?.postMessage({ action: "stop" });
        } else {
          saveState(newState);
        }
      }
    };

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);
  useEffect(() => {
    setIsClient(true);

    const savedState = localStorage.getItem("pomodoroState");
    const savedSettings = localStorage.getItem("pomodoroSettings");
    const savedLastUpdateTime = localStorage.getItem("pomodoroLastUpdateTime");

    const settings = savedSettings
      ? { ...defaultSettings, ...JSON.parse(savedSettings) }
      : defaultSettings;

    if (savedState) {
      const loadedState = JSON.parse(savedState);
      let newState = {
        ...loadedState,
        settings,
        isRunning: false, // タイマーは常に停止状態で開始
      };

      // バックグラウンドでの経過時間を計算
      if (savedLastUpdateTime && loadedState.isRunning) {
        const lastUpdateTime = parseInt(savedLastUpdateTime);
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor(
          (currentTime - lastUpdateTime) / 1000
        );

        if (elapsedSeconds > 0) {
          newState.timeLeft = Math.max(
            0,
            loadedState.timeLeft - elapsedSeconds
          );

          // タイマーが終了している場合
          if (newState.timeLeft === 0) {
            newState = handlePhaseCompleteForState(newState);
          }
        }
      }

      setState(newState);
      lastUpdateTimeRef.current = Date.now();
    } else {
      setState({
        currentPhase: "work",
        currentSession: 1,
        timeLeft: settings.workDuration,
        isRunning: false,
        isCompleted: false,
        settings,
      });
      lastUpdateTimeRef.current = Date.now();
    }
  }, []);

  // ステートをlocalStorageに保存
  const saveState = (newState: PomodoroState) => {
    if (isClient) {
      const stateToSave = {
        currentPhase: newState.currentPhase,
        currentSession: newState.currentSession,
        timeLeft: newState.timeLeft,
        isCompleted: newState.isCompleted,
        isRunning: newState.isRunning,
      };
      localStorage.setItem("pomodoroState", JSON.stringify(stateToSave));
      localStorage.setItem(
        "pomodoroSettings",
        JSON.stringify(newState.settings)
      );
      localStorage.setItem("pomodoroLastUpdateTime", Date.now().toString());
    }
    lastUpdateTimeRef.current = Date.now();
    setState(newState);
  };

  const getPhaseDuration = (phase: PomodoroPhase): number => {
    switch (phase) {
      case "work":
        return state.settings.workDuration;
      case "shortBreak":
        return state.settings.shortBreakDuration;
      case "longBreak":
        return state.settings.longBreakDuration;
    }
  };

  // フェーズ完了処理（状態を返すバージョン）
  const handlePhaseCompleteForState = (
    currentState: PomodoroState
  ): PomodoroState => {
    const newState = { ...currentState };
    newState.isRunning = false;

    // 音の再生（設定で有効な場合）
    if (newState.settings.soundEnabled) {
      playNotificationSound();
    }

    // ブラウザ通知を送信
    showNotification(newState);

    if (newState.currentPhase === "work") {
      if (newState.currentSession === newState.settings.totalSessions) {
        // 全セッション完了後のロングブレイク
        newState.currentPhase = "longBreak";
        newState.timeLeft = newState.settings.longBreakDuration;
      } else {
        // ショートブレイク
        newState.currentPhase = "shortBreak";
        newState.timeLeft = newState.settings.shortBreakDuration;
      }
    } else if (newState.currentPhase === "shortBreak") {
      // 次の作業セッション
      newState.currentSession += 1;
      newState.currentPhase = "work";
      newState.timeLeft = newState.settings.workDuration;
    } else if (newState.currentPhase === "longBreak") {
      // サイクル完了
      newState.isCompleted = true;
    }

    // 自動スタートが有効で完了していない場合
    if (newState.settings.autoStart && !newState.isCompleted) {
      newState.isRunning = true;
    }

    return newState;
  };

  // ブラウザ通知を表示
  const showNotification = (state: PomodoroState) => {
    if ("Notification" in window && Notification.permission === "granted") {
      let title = "";
      let body = "";

      if (state.currentPhase === "work") {
        title = t.pomodoroTimer.workCompleted || "Work session completed!";
        body = t.pomodoroTimer.timeForBreak || "Time for a break!";
      } else if (state.currentPhase === "shortBreak") {
        title = t.pomodoroTimer.breakCompleted || "Break completed!";
        body = t.pomodoroTimer.timeForWork || "Time to get back to work!";
      } else if (state.currentPhase === "longBreak") {
        title = t.pomodoroTimer.sessionCompleted || "Session completed!";
        body = t.pomodoroTimer.timeForLongBreak || "Time for a long break!";
      }

      if (title) {
        new Notification(title, {
          body: body,
          icon: "/favicon.ico",
          tag: "pomodoro-timer",
        });
      }
    }
  };

  // Web Workerの管理
  useEffect(() => {
    if (state.isRunning && state.timeLeft > 0) {
      workerRef.current?.postMessage({ action: "start" });
    } else {
      workerRef.current?.postMessage({ action: "stop" });
    }
  }, [state.isRunning, state.timeLeft]);

  // Page Visibility APIでバックグラウンド対応
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // ページがバックグラウンドになった時刻を記録
        backgroundStartTimeRef.current = Date.now();
      } else {
        // ページがフォアグラウンドに戻った時の処理
        if (backgroundStartTimeRef.current && state.isRunning) {
          const backgroundTime = Date.now() - backgroundStartTimeRef.current;
          const elapsedSeconds = Math.floor(backgroundTime / 1000);

          if (elapsedSeconds > 0) {
            const newState = { ...state };
            newState.timeLeft = Math.max(0, newState.timeLeft - elapsedSeconds);

            if (newState.timeLeft === 0) {
              // フェーズが完了した場合
              const completedState = handlePhaseCompleteForState(newState);
              saveState(completedState);
            } else {
              saveState(newState);
            }
          }
        }
        backgroundStartTimeRef.current = null;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    state.isRunning,
    state.timeLeft,
    state.currentPhase,
    state.currentSession,
    state.settings,
  ]);

  useEffect(() => {
    if (state.isRunning && state.timeLeft > 0) {
      // フォールバック用のsetInterval（Web Workerが利用できない場合）
      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const expectedElapsedSeconds = Math.floor(
          (currentTime - lastUpdateTimeRef.current) / 1000
        );

        if (expectedElapsedSeconds >= 1) {
          const newState = { ...state };
          newState.timeLeft = Math.max(
            0,
            newState.timeLeft - expectedElapsedSeconds
          );
          lastUpdateTimeRef.current = currentTime;

          if (newState.timeLeft === 0) {
            handlePhaseComplete(newState);
          } else {
            saveState(newState);
          }
        }
      }, 1000); // Web Workerと併用するため1秒間隔
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
  }, [state.isRunning, state.timeLeft]);

  const handlePhaseComplete = (currentState: PomodoroState) => {
    const newState = handlePhaseCompleteForState(currentState);
    saveState(newState);
  };

  const playNotificationSound = () => {
    // Web Audio APIを使用した簡単な通知音
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log("音の再生に失敗しました:", error);
    }
  };

  const startTimer = () => {
    const newState = { ...state, isRunning: true };
    lastUpdateTimeRef.current = Date.now();
    saveState(newState);
  };

  const pauseTimer = () => {
    const newState = { ...state, isRunning: false };
    saveState(newState);
  };

  const resetTimer = () => {
    const newState: PomodoroState = {
      currentPhase: "work",
      currentSession: 1,
      timeLeft: state.settings.workDuration,
      isRunning: false,
      isCompleted: false,
      settings: state.settings,
    };
    lastUpdateTimeRef.current = Date.now();
    saveState(newState);
  };

  const updateSettings = (newSettings: Partial<PomodoroSettings>) => {
    // NaN値をデフォルト値で置き換える
    const sanitizedSettings = { ...newSettings };
    if (
      sanitizedSettings.workDuration &&
      isNaN(sanitizedSettings.workDuration)
    ) {
      sanitizedSettings.workDuration = defaultSettings.workDuration;
    }
    if (
      sanitizedSettings.shortBreakDuration &&
      isNaN(sanitizedSettings.shortBreakDuration)
    ) {
      sanitizedSettings.shortBreakDuration = defaultSettings.shortBreakDuration;
    }
    if (
      sanitizedSettings.longBreakDuration &&
      isNaN(sanitizedSettings.longBreakDuration)
    ) {
      sanitizedSettings.longBreakDuration = defaultSettings.longBreakDuration;
    }
    if (
      sanitizedSettings.totalSessions &&
      isNaN(sanitizedSettings.totalSessions)
    ) {
      sanitizedSettings.totalSessions = defaultSettings.totalSessions;
    }

    const updatedSettings = { ...state.settings, ...sanitizedSettings };
    const newState = { ...state, settings: updatedSettings };

    // 現在のフェーズの時間が変更された場合、時間をリセット
    if (sanitizedSettings.workDuration && state.currentPhase === "work") {
      newState.timeLeft = updatedSettings.workDuration;
    } else if (
      sanitizedSettings.shortBreakDuration &&
      state.currentPhase === "shortBreak"
    ) {
      newState.timeLeft = updatedSettings.shortBreakDuration;
    } else if (
      sanitizedSettings.longBreakDuration &&
      state.currentPhase === "longBreak"
    ) {
      newState.timeLeft = updatedSettings.longBreakDuration;
    }

    saveState(newState);
  };

  const formatTime = (totalSeconds: number) => {
    // NaNや無効な値をチェック
    const safeSeconds =
      isNaN(totalSeconds) || totalSeconds < 0 ? 0 : Math.floor(totalSeconds);
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getPhaseColor = () => {
    switch (state.currentPhase) {
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
    switch (state.currentPhase) {
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

  const progress = () => {
    const phaseDuration = getPhaseDuration(state.currentPhase);
    if (isNaN(phaseDuration) || phaseDuration <= 0 || isNaN(state.timeLeft)) {
      return 0;
    }
    const calculatedProgress =
      ((phaseDuration - state.timeLeft) / phaseDuration) * 100;
    return isNaN(calculatedProgress)
      ? 0
      : Math.max(0, Math.min(100, calculatedProgress));
  };

  // ハイドレーションエラーを避けるため、クライアントサイドでのみレンダリング
  if (!isClient) {
    return (
      <ToolLayout
        locale={locale}
        t={t}
        title={t.pomodoroTimer.title}
        description={t.pomodoroTimer.description}
        icon={Timer}
      >
        <ToolSection>
          <div className="text-center py-8">
            <div className="text-lg">Loading...</div>
          </div>
        </ToolSection>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.pomodoroTimer.title}
      description={t.pomodoroTimer.description}
      icon={Timer}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.pomodoroTimer.howToUse.title}
          steps={t.pomodoroTimer.howToUse.steps}
          features={{
            title: t.pomodoroTimer.features.title,
            items: t.pomodoroTimer.features.items,
          }}
        />
      </ToolSection>

      {/* 設定セクション */}
      <ToolSection>
        <ToolInput>
          <div className="space-y-4 max-w-full">
            <div className="flex items-center justify-between gap-3 sm:gap-0">
              <h3 className="text-lg font-semibold">
                {t.pomodoroTimer.settings}
              </h3>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="button-secondary flex items-center space-x-2 text-sm"
              >
                <Settings size={16} />
                <span>
                  {showSettings
                    ? t.pomodoroTimer.closeSettings
                    : t.pomodoroTimer.settings}
                </span>
              </button>
            </div>

            {showSettings && (
              <div className="space-y-4 p-3 sm:p-4 bg-gray-50 rounded-lg max-w-full overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-full">
                  <div className="min-w-0">
                    <label className="block text-sm font-medium mb-1 truncate">
                      {t.pomodoroTimer.workDuration} ({t.pomodoroTimer.minutes})
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={
                        isNaN(state.settings.workDuration)
                          ? 25
                          : Math.floor(state.settings.workDuration / 60)
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          updateSettings({
                            workDuration: value * 60,
                          });
                        }
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="block text-sm font-medium mb-1 truncate">
                      {t.pomodoroTimer.shortBreakDuration} (
                      {t.pomodoroTimer.minutes})
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={
                        isNaN(state.settings.shortBreakDuration)
                          ? 5
                          : Math.floor(state.settings.shortBreakDuration / 60)
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          updateSettings({
                            shortBreakDuration: value * 60,
                          });
                        }
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="block text-sm font-medium mb-1 truncate">
                      {t.pomodoroTimer.longBreakDuration} (
                      {t.pomodoroTimer.minutes})
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={
                        isNaN(state.settings.longBreakDuration)
                          ? 15
                          : Math.floor(state.settings.longBreakDuration / 60)
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value > 0) {
                          updateSettings({
                            longBreakDuration: value * 60,
                          });
                        }
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="block text-sm font-medium mb-1 truncate">
                      {t.pomodoroTimer.totalSessions}
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={
                        isNaN(state.settings.totalSessions)
                          ? 4
                          : state.settings.totalSessions
                      }
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 2) {
                          updateSettings({
                            totalSessions: value,
                          });
                        }
                      }}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-full">
                  <div className="flex items-center space-x-2 min-w-0">
                    <input
                      type="checkbox"
                      id="autoStart"
                      checked={state.settings.autoStart}
                      onChange={(e) =>
                        updateSettings({ autoStart: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                    <label
                      htmlFor="autoStart"
                      className="text-sm font-medium truncate"
                    >
                      {t.pomodoroTimer.autoStart}
                    </label>
                  </div>

                  <div className="flex items-center space-x-2 min-w-0">
                    <input
                      type="checkbox"
                      id="soundEnabled"
                      checked={state.settings.soundEnabled}
                      onChange={(e) =>
                        updateSettings({ soundEnabled: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                    <label
                      htmlFor="soundEnabled"
                      className="text-sm font-medium truncate"
                    >
                      {t.pomodoroTimer.soundEnabled}
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ToolInput>
      </ToolSection>

      {/* Session Info */}
      <ToolSection>
        <ToolDisplay size="medium" centered>
          <div className="text-base sm:text-lg font-semibold text-gray-700 mb-2 text-center">
            {interpolate(t.pomodoroTimer.session, {
              current: state.currentSession.toString(),
              total: state.settings.totalSessions.toString(),
            })}
          </div>
          <div
            className={`text-lg sm:text-xl font-bold text-center ${getPhaseColor()}`}
          >
            {getPhaseText()}
          </div>
        </ToolDisplay>
      </ToolSection>

      {/* Timer Display */}
      <ToolSection>
        <ToolDisplay size="large">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6">
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
                strokeDashoffset={`${
                  2 * Math.PI * 45 * (1 - progress() / 100)
                }`}
                className={`transition-all duration-1000 ease-linear ${
                  state.currentPhase === "work"
                    ? "text-red-500"
                    : state.currentPhase === "shortBreak"
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                {formatTime(state.timeLeft)}
              </div>
            </div>
          </div>

          {state.isCompleted && (
            <div className="text-xl sm:text-2xl font-bold text-green-600 animate-pulse mb-4 text-center">
              {t.pomodoroTimer.completed}
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* Phase Indicators */}
      <ToolSection>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2 max-w-full overflow-hidden">
          <div
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium min-w-0 flex-shrink-0 ${
              state.currentPhase === "work"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="truncate">{t.pomodoroTimer.work}</span>
          </div>
          <div
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium min-w-0 flex-shrink-0 ${
              state.currentPhase === "shortBreak"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="truncate">{t.pomodoroTimer.shortBreak}</span>
          </div>
          <div
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium min-w-0 flex-shrink-0 ${
              state.currentPhase === "longBreak"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="truncate">{t.pomodoroTimer.longBreak}</span>
          </div>
        </div>
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <ToolControls>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-full">
            {!state.isRunning ? (
              <button
                onClick={startTimer}
                disabled={state.isCompleted}
                className="button-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-w-[120px] max-w-full px-4 py-2 flex-shrink-0"
              >
                <Play size={18} className="flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">
                  {t.timer.start}
                </span>
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="button-secondary flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[120px] max-w-full px-4 py-2 flex-shrink-0"
              >
                <Pause size={18} className="flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">
                  {t.timer.pause}
                </span>
              </button>
            )}

            <button
              onClick={resetTimer}
              className="button-secondary flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 min-w-[120px] max-w-full px-4 py-2 flex-shrink-0"
            >
              <RotateCcw size={18} className="flex-shrink-0" />
              <span className="text-sm sm:text-base truncate">
                {t.timer.reset}
              </span>
            </button>
          </div>
        </ToolControls>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.pomodoroTimer.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
