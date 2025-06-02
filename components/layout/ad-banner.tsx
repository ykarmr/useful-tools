"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Translations } from "@/locales";

interface AdBannerProps {
  position: "sidebar" | "inline" | "floating";
  className?: string;
  t: Translations;
}

export default function AdBanner({
  position,
  className = "",
  t,
}: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Don't show floating ads on mobile
  useEffect(() => {
    if (position === "floating") {
      const checkMobile = () => {
        setIsVisible(window.innerWidth >= 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, [position]);

  if (!isVisible || !t?.ad) return null;

  const getAdContent = () => {
    const adTranslations = t.ad || {};

    switch (position) {
      case "sidebar":
        return (
          adTranslations.premiumTools || {
            title: "Premium Tools",
            description: "Upgrade to unlock advanced features",
            cta: "Learn More",
          }
        );
      case "inline":
        return (
          adTranslations.boostProductivity || {
            title: "Boost Productivity",
            description: "Discover tools that help you work smarter",
            cta: "Explore",
          }
        );
      case "floating":
        return (
          adTranslations.newFeature || {
            title: "New Feature",
            description: "Try our latest update",
            cta: "Try Now",
          }
        );
      default:
        return (
          adTranslations.premiumTools || {
            title: "Premium Tools",
            description: "Upgrade to unlock advanced features",
            cta: "Learn More",
          }
        );
    }
  };

  const adContent = getAdContent();
  const advertisementText = t.ad?.advertisement || "Advertisement";
  const closeText = t.common?.close || "Close";

  const baseClasses = {
    sidebar: "w-full max-w-xs",
    inline: "w-full max-w-2xl mx-auto my-8",
    floating: "fixed bottom-4 right-4 w-80 z-40 shadow-2xl",
  };

  if (!isLoaded) {
    return (
      <div className={`${baseClasses[position]} ${className}`}>
        <div className="card animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses[position]} ${className}`}
      role="complementary"
      aria-label={advertisementText}
    >
      <div
        className={`card relative ${
          position === "floating"
            ? "border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50"
            : ""
        }`}
      >
        {position === "floating" && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-white/50"
            aria-label={closeText}
          >
            <X size={16} />
          </button>
        )}

        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
          {advertisementText}
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
          {adContent.title}
        </h3>
        <p className="text-gray-600 text-xs mb-4 leading-relaxed">
          {adContent.description}
        </p>

        <button
          className={`w-full text-xs py-2 px-3 rounded-lg transition-colors ${
            position === "floating"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "button-secondary"
          }`}
        >
          {adContent.cta}
        </button>
      </div>
    </div>
  );
}
