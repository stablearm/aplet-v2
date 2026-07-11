import type { Metadata } from "next";
import Link from "next/link";
import { Users, Shield, TrendingUp, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "افزایش عضو تلگرام",
  description: "راهنمای جامع افزایش اعضای واقعی کانال تلگرام. کمپین عضوگیری هدفمند، جذب مخاطبان واقعی با هزینه مناسب و کیفیت بالا.",
  keywords: ["افزایش عضو تلگرام", "خرید عضو تلگرام", "جذب عضو تلگرام", "عضو واقعی تلگرام", "کمپین عضوگیری"],
};

const faqs = [
  { question: "اعضای واقعی چه تفاوتی با اعضای فیک دارند؟", answer: "اعضای واقعی کاربران فعال تلگرام هستند که تعامل دارند و ارزش واقعی ایجاد می‌کنند. اعضای فیک حساب‌های جعلی هستند که هیچ تعاملی ندارند و به اعتبار کانال آسیب می‌زنند." },
  { question: "هزینه جذب هر عضو چقدر است؟", answer: "هزینه جذب هر عضو واقعی از طریق کمپین عضوگیری آپلت ۵۰۰ تومان است که ۴۰۰ تومان آن به ناشر و ۱۰۰ تومان کارمزد پلتفرم است." },
  { question: "آیا اعضای جذب شده باقی می‌مانند؟", answer: "بله، اعضای واقعی که از طریق کمپین هدفمند جذب شده‌اند معمولاً باقی می‌مانند و تعامل دارند. کیفیت عضو بستگی به تناسب موضوع کانال با مخاطبان هدف دارد." },
  { question: "حداقل تعداد عضو برای شروع کمپین چقدر است؟", answer: "حداقل مشخصی وجود ندارد، اما کمپین‌های با حداقل ۱۰۰ عضو نتایج بهتری دارند. برای شروع با بودجه کم می‌توانید تست کنید." },
  { question: "چه مدت زمانی طول می‌کشد کمپین اجرا شود؟", answer: "بسته به تعداد اعضای درخواستی، کمپین‌ها معمولاً از ۱ تا ۷ روز اجرا می‌شوند. اعضا به صورت تدریجی و طبیعی وارد کانال می‌شوند." },
  { question: "آیا اعضای جذب شده ایرانی هستند؟", answer: "بله، تمام اعضای جذب شده از طریق شبکه ناشران فعال آپلت واقعی و ایرانی هستند." },
  { question: "چگونه کیفیت اعضا را تضمین کنیم؟", answer: "آپلت از سیستم اعتبارسنجی دقیق برای بررسی کیفیت ناشران و اعضای جذب شده استفاده می‌کند. همچنین می‌توانید آمار تعامل اعضا را رصد کنید." },
  { question: "آیا خرید عضو فیک توصیه می‌شود؟", answer: "خیر، خرید عضو فیک نه تنها ارزشی ایجاد نمی‌کند، بلکه به اعتبار کانال آسیب می‌زند و ممکن است منجر به مسدود شدن کانال شود." },
];

const benefits = [
  { icon: Users, title: "اعضای واقعی", description: "فقط اعضای واقعی و فعال تلگرام جذب می‌شوند. هیچ حساب جعلی یا رباتی در کار نیست.", color: "from-[#10B981] to-[#059669]" },
  { icon: Shield, title: "تضمین کیفیت", description: "سیستم اعتبارسنجی دقیق برای اطمینان از کیفیت اعضا و ناشران.", color: "from-[#3B82F6] to-[#06B6D4]" },
  { icon: TrendingUp, title: "رشد پایدار", description: "رشد طبیعی و پایدار بدون آسیب به اعتبار کانال و الگوریتم تلگرام.", color: "from-[#F59E0B] to-[#D97706]" },
];

const advantages = [
  "اعضای واقعی و فعال",
  "هزینه شفاف و مناسب (۵۰۰ تومان/عضو)",
  "سیستم اعتبارسنجی دقیق",
  "رشد پایدار و طبیعی",
  "تحلیل عملکرد لحظه‌ای",
  "پشتیبانی ۲۴ ساعته",
];

const steps = [
  { step: "۱", title: "کانال خود را متصل کنید", text: "بات عضوگیری آپلت را به کانال تلگرامی خود اضافه کنید." },
  { step: "۲", title: "تعداد اعضا را انتخاب کنید", text: "تعداد اعضای مورد نظر خود را با نوار ساده مشخص کنید." },
  { step: "۳", title: "پرداخت کنید", text: "اطلاعات را تأیید و با Toncoin پرداخت کنید." },
  { step: "۴", title: "کمپین فعال می‌شود", text: "کمپین شما فوراً فعال و توسط ناشران اجرا می‌شود." },
  { step: "۵", title: "نتیجه را رصد کنید", text: "تعداد اعضای جذب شده را به صورت لحظه‌ای در پنل مشاهده کنید." },
];

