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
import ToolDisplay from "@/components/layout/tool-display";
import ToolControls from "@/components/layout/tool-controls";
import ToolInput from "@/components/layout/tool-input";
import ToolStats from "@/components/layout/tool-stats";
import { Locale, Translations } from "@/locales";

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

  // Simple Markdown to HTML converter
  const renderMarkdown = (text: string) => {
    if (!text) return "";

    let html = text;

    // Escape HTML to prevent XSS
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // Convert headings
    html = html.replace(/^(#{1,6})\s+(.*?)$/gm, (match, hashes, content) => {
      const level = hashes.length;
      return `<h${level} class="text-${
        7 - level
      }xl font-bold my-4">${content}</h${level}>`;
    });

    // Convert bold
    html = html.replace(
      /\*\*(.*?)\*\*|__(.*?)__/g,
      '<strong class="font-bold">$1$2</strong>'
    );

    // Convert italic
    html = html.replace(/\*(.*?)\*|_(.*?)_/g, '<em class="italic">$1$2</em>');

    // Convert links
    html = html.replace(
      /\[(.*?)\]$$(.*?)$$/g,
      '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Convert images
    html = html.replace(
      /!\[(.*?)\]$$(.*?)$$/g,
      '<img src="$2" alt="$1" class="max-w-full my-4 rounded-lg">'
    );

    // Convert unordered lists
    html = html.replace(/^( *)- (.*?)$/gm, (match, space, content) => {
      const indent = space.length;
      return `${space}<li class="ml-${
        indent ? indent / 2 + 4 : 4
      }">${content}</li>`;
    });

    // Wrap list items in ul tags
    let inList = false;
    let listItems = "";
    let processedHtml = "";

    html.split("\n").forEach((line) => {
      if (line.includes("<li class=")) {
        if (!inList) {
          inList = true;
          listItems = line;
        } else {
          listItems += line;
        }
      } else {
        if (inList) {
          inList = false;
          processedHtml += `<ul class="list-disc my-4">${listItems}</ul>\n${line}`;
        } else {
          processedHtml += line + "\n";
        }
      }
    });

    if (inList) {
      processedHtml += `<ul class="list-disc my-4">${listItems}</ul>`;
    }

    html = processedHtml;

    // Convert ordered lists
    html = html.replace(/^( *)\d+\. (.*?)$/gm, (match, space, content) => {
      const indent = space.length;
      return `${space}<li class="ml-${
        indent ? indent / 2 + 4 : 4
      }">${content}</li>`;
    });

    // Wrap ordered list items
    inList = false;
    listItems = "";
    processedHtml = "";

    html.split("\n").forEach((line) => {
      if (line.includes("<li class=") && !line.includes("<ul")) {
        if (!inList) {
          inList = true;
          listItems = line;
        } else {
          listItems += line;
        }
      } else {
        if (inList) {
          inList = false;
          processedHtml += `<ol class="list-decimal my-4">${listItems}</ol>\n${line}`;
        } else {
          processedHtml += line + "\n";
        }
      }
    });

    if (inList) {
      processedHtml += `<ol class="list-decimal my-4">${listItems}</ol>`;
    }

    html = processedHtml;

    // Convert code blocks
    html = html.replace(
      /```(.*?)\n([\s\S]*?)```/g,
      '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code>$2</code></pre>'
    );

    // Convert inline code
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 px-1 rounded">$1</code>'
    );

    // Convert blockquotes
    html = html.replace(
      /^>\s+(.*?)$/gm,
      '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4">$1</blockquote>'
    );

    // Convert horizontal rules
    html = html.replace(
      /^(---|\*\*\*|___)$/gm,
      '<hr class="my-4 border-t border-gray-300">'
    );

    // Convert tables
    const tableRows = html.match(/\|(.+)\|/g);
    if (tableRows) {
      let table = '<table class="border-collapse table-auto w-full my-4">\n';
      let isHeader = true;

      for (const row of tableRows) {
        if (row.includes("---")) {
          isHeader = false;
          continue;
        }

        const cells = row
          .split("|")
          .filter((cell) => cell.trim() !== "")
          .map((cell) => cell.trim());

        if (cells.length > 0) {
          if (isHeader) {
            table += "<thead><tr>\n";
            cells.forEach((cell) => {
              table += `<th class="border px-4 py-2 bg-gray-100">${cell}</th>\n`;
            });
            table += "</tr></thead>\n<tbody>\n";
            isHeader = false;
          } else {
            table += "<tr>\n";
            cells.forEach((cell) => {
              table += `<td class="border px-4 py-2">${cell}</td>\n`;
            });
            table += "</tr>\n";
          }
        }
      }

      table += "</tbody></table>";

      // Replace the original table text with the HTML table
      const tableRegex = new RegExp(
        tableRows
          .map((row) => row.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
          .join("\\s*"),
        "g"
      );
      html = html.replace(tableRegex, table);
    }

    // Convert paragraphs (must be last)
    html = html.replace(/^(?!<[a-z])(.*?)$/gm, (match, content) => {
      if (content.trim() === "") return "";
      return `<p class="my-2">${content}</p>`;
    });

    return html;
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
      description={
        t.markdownPreview?.description || "Preview and edit Markdown text"
      }
      icon={FileText}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <ToolSection title={t.markdownPreview?.writeHere || "Write Here"}>
          <ToolInput label={t.markdownPreview?.writeHere || "Write Here"}>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none font-mono text-sm resize-none"
              placeholder={`# ${
                t.markdownPreview?.title || "Markdown Preview"
              }\n\n${t.markdownPreview?.writeHere || "Write here"}...`}
            />
          </ToolInput>

          <ToolControls>
            <button
              onClick={copyToClipboard}
              className="button-secondary flex items-center space-x-2"
              disabled={!markdown}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>
                {copied
                  ? t.markdownPreview?.copied || "Copied"
                  : t.markdownPreview?.copy || "Copy"}
              </span>
            </button>

            <button
              onClick={clearMarkdown}
              className="button-secondary flex items-center space-x-2 text-red-600 hover:text-red-700"
              disabled={!markdown}
            >
              <Trash2 size={18} />
              <span>{t.markdownPreview?.clear || "Clear"}</span>
            </button>
          </ToolControls>

          <ToolStats stats={stats} />
        </ToolSection>

        {/* Preview Section */}
        <ToolSection title={t.markdownPreview?.preview || "Preview"}>
          <ToolDisplay centered={false}>
            <div className="bg-white border border-gray-200 rounded-lg p-6 min-h-96 overflow-auto">
              {markdown ? (
                <div
                  className="prose max-w-none text-left"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-start justify-center h-full text-left">
                  <BookOpen size={48} className="mb-4 opacity-50" />
                  <p>
                    {t.markdownPreview?.noPreview || "No preview available"}
                  </p>
                </div>
              )}
            </div>
          </ToolDisplay>
        </ToolSection>
      </div>

      {/* Examples Section */}
      <ToolSection title={t.markdownPreview?.examples || "Examples"}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <MarkdownGuideItem
            icon={<Code size={18} />}
            title={t.markdownPreview?.headings || "Headings"}
            description={t.markdownPreview?.headingsDesc || "# H1 ## H2 ### H3"}
          />
          <MarkdownGuideItem
            icon={<PlusSquare size={18} />}
            title={t.markdownPreview?.emphasis || "Emphasis"}
            description={t.markdownPreview?.emphasisDesc || "**bold** *italic*"}
          />
          <MarkdownGuideItem
            icon={<List size={18} />}
            title={t.markdownPreview?.lists || "Lists"}
            description={t.markdownPreview?.listsDesc || "- item or 1. item"}
          />
          <MarkdownGuideItem
            icon={<Link2 size={18} />}
            title={t.markdownPreview?.links || "Links"}
            description={t.markdownPreview?.linksDesc || "[text](url)"}
          />
          <MarkdownGuideItem
            icon={<ImageIcon size={18} />}
            title={t.markdownPreview?.images || "Images"}
            description={t.markdownPreview?.imagesDesc || "![alt](url)"}
          />
          <MarkdownGuideItem
            icon={<Code size={18} />}
            title={t.markdownPreview?.code || "Code"}
            description={
              t.markdownPreview?.codeDesc || "`inline` or ```block```"
            }
          />
          <MarkdownGuideItem
            icon={<Quote size={18} />}
            title={t.markdownPreview?.blockquotes || "Blockquotes"}
            description={t.markdownPreview?.blockquotesDesc || "> quote text"}
          />
          <MarkdownGuideItem
            icon={<Table size={18} />}
            title={t.markdownPreview?.tables || "Tables"}
            description={t.markdownPreview?.tablesDesc || "| col | col |"}
          />
          <MarkdownGuideItem
            icon={<Minus size={18} />}
            title={t.markdownPreview?.horizontalRule || "Horizontal Rule"}
            description={t.markdownPreview?.horizontalRuleDesc || "---"}
          />
        </div>
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
      className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
    >
      <span className="text-primary-600">{icon}</span>
      <span className="text-sm font-medium">{title}</span>
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
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-primary-600">{icon}</span>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 font-mono">{description}</p>
    </div>
  );
}
