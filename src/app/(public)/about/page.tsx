import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Users, Radio, TrendingUp, Heart, Shield, Globe, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "درباره آپلت",
  description: "درباره آپلت: سیستم عامل کسب و کار تلگرام. هدف ما ساده‌سازی مدیریت، رشد و درآمدزایی کسب و کارهای تلگرامی است.",
};

const stats = [
  { value: "+۱۰,۰۰۰", label: "کاربر فعال", icon: Users },
  { value: "+۵۰۰", label: "کانال متصل", icon: Radio },
  { value: "+۱۰۰", label: "کمپین فعال", icon: TrendingUp },
  { value: "۹۹.۹٪", label: "آپتایم", icon: Shield },
];

const values = [
  { icon: Heart, title: "سادگی", description: "باور داریم هر کسی باید بتواند بدون دانش فنی کسب و کار خود را مدیریت کند." },
  { icon: Zap, title: "سرعت", description: "ابزارهای ما برای عملکرد بالا و تجربه کاربری روان طراحی شده‌اند." },
  { icon: Shield, title: "امنیت", description: "امنیت اطلاعات شما اولویت ماست. احراز هویت امن و محافظت از داده‌ها." },
  { icon: Globe, title: "رشد", description: "هدف ما کمک به رشد کسب و کار شما و افزایش درآمدزایی است." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/7 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#3B82F6]/5 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-20 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <Heart className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">درباره ما</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-6">
            ما <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">آپلت</span> را ساختیم
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12">
            آپلت با هدف ساده‌سازی مدیریت کسب و کارهای تلگرامی ساخته شده است. ما باور داریم که هر ناشر و تبلیغ‌دهنده‌ای باید بتواند به راحتی رشد کند و درآمد کسب کند.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border/40 bg-surface/80 backdrop-blur-sm p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15 text-[#5B5FEF] mx-auto mb-3">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-extrabold text-text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-text-tertiary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-text-primary mb-4">مأموریت ما</h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            تبدیل مدیریت کسب و کار تلگرام از یک فرآیند پیچیده و زمان‌بر به یک تجربه ساده، سریع و لذت‌بخش.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div key={value.title} className="group rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15 text-[#5B5FEF] mb-5 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{value.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 pb-20 max-w-3xl">
        <div className="rounded-3xl border border-border/40 bg-gradient-to-br from-surface to-surface-elevated p-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-text-primary mb-6">داستان ما</h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              آپلت از یک مشکل ساده شروع شد: مدیران کانال‌های تلگرامی برای مدیریت، رشد و درآمدزایی از کانال خود مجبور بودند از ابزارهای پراکنده و پیچیده استفاده کنند.
            </p>
            <p>
              ما تصمیم گرفتیم تمام ابزارهای مورد نیاز را در یک پلتفرم واحد جمع کنیم: از مدیریت کانال و اجرای کمپین تا درآمدزایی و تحلیل عملکرد.
            </p>
            <p>
              امروز آپلت به هزاران کاربر کمک می‌کند تا کسب و کار تلگرامی خود را به صورت حرفه‌ای مدیریت و رشد دهند.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24 max-w-4xl">
        <div className="relative rounded-3xl bg-gradient-to-l from-[#5B5FEF] via-[#3B82F6] to-[#5B5FEF] p-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="relative text-3xl font-extrabold text-white mb-4">به ما بپیوندید</h2>
          <p className="relative text-white/80 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            همین الان رایگان ثبت‌نام کنید و بخشی از جامعه آپلت شوید.
          </p>
          <Link
            href="/register"
            className="relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-bold text-[#5B5FEF] shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-200"
          >
            شروع رایگان
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
