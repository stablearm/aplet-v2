import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  BarChart3,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Lightbulb,
  MessageCircle,
  Shield,
  Zap,
  Globe,
  Target,
  BarChart,
  Calculator,
  Activity,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "بازاریابی تلگرام",
  description: "راهنمای جامع بازاریابی در تلگرام. استراتژی محتوا، جذب مخاطب، تبلیغات و تحلیل عملکرد برای رشد کسب و کار شما.",
  keywords: ["بازاریابی تلگرام", "تبلیغات تلگرام", "جذب مخاطب تلگرام", "مدیریت کانال تلگرام"],
};

const faqs = [
  { question: "بازاریابی تلگرام چیست؟", answer: "بازاریابی تلگرام مجموعه‌ای از استراتژی‌ها و تکنیک‌هایی است که کسب و کارها برای جذب مخاطب و افزایش فروش در پیام‌رسان تلگرام استفاده می‌کنند." },
  { question: "آیا بازاریابی در تلگرام رایگان است؟", answer: "شروع بازاریابی ارگانیک در تلگرام رایگان است، اما برای نتایج سریع‌تر می‌توان از تبلیغات پولی و کمپین‌های عضوگیری استفاده کرد." },
  { question: "چگونه در تلگرام مشتری جذب کنیم؟", answer: "با تولید محتوای با کیفیت، تعامل مستمر با مخاطبان، استفاده از تبلیغات هدفمند و بهینه‌سازی کانال خود می‌توانید مشتری جذب کنید." },
  { question: "آیا تلگرام برای کسب و کارهای کوچک مناسب است؟", answer: "بله، تلگرام یکی از بهترین پلتفرم‌ها برای کسب و کارهای کوچک و متوسط در ایران است. هزینه‌های پایین، دسترسی آسان و امکانات گسترده بازاریابی آن را به انتخابی ایده‌آل تبدیل کرده است." },
  { question: "تفاوت تبلیغات در تلگرام با اینستاگرام چیست؟", answer: "تبلیغات در تلگرام معمولاً هزینه کمتری دارد و نرخ تعامل بالاتری دارد، به ویژه برای کسب و کارهای B2B. اینستاگرام برای برندسازی بصری بهتر است اما تلگرام برای محتوای تخصصی و فروش مستقیم مؤثرتر عمل می‌کند." },
  { question: "چگونه موفقیت کمپین تلگرامی را بسنجیم؟", answer: "از معیارهایی مانند نرخ بازدید پست‌ها، نرخ تعامل، تعداد کلیک‌ها، نرخ تبدیل و بازگشت سرمایه (ROI) استفاده کنید. ابزارهای تحلیلی مانند CPM Calculator و Engagement Calculator کمک‌کننده هستند." },
  { question: "آیا نیاز به تیم تخصصی برای بازاریابی تلگرام دارم؟", answer: "برای شروع نه، اما برای رشد جدی و حرفه‌ای بهتر است با یک تیم یا مشاور متخصص همکاری کنید. مدیریت مداوم محتوا، تبلیغات و تعامل با مخاطبان نیاز به وقت و تخصص دارد." },
  { question: "هر چند وقت یکبار باید در کانال تلگرام پست بگذارم؟", answer: "حداقل یک تا دو پست در روز برای حفظ تعامل مخاطبان ضروری است. برای کانال‌های حرفه‌ای، ۲ تا ۳ پست در روز با محتوای متنوع بهترین نتیجه را می‌دهد." },
];

const topics = [
  { icon: BookOpen, title: "استراتژی محتوا", description: "تولید محتوای ارزشمند و هدفمند برای جذب و حفظ مخاطبان.", href: "/guides/" },
  { icon: Users, title: "جذب مخاطب", description: "روش‌های ارگانیک و پولی برای افزایش اعضای کانال.", href: "/blog/how-to-buy-telegram-members/" },
  { icon: TrendingUp, title: "رشد کانال", description: "تکنیک‌های رشد پایدار و طبیعی کانال تلگرام.", href: "/telegram-growth/" },
  { icon: BarChart3, title: "تحلیل عملکرد", description: "اندازه‌گیری و بهینه‌سازی عملکرد بازاریابی.", href: "/telegram-analytics/" },
];

