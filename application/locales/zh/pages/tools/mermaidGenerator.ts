import { MermaidGeneratorTranslations } from "../../../types/pages/tools/mermaidGenerator";

export const mermaidGenerator: MermaidGeneratorTranslations = {
  title: "Mermaid图表生成器",
  subtitle: "从文本轻松创建美丽图表",
  description:
    "使用Mermaid语法轻松创建和预览各种图表的工具，如流程图、时序图、甘特图等。",
  keywords: [
    "Mermaid",
    "图表",
    "流程图",
    "时序图",
    "甘特图",
    "类图",
    "可视化",
    "文档",
    "设计",
    "图形",
  ],

  input: {
    title: "Mermaid代码输入",
    placeholder: `graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E`,
    syntaxHelp: "参考Mermaid语法指南",
  },

  diagramTypes: {
    title: "图表类型",
    flowchart: "流程图",
    sequence: "时序图",
    gantt: "甘特图",
    classDiagram: "类图",
    stateDiagram: "状态图",
    erDiagram: "ER图",
    userJourney: "用户旅程图",
    gitgraph: "Git图",
  },

  templates: {
    title: "模板",
    useTemplate: "使用模板",
    flowchartBasic: {
      name: "基础流程图",
      description: "简单的处理流程图表",
    },
    sequenceBasic: {
      name: "基础时序图",
      description: "对象间交互表示",
    },
    ganttBasic: {
      name: "基础甘特图",
      description: "项目进度管理",
    },
    classBasic: {
      name: "基础类图",
      description: "面向对象设计结构",
    },
  },

  preview: {
    title: "预览",
    loading: "正在生成图表...",
    error: "语法错误：请检查您的代码",
    noContent: "请输入Mermaid代码",
  },

  export: {
    title: "导出",
    copyCode: "复制代码",
    downloadSvg: "下载SVG",
    downloadPng: "下载PNG",
    copySuccess: "代码已复制到剪贴板",
    downloadSuccess: "下载完成",
    exportError: "导出失败",
  },

  howToUse: {
    title: "使用方法",
    steps: [
      "选择图表类型或使用模板",
      "在左侧编辑器中输入Mermaid语法代码",
      "在右侧实时查看预览效果",
      "完成后可复制代码或下载为SVG/PNG格式",
    ],
    features: {
      title: "主要功能",
      items: [
        "支持8种图表类型",
        "实时预览功能",
        "即用型模板集合",
        "自动语法错误检测",
        "SVG/PNG格式导出",
        "Mermaid代码复制功能",
        "响应式设计支持",
      ],
    },
  },

  faqList: [
    {
      q: "什么是Mermaid？",
      a: "Mermaid是一种基于文本创建图表的标记语言。它被GitHub、Notion等许多平台支持。",
    },
    {
      q: "可以创建哪些类型的图表？",
      a: "可以创建8种类型的图表：流程图、时序图、甘特图、类图、状态图、ER图、用户旅程图和Git图。",
    },
    {
      q: "如何在文档中嵌入创建的图表？",
      a: "可以下载为SVG格式用作图片，或者复制Mermaid代码粘贴到支持的平台中。",
    },
    {
      q: "出现语法错误时该怎么办？",
      a: "请检查是否遵循了Mermaid语法规则。建议参考模板或查阅官方文档。",
    },
    {
      q: "创建的数据会被保存吗？",
      a: "此工具在浏览器中运行，数据不会发送到服务器。如需要请本地保存。",
    },
  ],
};
