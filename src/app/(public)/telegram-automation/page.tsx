import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Clock, Bot, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "اتوماسیون تلگرام",
  description: "راهنمای جامع اتوماسیون تلگرام. خودکارسازی فرآیندهای تلگرام با بات‌ها و ابزارهای هوشمند. صرفه‌جویی در زمان و افزایش بهره‌وری.",
  keywords: ["اتوماسیون تلگرام", "خودکارسازی تلگرام", "اتوماسیون کانال تلگرام", "ربات خودکار تلگرام"],
};

const faqs = [
  { question: "اتوماسیون تلگرام چیست؟", answer: "اتوماسیون تلگرام استفاده از ابزارها و بات‌ها برای خودکارسازی فرآیندهای تکراری مانند انتشار محتوا، پاسخگویی و مدیریت کانال است. این کار باعث صرفه‌جویی در زمان و کاهش خطاهای انسانی می‌شود." },
  { question: "آیا اتوماسیون تلگرام قانونی است؟", answer: "بله، استفاده از بات‌های رسمی تلگرام برای خودکارسازی کاملاً قانونی و مجاز است. تلگرام خود API رسمی برای این منظور ارائه می‌دهد." },
  { question: "چه فرآیندهایی را می‌توان خودکار کرد؟", answer: "انتشار محتوا در زمان‌بندی مشخص، پاسخ خودکار به پیام‌ها، خوشامدگویی اعضای جدید، حذف اسپام و گزارش‌گیری خودکار از جمله فرآیندهای قابل اتوماسیون هستند." },
  { question: "هزینه اتوماسیون تلگرام چقدر است؟", answer: "هزینه بسته به نوع ابزار و امکانات متفاوت است. ابزارهای پایه رایگان و ابزارهای حرفه‌ای مانند بات محتوای آپلت دارای پلن‌های اشتراکی هستند." },
  { question: "اتوماسیون چه مزایایی دارد؟", answer: "صرفه‌جویی در زمان، کاهش خطا، فعالیت ۲۴ ساعته، مدیریت همزمان چند کانال و گزارش‌گیری خودکار از مزایای اصلی اتوماسیون هستند." },
  { question: "آیا اتوماسیون جایگزین ادمین انسانی می‌شود؟", answer: "اتوماسیون وظایف تکراری و زمان‌بر را انجام می‌دهد، اما برای تصمیم‌گیری‌های خلاقانه و تعامل پیچیده همچنان به انسان نیاز است. بهترین رویکرد ترکیب هر دو است." },
  { question: "چگونه اتوماسیون را شروع کنیم؟", answer: "از ابزارهای ساده مانند آپلت شروع کنید، بات را به کانال متصل کنید و تنظیمات مورد نیاز را پیکربندی کنید. نیازی به دانش فنی نیست." },
];

const features = [
  { icon: Bot, title: "بات محتوا", description: "انتشار خودکار محتوا در زمان‌بندی مشخص. مناسب برای کانال‌های خبری و آموزشی.", color: "from-[#F59E0B] to-[#D97706]" },
  { icon: Clock, title: "زمان‌بندی پست", description: "برنامه‌ریزی انتشار پست‌ها در آینده. محتوا را از قبل آماده و زمان‌بندی کنید.", color: "from-[#3B82F6] to-[#06B6D4]" },
  { icon: Zap, title: "پاسخگویی خودکار", description: "پاسخ خودکار به پیام‌ها و سوالات رایج. صرفه‌جویی در زمان پشتیبانی.", color: "from-[#10B981] to-[#059669]" },
  { icon: Bot, title: "خوشامدگویی", description: "پیام خودکار خوشامدگویی برای اعضای جدید کانال یا گروه.", color: "from-[#8B5CF6] to-[#6D28D9]" },
  { icon: Zap, title: "حذف اسپام", description: "شناسایی و حذف خودکار پیام‌های اسپام و ناخواسته.", color: "from-[#EF4444] to-[#DC2626]" },
  { icon: Clock, title: "گزارش‌گیری خودکار", description: "تهیه خودکار گزارش‌های دوره‌ای از عملکرد کانال.", color: "from-[#F59E0B] to-[#D97706]" },
];

const advantages = [
  "صرفه‌جویی چند ساعته در روز",
  "کاهش خطاهای انسانی",
  "فعالیت ۲۴ ساعته بدون وقفه",
  "مدیریت همزمان چند کانال",
  "سرعت بالا در انتشار محتوا",
  "گزارش‌گیری دقیق و خودکار",
];

