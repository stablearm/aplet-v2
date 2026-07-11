import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Zap, Settings, ArrowLeft, CheckCircle, Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "بات تلگرام",
  description: "راهنمای جامع بات‌های تلگرام: ساخت، مدیریت و استفاده از بات‌ها برای خودکارسازی کسب و کار. انواع بات‌ها، مزایا و نحوه راه‌اندازی.",
  keywords: ["بات تلگرام", "ربات تلگرام", "ساخت بات تلگرام", "بات محتوا", "بات هوشمند تلگرام"],
};

const faqs = [
  { question: "بات تلگرام چیست؟", answer: "بات تلگرام یک برنامه خودکار است که در تلگرام کار می‌کند و می‌تواند وظایف مختلفی مانند انتشار محتوا، پاسخگویی خودکار و مدیریت کانال را انجام دهد. بات‌ها از طریق API رسمی تلگرام ساخته می‌شوند." },
  { question: "آیا ساخت بات تلگرام دشوار است؟", answer: "با استفاده از پلتفرم‌هایی مانند آپلت، ساخت و مدیریت بات تلگرام بسیار ساده است و نیازی به دانش فنی ندارد. فقط کافی است بات را به کانال خود متصل کنید." },
  { question: "بات محتوا چیست و چگونه کار می‌کند؟", answer: "بات محتوا یک ربات هوشمند است که به کانال شما متصل می‌شود و به صورت خودکار اخبار و محتوای به‌روز را منتشر می‌کند. این بات‌ها می‌توانند از منابع مختلف محتوا جمع‌آوری و در زمان‌بندی مشخص منتشر کنند." },
  { question: "آیا بات‌ها قانونی هستند؟", answer: "بله، استفاده از بات‌های رسمی تلگرام کاملاً قانونی است. تلگرام خود API رسمی برای ساخت بات ارائه می‌دهد و بسیاری از کسب و کارها از بات‌ها استفاده می‌کنند." },
  { question: "هزینه استفاده از بات تلگرام چقدر است؟", answer: "هزینه بات‌ها بسته به نوع و امکانات متفاوت است. بات‌های پایه رایگان هستند، اما بات‌های حرفه‌ای مانند بات محتوای هوشمند آپلت دارای پلن‌های اشتراکی ماهانه هستند." },
  { question: "بات تلگرام چه تفاوتی با ادمین کانال دارد؟", answer: "بات تلگرام یک برنامه خودکار است که ۲۴ ساعته کار می‌کند و می‌تواند وظایف تکراری را بدون خستگی انجام دهد. ادمین کانال یک انسان است که محدود به زمان کاری است." },
  { question: "آیا بات‌ها امن هستند؟", answer: "بات‌های رسمی تلگرام از نظر امنیتی قابل اعتماد هستند. اما مهم است که فقط بات‌های معتبر و شناخته شده را به کانال خود متصل کنید و دسترسی‌های غیرضروری به آن‌ها ندهید." },
];

const botTypes = [
  { icon: Bot, title: "بات محتوا", description: "انتشار خودکار اخبار، مقالات و محتوای به‌روز در کانال. مناسب برای کانال‌های خبری و آموزشی.", color: "from-[#3B82F6] to-[#10B981]" },
  { icon: Zap, title: "بات پشتیبانی", description: "پاسخگویی خودکار به سوالات مشتریان و راهنمایی آن‌ها. مناسب برای کسب و کارهای خدماتی.", color: "from-[#F59E0B] to-[#D97706]" },
  { icon: Settings, title: "بات مدیریت", description: "مدیریت خودکار کانال شامل حذف اسپام، خوشامدگویی اعضا و تنظیمات کانال.", color: "from-[#8B5CF6] to-[#6D28D9]" },
  { icon: TrendingUp, title: "بات فروش", description: "فروش محصولات و خدمات از طریق تلگرام با پرداخت آنلاین و مدیریت سفارشات.", color: "from-[#EF4444] to-[#DC2626]" },
];

const advantages = [
  "فعالیت ۲۴ ساعته بدون وقفه",
  "پاسخگویی فوری به پیام‌ها",
  "کاهش هزینه‌های نیروی انسانی",
  "عدم خطا و اشتباه انسانی",
  "مدیریت همزمان چند کانال",
  "گزارش‌گیری و تحلیل خودکار",
];

const steps = [
  { step: "۱", title: "هدف بات را مشخص کنید", text: "آیا بات برای محتوا، پشتیبانی، فروش یا مدیریت نیاز دارید؟ تعیین هدف اولین قدم است." },
  { step: "۲", title: "پلتفرم مناسب انتخاب کنید", text: "از پلتفرم‌هایی مانند آپلت استفاده کنید که بدون کدنویسی بات بسازید." },
  { step: "۳", title: "بات را به کانال متصل کنید", text: "بات را به کانال یا گروه تلگرامی خود اضافه کنید و دسترسی‌های لازم را بدهید." },
  { step: "۴", title: "تنظیمات را پیکربندی کنید", text: "زمان‌بندی انتشار، نوع محتوا و سایر تنظیمات مورد نیاز را مشخص کنید." },
  { step: "۵", title: "عملکرد را رصد کنید", text: "عملکرد بات را به طور مستمر بررسی و بهینه‌سازی کنید." },
];

