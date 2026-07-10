import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Clock, Bot, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "اتوماسیون تلگرام",
  description: "خودکارسازی فرآیندهای تلگرام با بات‌ها و ابزارهای هوشمند. صرفه‌جویی در زمان و افزایش بهره‌وری.",
};

const faqs = [
  { question: "اتوماسیون تلگرام چیست؟", answer: "اتوماسیون تلگرام استفاده از ابزارها و بات‌ها برای خودکارسازی فرآیندهای تکراری مانند انتشار محتوا، پاسخگویی و مدیریت کانال است." },
  { question: "آیا اتوماسیون تلگرام قانونی است؟", answer: "بله، استفاده از بات‌های رسمی تلگرام برای خودکارسازی کاملاً قانونی و مجاز است." },
];

const features = [
  { icon: Bot, title: "بات محتوا", description: "انتشار خودکار محتوا در زمان‌بندی مشخص." },
  { icon: Clock, title: "زمان‌بندی پست", description: "برنامه‌ریزی انتشار پست‌ها در آینده." },
  { icon: Zap, title: "پاسخگویی خودکار", description: "پاسخ خودکار به پیام‌ها و سوالات رایج." },
];

export default function TelegramAutomationPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5 px-4 py-1.5 mb-8">
            <Zap className="h-3.5 w-3.5 text-[#F59E0B]" />
            <span className="text-xs font-semibold text-[#F59E0B]">اتوماسیون تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            اتوماسیون <span className="bg-gradient-to-l from-[#F59E0B] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            فرآیندهای تکراری تلگرام خود را خودکار کنید و در زمان صرفه‌جویی کنید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع اتوماسیون
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#3B82F6]/10 text-[#F59E0B] mb-5">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-text-primary mb-8 text-center">سوالات متداول</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
                <h3 className="font-bold text-text-primary mb-2">{faq.question}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <CtaBanner />
        </section>
      </main>
    </>
  );
}
