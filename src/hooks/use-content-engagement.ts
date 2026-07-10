"use client";

import { useEffect, useRef } from "react";
import { trackContentEngagement } from "@/lib/analytics";

export function useContentEngagement(slug: string) {
  const startTime = useRef<number>(Date.now());
  const maxScroll = useRef<number>(0);

  useEffect(() => {
    startTime.current = Date.now();
    maxScroll.current = 0;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const depth = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;
      if (depth > maxScroll.current) {
        maxScroll.current = depth;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
      const scrollDepth = Math.round(maxScroll.current);
      if (timeSpent > 3) {
        trackContentEngagement(slug, timeSpent, scrollDepth);
      }
    };
  }, [slug]);
}
