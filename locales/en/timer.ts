import type { TimerTranslations } from "../types";

export const timer: TimerTranslations = {
  title: "Timer",
  description: "Countdown timer for any duration",
  keywords: ["timer", "countdown", "stopwatch", "clock"],
  minutes: "Minutes",
  seconds: "Seconds",
  start: "Start",
  pause: "Pause",
  reset: "Reset",
  timeUp: "Time's Up!",
  faqList: [
    {
      q: "What's the maximum time I can set?",
      a: "You can set any combination of minutes and seconds. Multi-hour long timers are also possible.",
    },
    {
      q: "Does the timer continue if I close the browser?",
      a: "The timer stops if you close the browser tab. You need to keep the tab open.",
    },
    {
      q: "Will I get an audio notification?",
      a: "You'll receive a browser notification when time is up. Make sure notifications are enabled.",
    },
    {
      q: "Does it work in the background?",
      a: "The timer continues running while viewing other tabs, but may pause if your computer goes to sleep.",
    },
  ],
};
