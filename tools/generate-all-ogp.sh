#!/bin/bash

# 全てのOGP画像をまとめて作成するスクリプト

echo "🎨 全てのOGP画像を生成しています..."
echo "対象: 全ツール + 静的ページ（services, contact, terms, privacy）"
echo "言語: 日本語、英語、スペイン語、ロシア語、中国語"
echo ""

cd "$(dirname "$0")"

# 全ページのOGP画像を生成
npm run generate:ogp-all

echo ""
echo "✅ 全てのOGP画像の生成が完了しました！"
echo "生成された画像は application/public/images/ogp/pages/ で確認できます。"
