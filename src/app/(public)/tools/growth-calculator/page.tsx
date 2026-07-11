import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { GrowthCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "محاسبه رشد کانال تلگرام",
  description: "رشد آینده کانال تلگرام خود را پیش‌بینی و برنامه‌ریزی کنید. ماشین حساب رشد اعضای کانال با در نظر گرفتن نرخ رشد ارگانیک و پولی.",
};

const faqs = [
  { question: "رشد کانال تلگرام چیست؟", answer: "رشد کانال تلگرام به افزایش تعداد اعضای کانال در بازه زمانی مشخص گفته می‌شود. رشد می‌تواند ارگانیک (طبیعی) یا پولی (تبلیغاتی) باشد." },
  { question: "چگونه نرخ رشد را محاسبه کنیم؟", answer: "نرخ رشد = ((تعداد اعضای فعلی - تعداد اعضای قبلی) / تعداد اعضای قبلی) × ۱۰۰. این فرمول درصد رشد را در یک بازه زمانی مشخص نشان می‌دهد." },
  { question: "نرخ رشد خوب در تلگرام چقدر است؟", answer: "نرخ رشد خوب بسته به اندازه کانال متفاوت است. کانال‌های کوچک معمولاً ۱۰-۳۰٪ ماهانه و کانال‌های بزرگ ۲-۵٪ ماهانه رشد دارند." },
  { question: "چگونه رشد کانال را افزایش دهیم؟", answer: "تولید محتوای با کیفیت، تبلیغات هدفمند، همکاری با کانال‌های دیگر و استفاده از کمپین‌های عضوگیری مؤثرترین روش‌ها هستند." },
  { question: "آیا رشد پولی بهتر از رشد ارگانیک است؟", answer: "ترکیب هر دو بهترین نتیجه را می‌دهد. رشد ارگانیک پایدارتر و رشد پولی سریع‌تر است. استفاده از کمپین عضوگیری برای تقویت رشد ارگانیک توصیه می‌شود." },
];

export default function GrowthCalculatorPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#10B981]/10 text-[#5B5FEF]">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">محاسبه رشد کانال تلگرام</h1>
            <p className="text-sm text-text-secondary">رشد آینده کانال خود را پیش‌بینی کنید</p>
          </div>
        </div>

        <GrowthCalculator />

        {/* What is Growth */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">رشد کانال تلگرام چیست؟</h2>
          <div className="text-sm text-text-secondary leading-relaxed space-y-3">
            <p>
              رشد کانال تلگرام به افزایش تعداد اعضای کانال در بازه زمانی مشخص گفته می‌شود. این رشد می‌تواند از طریق روش‌های ارگانیک (طبیعی) مانند تولید محتوای با کیفیت و اشتراک‌گذاری، یا از طریق روش‌های پولی مانند تبلیغات و کمپین‌های عضوگیری حاصل شود.
            </p>
            <p>
              پیش‌بینی رشد کانال به شما کمک می‌کند اهداف واقع‌بینانه تعیین کنید، بودجه‌بندی مناسب انجام دهید و استراتژی رشد خود را برنامه‌ریزی کنید. بدون پیش‌بینی، ممکن است انتظارات غیرواقعی داشته باشید یا منابع خود را نادرست تخصیص دهید.
            </p>
          </div>
        </section>

        {/* Formula */}
        <section className="mt-12 rounded-2xl border border-[#5B5FEF]/15 bg-gradient-to-br from-[#5B5FEF]/5 to-[#10B981]/3 p-6">
          <h2 className="text-lg font-extrabold text-text-primary mb-3">فرمول محاسبه نرخ رشد</h2>
          <div className="rounded-xl bg-surface border border-border/30 p-4 mb-4">
            <p className="text-sm font-mono text-text-primary text-center">
              نرخ رشد = ((تعداد فعلی - تعداد قبلی) / تعداد قبلی) × ۱۰۰
            </p>
          </div>
          <p className="text-sm text-text-secondary">
            <strong>مثال:</strong> اگر کانال شما از ۱,۰۰۰ به ۱,۲۰۰ عضو رسیده باشد، نرخ رشد = ((۱۲۰۰ - ۱۰۰۰) / ۱۰۰۰) × ۱۰۰ = ۲۰٪
          </p>
        </section>

        {/* Benchmarks */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">نرخ رشد خوب چقدر است؟</h2>
          <div className="space-y-3">
            {[
              { range: "کانال کوچک (زیر ۵,۰۰۰ عضو)", rate: "۱۰-۳۰٪ ماهانه", note: "کانال‌های تازه‌کار رشد سریع‌تری دارند" },
              { range: "کانال متوسط (۵,۰۰۰-۵۰,۰۰۰ عضو)", rate: "۵-۱۵٪ ماهانه", note: "رشد کندتر اما پایدارتر" },
              { range: "کانال بزرگ (بالای ۵۰,۰۰۰ عضو)", rate: "۲-۵٪ ماهانه", note: "رشد کندتر به دلیل اشباع بازار" },
            ].map((item) => (
              <div key={item.range} className="rounded-xl bg-surface border border-border/40 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-text-primary">{item.range}</span>
                  <span className="text-sm font-bold text-[#5B5FEF]">{item.rate}</span>
                </div>
                <p className="text-xs text-text-secondary">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#F59E0B]" />
            نکات بهبود رشد
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "محتوای منظم تولید کنید", text: "انتشار منظم و با کیفیت محتوا مهم‌ترین عامل رشد ارگانیک است." },
              { title: "از کمپین عضوگیری استفاده کنید", text: "کمپین‌های هدفمند عضوگیری رشد سریع و واقعی را تضمین می‌کنند." },
              { title: "با کانال‌های دیگر همکاری کنید", text: "همکاری متقابل با کانال‌های مکمل باعث رشد دوطرفه می‌شود." },
              { title: "عملکرد را رصد کنید", text: "آمار رشد را به طور منظم بررسی و استراتژی را بهینه‌سازی کنید." },
            ].map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <h3 className="font-bold text-text-primary mb-1 text-sm">{tip.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">سوالات متداول</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border/40 bg-surface p-5 shadow-sm">
                <h3 className="font-bold text-text-primary mb-1 text-sm">{faq.question}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            تسریع رشد
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
