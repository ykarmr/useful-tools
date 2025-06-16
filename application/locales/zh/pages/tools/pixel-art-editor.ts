import type { PixelArtEditorTranslations } from "../../../types/pages/tools/pixel-art-editor";

export const pixelArtEditor: PixelArtEditorTranslations = {
  title: "像素艺术编辑器",
  description:
    "在浏览器中创建像素艺术。具有画笔、橡皮擦和吸管工具以及调色板，用于数字艺术创作。",
  keywords: [
    "像素艺术",
    "精灵编辑器",
    "数字艺术",
    "图像编辑",
    "设计工具",
    "Canvas",
  ],

  canvas: {
    title: "画布",
    gridSize: "网格大小",
    pixelSize: "像素大小",
    showGrid: "显示网格",
    size: "大小",
    pixels: "像素",
    instruction: "说明",
  },

  tools: {
    brush: "画笔",
    eraser: "橡皮擦",
    eyedropper: "吸管",
    bucket: "油漆桶",
  },

  actions: {
    clear: "清除",
    undo: "撤销",
    redo: "重做",
    download: "下载",
    save: "保存",
    load: "加载",
  },

  messages: {
    saved: "作品保存成功",
    loaded: "作品加载成功",
    cleared: "画布已清除",
    downloadReady: "图像准备下载",
    error: "发生错误",
    unsupportedBrowser: "您的浏览器不支持此功能",
  },

  faqList: [
    {
      q: "什么是像素艺术？",
      a: "像素艺术是一种数字艺术形式，通过放置单个像素来创建图像。在复古视频游戏中很常见，创造出独特的怀旧美感。",
    },
    {
      q: "我可以下载我的作品吗？",
      a: "是的，您可以点击「下载」按钮将作品下载为高分辨率PNG图像。",
    },
    {
      q: "有哪些工具可用？",
      a: "编辑器包括三种工具：画笔（用于绘制）、橡皮擦（用于删除）和吸管（用于颜色选择）。画笔和橡皮擦支持拖拽连续绘制。",
    },
    {
      q: "我可以更改网格大小吗？",
      a: "是的，您可以将画布大小从8×8更改为32×32，步长为2。更改大小时，现有作品会保留并调整到新尺寸。",
    },
    {
      q: "如何使用调色板？",
      a: "您可以从调色板中的24种默认颜色中选择。也可以使用颜色选择器选择任何自定义颜色。选中的颜色会与其颜色代码一起显示。",
    },
    {
      q: "吸管工具如何使用？",
      a: "选择吸管工具并点击画布上的任意像素，会自动将该像素的颜色设置为您的选中颜色。这对于重复使用现有颜色很有用。",
    },
  ],
  howToUse: {
    title: "如何使用",
    basic: "基本操作",
    step1: "选择工具（画笔、橡皮擦、吸管）",
    step2: "从调色板中选择颜色",
    step3: "在画布上点击并拖动以绘制",
    advanced: "有用的功能",
    tip1: "网格大小可调，从8×8到32×32",
    tip2: "拖动进行连续绘制，吸管用于选择颜色",
    tip3: "以PNG格式下载高分辨率图像",
  },
  toolPanel: {
    tools: "工具",
    colors: "调色板",
    canvasSettings: "画布设置",
    gridSize: "网格大小",
    actions: "操作",
  },
};
