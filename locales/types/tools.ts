export interface RouletteTranslations {
  title: string;
  description: string;
  keywords: string[];
  addItems: string;
  enterOption: string;
  currentItems: string;
  noItemsAdded: string;
  addItemsToStart: string;
  spinWheel: string;
  spinning: string;
  reset: string;
  winner: string;
  itemsCount: string;
  enabledCount: string;
  removeItem: string;
  disableItem: string;
  enableItem: string;
  disabled: string;
  needMoreItems: string;
  defaultItems: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  winnerZone: string;
  landingArea: string;
  segmentsLandInZone: string;
  landedInZone: string;
  addItemsInstruction: string;
  addItemLabel: string;
}

export interface TodoTranslations {
  title: string;
  description: string;
  keywords: string[];
  addNewTask: string;
  whatNeedsToBeDone: string;
  priority: string;
  low: string;
  medium: string;
  high: string;
  dueDate: string;
  addTask: string;
  all: string;
  active: string;
  completed: string;
  activeCount: string;
  noCompletedTasks: string;
  noActiveTasks: string;
  noTasks: string;
  addTaskToGetStarted: string;
  markAsIncomplete: string;
  markAsComplete: string;
  saveEdit: string;
  cancelEdit: string;
  editTask: string;
  deleteTask: string;
  statistics: string;
  totalTasks: string;
  progress: string;
  overdue: string;
}

export interface DiceRollerTranslations {
  title: string;
  description: string;
  keywords: string[];
  sides: string;
  roll: string;
  result: string;
}

export interface CoinFlipTranslations {
  title: string;
  description: string;
  keywords: string[];
  flip: string;
  heads: string;
  tails: string;
  flipping: string;
}

export interface RandomNumberTranslations {
  title: string;
  description: string;
  keywords: string[];
  min: string;
  max: string;
  generate: string;
}

export interface RandomStringTranslations {
  title: string;
  description: string;
  keywords: string[];
  length: string;
  includeNumbers: string;
  includeSymbols: string;
  generate: string;
  result: string;
}

export interface TimerTranslations {
  title: string;
  description: string;
  keywords: string[];
  minutes: string;
  seconds: string;
  start: string;
  pause: string;
  reset: string;
  timeUp: string;
}

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
}

export interface DigitalClockTranslations {
  title: string;
  description: string;
  keywords: string[];
  settings: string;
  format24Hour: string;
  showSeconds: string;
  showDate: string;
}

export interface ScoreboardTranslations {
  title: string;
  description: string;
  keywords: string[];
  teamName: string;
  addTeam: string;
  resetScores: string;
  winner: string;
  tied: string;
  defaultTeamA: string;
  defaultTeamB: string;
}

export interface WorldClockTranslations {
  title: string;
  description: string;
  keywords: string[];
  addTimezone: string;
  local: string;
}

export interface TeamGeneratorTranslations {
  title: string;
  description: string;
  keywords: string[];
  addPlayer: string;
  playerName: string;
  teamSize: string;
  generateTeams: string;
  players: string;
  teams: string;
  noPlayers: string;
  notEnoughPlayers: string;
  defaultTeamName: string;
  duplicatePlayerError: string;
  confirmClearAll: string;
  generating: string;
  resetTeams: string;
  clearAll: string;
  teamGenerationInfo: string;
  teamsOfPlayers: string;
  remainingPlayersDistributed: string;
  failedToGenerate: string;
  playersUnit: string;
}

export interface QrGeneratorTranslations {
  title: string;
  description: string;
  keywords: string[];
  result: string;
  download: string;
  text: string;
  placeholder: string;
  size: string;
  generate: string;
}

export interface CalculatorTranslations {
  title: string;
  description: string;
  keywords: string[];
}

export interface UserAgentTranslations {
  title: string;
  description: string;
  keywords: string[];
  browser: string;
  os: string;
  device: string;
  platform: string;
  mobile: string;
  fullString: string;
  capabilities: string;
  supported: string;
  notSupported: string;
  deviceInfo: string;
}

export interface IpAddressTranslations {
  title: string;
  description: string;
  keywords: string[];
  location: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  coordinates: string;
  isp: string;
  retry: string;
  ipInfo: string;
  yourIP: string;
  postal: string;
  fetchingInfo: string;
  noInfoFound: string;
  failedToFetch: string;
  security: string;
  securityNote: string;
  securityDescription: string;
  refreshInfo: string;
}

export interface JsonFormatterTranslations {
  title: string;
  description: string;
  keywords: string[];
  input: string;
  output: string;
  format: string;
  minify: string;
  invalidJson: string;
  indentSize: string;
  uploadFile: string;
  placeholder: string;
  statistics: string;
  lines: string;
  characters: string;
  size: string;
  objects: string;
  arrays: string;
  examples: string;
  basicObject: string;
  objectWithArray: string;
  download: string;
}

export interface UrlEncoderTranslations {
  title: string;
  description: string;
  keywords: string[];
  encode: string;
  decode: string;
  switch: string;
  originalUrl: string;
  encodedUrl: string;
  enterUrl: string;
  enterEncodedUrl: string;
  examples: string;
  encodingExample: string;
  specialCharacters: string;
  inputLabel: string;
  outputLabel: string;
  spaceToPercent: string;
  decodedUrl: string;
  invalidInput: string;
}

export interface MarkdownPreviewTranslations {
  title: string;
  description: string;
  keywords: string[];
  preview: string;
  clear: string;
  copy: string;
  copied: string;
  wordCount: string;
  lineCount: string;
  writeHere: string;
  noPreview: string;
  examples: string;
  headings: string;
  lists: string;
  links: string;
  code: string;
  tables: string;
  blockquotes: string;
  images: string;
  emphasis: string;
  horizontalRule: string;
  exampleHeading: string;
  exampleList: string;
  exampleLink: string;
  exampleCode: string;
  exampleTable: string;
  exampleQuote: string;
  markdownGuide: string;
  headingsDesc: string;
  emphasisDesc: string;
  listsDesc: string;
  linksDesc: string;
  imagesDesc: string;
  codeDesc: string;
  blockquotesDesc: string;
  tablesDesc: string;
  horizontalRuleDesc: string;
  characterCount: string;
  confirmClear: string;
}
