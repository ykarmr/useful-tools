export interface FlexboxPlaygroundTranslations {
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

  properties: {
    display: string;
    flexDirection: string;
    flexWrap: string;
    justifyContent: string;
    alignItems: string;
    alignContent: string;
    gap: string;
    flexGrow: string;
    flexShrink: string;
    flexBasis: string;
    alignSelf: string;
    order: string;
  };

  values: {
    display: {
      flex: string;
      inlineFlex: string;
    };
    flexDirection: {
      row: string;
      rowReverse: string;
      column: string;
      columnReverse: string;
    };
    flexWrap: {
      nowrap: string;
      wrap: string;
      wrapReverse: string;
    };
    justifyContent: {
      flexStart: string;
      flexEnd: string;
      center: string;
      spaceBetween: string;
      spaceAround: string;
      spaceEvenly: string;
    };
    alignItems: {
      stretch: string;
      flexStart: string;
      flexEnd: string;
      center: string;
      baseline: string;
    };
    alignContent: {
      stretch: string;
      flexStart: string;
      flexEnd: string;
      center: string;
      spaceBetween: string;
      spaceAround: string;
      spaceEvenly: string;
    };
    alignSelf: {
      auto: string;
      stretch: string;
      flexStart: string;
      flexEnd: string;
      center: string;
      baseline: string;
    };
  };

  codeFormat: {
    title: string;
    pureCss: string;
    tailwindCss: string;
    scss: string;
  };

  previewControls: {
    addItem: string;
    removeItem: string;
    resetAll: string;
    selectedItem: string;
  };

  faqList: Array<{
    q: string;
    a: string;
  }>;
}
