import { home } from "./home";
import { services } from "./services";
import { roulette } from "./roulette";
import { todo } from "./todo";
import { diceRoller } from "./dice-roller";
import { coinFlip } from "./coin-flip";
import { randomNumber } from "./random-number";
import { randomString } from "./random-string";
import { timer } from "./timer";
import { pomodoroTimer } from "./pomodoro-timer";
import { digitalClock } from "./digital-clock";
import { scoreboard } from "./scoreboard";
import { worldClock } from "./world-clock";
import { teamGenerator } from "./team-generator";
import { qrGenerator } from "./qr-generator";
import { calculator } from "./calculator";
import { userAgent } from "./user-agent";
import { ipAddress } from "./ip-address";
import { jsonFormatter } from "./json-formatter";
import { urlEncoder } from "./url-encoder";
import { markdownPreview } from "./markdown-preview";
import type { Translations } from "../types";
import { contact } from "./contact";
import { privacy } from "./privacy";
import { terms } from "./terms";
import { urlAnalyzer } from "./url-analyzer";
import { unitConversion } from "./unit-conversion";
import subnetCalculator from "./subnet-calculator";
import { petAgeConversion } from "./pet-age-conversion";
import { imageConverter } from "./image-converter";
import { ad } from "./ad";
import { common } from "./common";
import { footer } from "./footer";
import { header } from "./header";

const zh: Translations = {
  common,
  header,
  footer,
  ad,
  home,
  services,
  roulette,
  todo,
  diceRoller,
  coinFlip,
  randomNumber,
  randomString,
  timer,
  pomodoroTimer,
  digitalClock,
  scoreboard,
  worldClock,
  teamGenerator,
  qrGenerator,
  calculator,
  userAgent,
  ipAddress,
  jsonFormatter,
  urlEncoder,
  markdownPreview,
  privacy,
  terms,
  contact,
  urlAnalyzer,
  unitConversion,
  subnetCalculator,
  petAgeConversion,
  imageConverter,
};

export default zh;
