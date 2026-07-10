import Link from "next/link";
import { Megaphone, Radio, Bot, TrendingUp, Wallet, BarChart3, Zap, ArrowLeft, Star, ArrowUpRight } from "lucide-react";

const features = [
  { icon: Megaphone, title: "کمپین عضوگیری", description: "کمپین‌های هدفمند اسپانسرشیپ با قیمت‌گذاری شفاف و گزارش‌گیری لحظه‌ای.", color: "from-[#5B5FEF]/10 to-[#3B82F6]/10", iconColor: "text-[#5B5FEF]" },
  { icon: Radio, title: "مدیریت پلتفرم", description: "کانال‌ها و گروه‌های تلگرامی خود را مدیریت و عملکرد را رصد کنید.", color: "from-[#3B82F6]/10 to-[#10B981]/10", iconColor: "text-[#3B82F6]" },
  { icon: Bot, title: "بات محتوا", description: "بات‌های هوشمند محتوا را به کانال‌های خود متصل کنید.", color: "from-[#10B981]/10 to-[#059669]/10", iconColor: "text-[#10B981]" },
  { icon: TrendingUp, title: "درآمدزایی", description: "از مخاطبان خود درآمد کسب کنید و آن را مدیریت کنید.", color: "from-[#F59E0B]/10 to-[#D97706]/10", iconColor: "text-[#F59E0B]" },
  { icon: Wallet, title: "کیف پول", description: "موجودی خود را مدیریت و واریز و برداشت سریع انجام دهید.", color: "from-[#5B5FEF]/10 to-[#818CF8]/10", iconColor: "text-[#5B5FEF]" },
  { icon: BarChart3, title: "تحلیل و گزارش", description: "آمار و تحلیل‌های دقیق از عملکرد کسب و کار خود دریافت کنید.", color: "from-[#3B82F6]/10 to-[#5B5FEF]/10", iconColor: "text-[#3B82F6]" },
];

const stats = [
  { value: "+۱۰,۰۰۰", label: "ناشر فعال" },
  { value: "+۵۰۰", label: "کمپین موفق" },
  { value: "۹۹.۹٪", label: "آپتایم" },
  { value: "۲۴/۷", label: "پشتیبانی" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-[#5B5FEF]/8 via-[#5B5FEF]/3 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-[#3B82F6]/6 via-[#3B82F6]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-gradient-radial from-[#10B981]/4 via-[#10B981]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="container relative mx-auto px-4 py-28 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/5 px-4 py-1.5 mb-8">
            <Zap className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">پلتفرم مدیریت رشد تلگرام</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6 leading-[1.2]">
            رشد، تبلیغات و درآمد
            <br />
            <span className="bg-gradient-to-l from-[#5B5FEF] via-[#3B82F6] to-[#5B5FEF] bg-clip-text text-transparent">
              کانال خود را یکجا مدیریت کنید.
            </span>
          </h1>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            آپلت ابزارهای لازم برای اجرای کمپین، مدیریت کانال و درآمدزایی از مخاطبان را در یک فضای کاری حرفه‌ای ارائه می‌دهد.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:shadow-[#5B5FEF]/35 hover:scale-[1.02] transition-all duration-200"
            >
              شروع رایگان
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200"
            >
              نحوه کار
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-text-tertiary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5B5FEF]/3 to-transparent pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/5 px-3 py-1 mb-4">
              <Star className="h-3 w-3 text-[#5B5FEF]" />
              <span className="text-[11px] font-semibold text-[#5B5FEF]">امکانات</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">همه چیز در یک پلتفرم</h2>
            <p className="text-sm text-text-secondary max-w-lg mx-auto">ابزارهای قدرتمند برای مدیریت و رشد کسب و کار شما در تلگرام</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group relative rounded-2xl border border-border/50 bg-surface p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} ${feature.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5B5FEF]/3 via-transparent to-[#3B82F6]/3 pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-3 py-1 mb-4">
              <ArrowUpRight className="h-3 w-3 text-[#3B82F6]" />
              <span className="text-[11px] font-semibold text-[#3B82F6]">نحوه کار</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4">ساده، سریع و حرفه‌ای</h2>
            <p className="text-sm text-text-secondary max-w-lg mx-auto">در سه مرحله ساده کسب و کار خود را متحول کنید</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "۱", title: "ثبت‌نام کنید", desc: "به صورت رایگان در کمتر از ۱ دقیقه ثبت‌نام کنید" },
              { step: "۲", title: "کانال خود را متصل کنید", desc: "کانال تلگرامی خود را به پلتفرم متصل کنید" },
              { step: "۳", title: "شروع به کسب درآمد کنید", desc: "کمپین‌های خود را ایجاد و مدیریت کنید" },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white text-xl font-bold shadow-lg shadow-[#5B5FEF]/25 mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative rounded-3xl bg-gradient-to-l from-[#5B5FEF] via-[#3B82F6] to-[#5B5FEF] p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <h2 className="relative text-3xl md:text-4xl font-extrabold text-white mb-4">آماده شروع هستید؟</h2>
          <p className="relative text-base text-white/80 mb-10 max-w-md mx-auto leading-relaxed">
            همین الان رایگان ثبت‌نام کنید و کسب و کار خود را متحول کنید.
          </p>
          <Link
            href="/register"
            className="relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-bold text-[#5B5FEF] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200"
          >
            شروع رایگان
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
