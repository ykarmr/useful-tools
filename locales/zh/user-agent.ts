import type { UserAgentTranslations } from "../types/tools";

export const userAgent: UserAgentTranslations = {
  title: "用户代理检测",
  description: "检测和分析浏览器用户代理信息",
  keywords: [
    "用户代理",
    "浏览器信息",
    "系统信息",
    "设备详情",
    "用户代理字符串",
  ],
  browser: "浏览器",
  os: "操作系统",
  device: "设备",
  platform: "平台",
  mobile: "移动设备",
  fullString: "完整用户代理字符串",
  capabilities: "功能",
  supported: "支持",
  notSupported: "不支持",
  deviceInfo: "设备信息",
  faqList: [
    {
      q: "什么是用户代理字符串？",
      a: "用户代理字符串是浏览器发送给网络服务器的识别信息，包括浏览器类型、版本、操作系统等详细信息。",
    },
    {
      q: "这些信息会影响隐私吗？",
      a: "用户代理字符串是所有网站都可以访问的公开信息。虽然不包含个人身份信息，但可能用于指纹识别。",
    },
    {
      q: "为什么浏览器有时会报告虚假信息？",
      a: "出于兼容性考虑，许多浏览器会伪装成其他浏览器。这有助于确保网站在不同浏览器上正常工作。",
    },
    {
      q: "移动浏览器和桌面浏览器有什么区别？",
      a: "移动浏览器通常发送不同的用户代理字符串，以接收针对屏幕大小和触控界面优化的内容。",
    },
  ],
};
