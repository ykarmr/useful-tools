export interface CommonTranslations {
  siteTitle: string
  home: string
  roulette: string
  todo: string
  services: string
  learnMore: string
  explore: string
  tryNow: string
  add: string
  delete: string
  edit: string
  save: string
  cancel: string
  close: string
  loading: string
  getStarted: string
  viewAll: string
  copy: string
  copied: string
  clear: string
  reset: string
  generate: string
  download: string
  upload: string
  import: string
  export: string
  settings: string
  help: string
  about: string
  contact: string
  privacy: string
  terms: string
  error: string
  success: string
  warning: string
  info: string
  confirm: string
  yes: string
  no: string
  ok: string
  retry: string
  refresh: string
  search: string
  filter: string
  sort: string
  previous: string
  next: string
  first: string
  last: string
  page: string
  of: string
  total: string
  selected: string
  all: string
  none: string
  new: string
  recent: string
  popular: string
  featured: string
  recommended: string
  openTool: string
  viewAllTools: string
  seo: {
    siteTitle: string
    siteDescription: string
    keywords: string[]
    titleTemplate: string
    defaultTitle: string
    homeTitle: string
    homeDescription: string
    homeKeywords: string[]
    ogImageAlt: string
    twitterCreator: string
    verification: {
      google: string
      yandex: string
      yahoo: string
    }
    structuredData: {
      organizationName: string
      applicationCategory: string
      operatingSystem: string
      ratingValue: string
      reviewCount: string
      searchActionDescription: string
    }
    manifest: {
      name: string
      shortName: string
      description: string
      categories: string[]
    }
    robots: {
      disallow: string[]
      sitemap: string
      host: string
    }
  }
}

export interface HeaderTranslations {
  logo: string
  toggleMenu: string
}

export interface FooterTranslations {
  services: string
  support: string
  legal: string
  helpCenter: string
  contact: string
  privacyPolicy: string
  termsOfService: string
  copyright: string
  description: string
}

export interface AdTranslations {
  advertisement: string
  premiumTools: {
    title: string
    description: string
    cta: string
  }
  boostProductivity: {
    title: string
    description: string
    cta: string
  }
  newFeature: {
    title: string
    description: string
    cta: string
  }
}
