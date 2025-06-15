/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  trailingSlash: false,
  // 静的最適化の強化
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // パフォーマンス最適化（安定した設定のみ）
  // experimental: {
  //   optimizeCss: true,
  //   optimizeServerReact: true,
  // },
};

export default nextConfig;
