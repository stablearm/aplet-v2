import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { howToSchema } from "@/lib/schemas";
import { IncomeCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "محاسبه درآمد تلگرام",
  description: "درآمد بالقوه کانال تلگرام خود را محاسبه کنید. ماشین حساب درآمد از تبلیغات و کمپین عضوگیری.",
};

export default function IncomeCalculatorPage() {
  return (
    <>
      <JsonLd
        data={howToSchema({
          name: "محاسبه درآمد تلگرام",
          description: "درآمد بالقوه کانال تلگرام خود را محاسبه کنید.",
          steps: [
            { name: "تعداد اعضا", text: "تعداد اعضای فعلی کانال خود را وارد کنید." },
            { name: "تعداد پست تبلیغاتی", text: "تعداد پست‌های تبلیغاتی در هفته را مشخص کنید." },
            { name: "قیمت هر پست", text: "قیمت هر پست تبلیغاتی بر اساس تعداد اعضا را وارد کنید." },
          ],
        })}
      />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#3B82F6]/10 text-[#F59E0B]">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">محاسبه درآمد تلگرام</h1>
            <p className="text-sm text-text-secondary">درآمد بالقوه کانال خود را محاسبه کنید</p>
          </div>
        </div>
        <IncomeCalculator />
        <div className="mt-8 text-center">
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع درآمدزایی
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
