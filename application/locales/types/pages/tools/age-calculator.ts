export interface AgeCalculatorTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  howToUse: {
    title: string;
    steps: string[];
  };
  features: {
    title: string;
    items: string[];
  };
  birthdateLabel: string;
  birthdatePlaceholder: string;
  targetDateLabel: string;
  targetDatePlaceholder: string;
  calculateButton: string;
  clearButton: string;
  resultPlaceholder: string;
  resultTitle: string;
  currentAge: string;
  daysLived: string;
  yearsOld: string;
  monthsOld: string;
  weeksOld: string;
  daysOld: string;
  hoursOld: string;
  minutesOld: string;
  secondsOld: string;
  nextBirthday: string;
  daysUntilBirthday: string;
  nextBirthdayAge: string;
  faqList: Array<{
    q: string;
    a: string;
  }>;
}
