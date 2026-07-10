import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Target, BarChart3, ArrowLeft, CheckCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "تبلیغات تلگرام",
  description: "راهنمای جامع تبلیغات در تلگرام. انواع تبلیغات، تعرفه، نکات بهینه و ابزارهای مورد نیاز برای تبلیغات مؤثر در تلگرام.",
};

const faqs = [
  { question: "هزینه تبلیغات در تلگرام چقدر است؟", answer: "هزینه تبلیغات در تلگرام بسته به نوع تبلیغ، تعداد مخاطبان کانال و موضوع آن متفاوت است. به طور متوسط بین ۱۰۰ تا ۵۰۰ تومان به ازای هر بازدید هزینه دارد." },
  { question: "آیا تبلیغات در تلگرام مؤثر است؟", answer: "بله، تبلیغات در تلگرام به دلیل هزینه پایین و دسترسی به مخاطبان هدفمند، یکی از مؤثرترین روش‌های تبلیغات دیجیتال در ایران است." },
  { question: "چگونه تبلیغات مؤثری در تلگرام داشته باشم؟", answer: "برای تبلیغات مؤثر، کانال‌های مرتبط با موضوع کسب و کار خود را انتخاب کنید، محتوای جذاب تولید کنید و عملکرد تبلیغات را به طور مستمر تحلیل کنید." },
];

const features = [
  { icon: Target, title: "هدف‌گیری دقیق", description: "مخاطبان خود را بر اساس موضوع کانال، موقعیت جغرافیایی و علایق هدف‌گیری کنید." },
  { icon: BarChart3, title: "تحلیل عملکرد", description: "آمار دقیق از بازدید، تعامل و نرخ تبدیل تبلیغات خود دریافت کنید." },
  { icon: Megaphone, title: "مدیریت کمپین", description: "کمپین‌های تبلیغاتی خود را به صورت متمرکز مدیریت و بهینه‌سازی کنید." },
];

export default function TelegramAdsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/5 px-4 py-1.5 mb-8">
            <Megaphone className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">تبلیغات تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            تبلیغات مؤثر در <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با تبلیغات هدفمند در تلگرام، مخاطبان واقعی جذب کنید و کسب و کار خود را رشد دهید.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
              شروع تبلیغات
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/guides" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 transition-all duration-200">
              راهنما
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 text-[#5B5FEF] mb-5">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <CtaBanner />
        </section>
      </main>
    </>
  );
}
