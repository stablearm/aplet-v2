import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, TrendingUp, Users, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "تحلیل تلگرام",
  description: "ابزارها و روش‌های تحلیل عملکرد کانال تلگرام. آمار بازدید، تعامل و رشد مخاطبان.",
};

const faqs = [
  { question: "چرا تحلیل تلگرام مهم است؟", answer: "تحلیل عملکرد کانال به شما کمک می‌کند نقاط قوت و ضعف خود را شناسایی کنید و استراتژی خود را بهینه‌سازی کنید." },
  { question: "چه معیارهایی را باید تحلیل کنیم؟", answer: "تعداد اعضا، نرخ تعامل، نرخ ریزش، زمان بازدید و نرخ رشد مهم‌ترین معیارها هستند." },
];

const metrics = [
  { title: "تعداد اعضا", description: "رشد تعداد اعضای کانال و نرخ ریزش.", icon: Users },
  { title: "نرخ تعامل", description: "درصد مخاطبانی که با محتوا تعامل دارند.", icon: TrendingUp },
  { title: "عملکرد محتوا", description: "تحلیل عملکرد هر پست و نوع محتوا.", icon: BarChart3 },
];

export default function TelegramAnalyticsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-4 py-1.5 mb-8">
            <BarChart3 className="h-3.5 w-3.5 text-[#3B82F6]" />
            <span className="text-xs font-semibold text-[#3B82F6]">تحلیل تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            تحلیل <span className="bg-gradient-to-l from-[#3B82F6] to-[#5B5FEF] bg-clip-text text-transparent">عملکرد تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با تحلیل دقیق عملکرد کانال، استراتژی خود را بهینه‌سازی و نتایج را بهبود دهید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع تحلیل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {metrics.map((metric) => (
              <div key={metric.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6]/10 to-[#5B5FEF]/10 text-[#3B82F6] mb-5">
                  <metric.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{metric.title}</h3>
                <p className="text-sm text-text-secondary">{metric.description}</p>
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
