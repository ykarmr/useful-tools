export interface PixelArtEditorTranslations {
  title: string;
  description: string;
  keywords: string[];

  // 使い方ガイド
  howToUse: {
    title: string;
    basic: string;
    step1: string;
    step2: string;
    step3: string;
    advanced: string;
    tip1: string;
    tip2: string;
    tip3: string;
  };

  // ツールパネル
  toolPanel: {
    tools: string;
    colors: string;
    canvasSettings: string;
    gridSize: string;
    actions: string;
  };

  // ツール
  tools: {
    brush: string;
    eraser: string;
    eyedropper: string;
    bucket: string;
  };

  // キャンバス
  canvas: {
    title: string;
    size: string;
    pixels: string;
    instruction: string;
    gridSize: string;
    pixelSize: string;
    showGrid: string;
  };

  // アクション
  actions: {
    clear: string;
    download: string;
    undo: string;
    redo: string;
    save: string;
    load: string;
  };

  // メッセージ
  messages: {
    saved: string;
    loaded: string;
    cleared: string;
    downloadReady: string;
    error: string;
    unsupportedBrowser: string;
  };

  // FAQ
  faqList: Array<{
    q: string;
    a: string;
  }>;
}
