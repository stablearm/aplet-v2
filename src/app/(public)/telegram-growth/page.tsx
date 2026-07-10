import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Users, Zap, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "رشد تلگرام",
  description: "روش‌های مؤثر برای رشد کانال تلگرام. جذب اعضای واقعی، افزایش تعامل و رشد پایدار.",
};

const faqs = [
  { question: "چگونه کانال تلگرام را رشد دهیم؟", answer: "با تولید محتوای با کیفیت، تبلیغات هدفمند، همکاری با کانال‌های دیگر و استفاده از ابزارهای رشد مانند آپلت می‌توانید کانال خود را رشد دهید." },
  { question: "سریع‌ترین روش رشد کانال چیست؟", answer: "کمپین عضوگیری هدفمند سریع‌ترین روش رشد است، اما رشد پایدار نیازمند تولید محتوای منظم و تعامل با مخاطبان است." },
];

const methods = [
  { title: "تولید محتوای با کیفیت", description: "محتوای ارزشمند و منظم تولید کنید تا مخاطبان به صورت طبیعی جذب شوند.", color: "from-[#5B5FEF]/10 to-[#3B82F6]/10" },
  { title: "تبلیغات هدفمند", description: "در کانال‌های مرتبط با موضوع خود تبلیغ کنید تا مخاطبان با کیفیت جذب شوند.", color: "from-[#3B82F6]/10 to-[#10B981]/10" },
  { title: "کمپین عضوگیری", description: "از پلتفرم‌هایی مانند آپلت برای اجرای کمپین‌های هدفمند عضوگیری استفاده کنید.", color: "from-[#10B981]/10 to-[#059669]/10" },
  { title: "همکاری متقابل", description: "با کانال‌های مکمل همکاری کنید و مخاطبان یکدیگر را به اشتراک بگذارید.", color: "from-[#F59E0B]/10 to-[#D97706]/10" },
];

export default function TelegramGrowthPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-4 py-1.5 mb-8">
            <TrendingUp className="h-3.5 w-3.5 text-[#10B981]" />
            <span className="text-xs font-semibold text-[#10B981]">رشد تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            رشد پایدار کانال <span className="bg-gradient-to-l from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با روش‌های مؤثر و پایدار، کانال تلگرام خود را رشد دهید و مخاطبان واقعی جذب کنید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع رشد
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {methods.map((method) => (
              <div key={method.title} className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
                <h3 className="font-bold text-text-primary mb-2">{method.title}</h3>
                <p className="text-sm text-text-secondary">{method.description}</p>
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
