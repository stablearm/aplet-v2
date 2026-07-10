import type { Metadata } from "next";
import Link from "next/link";
import { Check, Crown, Bot, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "تعرفه بات محتوا",
  description: "تعرفه اشتراک بات محتوای هوشمند آپلت. پلن‌های ماهانه، ۳ ماهه و سالانه برای انتشار خودکار محتوا در کانال تلگرامی.",
};

const plans = [
  {
    name: "آزمایشی",
    price: "رایگان",
    period: "۷ روز",
    description: "برای آشنایی با بات محتوا",
    features: [
      "اتصال ۱ کانال",
      "انتشار خودکار اخبار",
      "محتوای هوش مصنوعی",
      "پنل مدیریت ساده",
    ],
    cta: "شروع رایگان",
    href: "/register",
    popular: false,
  },
  {
    name: "ماهانه",
    price: "۱۹۹,۰۰۰",
    period: "ماهانه",
    description: "مناسب برای شروع",
    features: [
      "اتصال ۱ کانال",
      "انتشار خودکار اخبار و محتوا",
      "محتوای هوش مصنوعی",
      "برنامه‌ریزی زمانبندی انتشار",
      "پنل مدیریت پیشرفته",
      "پشتیبانی",
    ],
    cta: "انتخاب پلن",
    href: "/register",
    popular: false,
  },
  {
    name: "سه‌ماهه",
    price: "۴۹۹,۰۰۰",
    period: "۳ ماه",
    description: "محبوب‌ترین — صرفه‌جویی ۱۶٪",
    features: [
      "اتصال ۱ کانال",
      "انتشار خودکار اخبار و محتوا",
      "محتوای هوش مصنوعی",
      "برنامه‌ریزی زمانبندی انتشار",
      "پنل مدیریت پیشرفته",
      "پشتیبانی اولویت‌دار",
    ],
    cta: "انتخاب پلن",
    href: "/register",
    popular: true,
  },
  {
    name: "سالانه",
    price: "۱,۴۹۹,۰۰۰",
    period: "سالانه",
    description: "بهترین قیمت — صرفه‌جویی ۳۷٪",
    features: [
      "اتصال ۱ کانال",
      "انتشار خودکار اخبار و محتوا",
      "محتوای هوش مصنوعی",
      "برنامه‌ریزی زمانبندی انتشار",
      "پنل مدیریت پیشرفته",
      "پشتیبانی اختصاصی",
    ],
    cta: "انتخاب پلن",
    href: "/register",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] rounded-full bg-[#5B5FEF]/[0.06] blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full bg-[#10B981]/[0.04] blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-3.5 py-1.5 mb-6">
            <Bot className="h-3.5 w-3.5 text-[#10B981]" />
            <span className="text-xs font-semibold text-[#10B981]">بات محتوای هوشمند</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            کانال خود را <span className="bg-gradient-to-l from-[#10B981] to-[#059669] bg-clip-text text-transparent">همیشه زنده</span> نگه دارید
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            بات هوشمند محتوا به کانال شما متصل می‌شود و به صورت خودکار
            اخبار و محتوای به‌روز را منتشر می‌کند. هرچه مدت اشتراک بیشتر باشد، قیمت کمتر می‌شود.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-7 bg-surface shadow-sm hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? "border-[#10B981] shadow-lg ring-1 ring-[#10B981]/20 scale-[1.02]"
                  : "border-border/40 hover:border-[#10B981]/20 hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-l from-[#10B981] to-[#059669] px-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-[#10B981]/30">
                    <Crown className="h-3 w-3" />
                    محبوب‌ترین
                  </span>
                </div>
              )}
              <h3 className="font-bold text-lg text-text-primary mb-1">{plan.name}</h3>
              <p className="text-sm text-text-secondary mb-5">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-text-primary">{plan.price}</span>
                {plan.price !== "رایگان" && (
                  <span className="text-sm text-text-tertiary mr-1">تومان</span>
                )}
                <span className="text-sm text-text-tertiary block mt-0.5"> / {plan.period}</span>
              </div>
              <ul className="space-y-3 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10">
                      <Check className="h-3 w-3 text-success" />
                    </span>
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block w-full text-center h-11 rounded-xl text-sm font-bold transition-all duration-200 leading-11 ${
                  plan.popular
                    ? "bg-gradient-to-l from-[#10B981] to-[#059669] text-white shadow-lg shadow-[#10B981]/25 hover:shadow-xl hover:shadow-[#10B981]/35"
                    : "border border-border/60 bg-surface text-text-primary hover:bg-surface-elevated hover:border-[#10B981]/30"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Note about member purchase */}
        <div className="mt-12 rounded-2xl border border-border/40 bg-surface-elevated/50 p-6 text-center">
          <p className="text-sm text-text-secondary mb-2">
            برای <strong className="text-text-primary">خرید عضو</strong> و اجرای کمپین عضوگیری، هزینه بر اساس تعداد اعضای درخواستی و صورتحساب سفارشی محاسبه می‌شود.
          </p>
          <Link href="/register" className="text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1">
            شروع کنید
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* FAQ teaser */}
        <div className="mt-10 text-center">
          <p className="text-sm text-text-tertiary">
            سوالی دارید؟{" "}
            <a href="/faq/" className="text-primary font-semibold hover:underline">
              سوالات متداول
            </a>{" "}
            را بررسی کنید.
          </p>
        </div>
      </section>
    </>
  );
}
