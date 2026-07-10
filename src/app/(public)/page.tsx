import Link from "next/link";
import {
  Users, Bot, Megaphone, Zap, ArrowLeft, Star, ArrowUpRight,
  MessageSquare, Clock, Shield, ChevronDown, HelpCircle,
  Send, BarChart3, Wallet, CheckCircle,
} from "lucide-react";

/* ── data ──────────────────────────────────────────────── */

const howItWorks = [
  { step: "۱", title: "کانال خود را متصل کنید", desc: "بات عضوگیری را به کانال یا گروه تلگرامی خود اضافه کنید." },
  { step: "۲", title: "تعداد اعضا را انتخاب کنید", desc: "با یک نوار ساده تعداد اعضای مورد نظر خود را مشخص کنید." },
  { step: "۳", title: "پرداخت و شروع", desc: "اطلاعات را تأیید و با Toncoin پرداخت کنید. کمپین شما فوراً فعال می‌شود." },
];

const campaignFlow = [
  { icon: Send, title: "کمپین در صف قرار می‌گیرد", desc: "کمپین شما وارد مجموعه کمپین‌ها می‌شود و توسط الگوریتم‌های پیشرفته به ناشران اختصاص داده می‌شود." },
  { icon: Users, title: "ناشران کمپین را اجرا می‌کنند", desc: "ناشران فعال ما کانال‌های خود را به کمپین شما متصل کرده و مخاطبان واقعی را جذب می‌کنند." },
  { icon: BarChart3, title: "پیشرفت را رصد کنید", desc: "تعداد اعضای جذب شده را به صورت لحظه‌ای در پنل خود مشاهده کنید." },
  { icon: Wallet, title: "نتیجه را دریافت کنید", desc: "اعضای جذب شده مستقیماً وارد کانال یا گروه شما می‌شوند." },
];

const features = [
  { icon: Megaphone, title: "کمپین عضوگیری", description: "با کمترین هزینه، اعضای واقعی و هدفمند برای کانال خود جذب کنید.", color: "from-[#5B5FEF] to-[#3B82F6]" },
  { icon: Bot, title: "بات محتوای هوشمند", description: "بات هوشمندی که کانال شما را با محتوای خودکار و اخبار به‌روز زنده نگه می‌دارد.", color: "from-[#10B981] to-[#059669]" },
  { icon: BarChart3, title: "تحلیل و گزارش", description: "آمار دقیق از عملکرد کمپین‌ها و رشد کانال خود دریافت کنید.", color: "from-[#3B82F6] to-[#06B6D4]" },
  { icon: Wallet, title: "کیف پول امن", description: "موجودی خود را مدیریت و پرداخت‌ها را با Toncoin انجام دهید.", color: "from-[#8B5CF6] to-[#5B5FEF]" },
];

const aiBotFeatures = [
  "انتشار خودکار اخبار و محتوای به‌روز",
  "محتوای تولید شده توسط هوش مصنوعی",
  "برنامه‌ریزی زمانبندی انتشار",
  "مدیریت آسان از پنل کاربری",
];

const testimonials = [
  {
    name: "علی رضایی",
    role: "ناشر کانال تلگرامی",
    text: "با آپلت توانستم اعضای کانالم را ۵ برابر کنم. فرآیند ساده و نتیجه عالی.",
    rating: 5,
  },
  {
    name: "مریم محمدی",
    role: "مدیر کسب و کار",
    text: "بات محتوا کانال ما را همیشه فعال نگه می‌دارد. دیگر نیازی به تولید دستی محتوا نیست.",
    rating: 5,
  },
  {
    name: "حسن کریمی",
    role: "تبلیغ‌دهنده",
    text: "بهترین پلتفرم برای جذب مخاطب هدفمند در تلگرام. گزارش‌گیری لحظه‌ای عالی است.",
    rating: 5,
  },
];

