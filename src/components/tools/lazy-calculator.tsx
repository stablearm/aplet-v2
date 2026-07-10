"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all calculator components for code splitting
const IncomeCalculator = dynamic(() => import("./calculators/income-calculator"), {
  loading: () => <CalculatorSkeleton />,
  ssr: false,
});

const CpmCalculator = dynamic(() => import("./calculators/cpm-calculator"), {
  loading: () => <CalculatorSkeleton />,
  ssr: false,
});

const EngagementCalculator = dynamic(() => import("./calculators/engagement-calculator"), {
  loading: () => <CalculatorSkeleton />,
  ssr: false,
});

const GrowthCalculator = dynamic(() => import("./calculators/growth-calculator"), {
  loading: () => <CalculatorSkeleton />,
  ssr: false,
});

const RoiCalculator = dynamic(() => import("./calculators/roi-calculator"), {
  loading: () => <CalculatorSkeleton />,
  ssr: false,
});

const PostFrequencyCalculator = dynamic(() => import("./calculators/post-frequency-calculator"), {
  loading: () => <CalculatorSkeleton />,
  ssr: false,
});

function CalculatorSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-2xl" />
    </div>
  );
}

export {
  IncomeCalculator,
  CpmCalculator,
  EngagementCalculator,
  GrowthCalculator,
  RoiCalculator,
  PostFrequencyCalculator,
};
