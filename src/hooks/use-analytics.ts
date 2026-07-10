"use client";

import { useState, useEffect, useCallback } from "react";
import { getAnalyticsSummary, type AnalyticsSummary } from "@/lib/analytics";

export function useAnalytics() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  const refresh = useCallback(() => {
    setSummary(getAnalyticsSummary());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { summary, refresh };
}
