import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, TrendingUp, Users, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "تحلیل تلگرام",
  description: "راهنمای جامع تحلیل عملکرد کانال تلگرام. ابزارها و روش‌های تحلیل آمار بازدید، تعامل و رشد مخاطبان.",
  keywords: ["تحلیل تلگرام", "آمار کانال تلگرام", "تحلیل عملکرد تلگرام", "آنالیز تلگرام", "آمار تلگرام"],
};

const faqs = [
  { question: "چرا تحلیل تلگرام مهم است؟", answer: "تحلیل عملکرد کانال به شما کمک می‌کند نقاط قوت و ضعف خود را شناسایی کنید و استراتژی خود را بهینه‌سازی کنید. بدون تحلیل، نمی‌توانید عملکرد واقعی کانال خود را بسنجید." },
  { question: "چه معیارهایی را باید تحلیل کنیم؟", answer: "تعداد اعضا، نرخ تعامل، نرخ ریزش، زمان بازدید، نرخ رشد، عملکرد هر پست و نوع محتوا مهم‌ترین معیارها هستند." },
  { question: "ابزارهای تحلیل تلگرام چیست؟", answer: "آپلت ابزارهای تحلیلی جامعی برای کانال‌های تلگرامی ارائه می‌دهد. همچنین API تلگرام اطلاعات پایه‌ای در مورد کانال‌ها ارائه می‌دهد." },
  { question: "نرخ تعامل خوب چقدر است؟", answer: "نرخ تعامل خوب در تلگرام معمولاً بین ۵ تا ۱۵ درصد است. نرخ تعامل بالاتر نشان‌دهنده محتوای با کیفیت و مخاطبان وفادار است." },
  { question: "چگونه نرخ ریزش را کاهش دهیم؟", answer: "با تولید محتوای منظم و با کیفیت، تعامل با مخاطبان، اجتناب از تبلیغات بیش از حد و درک نیازهای مخاطبان می‌توانید نرخ ریزش را کاهش دهید." },
  { question: "هر چند وقت یکبار باید تحلیل کنیم؟", answer: "به طور هفتگی آمار پایه و به طور ماهانه تحلیل جامع انجام دهید. برای کمپین‌های تبلیغاتی، تحلیل روزانه توصیه می‌شود." },
];

const metrics = [
  { title: "تعداد اعضا", description: "رشد تعداد اعضای کانال و نرخ ریزش اعضا.", icon: Users, color: "from-[#3B82F6] to-[#5B5FEF]" },
  { title: "نرخ تعامل", description: "درصد مخاطبانی که با محتوا تعامل دارند (لایک، فوروارد، نظر).", icon: TrendingUp, color: "from-[#10B981] to-[#059669]" },
  { title: "عملکرد محتوا", description: "تحلیل عملکرد هر پست بر اساس بازدید، تعامل و زمان انتشار.", icon: BarChart3, color: "from-[#F59E0B] to-[#D97706]" },
];

const keyMetrics = [
  { name: "تعداد اعضا", description: "تعداد کل اعضای کانال و تغییرات روزانه/هفتگی" },
  { name: "نرخ تعامل (Engagement Rate)", description: "درصد مخاطبانی که با پست‌ها تعامل دارند" },
  { name: "نرخ ریزش (Churn Rate)", description: "درصد اعضایی که کانال را ترک می‌کنند" },
  { name: "بازدید هر پست", description: "تعداد بازدید متوسط هر پست منتشر شده" },
  { name: "نرخ رشد", description: "سرعت افزایش اعضای جدید در بازه زمانی مشخص" },
  { name: "زمان انتشار بهینه", description: "بهترین ساعت و روز برای انتشار محتوا" },
];

const steps = [
  { step: "۱", title: "ابزار تحلیل مناسب انتخاب کنید", text: "از ابزارهایی مانند آپلت برای دسترسی به آمار دقیق و گزارش‌های جامع استفاده کنید." },
  { step: "۲", title: "KPIهای خود را مشخص کنید", text: "معیارهای کلیدی عملکرد خود را بر اساس هدف کسب و کار مشخص کنید." },
  { step: "۳", title: "آمار منظم جمع‌آوری کنید", text: "به طور منظم آمار کانال را ثبت و ذخیره کنید." },
  { step: "۴", title: "تحلیل و گزارش تهیه کنید", text: "داده‌ها را تحلیل کنید و گزارش‌های دوره‌ای تهیه کنید." },
  { step: "۵", title: "استراتژی را بهینه‌سازی کنید", text: "بر اساس نتایج تحلیل، استراتژی محتوا و تبلیغات را بهبود دهید." },
];

