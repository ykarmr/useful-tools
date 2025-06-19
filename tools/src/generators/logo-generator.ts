import { createCanvas, CanvasRenderingContext2D } from "canvas";
import * as path from "path";
import {
  SUPPORTED_LOCALES,
  LOCALE_ICONS,
  LOCALE_LABELS,
  FALLBACK_LOCALES,
  getTranslations,
  COLORS,
  SIZES,
  OUTPUT_DIRS,
} from "../config";
import { saveFile, logProgress, logSuccess, logError } from "../utils";

/**
 * ロゴ生成クラス
 */
export class LogoGenerator {
  private canvas: any;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    const { width, height } = SIZES.logo;
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * 基本的なロゴデザインを描画
   */
  private drawBaseLogo(): void {
    const { width, height } = SIZES.logo;
    const centerX = width / 2;
    const centerY = height / 2;

    // 背景をクリア
    this.ctx.clearRect(0, 0, width, height);

    // グラデーション背景
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, COLORS.primary);
    gradient.addColorStop(1, COLORS.secondary);

    // 円形の背景
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, width * 0.4, 0, Math.PI * 2);
    this.ctx.fill();

    // 内側の円（白色）
    this.ctx.fillStyle = COLORS.background;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, width * 0.32, 0, Math.PI * 2);
    this.ctx.fill();

    // ツールアイコン（シンプルな歯車デザイン）
    this.drawGearIcon(centerX, centerY, width * 0.2);
  }

  /**
   * 歯車アイコンを描画
   */
  private drawGearIcon(centerX: number, centerY: number, radius: number): void {
    const teeth = 8;
    const innerRadius = radius * 0.6;
    const toothHeight = radius * 0.2;

    this.ctx.fillStyle = COLORS.primary;
    this.ctx.beginPath();

    // 歯車の外周を描画
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (i * Math.PI) / teeth;
      const r = i % 2 === 0 ? radius : radius - toothHeight;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.closePath();
    this.ctx.fill();

    // 中央の穴
    this.ctx.fillStyle = COLORS.background;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, innerRadius * 0.4, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * 指定した言語のロゴを生成
   */
  public async generateLogo(localeCode: string): Promise<Buffer> {
    // applicationの翻訳データを取得
    const translations = getTranslations(localeCode);

    // 翻訳データが取得できない場合はサポートされていない言語としてエラー
    if (!translations && !FALLBACK_LOCALES.includes(localeCode)) {
      throw new Error(`サポートされていない言語コード: ${localeCode}`);
    }

    // ベースロゴを描画
    this.drawBaseLogo();

    // タイトルテキストを取得（applicationの翻訳から取得、フォールバックは"USEFUL TOOLS"）
    const title = translations?.common?.siteTitle || "USEFUL TOOLS";

    return this.canvas.toBuffer("image/png");
  }

  /**
   * すべての言語のロゴを生成
   */
  public async generateAllLogos(): Promise<void> {
    try {
      logProgress(0, SUPPORTED_LOCALES.length, "ロゴ生成を開始します...");

      let count = 0;
      const total = SUPPORTED_LOCALES.length;

      // 各言語のロゴを生成
      for (const localeCode of SUPPORTED_LOCALES) {
        try {
          const logoBuffer = await this.generateLogo(localeCode);
          const filename = `logo-${localeCode}.png`;
          const outputPath = path.join(
            __dirname,
            "../../",
            OUTPUT_DIRS.logo,
            filename
          );

          saveFile(outputPath, logoBuffer);
          count++;

          const localeName = LOCALE_LABELS[localeCode] || localeCode;
          logProgress(count, total, `${localeName}のロゴを生成しました`);
        } catch (error) {
          const localeName = LOCALE_LABELS[localeCode] || localeCode;
          logError(`${localeName}のロゴ生成に失敗しました`, error as Error);
        }
      }

      // デフォルトロゴ（英語版）も生成
      const defaultLogoBuffer = await this.generateLogo("en");
      const defaultPath = path.join(
        __dirname,
        "../../",
        OUTPUT_DIRS.logo,
        "logo.png"
      );
      saveFile(defaultPath, defaultLogoBuffer);

      logSuccess(`すべてのロゴを生成しました (${count}/${total})`);
    } catch (error) {
      logError("ロゴ生成処理でエラーが発生しました", error as Error);
      throw error;
    }
  }
}

// CLIから直接実行された場合
if (require.main === module) {
  const generator = new LogoGenerator();
  generator.generateAllLogos().catch(console.error);
}
