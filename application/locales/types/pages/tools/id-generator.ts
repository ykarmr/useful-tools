import { FAQItem } from "../../faq";

export interface IdGeneratorTranslations {
  title: string;
  description: string;
  keywords: string[];

  // セクション
  generateSection: {
    title: string;
    description: string;
  };

  // タイプ選択
  types: {
    label: string;
    uuid: {
      label: string;
      description: string;
    };
    ulid: {
      label: string;
      description: string;
    };
    guid: {
      label: string;
      description: string;
    };
  };

  // 設定
  settings: {
    label: string;
    formatLabel: string;
    version: {
      label: string;
      v1: string;
      v4: string;
      v6: string;
      v7: string;
    };
    count: {
      label: string;
      placeholder: string;
    };
    uppercase: {
      label: string;
      description: string;
    };
    hyphens: {
      label: string;
      description: string;
    };
  };

  // ボタン
  buttons: {
    generate: string;
    copy: string;
    copyAll: string;
    clear: string;
    regenerate: string;
  };

  // エラー・成功メッセージ
  messages: {
    invalidRange: string;
    generateSuccess: string;
    copySuccess: string;
    copyAllSuccess: string;
    copyError: string;
  };

  // 結果
  result: {
    title: string;
    generated: string;
    empty: string;
    emptyDescription: string;
    copySuccess: string;
    copyAllSuccess: string;
  };

  // 使い方
  howToUse: {
    title: string;
    steps: string[];
  };

  // 特徴
  features: {
    title: string;
    items: string[];
  };

  // ID形式の説明
  formats: {
    title: string;
    uuid: {
      title: string;
      description: string;
      example: string;
      versions: {
        v1: string;
        v4: string;
        v6: string;
        v7: string;
      };
    };
    ulid: {
      title: string;
      description: string;
      example: string;
      features: string[];
    };
    guid: {
      title: string;
      description: string;
      example: string;
    };
  };

  // FAQ
  faqList: FAQItem[];
}
