"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  FileText,
  Copy,
  Check,
  Trash2,
  BookOpen,
  Code,
  List,
  Link2,
  ImageIcon,
  Quote,
  Table,
  Minus,
  PlusSquare,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolStats from "@/components/layout/tool-stats";
import ToolFaq from "@/components/layout/tool-faq";
import ToolHowToUse from "@/components/layout/tool-how-to-use";
import { Locale, Translations } from "@/locales";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewClientProps {
  locale: Locale;
  t: Translations;
}

export default function MarkdownPreviewClient({
  locale,
  t,
}: MarkdownPreviewClientProps) {
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);

  // Load markdown from localStorage on mount
  useEffect(() => {
    try {
      const savedMarkdown = localStorage.getItem(`markdown-preview-${locale}`);
      if (savedMarkdown) {
        setMarkdown(savedMarkdown);
      }
    } catch (error) {
      console.error("Error loading markdown:", error);
    }
  }, [locale]);

  // Save markdown to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(`markdown-preview-${locale}`, markdown);

      // Calculate statistics
      setCharCount(markdown.length);
      setLineCount(markdown.split("\n").length);
      setWordCount(
        markdown.trim() === "" ? 0 : markdown.trim().split(/\s+/).length
      );
    } catch (error) {
      console.error("Error saving markdown:", error);
    }
  }, [markdown, locale]);

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const clearMarkdown = () => {
    if (
      confirm(
        t.markdownPreview?.confirmClear ||
          "Are you sure you want to clear the text?"
      )
    ) {
      setMarkdown("");
    }
  };

  const insertExample = (example: string) => {
    setMarkdown((prev) => {
      if (prev && !prev.endsWith("\n\n")) {
        return prev + (prev.endsWith("\n") ? "\n" : "\n\n") + example;
      }
      return prev + example;
    });
  };

  // Statistics for ToolStats component
  const stats = [
    {
      label: t.markdownPreview?.wordCount || "Words",
      value: wordCount,
      color: "primary" as const,
    },
    {
      label: t.markdownPreview?.characterCount || "Characters",
      value: charCount,
      color: "default" as const,
    },
    {
      label: t.markdownPreview?.lineCount || "Lines",
      value: lineCount,
      color: "success" as const,
    },
  ];

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.markdownPreview?.title || "Markdown Preview"}
      subtitle={
        t.markdownPreview?.subtitle || "Real-time Markdown preview and editor"
      }
      description={
        t.markdownPreview?.description || "Preview and edit Markdown text"
      }
      icon={FileText}
    >
      {/* How To Use セクション */}
      <ToolSection>
        <ToolHowToUse
          title={t.markdownPreview.howToUse.title}
          steps={t.markdownPreview.howToUse.steps}
          features={{
            title: t.markdownPreview.features.title,
            items: t.markdownPreview.features.items,
          }}
        />
      </ToolSection>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Section */}
        <ToolSection title={t.markdownPreview?.writeHere || "Write Here"}>
          <div className="space-y-6">
            <ToolInput>
              <div className="relative">
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full h-[500px] p-6 border-2 border-gray-200/60 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-400 outline-none font-mono text-sm resize-none bg-gradient-to-br from-white to-gray-50/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-gray-300/80 hover:shadow-xl"
                  placeholder={`# ${
                    t.markdownPreview?.title || "Markdown Preview"
                  }\n\n${t.markdownPreview?.writeHere || "Write here"}...`}
                />
                <div className="absolute top-4 right-4 text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
                  Markdown
                </div>
              </div>
            </ToolInput>

            <ToolControls>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-white to-gray-50 hover:from-primary-50 hover:to-primary-100 border-2 border-gray-200/60 hover:border-primary-300/60 text-gray-700 hover:text-primary-700 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                disabled={!markdown}
              >
                {copied ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} />
                )}
                <span className="font-medium">
                  {copied
                    ? t.markdownPreview?.copied || "Copied"
                    : t.markdownPreview?.copy || "Copy"}
                </span>
              </button>

              <button
                onClick={clearMarkdown}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-white to-gray-50 hover:from-red-50 hover:to-red-100 border-2 border-red-200/60 hover:border-red-300/60 text-red-600 hover:text-red-700 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                disabled={!markdown}
              >
                <Trash2 size={18} />
                <span className="font-medium">
                  {t.markdownPreview?.clear || "Clear"}
                </span>
              </button>
            </ToolControls>

            <ToolStats stats={stats} />
          </div>
        </ToolSection>

        {/* Preview Section */}
        <ToolSection title={t.markdownPreview?.preview || "Preview"}>
          <div className="relative">
            <div className="bg-gradient-to-br from-white via-gray-50/30 to-white border-2 border-gray-200/60 rounded-2xl p-8 min-h-[500px] overflow-auto shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              {markdown ? (
                <div className="prose prose-lg max-w-none text-left">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="text-gray-500 flex flex-col items-center justify-center h-full text-center min-h-[400px]">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-6 rounded-2xl mb-6 shadow-sm">
                    <BookOpen
                      size={64}
                      className="text-primary-600 opacity-60"
                    />
                  </div>
                  <p className="text-lg font-medium mb-2 text-gray-700">
                    {t.markdownPreview?.noPreview || "No preview available"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.markdownPreview?.noPreviewSubtext ||
                      "Start typing in the editor to see the preview"}
                  </p>
                </div>
              )}
            </div>
            <div className="absolute top-4 right-4 text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50 shadow-sm">
              Preview
            </div>
          </div>
        </ToolSection>
      </div>

      {/* Examples Section */}
      <ToolSection title={t.markdownPreview?.examples || "Examples"}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <ExampleButton
            icon={<Code size={18} />}
            title={t.markdownPreview?.headings || "Headings"}
            onClick={() =>
              insertExample(
                t.markdownPreview?.exampleHeading ||
                  "# Heading 1\n## Heading 2\n### Heading 3"
              )
            }
          />
          <ExampleButton
            icon={<List size={18} />}
            title={t.markdownPreview?.lists || "Lists"}
            onClick={() =>
              insertExample(
                t.markdownPreview?.exampleList || "- Item 1\n- Item 2\n- Item 3"
              )
            }
          />
          <ExampleButton
            icon={<Link2 size={18} />}
            title={t.markdownPreview?.links || "Links"}
            onClick={() =>
              insertExample(
                t.markdownPreview?.exampleLink ||
                  "[Link text](https://example.com)"
              )
            }
          />
          <ExampleButton
            icon={<Code size={18} />}
            title={t.markdownPreview?.code || "Code"}
            onClick={() =>
              insertExample(
                t.markdownPreview?.exampleCode ||
                  "```javascript\nconsole.log('Hello World');\n```"
              )
            }
          />
          <ExampleButton
            icon={<Table size={18} />}
            title={t.markdownPreview?.tables || "Tables"}
            onClick={() =>
              insertExample(
                t.markdownPreview?.exampleTable ||
                  "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |"
              )
            }
          />
          <ExampleButton
            icon={<Quote size={18} />}
            title={t.markdownPreview?.blockquotes || "Blockquotes"}
            onClick={() =>
              insertExample(
                t.markdownPreview?.exampleQuote || "> This is a blockquote"
              )
            }
          />
        </div>
      </ToolSection>

      {/* Markdown Guide */}
      <ToolSection title={t.markdownPreview?.markdownGuide || "Markdown Guide"}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MarkdownGuideItem
            icon={<Code size={20} />}
            title={t.markdownPreview?.headings || "Headings"}
            description={t.markdownPreview?.headingsDesc || "# H1 ## H2 ### H3"}
          />
          <MarkdownGuideItem
            icon={<PlusSquare size={20} />}
            title={t.markdownPreview?.emphasis || "Emphasis"}
            description={t.markdownPreview?.emphasisDesc || "**bold** *italic*"}
          />
          <MarkdownGuideItem
            icon={<List size={20} />}
            title={t.markdownPreview?.lists || "Lists"}
            description={t.markdownPreview?.listsDesc || "- item or 1. item"}
          />
          <MarkdownGuideItem
            icon={<Link2 size={20} />}
            title={t.markdownPreview?.links || "Links"}
            description={t.markdownPreview?.linksDesc || "[text](url)"}
          />
          <MarkdownGuideItem
            icon={<ImageIcon size={20} />}
            title={t.markdownPreview?.images || "Images"}
            description={t.markdownPreview?.imagesDesc || "![alt](url)"}
          />
          <MarkdownGuideItem
            icon={<Code size={20} />}
            title={t.markdownPreview?.code || "Code"}
            description={
              t.markdownPreview?.codeDesc || "`inline` or ```block```"
            }
          />
          <MarkdownGuideItem
            icon={<Quote size={20} />}
            title={t.markdownPreview?.blockquotes || "Blockquotes"}
            description={t.markdownPreview?.blockquotesDesc || "> quote text"}
          />
          <MarkdownGuideItem
            icon={<Table size={20} />}
            title={t.markdownPreview?.tables || "Tables"}
            description={t.markdownPreview?.tablesDesc || "| col | col |"}
          />
          <MarkdownGuideItem
            icon={<Minus size={20} />}
            title={t.markdownPreview?.horizontalRule || "Horizontal Rule"}
            description={t.markdownPreview?.horizontalRuleDesc || "---"}
          />
        </div>
      </ToolSection>

      {/* FAQ Section */}
      <ToolSection>
        <ToolFaq faqList={t.markdownPreview?.faqList || []} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}

interface ExampleButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

function ExampleButton({ icon, title, onClick }: ExampleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-white to-gray-50 hover:from-primary-50 hover:to-primary-100 rounded-xl transition-all duration-200 border-2 border-gray-200 hover:border-primary-300 hover:shadow-md transform hover:-translate-y-1"
    >
      <span className="text-primary-600 group-hover:text-primary-700 transition-colors">
        {icon}
      </span>
      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-800 text-center transition-colors">
        {title}
      </span>
    </button>
  );
}

interface MarkdownGuideItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function MarkdownGuideItem({
  icon,
  title,
  description,
}: MarkdownGuideItemProps) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50/50 p-6 rounded-2xl border-2 border-gray-200/60 hover:border-primary-300/60 transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-primary-600 bg-gradient-to-br from-primary-100 to-primary-200 p-3 rounded-xl shadow-sm">
          {icon}
        </span>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 font-mono bg-gradient-to-r from-gray-100 to-gray-200/50 px-4 py-3 rounded-xl border border-gray-200/60">
        {description}
      </p>
    </div>
  );
}
