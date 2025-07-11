export interface MermaidGeneratorTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];

  // メインセクション
  input: {
    title: string;
    placeholder: string;
    syntaxHelp: string;
  };

  // 図表タイプ
  diagramTypes: {
    title: string;
    flowchart: string;
    sequence: string;
    gantt: string;
    classDiagram: string;
    stateDiagram: string;
    erDiagram: string;
    userJourney: string;
    gitgraph: string;
  };

  // テンプレート
  templates: {
    title: string;
    useTemplate: string;
    flowchartBasic: {
      name: string;
      description: string;
    };
    sequenceBasic: {
      name: string;
      description: string;
    };
    ganttBasic: {
      name: string;
      description: string;
    };
    classBasic: {
      name: string;
      description: string;
    };
  };

  // プレビュー
  preview: {
    title: string;
    loading: string;
    error: string;
    noContent: string;
  };

  // エラーメッセージ
  errorMessages: {
    syntaxError: string;
    expectedElement: string;
    undefinedElement: string;
    duplicateElement: string;
    invalidCharacter: string;
    flowchartError: string;
    sequenceError: string;
    ganttError: string;
    libraryError: string;
  };

  // UI テキスト
  ui: {
    characters: string;
    syntaxErrorDetected: string;
    checkPreview: string;
    fullScreen: string;
    normal: string;
    close: string;
    exportNotAvailable: string;
    dragToMove: string;
    dragPinchToOperate: string;
    buttonForZoom: string;
    syntaxErrorDetails: string;
    checkMermaidSyntax: string;
    referToTemplate: string;
    checkSpelling: string;
    checkBrackets: string;
    exportOnlyWhenGenerated: string;
    escToExit: string;
    escToNormal: string;
    imageLoadFailed: string;
    previewRightSide: string;
    fixCodeFirst: string;
  };

  // エクスポート
  export: {
    title: string;
    copyCode: string;
    downloadSvg: string;
    downloadPng: string;
    copySuccess: string;
    downloadSuccess: string;
    exportError: string;
  };

  // How to Use セクション
  howToUse: {
    title: string;
    steps: string[];
    features: {
      title: string;
      items: string[];
    };
  };

  // FAQ
  faqList: Array<{
    q: string;
    a: string;
  }>;
}
