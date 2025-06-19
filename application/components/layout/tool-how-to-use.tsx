"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Zap, LucideIcon } from "lucide-react";

interface HowToUseStep {
  title?: string;
  description: string;
}

interface Feature {
  title?: string;
  description: string;
  icon?: LucideIcon;
}

interface ToolHowToUseProps {
  title: string;
  steps: (string | HowToUseStep)[];
  features?: {
    title: string;
    items: (string | Feature)[];
  };
  className?: string;
}

export default function ToolHowToUse({
  title,
  steps,
  features,
  className = "",
}: ToolHowToUseProps) {
  return (
    <div className={`space-y-4 sm:space-y-6 md:space-y-8 ${className}`}>
      {/* 使い方 */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-base sm:text-lg md:text-xl">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="break-words">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {steps.map((step, index) => {
              const stepText =
                typeof step === "string" ? step : step.description;
              const stepTitle =
                typeof step === "object" ? step.title : undefined;

              return (
                <div
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-white/70 rounded-lg border border-blue-100"
                >
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    {stepTitle && (
                      <h4 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 mb-1 break-words leading-tight">
                        {stepTitle}
                      </h4>
                    )}
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed break-words">
                      {stepText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 主な機能 */}
      {features && (
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-green-700 text-base sm:text-lg md:text-xl">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="break-words">{features.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {features.items.map((feature, index) => {
                const featureText =
                  typeof feature === "string" ? feature : feature.description;
                const featureTitle =
                  typeof feature === "object" ? feature.title : undefined;
                const FeatureIcon =
                  typeof feature === "object" ? feature.icon : undefined;

                return (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-2 sm:p-3 bg-white/70 rounded-lg border border-green-100"
                  >
                    {FeatureIcon ? (
                      <FeatureIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0 mt-1.5 sm:mt-2" />
                    )}
                    <div className="flex-1 min-w-0">
                      {featureTitle && (
                        <h5 className="text-xs sm:text-sm font-medium text-gray-800 mb-1 break-words leading-tight">
                          {featureTitle}
                        </h5>
                      )}
                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                        {featureText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
