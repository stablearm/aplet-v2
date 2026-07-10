export const ROUTES = {
  // Public
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  features: "/features",
  pricing: "/pricing",
  howItWorks: "/how-it-works",
  publishers: "/publishers",
  advertisers: "/advertisers",
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  faq: "/faq",
  about: "/about",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",

  // Error
  error401: "/401",
  error403: "/403",
  error404: "/404",
  error500: "/500",

  // Workspace
  workspace: {
    dashboard: "/workspace/dashboard",

    campaigns: {
      list: "/workspace/campaigns",
      create: "/workspace/campaigns/new",
      detail: (id: string) => `/workspace/campaigns/${id}`,
      edit: (id: string) => `/workspace/campaigns/${id}/edit`,
      members: (id: string) => `/workspace/campaigns/${id}/members`,
      analytics: (id: string) => `/workspace/campaigns/${id}/analytics`,
    },

    platforms: {
      list: "/workspace/platforms",
      create: "/workspace/platforms/new",
      detail: (id: string) => `/workspace/platforms/${id}`,
      analytics: (id: string) => `/workspace/platforms/${id}/analytics`,
      campaigns: (id: string) => `/workspace/platforms/${id}/campaigns`,
      revenue: (id: string) => `/workspace/platforms/${id}/revenue`,
    },

    bots: {
      list: "/workspace/bots",
      create: "/workspace/bots/new",
      detail: (id: string) => `/workspace/bots/${id}`,
      content: (id: string) => `/workspace/bots/${id}/content`,
      campaigns: (id: string) => `/workspace/bots/${id}/campaigns`,
      downloads: (id: string) => `/workspace/bots/${id}/downloads`,
    },

    marketplace: {
      home: "/workspace/marketplace",
      search: "/workspace/marketplace/search",
      categories: "/workspace/marketplace/categories",
      publisher: (id: string) => `/workspace/marketplace/publishers/${id}`,
      orders: "/workspace/marketplace/orders",
      favorites: "/workspace/marketplace/favorites",
    },

    wallet: {
      overview: "/workspace/wallet",
      deposit: "/workspace/wallet/deposit",
      withdraw: "/workspace/wallet/withdraw",
      transactions: "/workspace/wallet/transactions",
      history: "/workspace/wallet/history",
    },

    revenue: {
      overview: "/workspace/revenue",
      daily: "/workspace/revenue/daily",
      monthly: "/workspace/revenue/monthly",
      campaigns: "/workspace/revenue/campaigns",
      platforms: "/workspace/revenue/platforms",
    },

    analytics: {
      overview: "/workspace/analytics",
      growth: "/workspace/analytics/growth",
      campaigns: "/workspace/analytics/campaigns",
      platforms: "/workspace/analytics/platforms",
      audience: "/workspace/analytics/audience",
      revenue: "/workspace/analytics/revenue",
    },

    subscription: {
      overview: "/workspace/subscription",
      plans: "/workspace/subscription/plans",
      billing: "/workspace/subscription/billing",
      invoices: "/workspace/subscription/invoices",
    },

    settings: {
      overview: "/workspace/settings",
      security: "/workspace/settings/security",
      notifications: "/workspace/settings/notifications",
      team: "/workspace/settings/team",
      telegram: "/workspace/settings/telegram",
      api: "/workspace/settings/api",
      sessions: "/workspace/settings/sessions",
    },

    notifications: "/workspace/notifications",
    more: "/workspace/more",
  },
} as const;
