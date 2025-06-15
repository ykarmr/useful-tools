import { LogoGenerator } from "./generators/logo-generator";
import { FaviconGenerator } from "./generators/favicon-generator";
import { OgpGenerator } from "./generators/ogp-generator";
import { logInfo, logSuccess, logError } from "./utils";

/**
 * メイン実行関数
 */
async function main() {
  try {
    logInfo("🎨 画像アセット生成ツールを開始します...");

    // コマンドライン引数を解析
    const args = process.argv.slice(2);
    const command = args[0] || "all";

    switch (command) {
      case "logo":
        await generateLogos();
        break;
      case "favicon":
        await generateFavicons();
        break;
      case "ogp":
        await generateOgpImages();
        break;
      case "all":
      default:
        await generateAll();
        break;
    }

    logSuccess("🎉 すべての処理が完了しました！");
  } catch (error) {
    logError("処理中にエラーが発生しました", error as Error);
    process.exit(1);
  }
}

/**
 * ロゴを生成
 */
async function generateLogos(): Promise<void> {
  logInfo("📝 ロゴ生成を開始します...");
  const logoGenerator = new LogoGenerator();
  await logoGenerator.generateAllLogos();
}

/**
 * ファビコンを生成
 */
async function generateFavicons(): Promise<void> {
  logInfo("⭐ ファビコン生成を開始します...");
  const faviconGenerator = new FaviconGenerator();
  await faviconGenerator.generateAllFavicons();
}

/**
 * OGP画像を生成
 */
async function generateOgpImages(): Promise<void> {
  logInfo("🖼️  OGP画像生成を開始します...");
  const ogpGenerator = new OgpGenerator();
  await ogpGenerator.generateAllOgpImages();
}

/**
 * すべての画像アセットを生成
 */
async function generateAll(): Promise<void> {
  await generateLogos();
  await generateFavicons();
  await generateOgpImages();
}

/**
 * 使用方法を表示
 */
function showUsage(): void {
  console.log(`
使用方法:
  npm run dev [command]

コマンド:
  logo     - ロゴのみ生成
  favicon  - ファビコンのみ生成
  ogp      - OGP画像のみ生成
  all      - すべて生成（デフォルト）

例:
  npm run dev
  npm run dev logo
  npm run dev favicon
  npm run dev ogp
  `);
}

// ヘルプが要求された場合
if (process.argv.includes("--help") || process.argv.includes("-h")) {
  showUsage();
  process.exit(0);
}

// メイン関数を実行
if (require.main === module) {
  main();
}

export { LogoGenerator, FaviconGenerator, OgpGenerator };