const faqs = [
  { q: "آپلت چیست؟", a: "آپلت یک پلتفرم جامع برای مدیریت و رشد کانال‌های تلگرامی است. دو محصول اصلی داریم: خرید عضو برای کانال‌ها و بات هوشمند محتوا." },
  { q: "خرید عضو چگونه کار می‌کند؟", a: "کافی است کانال خود را متصل کنید، تعداد اعضای مورد نظر را انتخاب و با Toncoin پرداخت کنید. اعضا به صورت تدریجی و واقعی وارد کانال شما می‌شوند." },
  { q: "هزینه خرید عضو چقدر است؟", a: "هزینه بسته به تعداد اعضای درخواستی و نوع کمپین متفاوت است. پس از انتخاب تعداد، قیمت نهایی نمایش داده می‌شود." },
  { q: "بات محتوا چیست؟", a: "بات محتوا یک ربات هوشمند است که به کانال شما متصل می‌شود و به صورت خودکار اخبار و محتوای به‌روز را منتشر می‌کند تا کانال شما همیشه فعال باشد." },
  { q: "تعرفه بات محتوا چقدر است؟", a: "بات محتوا دارای پلن‌های اشتراکی ماهانه، ۳ ماهه و سالانه است. از پلن رایگان شروع کنید و در صورت نیاز ارتقا دهید." },
  { q: "آیا اعضا واقعی هستند؟", a: "بله، تمام اعضای جذب شده از طریق شبکه ناشران فعال ما واقعی و ایرانی هستند." },
];

