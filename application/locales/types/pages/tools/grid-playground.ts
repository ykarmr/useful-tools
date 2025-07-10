import { FAQItem } from "../../faq";

export interface GridPlaygroundTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];

  copy: string;
  copied: string;
  copiedToClipboard: string;

  howToUse: {
    title: string;
    steps: string[];
  };

  features: {
    title: string;
    items: string[];
  };

  sections: {
    containerProperties: string;
    itemProperties: string;
    preview: string;
    generatedCode: string;
  };

  controls: {
    columns: string;
    rows: string;
    columnGap: string;
    rowGap: string;
    addItem: string;
    removeItem: string;
    resetGrid: string;
    selectedItem: string;
  };

  properties: {
    display: string;
    gridTemplateColumns: string;
    gridTemplateRows: string;
    gridColumnGap: string;
    gridRowGap: string;
    gap: string;
    justifyContent: string;
    alignContent: string;
    justifyItems: string;
    alignItems: string;
    gridAutoColumns: string;
    gridAutoRows: string;
    gridAutoFlow: string;
    gridColumn: string;
    gridRow: string;
    justifySelf: string;
    alignSelf: string;
  };

  values: {
    display: {
      grid: string;
      inlineGrid: string;
    };
    justifyContent: {
      start: string;
      end: string;
      center: string;
      stretch: string;
      spaceAround: string;
      spaceBetween: string;
      spaceEvenly: string;
    };
    alignContent: {
      start: string;
      end: string;
      center: string;
      stretch: string;
      spaceAround: string;
      spaceBetween: string;
      spaceEvenly: string;
    };
    justifyItems: {
      start: string;
      end: string;
      center: string;
      stretch: string;
    };
    alignItems: {
      start: string;
      end: string;
      center: string;
      stretch: string;
    };
    gridAutoFlow: {
      row: string;
      column: string;
      rowDense: string;
      columnDense: string;
    };
    justifySelf: {
      auto: string;
      start: string;
      end: string;
      center: string;
      stretch: string;
    };
    alignSelf: {
      auto: string;
      start: string;
      end: string;
      center: string;
      stretch: string;
    };
  };

  tabs: {
    pureCSS: string;
    tailwindCSS: string;
    scss: string;
  };

  preview: {
    title: string;
    item: string;
  };

  faqList: FAQItem[];
}
