import type { WorldClockTranslations } from "../types";

export const worldClock: WorldClockTranslations = {
  title: "World Clock",
  description: "View current time in multiple time zones around the world",
  keywords: [
    "world clock",
    "time zones",
    "current time",
    "international time",
    "global clock",
  ],
  addTimezone: "Add Time Zone",
  local: "Local",
  faqList: [
    {
      q: "How do I add a new time zone?",
      a: "Click the 'Add Time Zone' button and select from the list of available time zones. You can add multiple time zones to compare times across different regions.",
    },
    {
      q: "Are the displayed times accurate?",
      a: "The times are based on your device's system time and standard time zone data. They will be accurate as long as your device's time settings are correct.",
    },
    {
      q: "How often does the clock update?",
      a: "The clocks update automatically every second to show the current time in each selected time zone.",
    },
    {
      q: "Can I remove time zones I no longer need?",
      a: "Yes, you can remove any added time zone by clicking the remove button (×) next to each time zone display.",
    },
  ],
};
