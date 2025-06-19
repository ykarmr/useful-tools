import { PomodoroTimerTranslations } from "@/locales/types/pages/tools/pomodoro-timer";

export const pomodoroTimer: PomodoroTimerTranslations = {
  title: "Pomodoro Timer",
  description:
    "Boost productivity with the Pomodoro Technique time management tool",
  keywords: ["pomodoro", "timer", "productivity", "focus", "time management"],
  work: "Work",
  shortBreak: "Short Break",
  longBreak: "Long Break",
  session: "Session {current} of {total}",
  workTime: "Work Time!",
  breakTime: "Break Time!",
  longBreakTime: "Long Break Time!",
  completed: "Pomodoro Session Completed!",
  workCompleted: "Work Session Completed!",
  breakCompleted: "Break Time Ended!",
  sessionCompleted: "Session Completed!",
  timeForBreak: "Time for a break!",
  timeForWork: "Time to get back to work!",
  timeForLongBreak: "Time for a long break!",
  settings: "Settings",
  workDuration: "Work Duration",
  shortBreakDuration: "Short Break Duration",
  longBreakDuration: "Long Break Duration",
  totalSessions: "Total Sessions",
  autoStart: "Auto Start",
  soundEnabled: "Sound Notifications",
  minutes: "minutes",
  applySettings: "Apply Settings",
  closeSettings: "Close Settings",
  howToUse: {
    title: "How to Use Pomodoro Timer",
    steps: [
      "Press the 'Start' button to begin a work session",
      "Focus on your work for 25 minutes",
      "Take a 5-minute short break when the timer ends",
      "After 4 sessions, take a 15-minute long break",
      "Repeat this cycle to boost your productivity",
    ],
  },
  features: {
    title: "Features",
    items: [
      "Standard Pomodoro intervals (25min work, 5min short break, 15min long break)",
      "Customizable time settings and session count",
      "Auto-start feature for smooth session transitions",
      "Visual progress tracking",
      "Local storage for settings and session state persistence",
      "Audio notifications (toggle on/off)",
    ],
  },
  faqList: [
    {
      q: "What is the Pomodoro Technique?",
      a: "The Pomodoro Technique is a time management method that uses 25-minute focused work sessions followed by 5-minute short breaks. After 4 sessions, you take a longer 15-minute break. It's effective for improving focus and reducing fatigue.",
    },
    {
      q: "Can I customize the time settings?",
      a: "Yes, you can customize work time, break time, and total sessions through the settings button. Your changes are automatically saved.",
    },
    {
      q: "What happens if I interrupt a session?",
      a: "You can pause the timer with the pause button. You can also reset the current session to start over from the beginning using the reset button.",
    },
    {
      q: "Does it have audio notifications?",
      a: "Yes, you can enable or disable audio notifications in the settings. Browser audio notifications will alert you when sessions end.",
    },
    {
      q: "What is the auto-start feature?",
      a: "When auto-start is enabled, the next work session will automatically begin after the break time ends, eliminating the need to manually start each session.",
    },
    {
      q: "Is my data saved?",
      a: "Yes, your settings and session progress are automatically saved to your browser's local storage. Your preferences will be retained even after closing the page.",
    },
  ],
};
