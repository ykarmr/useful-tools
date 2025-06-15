#!/bin/bash

# 便利ツールアプリケーション用の画像アセット一括生成スクリプト
# 使用方法: ./generate-missing-images.sh

set -e  # エラーが発生したら停止

echo "=========================================="
echo "🎨 便利ツール画像アセット一括生成開始"
echo "=========================================="

# プロジェクトのルートディレクトリに移動
cd "$(dirname "$0")"

# toolsディレクトリの存在確認
if [ ! -d "tools" ]; then
    echo "❌ エラー: toolsディレクトリが見つかりません"
    exit 1
fi

# toolsディレクトリに移動
cd tools

# package.jsonの存在確認
if [ ! -f "package.json" ]; then
    echo "❌ エラー: tools/package.jsonが見つかりません"
    exit 1
fi

echo "📦 依存関係のインストール..."
# 依存関係のインストール（既にインストール済みの場合はスキップ）
if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ 依存関係のインストール完了"
else
    echo "✅ 依存関係は既にインストール済み"
fi

echo ""
echo "🔧 TypeScriptのビルド..."
npm run build

echo ""
echo "🎨 ステップ 1/4: 基本アセット生成（ロゴ、ファビコン、OGP）"
npm run generate:all

echo ""
echo "🎨 ステップ 2/4: 各ツールページ用のOGP画像を生成"

# 各ツールのOGP画像生成
tools=(
    "calculator"
    "coin-flip"
    "dice-roller"
    "digital-clock"
    "image-converter"
    "ip-address"
    "json-formatter"
    "markdown-preview"
    "pet-age-conversion"
    "pomodoro-timer"
    "qr-generator"
    "random-number"
    "random-string"
    "roulette"
    "scoreboard"
    "subnet-calculator"
    "team-generator"
    "timer"
    "todo"
    "unit-conversion"
    "url-analyzer"
    "url-encoder"
    "user-agent"
    "world-clock"
    "bmi-calculator"
    "color-palette"
    "html-escape"
    "text-statistics"
)

# 各言語での生成
locales=("ja" "en" "es" "ru" "zh")

echo "各ツールページのOGP画像を生成中..."
for tool_name in "${tools[@]}"; do
    echo "  📄 生成中: $tool_name"
    
    for locale in "${locales[@]}"; do
        # ツール名をパラメータとして渡す（設定ファイル内で多言語対応される）
        npm run cli -- ogp -l "$locale" -p "$tool_name" -t "$tool_name" 2>/dev/null || echo "    ⚠️  $locale版の$tool_nameのOGP画像生成をスキップ"
    done
done

echo ""
echo "🎨 ステップ 3/4: 特殊ページのOGP画像生成"

# 特殊ページのOGP画像
special_pages=(
    "services"
    "contact"
    "terms"
    "privacy"
)

for page_name in "${special_pages[@]}"; do
    echo "  📄 生成中: $page_name"
    
    for locale in "${locales[@]}"; do
        # ページ名をパラメータとして渡す（設定ファイル内で多言語対応される）
        npm run cli -- ogp -l "$locale" -p "$page_name" -t "$page_name" 2>/dev/null || echo "    ⚠️  $locale版の$page_nameのOGP画像生成をスキップ"
    done
done

echo ""
echo "🎨 ステップ 4/4: publicディレクトリへの配置"

# 生成された画像をpublicディレクトリにコピー
cd ..  # プロジェクトルートに戻る

# 必要なディレクトリを作成
mkdir -p public/images/ogp
mkdir -p public/images/logo

echo "📁 画像ファイルのコピー中..."

# ロゴファイルのコピー
if [ -d "tools/output/logo" ]; then
    cp -r tools/output/logo/* public/images/logo/ 2>/dev/null || echo "  ⚠️  ロゴファイルのコピーでエラーが発生（一部ファイルが存在しない可能性）"
    echo "  ✅ ロゴファイルをコピー完了"
fi

# OGP画像のコピー
if [ -d "tools/output/ogp" ]; then
    # メインページ用のOGP画像をコピー
    cp tools/output/ogp/*.png public/images/ogp/ 2>/dev/null || echo "  ⚠️  メインOGP画像のコピーでエラーが発生"
    
    # ページ固有のOGP画像があれば、それもコピー
    if [ -d "tools/output/ogp/pages" ]; then
        cp tools/output/ogp/pages/*.png public/images/ogp/ 2>/dev/null || echo "  ⚠️  ページ固有OGP画像のコピーでエラーが発生"
    fi
    
    echo "  ✅ OGP画像をコピー完了"
fi

# ファビコンファイルのコピー（既存のものを更新）
if [ -d "tools/output/favicon" ]; then
    cp -r tools/output/favicon/* public/images/favicon/ 2>/dev/null || echo "  ⚠️  ファビコンファイルのコピーでエラーが発生"
    echo "  ✅ ファビコンファイルをコピー完了"
fi

echo ""
echo "=========================================="
echo "🎉 画像アセットの一括生成が完了しました！"
echo "=========================================="
echo ""
echo "📊 生成された画像の確認:"
echo "  🖼️  ロゴ: public/images/logo/"
echo "  🔗 OGP画像: public/images/ogp/"
echo "  ⭐ ファビコン: public/images/favicon/"
echo ""
echo "📝 次のステップ:"
echo "  1. 生成された画像を確認してください"
echo "  2. 必要に応じて画像の調整を行ってください"
echo "  3. アプリケーションをビルドして確認してください"
echo ""
echo "🔍 生成されたファイル数:"
echo "  ロゴ: $(find public/images/logo -name "*.png" 2>/dev/null | wc -l) files"
echo "  OGP: $(find public/images/ogp -name "*.png" 2>/dev/null | wc -l) files"
echo "  ファビコン: $(find public/images/favicon -name "*" -type f 2>/dev/null | wc -l) files"
echo ""
