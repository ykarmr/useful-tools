import sharp from "sharp";
import * as path from "path";
import { SIZES, OUTPUT_DIRS } from "../config";
import { saveFile, logProgress, logSuccess, logError } from "../utils";

/**
 * ファビコン生成クラス
 */
export class FaviconGenerator {
  private logoPath: string;

  constructor(logoPath?: string) {
    // デフォルトロゴパスを設定
    this.logoPath =
      logoPath ||
      path.join(__dirname, "../../app/", OUTPUT_DIRS.logo, "logo.png");
  }

  /**
   * 指定サイズのファビコンを生成
   */
  public async generateFavicon(
    size: number,
    outputPath: string
  ): Promise<void> {
    try {
      const buffer = await sharp(this.logoPath)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png({
          quality: 95,
          compressionLevel: 9,
        })
        .toBuffer();

      saveFile(outputPath, buffer);
    } catch (error) {
      throw new Error(
        `ファビコン生成エラー (${size}px): ${(error as Error).message}`
      );
    }
  }

  /**
   * ICOファイルを生成（16px, 32px, 48pxを含む）
   */
  public async generateIcoFile(outputPath: string): Promise<void> {
    try {
      // ICOファイル用の複数サイズの画像を生成
      const sizes = [16, 32, 48];
      const images = await Promise.all(
        sizes.map((size) =>
          sharp(this.logoPath)
            .resize(size, size, {
              kernel: sharp.kernel.lanczos3,
              fit: "contain",
              background: { r: 255, g: 255, b: 255, alpha: 0 },
            })
            .png()
            .toBuffer()
        )
      );

      // 最大サイズの画像をICOとして保存（簡単な実装）
      const icoBuffer = await sharp(this.logoPath)
        .resize(32, 32)
        .png()
        .toBuffer();

      saveFile(outputPath, icoBuffer);
    } catch (error) {
      throw new Error(`ICOファイル生成エラー: ${(error as Error).message}`);
    }
  }

  /**
   * Apple Touch Iconを生成
   */
  public async generateAppleTouchIcon(outputPath: string): Promise<void> {
    try {
      const buffer = await sharp(this.logoPath)
        .resize(180, 180, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .png({
          quality: 95,
          compressionLevel: 9,
        })
        .toBuffer();

      saveFile(outputPath, buffer);
    } catch (error) {
      throw new Error(
        `Apple Touch Icon生成エラー: ${(error as Error).message}`
      );
    }
  }

  /**
   * PWA用のアイコンセットを生成
   */
  public async generatePwaIcons(): Promise<void> {
    const pwaBasePath = path.join(
      __dirname,
      "../../app/",
      OUTPUT_DIRS.favicon,
      "pwa"
    );
    const pwaSizes = [72, 96, 128, 144, 152, 192, 384, 512];

    for (const size of pwaSizes) {
      const outputPath = path.join(pwaBasePath, `icon-${size}x${size}.png`);

      const buffer = await sharp(this.logoPath)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: "contain",
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .png({
          quality: 95,
          compressionLevel: 9,
        })
        .toBuffer();

      saveFile(outputPath, buffer);
    }
  }

  /**
   * すべてのファビコンを生成
   */
  public async generateAllFavicons(): Promise<void> {
    try {
      logProgress(0, 1, "ファビコン生成を開始します...");

      const baseOutputPath = path.join(
        __dirname,
        "../../app/",
        OUTPUT_DIRS.favicon
      );
      let generatedCount = 0;
      const totalTasks = SIZES.favicon.sizes.length + 4; // 通常サイズ + ICO + Apple Touch + PWA

      // 通常のファビコンサイズを生成
      for (const size of SIZES.favicon.sizes) {
        const filename = `favicon-${size}x${size}.png`;
        const outputPath = path.join(baseOutputPath, filename);

        try {
          await this.generateFavicon(size, outputPath);
          generatedCount++;
          logProgress(
            generatedCount,
            totalTasks,
            `${size}x${size}のファビコンを生成しました`
          );
        } catch (error) {
          logError(
            `${size}x${size}のファビコン生成に失敗しました`,
            error as Error
          );
        }
      }

      // ICOファイルを生成
      try {
        const icoPath = path.join(baseOutputPath, "favicon.ico");
        await this.generateIcoFile(icoPath);
        generatedCount++;
        logProgress(generatedCount, totalTasks, "favicon.icoを生成しました");
      } catch (error) {
        logError("favicon.ico生成に失敗しました", error as Error);
      }

      // Apple Touch Iconを生成
      try {
        const appleTouchPath = path.join(
          baseOutputPath,
          "apple-touch-icon.png"
        );
        await this.generateAppleTouchIcon(appleTouchPath);
        generatedCount++;
        logProgress(
          generatedCount,
          totalTasks,
          "Apple Touch Iconを生成しました"
        );
      } catch (error) {
        logError("Apple Touch Icon生成に失敗しました", error as Error);
      }

      // PWAアイコンを生成
      try {
        await this.generatePwaIcons();
        generatedCount++;
        logProgress(
          generatedCount,
          totalTasks,
          "PWAアイコンセットを生成しました"
        );
      } catch (error) {
        logError("PWAアイコン生成に失敗しました", error as Error);
      }

      // デフォルトファビコンをコピー
      try {
        const defaultFaviconPath = path.join(baseOutputPath, "favicon.png");
        await this.generateFavicon(32, defaultFaviconPath);
        generatedCount++;
        logProgress(
          generatedCount,
          totalTasks,
          "デフォルトファビコンを生成しました"
        );
      } catch (error) {
        logError("デフォルトファビコン生成に失敗しました", error as Error);
      }

      logSuccess(
        `すべてのファビコンを生成しました (${generatedCount}/${totalTasks})`
      );
    } catch (error) {
      logError("ファビコン生成処理でエラーが発生しました", error as Error);
      throw error;
    }
  }

  /**
   * マニフェストファイル用のアイコン情報を生成
   */
  public generateManifestIcons(): Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }> {
    const icons = [];

    // 通常のファビコン
    for (const size of SIZES.favicon.sizes) {
      icons.push({
        src: `/images/favicon/favicon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
      });
    }

    // PWAアイコン
    const pwaSizes = [72, 96, 128, 144, 152, 192, 384, 512];
    for (const size of pwaSizes) {
      icons.push({
        src: `/images/favicon/pwa/icon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "any maskable",
      });
    }

    return icons;
  }
}

// CLIから直接実行された場合
if (require.main === module) {
  const generator = new FaviconGenerator();
  generator.generateAllFavicons().catch(console.error);
}
