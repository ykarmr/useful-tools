"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Image,
  Upload,
  Download,
  Trash2,
  Eye,
  Settings,
  X,
  Check,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import ToolLayout from "@/components/layout/tool-layout";
import ToolSection from "@/components/layout/tool-section";
import ToolFaq from "@/components/layout/tool-faq";
import { Locale, Translations } from "@/locales";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalDimensions: { width: number; height: number };
  size: number;
  status: "waiting" | "processing" | "completed" | "error";
  convertedBlob?: Blob;
  convertedUrl?: string;
  convertedDimensions?: { width: number; height: number };
  convertedSize?: number;
}

interface ConversionSettings {
  format: "jpeg" | "png" | "webp" | "bmp";
  quality: number;
  aspectRatio: "original" | "square" | "landscape" | "portrait" | "custom";
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

interface ImageConverterClientProps {
  locale: Locale;
  t: Translations;
}

export default function ImageConverterClient({
  locale,
  t,
}: ImageConverterClientProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>({
    format: "jpeg",
    quality: 80,
    aspectRatio: "original",
    width: 800,
    height: 600,
    maintainAspectRatio: true,
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageFile | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [showComparison, setShowComparison] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewImage) return;

      switch (e.key) {
        case "Escape":
          setPreviewImage(null);
          setPreviewZoom(1);
          setShowComparison(false);
          break;
        case "ArrowLeft":
          // 前の画像へ
          const currentIndex = images.findIndex(
            (img) => img.id === previewImage.id
          );
          if (currentIndex > 0) {
            setPreviewImage(images[currentIndex - 1]);
            setPreviewZoom(1);
          }
          break;
        case "ArrowRight":
          // 次の画像へ
          const nextIndex = images.findIndex(
            (img) => img.id === previewImage.id
          );
          if (nextIndex < images.length - 1) {
            setPreviewImage(images[nextIndex + 1]);
            setPreviewZoom(1);
          }
          break;
        case "+":
        case "=":
          e.preventDefault();
          setPreviewZoom((prev) => Math.min(prev + 0.25, 3));
          break;
        case "-":
          e.preventDefault();
          setPreviewZoom((prev) => Math.max(prev - 0.25, 0.25));
          break;
        case "0":
          e.preventDefault();
          setPreviewZoom(1);
          break;
      }
    };

    if (previewImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [previewImage, images]);

  // 縦横比維持時の自動計算
  useEffect(() => {
    if (
      settings.aspectRatio === "custom" &&
      settings.maintainAspectRatio &&
      images.length > 0 &&
      settings.width > 0
    ) {
      const firstImage = images[0];
      const aspectRatio =
        firstImage.originalDimensions.width /
        firstImage.originalDimensions.height;
      const calculatedHeight = Math.round(settings.width / aspectRatio);

      if (calculatedHeight !== settings.height) {
        setSettings((prev) => ({
          ...prev,
          height: calculatedHeight,
        }));
      }
    }
  }, [
    settings.width,
    settings.maintainAspectRatio,
    settings.aspectRatio,
    images,
  ]);

  // ファイルドロップハンドラー
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  // ファイル選択ハンドラー
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      handleFiles(files);
    },
    []
  );

  // ファイル処理
  const handleFiles = useCallback(
    async (files: File[]) => {
      const supportedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/bmp",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB
      const maxFiles = 20;

      // 既存ファイル数チェック
      if (images.length + files.length > maxFiles) {
        alert(t.imageConverter.maxFiles);
        return;
      }

      const validFiles = files.filter((file) => {
        if (!supportedTypes.includes(file.type)) {
          alert(`${file.name}: ${t.imageConverter.unsupportedFormat}`);
          return false;
        }
        if (file.size > maxSize) {
          alert(`${file.name}: ${t.imageConverter.fileTooLarge}`);
          return false;
        }
        return true;
      });

      // ファイル情報を生成
      const newImages: ImageFile[] = await Promise.all(
        validFiles.map(async (file) => {
          const preview = URL.createObjectURL(file);
          const dimensions = await getImageDimensions(file);

          return {
            id: crypto.randomUUID(),
            file,
            preview,
            originalDimensions: dimensions,
            size: file.size,
            status: "waiting" as const,
          };
        })
      );

      setImages((prev) => [...prev, ...newImages]);
    },
    [images.length, t.imageConverter]
  );

  // 画像の寸法を取得
  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = document.createElement("img") as HTMLImageElement;
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // 新しい寸法を計算
  const calculateNewDimensions = (
    original: { width: number; height: number },
    settings: ConversionSettings
  ) => {
    switch (settings.aspectRatio) {
      case "square":
        const size = Math.min(original.width, original.height);
        return { width: size, height: size };
      case "landscape":
        return { width: 1920, height: 1080 };
      case "portrait":
        return { width: 1080, height: 1920 };
      case "custom":
        if (settings.maintainAspectRatio) {
          const aspectRatio = original.width / original.height;
          // 縦横比を維持する場合は常に横幅ベースで計算
          return {
            width: settings.width,
            height: Math.round(settings.width / aspectRatio),
          };
        }
        return { width: settings.width, height: settings.height };
      default:
        return original;
    }
  };

  // 画像変換実行
  const convertImages = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      // ステータス更新
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, status: "processing" } : img
        )
      );

      try {
        const convertedBlob = await convertImage(image, settings);
        const convertedUrl = URL.createObjectURL(convertedBlob);

        // 変換後の詳細情報を取得
        const convertedDimensions = calculateNewDimensions(
          image.originalDimensions,
          settings
        );
        const convertedSize = convertedBlob.size;

        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? {
                  ...img,
                  status: "completed",
                  convertedBlob,
                  convertedUrl,
                  convertedDimensions,
                  convertedSize,
                }
              : img
          )
        );
      } catch (error) {
        console.error("Conversion error:", error);
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id ? { ...img, status: "error" } : img
          )
        );
      }
    }

    setIsProcessing(false);
  };

  // 画像変換処理
  const convertImage = async (
    imageFile: ImageFile,
    settings: ConversionSettings
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = document.createElement("img") as HTMLImageElement;

      img.onload = () => {
        const newDimensions = calculateNewDimensions(
          imageFile.originalDimensions,
          settings
        );
        canvas.width = newDimensions.width;
        canvas.height = newDimensions.height;

        if (ctx) {
          // 背景を白で塗りつぶす（PNG以外の場合）
          if (settings.format !== "png") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Failed to convert image"));
              }
            },
            `image/${settings.format}`,
            settings.format === "jpeg" ? settings.quality / 100 : undefined
          );
        } else {
          reject(new Error("Canvas context not available"));
        }
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = imageFile.preview;
    });
  };

  // 個別ダウンロード
  const downloadImage = (image: ImageFile) => {
    if (!image.convertedBlob) return;

    const link = document.createElement("a");
    link.href = image.convertedUrl!;
    link.download = `converted_${image.file.name.replace(/\.[^/.]+$/, "")}.${
      settings.format
    }`;
    link.click();
  };

  // 一括ダウンロード
  const downloadAllImages = async () => {
    const completedImages = images.filter((img) => img.status === "completed");
    if (completedImages.length === 0) return;

    // 単一ファイルの場合は直接ダウンロード
    if (completedImages.length === 1) {
      downloadImage(completedImages[0]);
      return;
    }

    // 複数ファイルはZIPで一括ダウンロード（簡単な実装）
    for (const image of completedImages) {
      downloadImage(image);
      await new Promise((resolve) => setTimeout(resolve, 100)); // 少し待機
    }
  };

  // ファイル削除
  const removeImage = (id: string) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
        if (imageToRemove.convertedUrl) {
          URL.revokeObjectURL(imageToRemove.convertedUrl);
        }
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  // 全クリア
  const clearAll = () => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
      if (image.convertedUrl) {
        URL.revokeObjectURL(image.convertedUrl);
      }
    });
    setImages([]);
    setPreviewImage(null);
  };

  // フォーマットサイズ
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 圧縮率を計算
  const calculateCompressionRatio = (
    originalSize: number,
    compressedSize: number
  ): string => {
    if (originalSize === 0) return "0%";
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    return `${Math.max(0, ratio).toFixed(1)}%`;
  };

  // ファイルサイズ削減を計算
  const calculateSizeReduction = (
    originalSize: number,
    newSize: number
  ): string => {
    if (originalSize === 0) return "0 Bytes";
    const reduction = originalSize - newSize;
    if (reduction <= 0) {
      return `+${formatFileSize(Math.abs(reduction))}`;
    }
    return `-${formatFileSize(reduction)}`;
  };

  return (
    <ToolLayout
      locale={locale}
      t={t}
      title={t.imageConverter.title}
      description={t.imageConverter.description}
      icon={Image}
    >
      {/* ファイルドロップエリア */}
      <ToolSection>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 lg:p-6 border border-blue-100">
          <div
            className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragOver
                ? "border-blue-500 bg-blue-100 scale-105"
                : "border-blue-300 hover:border-blue-400 hover:bg-blue-25"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className={`transition-transform duration-300 ${
                isDragOver ? "scale-110" : ""
              }`}
            >
              <div className="bg-blue-500 rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {isDragOver
                  ? t.imageConverter.dropZoneActive
                  : t.imageConverter.dropZone}
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                {t.imageConverter.supportedFormats}
              </p>
              <div className="space-y-3 sm:space-y-4">
                <button className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base shadow-lg">
                  <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {t.imageConverter.selectFiles}
                </button>{" "}
                <p className="text-xs sm:text-sm text-gray-500">
                  {t.imageConverter.maxFilesSizeLimit}
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      </ToolSection>

      {/* 変換設定 */}
      {images.length > 0 && (
        <ToolSection>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <div className="bg-indigo-100 rounded-lg p-2 mr-3">
                <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
              </div>
              {t.imageConverter.convertSettings}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* 出力形式 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t.imageConverter.outputFormat}
                </label>
                <select
                  value={settings.format}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      format: e.target.value as ConversionSettings["format"],
                    }))
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                >
                  <option value="jpeg">{t.imageConverter.jpeg}</option>
                  <option value="png">{t.imageConverter.png}</option>
                  <option value="webp">{t.imageConverter.webp}</option>
                  <option value="bmp">{t.imageConverter.bmp}</option>
                </select>
              </div>

              {/* 品質設定（JPEG用） */}
              {settings.format === "jpeg" && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {t.imageConverter.quality}:{" "}
                    <span className="text-blue-600 font-bold">
                      {settings.quality}%
                    </span>
                  </label>
                  <div className="px-3">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={settings.quality}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          quality: parseInt(e.target.value),
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{t.imageConverter.lowQuality}</span>
                      <span>{t.imageConverter.highQuality}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* アスペクト比 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {t.imageConverter.aspectRatio}
                </label>
                <select
                  value={settings.aspectRatio}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      aspectRatio: e.target
                        .value as ConversionSettings["aspectRatio"],
                    }))
                  }
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                >
                  <option value="original">
                    {t.imageConverter.originalRatio}
                  </option>
                  <option value="square">{t.imageConverter.square}</option>
                  <option value="landscape">
                    {t.imageConverter.landscape}
                  </option>
                  <option value="portrait">{t.imageConverter.portrait}</option>
                  <option value="custom">{t.imageConverter.custom}</option>
                </select>
              </div>

              {/* カスタムサイズ */}
              {settings.aspectRatio === "custom" && (
                <>
                  {/* 縦横比維持の設定 */}
                  <div className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      id="maintainAspectRatio"
                      checked={settings.maintainAspectRatio}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          maintainAspectRatio: e.target.checked,
                        }))
                      }
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="maintainAspectRatio"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      {t.imageConverter.maintainAspectRatio}
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.imageConverter.width}
                    </label>
                    <input
                      type="number"
                      value={settings.width}
                      onChange={(e) => {
                        const newWidth = parseInt(e.target.value) || 0;
                        setSettings((prev) => {
                          if (prev.maintainAspectRatio && images.length > 0) {
                            // 最初の画像のアスペクト比を基準に高さを自動計算
                            const firstImage = images[0];
                            const aspectRatio =
                              firstImage.originalDimensions.width /
                              firstImage.originalDimensions.height;
                            const newHeight = Math.round(
                              newWidth / aspectRatio
                            );
                            return {
                              ...prev,
                              width: newWidth,
                              height: newHeight,
                            };
                          }
                          return {
                            ...prev,
                            width: newWidth,
                          };
                        });
                      }}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder={t.imageConverter.widthPlaceholder}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      {t.imageConverter.height}
                    </label>
                    <input
                      type="number"
                      value={settings.height}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          height: parseInt(e.target.value) || 0,
                        }))
                      }
                      disabled={settings.maintainAspectRatio}
                      className={`w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors ${
                        settings.maintainAspectRatio
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : ""
                      }`}
                      placeholder={
                        settings.maintainAspectRatio
                          ? t.imageConverter.autoCalculated
                          : t.imageConverter.heightPlaceholder
                      }
                    />
                    {settings.maintainAspectRatio && (
                      <p className="text-xs text-gray-500">
                        {t.imageConverter.autoCalculationNote}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </ToolSection>
      )}

      {/* 選択ファイル一覧 */}
      {images.length > 0 && (
        <ToolSection>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-2 mr-3">
                  <Image className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                    {t.imageConverter.selectedFiles}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {images.length}
                    {t.imageConverter.filesSelected}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                {images.some((img) => img.status === "completed") && (
                  <button
                    onClick={downloadAllImages}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t.imageConverter.downloadAll}
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t.imageConverter.clear}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="bg-gray-50 rounded-xl border-2 border-gray-100 p-4 sm:p-5 hover:border-blue-200 transition-all duration-200 hover:shadow-md"
                >
                  {/* 画像プレビュー */}
                  <div className="relative mb-4">
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="w-full h-36 sm:h-40 object-cover rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => setPreviewImage(image)}
                    />
                    {/* ステータスインジケーター */}
                    <div className="absolute top-3 right-3">
                      {image.status === "waiting" && (
                        <div className="bg-gray-600 text-white rounded-full p-2 shadow-md">
                          <Upload className="h-4 w-4" />
                        </div>
                      )}
                      {image.status === "processing" && (
                        <div className="bg-blue-600 text-white rounded-full p-2 animate-spin shadow-md">
                          <Settings className="h-4 w-4" />
                        </div>
                      )}
                      {image.status === "completed" && (
                        <div className="bg-green-600 text-white rounded-full p-2 shadow-md">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      {image.status === "error" && (
                        <div className="bg-red-600 text-white rounded-full p-2 shadow-md">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* プログレスバー（処理中） */}
                    {image.status === "processing" && (
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-600 bg-opacity-90 text-white text-center py-2 rounded-b-lg">
                        <div className="text-xs font-medium">
                          {t.imageConverter.processingStatus}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ファイル情報 */}
                  <div className="space-y-2">
                    <h4
                      className="font-semibold text-gray-900 truncate text-sm"
                      title={image.file.name}
                    >
                      {image.file.name}
                    </h4>

                    {/* 元のファイル情報 */}
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>
                        {image.originalDimensions.width} ×{" "}
                        {image.originalDimensions.height}
                      </span>
                      <span>{formatFileSize(image.size)}</span>
                    </div>

                    {/* 変換後の詳細情報 */}
                    {image.status === "completed" &&
                      image.convertedSize &&
                      image.convertedDimensions && (
                        <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-xs text-green-800 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="font-medium">
                                {t.imageConverter.convertedDimensions}:
                              </span>
                              <span className="sm:text-right">
                                {image.convertedDimensions.width} ×{" "}
                                {image.convertedDimensions.height}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="font-medium">
                                {t.imageConverter.convertedSize}:
                              </span>
                              <span className="sm:text-right">
                                {formatFileSize(image.convertedSize)}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="font-medium">
                                {t.imageConverter.compressionRatio}:
                              </span>
                              <span className="text-green-700 font-semibold sm:text-right">
                                {calculateCompressionRatio(
                                  image.size,
                                  image.convertedSize
                                )}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="font-medium">
                                {t.imageConverter.sizeReduction}:
                              </span>
                              <span
                                className={`font-semibold sm:text-right ${
                                  image.convertedSize < image.size
                                    ? "text-green-700"
                                    : "text-orange-600"
                                }`}
                              >
                                {calculateSizeReduction(
                                  image.size,
                                  image.convertedSize
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* ステータステキスト */}
                    <div className="text-xs">
                      {image.status === "waiting" && (
                        <span className="text-gray-500">
                          {t.imageConverter.waiting}
                        </span>
                      )}
                      {image.status === "processing" && (
                        <span className="text-blue-600 font-medium">
                          {t.imageConverter.processingStatus}
                        </span>
                      )}
                      {image.status === "completed" && (
                        <span className="text-green-600 font-medium">
                          {t.imageConverter.completed}
                        </span>
                      )}
                      {image.status === "error" && (
                        <span className="text-red-600 font-medium">
                          {t.imageConverter.error}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => setPreviewImage(image)}
                      className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      {t.imageConverter.preview}
                    </button>

                    <div className="flex gap-2">
                      {image.status === "completed" && (
                        <button
                          onClick={() => downloadImage(image)}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          title={t.imageConverter.download}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(image.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title={t.imageConverter.remove}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ToolSection>
      )}

      {/* 変換実行ボタン */}
      {images.length > 0 && (
        <ToolSection>
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4">
                {isProcessing
                  ? t.imageConverter.convertingInProgress
                  : t.imageConverter.startConversion}
              </h3>

              {/* プログレスバー */}
              {isProcessing && (
                <div className="mb-4 sm:mb-6">
                  <div className="bg-white bg-opacity-20 rounded-full h-3 mb-2">
                    <div
                      className="bg-white rounded-full h-3 transition-all duration-300"
                      style={{
                        width: `${
                          (images.filter(
                            (img) =>
                              img.status === "completed" ||
                              img.status === "error"
                          ).length /
                            images.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100">
                    {images.filter((img) => img.status === "completed").length}{" "}
                    / {images.length} {t.imageConverter.progressText}
                  </p>
                </div>
              )}

              <button
                onClick={convertImages}
                disabled={isProcessing}
                className="inline-flex items-center px-4 sm:px-6 lg:px-8 py-2 sm:py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base lg:text-lg shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Settings className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                    {t.imageConverter.processing}
                  </>
                ) : (
                  <>
                    <Image className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    {t.imageConverter.convert}
                  </>
                )}
              </button>

              {!isProcessing && (
                <p className="text-blue-100 text-xs sm:text-sm mt-3 sm:mt-4">
                  {images.length}
                  {t.imageConverter.filesProcessed}を
                  {settings.format.toUpperCase()}
                  {t.imageConverter.formatConversionNote}
                </p>
              )}
            </div>
          </div>
        </ToolSection>
      )}

      {/* 変換完了後の統計情報 */}
      {images.length > 0 &&
        images.every(
          (img) => img.status === "completed" || img.status === "error"
        ) &&
        !isProcessing && (
          <ToolSection>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-green-200">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <Check className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                {t.imageConverter.resultsSummary}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* 総ファイル数 */}
                <div className="text-center bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                    {images.filter((img) => img.status === "completed").length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {t.imageConverter.conversionSuccess}
                  </div>
                </div>

                {/* 総容量削減 */}
                <div className="text-center bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <div className="text-sm sm:text-lg lg:text-xl font-bold text-green-600 break-all">
                    {(() => {
                      const totalOriginal = images
                        .filter((img) => img.status === "completed")
                        .reduce((sum, img) => sum + img.size, 0);
                      const totalConverted = images
                        .filter(
                          (img) =>
                            img.status === "completed" && img.convertedSize
                        )
                        .reduce(
                          (sum, img) => sum + (img.convertedSize || 0),
                          0
                        );
                      return calculateSizeReduction(
                        totalOriginal,
                        totalConverted
                      );
                    })()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {t.imageConverter.totalSizeChange}
                  </div>
                </div>

                {/* 平均圧縮率 */}
                <div className="text-center bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                    {(() => {
                      const completedImages = images.filter(
                        (img) => img.status === "completed" && img.convertedSize
                      );
                      if (completedImages.length === 0) return "0%";
                      const totalRatio = completedImages.reduce((sum, img) => {
                        const ratio =
                          ((img.size - (img.convertedSize || 0)) / img.size) *
                          100;
                        return sum + Math.max(0, ratio);
                      }, 0);
                      return `${(totalRatio / completedImages.length).toFixed(
                        1
                      )}%`;
                    })()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {t.imageConverter.averageCompressionRate}
                  </div>
                </div>

                {/* エラー数 */}
                <div className="text-center bg-white rounded-lg p-3 sm:p-4 shadow-sm">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">
                    {images.filter((img) => img.status === "error").length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {t.imageConverter.errorCount}
                  </div>
                </div>
              </div>

              {/* 一括ダウンロードボタン */}
              {images.some((img) => img.status === "completed") && (
                <div className="mt-4 sm:mt-6 text-center">
                  <button
                    onClick={downloadAllImages}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {t.imageConverter.downloadAll} (
                    {images.filter((img) => img.status === "completed").length}
                    {t.imageConverter.filesProcessed})
                  </button>
                </div>
              )}
            </div>
          </ToolSection>
        )}

      {/* プレビューモーダル */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 backdrop-blur-sm p-2 sm:p-4"
          onClick={() => {
            setPreviewImage(null);
            setPreviewZoom(1);
            setShowComparison(false);
          }}
        >
          <div
            className="bg-white rounded-lg sm:rounded-2xl max-w-7xl max-h-[98vh] sm:max-h-[96vh] w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white gap-2 sm:gap-3">
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                    {t.imageConverter.previewTitle}
                  </h3>
                  <p
                    className="text-blue-100 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-md mt-1"
                    title={previewImage.file.name}
                  >
                    {previewImage.file.name}
                  </p>
                </div>

                {/* ナビゲーション */}
                {images.length > 1 && (
                  <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 bg-white bg-opacity-20 rounded-lg px-2 sm:px-3 py-2">
                    <button
                      onClick={() => {
                        const currentIndex = images.findIndex(
                          (img) => img.id === previewImage.id
                        );
                        if (currentIndex > 0) {
                          setPreviewImage(images[currentIndex - 1]);
                          setPreviewZoom(1);
                        }
                      }}
                      disabled={
                        images.findIndex(
                          (img) => img.id === previewImage.id
                        ) === 0
                      }
                      className="p-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium min-w-[50px] sm:min-w-[60px] text-center">
                      {images.findIndex((img) => img.id === previewImage.id) +
                        1}{" "}
                      / {images.length}
                    </span>
                    <button
                      onClick={() => {
                        const currentIndex = images.findIndex(
                          (img) => img.id === previewImage.id
                        );
                        if (currentIndex < images.length - 1) {
                          setPreviewImage(images[currentIndex + 1]);
                          setPreviewZoom(1);
                        }
                      }}
                      disabled={
                        images.findIndex(
                          (img) => img.id === previewImage.id
                        ) ===
                        images.length - 1
                      }
                      className="p-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* コントロール */}
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
                {/* ズームコントロール */}
                <div className="flex items-center space-x-1 bg-white bg-opacity-20 rounded-lg px-1 sm:px-2 py-1">
                  <button
                    onClick={() =>
                      setPreviewZoom((prev) => Math.max(prev - 0.25, 0.25))
                    }
                    disabled={previewZoom <= 0.25}
                    className="p-1 sm:p-1.5 hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-50"
                  >
                    <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <span className="text-xs sm:text-sm px-1 sm:px-3 min-w-[40px] sm:min-w-[60px] text-center font-medium">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    onClick={() =>
                      setPreviewZoom((prev) => Math.min(prev + 0.25, 3))
                    }
                    disabled={previewZoom >= 3}
                    className="p-1 sm:p-1.5 hover:bg-white hover:bg-opacity-20 rounded disabled:opacity-50"
                  >
                    <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewZoom(1)}
                    className="p-1 sm:p-1.5 hover:bg-white hover:bg-opacity-20 rounded"
                  >
                    <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>

                {/* 比較モード切替 */}
                {previewImage.convertedUrl && (
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      showComparison
                        ? "bg-white text-blue-600"
                        : "bg-white bg-opacity-20 hover:bg-opacity-30"
                    }`}
                  >
                    {showComparison
                      ? t.imageConverter.singleView
                      : t.imageConverter.comparison}
                  </button>
                )}

                <button
                  onClick={() => {
                    setPreviewImage(null);
                    setPreviewZoom(1);
                    setShowComparison(false);
                  }}
                  className="p-2 sm:p-2.5 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* モバイル用ナビゲーション */}
              {images.length > 1 && (
                <div className="flex sm:hidden items-center justify-center w-full bg-white bg-opacity-20 rounded-lg px-3 py-2">
                  <button
                    onClick={() => {
                      const currentIndex = images.findIndex(
                        (img) => img.id === previewImage.id
                      );
                      if (currentIndex > 0) {
                        setPreviewImage(images[currentIndex - 1]);
                        setPreviewZoom(1);
                      }
                    }}
                    disabled={
                      images.findIndex((img) => img.id === previewImage.id) ===
                      0
                    }
                    className="p-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium px-4 text-center">
                    {images.findIndex((img) => img.id === previewImage.id) + 1}{" "}
                    / {images.length}
                  </span>
                  <button
                    onClick={() => {
                      const currentIndex = images.findIndex(
                        (img) => img.id === previewImage.id
                      );
                      if (currentIndex < images.length - 1) {
                        setPreviewImage(images[currentIndex + 1]);
                        setPreviewZoom(1);
                      }
                    }}
                    disabled={
                      images.findIndex((img) => img.id === previewImage.id) ===
                      images.length - 1
                    }
                    className="p-2 bg-white bg-opacity-20 rounded-md hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* メインコンテンツ */}
            <div className="p-3 sm:p-4 lg:p-6 max-h-[85vh] overflow-auto">
              {showComparison && previewImage.convertedUrl ? (
                /* 比較表示 */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-8">
                  {/* 元画像 */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-gray-100 rounded-lg p-1.5 sm:p-2">
                          <Image className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        </div>
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                          {t.imageConverter.original}
                        </h4>
                      </div>
                    </div>
                    <div className="relative border rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={previewImage.preview}
                        alt={previewImage.file.name}
                        className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain"
                        style={{ transform: `scale(${previewZoom})` }}
                      />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t.imageConverter.sizeLabel}:
                        </span>
                        <span className="font-medium">
                          {previewImage.originalDimensions.width} ×{" "}
                          {previewImage.originalDimensions.height}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t.imageConverter.fileSizeLabel}:
                        </span>
                        <span className="font-medium">
                          {formatFileSize(previewImage.size)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t.imageConverter.formatLabel}:
                        </span>
                        <span className="font-medium uppercase">
                          {previewImage.file.type.split("/")[1]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 変換後画像 */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="flex items-center space-x-2">
                        <div className="bg-green-100 rounded-lg p-1.5 sm:p-2">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        </div>
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                          {t.imageConverter.converted}
                        </h4>
                      </div>
                      <button
                        onClick={() => downloadImage(previewImage)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors self-start sm:self-auto"
                      >
                        <Download className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        {t.imageConverter.download}
                      </button>
                    </div>
                    <div className="relative border rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={previewImage.convertedUrl}
                        alt={`Converted ${previewImage.file.name}`}
                        className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain"
                        style={{ transform: `scale(${previewZoom})` }}
                      />
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t.imageConverter.convertedSize}:
                        </span>
                        <span className="font-medium text-green-700">
                          {previewImage.convertedSize &&
                            formatFileSize(previewImage.convertedSize)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t.imageConverter.convertedDimensions}:
                        </span>
                        <span className="font-medium text-green-700">
                          {previewImage.convertedDimensions &&
                            `${previewImage.convertedDimensions.width} × ${previewImage.convertedDimensions.height}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {t.imageConverter.format}:
                        </span>
                        <span className="font-medium text-green-700 uppercase">
                          {settings.format}
                        </span>
                      </div>
                      {previewImage.convertedSize && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {t.imageConverter.compressionRatio}:
                          </span>
                          <span className="font-medium text-green-700">
                            {calculateCompressionRatio(
                              previewImage.size,
                              previewImage.convertedSize
                            )}
                          </span>
                        </div>
                      )}
                      {previewImage.convertedSize && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {t.imageConverter.sizeReduction}:
                          </span>
                          <span
                            className={`font-medium ${
                              previewImage.convertedSize < previewImage.size
                                ? "text-green-700"
                                : "text-orange-600"
                            }`}
                          >
                            {calculateSizeReduction(
                              previewImage.size,
                              previewImage.convertedSize
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* 単体表示 */
                <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="relative inline-block">
                    <div className="border rounded-lg overflow-hidden bg-gray-50 shadow-lg">
                      <img
                        src={previewImage.convertedUrl || previewImage.preview}
                        alt={previewImage.file.name}
                        className="max-w-full max-h-[55vh] sm:max-h-[65vh] lg:max-h-[70vh] object-contain"
                        style={{ transform: `scale(${previewZoom})` }}
                      />
                    </div>
                    {previewImage.status === "processing" && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="bg-white rounded-lg p-3 sm:p-4 flex items-center space-x-3">
                          <Settings className="h-5 w-5 animate-spin text-blue-600" />
                          <span className="text-gray-900 font-medium text-sm sm:text-base">
                            {t.imageConverter.processingStatus}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 画像情報 */}
                  <div className="max-w-sm sm:max-w-md mx-auto bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-600">
                          {t.imageConverter.originalSize}:
                        </span>
                        <p className="font-medium">
                          {previewImage.originalDimensions.width} ×{" "}
                          {previewImage.originalDimensions.height}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          {t.imageConverter.fileSize}:
                        </span>
                        <p className="font-medium">
                          {formatFileSize(previewImage.size)}
                        </p>
                      </div>

                      {/* 変換後の情報（変換完了時のみ） */}
                      {previewImage.status === "completed" &&
                        previewImage.convertedDimensions &&
                        previewImage.convertedSize && (
                          <>
                            <div>
                              <span className="text-gray-600">
                                {t.imageConverter.convertedDimensions}:
                              </span>
                              <p className="font-medium text-green-700">
                                {previewImage.convertedDimensions.width} ×{" "}
                                {previewImage.convertedDimensions.height}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {t.imageConverter.convertedSize}:
                              </span>
                              <p className="font-medium text-green-700">
                                {formatFileSize(previewImage.convertedSize)}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {t.imageConverter.compressionRatio}:
                              </span>
                              <p className="font-medium text-green-700">
                                {calculateCompressionRatio(
                                  previewImage.size,
                                  previewImage.convertedSize
                                )}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {t.imageConverter.sizeReduction}:
                              </span>
                              <p
                                className={`font-medium ${
                                  previewImage.convertedSize < previewImage.size
                                    ? "text-green-700"
                                    : "text-orange-600"
                                }`}
                              >
                                {calculateSizeReduction(
                                  previewImage.size,
                                  previewImage.convertedSize
                                )}
                              </p>
                            </div>
                          </>
                        )}
                    </div>

                    {previewImage.convertedUrl && (
                      <button
                        onClick={() => downloadImage(previewImage)}
                        className="w-full mt-3 sm:mt-4 inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {t.imageConverter.download}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* キーボードショートカットヘルプ */}
            <div className="border-t bg-gray-50 px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:gap-4 text-xs text-gray-600">
                <span className="flex items-center">
                  <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">
                    ESC
                  </kbd>
                  <span className="ml-1">{t.imageConverter.closeShortcut}</span>
                </span>
                {images.length > 1 && (
                  <span className="hidden sm:flex items-center">
                    <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">
                      ←
                    </kbd>
                    <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs ml-1">
                      →
                    </kbd>
                    <span className="ml-1">
                      {t.imageConverter.navigationShortcut}
                    </span>
                  </span>
                )}
                <span className="flex items-center">
                  <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">
                    +
                  </kbd>
                  <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs ml-1">
                    -
                  </kbd>
                  <span className="ml-1">{t.imageConverter.zoomShortcut}</span>
                </span>
                <span className="flex items-center">
                  <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">
                    0
                  </kbd>
                  <span className="ml-1">{t.imageConverter.resetShortcut}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ セクション */}
      <ToolSection>
        <ToolFaq faqList={t.imageConverter.faqList} t={t} />
      </ToolSection>
    </ToolLayout>
  );
}
