export interface AboutTranslations {
  title: string;
  description: string;
  keywords: string[];

  // Header
  header: {
    title: string;
    subtitle: string;
  };

  // Trust & Credibility Badge
  trustBadge: {
    title: string;
    description: string;
  };

  // Introduction
  introduction: {
    title: string;
    description: string;
  };

  // Vision & Mission
  vision: {
    title: string;
    visionCard: {
      title: string;
      description: string;
    };
    missionCard: {
      title: string;
      description: string;
    };
  };

  // Development Philosophy
  philosophy: {
    title: string;
    simplicity: {
      title: string;
      description: string;
    };
    userFirst: {
      title: string;
      description: string;
    };
    quality: {
      title: string;
      description: string;
    };
  };

  // Developer Profile
  profile: {
    title: string;
    name: string;
    role: string;
    experience: string;

    experienceSection: {
      title: string;
      medicalSystem: {
        title: string;
        description: string;
      };
      carrierMedia: {
        title: string;
        description: string;
      };
    };

    technicalExpertise: {
      title: string;
      coreTech: {
        title: string;
        items: string[];
      };
      relatedTech: {
        title: string;
        items: string[];
      };
    };

    continuousLearning: {
      title: string;
      description: string;
    };

    trustTransparency: {
      title: string;
      openSource: {
        title: string;
        description: string;
      };
      continuousOperation: {
        title: string;
        description: string;
      };
    };

    githubButton: string;
  };

  // Quality Assurance & Security
  qualitySecurity: {
    title: string;
    qualityManagement: {
      title: string;
      description: string;
    };
    security: {
      title: string;
      description: string;
    };
  };

  // Service Features & Achievements
  serviceFeatures: {
    title: string;
    practicality: {
      title: string;
      description: string;
    };
    userFirst: {
      title: string;
      description: string;
    };
    technicalReliability: {
      title: string;
      description: string;
    };
    privacyProtection: {
      title: string;
      description: string;
    };
  };

  // Technical Implementation
  technicalImplementation: {
    title: string;
    adoptedTech: {
      title: string;
      frontend: {
        title: string;
        items: string[];
      };
      devOps: {
        title: string;
        items: string[];
      };
    };
    designPolicy: {
      title: string;
      performance: {
        title: string;
        items: string[];
      };
      accessibility: {
        title: string;
        items: string[];
      };
    };
  };

  // Continuous Improvement & Future
  continuousImprovement: {
    title: string;
    currentEfforts: {
      title: string;
      items: string[];
    };
    futurePlans: {
      title: string;
      items: string[];
    };
  };

  // Contact & Feedback
  contactFeedback: {
    title: string;
    description: string;
    contactButton: string;
    githubIssuesButton: string;
  };
}
