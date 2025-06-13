import { DigitalClockTranslations } from "@/locales/types/pages/tools/digital-clock";

export const digitalClock: DigitalClockTranslations = {
  title: "Digital Clock",
  description: "Beautiful digital clock with customizable display options",
  keywords: [
    "digital clock",
    "customizable clock",
    "online clock",
    "time display",
    "24-hour format",
    "seconds display",
    "date display",
  ],
  settings: "Display Settings",
  format24Hour: "24-hour format",
  showSeconds: "Show seconds",
  showDate: "Show date",
  faqList: [
    {
      q: "How do I change the clock display settings?",
      a: "Use the checkboxes in the Display Settings section to toggle 24-hour format, seconds display, and date display on or off.",
    },
    {
      q: "Is the time accurate?",
      a: "The time is based on your device's system time, so it will be accurate as long as your device's time settings are correct.",
    },
    {
      q: "What's the difference between 24-hour and 12-hour format?",
      a: "24-hour format displays time from 0:00 to 23:59, while 12-hour format uses AM/PM and displays from 1:00 to 12:59.",
    },
    {
      q: "Does the clock update automatically?",
      a: "Yes, the time is automatically updated every second.",
    },
    {
      q: "Can I display time for other time zones?",
      a: "Currently, only your device's local time is displayed. For other time zones, please use the World Clock feature.",
    },
  ],
};
