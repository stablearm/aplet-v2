export const CAMPAIGN_STATUS = {
  ACTIVE: "active",
  PAUSED: "paused",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  PENDING_PAYMENT: "pending_payment",
} as const;

export const CAMPAIGN_STATUS_LABELS: Record<string, string> = {
  active: "فعال",
  paused: "متوقف",
  completed: "تمام شده",
  cancelled: "لغو شده",
  pending_payment: "در انتظار پرداخت",
};

export const PLATFORM_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  SUSPENDED: "suspended",
} as const;

export const PLATFORM_STATUS_LABELS: Record<string, string> = {
  active: "فعال",
  inactive: "غیرفعال",
  pending: "در انتظار تأیید",
  suspended: "تعلیق شده",
};

export const BOT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PAUSED: "paused",
} as const;

export const BOT_STATUS_LABELS: Record<string, string> = {
  active: "فعال",
  inactive: "غیرفعال",
  paused: "متوقف",
};

export const CONTENT_TOPICS = [
  { value: "politics", label: "سیاسی" },
  { value: "international", label: "بین‌الملل" },
  { value: "economics", label: "اقتصادی" },
  { value: "cryptocurrency", label: "ارز دیجیتال" },
  { value: "technology", label: "فن‌آوری" },
  { value: "science", label: "علمی" },
  { value: "social", label: "اجتماعی" },
] as const;

export const SUBSCRIPTION_TYPES = [
  { value: "one_month", label: "۱ ماهه", price: 480000 },
  { value: "three_months", label: "۳ ماهه", price: 1050000 },
  { value: "six_months", label: "۶ ماهه", price: 2100000 },
  { value: "one_year", label: "۱۲ ماهه", price: 3600000 },
] as const;

export const CAMPAIGN_LIMITS = {
  MIN_TARGET: 1000,
  MAX_TARGET: 100000,
  MIN_BUDGET: 500,
} as const;

export const EARNINGS_RATE = 400; // Toman per member
export const CAMPAIGN_COMMISSION = 100; // Toman per member
export const CAMPAIGN_COST_PER_MEMBER = EARNINGS_RATE + CAMPAIGN_COMMISSION; // 500 Toman

export const MIN_WITHDRAWAL = 1000000; // 1M Toman

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [10, 20, 50, 100],
} as const;

export const MOBILE_NAV_ITEMS = [
  { name: "داشبورد", href: "/workspace/dashboard", icon: "LayoutDashboard" },
  { name: "کمپین‌ها", href: "/workspace/campaigns", icon: "Megaphone" },
  { name: "کیف پول", href: "/workspace/wallet", icon: "Wallet" },
  { name: "اعلانات", href: "/workspace/notifications", icon: "Bell" },
  { name: "بیشتر", href: "/workspace/more", icon: "MoreHorizontal" },
] as const;
