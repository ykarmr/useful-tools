import { PomodoroTimerTranslations } from "@/locales/types/pages/tools/pomodoro-timer";

export const pomodoroTimer: PomodoroTimerTranslations = {
  title: "番茄钟",
  description: "使用番茄工作法时间管理工具提升生产力",
  keywords: ["番茄钟", "计时器", "生产力", "专注", "时间管理"],
  work: "工作",
  shortBreak: "短暂休息",
  longBreak: "长时间休息",
  session: "第 {current} 次，共 {total} 次",
  workTime: "工作时间！",
  breakTime: "休息时间！",
  longBreakTime: "长时间休息时间！",
  completed: "番茄钟会话已完成！",
  workCompleted: "工作会话已完成！",
  breakCompleted: "休息时间结束！",
  sessionCompleted: "会话已完成！",
  timeForBreak: "休息时间到了！",
  timeForWork: "该回去工作了！",
  timeForLongBreak: "长时间休息时间到了！",
  settings: "设置",
  workDuration: "工作时长",
  shortBreakDuration: "短暂休息时长",
  longBreakDuration: "长时间休息时长",
  totalSessions: "总会话数",
  autoStart: "自动开始",
  soundEnabled: "声音通知",
  minutes: "分钟",
  applySettings: "应用设置",
  closeSettings: "关闭设置",
  howToUse: {
    title: "如何使用番茄钟",
    steps: [
      "按下「开始」按钮开始工作会话",
      "专注工作25分钟",
      "当计时器结束时休息5分钟",
      "完成4个会话后，休息15分钟",
      "重复这个循环来提升生产力",
    ],
  },
  features: {
    title: "功能特点",
    items: [
      "标准番茄钟间隔（25分钟工作，5分钟短休息，15分钟长休息）",
      "可自定义的时间设置和会话数量",
      "自动开始功能，流畅的会话转换",
      "可视化进度跟踪",
      "本地存储保存设置和会话状态",
      "音频通知（可开启/关闭）",
    ],
  },
  faqList: [
    {
      q: "什么是番茄工作法？",
      a: "番茄工作法是一种时间管理方法，使用25分钟的专注工作时间，然后进行5分钟的短暂休息。完成4个会话后，进行15分钟的长时间休息。它有效提高专注力并减少疲劳。",
    },
    {
      q: "可以自定义时间设置吗？",
      a: "是的，您可以通过设置按钮自定义工作时间、休息时间和总会话数。您的更改会自动保存。",
    },
    {
      q: "如果中断会话会怎样？",
      a: "您可以使用暂停按钮暂停计时器。也可以使用重置按钮重新开始当前会话。",
    },
    {
      q: "有音频通知吗？",
      a: "是的，您可以在设置中启用或禁用音频通知。浏览器音频通知会在会话结束时提醒您。",
    },
    {
      q: "什么是自动开始功能？",
      a: "启用自动开始后，下一个工作会话将在休息时间结束后自动开始，无需手动启动每个会话。",
    },
    {
      q: "我的数据会保存吗？",
      a: "是的，您的设置和会话进度会自动保存到浏览器的本地存储中。即使关闭页面，您的偏好设置也会保留。",
    },
  ],
};

export default pomodoroTimer;
