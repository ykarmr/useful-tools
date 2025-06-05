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
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const diceOptions = [4, 6, 8, 10, 12, 20];

  const rollDice = () => {
    setIsRolling(true);
    setResult(null);

    // Simulate rolling animation
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * sides) + 1;
      setResult(newResult);
      setIsRolling(false);
      setTimeout(() => {
        alert(`You rolled a ${newResult}!`);
      }, 1000);
    }, 1000);
  };

  const getDiceIcon = () => {
    if (isRolling) return <Dice1 className="animate-spin" size={80} />;

    if (!result) return <Dice1 size={80} />;

    return (
      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-2xl font-bold">
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
          <div className="flex flex-wrap justify-center gap-2">
            {diceOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSides(option)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  sides === option
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-pressed={sides === option}
                aria-label={`${option} sided die`}
              >
                D{option}
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
