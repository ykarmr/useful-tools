import {
  createCanvas,
  CanvasRenderingContext2D,
  CanvasTextAlign,
} from "canvas";
import * as path from "path";
import { LOCALES, COLORS, SIZES, OUTPUT_DIRS, TOOL_NAMES } from "../config";
import {
  saveFile,
  logProgress,
  logSuccess,
  logError,
  sanitizeFilename,
} from "../utils";

/**
 * OGP画像生成クラス
 */
export class OgpGenerator {
  private canvas: any;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    const { width, height } = SIZES.ogp;
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
  }

  /**
   * 背景グラデーションを描画
   */
  private drawBackground(): void {
    const { width, height } = SIZES.ogp;

    // グラデーション背景
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, COLORS.primary);
    gradient.addColorStop(0.5, COLORS.secondary);
    gradient.addColorStop(1, COLORS.primaryDark);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, width, height);

    // パターンオーバーレイ（微細なドット）
    this.drawPatternOverlay();
  }

  /**
   * パターンオーバーレイを描画
   */
  private drawPatternOverlay(): void {
    const { width, height } = SIZES.ogp;

    this.ctx.fillStyle = "rgba(255, 255, 255, 0.05)";

    for (let x = 0; x < width; x += 40) {
      for (let y = 0; y < height; y += 40) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }

  /**
   * ロゴアイコンを描画
   */
  private drawLogoIcon(x: number, y: number, size: number): void {
    // 円形の背景
    this.ctx.fillStyle = COLORS.background;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    this.ctx.fill();

    // 歯車アイコン
    this.drawGearIcon(x, y, size * 0.3);
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
   * テキストを描画
   */
  private drawText(
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fontFamily: string,
    color: string = COLORS.background,
    fontWeight: string = "normal",
    textAlign: CanvasTextAlign = "left"
  ): void {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = "top";

    // テキストに影を追加
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    this.ctx.shadowBlur = 4;
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;

    this.ctx.fillText(text, x, y);

    // 影をリセット
    this.ctx.shadowColor = "transparent";
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  /**
   * 装飾要素を描画
   */
  private drawDecorations(): void {
    const { width, height } = SIZES.ogp;

    // 右下の装飾円
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.beginPath();
    this.ctx.arc(width - 100, height - 100, 150, 0, Math.PI * 2);
    this.ctx.fill();

    // 左上の装飾円
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    this.ctx.beginPath();
    this.ctx.arc(100, 100, 80, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * 指定した言語のOGP画像を生成
   */
  public async generateOgpImage(localeCode: string): Promise<Buffer> {
    const locale = LOCALES[localeCode];
    if (!locale) {
      throw new Error(`サポートされていない言語コード: ${localeCode}`);
    }

    const { width, height } = SIZES.ogp;

    // 背景を描画
    this.drawBackground();

    // 装飾要素を描画
    this.drawDecorations();

    // ロゴアイコンを描画
    this.drawLogoIcon(150, height / 2, 140);

    // フォントファミリーを取得
    const fontFamily = getFontFamily(localeCode);

    // メインタイトルを描画（複数行対応）
    const mainTitle = "USEFUL TOOLS";
    this.drawMultilineText(
      mainTitle,
      280,
      160,
      64,
      fontFamily,
      COLORS.background,
      width - 320,
      80
    );

    // サブタイトルを描画
    this.drawText(
      locale.subtitle,
      280,
      280,
      36,
      fontFamily,
      "rgba(255, 255, 255, 0.9)",
      "normal",
      "left"
    );

    // 説明文を描画（複数行対応）
    this.drawMultilineText(
      locale.description,
      280,
      340,
      28,
      fontFamily,
      "rgba(255, 255, 255, 0.8)",
      width - 320,
      40
    );

    // 言語インジケーターを描画
    this.drawText(
      `${locale.flag} ${locale.name}`,
      width - 50,
      50,
      24,
      fontFamily,
      "rgba(255, 255, 255, 0.7)",
      "normal",
      "right"
    );

    return this.canvas.toBuffer("image/png");
  }

  /**
   * 複数行テキストを描画（多言語対応）
   */
  private drawMultilineText(
    text: string,
    x: number,
    y: number,
    fontSize: number,
    fontFamily: string,
    color: string,
    maxWidth: number,
    lineHeight: number
  ): void {
    this.ctx.fillStyle = color;
    this.ctx.font = `normal ${fontSize}px ${fontFamily}`;
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";

    // 影を追加
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    this.ctx.shadowBlur = 2;
    this.ctx.shadowOffsetX = 1;
    this.ctx.shadowOffsetY = 1;

    const lines = this.wrapText(text, maxWidth, fontSize, fontFamily);
    let currentY = y;

    for (const line of lines) {
      this.ctx.fillText(line, x, currentY);
      currentY += lineHeight;
    }

    // 影をリセット
    this.ctx.shadowColor = "transparent";
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
  }

  /**
   * テキストを指定された幅で折り返し（多言語対応）
   */
  private wrapText(
    text: string,
    maxWidth: number,
    fontSize: number,
    fontFamily: string
  ): string[] {
    this.ctx.font = `normal ${fontSize}px ${fontFamily}`;
    const lines: string[] = [];

    // 日本語、中国語、韓国語などの文字を検出
    const isAsianLanguage =
      /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uAC00-\uD7AF]/.test(text);

    if (isAsianLanguage) {
      // アジア言語の場合は文字単位で折り返し
      let currentLine = "";

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const testLine = currentLine + char;
        const metrics = this.ctx.measureText(testLine);

        if (metrics.width > maxWidth && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = char;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
    } else {
      // 英語などスペース区切りの言語の場合は単語単位で折り返し
      const words = text.split(" ");
      let currentLine = "";

      for (const word of words) {
        const testLine =
          currentLine.length === 0 ? word : `${currentLine} ${word}`;
        const metrics = this.ctx.measureText(testLine);

        if (metrics.width > maxWidth && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
    }

    // 最大行数を制限（3行まで）
    return lines.slice(0, 3);
  }

  /**
   * すべての言語のOGP画像を生成
   */
  public async generateAllOgpImages(): Promise<void> {
    try {
      logProgress(0, Object.keys(LOCALES).length, "OGP画像生成を開始します...");

      let count = 0;
      const total = Object.keys(LOCALES).length;

      for (const [localeCode, locale] of Object.entries(LOCALES)) {
        try {
          // メインページ用OGP画像
          const ogpBuffer = await this.generateOgpImage(localeCode);
          const filename = `ogp-${localeCode}.png`;
          const outputPath = path.join(
            __dirname,
            "../../",
            OUTPUT_DIRS.ogp,
            filename
          );

          saveFile(outputPath, ogpBuffer);
          count++;
          logProgress(count, total, `${locale.name}のOGP画像を生成しました`);
        } catch (error) {
          logError(`${locale.name}のOGP画像生成に失敗しました`, error as Error);
        }
      }

      // デフォルトOGP画像（英語版）も生成
      const defaultOgpBuffer = await this.generateOgpImage("en");
      const defaultPath = path.join(
        __dirname,
        "../../",
        OUTPUT_DIRS.ogp,
        "ogp.png"
      );
      saveFile(defaultPath, defaultOgpBuffer);

      logSuccess(`すべてのOGP画像を生成しました (${count}/${total})`);
    } catch (error) {
      logError("OGP画像生成処理でエラーが発生しました", error as Error);
      throw error;
    }
  }

  /**
   * 特定ページ用のOGP画像を生成
   */
  public async generatePageOgpImage(
    localeCode: string,
    pageTitle: string,
    pageName: string
  ): Promise<void> {
    try {
      const locale = LOCALES[localeCode];
      if (!locale) {
        throw new Error(`サポートされていない言語コード: ${localeCode}`);
      }

      const { width, height } = SIZES.ogp;

      // 背景を描画
      this.drawBackground();

      // 装飾要素を描画
      this.drawDecorations();

      // ロゴアイコンを描画
      this.drawLogoIcon(150, height / 2, 140);

      // フォントファミリーを取得
      const fontFamily = getFontFamily(localeCode);

      // メインタイトルを描画（多言語対応）
      this.drawMultilineText(
        locale.title,
        280,
        140,
        56,
        fontFamily,
        COLORS.background,
        width - 320,
        70
      );

      // ページタイトルを描画（多言語対応のツール名を使用）
      const localizedPageTitle =
        TOOL_NAMES[pageName]?.[localeCode] || pageTitle;
      this.drawMultilineText(
        localizedPageTitle,
        280,
        240,
        42,
        fontFamily,
        "rgba(255, 255, 255, 0.9)",
        width - 320,
        50
      );

      // 説明文を描画（位置を下に調整）
      this.drawMultilineText(
        locale.description,
        280,
        360,
        26,
        fontFamily,
        "rgba(255, 255, 255, 0.8)",
        width - 320,
        36
      );

      // 言語インジケーターを描画
      this.drawText(
        `${locale.flag} ${locale.name}`,
        width - 50,
        50,
        24,
        fontFamily,
        "rgba(255, 255, 255, 0.7)",
        "normal",
        "right"
      );

      const ogpBuffer = this.canvas.toBuffer("image/png");
      const filename = `ogp-${sanitizeFilename(pageName)}-${localeCode}.png`;
      const outputPath = path.join(
        __dirname,
        "../../",
        OUTPUT_DIRS.ogp,
        "pages",
        filename
      );

      saveFile(outputPath, ogpBuffer);
      logSuccess(`${pageName}（${localeCode}）のOGP画像を生成しました`);
    } catch (error) {
      logError(
        `${pageName}（${localeCode}）のOGP画像生成に失敗しました`,
        error as Error
      );
      throw error;
    }
  }
}

/**
 * 言語に応じたフォントファミリーを取得
 */
function getFontFamily(localeCode: string): string {
  switch (localeCode) {
    case "ja":
      return '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif';
    case "zh":
      return '"Noto Sans SC", "PingFang SC", sans-serif';
    case "ko":
      return '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif';
    default:
      return '"Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  }
}

// CLIから直接実行された場合
if (require.main === module) {
  const generator = new OgpGenerator();
  generator.generateAllOgpImages().catch(console.error);
}
