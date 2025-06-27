"use client";

import { useState } from "react";
import { Dice1 } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import ToolFaq from "@/components/layout/tool-faq";
import ToolStats from "@/components/layout/tool-stats";
import { Locale, Translations } from "@/locales";

interface DiceRollerClientProps {
  locale: Locale;
  t: Translations;
}

interface RollHistoryItem {
  result: number[];
  total: number;
  timestamp: Date;
  diceSettings: {
    sides: number;
    count: number;
  };
  statistics: {
    average: string;
    highest: number;
    lowest: number;
    distribution: { [key: number]: number };
  };
}

export default function DiceRollerClient({ locale, t }: DiceRollerClientProps) {
  const [sides, setSides] = useState(6);
  const [numDice, setNumDice] = useState(1);
  const [result, setResult] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState<RollHistoryItem[]>([]);

  const diceOptions = [4, 6, 8, 10, 12, 16, 20, 24, 32];

  const rollDice = () => {
    setIsRolling(true);

    let animationInterval: NodeJS.Timeout;
    animationInterval = setInterval(() => {
      setResult(
        Array.from(
          { length: numDice },
          () => Math.floor(Math.random() * sides) + 1
        )
      );
    }, 80);

    setTimeout(() => {
      clearInterval(animationInterval);
      const newResult = Array.from(
        { length: numDice },
        () => Math.floor(Math.random() * sides) + 1
      );
      setResult(newResult);
      const total = newResult.reduce((sum, value) => sum + value, 0);

      // 統計情報を計算
      const average =
        newResult.length > 0
          ? (
              newResult.reduce((sum, roll) => sum + roll, 0) / newResult.length
            ).toFixed(2)
          : "0";
      const highest = newResult.length > 0 ? Math.max(...newResult) : 0;
      const lowest = newResult.length > 0 ? Math.min(...newResult) : 0;

      // 出目分布を計算（出た目のみ）
      const distribution: { [key: number]: number } = {};
      newResult.forEach((roll) => {
        distribution[roll] = (distribution[roll] || 0) + 1;
      });

      setRollHistory((prev) => [
        {
          result: newResult,
          total,
          timestamp: new Date(),
          diceSettings: {
            sides,
            count: numDice,
          },
          statistics: {
            average,
            highest,
            lowest,
            distribution,
          },
        },
        ...prev.slice(0, 9),
      ]);
      setIsRolling(false);
    }, 1000);
  };

  const selectDiceCount = (count: number) => {
    setNumDice(count);
    setResult([]);
    setIsRolling(false);
  };

  const handleSidesChange = (sides: number) => {
    setSides(sides);
    setResult([]);
    setIsRolling(false);
  };

  const clearHistory = () => {
    setRollHistory([]);
    setResult([]);
  };

  const total = result.reduce((sum, value) => sum + value, 0);

  // 履歴から全体統計データ計算
  const allRolls = rollHistory.flatMap((roll) => roll.result);
  const totalRolls = allRolls.length;
  const overallAverageValue =
    totalRolls > 0
      ? (allRolls.reduce((sum, roll) => sum + roll, 0) / totalRolls).toFixed(2)
      : "0";
  const overallHighestRoll = totalRolls > 0 ? Math.max(...allRolls) : 0;
  const overallLowestRoll = totalRolls > 0 ? Math.min(...allRolls) : 0;

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.diceRoller.title}
      subtitle={t.diceRoller.subTitle}
      description={t.diceRoller.description}
      icon={Dice1}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.diceRoller.howToUse.title}
          steps={t.diceRoller.howToUse.steps}
          features={{
            title: t.diceRoller.features.title,
            items: t.diceRoller.features.items,
          }}
        />
      </ToolSection>

      {/* メイン機能セクション */}
      <ToolSection>
        <div className="space-y-8">
          {/* 設定セクション */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* サイコロの面数選択 */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t.diceRoller.sides}
                  </h3>
                  <p className="text-sm text-gray-600">
                    面数を選択してください
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-white rounded-2xl border-2 border-gray-200/50 overflow-hidden shadow-lg">
                      <div className="flex items-center">
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-r border-gray-200">
                          <span className="text-xl font-bold text-gray-700">
                            D
                          </span>
                        </div>
                        <select
                          value={sides}
                          onChange={(e) =>
                            handleSidesChange(Number(e.target.value))
                          }
                          disabled={isRolling}
                          className="
                            px-6 py-4 bg-transparent border-none text-xl font-bold text-gray-800
                            focus:outline-none focus:ring-0 cursor-pointer min-w-[80px]
                            disabled:opacity-50 disabled:cursor-not-allowed
                          "
                          aria-label="Number of sides"
                        >
                          {diceOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* サイコロの個数選択 */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t.diceRoller.count}
                  </h3>
                  <p className="text-sm text-gray-600">
                    投げる個数を選択してください
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-20"></div>
                    <div className="relative bg-white rounded-2xl border-2 border-gray-200/50 overflow-hidden shadow-lg">
                      <div className="flex items-center">
                        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-blue-50 border-r border-gray-200">
                          <span className="text-lg font-semibold text-gray-700">
                            ×
                          </span>
                        </div>
                        <select
                          value={numDice}
                          onChange={(e) =>
                            selectDiceCount(Number(e.target.value))
                          }
                          disabled={isRolling}
                          className="
                            px-6 py-4 bg-transparent border-none text-xl font-bold text-gray-800
                            focus:outline-none focus:ring-0 cursor-pointer min-w-[80px]
                            disabled:opacity-50 disabled:cursor-not-allowed
                          "
                          aria-label="Number of dice"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* サイコロ表示エリア */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 rounded-3xl p-8 shadow-2xl border border-gray-200/50">
            <div className="space-y-8">
              {/* サイコロ表示 */}
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center min-h-[120px] items-center px-4">
                {result.length === 0
                  ? Array.from({ length: numDice }).map((_, i) => (
                      <div
                        key={i}
                        className={`
                          w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-50 to-gray-100
                          rounded-3xl flex items-center justify-center text-gray-400
                          shadow-xl border-2 border-gray-200/50 backdrop-blur-sm
                          transition-all duration-500 hover:scale-105
                          ${isRolling ? "animate-bounce" : ""}
                        `}
                      >
                        <Dice1 className="w-8 h-8 md:w-10 md:h-10" />
                      </div>
                    ))
                  : result.map((r, i) => (
                      <div
                        key={i}
                        className={`
                          w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-white via-blue-50 to-indigo-100
                          rounded-3xl flex items-center justify-center text-3xl md:text-4xl font-black
                          shadow-2xl border-2 border-blue-200/50 backdrop-blur-sm
                          ${isRolling ? "animate-spin" : "animate-pulse"}
                          transform transition-all duration-500 hover:scale-110 hover:shadow-3xl
                          relative overflow-hidden
                        `}
                        style={{
                          background: `linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, ${
                            r >= sides * 0.8
                              ? "#c8e6c9"
                              : r <= sides * 0.2
                              ? "#ffcdd2"
                              : "#e1f5fe"
                          } 100%)`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                        <span className="relative z-10 text-gray-800 drop-shadow-sm">
                          {r}
                        </span>
                      </div>
                    ))}
              </div>

              {/* 合計表示 */}
              {result.length > 1 && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                    <span className="relative z-10 text-lg font-semibold opacity-95">
                      {t.diceRoller.total}
                    </span>
                    <span className="relative z-10 text-3xl font-black drop-shadow-sm">
                      {total}
                    </span>
                  </div>
                </div>
              )}

              {/* ロールボタン */}
              <ToolControls>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur opacity-30"></div>
                  <button
                    onClick={rollDice}
                    disabled={isRolling}
                    className="
                      relative text-xl px-12 py-5 rounded-3xl font-black text-white
                      bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                      hover:from-purple-600 hover:via-pink-600 hover:to-red-600
                      transform transition-all duration-300 hover:scale-105 active:scale-95
                      shadow-2xl hover:shadow-3xl disabled:opacity-60 disabled:cursor-not-allowed 
                      disabled:transform-none focus:outline-none focus:ring-4 focus:ring-purple-300
                      border-2 border-white/20 backdrop-blur-sm overflow-hidden
                    "
                    aria-label={isRolling ? "Rolling dice" : "Roll dice"}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                    {isRolling ? (
                      <div className="relative z-10 flex items-center gap-3">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        {locale === "ja"
                          ? "振り中..."
                          : locale === "en"
                          ? "Rolling..."
                          : locale === "es"
                          ? "Lanzando..."
                          : locale === "ru"
                          ? "Бросаем..."
                          : "投掷中..."}
                      </div>
                    ) : (
                      <div className="relative z-10 flex items-center gap-3">
                        <Dice1 size={24} />
                        {t.diceRoller.roll}
                      </div>
                    )}
                  </button>
                </div>
              </ToolControls>
            </div>
          </div>

          {/* 履歴・統計表示 */}
          {rollHistory.length > 0 && (
            <div className="space-y-8">
              {/* 履歴セクション */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {t.diceRoller.history}
                  </h4>
                  <button
                    onClick={clearHistory}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl 
                                transition-colors duration-200 text-sm font-medium border border-red-200/50"
                  >
                    {t.diceRoller.clearHistory}
                  </button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {rollHistory.map((roll, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white to-gray-50/80 p-5 rounded-2xl 
                                  border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {/* ヘッダー情報 */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                                          px-3 py-1 rounded-lg text-sm font-semibold"
                          >
                            D{roll.diceSettings.sides} ×{" "}
                            {roll.diceSettings.count}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                          {roll.timestamp.toLocaleTimeString(locale, {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </div>
                      </div>

                      {/* 統計情報 */}
                      <div className="space-y-4">
                        <div className="text-sm font-bold text-gray-700 text-center flex items-center justify-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {t.diceRoller.statistics.title}
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>

                        {/* 基本統計 */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl text-center border border-blue-200/50">
                            <div className="text-lg font-black text-blue-700">
                              {roll.diceSettings.count}
                            </div>
                            <div className="text-xs text-blue-600 font-medium">
                              {t.diceRoller.statistics.totalRolls}
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl text-center border border-green-200/50">
                            <div className="text-lg font-black text-green-700">
                              {roll.total}
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                              {t.diceRoller.statistics.totalSum}
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl text-center border border-purple-200/50">
                            <div className="text-lg font-black text-purple-700">
                              {roll.statistics.average}
                            </div>
                            <div className="text-xs text-purple-600 font-medium">
                              {t.diceRoller.statistics.averageValue}
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl text-center border border-orange-200/50">
                            <div className="text-lg font-black text-orange-700">
                              {roll.statistics.highest} /{" "}
                              {roll.statistics.lowest}
                            </div>
                            <div className="text-xs text-orange-600 font-medium">
                              {t.diceRoller.statistics.highestLowest}
                            </div>
                          </div>
                        </div>

                        {/* 出目分布 */}
                        <div className="space-y-3">
                          <div className="text-sm font-bold text-gray-700 text-center flex items-center justify-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {t.diceRoller.statistics.distribution}
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {roll.result.map((value, index) => (
                              <div
                                key={index}
                                className="
                                    w-12 h-12 bg-gradient-to-br from-white via-blue-50 to-indigo-100
                                    rounded-2xl flex items-center justify-center
                                    shadow-lg border-2 border-blue-200/50 backdrop-blur-sm
                                    transform transition-all duration-300 hover:scale-110
                                  "
                              >
                                <div className="text-sm font-black text-blue-700">
                                  {value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 全体統計セクション */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl p-6 shadow-xl border border-gray-200/50">
                <h4 className="text-xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  {t.diceRoller.statistics.overallStats}
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </h4>

                {/* 全体統計 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center border border-blue-200/50 shadow-lg">
                    <div className="text-2xl font-black text-blue-700 mb-1">
                      {rollHistory.length}
                    </div>
                    <div className="text-sm text-blue-600 font-semibold">
                      {t.diceRoller.statistics.rollSessions}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl text-center border border-green-200/50 shadow-lg">
                    <div className="text-2xl font-black text-green-700 mb-1">
                      {totalRolls}
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      {t.diceRoller.statistics.totalRolls}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-center border border-purple-200/50 shadow-lg">
                    <div className="text-2xl font-black text-purple-700 mb-1">
                      {overallAverageValue}
                    </div>
                    <div className="text-sm text-purple-600 font-semibold">
                      {t.diceRoller.statistics.averageValue}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl text-center border border-orange-200/50 shadow-lg">
                    <div className="text-2xl font-black text-orange-700 mb-1">
                      {overallHighestRoll} / {overallLowestRoll}
                    </div>
                    <div className="text-sm text-orange-600 font-semibold">
                      {t.diceRoller.statistics.highestLowest}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.diceRoller.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
