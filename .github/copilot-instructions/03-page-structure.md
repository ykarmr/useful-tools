# ページ構成とルーティング

このドキュメントでは、プロジェクト内のページ構成やルーティングに関する詳細を説明します。

## ルートページ

- `app/[locale]/page.tsx` - アプリケーションのホームページ

## サービス一覧ページ

- `app/[locale]/services/page.tsx` - サービス一覧ページ
- `app/[locale]/services/services-client.tsx` - サービス一覧のクライアントコンポーネント

## ツールカテゴリ管理

`toolCategories`配列でツールをカテゴリ別に管理します。以下のカテゴリがあります：

- **productivity**（生産性ツール）
- **random**（ランダム生成ツール）
- **time**（時間関連ツール）
- **network**（ネットワーク・Web 関連ツール）
- **textContent**（テキスト・コンテンツ処理ツール）
- **converter**（変換ツール）
- **health**（健康関連ツール）
- **code**（コード関連ツール）

## 実装済みツール一覧

### 生産性ツール（Productivity）

- `app/[locale]/calculator/` - 電卓ツール
- `app/[locale]/todo/` - TODO リストツール
- `app/[locale]/scoreboard/` - スコアボードツール

### ランダム生成ツール（Random）

- `app/[locale]/coin-flip/` - コイン投げツール
- `app/[locale]/dice-roller/` - サイコロツール
- `app/[locale]/random-number/` - 乱数生成ツール
- `app/[locale]/random-string/` - ランダム文字列生成ツール
- `app/[locale]/roulette/` - ルーレットツール
- `app/[locale]/team-generator/` - チーム生成ツール

### 時間関連ツール（Time）

- `app/[locale]/digital-clock/` - デジタル時計ツール
- `app/[locale]/pomodoro-timer/` - ポモドーロタイマーツール
- `app/[locale]/timer/` - タイマーツール
- `app/[locale]/world-clock/` - 世界時計ツール

### ネットワーク・Web 関連ツール（Network）

- `app/[locale]/ip-address/` - IP アドレス取得ツール
- `app/[locale]/subnet-calculator/` - サブネット計算ツール
- `app/[locale]/url-analyzer/` - URL 解析ツール
- `app/[locale]/url-encoder/` - URL エンコーダーツール
- `app/[locale]/user-agent/` - User-Agent 取得ツール

### テキスト・コンテンツ処理ツール（Text Content）

- `app/[locale]/html-escape/` - HTML エスケープツール
- `app/[locale]/json-formatter/` - JSON 整形ツール
- `app/[locale]/markdown-preview/` - Markdown プレビューツール
- `app/[locale]/text-statistics/` - テキスト統計ツール

### 変換ツール（Converter）

- `app/[locale]/image-converter/` - 画像変換ツール
- `app/[locale]/qr-generator/` - QR コード生成ツール
- `app/[locale]/unit-conversion/` - 単位変換ツール

### 健康関連ツール（Health）

- `app/[locale]/bmi-calculator/` - BMI 計算ツール
- `app/[locale]/pet-age-conversion/` - ペット年齢変換ツール

### デザイン・UI 関連ツール（Design）

- `app/[locale]/color-palette/` - カラーパレットツール

## 静的ページ

- `app/[locale]/contact/` - お問い合わせページ
- `app/[locale]/terms/` - 利用規約ページ
- `app/[locale]/privacy/` - プライバシーポリシーページ