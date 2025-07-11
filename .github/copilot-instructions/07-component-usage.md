# コンポーネント使用例

このセクションでは、プロジェクト内でのコンポーネントの使用例や基本構成について説明します。

## ツールレイアウトの基本構成

```tsx
<ToolLayout
  locale={locale}
  t={t}
  title={t.[機能名].title}
  description={t.[機能名].description}
  icon={[アイコン名]}
>
  {/* How To Use セクション */}
  <ToolSection>
    {/* ツールの使い方を説明するコンテンツ */}
    <ToolHowToUse
      title={t.[機能名].howToUse.title}
      subtitle={t.[機能名].subtitle}
      steps={t.[機能名].howToUse.steps}
      features={{
        title: t.[機能名].features.title,
        items: t.[機能名].features.items,
      }}
    />
  </ToolSection>
  {/* メイン機能セクション */}
  <ToolSection>

  </ToolSection>

  {/* 統計情報セクション（必要に応じて） */}
  <ToolSection>
    <ToolStats>
      {/* 統計データ */}
    </ToolStats>
  </ToolSection>

  {/* 結果セクション（必要に応じて） */}
  <ToolSection>
    <ToolResult>
      {/* 処理結果 */}
    </ToolResult>
  </ToolSection>

  {/* FAQ セクション */}
  <ToolSection>
    <ToolFaq faqList={t.[機能名].faqList} t={t} />
  </ToolSection>
</ToolLayout>
```

この構成を参考にして、各ツールのコンポーネントを実装してください。
