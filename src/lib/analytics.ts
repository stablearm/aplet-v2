const ANALYTICS_KEY = "aplet_analytics";

export interface AnalyticsEvent {
  type: string;
  path: string;
  timestamp: number;
  metadata?: Record<string, string | number>;
}

function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  try {
    const events = getStoredEvents();
    events.push(event);
    // Keep only last 1000 events
    if (events.length > 1000) events.splice(0, events.length - 1000);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(events));
  } catch {
    // localStorage may be full or unavailable
  }
}

export function trackPageView(path: string) {
  storeEvent({
    type: "page_view",
    path,
    timestamp: Date.now(),
  });
}

export function trackCTAClick(location: string) {
  storeEvent({
    type: "cta_click",
    path: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: Date.now(),
    metadata: { location },
  });
}

export function trackSearch(query: string) {
  storeEvent({
    type: "search",
    path: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: Date.now(),
    metadata: { query },
  });
}

export function trackToolUse(tool: string, inputs?: Record<string, number>) {
  storeEvent({
    type: "tool_use",
    path: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: Date.now(),
    metadata: { tool, ...inputs },
  });
}

export function trackContentEngagement(slug: string, timeSpent: number, scrollDepth: number) {
  storeEvent({
    type: "content_engagement",
    path: `/blog/${slug}/`,
    timestamp: Date.now(),
    metadata: { slug, timeSpent, scrollDepth },
  });
}

export function trackInternalLinkClick(href: string, source: string) {
  storeEvent({
    type: "internal_link",
    path: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: Date.now(),
    metadata: { href, source },
  });
}

// Analytics summary
export interface AnalyticsSummary {
  totalEvents: number;
  pageViews: number;
  ctaClicks: number;
  searches: number;
  toolUses: number;
  topPages: Array<{ path: string; count: number }>;
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getStoredEvents();
  const pageViews = events.filter((e) => e.type === "page_view").length;
  const ctaClicks = events.filter((e) => e.type === "cta_click").length;
  const searches = events.filter((e) => e.type === "search").length;
  const toolUses = events.filter((e) => e.type === "tool_use").length;

  // Count page views by path
  const pageCounts: Record<string, number> = {};
  events
    .filter((e) => e.type === "page_view")
    .forEach((e) => {
      pageCounts[e.path] = (pageCounts[e.path] || 0) + 1;
    });

  const topPages = Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalEvents: events.length,
    pageViews,
    ctaClicks,
    searches,
    toolUses,
    topPages,
  };
}

export function clearAnalytics() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ANALYTICS_KEY);
}
