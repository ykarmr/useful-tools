# CLIコマンドリファレンス

## 基本コマンド

### すべての画像を生成
```bash
npm run generate:all
# または
npx tsx src/cli.ts all
```

### 個別生成コマンド

#### ロゴ生成
```bash
# すべての言語のロゴを生成
npm run generate:logo

# 特定の言語のみ
npx tsx src/cli.ts logo --locale ja
npx tsx src/cli.ts logo --locale en
```

#### ファビコン生成
```bash
# デフォルトロゴからファビコンを生成
npm run generate:favicon

# カスタムロゴから生成
npx tsx src/cli.ts favicon --input /path/to/custom-logo.png
```

#### OGP画像生成
```bash
# すべての言語のOGP画像を生成
npm run generate:ogp

# 特定の言語のみ
npx tsx src/cli.ts ogp --locale ja

# 特定ページ用OGP画像
npx tsx src/cli.ts ogp --locale ja --page calculator --title "電卓ツール"
```

## ユーティリティコマンド

### 設定確認
```bash
npm run config
```

### 出力ディレクトリクリーンアップ
```bash
npm run clean
```

### ヘルプ表示
```bash
npx tsx src/cli.ts --help
```

## 使用例

### 新しいツールページのOGP画像を全言語で生成
```bash
npx tsx src/cli.ts ogp --locale ja --page password-generator --title "パスワード生成ツール"
npx tsx src/cli.ts ogp --locale en --page password-generator --title "Password Generator"
npx tsx src/cli.ts ogp --locale es --page password-generator --title "Generador de Contraseñas"
npx tsx src/cli.ts ogp --locale ru --page password-generator --title "Генератор Паролей"
npx tsx src/cli.ts ogp --locale zh --page password-generator --title "密码生成器"
```

### 開発ワークフロー
```bash
# 1. 設定確認
npm run config

# 2. 古いファイルをクリーンアップ
npm run clean

# 3. すべての画像を生成
npm run generate:all
```
