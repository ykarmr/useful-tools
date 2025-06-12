import type { TimerTranslations } from "../types";

export const timer: TimerTranslations = {
  title: "计时器",
  description: "任意时长的倒计时器",
  keywords: ["计时器", "倒计时", "秒表", "时钟"],
  start: "开始",
  pause: "暂停",
  reset: "重置",
  minutes: "分钟",
  seconds: "秒",
  timeUp: "时间到！",
  faqList: [
    {
      q: "最长可以设置多少时间？",
      a: "您可以设置分钟和秒的任意组合。也可以设置数小时的长时间计时器。",
    },
    {
      q: "关闭浏览器后计时器还会继续吗？",
      a: "关闭浏览器标签页会停止计时器。您需要保持标签页打开。",
    },
    {
      q: "会有声音通知吗？",
      a: "时间结束时您会收到浏览器通知。请确保已启用通知功能。",
    },
    {
      q: "在后台运行吗？",
      a: "在查看其他标签页时计时器会继续运行，但如果计算机进入睡眠状态可能会暂停。",
    },
  ],
};

export default timer;
