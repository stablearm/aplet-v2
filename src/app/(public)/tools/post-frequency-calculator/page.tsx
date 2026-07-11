import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { PostFrequencyCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "تعداد پست مناسب تلگرام",
  description: "تعداد بهینه پست در هفته برای کانال تلگرام خود را محاسبه کنید. راهنمای زمان‌بندی انتشار محتوا برای حداکثر تعامل.",
};

const faqs = [
  { question: "چه تعداد پست در هفته بفرستم؟", answer: "تعداد پست بسته به اندازه کانال و نوع محتوا متفاوت است. کانال‌های کوچک ۳-۵ پست و کانال‌های بزرگ ۷-۱۴ پست در هفته مناسب است." },
  { question: "بهترین زمان انتشار پست چه وقتی است؟", answer: "بهترین زمان بسته به مخاطبان شما متفاوت است. معمولاً صبح‌ها (۸-۱۰) و عصرها (۱۸-۲۱) بهترین زمان‌ها هستند." },
  { question: "آیا انتشار زیاد پست مضر است؟", answer: "بله، انتشار بیش از حد محتوای بی‌کیفیت باعث خستگی مخاطبان و افزایش نرخ ریزش می‌شود. کیفیت مهم‌تر از کمیت است." },
  { question: "چگونه زمان‌بندی انتشار را بهینه کنیم؟", answer: "از ابزارهای تحلیلی برای شناسایی بهترین زمان انتشار استفاده کنید و محتوا را از قبل برنامه‌ریزی کنید." },
  { question: "آیا ثبات در انتشار مهم است؟", answer: "بله، ثبات در انتشار محتوا بسیار مهم است. مخاطبان انتظار دارند در زمان‌های مشخصی محتوای جدید دریافت کنند." },
];

export default function PostFrequencyCalculatorPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 text-[#10B981]">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">تعداد پست مناسب</h1>
            <p className="text-sm text-text-secondary">تعداد بهینه پست در هفته را محاسبه کنید</p>
          </div>
        </div>

        <PostFrequencyCalculator />

        {/* What is Post Frequency */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">تعداد پست مناسب چیست؟</h2>
          <div className="text-sm text-text-secondary leading-relaxed space-y-3">
            <p>
              تعداد پست مناسب به تعداد بهینه پست‌هایی گفته می‌شود که باید در هفته در کانال تلگرامی خود منتشر کنید تا حداکثر تعامل و رشد را داشته باشید. این تعداد بسته به اندازه کانال، نوع محتوا و رفتار مخاطبان متفاوت است.
            </p>
            <p>
              انتشار بیش از حد محتوا می‌تواند باعث خستگی مخاطبان و افزایش نرخ ریزش شود. انتشار کمتر از حد هم باعث کاهش تعامل و فراموش شدن کانال می‌شود. یافتن تعادل مناسب کلید موفقیت است.
            </p>
          </div>
        </section>

        {/* General Guidelines */}
        <section className="mt-12 rounded-2xl border border-[#10B981]/15 bg-gradient-to-br from-[#10B981]/5 to-[#059669]/3 p-6">
          <h2 className="text-lg font-extrabold text-text-primary mb-4">راهنمای کلی تعداد پست</h2>
          <div className="space-y-3">
            {[
              { size: "کانال کوچک (زیر ۵,۰۰۰ عضو)", freq: "۳-۵ پست در هفته", note: "تمرکز بر کیفیت محتوا" },
              { size: "کانال متوسط (۵,۰۰۰-۵۰,۰۰۰ عضو)", freq: "۵-۱۰ پست در هفته", note: "تعادل بین کیفیت و کمیت" },
              { size: "کانال بزرگ (بالای ۵۰,۰۰۰ عضو)", freq: "۷-۱۴ پست در هفته", note: "تنوع بیشتر در محتوا" },
            ].map((item) => (
              <div key={item.size} className="rounded-xl bg-surface border border-border/30 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-text-primary">{item.size}</span>
                  <span className="text-sm font-bold text-[#10B981]">{item.freq}</span>
                </div>
                <p className="text-xs text-text-secondary">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best Times */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">بهترین زمان‌های انتشار</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { time: "صبح‌ها (۸-۱۰)", desc: "مناسب برای اخبار و محتوای آموزشی" },
              { time: "ظهر (۱۲-۱۴)", desc: "مناسب برای محتوای سرگرمی و خبری" },
              { time: "عصرها (۱۸-۲۱)", desc: "بهترین زمان برای تعامل بالا" },
              { time: "شب‌ها (۲۱-۲۳)", desc: "مناسب برای محتوای طولانی و تحلیلی" },
            ].map((item) => (
              <div key={item.time} className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 p-4">
                <CheckCircle className="h-5 w-5 text-[#10B981] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-text-primary">{item.time}</p>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#F59E0B]" />
            نکات بهینه‌سازی زمان‌بندی
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "از ابزار تحلیل استفاده کنید", text: "آمار تعامل در ساعت‌های مختلف را بررسی کنید تا بهترین زمان را پیدا کنید." },
              { title: "محتوا را از قبل برنامه‌ریزی کنید", text: "برنامه انتشار هفتگی داشته باشید و محتوا را از قبل آماده کنید." },
              { title: "ثبات داشته باشید", text: "در انتشار محتوا منظم و ثابت باشید تا مخاطبان به زمان‌بندی شما عادت کنند." },
              { title: "عملکرد را بسنجید", text: "آمار تعامل هر پست را بررسی کنید و زمان‌بندی را بهینه‌سازی کنید." },
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
            شروع انتشار
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
