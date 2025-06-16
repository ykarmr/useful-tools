import type { PixelArtEditorTranslations } from "../../../types/pages/tools/pixel-art-editor";

export const pixelArtEditor: PixelArtEditorTranslations = {
  title: "Pixel Art Editor",
  description:
    "Create pixel art in your browser. Features multiple brush tools, color palettes, and layer support for digital art creation.",
  keywords: [
    "pixel art",
    "digital art",
    "image editor",
    "art creation",
    "design tool",
    "canvas",
  ],

  howToUse: {
    title: "How to Use",
    basic: "Basic Operations",
    step1: "Select a tool (brush, eraser, eyedropper)",
    step2: "Choose a color from the color palette",
    step3: "Click and drag on canvas to draw",
    advanced: "Useful Features",
    tip1: "Grid size adjustable from 8×8 to 32×32",
    tip2: "Drag for continuous drawing, eyedropper to pick colors",
    tip3: "Download high-resolution images in PNG format",
  },

  toolPanel: {
    tools: "Tools",
    colors: "Color Palette",
    canvasSettings: "Canvas Settings",
    gridSize: "Grid Size",
    actions: "Actions",
  },

  tools: {
    brush: "Brush",
    eraser: "Eraser",
    eyedropper: "Eyedropper",
    bucket: "Fill",
  },

  canvas: {
    title: "Canvas",
    size: "Size",
    pixels: "pixels",
    instruction: "Left click to draw, drag for continuous drawing",
    gridSize: "Grid Size",
    pixelSize: "Pixel Size",
    showGrid: "Show Grid",
  },

  actions: {
    clear: "Clear",
    download: "Download",
    undo: "Undo",
    redo: "Redo",
    save: "Save",
    load: "Load",
  },

  messages: {
    saved: "Artwork saved",
    loaded: "Artwork loaded",
    cleared: "Canvas cleared",
    downloadReady: "Image ready for download",
    error: "An error occurred",
    unsupportedBrowser: "Your browser does not support this feature",
  },

  faqList: [
    {
      q: "What is pixel art?",
      a: "Pixel art is a form of digital art where images are created by deliberately placing individual pixels. It's commonly seen in retro video game 2D graphics and is characterized by its blocky, pixelated appearance.",
    },
    {
      q: "Can I save my artwork?",
      a: "Yes, you can download your artwork as a PNG image. You can also save your work data to the browser's local storage and resume editing later.",
    },
    {
      q: "What tools are available?",
      a: "The editor includes brush, eraser, fill bucket, line drawing, rectangle and circle tools, and an eyedropper. Undo and redo functions are also available.",
    },
    {
      q: "Can I change the grid size?",
      a: "Yes, you can select various canvas sizes from 8x8 to 32x32. You can also adjust the display size of pixels.",
    },
    {
      q: "Can I customize the color palette?",
      a: "Yes, you can add custom colors or use preset palettes (retro game style, monochrome, etc.). You can register up to 32 colors.",
    },
    {
      q: "What is symmetry drawing mode?",
      a: "When symmetry drawing mode is enabled, drawing is automatically mirrored horizontally or vertically from the center line of the canvas. This allows for efficient creation of symmetrical designs.",
    },
  ],
};
