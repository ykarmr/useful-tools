import { IdGeneratorTranslations } from "../../../types/pages/tools/id-generator";

export const idGeneratorJa: IdGeneratorTranslations = {
  title: "ID/UUIDジェネレータ",
  description:
    "UUID、ULID、GUIDを簡単に生成。複数のバージョンに対応し、大文字・小文字やハイフンの有無も設定可能",
  keywords: [
    "ID生成",
    "UUID",
    "ULID",
    "GUID",
    "識別子",
    "ランダム",
    "ユニーク",
  ],

  generateSection: {
    title: "ID生成設定",
    description: "生成するIDの種類や設定を選択してください",
  },

  types: {
    label: "ID種別",
    uuid: {
      label: "UUID",
      description: "汎用一意識別子（Universally Unique Identifier）",
    },
    ulid: {
      label: "ULID",
      description:
        "字典順ソート可能な一意識別子（Universally Unique Lexicographically Sortable Identifier）",
    },
    guid: {
      label: "GUID",
      description:
        "Microsoft形式のグローバル一意識別子（Globally Unique Identifier）",
    },
  },

  settings: {
    label: "生成設定",
    formatLabel: "表示形式",
    version: {
      label: "UUIDバージョン",
      v1: "Version 1（タイムスタンプ＋MAC）",
      v4: "Version 4（ランダム）",
      v6: "Version 6（改良タイムスタンプ）",
      v7: "Version 7（Unix時間ベース）",
    },
    count: {
      label: "生成個数",
      placeholder: "1-100",
    },
    uppercase: {
      label: "大文字で表示",
      description: "生成されるIDを大文字で表示します",
    },
    hyphens: {
      label: "ハイフン付き",
      description: "ハイフン（-）を含めて表示します",
    },
  },

  buttons: {
    generate: "生成",
    copy: "コピー",
    copyAll: "全てコピー",
    clear: "クリア",
    regenerate: "再生成",
  },

  messages: {
    invalidRange: "生成個数は1〜100の間で指定してください",
    generateSuccess: "{count}個のIDを生成しました",
    copySuccess: "IDをコピーしました",
    copyAllSuccess: "{count}個のIDをコピーしました",
    copyError: "コピーに失敗しました",
  },

  result: {
    title: "生成結果",
    generated: "個のIDが生成されました",
    empty: "まだIDが生成されていません",
    emptyDescription:
      "左側のパネルで設定を行い、「生成」ボタンをクリックしてIDを生成してください。",
    copySuccess: "IDをコピーしました",
    copyAllSuccess: "全てのIDをコピーしました",
  },

  howToUse: {
    title: "使い方",
    steps: [
      "用途に応じてIDの種類を選択します：一般用途はUUID v4、データベースのプライマリキーはULID、Microsoft環境ではGUIDを推奨",
      "UUIDの場合、バージョンを選択します：v4（ランダム）、v7（時系列ソート可能）、v1（タイムスタンプ+MAC）、v6（改良タイムスタンプ）",
      "生成個数を入力します（1-100個まで一度に生成可能）",
      "表示形式を設定します：大文字・小文字の切り替え、ハイフンの有無を選択",
      "「生成」ボタンをクリックしてIDを生成します",
      "生成されたIDは個別コピーまたは全選択でまとめてコピーできます",
      "各IDには生成時刻が表示され、種類とバージョンがバッジで識別できます",
    ],
  },

  features: {
    title: "主な機能",
    items: [
      "UUID v1/v4/v6/v7の生成に対応（用途に応じて最適なバージョンを選択）",
      "ULID生成（時系列ソート可能でデータベースに最適）",
      "GUID生成（Microsoft環境向けの{括弧}付き形式）",
      "一度に最大100個まで一括生成可能",
      "大文字・小文字の切り替え（可読性に応じて選択）",
      "ハイフンの有無を選択可能（システム要件に合わせて調整）",
      "ワンクリックでコピー機能（個別・全選択両対応）",
      "生成時刻表示（ID管理の履歴確認）",
      "統計的一意性保証（重複確率は極めて低い）",
    ],
  },

  formats: {
    title: "ID形式について",
    uuid: {
      title: "UUID（Universally Unique Identifier）",
      description:
        "128ビットの汎用一意識別子。複数のバージョンがあり、用途に応じて選択できます。",
      example: "例: 550e8400-e29b-41d4-a716-446655440000",
      versions: {
        v1: "タイムスタンプとMACアドレスベース（一意性が高い）",
        v4: "完全ランダム生成（最も一般的）",
        v6: "v1の改良版（時系列ソート可能）",
        v7: "Unix時間ベース（新しい標準、時系列ソート可能）",
      },
    },
    ulid: {
      title: "ULID（Universally Unique Lexicographically Sortable Identifier）",
      description:
        "時系列でソート可能な一意識別子。データベースのインデックスに適しています。",
      example:
        "例: 01ARZ3NDEKTSV4RRFFQ69G5FAV（標準）、01ARZ3ND-EKTS-V4RR-FFQ6-9G5FAV（ハイフン付き）",
      features: [
        "48ビットのタイムスタンプ（ミリ秒精度）",
        "80ビットのランダム部分",
        "26文字のBase32エンコード",
        "字典順ソートで時系列順になる",
        "大文字・小文字を区別しない",
      ],
    },
    guid: {
      title: "GUID（Globally Unique Identifier）",
      description: "MicrosoftによるUUIDの実装。基本的にUUID v4と同じ構造です。",
      example: "例: {550E8400-E29B-41D4-A716-446655440000}",
    },
  },

  faqList: [
    {
      q: "UUIDのバージョンはどれを選べばよいですか？",
      a: "一般的な用途では v4（ランダム）が推奨されます。データベースのプライマリキーなど時系列順が重要な場合は v7 または ULID を選択してください。",
    },
    {
      q: "ULIDとUUIDの違いは何ですか？",
      a: "ULIDは時系列でソート可能で、データベースのインデックス性能が良いです。UUIDは完全にランダムで、より一般的に使用されています。",
    },
    {
      q: "生成されたIDの一意性は保証されますか？",
      a: "UUIDとULIDは統計的に一意性が保証されており、重複する確率は極めて低いです。ただし、100%の一意性を保証するものではありません。",
    },
    {
      q: "セキュリティ上安全ですか？",
      a: "UUID v4とULIDはランダムな値を使用するため、推測は困難です。ただし、認証トークンなど高いセキュリティが必要な用途では専用のライブラリを使用してください。",
    },
    {
      q: "生成したIDはどこに保存されますか？",
      a: "生成されたIDはブラウザのメモリ内のみに保存され、サーバーに送信されることはありません。ページを再読み込みすると消去されます。",
    },
  ],
};

export default idGeneratorJa;