const steps = [
  { step: "۱", title: "فرآیندهای تکراری را شناسایی کنید", text: "ببینید چه کارهایی را به طور مرتب انجام می‌دهید که می‌توانند خودکار شوند." },
  { step: "۲", title: "ابزار مناسب انتخاب کنید", text: "ابزاری مانند آپلت را انتخاب کنید که نیازهای شما را برآورده کند." },
  { step: "۳", title: "بات را به کانال متصل کنید", text: "بات را به کانال یا گروه خود اضافه کنید و دسترسی‌های لازم را بدهید." },
  { step: "۴", title: "تنظیمات را پیکربندی کنید", text: "زمان‌بندی انتشار، نوع محتوا و پاسخ‌های خودکار را تنظیم کنید." },
  { step: "۵", title: "عملکرد را رصد و بهینه‌سازی کنید", text: "نتایج را بررسی کنید و تنظیمات را بر اساس عملکرد بهینه‌سازی کنید." },
];

const tips = [
  { title: "از ساده شروع کنید", text: "اول ساده‌ترین فرآیندها را خودکار کنید و کم‌کم پیچیده‌تر شوید." },
  { title: "规则‌های واضح تنظیم کنید", text: "قوانین اتوماسیون باید دقیق و واضح باشند تا خطا کم شود." },
  { title: "عملکرد را پیگیری کنید", text: "نتایج اتوماسیون را بررسی کنید و مطمئن شوید انتظارات شما را برآورده می‌کند." },
  { title: "ترکیب با نظارت انسانی", text: "اتوماسیون را با نظارت انسانی ترکیب کنید تا کیفیت حفظ شود." },
];

export default function TelegramAutomationPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#F59E0B]/7 via-[#F59E0B]/2 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#3B82F6]/5 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #F59E0B 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5 px-3.5 py-1.5 mb-6">
              <Zap className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span className="text-xs font-semibold text-[#F59E0B]">اتوماسیون تلگرام</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
              اتوماسیون <span className="bg-gradient-to-l from-[#F59E0B] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              فرآیندهای تکراری تلگرام خود را خودکار کنید و در زمان صرفه‌جویی کنید.
              بات‌های هوشمند ۲۴ ساعته بدون وقفه کار می‌کنند.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                شروع اتوماسیون
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/telegram-bot/" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200">
                راهنمای بات‌ها
              </Link>
            </div>
          </div>
        </section>

        {/* What is Automation */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
            اتوماسیون تلگرام چیست؟
          </h2>
          <div className="prose-custom text-text-secondary leading-relaxed space-y-4">
            <p>
              اتوماسیون تلگرام به استفاده از ابزارها، بات‌ها و اسکریپت‌ها برای خودکارسازی فرآیندهای تکراری و زمان‌بر در تلگرام گفته می‌شود. این فرآیندها شامل انتشار محتوا، پاسخگویی به پیام‌ها، مدیریت اعضا و گزارش‌گیری است.
            </p>
            <p>
              با اتوماسیون، می‌توانید زمان زیادی صرفه‌جویی کنید و از خستگی و خطاهای انسانی جلوگیری کنید. بات‌های تلگرام ۲۴ ساعته، ۷ روز هفته بدون وقفه کار می‌کنند و می‌توانند هزاران پیام را همزمان پردازش کنند.
            </p>
            <p>
              تلگرام خود API رسمی برای ساخت بات ارائه می‌دهد که استفاده از آن کاملاً قانونی و مجاز است. ابزارهایی مانند آپلت این فرآیند را بسیار ساده کرده‌اند و بدون نیاز به دانش فنی می‌توانید بات‌های هوشمند بسازید.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            قابلیت‌های اتوماسیون تلگرام
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border/40 bg-surface p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            مزایای اتوماسیون
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {advantages.map((adv) => (
              <div key={adv} className="flex items-center gap-3 rounded-xl bg-surface border border-border/40 p-4">
                <CheckCircle className="h-5 w-5 text-[#10B981] shrink-0" />
                <span className="text-sm text-text-secondary">{adv}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            راهنمای گام‌به‌گام شروع اتوماسیون
          </h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4 rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-l from-[#F59E0B] to-[#3B82F6] text-white text-sm font-bold">
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
            نکات حرفه‌ای اتوماسیون
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
