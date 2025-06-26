import { HtmlEscapeTranslations } from "@/locales/types/pages/tools/html-escape";

export const htmlEscape: HtmlEscapeTranslations = {
  title: "HTMLエスケープツール",
  subtitle: "HTML特殊文字を安全にエスケープ・アンエスケープ",
  description: "HTML特殊文字を安全にエスケープ・アンエスケープします。",
  keywords: [
    "HTMLエスケープ",
    "HTML特殊文字",
    "文字エスケープ",
    "HTML変換",
    "開発ツール",
    "文字コード変換",
    "セキュリティ",
    "XSS対策",
  ],
  howToUse: {
    title: "HTMLエスケープツールの使い方",
    steps: [
      "入力エリアにHTMLテキストまたはHTMLエンティティを貼り付けまたは入力",
      "「エスケープ」をクリックして特殊文字をHTMLエンティティに変換",
      "「アンエスケープ」をクリックしてHTMLエンティティを通常の文字に戻す",
      "コピーボタンで結果をコピー、またはクリアして最初からやり直し",
    ],
  },
  features: {
    title: "主な機能",
    items: [
      {
        title: "双方向変換",
        description:
          "HTMLエンティティのエスケープとアンエスケープを高精度で実行",
      },
      {
        title: "XSS対策",
        description:
          "ユーザー入力を適切にエスケープしてクロスサイトスクリプティング攻撃を防止",
      },
      {
        title: "完全な文字サポート",
        description: "名前付き、数値、16進数のHTMLエンティティをすべて処理",
      },
      {
        title: "リアルタイム処理",
        description: "詳細な統計と文字数カウントによる即座の変換",
      },
    ],
  },
  inputLabel: "エスケープするテキスト",
  inputPlaceholder:
    'HTMLコードを入力（例：<div class="example">Hello & World</div>）',
  outputLabel: "エスケープされたテキスト",
  outputPlaceholder: "エスケープ結果がここに表示されます",
  escapeButton: "エスケープ",
  unescapeButton: "アンエスケープ",
  clearButton: "クリア",
  copyButton: "コピー",
  copiedMessage: "コピーしました",
  // エラーメッセージ
  messages: {
    inputRequired: "エスケープするテキストを入力してください",
    noContentToCopy: "コピーする内容がありません",
    copyFailed: "コピーできませんでした",
    charactersEscaped: "個の文字をエスケープしました",
    charactersUnescaped: "個の文字をアンエスケープしました",
  },
  // UI テキスト
  ui: {
    characters: "文字",
    lines: "行",
    inputExample: "入力:",
    outputExample: "出力:",
  },
  stats: {
    title: "統計情報",
    originalLength: "元の文字数",
    escapedLength: "変換後文字数",
    charactersEscaped: "エスケープされた文字数",
  },
  examples: {
    title: "使用例",
    basicHtml: {
      title: "基本的なHTMLタグ",
      input: "<div>Hello World</div>",
      output: "&lt;div&gt;Hello World&lt;/div&gt;",
    },
    attributes: {
      title: "HTML属性",
      input: '<img src="image.jpg" alt="My Image">',
      output: "&lt;img src=&quot;image.jpg&quot; alt=&quot;My Image&quot;&gt;",
    },
    quotes: {
      title: "引用符とアンパサンド",
      input: 'Say "Hello" & goodbye',
      output: "Say &quot;Hello&quot; &amp; goodbye",
    },
    scriptTag: {
      title: "スクリプトタグ（XSS対策）",
      input: '<script>alert("危険")</script>',
      output: "&lt;script&gt;alert(&quot;危険&quot;)&lt;/script&gt;",
    },
    mixedContent: {
      title: "複合的な内容",
      input:
        '<div class="test" onclick="alert(\'click\')">Content & More</div>',
      output:
        "&lt;div class=&quot;test&quot; onclick=&quot;alert(&#x27;click&#x27;)&quot;&gt;Content &amp; More&lt;/div&gt;",
    },
  },
  faqList: [
    {
      q: "HTMLエスケープとは何ですか？",
      a: 'HTMLエスケープとは、HTML内で特別な意味を持つ文字（<、>、&、"など）を、ブラウザで正しく表示されるように文字参照に変換することです。XSS攻撃の防止にも重要な役割を果たします。',
    },
    {
      q: "どのような文字がエスケープされますか？",
      a: "主に以下の文字がエスケープされます：< は &lt;、> は &gt;、& は &amp;、\" は &quot;、' は &#x27;。これらの文字はHTMLで特別な意味を持つため、テキストとして表示するにはエスケープが必要です。",
    },
    {
      q: "いつHTMLエスケープを使用しますか？",
      a: "ユーザー入力をHTMLに埋め込む際、HTMLタグをテキストとして表示する際、XSS攻撃防止のセキュリティ対策として使用します。Webアプリケーション開発では必須の処理です。",
    },
    {
      q: "アンエスケープはいつ使用しますか？",
      a: "エスケープされたHTMLを元の形に復元する場合や、データベースに保存されたエスケープ済みデータを復元する場合に使用します。セキュリティリスクを理解した上で慎重に行ってください。",
    },
  ],
};
