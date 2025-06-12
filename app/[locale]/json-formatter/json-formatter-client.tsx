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
      description={t.jsonFormatter.description}
      icon={FileText}
    >
      {/* Input Section */}
      <ToolSection>
        <div className="space-y-2">
          <div className="flex space-x-2">
            <ToolInput label={t.jsonFormatter.input}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center  cursor-pointer">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Upload size={16} />
                      <span className="text-sm">
                        {t.jsonFormatter?.uploadFile || "Upload File"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </ToolInput>
            <ToolInput label={t.jsonFormatter.indentSize}>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number.parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value={2}>
                  {t.jsonFormatter.indent2 || "2 spaces"}
                </option>
                <option value={4}>
                  {t.jsonFormatter.indent4 || "4 spaces"}
                </option>
                <option value={8}>
                  {t.jsonFormatter.indent8 || "8 spaces"}
                </option>
              </select>
            </ToolInput>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={validateJSON}
            placeholder={t.jsonFormatter.placeholder}
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none font-mono text-sm"
          />
        </div>
      </ToolSection>

      {/* Error Display */}
      {error && (
        <ToolSection>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800 font-medium">{error}</div>
          </div>
        </ToolSection>
      )}

      {/* Controls */}
      <ToolSection>
        <ToolControls>
          <button
            onClick={formatJSON}
            disabled={!input.trim()}
            className="button-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {t.jsonFormatter.format}
          </button>
          <button
            onClick={minifyJSON}
            disabled={!input.trim()}
            className="button-secondary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {t.jsonFormatter.minify}
          </button>
          {(input || output) && (
            <button
              onClick={clearAll}
              className="button-secondary focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {t.common.clear}
            </button>
          )}
        </ToolControls>
      </ToolSection>

      {/* Output Section */}
      {output && (
        <ToolSection>
          <div className="flex flex-col gap-2">
            <ToolResult
              copyable
              copyText={output}
              title={t.jsonFormatter.output}
            >
              <pre className="font-mono text-sm text-gray-900 bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
                {output}
              </pre>
            </ToolResult>
            <button
              onClick={downloadJSON}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 rounded self-start"
            >
              <Download size={14} />
              <span>{t.jsonFormatter?.download || "Download"}</span>
            </button>
          </div>
        </ToolSection>
      )}

      {/* Statistics */}
      {stats && (
        <ToolSection title={t.jsonFormatter.statistics}>
          <ToolStats
            stats={[
              {
                label: t.jsonFormatter?.lines || "Lines",
                value: stats.lines.toString(),
              },
              {
                label: t.jsonFormatter?.characters || "Characters",
                value: stats.characters.toString(),
              },
              {
                label: t.jsonFormatter?.size || "Size",
                value: `${stats.size} bytes`,
              },
            ]}
          />
        </ToolSection>
      )}

      {/* Examples */}
      <ToolSection title={t.jsonFormatter?.examples || "Examples"}>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 mb-2">
                {t.jsonFormatter?.basicObject || "Basic object:"}
              </div>
              <div className="text-gray-600 bg-white p-2 rounded border">
                {`{"name": "John", "age": 30, "city": "Tokyo"}`}
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-2 whitespace-pre-wrap break-words">
                {t.jsonFormatter?.objectWithArray || "Object with array:"}
              </div>
              <div className="text-gray-600 bg-white p-2 rounded border whitespace-pre-wrap break-words">
                {`{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}`}
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
