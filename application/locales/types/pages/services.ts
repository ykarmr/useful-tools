export interface ServicesTranslations {
  title: string;
  description: string;
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
    network: {
      title: string;
      description: string;
    };
    textContent: {
      title: string;
      description: string;
    };
    converter: {
      title: string;
      description: string;
    };
    health: {
      title: string;
      description: string;
    };
    code: {
      title: string;
      description: string;
    };
  };
  // Hero section
  heroSection: {
    badge: string;
    stats: {
      tools: string;
      categories: string;
      free: string;
      toolsLabel: string;
      categoriesLabel: string;
      freeLabel: string;
    };
  };
  // Category header
  categoryHeader: {
    categoryLabel: string;
  };
  // Tool cards
  toolCard: {
    numberPrefix: string;
  };
  // Call to action
  cta: {
    title: string;
    subtitle: string;
    features: {
      secure: string;
      fast: string;
      easyToUse: string;
    };
  };
}
