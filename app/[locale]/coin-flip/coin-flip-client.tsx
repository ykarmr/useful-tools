"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import { Locale, Translations } from "@/locales";

interface CoinFlipClientProps {
  locale: Locale;
  t: Translations;
}

export default function CoinFlipClient({ locale, t }: CoinFlipClientProps) {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(newResult);
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.coinFlip.title}
      description={t.coinFlip.description}
      icon={Coins}
    >
      {/* Coin Display */}
      <ToolSection>
        <ToolDisplay size="large">
          <div className="flex justify-center mb-6">
            <div
              className={`w-32 h-32 rounded-full border-4 border-yellow-400 bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                isFlipping ? "animate-spin" : ""
              }`}
              role="img"
              aria-label={
                isFlipping
                  ? "Coin flipping"
                  : result === "heads"
                  ? "Heads"
                  : result === "tails"
                  ? "Tails"
                  : "Coin ready to flip"
              }
            >
              {isFlipping ? (
                <Coins size={40} />
              ) : result === "heads" ? (
                "H"
              ) : result === "tails" ? (
                "T"
              ) : (
                <Coins size={40} />
              )}
            </div>
          </div>

          {result && !isFlipping && (
            <div className="text-4xl font-bold text-gray-900 animate-slide-up">
              {result === "heads" ? t.coinFlip.heads : t.coinFlip.tails}
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* Controls */}
      <ToolSection>
        <ToolControls>
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className="button-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={isFlipping ? "Flipping coin" : "Flip coin"}
          >
            {isFlipping ? t.coinFlip.flipping : t.coinFlip.flip}
          </button>
        </ToolControls>
      </ToolSection>
    </ToolLayout>
  );
}
