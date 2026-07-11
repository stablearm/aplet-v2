import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Target, BarChart3, ArrowLeft, CheckCircle, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "تبلیغات تلگرام",
  description: "راهنمای جامع تبلیغات در تلگرام. انواع تبلیغات، تعرفه، نکات بهینه و ابزارهای مورد نیاز برای تبلیغات مؤثر در تلگرام.",
  keywords: ["تبلیغات تلگرام", "تبلیغات در تلگرام", "هزینه تبلیغات تلگرام", "تبلیغات کانال تلگرام", "تبلیغات هدفمند تلگرام"],
};

const faqs = [
  { question: "تبلیغات تلگرام چیست؟", answer: "تبلیغات تلگرام به مجموعه‌ای از روش‌ها و استراتژی‌ها گفته می‌شود که کسب و کارها برای معرفی محصولات و خدمات خود در پیام‌رسان تلگرام استفاده می‌کنند. این تبلیغات شامل انتشار پست در کانال‌های پرمخاطب، استفاده از بات‌های تبلیغاتی و کمپین‌های عضوگیری است." },
  { question: "هزینه تبلیغات در تلگرام چقدر است؟", answer: "هزینه تبلیغات در تلگرام بسته به نوع تبلیغ، تعداد مخاطبان کانال و موضوع آن متفاوت است. به طور متوسط CPM (هزینه هر هزار بازدید) بین ۵۰ تا ۳۰۰ تومان است. برای کمپین عضوگیری، هزینه هر عضو واقعی حدود ۵۰۰ تومان است." },
  { question: "آیا تبلیغات در تلگرام مؤثر است؟", answer: "بله، تبلیغات در تلگرام به دلیل هزینه پایین و دسترسی به مخاطبان هدفمند، یکی از مؤثرترین روش‌های تبلیغات دیجیتال در ایران است. بیش از ۴۰ میلیون کاربر فعال ایرانی در تلگرام حضور دارند." },
  { question: "چگونه تبلیغات مؤثری در تلگرام داشته باشم؟", answer: "برای تبلیغات مؤثر، کانال‌های مرتبط با موضوع کسب و کار خود را انتخاب کنید، محتوای جذاب تولید کنید و عملکرد تبلیغات را به طور مستمر تحلیل کنید. استفاده از ابزارهای تحلیلی مانند آپلت به شما کمک می‌کند عملکرد کمپین‌ها را رصد کنید." },
  { question: "بهترین نوع تبلیغات در تلگرام چیست؟", answer: "بهترین نوع تبلیغات بسته به هدف شما متفاوت است. اگر هدف شما جذب عضو است، کمپین عضوگیری بهترین گزینه است. اگر هدف شما برندسازی است، پست‌های اسپانسرشیپ در کانال‌های بزرگ مؤثرتر هستند." },
  { question: "آیا تبلیغات تلگرام نسبت به اینستاگرام بهتر است؟", answer: "هر پلتفرم مزایای خود را دارد. تلگرام هزینه پایین‌تر، مخاطبان وفادارتر و امکان ارسال محتوا بدون محدودیت الگوریتمی دارد. اینستاگرام برای برندهای بصری مناسب‌تر است. ترکیب هر دو پلتفرم بهترین نتیجه را می‌دهد." },
  { question: "چه تعداد پست تبلیغاتی در هفته بفرستم؟", answer: "تعداد پست تبلیغاتی بسته به اندازه کانال و نوع محتوا متفاوت است. به طور کلی ۲ تا ۳ پست تبلیغاتی در هفته برای کانال‌های کوچک و ۵ تا ۱۰ پست برای کانال‌های بزرگ مناسب است." },
];

