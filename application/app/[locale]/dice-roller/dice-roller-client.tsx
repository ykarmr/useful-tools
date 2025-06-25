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
          <div className="grid grid-cols-1 gap-6">
            {/* サイコロの面数選択 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {t.diceRoller.sides}
              </h3>
              <div className="flex justify-center">
                <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 p-1">
                  <label className="px-4 py-2 text-gray-700 font-medium">
                    D
                  </label>
                  <select
                    value={sides}
                    onChange={(e) => handleSidesChange(Number(e.target.value))}
                    disabled={isRolling}
                    className="
                      px-3 py-2 bg-transparent border-none rounded-lg font-semibold text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                      disabled:opacity-50 cursor-pointer
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

            {/* サイコロの個数選択 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {t.diceRoller.count}
              </h3>
              <div className="flex justify-center">
                <div className="flex items-center bg-white rounded-xl border-2 border-gray-200 p-1">
                  <label className="px-4 py-2 text-gray-700 font-medium">
                    {t.diceRoller.count}:
                  </label>
                  <select
                    value={numDice}
                    onChange={(e) => selectDiceCount(Number(e.target.value))}
                    disabled={isRolling}
                    className="
                      px-3 py-2 bg-transparent border-none rounded-lg font-semibold text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                      disabled:opacity-50 cursor-pointer
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

          {/* サイコロ表示 */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center min-h-[100px] items-center px-4">
              {result.length === 0
                ? Array.from({ length: numDice }).map((_, i) => (
                    <div
                      key={i}
                      className={`
                        w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 
                        rounded-2xl flex items-center justify-center text-gray-400
                        shadow-lg border-2 border-gray-300
                        ${isRolling ? "animate-bounce" : ""}
                      `}
                    >
                      <Dice1 className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  ))
                : result.map((r, i) => (
                    <div
                      key={i}
                      className={`
                        w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white to-blue-50
                        rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold text-blue-700
                        shadow-lg border-2 border-blue-200 
                        ${isRolling ? "animate-spin" : "animate-pulse"}
                        transform transition-all duration-300 hover:scale-110
                      `}
                    >
                      {r}
                    </div>
                  ))}
            </div>

            {/* 合計表示 */}
            {result.length > 1 && (
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg">
                  <span className="text-sm font-medium opacity-90">
                    {t.diceRoller.total}:{" "}
                  </span>
                  <span className="text-2xl font-bold">{total}</span>
                </div>
              </div>
            )}

            {/* ロールボタン */}
            <ToolControls>
              <button
                onClick={rollDice}
                disabled={isRolling}
                className="
                  button-primary text-lg px-8 py-4 rounded-2xl font-bold
                  bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                  transform transition-all duration-200 hover:scale-105 active:scale-95
                  shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed 
                  disabled:transform-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                "
                aria-label={isRolling ? "Rolling dice" : "Roll dice"}
              >
                {isRolling ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                  <div className="flex items-center gap-2">
                    <Dice1 size={20} />
                    {t.diceRoller.roll}
                  </div>
                )}
              </button>
            </ToolControls>

            {/* 履歴・統計表示 */}
            {rollHistory.length > 0 && (
              <div className="space-y-6">
                {/* 履歴セクション */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-700">
                      {t.diceRoller.history}
                    </h4>
                    <button
                      onClick={clearHistory}
                      className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      {t.diceRoller.clearHistory}
                    </button>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {rollHistory.map((roll, index) => (
                      <div
                        key={index}
                        className="bg-white px-4 py-4 rounded-lg border-2 border-gray-200 shadow-sm"
                      >
                        {/* ヘッダー情報 */}
                        <div className="flex justify-between items-start mb-3">
                          <div className="text-sm font-medium text-gray-600">
                            D{roll.diceSettings.sides} ×{" "}
                            {roll.diceSettings.count}
                          </div>
                          <div className="text-xs text-gray-400">
                            {roll.timestamp.toLocaleTimeString(locale, {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </div>
                        </div>

                        {/* 統計情報 */}
                        <div className="space-y-3">
                          <div className="text-xs font-semibold text-gray-600 text-center">
                            {t.diceRoller.statistics.title}
                          </div>

                          {/* 基本統計 */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-lg text-center">
                              <div className="text-sm font-bold text-blue-700">
                                {roll.diceSettings.count}
                              </div>
                              <div className="text-xs text-blue-600">
                                {t.diceRoller.statistics.totalRolls}
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-2 rounded-lg text-center">
                              <div className="text-sm font-bold text-green-700">
                                {roll.total}
                              </div>
                              <div className="text-xs text-green-600">
                                {t.diceRoller.statistics.totalSum}
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-2 rounded-lg text-center">
                              <div className="text-sm font-bold text-purple-700">
                                {roll.statistics.average}
                              </div>
                              <div className="text-xs text-purple-600">
                                {t.diceRoller.statistics.averageValue}
                              </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-2 rounded-lg text-center">
                              <div className="text-sm font-bold text-orange-700">
                                {roll.statistics.highest} /{" "}
                                {roll.statistics.lowest}
                              </div>
                              <div className="text-xs text-orange-600">
                                {t.diceRoller.statistics.highestLowest}
                              </div>
                            </div>
                          </div>

                          {/* 出目分布 */}
                          <div className="space-y-3">
                            <div className="text-xs font-semibold text-gray-600 text-center">
                              {t.diceRoller.statistics.distribution}
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {roll.result.map((value, index) => (
                                <div
                                  key={index}
                                  className="
                                    w-12 h-12 bg-gradient-to-br from-white to-blue-50
                                    rounded-2xl flex items-center justify-center
                                    shadow-lg border-2 border-blue-200 
                                    transform transition-all duration-300
                                  "
                                >
                                  <div className="text-sm font-bold text-blue-700">
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

                {/* 簡略統計情報セクション */}
                <div className="space-y-4">
                  <h4 className="text-center font-semibold text-gray-700">
                    {t.diceRoller.statistics.overallStats}
                  </h4>

                  {/* 全体統計（簡単版） */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-blue-700">
                        {rollHistory.length}
                      </div>
                      <div className="text-xs text-blue-600">
                        {t.diceRoller.statistics.rollSessions}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-green-700">
                        {totalRolls}
                      </div>
                      <div className="text-xs text-green-600">
                        {t.diceRoller.statistics.totalRolls}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-purple-700">
                        {overallAverageValue}
                      </div>
                      <div className="text-xs text-purple-600">
                        {t.diceRoller.statistics.averageValue}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-orange-700">
                        {overallHighestRoll} / {overallLowestRoll}
                      </div>
                      <div className="text-xs text-orange-600">
                        {t.diceRoller.statistics.highestLowest}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolSection>

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.diceRoller.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
