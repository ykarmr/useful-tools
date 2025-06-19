#!/usr/bin/env node

import { Command } from "commander";
import { LogoGenerator } from "./generators/logo-generator";
import { FaviconGenerator } from "./generators/favicon-generator";
import { OgpGenerator } from "./generators/ogp-generator";
import { OUTPUT_DIRS } from "./config";
import { logSuccess, logError, logInfo } from "./utils";
import * as path from "path";

const program = new Command();

program
  .name("image-generator")
  .description("ロゴ、ファビコン、OGP画像を多言語で生成するツール")
  .version("1.0.0");

/**
 * ロゴ生成コマンド
 */
program
  .command("logo")
  .description("すべての言語のロゴを生成")
  .option("-l, --locale <locale>", "特定の言語のみ生成 (ja, en, es, ru, zh)")
  .action(async (options) => {
    try {
      logInfo("ロゴ生成を開始します...");
      const generator = new LogoGenerator();

      if (options.locale) {
        const logoBuffer = await generator.generateLogo(options.locale);
        const outputPath = path.join(
          __dirname,
          "../",
          OUTPUT_DIRS.logo,
          `logo-${options.locale}.png`
        );
        require("./utils").saveFile(outputPath, logoBuffer);
        logSuccess(`${options.locale}のロゴを生成しました`);
      } else {
        await generator.generateAllLogos();
      }
    } catch (error) {
      logError("ロゴ生成に失敗しました", error as Error);
      process.exit(1);
    }
  });

/**
 * ファビコン生成コマンド
 */
program
  .command("favicon")
  .description("ファビコンを生成")
  .option(
    "-i, --input <path>",
    "ロゴファイルのパス（デフォルト: output/logo/logo.png）"
  )
  .action(async (options) => {
    try {
      logInfo("ファビコン生成を開始します...");
      const generator = new FaviconGenerator(options.input);
      await generator.generateAllFavicons();
    } catch (error) {
      logError("ファビコン生成に失敗しました", error as Error);
      process.exit(1);
    }
  });

/**
 * 全ツールのOGP画像を生成
 */
async function generateAllToolsOgp(
  generator: OgpGenerator,
  specificLocale?: string
) {
  const {
    getTranslations,
    SUPPORTED_LOCALES,
    TOOL_NAMES,
  } = require("./config");

  // applicationのservices翻訳を取得してツール一覧を取得
  const locales = specificLocale ? [specificLocale] : SUPPORTED_LOCALES;

  for (const locale of locales) {
    try {
      const translations = getTranslations(locale);
      // ここでは既存のTOOL_NAMESを使用
      const toolNames = Object.keys(TOOL_NAMES);

      for (const toolKey of toolNames) {
        const toolTitle = TOOL_NAMES[toolKey]?.[locale] || toolKey;
        await generator.generatePageOgpImage(locale, toolTitle, toolKey);
      }

      logSuccess(`${locale}の全ツールOGP画像を生成しました`);
    } catch (error) {
      logError(`${locale}のツールOGP画像生成に失敗しました`, error as Error);
    }
  }
}

/**
 * OGP画像生成コマンド
 */
program
  .command("ogp")
  .description("すべての言語のOGP画像を生成")
  .option("-l, --locale <locale>", "特定の言語のみ生成 (ja, en, es, ru, zh)")
  .action(async (options) => {
    try {
      logInfo("OGP画像生成を開始します...");
      const generator = new OgpGenerator();

      if (options.locale) {
        const ogpBuffer = await generator.generateOgpImage(options.locale);
        const outputPath = path.join(
          __dirname,
          "../",
          OUTPUT_DIRS.ogp,
          `ogp-${options.locale}.png`
        );
        require("./utils").saveFile(outputPath, ogpBuffer);
        logSuccess(`${options.locale}のOGP画像を生成しました`);
      } else {
        await generator.generateAllOgpImages();
      }
    } catch (error) {
      logError("OGP画像生成に失敗しました", error as Error);
      process.exit(1);
    }
  });

/**
 * 全ページのOGP画像を一括生成するコマンド
 */