const tips = [
  { title: "موضوع کانال مشخص باشد", text: "کانال‌هایی با موضوع مشخص و محتوای خاص نتایج بهتری می‌گیرند." },
  { title: "محتوای با کیفیت داشته باشید", text: "اعضای جذب شده باید دلیلی برای ماندن پیدا کنند. محتوای با کیفیت مهم‌ترین عامل است." },
  { title: "تدریجی رشد کنید", text: "به جای جذب تعداد زیاد عضو در یک روز، رشد تدریجی طبیعی‌تر است." },
  { title: "عملکرد را رصد کنید", text: "آمار تعامل اعضای جذب شده را بررسی کنید و کیفیت کمپین را بسنجید." },
];

export default function TelegramMemberServicePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#10B981]/7 via-[#10B981]/2 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-gradient-radial from-[#3B82F6]/5 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #10B981 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-3.5 py-1.5 mb-6">
              <Users className="h-3.5 w-3.5 text-[#10B981]" />
              <span className="text-xs font-semibold text-[#10B981]">افزایش عضو تلگرام</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
              افزایش <span className="bg-gradient-to-l from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">اعضای واقعی</span> تلگرام
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
              با کمپین عضوگیری هدفمند، مخاطبان واقعی و با کیفیت جذب کانال خود کنید.
              هر عضو فقط ۵۰۰ تومان، با تضمین کیفیت.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                شروع عضوگیری
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link href="/how-it-works/" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/60 bg-surface/80 backdrop-blur-sm px-8 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200">
                نحوه کار
              </Link>
            </div>
          </div>
        </section>

        {/* What is Member Service */}
        <section className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-6">
            افزایش عضو واقعی تلگرام چیست؟
          </h2>
          <div className="prose-custom text-text-secondary leading-relaxed space-y-4">
            <p>
              افزایش عضو واقعی تلگرام به فرآیند جذب کاربران فعال و واقعی تلگرام به کانال یا گروه شما گفته می‌شود. برخلاف خرید عضو فیک که ارزشی ایجاد نمی‌کند، عضوگیری واقعی مخاطبانی را جذب می‌کند که با محتوای شما تعامل دارند.
            </p>
            <p>
              در کمپین‌های عضوگیری آپلت، شبکه‌ای از ناشران فعال کانال‌های تلگرامی، کمپین شما را اجرا می‌کنند و مخاطبان هدفمند را به کانال شما جذب می‌کنند. هر عضو جذب شده واقعی، ایرانی و فعال است.
            </p>
            <p>
              هزینه هر عضو واقعی از طریق آپلت ۵۰۰ تومان است که ۴۰۰ تومان آن به ناشر و ۱۰۰ تومان کارمزد پلتفرم است. این هزینه در مقایسه با سایر روش‌های تبلیغاتی بسیار مقرون به صرفه است.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <div className="rounded-2xl border border-[#10B981]/15 bg-gradient-to-br from-[#10B981]/5 to-[#3B82F6]/3 p-8">
            <h2 className="text-xl font-extrabold text-text-primary mb-6">آمار کمپین عضوگیری</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#10B981] mb-1">۵۰۰ تومان</p>
                <p className="text-sm text-text-secondary">هزینه هر عضو واقعی</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#3B82F6] mb-1">۱۰,۰۰۰+</p>
                <p className="text-sm text-text-secondary">ناشر فعال</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-extrabold text-[#F59E0B] mb-1">۱-۷ روز</p>
                <p className="text-sm text-text-secondary">زمان اجرا</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            مزایای عضوگیری با آپلت
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center rounded-2xl border border-border/40 bg-surface p-6 shadow-sm">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.color} text-white mb-5`}>
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Aplet */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            چرا آپلت؟
          </h2>
          <div className="space-y-3">
            {advantages.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-surface border border-border/50 p-4">
                <CheckCircle className="h-5 w-5 text-[#10B981] shrink-0" />
                <span className="text-sm text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 pb-16 md:pb-20 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 text-center">
            راهنمای گام‌به‌گام عضوگیری
          </h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4 rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-l from-[#10B981] to-[#3B82F6] text-white text-sm font-bold">
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
            نکات حرفه‌ای عضوگیری
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
