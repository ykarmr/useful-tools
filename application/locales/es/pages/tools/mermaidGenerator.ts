import { MermaidGeneratorTranslations } from "../../../types/pages/tools/mermaidGenerator";

export const mermaidGenerator: MermaidGeneratorTranslations = {
  title: "Generador de Diagramas Mermaid",
  subtitle: "Crea hermosos diagramas desde texto fácilmente",
  description:
    "Una herramienta para crear y previsualizar fácilmente varios diagramas como diagramas de flujo, diagramas de secuencia y gráficos de Gantt usando la sintaxis de Mermaid.",
  keywords: [
    "Mermaid",
    "diagrama",
    "diagrama de flujo",
    "diagrama de secuencia",
    "gráfico de Gantt",
    "diagrama de clases",
    "visualización",
    "documentación",
    "diseño",
    "gráfico",
  ],

  input: {
    title: "Entrada de Código Mermaid",
    placeholder: `graph TD
    A[Inicio] --> B{Decisión}
    B -->|Sí| C[Proceso A]
    B -->|No| D[Proceso B]
    C --> E[Fin]
    D --> E`,
    syntaxHelp: "Consultar guía de sintaxis de Mermaid",
  },

  diagramTypes: {
    title: "Tipos de Diagrama",
    flowchart: "Diagrama de Flujo",
    sequence: "Diagrama de Secuencia",
    gantt: "Gráfico de Gantt",
    classDiagram: "Diagrama de Clases",
    stateDiagram: "Diagrama de Estados",
    erDiagram: "Diagrama ER",
    userJourney: "Viaje del Usuario",
    gitgraph: "Gráfico Git",
  },

  templates: {
    title: "Plantillas",
    useTemplate: "Usar Plantilla",
    flowchartBasic: {
      name: "Diagrama de Flujo Básico",
      description: "Diagrama simple de flujo de proceso",
    },
    sequenceBasic: {
      name: "Diagrama de Secuencia Básico",
      description: "Representación de interacciones entre objetos",
    },
    ganttBasic: {
      name: "Gráfico de Gantt Básico",
      description: "Gestión de cronograma de proyecto",
    },
    classBasic: {
      name: "Diagrama de Clases Básico",
      description: "Estructura de diseño orientado a objetos",
    },
  },

  preview: {
    title: "Vista Previa",
    loading: "Generando diagrama...",
    error: "Error de sintaxis: Verifique su código",
    noContent: "Por favor ingrese código Mermaid",
  },

  export: {
    title: "Exportar",
    copyCode: "Copiar Código",
    downloadSvg: "Descargar SVG",
    downloadPng: "Descargar PNG",
    copySuccess: "Código copiado al portapapeles",
    downloadSuccess: "Descarga completada",
    exportError: "Error en la exportación",
  },

  howToUse: {
    title: "Cómo Usar",
    steps: [
      "Seleccione un tipo de diagrama o use una plantilla",
      "Ingrese código con sintaxis Mermaid en el editor izquierdo",
      "Vea la vista previa en tiempo real en el lado derecho",
      "Copie el código o descargue como SVG/PNG cuando termine",
    ],
    features: {
      title: "Características Principales",
      items: [
        "Soporte para 8 tipos de diagramas",
        "Funcionalidad de vista previa en tiempo real",
        "Colección de plantillas listas para usar",
        "Detección automática de errores de sintaxis",
        "Exportación en formatos SVG/PNG",
        "Función de copia de código Mermaid",
        "Soporte de diseño responsivo",
      ],
    },
  },

  faqList: [
    {
      q: "¿Qué es Mermaid?",
      a: "Mermaid es un lenguaje de marcado para crear diagramas desde texto. Es compatible con muchas plataformas incluyendo GitHub y Notion.",
    },
    {
      q: "¿Qué tipos de diagramas se pueden crear?",
      a: "Puede crear 8 tipos de diagramas: diagramas de flujo, diagramas de secuencia, gráficos de Gantt, diagramas de clases, diagramas de estados, diagramas ER, mapas de viaje del usuario y gráficos Git.",
    },
    {
      q: "¿Cómo incrustar diagramas creados en documentos?",
      a: "Puede descargar como SVG y usar como imagen, o copiar el código Mermaid y pegarlo en plataformas compatibles.",
    },
    {
      q: "¿Qué hacer cuando aparecen errores de sintaxis?",
      a: "Verifique si está siguiendo las reglas de sintaxis de Mermaid. Recomendamos usar plantillas como referencia o consultar la documentación oficial.",
    },
    {
      q: "¿Se guardan los datos creados?",
      a: "Esta herramienta funciona en el navegador, por lo que los datos no se envían a servidores. Guarde localmente si es necesario.",
    },
  ],
};
