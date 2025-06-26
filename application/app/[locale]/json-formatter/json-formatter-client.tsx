"use client";

import type React from "react";

import { useState } from "react";
import { FileText, Download, Upload } from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolResult from "@/components/layout/tool-result";
import ToolStats from "@/components/layout/tool-stats";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";

interface JSONFormatterClientProps {
  locale: Locale;
  t: Translations;
}

export default function JSONFormatterClient({
  locale,
  t,
}: JSONFormatterClientProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const formatJSON = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(input.trim());
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError("");
    } catch (err) {
      setError(t.jsonFormatter?.invalidJson || "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(input.trim());
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch (err) {
      setError(t.jsonFormatter?.invalidJson || "Invalid JSON");
      setOutput("");
    }
  };

  const validateJSON = () => {
    if (!input.trim()) {
      setError("");
      return;
    }

    try {
      JSON.parse(input.trim());
      setError("");
    } catch (err) {
      setError(t.jsonFormatter?.invalidJson || "Invalid JSON");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const downloadJSON = () => {
    if (!output) return;

    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formatted.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
    };
    reader.readAsText(file);
  };

  const getJSONStats = () => {
    if (!output) return null;

    try {
      const parsed = JSON.parse(output);
      const lines = output.split("\n").length;
      const characters = output.length;
      const size = new Blob([output]).size;

      return {
        lines,
        characters,
        size,
      };
    } catch {
      return null;
    }
  };

  const stats = getJSONStats();

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.jsonFormatter.title}
      subtitle={t.jsonFormatter.subtitle}
      description={t.jsonFormatter.description}
      icon={FileText}
    >
      {/* How To Use Section */}
      <ToolSection>
        <ToolHowToUse
          title={t.jsonFormatter.howToUse.title}
          steps={t.jsonFormatter.howToUse.steps}
          features={{
            title: t.jsonFormatter.features.title,
            items: t.jsonFormatter.features.items,
          }}
        />
      </ToolSection>

      {/* Input Section */}
      <ToolSection>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header with controls */}
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.jsonFormatter.input}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Upload Button */}
                <label className="flex items-center cursor-pointer">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 text-sm font-medium text-gray-700 border border-gray-200">
                    <Upload size={16} />
                    <span>{t.jsonFormatter?.uploadFile || "Upload File"}</span>
                  </div>
                </label>

                {/* Indent Size Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">
                    {t.jsonFormatter.indentSize}:
                  </span>
                  <select
                    value={indentSize}
                    onChange={(e) =>
                      setIndentSize(Number.parseInt(e.target.value))
                    }
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm font-medium"
                  >
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <div className="p-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onBlur={validateJSON}
              placeholder={t.jsonFormatter.placeholder}
              className="w-full h-64 px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm leading-relaxed placeholder-gray-400 transition-all duration-200"
            />
          </div>
        </div>
      </ToolSection>

      {/* Error Display */}
      {error && (
        <ToolSection>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-400 to-pink-500"></div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="text-red-800 font-semibold mb-2">JSON エラー</h4>
                <p className="text-red-700 text-sm leading-relaxed">{error}</p>
              </div>
            </div>
          </div>
        </ToolSection>
      )}

      {/* Controls */}
      <ToolSection>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={formatJSON}
            disabled={!input.trim()}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-500/25 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FileText size={18} />
              {t.jsonFormatter.format}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>

          <button
            onClick={minifyJSON}
            disabled={!input.trim()}
            className="group relative overflow-hidden bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-800 disabled:text-gray-400 font-semibold py-3 px-8 rounded-2xl border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-200 transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-500/25 shadow-md hover:shadow-lg disabled:shadow-none"
          >
            <span className="relative z-10">{t.jsonFormatter.minify}</span>
          </button>

          {(input || output) && (
            <button
              onClick={clearAll}
              className="group relative overflow-hidden bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/25 shadow-sm hover:shadow-md"
            >
              {t.common.clear}
            </button>
          )}
        </div>
      </ToolSection>

      {/* Output Section */}
      {output && (
        <ToolSection>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Output Header */}
            <div className="border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <FileText size={16} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t.jsonFormatter.output}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy Button (handled by ToolResult) */}
                  <button
                    onClick={downloadJSON}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 text-sm font-medium text-gray-700 border border-gray-200 shadow-sm hover:shadow-md"
                  >
                    <Download size={16} />
                    <span>{t.jsonFormatter?.download || "Download"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Output Content */}
            <div className="p-6">
              <ToolResult
                copyable
                copyText={output}
                title=""
                className="border-0 rounded-none bg-transparent p-0"
              >
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 max-h-96 overflow-auto">
                  <pre className="font-mono text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {output}
                  </pre>
                </div>
              </ToolResult>
            </div>
          </div>
        </ToolSection>
      )}

      {/* Statistics */}
      {stats && (
        <ToolSection>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">#</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t.jsonFormatter.statistics}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-2xl font-bold text-blue-700 mb-1">
                    {stats.lines.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {t.jsonFormatter?.lines || "Lines"}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {stats.characters.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    {t.jsonFormatter?.characters || "Characters"}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <div className="text-2xl font-bold text-purple-700 mb-1">
                    {stats.size / 1024 < 1
                      ? `${stats.size} B`
                      : `${(stats.size / 1024).toFixed(1)} KB`}
                  </div>
                  <div className="text-sm text-purple-600 font-medium">
                    {t.jsonFormatter?.size || "Size"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ToolSection>
      )}

      {/* Examples */}
      <ToolSection>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">{}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t.jsonFormatter?.examples || "Examples"}
              </h3>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-800">
                    {t.jsonFormatter?.basicObject || "Basic object:"}
                  </h4>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 group-hover:border-gray-300 transition-colors">
                  <code className="text-sm text-gray-700 font-mono break-all">
                    {`{"name": "John", "age": 30, "city": "Tokyo"}`}
                  </code>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h4 className="font-semibold text-gray-800">
                    {t.jsonFormatter?.objectWithArray || "Object with array:"}
                  </h4>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 group-hover:border-gray-300 transition-colors">
                  <code className="text-sm text-gray-700 font-mono break-all">
                    {`{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ToolSection>

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.jsonFormatter.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