const adTypes = [
  { title: "پست اسپانسرشیپ", description: "انتشار پست تبلیغاتی در کانال‌های پرمخاطب. مناسب برای برندسازی و معرفی محصول.", color: "from-[#5B5FEF] to-[#3B82F6]" },
  { title: "کمپین عضوگیری", description: "جذب اعضای واقعی و هدفمند از طریق شبکه ناشران. مناسب برای رشد کانال.", color: "from-[#10B981] to-[#059669]" },
  { title: "تبلیغات در بات‌ها", description: "استفاده از بات‌های تلگرامی برای ارسال پیام تبلیغاتی به مخاطبان هدف.", color: "from-[#F59E0B] to-[#D97706]" },
  { title: "تبلیغات محتوایی", description: "تولید محتوای ارزشمند با پیام تبلیغاتی غیرمستقیم. مناسب برای جذب اعتماد.", color: "from-[#8B5CF6] to-[#6D28D9]" },
];

const advantages = [
  "هزینه پایین نسبت به سایر پلتفرم‌ها",
  "دسترسی به بیش از ۴۰ میلیون کاربر ایرانی",
  "عدم محدودیت الگوریتمی در انتشار محتوا",
  "امکان هدف‌گیری دقیق بر اساس موضوع کانال",
  "گزارش‌گیری دقیق از عملکرد تبلیغات",
  "امکان پیگیری نرخ تبدیل و بازگشت سرمایه",
];

const tips = [
  { title: "کانال مرتبط انتخاب کنید", text: "همیشه کانال‌هایی را انتخاب کنید که موضوعشان با کسب و کار شما مرتبط باشد. تبلیغ در کانال نامرتبط هزینه را هدر می‌دهد." },
  { title: "محتوای جذاب تولید کنید", text: "پست‌های تبلیغاتی باید ارزشمند و جذاب باشند. از تصاویر با کیفیت، متن کوتاه و CTA واضح استفاده کنید." },
  { title: "عملکرد را رصد کنید", text: "از ابزارهای تحلیلی برای اندازه‌گیری نرخ کلیک، نرخ تبدیل و بازگشت سرمایه استفاده کنید." },
  { title: "تست A/B انجام دهید", text: "چند نسخه مختلف از تبلیغات خود را تست کنید تا بهترین عملکرد را شناسایی کنید." },
];

const mistakes = [
  "تبلیغ در کانال‌های نامرتبط با موضوع کسب و کار",
  "استفاده از محتوای تکراری و خسته‌کننده",
  "عدم پیگیری و تحلیل عملکرد تبلیغات",
  "عدم در نظر گرفتن زمان مناسب انتشار",
  "بودجه‌بندی نادرست و عدم بهینه‌سازی هزینه‌ها",
];

