"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolDisplay from "@/components/layout/tool-display";
import { Locale, Translations } from "@/locales";
import ToolFaq from "@/components/layout/tool-faq";

interface CalculatorClientProps {
  locale: Locale;
  t: Translations;
}

export default function CalculatorClient({ locale, t }: CalculatorClientProps) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    {
      label: "C",
      type: "function",
      action: clear,
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "±",
      type: "function",
      action: () => setDisplay(String(-Number.parseFloat(display))),
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "%",
      type: "function",
      action: () => setDisplay(String(Number.parseFloat(display) / 100)),
      className: "bg-gray-500 hover:bg-gray-600",
    },
    {
      label: "÷",
      type: "operator",
      action: () => performOperation("÷"),
      className: "bg-orange-500 hover:bg-orange-600",
    },

    {
      label: "7",
      type: "number",
      action: () => inputNumber("7"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "8",
      type: "number",
      action: () => inputNumber("8"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "9",
      type: "number",
      action: () => inputNumber("9"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "×",
      type: "operator",
      action: () => performOperation("×"),
      className: "bg-orange-500 hover:bg-orange-600",
    },

    {
      label: "4",
      type: "number",
      action: () => inputNumber("4"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "5",
      type: "number",
      action: () => inputNumber("5"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "6",
      type: "number",
      action: () => inputNumber("6"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "-",
      type: "operator",
      action: () => performOperation("-"),
      className: "bg-orange-500 hover:bg-orange-600",
    },

    {
      label: "1",
      type: "number",
      action: () => inputNumber("1"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "2",
      type: "number",
      action: () => inputNumber("2"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "3",
      type: "number",
      action: () => inputNumber("3"),
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "+",
      type: "operator",
      action: () => performOperation("+"),
      className: "bg-orange-500 hover:bg-orange-600",
    },

    {
      label: "0",
      type: "number",
      action: () => inputNumber("0"),
      className: "bg-gray-700 hover:bg-gray-800 col-span-2",
    },
    {
      label: ".",
      type: "decimal",
      action: inputDecimal,
      className: "bg-gray-700 hover:bg-gray-800",
    },
    {
      label: "=",
      type: "equals",
      action: handleEquals,
      className: "bg-orange-500 hover:bg-orange-600",
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
      {/* Calculator Display */}
      <ToolSection>
        <div className="max-w-sm mx-auto">
          <ToolDisplay background="dark" size="medium">
            <div className="text-right">
              <div className="text-4xl font-mono font-light text-white overflow-hidden">
                {display}
              </div>
            </div>
          </ToolDisplay>
        </div>
      </ToolSection>

      {/* Calculator Buttons */}
      <ToolSection>
        <div className="max-w-sm mx-auto">
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className={`
                  h-16 rounded-lg text-white text-xl font-medium transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white
                  ${button.className}
                  ${button.label === "0" ? "col-span-2" : ""}
                `}
                aria-label={`${button.label} ${
                  button.type === "number"
                    ? "number"
                    : button.type === "operator"
                    ? "operator"
                    : "function"
                }`}
              >
                {button.label}
              </button>
            ))}
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
