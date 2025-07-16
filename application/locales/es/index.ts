import { home } from "./pages/home";
import { services } from "./pages/services";
import { roulette } from "./pages/tools/roulette";
import { todo } from "./pages/tools/todo";
import { diceRoller } from "./pages/tools/dice-roller";
import { coinFlip } from "./pages/tools/coin-flip";
import { randomNumber } from "./pages/tools/random-number";
import { randomString } from "./pages/tools/random-string";
import { timer } from "./pages/tools/timer";
import { pomodoroTimer } from "./pages/tools/pomodoro-timer";
import { digitalClock } from "./pages/tools/digital-clock";
import { scoreboard } from "./pages/tools/scoreboard";
import { worldClock } from "./pages/tools/world-clock";
import { teamGenerator } from "./pages/tools/team-generator";
import { qrGenerator } from "./pages/tools/qr-generator";
import { calculator } from "./pages/tools/calculator";
import { userAgent } from "./pages/tools/user-agent";
import { ipAddress } from "./pages/tools/ip-address";
import { jsonFormatter } from "./pages/tools/json-formatter";
import { urlEncoder } from "./pages/tools/url-encoder";
import { markdownPreview } from "./pages/tools/markdown-preview";
import type { Translations } from "../types";
import { contact } from "./pages/contact";
import { privacy } from "./pages/privacy";
import { terms } from "./pages/terms";
import { urlAnalyzer } from "./pages/tools/url-analyzer";
import { unitConversion } from "./pages/tools/unit-conversion";
import subnetCalculator from "./pages/tools/subnet-calculator";
import { petAgeConversion } from "./pages/tools/pet-age-conversion";
import { imageConverter } from "./pages/tools/image-converter";
import { colorPalette } from "./pages/tools/color-palette";
import { textStatistics } from "./pages/tools/text-statistics";
import { bmiCalculator } from "./pages/tools/bmi-calculator";
import { htmlEscape } from "./pages/tools/html-escape";
import { pixelArtEditor } from "./pages/tools/pixel-art-editor";
import { dataConverter } from "./pages/tools/data-converter";
import { baseConverter } from "./pages/tools/base-converter";
import idGeneratorEs from "./pages/tools/id-generator";
import { ageCalculator } from "./pages/tools/age-calculator";
import { flexboxPlayground } from "./pages/tools/flexbox-playground";
import { gridPlayground } from "./pages/tools/grid-playground";
import { mermaidGenerator } from "./pages/tools/mermaidGenerator";
import { chartGenerator } from "./pages/tools/chart-generator";
import { ad } from "./ad";
import { common } from "./common";
import { footer } from "./footer";
import { header } from "./header";
import { about } from "./pages/about";

const es: Translations = {
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
  colorPalette,
  textStatistics,
  bmiCalculator,
  htmlEscape,
  pixelArtEditor,
  dataConverter,
  baseConverter,
  idGenerator: idGeneratorEs,
  ageCalculator,
  flexboxPlayground,
  gridPlayground,
  mermaidGenerator,
  chartGenerator,
  about,
};

export default es;
