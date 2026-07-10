import type { Metadata } from "next";
import Link from "next/link";
import { Users, Shield, TrendingUp, ArrowLeft, CheckCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "افزایش عضو تلگرام",
  description: "افزایش اعضای واقعی و هدفمند کانال تلگرام با کمپین عضوگیری. جذب مخاطبان واقعی با هزینه مناسب.",
};

const faqs = [
  { question: "اعضای واقعی چه تفاوتی با اعضای فیک دارند؟", answer: "اعضای واقعی کاربران فعال تلگرام هستند که تعامل دارند و ارزش واقعی ایجاد می‌کنند. اعضای فیک حساب‌های جعلی هستند که هیچ تعاملی ندارند." },
  { question: "هزینه جذب هر عضو چقدر است؟", answer: "هزینه جذب هر عضو واقعی از طریق کمپین عضوگیری آپلت ۵۰۰ تومان است که ۴۰۰ تومان آن به ناشر و ۱۰۰ تومان کارمزد است." },
  { question: "آیا اعضای جذب شده باقی می‌مانند؟", answer: "بله، اعضای واقعی که از طریق کمپین هدفمند جذب شده‌اند معمولاً باقی می‌مانند و تعامل دارند." },
];

const benefits = [
  { icon: Users, title: "اعضای واقعی", description: "فقط اعضای واقعی و فعال تلگرام جذب می‌شوند." },
  { icon: Shield, title: "تضمین کیفیت", description: "سیستم اعتبارسنجی دقیق برای اطمینان از کیفیت اعضا." },
  { icon: TrendingUp, title: "رشد پایدار", description: "رشد طبیعی و پایدار بدون آسیب به اعتبار کانال." },
];

export default function TelegramMemberServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-4 py-1.5 mb-8">
            <Users className="h-3.5 w-3.5 text-[#10B981]" />
            <span className="text-xs font-semibold text-[#10B981]">افزایش عضو تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            افزایش <span className="bg-gradient-to-l from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">اعضای واقعی</span> تلگرام
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با کمپین عضوگیری هدفمند، مخاطبان واقعی و با کیفیت جذب کانال خود کنید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع عضوگیری
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/10 text-[#10B981] mb-5">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-text-primary mb-8 text-center">چرا آپلت؟</h2>
          <div className="space-y-3">
            {["اعضای واقعی و فعال", "هزینه شفاف و مناسب", "سیستم اعتبارسنجی دقیق", "رشد پایدار و طبیعی", "تحلیل عملکرد لحظه‌ای"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-surface border border-border/50 p-4">
                <CheckCircle className="h-5 w-5 text-[#10B981] shrink-0" />
                <span className="text-sm text-text-secondary">{item}</span>
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
