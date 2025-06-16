import type { ImageConverterTranslations } from "@/locales/types/pages/tools/image-converter";

export const imageConverter: ImageConverterTranslations = {
  title: "Конвертер Изображений",
  description:
    "Конвертируйте множественные форматы изображений и изменяйте размер изображений пакетно. Поддержка перетаскивания с функцией предпросмотра",
  keywords: [
    "конвертер изображений",
    "конвертация формата изображений",
    "изменение размера изображений",
    "JPEG конвертер",
    "PNG конвертер",
    "WebP конвертер",
    "пакетная конвертация",
    "перетаскивание",
  ],

  dropZone: "Перетащите файлы изображений сюда или нажмите для выбора",
  dropZoneActive: "Отпустите файлы здесь",
  selectFiles: "Выбрать Файлы",
  supportedFormats: "Поддерживается: JPEG, PNG, WebP, BMP",

  selectedFiles: "Выбранные Файлы",
  fileInfo: "Информация о Файле",
  originalSize: "Исходный Размер",
  newSize: "Новый Размер",
  fileName: "Имя Файла",
  fileSize: "Размер Файла",
  format: "Формат",
  dimensions: "Размеры",
  convertedSize: "Размер Конвертированного Файла",
  convertedDimensions: "Размеры После Конвертации",
  compressionRatio: "Степень Сжатия",
  sizeReduction: "Уменьшение Размера",

  convertSettings: "Настройки Конвертации",
  outputFormat: "Выходной Формат",
  aspectRatio: "Соотношение Сторон",
  quality: "Качество",
  width: "Ширина",
  height: "Высота",
  maintainAspectRatio: "Сохранить Соотношение Сторон",

  convert: "Конвертировать",
  download: "Скачать",
  downloadAll: "Скачать Все",
  clear: "Очистить",
  preview: "Предпросмотр",
  remove: "Удалить",

  previewTitle: "Предпросмотр",
  original: "Оригинал",
  converted: "Конвертированное",
  noPreview: "Нет Предпросмотра",
  processing: "Обработка...",

  jpeg: "JPEG",
  png: "PNG",
  webp: "WebP",
  bmp: "BMP",

  originalRatio: "Исходное Соотношение",
  square: "Квадрат (1:1)",
  landscape: "Альбомная (16:9)",
  portrait: "Портретная (9:16)",
  custom: "Пользовательская",

  // Сообщения
  conversionComplete: "Конвертация завершена",
  conversionError: "Ошибка при конвертации",
  unsupportedFormat: "Неподдерживаемый формат",
  fileTooLarge: "Файл слишком большой (макс 10МБ)",
  maxFiles: "Максимум 20 файлов разрешено",

  // Статус
  waiting: "Ожидание",
  processingStatus: "Обработка...",
  completed: "✓ Завершено",
  error: "Ошибка",

  // Заполнители
  widthPlaceholder: "Ширина (px)",
  heightPlaceholder: "Высота (px)",
  autoCalculated: "Автоматически рассчитано",
  autoCalculationNote:
    "Автоматически рассчитывается на основе ширины для сохранения соотношения сторон",

  // Статистика
  resultsSummary: "Сводка результатов конвертации",
  conversionSuccess: "Успешно",
  totalSizeChange: "Общее изменение размера",
  averageCompressionRate: "Средняя компрессия",
  errorCount: "Ошибки",

  // Управление файлами
  filesSelected: "файлов выбрано",
  startConversion: "Начать конвертацию",
  convertingInProgress: "Конвертация...",
  progressText: "файлов завершено",
  filesProcessed: "элементов",

  // Режим предварительного просмотра
  singleView: "Один",
  comparison: "Сравнить",
  sizeLabel: "Размер",
  fileSizeLabel: "Размер файла",
  formatLabel: "Формат",

  // Горячие клавиши
  closeShortcut: "Закрыть",
  navigationShortcut: "Навигация",
  zoomShortcut: "Масштаб",
  resetShortcut: "Сброс",

  // Дополнительные сообщения
  maxFilesSizeLimit: "Макс. 20 файлов, по 10МБ каждый",
  lowQuality: "Низкое Качество",
  highQuality: "Высокое Качество",
  processingNow: "Обработка",
  formatConversionNote: "формат",

  faqList: [
    {
      q: "Какие форматы изображений поддерживаются?",
      a: "Поддерживаются форматы JPEG, PNG, WebP и BMP. Вы можете конвертировать между этими форматами.",
    },
    {
      q: "Сколько изображений я могу конвертировать одновременно?",
      a: "Вы можете конвертировать до 20 изображений одновременно. Каждый файл имеет максимальный лимит размера 10МБ.",
    },
    {
      q: "Могу ли я настроить качество изображения?",
      a: "Да, при конвертации в формат JPEG вы можете настроить качество от 1-100%.",
    },
    {
      q: "Могу ли я изменить соотношение сторон?",
      a: "Вы можете сохранить исходное соотношение или изменить на квадрат, 16:9, 9:16 или пользовательские размеры.",
    },
    {
      q: "Где сохраняются конвертированные изображения?",
      a: "Конвертированные изображения сохраняются в папку загрузок вашего браузера. Вы можете скачать по отдельности или как ZIP-файл.",
    },
  ],
};
