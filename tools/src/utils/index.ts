import * as fs from "fs";
import * as path from "path";

/**
 * ディレクトリが存在しない場合は作成する
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ ディレクトリを作成しました: ${dirPath}`);
  }
}

/**
 * ファイルを保存する
 */
export function saveFile(filePath: string, data: Buffer): void {
  const dir = path.dirname(filePath);
  ensureDirectoryExists(dir);

  fs.writeFileSync(filePath, data);
  console.log(`✅ ファイルを保存しました: ${filePath}`);
}

/**
 * ファイル名をサニタイズする（特殊文字を除去）
 */
export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9\-_]/g, "_");
}

/**
 * プログレスログを出力する
 */
export function logProgress(
  current: number,
  total: number,
  message: string
): void {
  const percentage = Math.round((current / total) * 100);
  console.log(`[${percentage}%] ${message}`);
}

/**
 * 成功メッセージを出力する
 */
export function logSuccess(message: string): void {
  console.log(`✅ ${message}`);
}

/**
 * エラーメッセージを出力する
 */
export function logError(message: string, error?: Error): void {
  console.error(`❌ ${message}`);
  if (error) {
    console.error(error.message);
  }
}

/**
 * 情報メッセージを出力する
 */
export function logInfo(message: string): void {
  console.log(`ℹ️  ${message}`);
}

/**
 * 16進数カラーをRGBに変換する
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * RGBカラーを16進数に変換する
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * カラーを暗くする
 */
export function darkenColor(color: string, amount: number): string {
  const rgb = hexToRgb(color);
  return rgbToHex(
    Math.max(0, Math.round(rgb.r * (1 - amount))),
    Math.max(0, Math.round(rgb.g * (1 - amount))),
    Math.max(0, Math.round(rgb.b * (1 - amount)))
  );
}

/**
 * カラーを明るくする
 */
export function lightenColor(color: string, amount: number): string {
  const rgb = hexToRgb(color);
  return rgbToHex(
    Math.min(255, Math.round(rgb.r + (255 - rgb.r) * amount)),
    Math.min(255, Math.round(rgb.g + (255 - rgb.g) * amount)),
    Math.min(255, Math.round(rgb.b + (255 - rgb.b) * amount))
  );
}
