import { PomodoroTimerTranslations } from "../types/pages/tools/pomodoro-timer";

export const pomodoroTimer: PomodoroTimerTranslations = {
  title: "Pomodoro Timer",
  description: "Boost productivity with the Pomodoro Technique",
  keywords: ["pomodoro", "timer", "productivity", "focus", "time management"],
  work: "Work",
  shortBreak: "Short Break",
  longBreak: "Long Break",
  session: "Session {current} of {total}",
  workTime: "Work Time!",
  breakTime: "Break Time!",
  longBreakTime: "Long Break Time!",
  completed: "Pomodoro Session Completed!",
  faqList: [
    {
      q: "What is the Pomodoro Technique?",
      a: "The Pomodoro Technique is a time management method that uses 25-minute focused work sessions followed by 5-minute short breaks. After 4 sessions, you take a longer 15-minute break. It's effective for improving focus and reducing fatigue.",
    },
    {
      q: "Can I customize the time settings?",
      a: "The current version uses the standard Pomodoro intervals (25 minutes work, 5 minutes short break, 15 minutes long break) and cannot be customized.",
    },
    {
      q: "What happens if I interrupt a session?",
      a: "If you interrupt a session, you can use the reset button to start over. According to the Pomodoro Technique, interrupted work sessions are considered invalid.",
    },
    {
      q: "Does it have audio notifications?",
      a: "The current version doesn't include audio notifications. Session transitions are indicated through visual notifications on the screen.",
    },
  ],
};
