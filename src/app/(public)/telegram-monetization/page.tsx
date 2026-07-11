import type { Metadata } from "next";
import Link from "next/link";
import { Wallet, DollarSign, TrendingUp, ArrowLeft, CheckCircle, Lightbulb, AlertTriangle } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "کسب درآمد از تلگرام",
  description: "راهنمای جامع کسب درآمد از تلگرام. روش‌های مختلف درآمدزایی شامل اسپانسرشیپ، کمپین عضوگیری، فروش محصولات و بات‌های هوشمند.",
  keywords: ["کسب درآمد از تلگرام", "درآمدزایی تلگرام", "کسب درآمد تلگرام", "درآمد از کانال تلگرام", " monetization تلگرام"],
};

const faqs = [
  { question: "آیا می‌توان از تلگرام درآمد کسب کرد؟", answer: "بله، با داشتن کانال موفق و استراتژی مناسب می‌توانید درآمد قابل توجهی از تلگرام کسب کنید. روش‌های مختلفی برای درآمدزایی از تلگرام وجود دارد." },
  { question: "حداقل تعداد اعضا برای درآمدزایی چقدر است؟", answer: "هیچ حداقل مشخصی وجود ندارد، اما کانال‌های با بیش از ۱۰۰۰ عضو فعال معمولاً درآمد بهتری دارند. کیفیت محتوا و تعامل مخاطبان مهم‌تر از تعداد اعضا است." },
  { question: "نرخ درآمدزایی در آپلت چقدر است؟", answer: "در آپلت، ناشران به ازای هر عضو جذب شده از طریق کمپین اسپانسرشیپ، ۴۰۰ تومان درآمد کسب می‌کنند. این نرخ برای تمام کمپین‌ها یکسان است." },
  { question: "بهترین روش کسب درآمد از تلگرام چیست؟", answer: "بهترین روش بسته به نوع کانال شما متفاوت است. ترکیب چند روش درآمدزایی مانند اسپانسرشیپ، کمپین عضوگیری و فروش محصولات بهترین نتیجه را می‌دهد." },
  { question: "چگونه درآمد خود را برداشت کنیم؟", answer: "در آپلت، پس از رسیدن موجودی به حداقل مبلغ برداشت (۱,۰۰۰,۰۰۰ تومان)، می‌توانید درآمد خود را به حساب بانکی یا کیف پول TON برداشت کنید." },
  { question: "آیا درآمد تلگرام پایدار است؟", answer: "بله، اگر استراتژی درستی داشته باشید و محتوای با کیفیت تولید کنید، درآمد تلگرام می‌تواند پایدار و مستمر باشد. تنوع بخشی به منابع درآمد مهم است." },
  { question: "چه مدت زمانی طول می‌کشد تا از تلگرام درآمد کسب کنیم؟", answer: "بسته به اندازه کانال و استراتژی شما، ممکن است از چند هفته تا چند ماه طول بکشد. کانال‌های بزرگ‌تر سریع‌تر به درآمد می‌رسند." },
];

const methods = [
  { icon: DollarSign, title: "اسپانسرشیپ", description: "فضای تبلیغاتی کانال خود را به برندها و کسب و کارها بفروشید. قیمت بر اساس تعداد اعضا و نرخ تعامل تعیین می‌شود.", color: "from-[#F59E0B] to-[#D97706]" },
  { icon: TrendingUp, title: "کمپین عضوگیری", description: "از طریق کمپین‌های عضوگیری آپلت به ازای هر عضو جذب شده ۴۰۰ تومان درآمد کسب کنید.", color: "from-[#10B981] to-[#059669]" },
  { icon: Wallet, title: "فروش محصولات", description: "محصولات و خدمات خود را مستقیماً از طریق تلگرام بفروشید. از بات‌های فروشگاهی استفاده کنید.", color: "from-[#8B5CF6] to-[#6D28D9]" },
  { icon: DollarSign, title: "خدمات مشاوره", description: "مشاوره تخصصی در حوزه فعالیت خود ارائه دهید و از طریق تلگرام دریافت هزینه کنید.", color: "from-[#3B82F6] to-[#06B6D4]" },
];

const advantages = [
  "هزینه راه‌اندازی بسیار پایین",
  "دسترسی به میلیون‌ها کاربر ایرانی",
  "عدم نیاز به سرمایه اولیه زیاد",
  "امکان کسب درآمد غیرفعال",
  "مقیاس‌پذیری بالا",
  "تنوع منابع درآمد",
];

