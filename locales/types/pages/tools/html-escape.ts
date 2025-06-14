// HTMLエスケープツールの型定義
export interface HtmlEscapeTranslations {
  title: string;
  description: string;
  keywords: string[];
  inputLabel: string;
  inputPlaceholder: string;
  outputLabel: string;
  outputPlaceholder: string;
  escapeButton: string;
  unescapeButton: string;
  clearButton: string;
  copyButton: string;
  copiedMessage: string;
  stats: {
    title: string;
    originalLength: string;
    escapedLength: string;
    charactersEscaped: string;
  };
  examples: {
    title: string;
    basicHtml: {
      title: string;
      input: string;
      output: string;
    };
    attributes: {
      title: string;
      input: string;
      output: string;
    };
    quotes: {
      title: string;
      input: string;
      output: string;
    };
  };
  faqList: Array<{
    q: string;
    a: string;
  }>;
}
