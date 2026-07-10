import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowLeft } from "lucide-react";
import { RoiCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "محاسبه ROI",
  description: "بازگشت سرمایه تبلیغات تلگرام خود را محاسبه و بهینه‌سازی کنید.",
};

export default function RoiCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EF4444]/10 to-[#F59E0B]/10 text-[#EF4444]">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary">محاسبه ROI</h1>
          <p className="text-sm text-text-secondary">بازگشت سرمایه تبلیغات خود را محاسبه کنید</p>
        </div>
      </div>
      <RoiCalculator />
      <div className="mt-8 text-center">
        <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          بهبود ROI
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
