"use client";

import { useState } from "react";
import { Calculator, History, Trash2 } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";

interface CalculatorClientProps {
  locale: Locale;
  t: Translations;
}

interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: number;
}

export default function CalculatorClient({ locale, t }: CalculatorClientProps) {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(true);
  const [memory, setMemory] = useState(0);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);

  // 数値入力
  const inputNumber = (num: string) => {
    if (isResultDisplayed) {
      setDisplay(num);
      setExpression(num);
      setIsResultDisplayed(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
      setExpression(expression + num);
    }
  };

  // 小数点入力
  const inputDecimal = () => {
    if (isResultDisplayed) {
      setDisplay("0.");
      setExpression("0.");
      setIsResultDisplayed(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
      setExpression(expression + ".");
    }
  };

  // 演算子入力
  const inputOperator = (op: string) => {
    if (isResultDisplayed) {
      setExpression(display + op);
      setIsResultDisplayed(false);
    } else {
      setExpression(expression + op);
    }
    setDisplay("0");
  };

  // 関数入力
  const inputFunction = (func: string) => {
    if (isResultDisplayed) {
      setExpression(func + "(");
      setIsResultDisplayed(false);
    } else {
      setExpression(expression + func + "(");
    }
    setDisplay("0");
  };

  // 定数入力
  const inputConstant = (constant: string) => {
    const value = constant === "π" ? Math.PI.toString() : Math.E.toString();
    if (isResultDisplayed) {
      setDisplay(value);
      setExpression(value);
      setIsResultDisplayed(false);
    } else {
      setDisplay(value);
      setExpression(expression + value);
    }
  };

  // 括弧入力
  const inputParenthesis = (paren: string) => {
    if (isResultDisplayed && paren === "(") {
      setExpression(paren);
      setIsResultDisplayed(false);
    } else {
      setExpression(expression + paren);
    }
    setDisplay("0");
  };

  // クリア
  const clear = () => {
    setDisplay("0");
    setExpression("");
    setIsResultDisplayed(false);
  };

  // 全クリア
  const clearAll = () => {
    clear();
    setMemory(0);
  };

  // バックスペース
  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else {
      setDisplay("0");
      setExpression("");
    }
  };

  // 式の評価
  const evaluateExpression = (expr: string): number => {
    try {
      // 数学関数を置換
      let processedExpr = expr;

      // 演算子の置換（関数置換前に実行）
      processedExpr = processedExpr.replace(/×/g, "*");
      processedExpr = processedExpr.replace(/÷/g, "/");
      processedExpr = processedExpr.replace(/\^/g, "**");

      // 定数の置換（単語境界を考慮）
      processedExpr = processedExpr.replace(/\bπ\b/g, "Math.PI");
      processedExpr = processedExpr.replace(/\be\b/g, "Math.E");

      // 暗黙の乗算を明示的に（関数置換前に実行）
      // 数字の後に括弧が来る場合（ただし関数でない場合）
      processedExpr = processedExpr.replace(/(\d)(\()/g, "$1*$2");
      processedExpr = processedExpr.replace(/(\))(\d)/g, "$1*$2");
      processedExpr = processedExpr.replace(/(\))(\()/g, "$1*$2");

      // 三角関数（度数法から弧度法への変換）
      processedExpr = processedExpr.replace(/\bsin\(/g, "Math.sin(");
      processedExpr = processedExpr.replace(/\bcos\(/g, "Math.cos(");
      processedExpr = processedExpr.replace(/\btan\(/g, "Math.tan(");

      // 逆三角関数（弧度法から度数法への変換）
      processedExpr = processedExpr.replace(/\basin\(/g, "Math.asin(");
      processedExpr = processedExpr.replace(/\bacos\(/g, "Math.acos(");
      processedExpr = processedExpr.replace(/\batan\(/g, "Math.atan(");

      // その他の関数（単語境界を考慮）
      processedExpr = processedExpr.replace(/\blog\(/g, "Math.log10(");
      processedExpr = processedExpr.replace(/\bln\(/g, "Math.log(");
      processedExpr = processedExpr.replace(/\bsqrt\(/g, "Math.sqrt(");
      processedExpr = processedExpr.replace(/\bexp\(/g, "Math.exp(");
      processedExpr = processedExpr.replace(/\babs\(/g, "Math.abs(");
      processedExpr = processedExpr.replace(/\bceil\(/g, "Math.ceil(");
      processedExpr = processedExpr.replace(/\bfloor\(/g, "Math.floor(");
      processedExpr = processedExpr.replace(/\bround\(/g, "Math.round(");

      // 暗黙の乗算で誤って変換されたMath関数を修正
      processedExpr = processedExpr.replace(/Math\.(\w+)\*(\d+)/g, "Math.$1$2");
      processedExpr = processedExpr.replace(/Math\.(\w+)\*/g, "Math.$1");

      // 三角関数の度数法変換を実行
      processedExpr = processedExpr.replace(
        /Math\.sin\(([^)]+)\)/g,
        (match, p1) => `Math.sin(${p1} * Math.PI / 180)`
      );
      processedExpr = processedExpr.replace(
        /Math\.cos\(([^)]+)\)/g,
        (match, p1) => `Math.cos(${p1} * Math.PI / 180)`
      );
      processedExpr = processedExpr.replace(
        /Math\.tan\(([^)]+)\)/g,
        (match, p1) => `Math.tan(${p1} * Math.PI / 180)`
      );

      // 逆三角関数の弧度法から度数法への変換
      processedExpr = processedExpr.replace(
        /Math\.asin\(([^)]+)\)/g,
        (match, p1) => `(Math.asin(${p1}) * 180 / Math.PI)`
      );
      processedExpr = processedExpr.replace(
        /Math\.acos\(([^)]+)\)/g,
        (match, p1) => `(Math.acos(${p1}) * 180 / Math.PI)`
      );
      processedExpr = processedExpr.replace(
        /Math\.atan\(([^)]+)\)/g,
        (match, p1) => `(Math.atan(${p1}) * 180 / Math.PI)`
      );

      const result = Function('"use strict"; return (' + processedExpr + ")")();
      return result;
    } catch (error) {
      throw new Error("Invalid expression");
    }
  };

  // 計算実行
  const calculate = () => {
    try {
      const result = evaluateExpression(expression);

      // 無効な結果のチェック
      if (isNaN(result) || !isFinite(result)) {
        setDisplay("Error");
        setExpression("0");
        setIsResultDisplayed(true);
        return;
      }

      const resultStr = result.toString();

      // 履歴に追加
      const newHistory: CalculationHistory = {
        expression: expression,
        result: resultStr,
        timestamp: Date.now(),
      };
      setHistory((prev) => [newHistory, ...prev.slice(0, 19)]); // 最大20件保持

      setDisplay(resultStr);
      setExpression(resultStr);
      setIsResultDisplayed(true);
    } catch (error) {
      setDisplay("Error");
      setExpression("0");
      setIsResultDisplayed(true);
    }
  };

  // メモリ操作
  const memoryStore = () => {
    setMemory(Number.parseFloat(display));
  };

  const memoryRecall = () => {
    setDisplay(memory.toString());
    setExpression(
      isResultDisplayed ? memory.toString() : expression + memory.toString()
    );
    setIsResultDisplayed(false);
  };

  const memoryAdd = () => {
    setMemory(memory + Number.parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - Number.parseFloat(display));
  };

  const memoryClear = () => {
    setMemory(0);
  };

  // 履歴クリア
  const clearHistory = () => {
    setHistory([]);
  };

  // 履歴から式を選択
  const selectFromHistory = (historyItem: CalculationHistory) => {
    setExpression(historyItem.expression);
    setDisplay(historyItem.result);
    setIsResultDisplayed(true);
    setShowHistory(false);
  };

  // ボタン定義
  const basicButtons = [
    {
      label: "MC",
      action: memoryClear,
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "MR",
      action: memoryRecall,
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "M+",
      action: memoryAdd,
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "M-",
      action: memorySubtract,
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "MS",
      action: memoryStore,
      className: "bg-gray-500 hover:bg-gray-600",
    },

    { label: "C", action: clear, className: "bg-red-500 hover:bg-red-600" },
    { label: "CE", action: clearAll, className: "bg-red-500 hover:bg-red-600" },
    {
      label: "⌫",
      action: backspace,
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "÷",
      action: () => inputOperator("÷"),
      className: "bg-blue-500 hover:bg-blue-600",
    },

    {
      label: "7",
      action: () => inputNumber("7"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "8",
      action: () => inputNumber("8"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "9",
      action: () => inputNumber("9"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "×",
      action: () => inputOperator("×"),
      className: "bg-blue-500 hover:bg-blue-600",
    },

    {
      label: "4",
      action: () => inputNumber("4"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "5",
      action: () => inputNumber("5"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "6",
      action: () => inputNumber("6"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "-",
      action: () => inputOperator("-"),
      className: "bg-blue-500 hover:bg-blue-600",
    },

    {
      label: "1",
      action: () => inputNumber("1"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "2",
      action: () => inputNumber("2"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "3",
      action: () => inputNumber("3"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "+",
      action: () => inputOperator("+"),
      className: "bg-blue-500 hover:bg-blue-600",
    },

    {
      label: "0",
      action: () => inputNumber("0"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: ".",
      action: inputDecimal,
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "=",
      action: calculate,
      className: "bg-green-500 hover:bg-green-600",
    },
  ];

  const scientificButtons = [
    {
      label: "sin",
      action: () => inputFunction("sin"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "cos",
      action: () => inputFunction("cos"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "tan",
      action: () => inputFunction("tan"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "asin",
      action: () => inputFunction("asin"),
      className: "bg-purple-500 hover:bg-purple-600",
    },

    {
      label: "acos",
      action: () => inputFunction("acos"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "atan",
      action: () => inputFunction("atan"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "log",
      action: () => inputFunction("log"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "ln",
      action: () => inputFunction("ln"),
      className: "bg-purple-500 hover:bg-purple-600",
    },

    {
      label: "√",
      action: () => inputFunction("sqrt"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "^",
      action: () => inputOperator("^"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "exp",
      action: () => inputFunction("exp"),
      className: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "abs",
      action: () => inputFunction("abs"),
      className: "bg-purple-500 hover:bg-purple-600",
    },

    {
      label: "π",
      action: () => inputConstant("π"),
      className: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      label: "e",
      action: () => inputConstant("e"),
      className: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      label: "(",
      action: () => inputParenthesis("("),
      className: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      label: ")",
      action: () => inputParenthesis(")"),
      className: "bg-yellow-500 hover:bg-yellow-600",
    },
  ];

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.calculator.title}
      description={t.calculator.description}
      icon={Calculator}
    >
      {/* How To Use Section */}
      <ToolSection>
        <ToolHowToUse
          title={t.calculator.howToUse.title}
          steps={t.calculator.howToUse.steps}
          features={{
            title: t.calculator.features.title,
            items: t.calculator.features.items,
          }}
        />
      </ToolSection>

      {/* Calculator Display */}
      <ToolSection>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg">
            {/* Expression Display */}
            <div className="mb-2">
              <div className="text-sm text-gray-400 font-mono h-6 overflow-hidden">
                {expression || ""}
              </div>
            </div>

            {/* Result Display */}
            <ToolDisplay background="dark" size="large">
              <div className="text-right">
                <div className="text-4xl font-mono font-light text-white overflow-hidden">
                  {display}
                </div>
              </div>
            </ToolDisplay>
          </div>
        </div>
      </ToolSection>

      {/* Calculator Controls */}
      <ToolSection>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Calculator */}
            <div className="flex-1">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {basicButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.action}
                    className={`
                      h-14 rounded-lg text-white text-lg font-medium transition-colors
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                      ${button.className}
                    `}
                    aria-label={button.label}
                  >
                    {button.label}
                  </button>
                ))}
              </div>

              {/* Scientific Functions */}
              <div className="grid grid-cols-4 gap-3">
                {scientificButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.action}
                    className={`
                      h-12 rounded-lg text-white text-sm font-medium transition-colors
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                      ${button.className}
                    `}
                    aria-label={button.label}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>

            {/* History Panel */}
            <div className="lg:w-80">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <History size={20} />
                    {t.calculator.history.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                      aria-label="Toggle history"
                    >
                      <History size={16} />
                    </button>
                    <button
                      onClick={clearHistory}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                      aria-label="Clear history"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {showHistory && (
                  <div className="max-h-96 overflow-y-auto">
                    {history.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        {t.calculator.history.empty}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {history.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => selectFromHistory(item)}
                          >
                            <div className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {item.expression}
                            </div>
                            <div className="font-mono text-lg font-semibold">
                              = {item.result}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(item.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.calculator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
