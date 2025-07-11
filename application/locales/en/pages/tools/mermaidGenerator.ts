import { MermaidGeneratorTranslations } from "../../../types/pages/tools/mermaidGenerator";

export const mermaidGenerator: MermaidGeneratorTranslations = {
  title: "Mermaid Diagram Generator",
  subtitle: "Create beautiful diagrams from text easily",
  description:
    "A tool to easily create and preview various diagrams such as flowcharts, sequence diagrams, and Gantt charts using Mermaid syntax.",
  keywords: [
    "Mermaid",
    "diagram",
    "flowchart",
    "sequence diagram",
    "Gantt chart",
    "class diagram",
    "visualization",
    "documentation",
    "design",
    "chart",
  ],

  input: {
    title: "Mermaid Code Input",
    placeholder: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process A]
    B -->|No| D[Process B]
    C --> E[End]
    D --> E`,
    syntaxHelp: "Refer to Mermaid syntax guide",
  },

  diagramTypes: {
    title: "Diagram Types",
    flowchart: "Flowchart",
    sequence: "Sequence Diagram",
    gantt: "Gantt Chart",
    classDiagram: "Class Diagram",
    stateDiagram: "State Diagram",
    erDiagram: "ER Diagram",
    userJourney: "User Journey",
    gitgraph: "Git Graph",
  },

  templates: {
    title: "Templates",
    useTemplate: "Use Template",
    flowchartBasic: {
      name: "Basic Flowchart",
      description: "Simple process flow diagram",
    },
    sequenceBasic: {
      name: "Basic Sequence Diagram",
      description: "Object interaction representation",
    },
    ganttBasic: {
      name: "Basic Gantt Chart",
      description: "Project schedule management",
    },
    classBasic: {
      name: "Basic Class Diagram",
      description: "Object-oriented design structure",
    },
  },

  preview: {
    title: "Preview",
    loading: "Generating diagram...",
    error: "Syntax error: Please check your code",
    noContent: "Please enter Mermaid code",
  },

  errorMessages: {
    syntaxError: "Syntax error: Please check code format",
    expectedElement: "Syntax error: Expected element not found",
    undefinedElement: "Undefined elements are included",
    duplicateElement: "Duplicate definitions exist",
    invalidCharacter: "Invalid characters are included",
    flowchartError: "Flowchart syntax error",
    sequenceError: "Sequence diagram syntax error",
    ganttError: "Gantt chart syntax error",
    libraryError: "Failed to load Mermaid library",
  },

  ui: {
    characters: "characters",
    syntaxErrorDetected: "Syntax error detected",
    checkPreview: "Check details in the right preview",
    fullScreen: "Full Screen",
    normal: "Normal",
    close: "Close",
    exportNotAvailable: "No diagram available for export",
    dragToMove: "Drag to move",
    dragPinchToOperate: "Drag/Pinch to operate",
    buttonForZoom: "Button for zoom",
    syntaxErrorDetails: "Syntax Error Details",
    checkMermaidSyntax: "Please check if you follow Mermaid syntax rules",
    referToTemplate: "Please refer to templates to fix your code",
    checkSpelling: "Check for spelling mistakes or invalid characters",
    checkBrackets: "Check brackets and quote correspondence",
    exportOnlyWhenGenerated:
      "Download available only when diagram is generated correctly",
    escToExit: "Press ESC key or 'Close' button to return to normal view",
    escToNormal: "ESC to exit",
    imageLoadFailed: "Failed to load image",
    previewRightSide: "Check details in the right preview",
    fixCodeFirst: "Please fix the code and try again",
  },

  export: {
    title: "Export",
    copyCode: "Copy Code",
    downloadSvg: "Download SVG",
    downloadPng: "Download PNG",
    copySuccess: "Code copied to clipboard",
    downloadSuccess: "Download completed",
    exportError: "Export failed",
  },

  howToUse: {
    title: "How to Use",
    steps: [
      "Select a diagram type or use a template",
      "Enter Mermaid syntax code in the left editor",
      "View real-time preview on the right side",
      "Copy code or download as SVG/PNG when finished",
    ],
    features: {
      title: "Key Features",
      items: [
        "Support for 8 diagram types",
        "Real-time preview functionality",
        "Ready-to-use template collection",
        "Automatic syntax error detection",
        "Export in SVG/PNG formats",
        "Mermaid code copy function",
        "Responsive design support",
      ],
    },
  },

  faqList: [
    {
      q: "What is Mermaid?",
      a: "Mermaid is a markup language for creating diagrams from text. It's supported by many platforms including GitHub and Notion.",
    },
    {
      q: "What types of diagrams can be created?",
      a: "You can create 8 types of diagrams: flowcharts, sequence diagrams, Gantt charts, class diagrams, state diagrams, ER diagrams, user journey maps, and Git graphs.",
    },
    {
      q: "How to embed created diagrams in documents?",
      a: "You can download as SVG and use as an image, or copy the Mermaid code and paste it into supported platforms.",
    },
    {
      q: "What to do when syntax errors appear?",
      a: "Please check if you're following Mermaid syntax rules. We recommend using templates as reference or consulting the official documentation.",
    },
    {
      q: "Is the created data saved?",
      a: "This tool runs in the browser, so data is not sent to servers. Please save locally if needed.",
    },
  ],
};
