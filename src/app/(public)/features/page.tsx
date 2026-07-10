import type { Metadata } from "next";
import Link from "next/link";
import { Megaphone, Radio, Bot, TrendingUp, Wallet, BarChart3, Shield, Zap, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "امکانات",
  description: "امکانات آپلت: کمپین عضوگیری، مدیریت پلتفرم، بات محتوا، درآمدزایی، کیف پول و تحلیل عملکرد کانال تلگرام.",
};

const features = [
  { icon: Megaphone, title: "کمپین‌های عضوگیری", description: "کمپین‌های هدفمند اسپانسرشیپ ایجاد کنید و مخاطبان واقعی را جذب کنید. با تعرفه شفاف و گزارش‌گیری لحظه‌ای.", color: "from-[#5B5FEF]/10 to-[#3B82F6]/10", iconColor: "text-[#5B5FEF]" },
  { icon: Radio, title: "مدیریت پلتفرم", description: "کانال‌ها و گروه‌های تلگرامی خود را مدیریت کنید. ادمین‌ها را اضافه کنید و عملکرد هر پلتفرم را رصد کنید.", color: "from-[#3B82F6]/10 to-[#10B981]/10", iconColor: "text-[#3B82F6]" },
  { icon: Bot, title: "بات‌های محتوا", description: "بات‌های هوشمند محتوا را به کانال‌های خود متصل کنید. محتوای خودکار و منظم منتشر کنید.", color: "from-[#10B981]/10 to-[#059669]/10", iconColor: "text-[#10B981]" },
  { icon: TrendingUp, title: "درآمدزایی", description: "از مخاطبان خود درآمد کسب کنید. درآمد خود را به تومان یا TON برداشت کنید.", color: "from-[#F59E0B]/10 to-[#D97706]/10", iconColor: "text-[#F59E0B]" },
  { icon: Wallet, title: "کیف پول", description: "موجودی خود را مدیریت کنید. واریز و برداشت سریع و امن با پشتیبانی از تومان و TON.", color: "from-[#5B5FEF]/10 to-[#818CF8]/10", iconColor: "text-[#5B5FEF]" },
  { icon: BarChart3, title: "تحلیل و گزارش", description: "آمار و تحلیل‌های دقیق از عملکرد کمپین‌ها، پلتفرم‌ها و درآمد خود دریافت کنید.", color: "from-[#3B82F6]/10 to-[#5B5FEF]/10", iconColor: "text-[#3B82F6]" },
  { icon: Shield, title: "امنیت و احراز هویت", description: "احراز هویت از طریق تلگرام و سیستم امنیتی پیشرفته. دسترسی‌های نقش‌محور.", color: "from-[#EF4444]/10 to-[#F59E0B]/10", iconColor: "text-[#EF4444]" },
  { icon: Zap, title: "عملکرد بالا", description: "رابط کاربری سریع و روان. بهینه‌سازی شده برای دستگاه‌های مختلف و سرعت بالا.", color: "from-[#10B981]/10 to-[#3B82F6]/10", iconColor: "text-[#10B981]" },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/6 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-gradient-radial from-[#10B981]/4 via-[#10B981]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <Star className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">امکانات</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            همه آنچه برای <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">رشد</span> نیاز دارید
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            آپلت ابزارهای کاملی برای مدیریت رشد، تبلیغات و درآمدزایی از تلگرام ارائه می‌دهد.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="group rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className="relative">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} ${feature.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-4xl text-center">
        <h2 className="text-2xl font-extrabold text-text-primary mb-4">آماده شروع هستید؟</h2>
        <p className="text-text-secondary mb-8">همین الان رایگان ثبت‌نام کنید و شروع کنید.</p>
        <Link
          href="/register"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:shadow-[#5B5FEF]/35 hover:scale-[1.02] transition-all duration-200"
        >
          شروع رایگان
        </Link>
      </section>
    </>
  );
}
