import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import { CpmCalculator } from "@/components/tools/lazy-calculator";
import { faqSchema } from "@/lib/schemas";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "محاسبه CPM | هزینه هر هزار بازدید تبلیغات تلگرام",
  description:
    "محاسبهگر CPM تلگرام: هزینه هر هزار بازدید تبلیغات خود را محاسبه کنید، با فرمول محاسبه، راهنمای بنچمارک و نکات بهبود CPM آشنا شوید.",
};

const faqs = [
  {
    question: "CPM در تلگرام چیست؟",
    answer:
      "CPM مخفف Cost Per Mille یا هزینه هر هزار نمایش تبلیغات است. هر چه CPM پایین‌تر باشد، تبلیغات شما ارزان‌تر و مقرون‌به‌صرفه‌تر هستند.",
  },
  {
    question: "CPM خوب در تلگرام چقدر است؟",
    answer:
      "بسته به نوع کانال و مخاطبان متفاوت است. در کانال‌های عمومی ۵۰ تا ۱۵۰ هزار تومان، در کانال‌های تخصصی ۱۰۰ تا ۳۰۰ هزار تومان و در کانال‌های پرمخاطب ۱۵۰ تا ۵۰۰ هزار تومان معمول است.",
  },
  {
    question: "چگونه CPM خود را کاهش دهیم؟",
    answer:
      "محتوای باکیفیت تولید کنید، زمان انتشار پست را بهینه کنید، مخاطبان هدف خود را بهتر بشناسید و از A/B تست برای مقایسه تبلیغات استفاده کنید.",
  },
  {
    question: "آیا CPM با CPC فرق دارد؟",
    answer:
      "بله. CPM بر اساس هزار نمایش محاسبه می‌شود، در حالی ک CPC (Cost Per Click) بر اساس هر کلیک محاسبه می‌شود. CPM برای آگاهی از برند مناسب‌تر است.",
  },
  {
    question: "چرا CPM من بالاست؟",
    answer:
      "دلایل متداول: محتوای ضعیف، زمان انتشار نامناسب، مخاطبان نامرتبط، یا رقابت بالا در حوزه تبلیغاتی شما. بهبود کیفیت محتوا و هدف‌گیری دقیق‌تر کمک‌کننده است.",
  },
  {
    question: "CPM تلگرام با اینستاگرام مقایسه می‌شود؟",
    answer:
      "هر پلتفرم معیارهای متفاوتی دارد. CPM تلگرام معمولاً پایین‌تر از اینستاگرام است، اما نرخ تعامل و کیفیت مخاطبان نیز متفاوت هستند.",
  },
];

