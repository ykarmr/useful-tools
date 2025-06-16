import type { PixelArtEditorTranslations } from "../../../types/pages/tools/pixel-art-editor";

export const pixelArtEditor: PixelArtEditorTranslations = {
  title: "Pixel Art Editor",
  description:
    "Create pixel art in your browser. Features brush, eraser, and eyedropper tools with a color palette for digital art creation.",
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
      q: "Can I download my artwork?",
      a: "Yes, you can download your artwork as a high-resolution PNG image by clicking the 'Download' button.",
    },
    {
      q: "What tools are available?",
      a: "The editor includes three tools: brush (for drawing), eraser (for deleting), and eyedropper (for color picking). Brush and eraser support continuous drawing by dragging.",
    },
    {
      q: "Can I change the grid size?",
      a: "Yes, you can change the canvas size from 8×8 to 32×32 in increments of 2. When you change the size, existing artwork is preserved and adjusted to the new dimensions.",
    },
    {
      q: "How do I use the color palette?",
      a: "You can select from 24 default colors in the palette. You can also use the color picker to choose any custom color. The selected color is displayed with its color code.",
    },
    {
      q: "How does the eyedropper tool work?",
      a: "Select the eyedropper tool and click on any pixel in the canvas to automatically set that pixel's color as your selected color. This is useful for reusing existing colors in your artwork.",
    },
  ],
};
