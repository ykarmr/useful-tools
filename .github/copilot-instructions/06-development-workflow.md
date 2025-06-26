# 06-development-workflow.md

新機能追加時の手順

1. **型定義の作成**

   - `locales/types/pages/tools/[機能名].ts` に型定義を追加
   - `locales/types/index.ts` に型をエクスポート

2. **翻訳ファイルの作成**

   - 全ての言語（ja, en, es, ru, zh）に翻訳ファイルを作成
   - `locales/[言語]/pages/tools/[機能名].ts`
   - `locales/[言語]/index.ts` に翻訳をエクスポート

3. **ページコンポーネントの作成**

   - `app/[locale]/[機能名]/page.tsx` - サーバーコンポーネント
   - `app/[locale]/[機能名]/[機能名]-client.tsx` - クライアントコンポーネント

4. **サービス一覧画面への追加**

   - `app/[locale]/services/services-client.tsx` の `toolCategories` 配列に新しいツールを追加
   - 適切なカテゴリ（productivity, random, time, network, textContent, converter, health, code）に配置
   - ツールのキー、アイコン、href を設定
   - 例：
     {
       key: "textContent",
       tools: [
         // ...existing tools...
         { key: "newTool", icon: NewIcon, href: "/new-tool" },
       ],
     }

5. **サイトマップの更新**

   - `app/sitemap.ts` に新しいページを追加

6. **OGP 画像の作成**
   - `public/images/ogp/pages/ogp-[機能名]-[言語名].png` を作成
   - OGP 画像はツールのタイトルと説明を含むデザインにする
   - tools ディレクトリの USAGE.md を参考にする