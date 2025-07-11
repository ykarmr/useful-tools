"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  BarChart3,
  Upload,
  Download,
  Copy,
  Settings,
  Trash2,
  Plus,
  X,
  Palette,
  Eye,
  FileText,
  Target,
  Sparkles,
  TrendingUp,
  Maximize,
  Minimize,
  FileDown,
  Smartphone,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolFaq from "@/components/layout/tool-faq";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Locale, Translations } from "@/locales";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ChartGeneratorClientProps {
  locale: Locale;
  t: Translations;
}

interface DataPoint {
  id: string;
  label: string;
  value: number;
}

interface ChartConfig {
  title: string;
  type: "bar" | "line" | "pie" | "area" | "scatter";
  xAxisLabel: string;
  yAxisLabel: string;
  showGrid: boolean;
  colorScheme:
    | "default"
    | "blue"
    | "green"
    | "red"
    | "purple"
    | "orange"
    | "pink"
    | "teal";
  width: number;
  height: number;
}

const colorSchemes = {
  default: ["#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#06B6D4", "#8B5A2B"],
  blue: ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"],
  green: ["#065F46", "#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0"],
  red: ["#991B1B", "#DC2626", "#EF4444", "#F87171", "#FCA5A5", "#FECACA"],
  purple: ["#581C87", "#7C3AED", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"],
  orange: ["#C2410C", "#EA580C", "#F97316", "#FB923C", "#FDBA74", "#FED7AA"],
  pink: ["#BE185D", "#DB2777", "#EC4899", "#F472B6", "#F9A8D4", "#FBCFE8"],
  teal: ["#0F766E", "#0D9488", "#14B8A6", "#5EEAD4", "#99F6E4", "#CCFBF1"],
};

export default function ChartGeneratorClient({
  locale,
  t,
}: ChartGeneratorClientProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<DataPoint[]>([]);
  const [config, setConfig] = useState<ChartConfig>({
    title: "",
    type: "bar",
    xAxisLabel: "",
    yAxisLabel: "",
    showGrid: true,
    colorScheme: "default",
    width: 800,
    height: 400,
  });
  const [activeTab, setActiveTab] = useState<string>("manual");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Data manipulation functions
  const addRow = useCallback(() => {
    const newId = Date.now().toString();
    setData((prev) => [...prev, { id: newId, label: "", value: 0 }]);
  }, []);

  const removeRow = useCallback((id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateRow = useCallback(
    (id: string, field: "label" | "value", value: string | number) => {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    },
    []
  );

  const loadTemplate = useCallback(
    (templateKey: keyof typeof t.chartGenerator.templateData) => {
      const templateData = t.chartGenerator.templateData[templateKey];
      const newData = templateData.map((item, index) => ({
        id: `template-${index}`,
        label: item.label,
        value: item.value,
      }));
      setData(newData);
      setActiveTab("manual");
    },
    [t]
  );

  const clearData = useCallback(() => {
    setData([]);
  }, []);

  // CSV import functionality
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        try {
          const lines = text.split("\n").filter((line) => line.trim());
          const newData: DataPoint[] = [];

          lines.forEach((line, index) => {
            const [label, value] = line.split(",");
            if (label && value) {
              newData.push({
                id: `csv-${index}`,
                label: label.trim(),
                value: parseFloat(value.trim()) || 0,
              });
            }
          });

          if (newData.length > 0) {
            setData(newData);
            toast({
              title: t.chartGenerator.export.exportSuccess,
              description: `${newData.length}${t.chartGenerator.dataInput.dataImported}`,
            });
          }
        } catch (error) {
          toast({
            title: t.chartGenerator.validation.invalidData,
            description: t.chartGenerator.dataInput.csvFormatError,
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    },
    [t, toast]
  );

  // Export functionality
  const downloadChart = useCallback(
    async (format: "png" | "svg") => {
      try {
        const chartElement = document.querySelector("#chart-container");
        if (!chartElement) return;

        if (format === "png") {
          const html2canvas = await import("html2canvas");
          const canvas = await html2canvas.default(chartElement as HTMLElement);
          const link = document.createElement("a");
          link.download = `chart-${Date.now()}.png`;
          link.href = canvas.toDataURL();
          link.click();
        } else {
          // SVG export logic
          const svgElement = chartElement.querySelector("svg");
          if (!svgElement) {
            toast({
              title: t.chartGenerator.export.exportError,
              description: t.chartGenerator.export.exportErrorDescription,
              variant: "destructive",
            });
            return;
          }

          // Clone the SVG element and ensure it has proper dimensions
          const clonedSvg = svgElement.cloneNode(true) as SVGElement;
          const chartWidth = config.width || 800;
          const chartHeight = config.height || 400;

          // Set explicit dimensions for the SVG
          clonedSvg.setAttribute("width", chartWidth.toString());
          clonedSvg.setAttribute("height", chartHeight.toString());
          clonedSvg.setAttribute("viewBox", `0 0 ${chartWidth} ${chartHeight}`);

          // Add XML declaration and DOCTYPE
          const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>';
          const svgString = new XMLSerializer().serializeToString(clonedSvg);
          const fullSvgString = xmlDeclaration + svgString;

          // Create blob and download
          const blob = new Blob([fullSvgString], {
            type: "image/svg+xml;charset=utf-8",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `chart-${Date.now()}.svg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          toast({
            title: t.chartGenerator.export.exportSuccess,
            description: t.chartGenerator.export.downloadSvg,
          });
        }
      } catch (error) {
        toast({
          title: t.chartGenerator.export.exportError,
          description: t.chartGenerator.export.exportErrorDescription,
          variant: "destructive",
        });
      }
    },
    [toast, t, config.width, config.height]
  );

  // CSV export functionality
  const downloadCSV = useCallback(() => {
    if (data.length === 0) {
      toast({
        title: t.chartGenerator.validation.noData,
        description: t.chartGenerator.validation.noData,
        variant: "destructive",
      });
      return;
    }

    const csvContent = data
      .map((item) => `${item.label},${item.value}`)
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `chart-data-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: t.chartGenerator.export.exportSuccess,
      description: t.chartGenerator.export.exportSuccess,
    });
  }, [data, toast, t]);

  // Toggle fullscreen display
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Handle escape key for fullscreen and disable body scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    // Disable body scroll when in fullscreen mode
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  const copyConfig = useCallback(() => {
    const configData = {
      config,
      data,
    };
    navigator.clipboard.writeText(JSON.stringify(configData, null, 2));
    toast({
      title: t.chartGenerator.export.copyConfig,
      description: t.chartGenerator.export.copyConfigDescription,
    });
  }, [config, data, t, toast]);

  // Render chart component
  const renderChart = () => {
    const chartData = data.map((item) => ({
      name: item.label,
      value: item.value,
    }));

    const colors = colorSchemes[config.colorScheme];

    if (data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[300px] md:h-[400px] bg-gray-50 rounded-lg">
          <BarChart3 className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center px-4">
            {t.chartGenerator.validation.noData}
          </p>
          <p className="text-gray-400 text-sm mt-2 text-center px-4">
            {t.chartGenerator.dataInput.addDataDescription}
          </p>
        </div>
      );
    }

    const chartHeight = isFullscreen
      ? Math.max(
          400,
          (typeof window !== "undefined" ? window.innerHeight : 800) - 250
        ) // Fullscreen: window height minus 250px (minimum 400px)
      : config.height;

    switch (config.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={chartData}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="name"
                label={{
                  value: config.xAxisLabel,
                  position: "insideBottom",
                  offset: -5,
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: config.yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="value" fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={chartData}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="name"
                label={{
                  value: config.xAxisLabel,
                  position: "insideBottom",
                  offset: -5,
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: config.yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={isFullscreen ? 150 : 80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={chartData}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="name"
                label={{
                  value: config.xAxisLabel,
                  position: "insideBottom",
                  offset: -5,
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: config.yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors[0]}
                fill={colors[0]}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <ScatterChart data={chartData}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis
                dataKey="name"
                label={{
                  value: config.xAxisLabel,
                  position: "insideBottom",
                  offset: -5,
                }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: config.yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Scatter dataKey="value" fill={colors[0]} />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.chartGenerator.title}
      description={t.chartGenerator.description}
      icon={BarChart3}
    >
      {/* Data input section */}
      <ToolSection>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              {t.chartGenerator.dataInput.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border mb-6">
                <TabsTrigger
                  value="manual"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm"
                >
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    {t.chartGenerator.dataInput.manualInput}
                  </span>
                  <span className="sm:hidden">
                    {t.chartGenerator.dataInput.manualInput}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="csv"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm"
                >
                  <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    {t.chartGenerator.dataInput.csvImport}
                  </span>
                  <span className="sm:hidden">CSV</span>
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-xs sm:text-sm"
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">
                    {t.chartGenerator.templates.title}
                  </span>
                  <span className="sm:hidden">
                    {t.chartGenerator.templates.title}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-6 mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <p className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
                    {t.chartGenerator.dataInput.manualInputDescription}
                  </p>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      onClick={addRow}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg flex-1 sm:flex-none"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">
                        {t.chartGenerator.dataInput.addRow}
                      </span>
                      <span className="sm:hidden">
                        {t.chartGenerator.dataInput.addRow}
                      </span>
                    </Button>
                    <Button
                      onClick={clearData}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 flex-1 sm:flex-none"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">
                        {t.chartGenerator.dataInput.clearData}
                      </span>
                      <span className="sm:hidden">
                        {t.chartGenerator.dataInput.clearData}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {data.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 bg-white rounded-lg border hover:border-blue-300 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full">
                        <Input
                          placeholder={t.chartGenerator.dataInput.label}
                          value={item.label}
                          onChange={(e) =>
                            updateRow(item.id, "label", e.target.value)
                          }
                          className="flex-1 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                        <Input
                          type="number"
                          placeholder={t.chartGenerator.dataInput.value}
                          value={item.value || ""}
                          onChange={(e) =>
                            updateRow(
                              item.id,
                              "value",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full sm:w-32 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeRow(item.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 self-end sm:self-center"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {data.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">
                      {t.chartGenerator.dataInput.addDataPrompt}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {t.chartGenerator.dataInput.addDataDescription}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="csv" className="space-y-4 mt-6">
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-blue-300">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-500" />
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg"
                    size="lg"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {t.chartGenerator.dataInput.csvImport}
                  </Button>
                  <p className="text-sm text-gray-600 mt-4 max-w-md mx-auto">
                    {t.chartGenerator.dataInput.csvImportDescription}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.keys(t.chartGenerator.templateData).map((key) => (
                    <Button
                      key={key}
                      variant="outline"
                      onClick={() =>
                        loadTemplate(
                          key as keyof typeof t.chartGenerator.templateData
                        )
                      }
                      className="h-auto p-4 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 transition-all"
                    >
                      <div className="text-center">
                        <Sparkles className="w-5 h-5 mx-auto mb-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          {
                            t.chartGenerator.templates[
                              key as keyof typeof t.chartGenerator.templates
                            ]
                          }
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </ToolSection>

      {/* Chart settings section */}
      <ToolSection>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {t.chartGenerator.settings.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="chart-title"
                  className="text-sm font-semibold text-gray-700"
                >
                  {t.chartGenerator.settings.chartTitle}
                </Label>
                <Input
                  id="chart-title"
                  placeholder={t.chartGenerator.settings.chartTitlePlaceholder}
                  value={config.title}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="bg-white border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="chart-type"
                  className="text-sm font-semibold text-gray-700"
                >
                  {t.chartGenerator.chartTypes.title}
                </Label>
                <Select
                  value={config.type}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      type: value as ChartConfig["type"],
                    }))
                  }
                >
                  <SelectTrigger className="bg-white border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    <SelectItem value="bar" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-purple-600" />
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.chartTypes.bar}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="line" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.chartTypes.line}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pie" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.chartTypes.pie}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="area" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-sm" />
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.chartTypes.area}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="scatter" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.chartTypes.scatter}
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="x-axis-label"
                  className="text-sm font-semibold text-gray-700"
                >
                  {t.chartGenerator.settings.xAxisLabel}
                </Label>
                <Input
                  id="x-axis-label"
                  placeholder={t.chartGenerator.settings.xAxisLabelPlaceholder}
                  value={config.xAxisLabel}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      xAxisLabel: e.target.value,
                    }))
                  }
                  className="bg-white border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="y-axis-label"
                  className="text-sm font-semibold text-gray-700"
                >
                  {t.chartGenerator.settings.yAxisLabel}
                </Label>
                <Input
                  id="y-axis-label"
                  placeholder={t.chartGenerator.settings.yAxisLabelPlaceholder}
                  value={config.yAxisLabel}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      yAxisLabel: e.target.value,
                    }))
                  }
                  className="bg-white border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label
                  htmlFor="color-scheme"
                  className="text-sm font-semibold text-gray-700"
                >
                  {t.chartGenerator.settings.colorScheme}
                </Label>
                <Select
                  value={config.colorScheme}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      colorScheme: value as ChartConfig["colorScheme"],
                    }))
                  }
                >
                  <SelectTrigger className="bg-white border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 shadow-lg">
                    <SelectItem value="default" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.default.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.default}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="blue" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.blue.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.blue}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="green" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.green.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.green}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="red" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.red.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.red}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="purple" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.purple.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.purple}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="orange" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.orange.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.orange}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pink" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.pink.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.pink}
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="teal" className="hover:bg-purple-50">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {colorSchemes.teal.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-sm sm:text-base">
                          {t.chartGenerator.settings.colorSchemes.teal}
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                <Switch
                  id="show-grid"
                  checked={config.showGrid}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({ ...prev, showGrid: checked }))
                  }
                  className="data-[state=checked]:bg-purple-600"
                />
                <Label
                  htmlFor="show-grid"
                  className="text-sm font-medium cursor-pointer"
                >
                  {t.chartGenerator.settings.showGrid}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </ToolSection>

      {/* Chart display section */}
      <ToolSection>
        <Card
          className={`shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-teal-50 ${
            isFullscreen
              ? "fixed inset-0 z-50 rounded-none flex flex-col h-screen"
              : ""
          }`}
        >
          <CardHeader
            className={`bg-gradient-to-r from-emerald-600 to-teal-600 text-white ${
              isFullscreen ? "rounded-none" : "rounded-t-lg"
            } flex-shrink-0`}
          >
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span className="text-sm sm:text-base">
                  {config.title || t.chartGenerator.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={downloadCSV}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <FileDown className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">
                    {t.chartGenerator.export.downloadCsv}
                  </span>
                  <span className="sm:hidden">
                    {t.chartGenerator.export.downloadCsv}
                  </span>
                </Button>
                <Button
                  onClick={copyConfig}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">
                    {t.chartGenerator.export.copyConfig}
                  </span>
                  <span className="sm:hidden">
                    {t.chartGenerator.export.copyConfig}
                  </span>
                </Button>
                <Button
                  onClick={() => downloadChart("png")}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <Download className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">
                    {t.chartGenerator.export.downloadPng}
                  </span>
                  <span className="sm:hidden">PNG</span>
                </Button>
                <Button
                  onClick={() => downloadChart("svg")}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  <Download className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">
                    {t.chartGenerator.export.downloadSvg}
                  </span>
                  <span className="sm:hidden">SVG</span>
                </Button>
                <Button
                  onClick={toggleFullscreen}
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4 mr-1" />
                  ) : (
                    <Maximize className="w-4 h-4 mr-1" />
                  )}
                  <span className="hidden sm:inline">
                    {isFullscreen
                      ? t.chartGenerator.export.exitFullscreen
                      : t.chartGenerator.export.fullscreen}
                  </span>
                  <span className="sm:hidden">
                    {isFullscreen
                      ? t.chartGenerator.export.exitFullscreen
                      : t.chartGenerator.export.fullscreen}
                  </span>
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent
            className={`${isFullscreen ? "p-4 flex flex-col" : "p-4 sm:p-6"}`}
          >
            <div
              id="chart-container"
              className={`w-full bg-white rounded-lg border p-2 sm:p-4 shadow-sm ${
                isFullscreen ? "flex-1 min-h-0" : ""
              }`}
            >
              {renderChart()}
            </div>

            {data.length > 0 && !isFullscreen && (
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t bg-white rounded-lg p-3 sm:p-4">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs sm:text-sm"
                  >
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1 sm:mr-2" />
                    {t.chartGenerator.stats.dataCount}: {data.length}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 border-blue-200 text-xs sm:text-sm"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">
                      {t.chartGenerator.stats.chartType}:{" "}
                    </span>
                    {t.chartGenerator.chartTypes[config.type]}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 border-purple-200 text-xs sm:text-sm"
                  >
                    <Palette className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    <span className="hidden sm:inline">
                      {t.chartGenerator.stats.colorTheme}:{" "}
                    </span>
                    {config.colorScheme === "pink" ||
                    config.colorScheme === "teal"
                      ? t.chartGenerator.settings.colorSchemes[
                          config.colorScheme
                        ]
                      : (t.chartGenerator.settings.colorSchemes as any)[
                          config.colorScheme
                        ] || config.colorScheme}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </ToolSection>

      {/* FAQ section */}
      <ToolSection>
        <ToolFaq faqList={t.chartGenerator.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
