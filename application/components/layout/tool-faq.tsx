import { Translations } from "@/locales";
import { FAQItem } from "@/locales/types/faq";
import React, { useState } from "react";

type Props = {
  faqList: FAQItem[];
  t: Translations;
};

export default function ToolFaq({ faqList, t }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 lg:p-8 border border-amber-200 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 tracking-tight">
        {t.common.faqTitle}
      </h2>
      <div className="space-y-4">
        {faqList.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              <span className="font-medium text-gray-900 pr-4">{item.q}</span>
              <span
                className={`ml-3 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === idx ? "rotate-90" : ""
                }`}
              >
                {/* シンプルな矢印SVG */}
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path
                    d="M7 8l3 3 3-3"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`px-6 text-gray-700 text-base transition-all duration-300 ease-in-out ${
                openIndex === idx
                  ? "max-h-96 opacity-100 pb-4"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              <div className="leading-relaxed">{item.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