const advantages = [
  { icon: Users, title: "دسترسی به میلیون‌ها کاربر", description: "تلگرام با بیش از ۹۰ میلیون کاربر فعال در ایران، بزرگ‌ترین پلتفرم ارتباطی کشور است." },
  { icon: Shield, title: "امنیت و حریم خصوصی", description: "امنیت بالا و رمزنگاری پیشرفته باعث اعتماد بیشتر کاربران به محتوای کسب و کار شما می‌شود." },
  { icon: Zap, title: "سرعت انتشار محتوا", description: "محتوا در کسری از ثانیه به هزاران نفر می‌رسد و نرخ بازدید بسیار بالاتر از شبکه‌های اجتماعی دیگر است." },
  { icon: Globe, title: "هزینه پایین", description: "ایجاد و مدیریت کانال تلگرام کاملاً رایگان است و هزینه تبلیغات بسیار کمتر از سایر پلتفرم‌هاست." },
  { icon: Target, title: "هدفمندسازی دقیق", description: "امکان دسته‌بندی مخاطبان و ارسال محتوای متناسب با نیاز هر گروه به صورت خودکار." },
  { icon: BarChart, title: "تحلیل دقیق عملکرد", description: "ابزارهای تحلیلی قدرتمند برای اندازه‌گیری نرخ تعامل، بازدید و تبدیل مخاطبان." },
];

const steps = [
  { number: "۱", title: "ایجاد کانال حرفه‌ای", description: "یک کانال تلگرام با نام تجاری مناسب، لوگوی حرفه‌ای و توضیحات جذاب ایجاد کنید." },
  { number: "۲", title: "تعریف استراتژی محتوا", description: "مشخص کنید چه نوع محتوایی تولید می‌کنید، با چه فرکانسی و برای چه مخاطبی." },
  { number: "۳", title: "تولید و انتشار محتوا", description: "محتوای ارزشمند، متنوع و منظم تولید کنید و آن را در بهترین زمان‌ها منتشر کنید." },
  { number: "۴", title: "جذب مخاطب", description: "از روش‌های ارگانیک مانند تولید محتوای با کیفیت و روش‌های پولی مانند تبلیغات استفاده کنید." },
  { number: "۵", title: "تحلیل و بهینه‌سازی", description: "عملکرد خود را بسنجید، بازخورد مخاطبان را بررسی کنید و استراتژی خود را بهبود دهید." },
];

const tips = [
  { icon: Lightbulb, title: "محتوای ارزشمند تولید کنید", description: "محتوایی که مشکل مخاطبان را حل کند، همیشه بازخورد بهتری دریافت می‌کند. به جای تبلیغات صرف، ارزش واقعی ارائه دهید." },
  { icon: MessageCircle, title: "با مخاطبان تعامل کنید", description: "به سوالات و نظرات پاسخ دهید، نظرسنجی برگزار کنید و مخاطبان را در تولید محتوا مشارکت دهید." },
  { icon: TrendingUp, title: "از تبلیغات هدفمند استفاده کنید", description: "تبلیغات خود را بر اساس علاقه‌مندی‌ها و رفتار مخاطبان هدفمند کنید تا بازگشت سرمایه بالاتری داشته باشید." },
  { icon: Shield, title: "اعتمادسازی کنید", description: "محتوای صادقانه و شفاف منتشر کنید، نظرات مشتریان را به اشتراک بگذارید و پشتیبانی سریع ارائه دهید." },
];

const tools = [
  { icon: Calculator, title: "محاسبه‌گر CPM", description: "هزینه هر هزار بازدید تبلیغات خود را محاسبه کنید.", href: "/tools/cpm-calculator/" },
  { icon: Activity, title: "محاسبه‌گر تعامل", description: "نرخ تعامل کانال و کمپین‌های خود را اندازه‌گیری کنید.", href: "/tools/engagement-calculator/" },
  { icon: TrendingUp, title: "محاسبه‌گر بازگشت سرمایه", description: "ROI کمپین‌های تبلیغاتی خود را محاسبه و بهینه‌سازی کنید.", href: "/tools/roi-calculator/" },
];