const steps = [
  { step: "۱", title: "کانال خود را بسازید", text: "یک کانال تلگرامی با موضوع مشخص ایجاد کنید و محتوای ارزشمند منتشر کنید." },
  { step: "۲", title: "مخاطبان جذب کنید", text: "با تولید محتوای با کیفیت و تبلیغات هدفمند مخاطبان واقعی جذب کنید." },
  { step: "۳", title: "به آپلت متصل شوید", text: "کانال خود را به آپلت متصل کنید تا بتوانید کمپین‌های اسپانسرشیپ دریافت کنید." },
  { step: "۴", title: "درآمد کسب کنید", text: "با اجرای کمپین‌ها و دریافت اسپانسرشیپ، درآمد خود را افزایش دهید." },
  { step: "۵", title: "درآمد خود را برداشت کنید", text: "پس از رسیدن به حداقل مبلغ برداشت، درآمد خود را دریافت کنید." },
];

const tips = [
  { title: "محتوای با کیفیت تولید کنید", text: "محتوای ارزشمند و منظم تولید کنید تا مخاطبان وفادار بمانند و تعامل داشته باشند." },
  { title: "تنویع درآمد داشته باشید", text: "از چند منبع درآمد مختلف استفاده کنید تا ریسک کاهش یابد." },
  { title: "عملکرد را رصد کنید", text: "آمار کانال خود را به طور مستمر بررسی و استراتژی خود را بهینه‌سازی کنید." },
  { title: "با مخاطبان تعامل کنید", text: "به نظرات و پیام‌های مخاطبان پاسخ دهید تا وفاداری آن‌ها افزایش یابد." },
];

const mistakes = [
  "تمرکز فقط بر تعداد اعضا بدون توجه به کیفیت",
  "عدم تنوع در منابع درآمد",
  "تبلیغات بیش از حد و خسته‌کننده",
  "عدم پیگیری آمار و عملکرد",
  "عدم به‌روزرسانی منظم محتوا",
];

export default function TelegramMonetizationPage() {
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
              <Wallet className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span className="text-xs font-semibold text-[#F59E0B]">کسب درآمد از تلگرام</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
              کسب درآمد از <span className="bg-gradient-to-l from-[#F59E0B] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              با روش‌های مختلف درآمدزایی، از کانال تلگرام خود درآمد پایدار کسب کنید.
              از اسپانسرشیپ تا فروش محصولات، فرصت‌های بی‌شماری منتظر شماست.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                شروع درآمدزایی
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/tools/income-calculator/" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200">
                محاسبه درآمد
              </Link>
            </div>
          </div>
        </section>

        {/* What is Monetization */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
            کسب درآمد از تلگرام چیست؟
          </h2>
          <div className="prose-custom text-text-secondary leading-relaxed space-y-4">
            <p>
              کسب درآمد از تلگرام به مجموعه‌ای از روش‌ها و استراتژی‌ها گفته می‌شود که از طریق آن‌ها می‌توانید از کانال یا گروه تلگرامی خود درآمد کسب کنید. با بیش از ۴۰ میلیون کاربر فعال ایرانی، تلگرام یکی از بزرگ‌ترین بازارهای دیجیتال ایران محسوب می‌شود.
            </p>
            <p>
              روش‌های مختلفی برای درآمدزایی از تلگرام وجود دارد: فروش فضای تبلیغاتی (اسپانسرشیپ)، اجرای کمپین‌های عضوگیری، فروش محصولات و خدمات، ارائه مشاوره تخصصی و راه‌اندازی بات‌های فروشگاهی. هر کدام از این روش‌ها مزایا و چالش‌های خاص خود را دارند.
            </p>
            <p>
              نکته مهم این است که کسب درآمد موفق از تلگرام نیازمند صبر، تولید محتوای با کیفیت و استراتژی مناسب است. کانال‌هایی که محتوای ارزشمند و منظم تولید می‌کنند، معمولاً درآمد پایدارتری دارند.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <div className="rounded-2xl border border-[#F59E0B]/15 bg-gradient-to-br from-[#F59E0B]/5 to-[#3B82F6]/3 p-8">
            <h2 className="text-xl font-extrabold text-text-primary mb-6">آمار درآمدزایی از تلگرام</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#F59E0B] mb-1">۴۰۰ تومان</p>
                <p className="text-sm text-text-secondary">درآمد به ازای هر عضو در آپلت</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#3B82F6] mb-1">۱,۰۰۰,۰۰۰ تومان</p>
                <p className="text-sm text-text-secondary">حداقل مبلغ برداشت</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#10B981] mb-1">۲۴ ساعته</p>
                <p className="text-sm text-text-secondary">درآمد غیرفعال</p>
              </div>
            </div>
          </div>
        </section>

        {/* Methods */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            روش‌های کسب درآمد از تلگرام
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {methods.map((method) => (
              <div key={method.title} className="rounded-2xl border border-border/40 bg-surface p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${method.color} text-white mb-4`}>
                  <method.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{method.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            راهنمای گام‌به‌گام شروع درآمدزایی
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
            نکات حرفه‌ای درآمدزایی
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
            اشتباهات رایج در درآمدزایی
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
