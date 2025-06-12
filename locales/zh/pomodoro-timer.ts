import type { PomodoroTimerTranslations } from "../types";

export const pomodoroTimer: PomodoroTimerTranslations = {
  title: "番茄钟",
  description: "使用番茄工作法提升生产力",
  keywords: ["番茄钟", "计时器", "生产力", "专注", "时间管理"],
  work: "工作",
  shortBreak: "短暂休息",
  longBreak: "长时间休息",
  session: "第 {current} 次，共 {total} 次",
  workTime: "工作时间！",
  breakTime: "休息时间！",
  longBreakTime: "长时间休息时间！",
  completed: "番茄钟会话已完成！",
  faqList: [
    {
      q: "什么是番茄工作法？",
      a: "番茄工作法是一种时间管理方法，使用25分钟的专注工作时间，然后进行5分钟的短暂休息。完成4个周期后，进行15分钟的长时间休息。它有效提高专注力并减少疲劳。",
    },
    {
      q: "可以自定义时间设置吗？",
      a: "当前版本使用标准的番茄钟时间间隔（25分钟工作，5分钟短休息，15分钟长休息），无法自定义。",
    },
    {
      q: "如果中断会话会怎样？",
      a: "如果您中断会话，可以使用重置按钮重新开始。根据番茄工作法，被中断的工作时间被认为是无效的。",
    },
    {
      q: "有音频通知吗？",
      a: "当前版本不包含音频通知。会话转换通过屏幕上的视觉通知进行提示。",
    },
  ],
};

export default pomodoroTimer;
