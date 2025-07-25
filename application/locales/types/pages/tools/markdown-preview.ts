import { FAQItem } from "../../faq";

export interface MarkdownPreviewTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  preview: string;
  clear: string;
  copy: string;
  copied: string;
  wordCount: string;
  lineCount: string;
  writeHere: string;
  noPreview: string;
  noPreviewSubtext: string;
  examples: string;
  headings: string;
  lists: string;
  links: string;
  code: string;
  tables: string;
  blockquotes: string;
  images: string;
  emphasis: string;
  horizontalRule: string;
  exampleHeading: string;
  exampleList: string;
  exampleLink: string;
  exampleCode: string;
  exampleTable: string;
  exampleQuote: string;
  markdownGuide: string;
  headingsDesc: string;
  emphasisDesc: string;
  listsDesc: string;
  linksDesc: string;
  imagesDesc: string;
  codeDesc: string;
  blockquotesDesc: string;
  tablesDesc: string;
  horizontalRuleDesc: string;
  characterCount: string;
  confirmClear: string;
  faqList: FAQItem[];
}
