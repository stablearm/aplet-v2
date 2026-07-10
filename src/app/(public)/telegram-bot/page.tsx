import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Zap, Settings, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "بات تلگرام",
  description: "راهنمای بات‌های تلگرام: ساخت، مدیریت و استفاده از بات‌ها برای خودکارسازی کسب و کار.",
};

const faqs = [
  { question: "بات تلگرام چیست؟", answer: "بات تلگرام یک برنامه خودکار است که در تلگرام کار می‌کند و می‌تواند وظایف مختلفی مانند انتشار محتوا، پاسخگویی خودکار و مدیریت کانال را انجام دهد." },
  { question: "آیا ساخت بات تلگرام دشوار است؟", answer: "با استفاده از پلتفرم‌هایی مانند آپلت، ساخت و مدیریت بات تلگرام بسیار ساده است و نیازی به دانش فنی ندارد." },
];

const features = [
  { icon: Bot, title: "بات محتوا", description: "بات‌های هوشمند برای انتشار محتوای خودکار و منظم در کانال." },
  { icon: Zap, title: "خودکارسازی", description: "خودکارسازی فرآیندهای تکراری مانند پاسخگویی و انتشار محتوا." },
  { icon: Settings, title: "مدیریت آسان", description: "مدیریت و تنظیم بات‌ها بدون نیاز به دانش فنی." },
];

export default function TelegramBotPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-4 py-1.5 mb-8">
            <Bot className="h-3.5 w-3.5 text-[#3B82F6]" />
            <span className="text-xs font-semibold text-[#3B82F6]">بات تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            بات‌های <span className="bg-gradient-to-l from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با بات‌های هوشمند تلگرام، کسب و کار خود را خودکار کنید و در زمان صرفه‌جویی کنید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            ایجاد بات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6]/10 to-[#10B981]/10 text-[#3B82F6] mb-5">
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
