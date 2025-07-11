export interface ChartGeneratorTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  chartTypes: {
    title: string;
    bar: string;
    line: string;
    pie: string;
    area: string;
    scatter: string;
  };
  dataInput: {
    title: string;
    csvImport: string;
    csvImportDescription: string;
    manualInput: string;
    manualInputDescription: string;
    addRow: string;
    removeRow: string;
    label: string;
    value: string;
    sampleData: string;
    clearData: string;
    dataImported: string;
    csvFormatError: string;
    noDataSelected: string;
    addDataPrompt: string;
    addDataDescription: string;
  };
  settings: {
    title: string;
    chartTitle: string;
    chartTitlePlaceholder: string;
    xAxisLabel: string;
    xAxisLabelPlaceholder: string;
    yAxisLabel: string;
    yAxisLabelPlaceholder: string;
    showLegend: string;
    showGrid: string;
    colorScheme: string;
    colorSchemes: {
      default: string;
      blue: string;
      green: string;
      red: string;
      purple: string;
      orange: string;
      pink: string;
      teal: string;
    };
    width: string;
    height: string;
  };
  export: {
    title: string;
    downloadPng: string;
    downloadSvg: string;
    downloadCsv: string;
    copyConfig: string;
    copyConfigDescription: string;
    exportSuccess: string;
    fullscreen: string;
    exitFullscreen: string;
    exportError: string;
    exportErrorDescription: string;
  };
  templates: {
    title: string;
    sales: string;
    expenses: string;
    population: string;
    temperature: string;
    stocks: string;
    survey: string;
  };
  templateData: {
    sales: { label: string; value: number }[];
    expenses: { label: string; value: number }[];
    population: { label: string; value: number }[];
    temperature: { label: string; value: number }[];
    stocks: { label: string; value: number }[];
    survey: { label: string; value: number }[];
  };
  validation: {
    noData: string;
    invalidData: string;
    minimumData: string;
  };
  stats: {
    dataCount: string;
    chartType: string;
    colorTheme: string;
  };
  faqList: {
    q: string;
    a: string;
  }[];
}
