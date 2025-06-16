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
  },

  palette: {
    title: "调色板",
    primaryColor: "主色",
    secondaryColor: "副色",
    addColor: "添加颜色",
    removeColor: "删除颜色",
    clearPalette: "清空调色板",
    presetPalettes: "预设调色板",
  },

  tools: {
    title: "工具",
    brush: "画笔",
    eraser: "橡皮擦",
    eyedropper: "吸管",
    bucket: "油漆桶",
    line: "直线",
    rectangle: "矩形",
    circle: "圆形",
  },

  actions: {
    title: "操作",
    clear: "清除",
    undo: "撤销",
    redo: "重做",
    download: "下载",
    save: "保存",
    load: "加载",
    newCanvas: "新建画布",
  },

  settings: {
    title: "设置",
    canvasSize: "画布大小",
    backgroundColor: "背景色",
    zoom: "缩放",
    symmetryMode: "对称模式",
    onionSkinning: "洋葱皮",
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
};
