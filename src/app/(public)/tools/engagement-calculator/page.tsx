import type { Metadata } from "next";
import Link from "next/link";
import { Percent, ArrowLeft, CheckCircle, Lightbulb, HelpCircle } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { EngagementCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "محاسبه نرخ تعامل تلگرام",
  description: "نرخ تعامل کانال تلگرام خود را اندازه‌گیری، تحلیل و بهینه‌سازی کنید. راهنمای کامل محاسبه Engagement Rate با فرمول و نکات عملی.",
};

const faqs = [
  { question: "نرخ تعامل تلگرام چیست؟", answer: "نرخ تعامل (Engagement Rate) نسبت تعداد تعاملات (بازدید، لایک، ری‌اکشن، کامنت، فوروارد) به تعداد اعضای کانال است. این معیار نشان می‌دهد محتوای شما تا چه اندازه مخاطبان را درگیر می‌کند." },
  { question: "نرخ تعامل خوب در تلگرام چقدر است؟", answer: "بسته به اندازه کانال متفاوت است: کانال‌های کوچک (زیر ۱۰K) معمولاً ۱۵-۲۵٪، کانال‌های متوسط (۱۰K-۱۰۰K) حدود ۵-۱۵٪ و کانال‌های بزرگ (بالای ۱۰۰K) حدود ۲-۸٪ نرخ تعامل دارند." },
  { question: "آیا فقط بازدید پست‌ها ملاک تعامل است؟", answer: "خیر. تعامل شامل بازدید، لایک، ری‌اکشن، کامنت، فوروارد و ذخیره پست می‌شود. برخی ابزارها فقط بازدید را محاسبه می‌کنند اما معیار کامل‌تر شامل همه نوع تعامل است." },
  { question: "چگونه نرخ تعامل کانال را افزایش دهیم؟", answer: "محتوای با کیفیت و مرتبط تولید کنید، از CTA (دعوت به اقدام) استفاده کنید، زمان انتشار را بهینه کنید، با مخاطبان تعامل داشته باشید و پست‌های تعاملی مانند نظرسنجی و سؤال منتشر کنید." },
  { question: "آیا نرخ تعامل بالا همیشه خوب است؟", answer: "نرخ تعامل بسیار بالا ممکن است نشانه محتوای حاشیه‌ای یا بحث‌برانگیز باشد. هدف باید تعامل پایدار و مرتبط با موضوع کانال باشد، نه صرفاً عدد بالا." },
  { question: "هر چند وقت یکبار باید نرخ تعامل را بررسی کرد؟", answer: "بررسی هفتگی برای شناسایی روندها توصیه می‌شود. همچنین بعد از هر کمپین تبلیغاتی یا تغییر استراتژی محتوا، بررسی نرخ تعامل ضروری است." },
];

export default function EngagementCalculatorPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#10B981]/10 to-[#3B82F6]/10 text-[#10B981]">
            <Percent className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">محاسبه نرخ تعامل تلگرام</h1>
            <p className="text-sm text-text-secondary">نرخ تعامل کانال خود را اندازه‌گیری و تحلیل کنید</p>
          </div>
        </div>

        <EngagementCalculator />

        {/* What is Engagement Rate */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">نرخ تعامل چیست؟</h2>
          <div className="text-sm text-text-secondary leading-relaxed space-y-3">
            <p>
              نرخ تعامل (Engagement Rate) یکی از مهم‌ترین معیارهای سنجش عملکرد کانال تلگرام است. این نسبت نشان می‌دهد چه درصدی از اعضای کانال با محتوای منتشرشده تعامل می‌کنند — یعنی پست‌ها را می‌بینند، لایک می‌زنند، کامنت می‌گذارند یا فوروارد می‌کنند.
            </p>
            <p>
              برخلاف تعداد اعضا که فقط اندازه مخاطبان را نشان می‌دهد، نرخ تعامل کیفیت محتوا و ارتباط آن با مخاطبان را می‌سنجد. کانالی با ۱۰,۰۰۰ عضو و ۲,۰۰۰ بازدید هر پست (۲۰٪ تعامل) موفق‌تر از کانالی با ۵۰,۰۰۰ عضو و ۳,۰۰۰ بازدید (۶٪ تعامل) است.
            </p>
            <p>
              تبلیغ‌کنندگان نیز از نرخ تعامل به عنوان معیار اصلی انتخاب کانال‌های تبلیغاتی استفاده می‌کنند. کانال‌های با نرخ تعامل بالاتر، ارزش تبلیغاتی بیشتری دارند و می‌توانند قیمت بالاتری برای پست‌های تبلیغاتی دریافت کنند.
            </p>
          </div>
        </section>

        {/* Formula */}
        <section className="mt-12 rounded-2xl border border-[#10B981]/15 bg-gradient-to-br from-[#10B981]/5 to-[#3B82F6]/3 p-6">
          <h2 className="text-lg font-extrabold text-text-primary mb-3">فرمول محاسبه</h2>
          <div className="rounded-xl bg-surface border border-border/30 p-4 mb-4">
            <p className="text-sm font-mono text-text-primary text-center">
              نرخ تعامل = (تعداد تعاملات / تعداد اعضای کانال) × ۱۰۰
            </p>
          </div>
          <p className="text-sm text-text-secondary">
            <strong>مثال:</strong> اگر کانال شما ۵,۰۰۰ عضو دارد و یک پست ۷۵۰ بازدید، ۵۰ لایک و ۳۰ فوروارد دریافت کرده، نرخ تعامل = (۸۳۰ / ۵۰۰۰) × ۱۰۰ = ۱۶.۶٪
          </p>
        </section>

        {/* Benchmarks */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">نرخ تعامل خوب چقدر است؟</h2>
          <div className="space-y-3">
            {[
              { range: "کانال کوچک (زیر ۱۰,۰۰۰ عضو)", rate: "۱۵-۲۵٪", note: "مخاطبان وفادارتر و تعامل بالاتر" },
              { range: "کانال متوسط (۱۰,۰۰۰-۱۰۰,۰۰۰ عضو)", rate: "۵-۱۵٪", note: "متعادل‌تر و نزدیک به استاندارد صنعت" },
              { range: "کانال بزرگ (بالای ۱۰۰,۰۰۰ عضو)", rate: "۲-۸٪", note: "طبیعی‌تر به دلیل گستردگی مخاطبان" },
            ].map((item) => (
              <div key={item.range} className="rounded-xl bg-surface border border-border/40 p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-text-primary">{item.range}</span>
                  <span className="text-sm font-bold text-[#10B981]">{item.rate}</span>
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
            نکات بهبود تعامل
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "زمان انتشار بهینه", text: "پست‌ها را در ساعات پیک فعالیت مخاطبان منتشر کنید — معمولاً ۹ صبح، ۱ بعدازظهر و ۹ شب." },
              { title: "از CTA استفاده کنید", text: "در هر پست یک دعوت به اقدام مشخص بگذارید: «لایک کنید», «نظر بگذارید», «فوروارد کنید»." },
              { title: "محتوای تعاملی بسازید", text: "نظرسنجی، سؤال، چالش و مسابقه بگذارید تا مخاطبان تشویق به واکنش شوند." },
              { title: "ثبات داشته باشید", text: "انتشار منظم و منطبق با برنامه زمانی باعث ایجاد عادت در مخاطبان و افزایش تعامل می‌شود." },
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
          <h2 className="text-xl font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#10B981]" />
            سوالات متداول
          </h2>
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
            بهبود تعامل
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
