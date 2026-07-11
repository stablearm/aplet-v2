import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  ArrowLeft,
  TrendingUp,
  Target,
  Lightbulb,
  HelpCircle,
  BarChart3,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { RoiCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "محاسبه ROI بازگشت سرمایه تبلیغات تلگرام",
  description:
    "ماشین حساب ROI تبلیغات تلگرام. بازگشت سرمایه کمپین‌های تبلیغاتی خود را محاسبه و بهینه‌سازی کنید. راهنمای جامع محاسبه نرخ بازگشت سرمایه.",
};

const faqs = [
  {
    question: "ROI تبلیغات تلگرام چیست؟",
    answer:
      "ROI تبلیغات تلگرام نسبت سود حاصل از تبلیغات به هزینه صورت‌گرفته است. اگر ۱۰۰ هزار تومان هزینه تبلیغ کنید و ۳۰۰ هزار تومان درآمد کسب کنید، ROI شما ۲۰۰٪ است.",
  },
  {
    question: "چگونه ROI تبلیغات تلگرام را محاسبه کنیم؟",
    answer:
      "فرمول ساده ROI = (درآمد - هزینه) ÷ هزینه × ۱۰۰. ابتدا هزینه کل تبلیغات و سپس درآمد حاصل از آن را محاسبه کنید. این شامل هزینه پست، طراحی و زمان صرف‌شده می‌شود.",
  },
  {
    question: "ROI خوب برای تبلیغات تلگرام چقدر است؟",
    answer:
      "به طور کلی ROI بالای ۱۰۰٪ خوب محسوب می‌شود. در تبلیغات تلگرام به دلیل هزینه پایین CPM، میانگین ROI بین ۲۰۰ تا ۵۰۰٪ گزارش شده است. هدف اولیه باید رسیدن به ROI ۱۵۰٪ باشد.",
  },
  {
    question: "آیا تبلیغات تلگرام ROI بهتری نسبت به اینستاگرام دارد؟",
    answer:
      "بله، معمولاً. هزینه CPM تلگرام ۵۰ تا ۳۰۰ تومان است در حالی که اینستاگرام ۵۰۰ تا ۳۰۰۰ تومان. با هدف‌گیری درست و محتوای مناسب، ROI تبلیغات تلگرام می‌تواند ۳ تا ۵ برابر اینستاگرام باشد.",
  },
  {
    question: "چه عواملی بر ROI تبلیغات تلگرام تأثیر دارد؟",
    answer:
      "انتخاب کانال مناسب، کیفیت محتوا، زمان انتشار، هدف‌گیری دقیق و پیگیری نرخ تبدیل. همچنین نوع محصول، قیمت‌گذاری و کیفیت صفحه فرود نیز نقش مهمی در ROI دارند.",
  },
  {
    question: "چند کمپین تبلیغاتی برای محاسبه ROI لازم است؟",
    answer:
      "حداقل ۳ تا ۵ کمپین با شرایط متفاوت. با جمع‌آوری داده از چند کمپین می‌توانید الگوها را شناسایی کنید، بودجه بهینه‌تری تخصیص دهید و ROI کلی را بهبود ببخشید.",
  },
];