/* ── page ──────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-1/4 w-[700px] h-[700px] rounded-full bg-[#5B5FEF]/[0.06] blur-[120px]" />
          <div className="absolute top-20 left-1/3 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/[0.05] blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
        </div>

        <div className="container relative mx-auto px-4 pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* right: text */}
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">رشد کانال تلگرامی</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-text-primary mb-5 leading-[1.25]">
                اعضای واقعی
                <br />
                <span className="bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
                  برای کانال تلگرامی خود بخرید.
                </span>
              </h1>

              <p className="text-sm md:text-base lg:text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed">
                با کمترین هزینه، اعضای واقعی و هدفمند را از شبکه ناشران فعال ما جذب کنید.
                پرداخت با Toncoin، نتیجه فوری.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6">
                <Link
                  href="/register"
                  className="inline-flex h-11 md:h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-primary to-accent px-7 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto"
                >
                  شروع رایگان
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex h-11 md:h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-7 text-sm font-semibold text-text-primary hover:bg-surface hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto"
                >
                  نحوه کار
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-5 text-xs text-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </span>
                  ۴.۸ از ۵
                </span>
                <span className="w-px h-3 bg-border" />
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> +۱۰,۰۰۰ ناشر</span>
              </div>
            </div>

            {/* left: campaign mockup — visible on all screens */}
            <div>
              <div className="relative rounded-2xl border border-border/40 bg-surface shadow-2xl shadow-black/5 overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border/30 px-3 md:px-4 py-2.5 md:py-3 bg-surface-elevated/50">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-[9px] md:text-[10px] text-text-tertiary mr-2 font-mono">aplet.ir/workspace</span>
                </div>
                <div className="p-3 md:p-5 space-y-3 md:space-y-4">
                  <div className="rounded-xl border border-border/30 bg-background/50 p-3 md:p-4">
                    <p className="text-[11px] md:text-xs font-semibold text-text-primary mb-2 md:mb-3">ایجاد کمپین جدید</p>
                    <div className="space-y-2.5 md:space-y-3">
                      <div>
                        <label className="text-[9px] md:text-[10px] text-text-tertiary block mb-1">کانال مقصد</label>
                        <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-surface px-2.5 md:px-3 py-1.5 md:py-2">
                          <Send className="h-3 w-3 md:h-3.5 md:w-3.5 text-text-tertiary" />
                          <span className="text-[11px] md:text-xs text-text-secondary">@mychannel</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] md:text-[10px] text-text-tertiary block mb-1">تعداد اعضا: ۵۰۰</label>
                        <div className="h-1.5 md:h-2 rounded-full bg-border/30 overflow-hidden">
                          <div className="h-full w-[50%] rounded-full bg-gradient-to-l from-primary to-accent" />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-[8px] md:text-[9px] text-text-tertiary">۱۰۰</span>
                          <span className="text-[8px] md:text-[9px] text-primary font-medium">۱,۰۰۰,۰۰۰ تومان</span>
                          <span className="text-[8px] md:text-[9px] text-text-tertiary">۱۰,۰۰۰</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="rounded-xl border border-border/30 bg-background/50 p-2.5 md:p-3">
                      <p className="text-[9px] md:text-[10px] text-text-tertiary mb-0.5 md:mb-1">اعضای جذب شده</p>
                      <p className="text-sm md:text-base font-bold text-text-primary">۲,۳۴۰</p>
                      <p className="text-[9px] md:text-[10px] text-emerald-500 font-medium">+۱۲٪ امروز</p>
                    </div>
                    <div className="rounded-xl border border-border/30 bg-background/50 p-2.5 md:p-3">
                      <p className="text-[9px] md:text-[10px] text-text-tertiary mb-0.5 md:mb-1">کمپین فعال</p>
                      <p className="text-sm md:text-base font-bold text-text-primary">۳</p>
                      <p className="text-[9px] md:text-[10px] text-primary font-medium">در حال پردازش</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ────────────────────────────────── */}
      <section className="border-y border-border/30 bg-surface-elevated/30">
        <div className="container mx-auto px-4 py-5 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Users, value: "+۱۰,۰۰۰", label: "ناشر فعال" },
              { icon: Megaphone, value: "+۵۰۰", label: "کمپین موفق" },
              { icon: Clock, value: "۲۴/۷", label: "پشتیبانی" },
              { icon: Shield, value: "۹۹.۹٪", label: "آپتایم" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-2.5 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg md:rounded-xl bg-primary/10 text-primary shrink-0">
                  <s.icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div>
                  <div className="text-lg md:text-xl font-extrabold text-text-primary">{s.value}</div>
                  <div className="text-[10px] md:text-xs text-text-tertiary">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works (Member Purchase) ───────────── */}
      <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#5B5FEF]/[0.02] to-background pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-3 md:mb-4">
              <ArrowUpRight className="h-3 w-3 text-primary" />
              <span className="text-[11px] font-semibold text-primary">خرید عضو</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary mb-3 md:mb-4">
              در ۳ مرحله ساده <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">عضو بخرید</span>
            </h2>
            <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto">
              فرآیند خرید عضو بسیار ساده و سریع است
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {howItWorks.map((s, i) => (
              <div key={s.step} className="relative text-center">
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-0 w-full h-px bg-gradient-to-l from-border/50 to-transparent pointer-events-none" style={{ direction: "ltr" }} />
                )}
                <div className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-l from-primary to-accent text-white text-lg md:text-xl font-bold shadow-lg shadow-primary/25 mb-4 md:mb-5 relative z-10">
                  {s.step}
                </div>
                <h3 className="text-sm md:text-base font-bold text-text-primary mb-1.5 md:mb-2">{s.title}</h3>
                <p className="text-xs md:text-sm text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Campaign Flow ────────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface-elevated/30 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 mb-3 md:mb-4">
              <Megaphone className="h-3 w-3 text-accent" />
              <span className="text-[11px] font-semibold text-accent">نحوه عملکرد</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary mb-3 md:mb-4">
              از ایجاد کمپین تا <span className="bg-gradient-to-l from-accent to-[#10B981] bg-clip-text text-transparent">جذب عضو</span>
            </h2>
            <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto">
              کمپین شما توسط شبکه گسترده ناشران ما اجرا می‌شود
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {campaignFlow.map((item, i) => (
              <div key={item.title} className="relative">
                <div className="rounded-xl md:rounded-2xl border border-border/40 bg-surface p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-3 md:mb-4">
                    <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-text-primary mb-1.5 md:mb-2">{item.title}</h3>
                  <p className="text-[11px] md:text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
                {i < campaignFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -left-3 w-6 h-px bg-border/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────── */}
      <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#5B5FEF]/[0.02] to-background pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-3 md:mb-4">
              <Star className="h-3 w-3 text-primary" />
              <span className="text-[11px] font-semibold text-primary">امکانات</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary mb-3 md:mb-4">
              همه چیز زیر <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">یک سقف</span>
            </h2>
            <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto">
              ابزارهای قدرتمند برای مدیریت و رشد کانال تلگرامی شما
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-xl md:rounded-2xl border border-white/[0.06] bg-[#0F1225] p-5 md:p-6 hover:border-primary/20 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-[0.08] blur-3xl transition-opacity duration-500 pointer-events-none`} />
                <div className="relative">
                  <div className={`flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-br ${f.color} text-white mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-1.5 md:mb-2">{f.title}</h3>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Content Bot ───────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* right: text */}
            <div className="text-center lg:text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-3 py-1 mb-3 md:mb-4">
                <Bot className="h-3 w-3 text-[#10B981]" />
                <span className="text-[11px] font-semibold text-[#10B981]">بات هوشمند محتوا</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary mb-3 md:mb-4">
                کانال خود را <span className="bg-gradient-to-l from-[#10B981] to-[#059669] bg-clip-text text-transparent">همیشه زنده</span> نگه دارید
              </h2>
              <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto lg:mx-0 mb-5 md:mb-6 leading-relaxed">
                بات هوشمند محتوا به کانال شما متصل می‌شود و به صورت خودکار
                اخبار و محتوای به‌روز را منتشر می‌کند. دیگر نگران به‌روزرسانی کانال نباشید.
              </p>
              <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 max-w-md mx-auto lg:mx-0">
                {aiBotFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 md:gap-2.5 text-xs md:text-sm text-text-secondary">
                    <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#10B981] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="inline-flex h-10 md:h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#10B981] to-[#059669] px-6 md:px-7 text-sm font-bold text-white shadow-lg shadow-[#10B981]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                مشاهده تعرفه‌ها
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            {/* left: bot mockup — visible on all screens */}
            <div className="order-1 lg:order-2">
              <div className="rounded-xl md:rounded-2xl border border-border/40 bg-surface shadow-xl shadow-black/5 overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border/30 px-3 md:px-4 py-2.5 md:py-3 bg-surface-elevated/50">
                  <div className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-md md:rounded-lg bg-[#10B981]/10 text-[#10B981]">
                    <Bot className="h-3 w-3 md:h-4 md:w-4" />
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-text-primary">بات محتوا — @mychannel</span>
                </div>
                <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                  {[
                    { title: "آخرین اخبار اقتصادی", time: "۱۰:۳۰", status: "منتشر شد" },
                    { title: "خبر فناوری — هوش مصنوعی", time: "۱۲:۰۰", status: "منتشر شد" },
                    { title: "اخبار ورزشی", time: "۱۴:۰۰", status: "زمان‌بندی شده" },
                    { title: "گزارش بازار بورس", time: "۱۶:۰۰", status: "زمان‌بندی شده" },
                  ].map((post) => (
                    <div key={post.title} className="flex items-center justify-between rounded-lg md:rounded-xl border border-border/30 bg-background/50 px-3 md:px-4 py-2.5 md:py-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-md md:rounded-lg bg-[#10B981]/10 text-[#10B981]">
                          <Send className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        </div>
                        <div>
                          <p className="text-[11px] md:text-xs font-semibold text-text-primary">{post.title}</p>
                          <p className="text-[9px] md:text-[10px] text-text-tertiary">{post.time}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] md:text-[10px] font-medium px-1.5 md:px-2 py-0.5 rounded-full ${
                        post.status === "منتشر شد"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-amber-400/10 text-amber-600"
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24 bg-surface-elevated/30 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1 mb-3 md:mb-4">
              <Star className="h-3 w-3 text-amber-500 fill-amber-400" />
              <span className="text-[11px] font-semibold text-amber-600">نظرات کاربران</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary mb-3 md:mb-4">
              بیش از ۱۰,۰۰۰ ناشر به ما اعتماد کرده‌اند
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl md:rounded-2xl border border-border/40 bg-surface p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 text-amber-400 mb-3 md:mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" />)}
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-4 md:mb-5">{t.text}</p>
                <div className="flex items-center gap-2.5 md:gap-3">
                  <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-text-primary">{t.name}</p>
                    <p className="text-[10px] md:text-xs text-text-tertiary">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 mb-3 md:mb-4">
              <HelpCircle className="h-3 w-3 text-primary" />
              <span className="text-[11px] font-semibold text-primary">سوالات متداول</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-text-primary mb-2 md:mb-3">
              سوالات پرتکرار
            </h2>
          </div>

          <div className="space-y-2.5 md:space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={i} question={f.q} answer={f.a} index={i} />
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <Link href="/faq" className="text-xs md:text-sm text-primary font-semibold hover:underline">
              مشاهده همه سوالات متداول ←
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl md:rounded-3xl bg-[#0F1225] p-8 md:p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />

            <h2 className="relative text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 md:mb-4">
              همین الان کانال خود را <span className="text-primary">رشد دهید</span>
            </h2>
            <p className="relative text-sm md:text-base text-slate-400 mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
              با ۷ روز تست رایگان شروع کنید و اعضای واقعی را برای کانال خود جذب کنید.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex h-11 md:h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 md:px-8 text-sm font-bold text-[#0F1225] shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto"
              >
                شروع رایگان
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 md:h-12 items-center justify-center rounded-xl border border-white/20 px-7 md:px-8 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-200 w-full sm:w-auto"
              >
                مشاهده تعرفه‌ها
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── FAQ accordion ───────────────────────────────────── */

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  return (
    <details className="group rounded-xl md:rounded-2xl border border-border/40 bg-surface shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <summary className="flex items-center gap-3 md:gap-4 p-4 md:p-5 cursor-pointer list-none text-right">
        <span className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs md:text-sm font-bold">
          {index + 1}
        </span>
        <span className="flex-1 font-bold text-text-primary text-xs md:text-sm leading-relaxed">
          {question}
        </span>
        <ChevronDown className="h-4 w-4 text-text-tertiary shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-4 md:px-5 pb-4 md:pb-5 pl-[3.5rem] md:pl-[4.5rem]">
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}
