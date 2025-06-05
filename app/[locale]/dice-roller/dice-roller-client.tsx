"use client";

import { useState } from "react";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import { Locale, Translations } from "@/locales";

interface DiceRollerClientProps {
  locale: Locale;
  t: Translations;
}

export default function DiceRollerClient({ locale, t }: DiceRollerClientProps) {
  const [sides, setSides] = useState(6);
  const [result, setResult] = useState<number>(1);
  const [isRolling, setIsRolling] = useState(false);

  const diceOptions = [4, 6, 8, 10, 12, 16, 20, 24, 32];

  const rollDice = () => {
    setIsRolling(true);

    // アニメーション用のintervalを追加
    let animationInterval: NodeJS.Timeout;
    animationInterval = setInterval(() => {
      setResult(Math.floor(Math.random() * sides) + 1);
    }, 80);

    setTimeout(() => {
      clearInterval(animationInterval);
      const newResult = Math.floor(Math.random() * sides) + 1;
      setResult(newResult);
      setIsRolling(false);
      setTimeout(() => {
        alert(
          t.diceRoller.resultMessage.replace("{result}", String(newResult))
        );
      }, 1000);
    }, 500);
  };

  const getDiceIcon = () => {
    return (
      <div
        className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold ${
          isRolling ? "animate-spin" : ""
        }`}
      >
        {result}
      </div>
    );
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.diceRoller.title}
      description={t.diceRoller.description}
      icon={Dice1}
    >
      {/* Dice Display */}
      <ToolSection>
        <div className="flex justify-center mb-4 text-primary-600">
          {getDiceIcon()}
        </div>
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <div className="space-y-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {diceOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSides(option)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  sides === option
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-pressed={sides === option}
                aria-label={`${option} sided die`}
              >
                {t.diceRoller.sides}:{option}
              </button>
            ))}
          </div>

          <ToolControls>
            <button
              onClick={rollDice}
              disabled={isRolling}
              className="button-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isRolling ? "Rolling dice" : "Roll dice"}
            >
              {isRolling ? "Rolling..." : t.diceRoller.roll}
            </button>
          </ToolControls>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
