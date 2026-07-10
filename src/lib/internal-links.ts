export interface LinkTarget {
  href: string;
  label: string;
  description?: string;
}

export const INTERNAL_LINKS: Record<string, LinkTarget> = {
  // Product pages
  "آپلت": { href: "/", label: "آپلت", description: "سیستم عامل کسب و کار تلگرام" },
  "aplet": { href: "/", label: "آپلت", description: "سیستم عامل کسب و کار تلگرام" },

  // Topic hubs
  "تبلیغات تلگرام": { href: "/telegram-ads/", label: "تبلیغات تلگرام" },
  "تبلیغات در تلگرام": { href: "/telegram-ads/", label: "تبلیغات در تلگرام" },
  "بازاریابی تلگرام": { href: "/telegram-marketing/", label: "بازاریابی تلگرام" },
  "بازاریابی در تلگرام": { href: "/telegram-marketing/", label: "بازاریابی در تلگرام" },
  "رشد تلگرام": { href: "/telegram-growth/", label: "رشد تلگرام" },
  "رشد کانال": { href: "/telegram-growth/", label: "رشد کانال" },
  "کسب درآمد از تلگرام": { href: "/telegram-monetization/", label: "کسب درآمد از تلگرام" },
  "درآمدزایی از تلگرام": { href: "/telegram-monetization/", label: "درآمدزایی از تلگرام" },
  "بات تلگرام": { href: "/telegram-bot/", label: "بات تلگرام" },
  "بات‌های تلگرام": { href: "/telegram-bot/", label: "بات‌های تلگرام" },
  "تحلیل تلگرام": { href: "/telegram-analytics/", label: "تحلیل تلگرام" },
  "اتوماسیون تلگرام": { href: "/telegram-automation/", label: "اتوماسیون تلگرام" },
  "کانال تلگرام": { href: "/telegram-channel/", label: "کانال تلگرام" },
  "مدیریت کانال": { href: "/telegram-channel/", label: "مدیریت کانال" },

  // Landing pages
  "افزایش عضو": { href: "/telegram-member-service/", label: "افزایش عضو تلگرام" },
  "خرید عضو": { href: "/telegram-member-service/", label: "خرید عضو تلگرام" },
  "عضوگیری": { href: "/telegram-member-service/", label: "عضوگیری تلگرام" },
  "جذب عضو": { href: "/telegram-member-service/", label: "جذب عضو تلگرام" },

  // Tools
  "محاسبه درآمد": { href: "/tools/income-calculator/", label: "محاسبه درآمد" },
  "محاسبه CPM": { href: "/tools/cpm-calculator/", label: "محاسبه CPM" },
  "محاسبه نرخ تعامل": { href: "/tools/engagement-calculator/", label: "محاسبه نرخ تعامل" },
  "محاسبه رشد": { href: "/tools/growth-calculator/", label: "محاسبه رشد" },
  "محاسبه ROI": { href: "/tools/roi-calculator/", label: "محاسبه ROI" },

  // Guides
  "راهنمای بازاریابی": { href: "/guides/complete-telegram-marketing/", label: "راهنمای جامع بازاریابی" },
  "راهنمای تبلیغات": { href: "/guides/complete-telegram-advertising/", label: "راهنمای جامع تبلیغات" },
  "راهنمای درآمدزایی": { href: "/guides/complete-telegram-monetization/", label: "راهنمای جامع درآمدزایی" },
  "راهنمای رشد": { href: "/guides/complete-telegram-growth/", label: "راهنمای جامع رشد" },
  "راهنمای بات": { href: "/guides/complete-telegram-bot/", label: "راهنمای جامع بات" },
  "راهنمای کسب و کار": { href: "/guides/complete-telegram-business/", label: "راهنمای جامع کسب و کار" },

  // Content sections
  "بلاگ": { href: "/blog/", label: "بلاگ آپلت" },
  "واژه‌نامه": { href: "/glossary/", label: "واژه‌نامه تلگرام" },
  "ابزارها": { href: "/tools/", label: "ابزارهای رایگان" },
  "منابع": { href: "/resources/", label: "منابع تلگرام" },
  "راهنماها": { href: "/guides/", label: "راهنماهای تلگرام" },
};

// Find matching keywords in text (longest match first)
export function findLinkableKeywords(text: string): Array<{ keyword: string; start: number; end: number; target: LinkTarget }> {
  const matches: Array<{ keyword: string; start: number; end: number; target: LinkTarget }> = [];
  const sortedKeywords = Object.keys(INTERNAL_LINKS).sort((a, b) => b.length - a.length);

  for (const keyword of sortedKeywords) {
    let startIndex = 0;
    while (startIndex < text.length) {
      const index = text.indexOf(keyword, startIndex);
      if (index === -1) break;

      // Check if this position is already covered by a longer match
      const isCovered = matches.some(
        (m) => index >= m.start && index < m.end
      );
      if (!isCovered) {
        matches.push({
          keyword,
          start: index,
          end: index + keyword.length,
          target: INTERNAL_LINKS[keyword],
        });
      }
      startIndex = index + 1;
    }
  }

  return matches.sort((a, b) => a.start - b.start);
}

// Related content based on tags and category
export interface ContentItem {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  category?: string;
  type: "blog" | "guide" | "glossary" | "resource";
}

export function findRelatedContent(
  current: ContentItem,
  allContent: ContentItem[],
  limit = 5
): ContentItem[] {
  return allContent
    .filter((item) => item.slug !== current.slug || item.type !== current.type)
    .map((item) => {
      let score = 0;
      // Same category = +3
      if (item.category && current.category && item.category === current.category) {
        score += 3;
      }
      // Shared tags = +1 per tag
      if (item.tags && current.tags) {
        score += item.tags.filter((t) => current.tags!.includes(t)).length;
      }
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