export default function TelegramAdsPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/7 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#3B82F6]/5 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
              <Megaphone className="h-3.5 w-3.5 text-[#5B5FEF]" />
              <span className="text-xs font-semibold text-[#5B5FEF]">تبلیغات تلگرام</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
              تبلیغات مؤثر در <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              با تبلیغات هدفمند در تلگرام، مخاطبان واقعی جذب کنید و کسب و کار خود را رشد دهید.
              بیش از ۴۰ میلیون کاربر ایرانی در تلگرام منتظر شما هستند.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                شروع تبلیغات
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/tools/cpm-calculator/" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200">
                محاسبه CPM
              </Link>
            </div>
          </div>
        </section>

        {/* What is Telegram Advertising */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
            تبلیغات تلگرام چیست؟
          </h2>
          <div className="prose-custom text-text-secondary leading-relaxed space-y-4">
            <p>
              تبلیغات تلگرام مجموعه‌ای از روش‌ها و استراتژی‌هایی است که کسب و کارها برای معرفی محصولات، خدمات و برند خود در پیام‌رسان تلگرام استفاده می‌کنند. با بیش از ۴۰ میلیون کاربر فعال ایرانی، تلگرام یکی از بزرگ‌ترین پلتفرم‌های تبلیغات دیجیتال در ایران محسوب می‌شود.
            </p>
            <p>
              برخلاف شبکه‌های اجتماعی مانند اینستاگرام، تلگرام الگوریتمی برای محدود کردن نمایش محتوا ندارد. این یعنی پست‌های تبلیغاتی شما بدون هیچ محدودیتی به تمام مخاطبان کانال نمایش داده می‌شوند. این ویژگی باعث می‌شود تبلیغات در تلگرام نرخ بازدید و تعامل بالاتری نسبت به سایر پلتفرم‌ها داشته باشد.
            </p>
            <p>
              انواع اصلی تبلیغات در تلگرام شامل پست‌های اسپانسرشیپ در کانال‌ها، کمپین‌های عضوگیری، تبلیغات در بات‌ها و تبلیغات محتوایی است. هر کدام از این روش‌ها مزایا و معایب خاص خود را دارند و بسته به هدف کسب و کار شما انتخاب می‌شوند.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <div className="rounded-2xl border border-[#5B5FEF]/15 bg-gradient-to-br from-[#5B5FEF]/5 to-[#3B82F6]/3 p-8">
            <h2 className="text-xl font-extrabold text-text-primary mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#5B5FEF]" />
              آمار تبلیغات تلگرام در ایران
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#5B5FEF] mb-1">۴۰+ میلیون</p>
                <p className="text-sm text-text-secondary">کاربر فعال ایرانی</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#3B82F6] mb-1">۵۰-۳۰۰ تومان</p>
                <p className="text-sm text-text-secondary">هزینه هر هزار بازدید (CPM)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#10B981] mb-1">۳-۵ برابر</p>
                <p className="text-sm text-text-secondary">بازگشت سرمایه نسبت به اینستاگرام</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Types */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            انواع تبلیغات در تلگرام
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {adTypes.map((type) => (
              <div key={type.title} className="rounded-2xl border border-border/40 bg-surface p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} text-white mb-4`}>
                  <Megaphone className="h-5 w-5" />
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
            مزایای تبلیغات در تلگرام
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

        {/* How to Start */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            راهنمای گام‌به‌گام شروع تبلیغات
          </h2>
          <div className="space-y-4">
            {[
              { step: "۱", title: "هدف خود را مشخص کنید", text: "آیا هدف شما جذب عضو، برندسازی یا فروش مستقیم است؟ تعیین هدف به شما کمک می‌کند نوع تبلیغات و بودجه مناسب را انتخاب کنید." },
              { step: "۲", title: "بودجه‌بندی کنید", text: "بر اساس هدف خود بودجه مشخصی تعیین کنید. برای شروع، با بودجه کم شروع کنید و عملکرد را بسنجید." },
              { step: "۳", title: "کانال‌های مناسب پیدا کنید", text: "کانال‌هایی را پیدا کنید که موضوعشان با کسب و کار شما مرتبط است و مخاطبان فعال دارند." },
              { step: "۴", title: "محتوای جذاب تولید کنید", text: "پست‌های تبلیغاتی جذاب و ارزشمند تولید کنید. از تصاویر با کیفیت و متن کوتاه استفاده کنید." },
              { step: "۵", title: "کمپین را اجرا کنید", text: "تبلیغات خود را اجرا کنید و عملکرد آن را به طور مستمر رصد و بهینه‌سازی کنید." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white text-sm font-bold">
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
            نکات حرفه‌ای تبلیغات در تلگرام
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
            اشتباهات رایج در تبلیغات تلگرام
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

        {/* Related Tools */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            ابزارهای مرتبط
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "محاسبه CPM", href: "/tools/cpm-calculator/", desc: "هزینه هر هزار بازدید را محاسبه کنید" },
              { title: "محاسبه ROI", href: "/tools/roi-calculator/", desc: "بازگشت سرمایه تبلیغات را بسنجید" },
              { title: "محاسبه تعامل", href: "/tools/engagement-calculator/", desc: "نرخ تعامل کانال را اندازه‌گیری کنید" },
            ].map((tool) => (
              <Link key={tool.title} href={tool.href} className="group rounded-2xl border border-border/40 bg-surface p-5 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/25 transition-all duration-300 text-center">
                <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-1">{tool.title}</h3>
                <p className="text-xs text-text-secondary">{tool.desc}</p>
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
