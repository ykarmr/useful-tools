import type { ImageConverterTranslations } from "@/locales/types/pages/tools/image-converter";

export const imageConverter: ImageConverterTranslations = {
  title: "图像转换器",
  description: "批量转换多种图像格式和调整图像大小。支持拖放操作和预览功能",
  keywords: [
    "图像转换器",
    "图像格式转换",
    "图像调整大小",
    "JPEG转换器",
    "PNG转换器",
    "WebP转换器",
    "批量转换",
    "拖放",
  ],

  dropZone: "拖放图像文件到此处或点击选择",
  dropZoneActive: "请将文件拖放到此处",
  selectFiles: "选择文件",
  supportedFormats: "支持格式：JPEG、PNG、WebP、BMP",

  selectedFiles: "已选择的文件",
  fileInfo: "文件信息",
  originalSize: "原始大小",
  newSize: "新大小",
  fileName: "文件名",
  fileSize: "文件大小",
  format: "格式",
  dimensions: "尺寸",
  convertedSize: "转换后文件大小",
  convertedDimensions: "转换后尺寸",
  compressionRatio: "压缩比",
  sizeReduction: "文件大小减少",

  convertSettings: "转换设置",
  outputFormat: "输出格式",
  aspectRatio: "长宽比",
  quality: "质量",
  width: "宽度",
  height: "高度",
  maintainAspectRatio: "保持长宽比",

  convert: "转换",
  download: "下载",
  downloadAll: "全部下载",
  clear: "清除",
  preview: "预览",
  remove: "删除",

  previewTitle: "预览",
  original: "原始",
  converted: "转换后",
  noPreview: "无预览",
  processing: "处理中...",

  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP",
  bmp: "BMP",

  originalRatio: "原始比例",
  square: "正方形 (1:1)",
  landscape: "横向 (16:9)",
  portrait: "纵向 (9:16)",
  custom: "自定义",

  conversionComplete: "转换完成",
  conversionError: "转换过程中出现错误",
  unsupportedFormat: "不支持的格式",
  fileTooLarge: "文件过大（最大10MB）",
  maxFiles: "最多允许20个文件",

  faqList: [
    {
      q: "支持哪些图像格式？",
      a: "支持JPEG、PNG、WebP和BMP格式。您可以在这些格式之间进行转换。",
    },
    {
      q: "一次可以转换多少张图像？",
      a: "一次最多可以转换20张图像。每个文件的最大大小限制为10MB。",
    },
    {
      q: "可以调整图像质量吗？",
      a: "是的，转换为JPEG格式时，您可以调整质量从1-100%。",
    },
    {
      q: "可以更改长宽比吗？",
      a: "您可以保持原始比例或更改为正方形、16:9、9:16或自定义尺寸。",
    },
    {
      q: "转换后的图像保存在哪里？",
      a: "转换后的图像保存到浏览器的下载文件夹中。您可以单独下载或作为ZIP文件下载。",
    },
  ],
};