export default function CpmCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-2xl">
      <JsonLd data={faqSchema(faqs)} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6]/10 to-[#5B5FEF]/10 text-[#3B82F6]">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary">
            محاسبه CPM
          </h1>
          <p className="text-sm text-text-secondary">
            هزینه هر هزار بازدید را محاسبه کنید
          </p>
        </div>
      </div>

      {/* Calculator */}
      <CpmCalculator />

      {/* CPM چیست؟ */}
      <section className="mt-12 rounded-2xl border border-border/40 bg-surface p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-text-primary mb-4">
          CPM چیست؟
        </h2>
        <div className="space-y-3 text-sm leading-7 text-text-secondary">
          <p>
            <strong className="text-text-primary">CPM</strong> مخفف{" "}
            <em className="text-[#3B82F6]">Cost Per Mille</em> است که به معنای
            هزینه هر هزار نمایش تبلیغات است. این یکی از پرکاربردترین معیارها در
            تبلیغات دیجیتال محسوب می‌شود و نشان می‌دهد برای هر هزار بار دیده
            شدن تبلیغ شما توسط مخاطبان، چه مبلغی پرداخت کرده‌اید.
          </p>
          <p>
            در تبلیغات تلگرام، CPM نقش حیاتی دارد. کانال‌های تلگرامی با
            میلیون‌ها عضو فعال، بستری ایده‌آل برای تبلیغات هدفمند فراهم
            می‌کنند. وقتی تبلیغی در یک کانال منتشر می‌شود، هر بار که پست
            توسط کاربری دیده شود، یک نمایش (impression) ثبت می‌شود. CPM به شما
            کمک می‌کند هزینه این نمایش‌ها را ارزیابی کنید و بفهمید آیا
            تبلیغات شما مقرون‌به‌صرفه هستند یا خیر.
          </p>
          <p>
            درک CPM به شما امکان می‌دهد بودجه تبلیغاتی خود را هوشمندانه‌تر
            تخصیص دهید، عملکرد کمپین‌ها را مقایسه کنید و تصمیمات بهتری در
            مورد انتخاب کانال‌های تبلیغاتی بگیرید. هرچه CPM پایین‌تر باشد،
            تبلیغات شما مقرون‌به‌صرفه‌تر خواهند بود.
          </p>
        </div>
      </section>

      {/* فرمول محاسبه CPM */}
      <section className="mt-6 rounded-2xl border border-border/40 bg-surface p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-text-primary mb-4">
          فرمول محاسبه CPM
        </h2>
        <div className="rounded-xl bg-[#3B82F6]/5 border border-[#3B82F6]/10 p-4 mb-4">
          <p className="text-sm font-bold text-[#3B82F6] mb-2">
            فرمول محاسبه:
          </p>
          <p className="text-lg font-extrabold text-text-primary text-center">
            CPM = (هزینه تبلیغات ÷ تعداد نمایش‌ها) × ۱,۰۰۰
          </p>
        </div>
        <div className="space-y-3 text-sm leading-7 text-text-secondary">
          <p>
            <strong className="text-text-primary">مثال عملی:</strong> فرض
            کنید یک تبلیغ در کانال تلگرامی با ۵۰,۰۰۰ عضو قرار داده‌اید و
            هزینه آن ۲,۰۰۰,۰۰۰ تومان بوده است. اگر تبلیغ شما ۱۰,۰۰۰
            نمایش دریافت کرده باشد:
          </p>
          <div className="rounded-lg bg-surface/50 border border-border/40 p-3 font-mono text-xs text-text-primary">
            CPM = (۲,۰۰۰,۰۰۰ ÷ ۱۰,۰۰۰) × ۱,۰۰۰ = ۲۰۰,۰۰۰ تومان
          </div>
          <p>
            یعنی برای هر هزار نمایش تبلیغ شما، ۲۰۰,۰۰۰ تومان هزینه شده
            است. این رقم را می‌توانید با سایر کانال‌ها و پلتفرم‌ها مقایسه
            کنید تا بهترین گزینه را انتخاب کنید.
          </p>
        </div>
      </section>

      {/* CPM خوب چقدر است؟ */}
      <section className="mt-6 rounded-2xl border border-border/40 bg-surface p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-text-primary mb-4">
          CPM خوب چقدر است؟
        </h2>
        <p className="text-sm leading-7 text-text-secondary mb-4">
          CPM مناسب بسته به نوع کانال، مخاطبان و حوزه تخصصی متفاوت است. در
          ادامه راهنمای بنچمارک برای انواع تبلیغات در تلگرام آورده شده است:
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                کانال‌های عمومی (اخبار، سرگرمی)
              </p>
              <p className="text-xs text-text-secondary">
                CPM معمول: ۵۰ تا ۱۵۰ هزار تومان. مخاطبان گسترده و تنوع
                بالا.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                کانال‌های تخصصی (تکنولوژی، مالی، آموزش)
              </p>
              <p className="text-xs text-text-secondary">
                CPM معمول: ۱۰۰ تا ۳۰۰ هزار تومان. مخاطبان هدفمندتر و
                تعامل بالاتر.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                کانال‌های پرمخاطب (بیش از ۱۰۰K عضو)
              </p>
              <p className="text-xs text-text-secondary">
                CPM معمول: ۱۵۰ تا ۵۰۰ هزار تومان. هزینه بالاتر به دلیل
                دسترسی گسترده‌تر.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                کانال‌های فروشگاهی و تجاری
              </p>
              <p className="text-xs text-text-secondary">
                CPM معمول: ۸۰ تا ۲۵۰ هزار تومان. بستگی به نرخ تبدیل و
                نوع محصول دارد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* نکات بهبود CPM */}
      <section className="mt-6 rounded-2xl border border-border/40 bg-surface p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-text-primary mb-4">
          نکات بهبود CPM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <Lightbulb className="h-5 w-5 text-[#3B82F6] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                محتوای باکیفیت تولید کنید
              </p>
              <p className="text-xs text-text-secondary leading-6">
                تبلیغاتی که ارزش واقعی برای مخاطب ایجاد کنند، تعامل بیشتری
                دریافت می‌کنند و نرخ نمایش مؤثر را بالا می‌برند.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <Lightbulb className="h-5 w-5 text-[#3B82F6] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                زمان انتشار را بهینه کنید
              </p>
              <p className="text-xs text-text-secondary leading-6">
                انتشار تبلیغات در ساعات پیک فعالیت کاربران (۹ تا ۱۲ و ۱۸
                تا ۲۱) باعث افزایش نمایش می‌شود.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <Lightbulb className="h-5 w-5 text-[#3B82F6] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                مخاطبان هدف را بشناسید
              </p>
              <p className="text-xs text-text-secondary leading-6">
                انتخاب کانال‌هایی با مخاطبان مرتبط با کسب‌وکار شما، نرخ
                تبدیل بالاتر و CPM مؤثرتری به همراه دارد.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/40 p-4">
            <Lightbulb className="h-5 w-5 text-[#3B82F6] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text-primary">
                از A/B تست استفاده کنید
              </p>
              <p className="text-xs text-text-secondary leading-6">
                مقایسه نسخه‌های مختلف تبلیغات به شما کمک می‌کند بهترین
                عملکرد را شناسایی و CPM را بهبود دهید.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-6 rounded-2xl border border-border/40 bg-surface p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-text-primary mb-4">
          سؤالات متداول
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-surface/50 border border-border/40 p-4"
            >
              <p className="text-sm font-bold text-text-primary mb-2">
                {faq.question}
              </p>
              <p className="text-xs leading-6 text-text-secondary">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/register"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
        >
          شروع تبلیغات
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