const tips = [
  { title: "از بات‌های رسمی استفاده کنید", text: "فقط بات‌هایی که از API رسمی تلگرام استفاده می‌کنند امن و قابل اعتماد هستند." },
  { title: "دسترسی‌ها را محدود کنید", text: "فقط دسترسی‌های ضروری را به بات بدهید و از دادن دسترسی مدیر کل به بات‌های غیرضروری خودداری کنید." },
  { title: "محتوای با کیفیت تولید کنید", text: "بات فقط ابزار است. کیفیت محتوایی که منتشر می‌کند بستگی به تنظیمات و منابع شما دارد." },
  { title: "عملکرد را پیگیری کنید", text: "از آمار و گزارش‌های بات برای بهینه‌سازی عملکرد استفاده کنید." },
];

const mistakes = [
  "استفاده از بات‌های غیررسمی و ناشناخته",
  "دادن دسترسی‌های غیرضروری به بات",
  "عدم پیگیری عملکرد بات پس از راه‌اندازی",
  "انتشار محتوای تکراری و بی‌ارزش",
  "عدم به‌روزرسانی تنظیمات بات",
];

export default function TelegramBotPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#3B82F6]/7 via-[#3B82F6]/2 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#10B981]/5 via-[#10B981]/1 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #3B82F6 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-3.5 py-1.5 mb-6">
              <Bot className="h-3.5 w-3.5 text-[#3B82F6]" />
              <span className="text-xs font-semibold text-[#3B82F6]">بات تلگرام</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
              بات‌های <span className="bg-gradient-to-l from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">تلگرام</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              با بات‌های هوشمند تلگرام، کسب و کار خود را خودکار کنید و در زمان صرفه‌جویی کنید.
              بات‌ها ۲۴ ساعته بدون وقفه کار می‌کنند.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                ایجاد بات
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/pricing/" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200">
                مشاهده تعرفه‌ها
              </Link>
            </div>
          </div>
        </section>

        {/* What is Telegram Bot */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
            بات تلگرام چیست؟
          </h2>
          <div className="prose-custom text-text-secondary leading-relaxed space-y-4">
            <p>
              بات تلگرام (Telegram Bot) یک برنامه خودکار است که در پیام‌رسان تلگرام کار می‌کند و می‌تواند وظایف مختلفی را بدون نیاز به دخالت انسان انجام دهد. تلگرام خود API رسمی برای ساخت بات ارائه می‌دهد که به توسعه‌دهندگان اجازه می‌دهد بات‌های هوشمندی بسازند.
            </p>
            <p>
              بات‌های تلگرام می‌توانند پاسخ خودکار به پیام‌ها بدهند، محتوا منتشر کنند، فرآیندهای تکراری را خودکار کنند و حتی فروش محصولات و خدمات را مدیریت کنند. برخلاف ادمین‌های انسانی، بات‌ها ۲۴ ساعته، ۷ روز هفته بدون خستگی کار می‌کنند.
            </p>
            <p>
              یکی از محبوب‌ترین انواع بات‌ها، <strong>بات محتوا</strong> است که به کانال تلگرامی متصل می‌شود و به صورت خودکار اخبار، مقالات و محتوای به‌روز را در زمان‌بندی مشخص منتشر می‌کند. این بات‌ها برای کانال‌های خبری، آموزشی و تجاری بسیار مفید هستند.
            </p>
          </div>
        </section>

        {/* Bot Types */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            انواع بات‌های تلگرام
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {botTypes.map((type) => (
              <div key={type.title} className="rounded-2xl border border-border/40 bg-surface p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} text-white mb-4`}>
                  <type.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{type.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            مزایای استفاده از بات تلگرام
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
            راهنمای گام‌به‌گام راه‌اندازی بات
          </h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4 rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-l from-[#3B82F6] to-[#10B981] text-white text-sm font-bold">
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
            نکات حرفه‌ای استفاده از بات
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

        {/* Mistakes */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-[#EF4444]" />
            اشتباهات رایج در استفاده از بات
          </h2>
          <div className="space-y-3">
            {mistakes.map((mistake, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/15 p-4">
                <AlertTriangle className="h-5 w-5 text-[#EF4444] shrink-0" />
                <span className="text-sm text-text-secondary">{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Topics */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            موضوعات مرتبط
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Bot, title: "اتوماسیون تلگرام", description: "خودکارسازی فرآیندهای تکراری.", href: "/telegram-automation/" },
              { icon: Settings, title: "مدیریت کانال", description: "مدیریت حرفه‌ای کانال.", href: "/telegram-channel/" },
              { icon: TrendingUp, title: "رشد کانال", description: "روش‌های رشد پایدار.", href: "/telegram-growth/" },
            ].map((topic) => (
              <Link key={topic.title} href={topic.href} className="group rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/25 hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6]/15 to-[#10B981]/15 text-[#3B82F6] mb-5 group-hover:scale-110 transition-transform duration-300">
                  <topic.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-2">{topic.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{topic.description}</p>
              </Link>
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
