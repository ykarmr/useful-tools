import type { PixelArtEditorTranslations } from "../../../types/pages/tools/pixel-art-editor";

export const pixelArtEditor: PixelArtEditorTranslations = {
  title: "像素艺术编辑器",
  description:
    "在浏览器中创建像素艺术和精灵图。具有多种笔刷工具、调色板和图层支持，用于数字艺术创作。",
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
      q: "我可以保存我的作品吗？",
      a: "是的，您可以将作品下载为PNG图像。也可以将作品保存到浏览器存储中，稍后继续编辑。",
    },
    {
      q: "有哪些工具可用？",
      a: "编辑器包括画笔、橡皮擦、油漆桶、直线绘制、矩形和圆形工具，以及用于颜色选择的吸管。还提供撤销和重做功能。",
    },
    {
      q: "我可以更改画布大小吗？",
      a: "是的，您可以从8x8到64x64像素的各种画布大小中选择。像素显示大小也可调整。",
    },
    {
      q: "我可以自定义调色板吗？",
      a: "是的，您可以添加自定义颜色并使用预设调色板（复古游戏、单色等）。调色板中最多可存储32种颜色。",
    },
    {
      q: "什么是对称模式？",
      a: "对称模式会从画布中心自动水平或垂直镜像您的绘图，使创建对称设计变得容易。",
    },
  ],
};
