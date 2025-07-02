import { AgeCalculatorTranslations } from "@/locales/types";

export const ageCalculator: AgeCalculatorTranslations = {
  title: "Age Calculator",
  subtitle: "Calculate precise age and elapsed days easily",
  description:
    "A free tool to accurately calculate your current age and elapsed days from your birth date. Display detailed information down to years, months, weeks, days, hours, minutes, and seconds, plus calculate days until your next birthday.",
  keywords: [
    "age calculator",
    "age calculation",
    "elapsed days calculator",
    "birth date calculator",
    "birthday calculator",
    "years calculator",
    "months calculator",
    "days calculator",
    "time calculator",
    "precise age calculation",
  ],
  howToUse: {
    title: "How to Use Age Calculator",
    steps: [
      "Select or enter your birth date",
      "Set the reference date (defaults to today)",
      "Click the 'Calculate' button to display results",
      "View detailed age information in years, months, weeks, days, hours, minutes, and seconds",
    ],
  },
  features: {
    title: "Key Features",
    items: [
      "Accurate age calculation (years, months, weeks, days, hours, minutes, seconds)",
      "Calculate elapsed time from birth date to any specified date",
      "Countdown to next birthday",
      "Real-time update functionality",
      "Clear and easy-to-understand result display",
      "Intuitive interface with multilingual support",
    ],
  },
  birthdateLabel: "Birth Date",
  birthdatePlaceholder: "Please select your birth date",
  targetDateLabel: "Reference Date",
  targetDatePlaceholder: "Please select reference date",
  calculateButton: "Calculate Age",
  clearButton: "Clear",
  resultPlaceholder: "Enter your birth date to calculate age",
  resultTitle: "Calculation Results",
  currentAge: "Current Age",
  daysLived: "Days Lived",
  yearsOld: "years",
  monthsOld: "months",
  weeksOld: "weeks",
  daysOld: "days",
  hoursOld: "hours",
  minutesOld: "minutes",
  secondsOld: "seconds",
  nextBirthday: "Next Birthday",
  daysUntilBirthday: "Days Until Next Birthday",
  nextBirthdayAge: "years old",
  faqList: [
    {
      q: "How accurate is the age calculation?",
      a: "This tool calculates accurate age based on date calculations. It can calculate in detail down to years, months, days, hours, minutes, and seconds.",
    },
    {
      q: "Are leap years considered?",
      a: "Yes, leap years are accurately considered in the calculation. Age calculations for people born on February 29th are also handled correctly.",
    },
    {
      q: "Can I calculate for past or future dates, not just current age?",
      a: "By changing the reference date, you can calculate age for specific past or future dates as well.",
    },
    {
      q: "How are days until next birthday calculated?",
      a: "The system automatically calculates the number of days from the current date to the next occurring birthday and displays it in countdown format.",
    },
    {
      q: "Are time zones considered?",
      a: "Calculations are based on your browser's local time. If you need calculations for different time zones, please adjust the reference date accordingly.",
    },
  ],
};
