import type { Metadata } from "next";
import Link from "next/link";
import { Radio, Users, BarChart3, ArrowLeft, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "کانال تلگرام",
  description: "راهنمای مدیریت حرفه‌ای کانال تلگرام. رشد، درآمدزایی و مدیریت محتوا.",
};

const faqs = [
  { question: "کانال تلگرام چیست؟", answer: "کانال تلگرام ابزاری برای انتشار محتوا به تعداد نامحدود مخاطب است که فقط مدیران امکان انتشار در آن را دارند." },
  { question: "چگونه کانال تلگرام را مدیریت کنیم؟", answer: "با استفاده از ابزارهایی مانند آپلت می‌توانید کانال خود را به صورت حرفه‌ای مدیریت کنید." },
];

const topics = [
  { icon: Users, title: "جذب مخاطب", description: "روش‌های جذب اعضای واقعی و هدفمند.", href: "/telegram-growth/" },
  { icon: BarChart3, title: "تحلیل عملکرد", description: "آمار و تحلیل دقیق عملکرد کانال.", href: "/telegram-analytics/" },
  { icon: Radio, title: "مدیریت محتوا", description: "برنامه‌ریزی و انتشار محتوای با کیفیت.", href: "/telegram-automation/" },
];

export default function TelegramChannelPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/7 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#3B82F6]/5 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
              <Radio className="h-3.5 w-3.5 text-[#5B5FEF]" />
              <span className="text-xs font-semibold text-[#5B5FEF]">کانال تلگرام</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
              مدیریت حرفه‌ای <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">کانال تلگرام</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              کانال تلگرام خود را حرفه‌ای مدیریت کنید و از آن درآمد کسب کنید.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                شروع مدیریت
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/how-it-works" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200">
                نحوه کار
              </Link>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topics.map((topic) => (
              <Link key={topic.title} href={topic.href} className="group rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/25 hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15 text-[#5B5FEF] mb-5 group-hover:scale-110 transition-transform duration-300">
                  <topic.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-2">{topic.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{topic.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 pb-20 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-text-primary mb-8 text-center">سوالات متداول</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-border/40 bg-surface p-6 shadow-sm">
                <h3 className="font-bold text-text-primary mb-2">{faq.question}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 pb-20 max-w-3xl">
          <CtaBanner />
        </section>
      </main>
    </>
  );
}
