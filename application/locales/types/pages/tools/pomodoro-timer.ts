import { FAQItem } from "../../faq";

export interface PomodoroTimerTranslations {
  title: string;
  description: string;
  keywords: string[];
  work: string;
  shortBreak: string;
  longBreak: string;
  session: string;
  workTime: string;
  breakTime: string;
  longBreakTime: string;
  completed: string;
  workCompleted: string;
  breakCompleted: string;
  sessionCompleted: string;
  timeForBreak: string;
  timeForWork: string;
  timeForLongBreak: string;
  settings: string;
  workDuration: string;
  shortBreakDuration: string;
  longBreakDuration: string;
  totalSessions: string;
  autoStart: string;
  soundEnabled: string;
  minutes: string;
  applySettings: string;
  closeSettings: string;
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  faqList: FAQItem[];
}
