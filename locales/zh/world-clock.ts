import { WorldClockTranslations } from "../types/pages/tools/world-clock";

export const worldClock: WorldClockTranslations = {
  title: "世界时钟",
  description: "显示世界各地时间的时钟",
  keywords: ["世界时钟", "时区", "当前时间", "国际时间", "全球时钟"],
  addTimezone: "添加时区",
  local: "本地",
  faqList: [
    {
      q: "如何添加新的时区？",
      a: '点击"添加时区"按钮，然后从可用时区列表中选择。您可以添加多个时区来比较不同地区的时间。',
    },
    {
      q: "显示的时间准确吗？",
      a: "时间基于您设备的系统时间和标准时区数据。只要您设备的时间设置正确，显示的时间就是准确的。",
    },
    {
      q: "时钟多久更新一次？",
      a: "时钟每秒自动更新，以显示每个选定时区的当前时间。",
    },
    {
      q: "我可以删除不需要的时区吗？",
      a: "是的，您可以通过点击每个时区显示旁边的删除按钮（×）来删除任何已添加的时区。",
    },
  ],
};
