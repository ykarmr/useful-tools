"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";

interface CoinFlipClientProps {
  locale: Locale;
  t: Translations;
}

export default function CoinFlipClient({ locale, t }: CoinFlipClientProps) {
  const [numCoins, setNumCoins] = useState(1);
  const [result, setResult] = useState<("heads" | "tails")[] | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const newResult = Array.from({ length: numCoins }, () =>
        Math.random() < 0.5 ? "heads" : "tails"
      );
      setResult(newResult);
      setIsFlipping(false);
    }, 1500);
  };

  const selectCoinCount = (count: number) => {
    setNumCoins(count);
    setResult(null);
    setIsFlipping(false);
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.coinFlip.title}
      description={t.coinFlip.description}
      icon={Coins}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.coinFlip.howToUse.title}
          steps={t.coinFlip.howToUse.steps}
          features={{
            title: t.coinFlip.howToUse.features.title,
            items: t.coinFlip.howToUse.features.items,
          }}
        />
      </ToolSection>

      {/* Coin Display */}
      <ToolSection>
        <ToolDisplay size="large">
          <div className="flex flex-col items-center mb-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {isFlipping || !result
                ? Array.from({ length: numCoins }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-20 h-20 rounded-full border-4 border-yellow-400 bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                        isFlipping ? "animate-spin" : ""
                      }`}
                      role="img"
                      aria-label={
                        isFlipping ? "Coin flipping" : "Coin ready to flip"
                      }
                    >
                      <Coins size={32} />
                    </div>
                  ))
                : result.map((r, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-full border-4 border-yellow-400 bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      role="img"
                      aria-label={
                        r === "heads" ? t.coinFlip.heads : t.coinFlip.tails
                      }
                    >
                      {r === "heads" ? t.coinFlip.heads : t.coinFlip.tails}
                    </div>
                  ))}
            </div>
            {/* コイン枚数選択 */}
            <div className="mt-4">
              <label className="mr-2 text-gray-700 font-medium">
                {t.coinFlip.selectCount}
              </label>
              <select
                value={numCoins}
                onChange={(e) => selectCoinCount(Number(e.target.value))}
                disabled={isFlipping}
                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-label="Number of coins"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {result && !isFlipping && (
            <div className="text-2xl font-bold text-gray-900 animate-slide-up mt-4 flex flex-wrap gap-2 justify-center">
              {result.map((r, i) => (
                <span key={i}>
                  {r === "heads" ? t.coinFlip.heads : t.coinFlip.tails}
                </span>
              ))}
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

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.coinFlip.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