const tips = [
  {
    title: "کانال‌های مرتبط انتخاب کنید",
    text: "تبلیغ در کانال‌هایی که مخاطبان هدف شما حضور دارند، نرخ تبدیل را تا ۳ برابر افزایش می‌دهد و ROI را بهبود می‌بخشد.",
  },
  {
    title: "محتوای جذاب و CTA واضح",
    text: "پست‌هایی با دعوت به اقدام مشخص (CTA) و محتوای ارزشمند، نرخ کلیک و فروش را افزایش می‌دهند.",
  },
  {
    title: "عملکرد را ردیابی کنید",
    text: "از لینک‌های UTM و ابزارهای تحلیلی استفاده کنید تا دقیقاً بدانید هر تبلیغ چه میزان درآمد ایجاد کرده است.",
  },
  {
    title: "بودجه را بهینه کنید",
    text: "بودجه خود را روی کانال‌ها و کمپین‌هایی متمرکز کنید که بالاترین ROI را دارند و عملکرد ضعیف را متوقف کنید.",
  },
];

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EF4444]/10 to-[#F59E0B]/10 text-[#EF4444]">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">
              محاسبه ROI
            </h1>
            <p className="text-sm text-text-secondary">
              بازگشت سرمایه تبلیغات خود را محاسبه کنید
            </p>
          </div>
        </div>

        <RoiCalculator />

        {/* What is ROI */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#EF4444]" />
            ROI چیست؟
          </h2>
          <div className="prose-custom text-text-secondary leading-relaxed space-y-4">
            <p>
              ROI مخفف <strong className="text-text-primary">Return on Investment</strong> یا
              بازگشت سرمایه است. این شاخص نشان می‌دهد به ازای هر تومان هزینه
              تبلیغات، چه مقدار سود کسب کرده‌اید. فرمول ساده آن برابر است با:
            </p>
            <div className="rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/15 p-4 text-center">
              <p className="text-lg font-bold text-text-primary">
                ROI = (درآمد - هزینه) ÷ هزینه × ۱۰۰
              </p>
            </div>
            <p>
              محاسبه ROI در تبلیغات تلگرام اهمیت ویژه‌ای دارد زیرا به شما کمک
              می‌کند بفهمید کدام کمپین‌ها سودآور هستند و کدام هزینه‌ها هدر رفته
              است. بدون اندازه‌گیری ROI، تصمیم‌گیری در مورد بودجه تبلیغاتی مانند
              رانندگی در تاریکی بدون چراغ است.
            </p>
            <p>
              در تبلیغات تلگرام به دلیل هزینه پایین CPM و دسترسی به مخاطبان
              هدفمند، امکان کسب ROI بالا وجود دارد. اما این تنها در صورتی محقق
              می‌شود که تبلیغات خود را بهینه کنید و عملکرد آن‌ها را به طور مستمر
              پیگیری نمایید.
            </p>
          </div>
        </section>

        {/* Formula Example */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#EF4444]" />
            فرمول محاسبه ROI
          </h2>
          <div className="text-text-secondary leading-relaxed space-y-4">
            <p>
              برای درک بهتر، بیایید یک مثال عملی با اعداد واقعی تبلیغات تلگرام
              بررسی کنیم:
            </p>
            <div className="rounded-2xl border border-[#EF4444]/15 bg-surface p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-sm font-bold">
                  ۱
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">هزینه تبلیغ</p>
                  <p className="text-sm text-text-secondary">
                    یک پست تبلیغاتی در کانال ۵۰ هزار نفری: <strong className="text-text-primary">۲۰۰,۰۰۰ تومان</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-sm font-bold">
                  ۲
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">درآمد حاصل</p>
                  <p className="text-sm text-text-secondary">
                    ۱۰ مشتری جدید با میانگین خرید ۱۵۰,۰۰۰ تومان: <strong className="text-text-primary">۱,۵۰۰,۰۰۰ تومان</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-sm font-bold">
                  ۳
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">محاسبه ROI</p>
                  <p className="text-sm text-text-secondary">
                    ROI = (۱,۵۰۰,۰۰۰ - ۲۰۰,۰۰۰) ÷ ۲۰۰,۰۰۰ × ۱۰۰ = <strong className="text-[#10B981]">۶۵۰٪</strong>
                  </p>
                </div>
              </div>
            </div>
            <p>
              این یعنی به ازای هر ۱ تومان هزینه، ۶.۵ تومان سود خالص کسب
              کرده‌اید. البته این مثال فرضی است و نتایج واقعی بسته به نوع محصول،
              کیفیت محتوا و کانال انتخابی متفاوت خواهد بود.
            </p>
          </div>
        </section>

        {/* ROI Benchmarks */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-[#EF4444]" />
            ROI خوب چقدر است؟
          </h2>
          <div className="text-text-secondary leading-relaxed space-y-4">
            <p>
              ROI خوب بسته به نوع کسب و کار و محصول متفاوت است، اما به طور
              کلی معیارهای زیر برای تبلیغات تلگرام رایج هستند:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 p-4">
                <span className="text-lg font-extrabold text-[#EF4444] w-20 text-center">
                  &lt; ۱۰۰٪
                </span>
                <div>
                  <p className="text-sm font-bold text-text-primary">ضعیف</p>
                  <p className="text-xs text-text-secondary">
                    هزینه بیشتر از درآمد است. نیاز به بازنگری استراتژی دارد.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 p-4">
                <span className="text-lg font-extrabold text-[#F59E0B] w-20 text-center">
                  ۱۰۰-۲۰۰٪
                </span>
                <div>
                  <p className="text-sm font-bold text-text-primary">قابل قبول</p>
                  <p className="text-xs text-text-secondary">
                    شروع سودآوری. برای کسب و کارهای تازه‌کار مناسب است.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 p-4">
                <span className="text-lg font-extrabold text-[#10B981] w-20 text-center">
                  ۲۰۰-۵۰۰٪
                </span>
                <div>
                  <p className="text-sm font-bold text-text-primary">خوب</p>
                  <p className="text-xs text-text-secondary">
                    سودآوری مناسب. هدف اکثر کسب و کارهای حرفه‌ای.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 p-4">
                <span className="text-lg font-extrabold text-[#3B82F6] w-20 text-center">
                  &gt; ۵۰۰٪
                </span>
                <div>
                  <p className="text-sm font-bold text-text-primary">عالی</p>
                  <p className="text-xs text-text-secondary">
                    بازگشت سرمایه فوق‌العاده. نتیجه بهینه‌سازی و تجربه بالا.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-6 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#F59E0B]" />
            نکات بهبود ROI
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="rounded-2xl border border-border/40 bg-surface p-5 shadow-sm"
              >
                <h3 className="font-bold text-text-primary mb-2">{tip.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#EF4444]" />
            سوالات متداول
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm"
              >
                <h3 className="font-bold text-text-primary mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#EF4444] to-[#F59E0B] px-8 text-sm font-bold text-white shadow-lg shadow-[#EF4444]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            بهبود ROI
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
