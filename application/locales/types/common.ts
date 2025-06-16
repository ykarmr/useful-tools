export interface CommonTranslations {
  siteTitle: string;
  home: string;
  services: string;
  add: string;
  close: string;
  viewAll: string;
  clear: string;
  yes: string;
  no: string;
  openTool: string;
  viewAllTools: string;
  seo: {
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
    titleTemplate: string;
    defaultTitle: string;
    homeTitle: string;
    homeDescription: string;
    homeKeywords: string[];
    ogImageAlt: string;
    twitterCreator: string;
    structuredData: {
      organizationName: string;
      applicationCategory: string;
      operatingSystem: string;
      searchActionDescription: string;
    };
    manifest: {
      name: string;
      shortName: string;
      description: string;
      categories: string[];
    };
  };
  faqTitle: string;
  breadcrumb: {
    home: string;
    services: string;
  };
}
