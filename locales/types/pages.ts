export interface HomeTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  tryRoulette: string;
  manageTasks: string;
  chooseTool: string;
  chooseToolDescription: string;
  rouletteDescription: string;
  todoDescription: string;
  readyToStart: string;
  readyToStartDescription: string;
  startUsingTools: string;
  popularTools: string;
  allTools: string;
  featuredTools: string;
  utilityTools: string;
  getStarted: string;
}

export interface PrivacyTranslations {
  title: string;
  description: string;
  keywords: string[];
  lastUpdated: string;
  introduction: string;
  sections: {
    informationCollection: { title: string; content: string };
    howWeUse: { title: string; content: string };
    dataSharing: { title: string; content: string };
    cookies: { title: string; content: string };
    dataSecurity: { title: string; content: string };
    yourRights: { title: string; content: string };
    contact: { title: string; content: string };
  };
}

export interface TermsTranslations {
  title: string;
  lastUpdated: string;
  introduction: string;
  description: string;
  keywords: string[];
  sections: {
    acceptance: { title: string; content: string };
    useOfService: { title: string; content: string };
    intellectualProperty: { title: string; content: string };
    disclaimer: { title: string; content: string };
    limitation: { title: string; content: string };
    termination: { title: string; content: string };
    changes: { title: string; content: string };
    contact: { title: string; content: string };
  };
}

export interface ContactTranslations {
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  form: {
    name: string;
    namePlaceholder: string;
    nameRequired: string;
    email: string;
    emailPlaceholder: string;
    emailRequired: string;
    emailInvalid: string;
    message: string;
    messagePlaceholder: string;
    messageRequired: string;
    messageMinLength: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
}

export interface ServicesTranslations {
  title: string;
  subtitle: string;
  keywords: string[];
  categories: {
    productivity: {
      title: string;
      description: string;
    };
    random: {
      title: string;
      description: string;
    };
    time: {
      title: string;
      description: string;
    };
    utility: {
      title: string;
      description: string;
    };
    textContent: {
      title: string;
      description: string;
    };
  };
  tools: {
    roulette: {
      title: string;
      description: string;
    };
    todo: {
      title: string;
      description: string;
    };
    calculator: {
      title: string;
      description: string;
    };
    diceRoller: {
      title: string;
      description: string;
    };
    coinFlip: {
      title: string;
      description: string;
    };
    randomNumber: {
      title: string;
      description: string;
    };
    randomString: {
      title: string;
      description: string;
    };
    timer: {
      title: string;
      description: string;
    };
    pomodoroTimer: {
      title: string;
      description: string;
    };
    digitalClock: {
      title: string;
      description: string;
    };
    scoreboard: {
      title: string;
      description: string;
    };
    worldClock: {
      title: string;
      description: string;
    };
    teamGenerator: {
      title: string;
      description: string;
    };
    qrGenerator: {
      title: string;
      description: string;
    };
    userAgent: {
      title: string;
      description: string;
    };
    ipAddress: {
      title: string;
      description: string;
    };
    jsonFormatter: {
      title: string;
      description: string;
    };
    urlEncoder: {
      title: string;
      description: string;
    };
    urlAnalyzer: {
      title: string;
      description: string;
    };
    markdownPreview: {
      title: string;
      description: string;
    };
    unitConversion: {
      title: string;
      description: string;
    };
    subnetCalculator: {
      title: string;
      description: string;
    };
  };
}
