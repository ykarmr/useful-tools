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
      subtitle={t.coinFlip.subTitle}
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

      {/* コイン設定セクション */}
      <ToolSection>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 p-8 shadow-lg shadow-gray-200/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 tracking-tight">
              {t.coinFlip.selectCount}
            </h3>

            {/* 数値選択ボタンのグリッド */}
            <div className="grid grid-cols-5 gap-3 mb-8 max-w-md mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => selectCoinCount(n)}
                  disabled={isFlipping}
                  className={`
                    h-12 w-12 rounded-xl font-semibold text-sm transition-all duration-200 
                    ${
                      numCoins === n
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  `}
                  aria-label={`Select ${n} ${n === 1 ? "coin" : "coins"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <ToolControls>
            <button
              onClick={flipCoin}
              disabled={isFlipping}
              className={`
                relative px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300
                ${
                  isFlipping
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 active:scale-95"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                overflow-hidden
              `}
              aria-label={isFlipping ? "Flipping coin" : "Flip coin"}
            >
              <span className="relative z-10">
                {isFlipping ? t.coinFlip.flipping : t.coinFlip.flip}
              </span>
              {!isFlipping && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] hover:animate-shimmer"></div>
              )}
            </button>
          </ToolControls>
        </div>
      </ToolSection>

      {/* コイン表示セクション */}
      <ToolSection>
        <ToolDisplay size="large">
          <div className="flex flex-col items-center mb-8">
            <div className="flex flex-wrap gap-6 justify-center">
              {isFlipping || !result
                ? Array.from({ length: numCoins }).map((_, i) => (
                    <div
                      key={i}
                      className={`
                        relative w-24 h-24 rounded-full 
                        bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400
                        border-4 border-amber-300
                        flex items-center justify-center text-amber-800 font-bold text-lg 
                        shadow-2xl shadow-amber-500/30
                        ${
                          isFlipping
                            ? "animate-spin"
                            : "animate-pulse hover:scale-110 transition-transform duration-1000"
                        }
                      `}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        background: isFlipping
                          ? "conic-gradient(from 0deg, #fbbf24, #f59e0b, #d97706, #fbbf24)"
                          : undefined,
                      }}
                      role="img"
                      aria-label={
                        isFlipping ? "Coin flipping" : "Coin ready to flip"
                      }
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/40"></div>
                      <Coins
                        size={36}
                        className="relative z-10 drop-shadow-sm"
                      />
                    </div>
                  ))
                : result.map((r, i) => (
                    <div
                      key={i}
                      className={`
                        relative w-24 h-24 rounded-full 
                        ${
                          r === "heads"
                            ? "bg-gradient-to-br from-emerald-300 via-green-400 to-emerald-500 border-emerald-400"
                            : "bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 border-rose-400"
                        }
                        border-4 flex items-center justify-center text-white font-bold text-sm
                        shadow-2xl ${
                          r === "heads"
                            ? "shadow-emerald-500/40"
                            : "shadow-rose-500/40"
                        }
                        hover:scale-110 transition-transform duration-300
                      `}
                      role="img"
                      aria-label={
                        r === "heads" ? t.coinFlip.heads : t.coinFlip.tails
                      }
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/40"></div>
                      <span className="relative z-10 drop-shadow-sm px-1 text-center leading-tight">
                        {r === "heads" ? t.coinFlip.heads : t.coinFlip.tails}
                      </span>
                    </div>
                  ))}
            </div>
          </div>

          {result && !isFlipping && (
            <div className="text-center">
              {/* 統計表示 */}
              {result.length > 1 && (
                <div className="mt-6 grid grid-cols-2 gap-4 max-w-xs mx-auto">
                  <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-700">
                      {result.filter((r) => r === "heads").length}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium">
                      {t.coinFlip.heads}
                    </div>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-3 border border-rose-200">
                    <div className="text-2xl font-bold text-rose-700">
                      {result.filter((r) => r === "tails").length}
                    </div>
                    <div className="text-sm text-rose-600 font-medium">
                      {t.coinFlip.tails}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ToolDisplay>
      </ToolSection>

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.coinFlip.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
