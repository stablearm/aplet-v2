import type { Metadata } from "next";
import Link from "next/link";
import { Check, Crown, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "قیمت‌گذاری",
  description: "پلن‌های اشتراک آپلت: رایگان، پایه، حرفه‌ای و سازمانی. قیمت‌گذاری شفاف برای ناشران و تبلیغ‌دهندگان تلگرام.",
};

const plans = [
  {
    name: "رایگان",
    price: "۰",
    period: "رایگان",
    description: "برای شروع و آزمایش",
    features: ["۱ بات محتوا", "۱ پلتفرم", "کمپین پایه", "گزارش‌گیری ساده"],
    cta: "شروع رایگان",
    href: "/register",
    popular: false,
  },
  {
    name: "پایه",
    price: "۴۸۰,۰۰۰",
    period: "ماهانه",
    description: "برای ناشران فعال",
    features: ["۳ بات محتوا", "۵ پلتفرم", "کمپین‌های پیشرفته", "گزارش‌گیری کامل", "پشتیبانی اولویت‌دار"],
    cta: "انتخاب پلن",
    href: "/register",
    popular: false,
  },
  {
    name: "حرفه‌ای",
    price: "۱,۰۵۰,۰۰۰",
    period: "۳ ماهه",
    description: "برای کسب و کارها",
    features: ["۱۰ بات محتوا", "۲۰ پلتفرم", "کمپین‌های نامحدود", "گزارش‌گیری پیشرفته", "پشتیبانی ۲۴/۷", "API دسترسی"],
    cta: "انتخاب پلن",
    href: "/register",
    popular: true,
  },
  {
    name: "سازمانی",
    price: "۳,۶۰۰,۰۰۰",
    period: "سالانه",
    description: "برای سازمان‌ها",
    features: ["بات محتوا نامحدود", "پلتفرم نامحدود", "کمپین‌های نامحدود", "گزارش‌گیری سفارشی", "پشتیبانی اختصاصی", "API کامل", "مدیریت تیم"],
    cta: "تماس با ما",
    href: "/contact",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/6 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-gradient-radial from-[#F59E0B]/4 via-[#F59E0B]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">قیمت‌گذاری</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            پلن مناسب <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">خود را انتخاب کنید</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            از پلن رایگان شروع کنید و با رشد کسب و کار خود، ارتقا دهید.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-7 bg-surface shadow-sm hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? "border-[#5B5FEF] shadow-lg ring-1 ring-[#5B5FEF]/20 scale-[1.02]"
                  : "border-border/40 hover:border-[#5B5FEF]/20 hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-[#5B5FEF]/30">
                    <Crown className="h-3 w-3" />
                    محبوب‌ترین
                  </span>
                </div>
              )}
              <h3 className="font-bold text-lg text-text-primary mb-1">{plan.name}</h3>
              <p className="text-sm text-text-secondary mb-5">{plan.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-text-primary">{plan.price}</span>
                <span className="text-sm text-text-tertiary mr-1">تومان</span>
                <span className="text-sm text-text-tertiary"> / {plan.period}</span>
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
                    ? "bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:shadow-[#5B5FEF]/35"
                    : "border border-border/60 bg-surface text-text-primary hover:bg-surface-elevated hover:border-[#5B5FEF]/30"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center">
          <p className="text-sm text-text-tertiary">
            سوالی دارید؟{" "}
            <a href="/faq/" className="text-[#5B5FEF] font-semibold hover:underline">
              سوالات متداول
            </a>{" "}
            را بررسی کنید.
          </p>
        </div>
      </section>
    </>
  );
}
