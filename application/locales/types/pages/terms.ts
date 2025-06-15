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