const tips = [
  { title: " benchmarks تعیین کنید", text: "برای هر معیار یک نقطه مرجع تعیین کنید تا بتوانید پیشرفت را بسنجید." },
  { title: "روی روندها تمرکز کنید", text: "تغییرات روزانه کمتر از روندهای هفتگی و ماهانه اهمیت دارند." },
  { title: "داده‌ها را با هم مقایسه کنید", text: "عملکرد پست‌های مختلف را با هم مقایسه کنید تا الگوها را شناسایی کنید." },
  { title: "از ابزار خودکار استفاده کنید", text: "تنظیم گزارش‌های خودکار در زمان شما صرفه‌جویی می‌کند." },
];

export default function TelegramAnalyticsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#3B82F6]/7 via-[#3B82F6]/2 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#5B5FEF]/5 via-[#5B5FEF]/1 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-3.5 py-1.5 mb-6">
              <BarChart3 className="h-3.5 w-3.5 text-[#3B82F6]" />
              <span className="text-xs font-semibold text-[#3B82F6]">تحلیل تلگرام</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
              تحلیل <span className="bg-gradient-to-l from-[#3B82F6] to-[#5B5FEF] bg-clip-text text-transparent">عملکرد تلگرام</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              با تحلیل دقیق عملکرد کانال، استراتژی خود را بهینه‌سازی و نتایج را بهبود دهید.
              داده‌محوری کلید موفقیت در تلگرام است.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                شروع تحلیل
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/tools/engagement-calculator/" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200">
                محاسبه تعامل
              </Link>
            </div>
          </div>
        </section>

        {/* What is Analytics */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
            تحلیل تلگرام چیست و چرا مهم است؟
          </h2>
          <div className="prose-custom text-text-secondary leading-relaxed space-y-4">
            <p>
              تحلیل تلگرام فرآیند جمع‌آوری، اندازه‌گیری و تفسیر داده‌های مرتبط با عملکرد کانال یا گروه تلگرامی است. این تحلیل به شما کمک می‌کند تا درک بهتری از رفتار مخاطبان، عملکرد محتوا و اثربخشی استراتژی‌های خود داشته باشید.
            </p>
            <p>
              بدون تحلیل دقیق، نمی‌توانید بدانید کدام پست‌ها عملکرد بهتری دارند، چه زمانی بهتر است محتوا منتشر کنید، یا آیا استراتژی تبلیغاتی شما مؤثر است یا خیر. تحلیل داده‌محور به شما امکان می‌دهد تصمیمات بهتری بگیرید.
            </p>
            <p>
              ابزارهای تحلیلی مانند آپلت به شما امکان می‌دهند آمار دقیقی از تعداد اعضا، نرخ تعامل، نرخ ریزش، عملکرد هر پست و بسیاری معیارهای دیگر دریافت کنید.
            </p>
          </div>
        </section>

        {/* Metrics */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            معیارهای کلیدی تحلیل تلگرام
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <div key={metric.title} className="text-center rounded-2xl border border-border/40 bg-surface p-6 shadow-sm">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.color} text-white mb-5`}>
                  <metric.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{metric.title}</h3>
                <p className="text-sm text-text-secondary">{metric.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Metrics Table */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <div className="rounded-2xl border border-[#3B82F6]/15 bg-gradient-to-br from-[#3B82F6]/5 to-[#5B5FEF]/3 p-8">
            <h2 className="text-xl font-extrabold text-text-primary mb-6">معیارهای مهم برای پیگیری</h2>
            <div className="space-y-3">
              {keyMetrics.map((m) => (
                <div key={m.name} className="flex items-start gap-3 rounded-xl bg-surface/50 border border-border/30 p-4">
                  <CheckCircle className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-text-primary text-sm">{m.name}</p>
                    <p className="text-xs text-text-secondary">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            راهنمای گام‌به‌گام تحلیل
          </h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4 rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-l from-[#3B82F6] to-[#5B5FEF] text-white text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center flex items-center justify-center gap-2">
            <Lightbulb className="h-6 w-6 text-[#F59E0B]" />
            نکات حرفه‌ای تحلیل
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-border/40 bg-surface p-6 shadow-sm">
                <h3 className="font-bold text-text-primary mb-2">{tip.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-3xl">
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

        {/* CTA */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-3xl">
          <CtaBanner />
        </section>
      </main>
    </>
  );
}
