import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Users, BarChart3, ArrowLeft, BookOpen } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "بازاریابی تلگرام",
  description: "راهنمای جامع بازاریابی در تلگرام. استراتژی محتوا، جذب مخاطب، تبلیغات و تحلیل عملکرد برای رشد کسب و کار شما.",
};

const faqs = [
  { question: "بازاریابی تلگرام چیست؟", answer: "بازاریابی تلگرام مجموعه‌ای از استراتژی‌ها و تکنیک‌هایی است که کسب و کارها برای جذب مخاطب و افزایش فروش در پیام‌رسان تلگرام استفاده می‌کنند." },
  { question: "آیا بازاریابی در تلگرام رایگان است؟", answer: "شروع بازاریابی ارگانیک در تلگرام رایگان است، اما برای نتایج سریع‌تر می‌توان از تبلیغات پولی و کمپین‌های عضوگیری استفاده کرد." },
  { question: "چگونه در تلگرام مشتری جذب کنیم؟", answer: "با تولید محتوای با کیفیت، تعامل مستمر با مخاطبان، استفاده از تبلیغات هدفمند و بهینه‌سازی کانال خود می‌توانید مشتری جذب کنید." },
];

const topics = [
  { icon: BookOpen, title: "استراتژی محتوا", description: "تولید محتوای ارزشمند و هدفمند برای جذب و حفظ مخاطبان.", href: "/guides/" },
  { icon: Users, title: "جذب مخاطب", description: "روش‌های ارگانیک و پولی برای افزایش اعضای کانال.", href: "/blog/how-to-buy-telegram-members/" },
  { icon: TrendingUp, title: "رشد کانال", description: "تکنیک‌های رشد پایدار و طبیعی کانال تلگرام.", href: "/telegram-growth/" },
  { icon: BarChart3, title: "تحلیل عملکرد", description: "اندازه‌گیری و بهینه‌سازی عملکرد بازاریابی.", href: "/telegram-analytics/" },
];

export default function TelegramMarketingPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/5 px-4 py-1.5 mb-8">
            <TrendingUp className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">بازاریابی تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            بازاریابی حرفه‌ای در <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با استراتژی‌های مؤثر بازاریابی در تلگرام، کسب و کار خود را متحول کنید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع کنید
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {topics.map((topic) => (
              <Link key={topic.title} href={topic.href} className="group rounded-2xl border border-border/50 bg-surface p-6 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 text-[#5B5FEF] shrink-0">
                    <topic.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-1">{topic.title}</h3>
                    <p className="text-sm text-text-secondary">{topic.description}</p>
                  </div>
                </div>
              </Link>
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
