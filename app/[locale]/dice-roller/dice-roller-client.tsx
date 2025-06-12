"use client";

import { useState } from "react";
import { Dice1 } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";

interface DiceRollerClientProps {
  locale: Locale;
  t: Translations;
}

export default function DiceRollerClient({ locale, t }: DiceRollerClientProps) {
  const [sides, setSides] = useState(6);
  const [numDice, setNumDice] = useState(1);
  const [result, setResult] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

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
      setIsRolling(false);
    }, 1000);
  };

  const getDiceIcon = () => {
    return (
      <div className="flex flex-wrap gap-4 justify-center">
        {result.length === 0
          ? Array.from({ length: numDice }).map((_, i) => (
              <div
                key={i}
                className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold ${
                  isRolling ? "animate-spin" : ""
                }`}
              >
                ?
              </div>
            ))
          : result.map((r, i) => (
              <div
                key={i}
                className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold ${
                  isRolling ? "animate-spin" : ""
                }`}
              >
                {r}
              </div>
            ))}
      </div>
    );
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
        <div className="flex flex-col items-center mb-4 text-primary-600">
          {getDiceIcon()}
          <div className="mt-4">
            <label className="mr-2 text-gray-700 font-medium">
              {t.diceRoller.selectCount}:
            </label>
            <select
              value={numDice}
              onChange={(e) => selectDiceCount(Number(e.target.value))}
              disabled={isRolling}
              className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
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
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <div className="space-y-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {diceOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSidesChange(option)}
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

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.diceRoller.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
