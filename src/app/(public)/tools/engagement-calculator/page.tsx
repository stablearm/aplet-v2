import type { Metadata } from "next";
import Link from "next/link";
import { Percent, ArrowLeft } from "lucide-react";
import { EngagementCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "محاسبه نرخ تعامل",
  description: "نرخ تعامل کانال تلگرام خود را اندازه‌گیری و بهینه‌سازی کنید.",
};

export default function EngagementCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/10 text-[#10B981]">
          <Percent className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary">محاسبه نرخ تعامل</h1>
          <p className="text-sm text-text-secondary">نرخ تعامل کانال خود را اندازه‌گیری کنید</p>
        </div>
      </div>
      <EngagementCalculator />
      <div className="mt-8 text-center">
        <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          بهبود تعامل
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
