import type { DigitalClockTranslations } from "../types/tools";

export const digitalClock: DigitalClockTranslations = {
  title: "数字时钟",
  description: "显示当前时间的数字时钟",
  keywords: ["数字时钟", "时间", "时钟", "24小时制", "秒数", "日期"],
  showSeconds: "显示秒数",
  showDate: "显示日期",
  format24Hour: "24小时制",
  settings: "显示设置",
  faqList: [
    {
      q: "如何更改时钟显示设置？",
      a: "在显示设置部分，您可以勾选或取消勾选24小时制、显示秒数和显示日期的选项。",
    },
    {
      q: "时钟显示的时间准确吗？",
      a: "时钟基于您设备的系统时间，因此如果您的设备时间设置正确，时钟显示也会准确。",
    },
    {
      q: "24小时制和12小时制有什么区别？",
      a: "24小时制从0:00到23:59显示时间，而12小时制使用AM/PM格式，从1:00到12:59显示时间。",
    },
    {
      q: "时钟会自动更新吗？",
      a: "是的，时钟每秒自动更新一次。",
    },
    {
      q: "可以显示其他时区的时间吗？",
      a: "目前只能显示您设备的本地时间。要查看其他时区的时间，请使用世界时钟功能。",
    },
  ],
};
