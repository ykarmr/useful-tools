# Development Guidelines

## コメントとドキュメント
- コードコメントは日本語で記述すること。
- 各機能の目的と動作を明確にドキュメント化すること。

## 国際化（i18n）対応
- 全てのページで多言語対応を実装すること。
- サポート言語：日本語（ja）、英語（en）、スペイン語（es）、ロシア語（ru）、中国語（zh）。
- 翻訳ファイルの場所：`application/locales/`。
- 機能追加・修正時は全言語の翻訳ファイルを更新すること。
- 型安全性を確保するため、翻訳キーの型定義を先に作成すること。
  - 型定義：`application/locales/types/`。

## UI/UX ガイドライン
- レスポンシブデザイン：モバイルファーストで実装すること。
- スタイリング：Tailwind CSS を使用すること。
- スペーシング：適切なマージンとパディングを設定すること。
- アイコン：lucide-react を使用すること。
- アクセシビリティ：適切な ARIA 属性を設定すること。

## SEO と最適化
- `generateMetadata`関数でページメタデータを定義すること。
- タイトル、説明、キーワードを適切に設定すること。
- OGP 画像は`public/`ディレクトリに配置すること。

## データ永続化
- ローカルストレージまたはセッションストレージを使用すること。
- サーバーサイドでのデータ保存は行わないこと。