program
  .command("ogp-all")
  .description("全ページ（ツール + 静的ページ）のOGP画像を一括生成")
  .option("-l, --locale <locale>", "特定の言語のみ生成 (ja, en, es, ru, zh)")
  .action(async (options) => {
    try {
      logInfo("全ページのOGP画像生成を開始します...");
      const generator = new OgpGenerator();

      if (options.locale) {
        await generator.generateAllPageOgpImages([options.locale]);
        logSuccess(`${options.locale}の全ページOGP画像を生成しました`);
      } else {
        await generator.generateAllPageOgpImages();
        logSuccess("全言語・全ページのOGP画像を生成しました");
      }
    } catch (error) {
      logError("全ページOGP画像生成に失敗しました", error as Error);
      process.exit(1);
    }
  });

/**
 * すべて生成コマンド
 */
program
  .command("all")
  .description("ロゴ、ファビコン、OGP画像をすべて生成")
  .action(async () => {
    try {
      logInfo("すべての画像生成を開始します...");

      // 1. ロゴ生成
      logInfo("ステップ 1/4: ロゴ生成中...");
      const logoGenerator = new LogoGenerator();
      await logoGenerator.generateAllLogos();

      // 2. ファビコン生成
      logInfo("ステップ 2/4: ファビコン生成中...");
      const faviconGenerator = new FaviconGenerator();
      await faviconGenerator.generateAllFavicons();

      // 3. OGP画像生成（メイン画像）
      logInfo("ステップ 3/4: メインOGP画像生成中...");
      const ogpGenerator = new OgpGenerator();
      await ogpGenerator.generateAllOgpImages();

      // 4. 全ページOGP画像生成
      logInfo("ステップ 4/4: 全ページOGP画像生成中...");
      await ogpGenerator.generateAllPageOgpImages();

      logSuccess("すべての画像生成が完了しました！");
      logInfo("生成された画像は以下のディレクトリで確認できます:");
      logInfo("- ロゴ: application/public/images/logo/");
      logInfo("- ファビコン: application/public/images/favicon/");
      logInfo("- OGP画像: application/public/images/ogp/");
      logInfo("- ページOGP画像: application/public/images/ogp/pages/");
    } catch (error) {
      logError("画像生成に失敗しました", error as Error);
      process.exit(1);
    }
  });

/**
 * 設定確認コマンド
 */
program
  .command("config")
  .description("現在の設定を表示")
  .action(() => {
    try {
      const config = require("./config");

      logInfo("現在の設定:");
      console.log("\n📋 サポート言語:");
      Object.entries(config.LOCALES).forEach(
        ([code, locale]: [string, any]) => {
          console.log(
            `  ${locale.flag} ${code}: ${locale.name} (${locale.title})`
          );
        }
      );

      console.log("\n🎨 カラーパレット:");
      Object.entries(config.COLORS).forEach(([key, color]: [string, any]) => {
        console.log(`  ${key}: ${color}`);
      });

      console.log("\n📐 画像サイズ:");
      console.log(
        `  ロゴ: ${config.SIZES.logo.width}x${config.SIZES.logo.height}px`
      );
      console.log(
        `  OGP: ${config.SIZES.ogp.width}x${config.SIZES.ogp.height}px`
      );
      console.log(`  ファビコン: ${config.SIZES.favicon.sizes.join(", ")}px`);

      console.log("\n📁 出力ディレクトリ:");
      Object.entries(config.OUTPUT_DIRS).forEach(
        ([key, dir]: [string, any]) => {
          console.log(`  ${key}: ${dir}`);
        }
      );
    } catch (error) {
      logError("設定の読み込みに失敗しました", error as Error);
    }
  });

/**
 * クリーンアップコマンド
 */
program
  .command("clean")
  .description("出力ディレクトリをクリーンアップ")
  .action(async () => {
    try {
      logInfo("出力ディレクトリをクリーンアップしています...");

      const fs = require("fs").promises;
      const outputDirs = [
        path.join(__dirname, "../output/logo"),
        path.join(__dirname, "../output/favicon"),
        path.join(__dirname, "../output/ogp"),
      ];

      for (const dir of outputDirs) {
        try {
          await fs.rmdir(dir, { recursive: true });
          await fs.mkdir(dir, { recursive: true });
        } catch (error) {
          // ディレクトリが存在しない場合は作成
          await fs.mkdir(dir, { recursive: true });
        }
      }

      logSuccess("出力ディレクトリをクリーンアップしました");
    } catch (error) {
      logError("クリーンアップに失敗しました", error as Error);
    }
  });

// エラーハンドリング
program.on("command:*", () => {
  logError(
    "無効なコマンドです。--helpを使用して利用可能なコマンドを確認してください。"
  );
  process.exit(1);
});

// プログラム実行
program.parse();

// コマンドが指定されていない場合はヘルプを表示
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
