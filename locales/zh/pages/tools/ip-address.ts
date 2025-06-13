import { IpAddressTranslations } from "@/locales/types/pages/tools/ip-address";

export const ipAddress: IpAddressTranslations = {
  title: "IP地址查询",
  description: "查看您的IP地址和网络信息",
  keywords: [
    "IP地址",
    "位置",
    "公共IP",
    "互联网服务提供商",
    "ISP",
    "ASN",
    "地理位置",
  ],
  location: "位置",
  country: "国家",
  region: "地区",
  city: "城市",
  timezone: "时区",
  isp: "互联网服务提供商",
  coordinates: "坐标",
  retry: "重试",
  fetchingInfo: "正在获取IP信息...",
  noInfoFound: "未找到IP信息",
  failedToFetch: "获取IP信息失败",
  refreshInfo: "刷新信息",
  securityNote: "安全提示",
  securityDescription:
    "您的IP地址和位置信息对您访问的网站是可见的。请考虑使用VPN以增强隐私保护。",
  ipInfo: "IP信息",
  yourIP: "您的公共IP地址",
  postal: "邮政编码",
  security: "安全",
  faqList: [
    {
      q: "什么是IP地址？",
      a: "IP地址是分配给连接到互联网的设备的唯一数字标识符。它允许设备通过互联网相互通信。",
    },
    {
      q: "公共IP地址和私有IP地址有什么区别？",
      a: "公共IP地址可以从互联网直接访问，而私有IP地址用于本地网络（如您的家庭Wi-Fi）内部，无法从互联网直接访问。",
    },
    {
      q: "为什么可以从我的IP地址看到我的位置？",
      a: "IP地址由互联网服务提供商（ISP）分配给特定的地理区域，这使得可以根据IP地址进行大致的位置估算。",
    },
    {
      q: "位置信息的准确性如何？",
      a: "位置精度因情况而异。在国家和地区级别通常比较准确，但在城市或街道级别可能不太精确。",
    },
    {
      q: "如何隐藏我的IP地址？",
      a: "您可以使用VPN（虚拟专用网络）或代理服务器来掩盖您的真实IP地址，增强在线隐私保护。",
    },
    {
      q: "我的IP地址会改变吗？",
      a: "大多数ISP分配动态IP地址，这意味着当您重新连接到互联网或经过一定时间后，您的IP地址可能会改变。",
    },
  ],
};
