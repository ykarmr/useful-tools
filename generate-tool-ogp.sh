#!/bin/bash

# 個別ツール用OGP画像生成スクリプト
# 使用方法: ./generate-tool-ogp.sh [tool-name] [locale]
# 例: ./generate-tool-ogp.sh calculator ja
# ツール名は設定ファイル内で多言語対応されます

set -e

if [ $# -ne 2 ]; then
    echo "使用方法: $0 <tool-name> <locale>"
    echo "例: $0 calculator ja"
    echo "ツール名は設定ファイル内で自動的に多言語対応されます"
    exit 1
fi

TOOL_NAME="$1"
LOCALE="$2"

echo "🎨 $TOOL_NAME の $LOCALE 版OGP画像を生成中..."

cd "$(dirname "$0")/tools"

# OGP画像生成（ツール名は設定ファイル内で多言語対応される）
npm run cli -- ogp -l "$LOCALE" -p "$TOOL_NAME" -t "$TOOL_NAME"

# 生成された画像をpublicディレクトリにコピー
cd ..
mkdir -p public/images/ogp

if [ -f "tools/output/ogp/pages/ogp-$TOOL_NAME-$LOCALE.png" ]; then
    cp "tools/output/ogp/pages/ogp-$TOOL_NAME-$LOCALE.png" "public/images/ogp/"
    echo "✅ $TOOL_NAME の $LOCALE 版OGP画像を生成しました"
else
    echo "❌ OGP画像の生成に失敗しました"
    exit 1
fi