export default function TelegramMarketingPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/5 px-4 py-1.5 mb-8">
            <TrendingUp className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">بازاریابی تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            بازاریابی حرفه‌ای در <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با استراتژی‌های مؤثر بازاریابی در تلگرام، کسب و کار خود را متحول کنید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع کنید
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        {/* بازاریابی تلگرام چیست؟ */}
        <section className="container mx-auto px-4 pb-24 max-w-4xl">
          <div className="rounded-2xl border border-border/50 bg-surface p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">بازاریابی تلگرام چیست؟</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                بازاریابی تلگرام به مجموعه‌ای از استراتژی‌ها، تکنیک‌ها و فعالیت‌هایی اطلاق می‌شود که کسب و کارها و برندها برای جذب مخاطب، افزایش آگاهی از برند و رشد فروش از طریق پیام‌رسان تلگرام به کار می‌گیرند. تلگرام به عنوان محبوب‌ترین پیام‌رسان در ایران با بیش از ۹۰ میلیون کاربر فعال، بستری بی‌نظیر برای دسترسی مستقیم به مخاطبان هدف فراهم کرده است.
              </p>
              <p>
                برخلاف شبکه‌های اجتماعی مانند اینستاگرام که الگوریتم‌های پیچیده‌ای برای نمایش محتوا دارند، تلگرام امکان ارتباط مستقیم و بدون واسطه با مخاطبان را فراهم می‌کند. وقتی کاربری عضو کانال تلگرام شماست، هر پستی که منتشر کنید مستقیماً برای او نمایش داده می‌شود. این ویژگی باعث می‌شود نرخ بازدید محتوا در تلگرام به طور قابل توجهی بالاتر از سایر پلتفرم‌ها باشد.
              </p>
              <p>
                بازاریابی تلگرام شامل بخش‌های متنوعی از جمله تولید محتوا، مدیریت کانال، تبلیغات پولی، بازاریابی ربات‌ها، کمپین‌های عضوگیری و تحلیل عملکرد می‌شود. هر یک از این بخش‌ها نقش مهمی در موفقیت استراتژی بازاریابی شما ایفا می‌کنند و استفاده هماهنگ از آن‌ها می‌تواند نتایج چشمگیری برای کسب و کار شما به همراه داشته باشد.
              </p>
              <p>
                در مقایسه با سایر پلتفرم‌ها، تلگرام مزیت‌های منحصربه‌فردی دارد: هزینه‌های پایین‌تر تبلیغات، امکان ارسال فایل‌های بزرگ تا ۲ گیگابایت، پشتیبانی از ربات‌های هوشمند، امکان ایجاد گروه‌های بزرگ تا ۲۰۰ هزار نفره و امنیت بالای رمزنگاری. این ویژگی‌ها تلگرام را به یکی از قدرتمندترین ابزارهای بازاریابی دیجیتال در ایران تبدیل کرده است.
              </p>
            </div>
          </div>
        </section>

        {/* مزایای بازاریابی در تلگرام */}
        <section className="container mx-auto px-4 pb-24">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">مزایای بازاریابی در تلگرام</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 text-[#5B5FEF] shrink-0">
                    <advantage.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">{advantage.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* راهنمای گام‌به‌گام */}
        <section className="container mx-auto px-4 pb-24 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">راهنمای گام‌به‌گام شروع بازاریابی تلگرام</h2>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-6 rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF] to-[#3B82F6] text-white text-lg font-bold shrink-0">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* نکات حرفه‌ای */}
        <section className="container mx-auto px-4 pb-24 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">نکات حرفه‌ای</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-border/50 bg-surface p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 text-[#5B5FEF] shrink-0">
                    <tip.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">{tip.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ابزارهای مرتبط */}
        <section className="container mx-auto px-4 pb-24 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">ابزارهای مرتبط</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.title} href={tool.href} className="group rounded-2xl border border-border/50 bg-surface p-6 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 text-[#5B5FEF] shrink-0">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-1">{tool.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Topics Grid */}
        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {topics.map((topic) => (
              <Link key={topic.title} href={topic.href} className="group rounded-2xl border border-border/50 bg-surface p-6 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 text-[#5B5FEF] shrink-0">
                    <topic.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-1">{topic.title}</h3>
                    <p className="text-sm text-text-secondary">{topic.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <CtaBanner />
        </section>
      </main>
    </>
  );
}
