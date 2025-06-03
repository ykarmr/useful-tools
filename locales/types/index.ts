export * from "./common";
export * from "./pages";
export * from "./tools";

import type {
  CommonTranslations,
  HeaderTranslations,
  FooterTranslations,
  AdTranslations,
} from "./common";
import type {
  ContactTranslations,
  HomeTranslations,
  PrivacyTranslations,
  ServicesTranslations,
  TermsTranslations,
} from "./pages";
import type {
  RouletteTranslations,
  TodoTranslations,
  DiceRollerTranslations,
  CoinFlipTranslations,
  RandomNumberTranslations,
  RandomStringTranslations,
  TimerTranslations,
  PomodoroTimerTranslations,
  DigitalClockTranslations,
  ScoreboardTranslations,
  WorldClockTranslations,
  TeamGeneratorTranslations,
  QrGeneratorTranslations,
  CalculatorTranslations,
  UserAgentTranslations,
  IpAddressTranslations,
  JsonFormatterTranslations,
  UrlEncoderTranslations,
  MarkdownPreviewTranslations,
} from "./tools";

export interface Translations {
  common: CommonTranslations;
  header: HeaderTranslations;
  footer: FooterTranslations;
  ad: AdTranslations;
  home: HomeTranslations;
  services: ServicesTranslations;
  roulette: RouletteTranslations;
  todo: TodoTranslations;
  diceRoller: DiceRollerTranslations;
  coinFlip: CoinFlipTranslations;
  randomNumber: RandomNumberTranslations;
  randomString: RandomStringTranslations;
  timer: TimerTranslations;
  pomodoroTimer: PomodoroTimerTranslations;
  digitalClock: DigitalClockTranslations;
  scoreboard: ScoreboardTranslations;
  worldClock: WorldClockTranslations;
  teamGenerator: TeamGeneratorTranslations;
  qrGenerator: QrGeneratorTranslations;
  calculator: CalculatorTranslations;
  userAgent: UserAgentTranslations;
  ipAddress: IpAddressTranslations;
  jsonFormatter: JsonFormatterTranslations;
  urlEncoder: UrlEncoderTranslations;
  markdownPreview: MarkdownPreviewTranslations;
  privacy: PrivacyTranslations;
  contact: ContactTranslations;
  terms: TermsTranslations;
}
