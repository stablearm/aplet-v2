import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "نحوه کار",
  description: "نحوه کار آپلت: از ثبت‌نام تا رشد کانال تلگرامی. فرآیند ۴ مرحله‌ای ساده و سریع برای مدیریت و درآمدزایی از تلگرام.",
};

const steps = [
  { step: "۱", title: "ثبت‌نام کنید", description: "حساب کاربری خود را رایگان ایجاد کنید. فقط به یک شماره تلگرام نیاز دارید." },
  { step: "۲", title: "پلتفرم اضافه کنید", description: "کانال یا گروه تلگرامی خود را با بات مرتبط متصل کنید." },
  { step: "۳", title: "کمپین ایجاد کنید", description: "کمپین عضوگیری خود را با بودجه و هدف مشخص ایجاد کنید." },
  { step: "۴", title: "رشد کنید", description: "مخاطبان هدفمند جذب کنید و درآمد خود را مدیریت کنید." },
];

const sponsorshipSteps = [
  { num: "۱", title: "ناشران پلتفرم خود را ثبت می‌کنند", desc: "ناشران کانال‌ها و گروه‌های تلگرامی خود را در آپلت ثبت می‌کنند و بات محتوا را متصل می‌کنند." },
  { num: "۲", title: "تبلیغ‌دهندگان کمپین ایجاد می‌کنند", desc: "تبلیغ‌دهندگان با بودجه مشخص کمپین عضوگیری ایجاد می‌کنند و کانال هدف را مشخص می‌کنند." },
  { num: "۳", title: "مخاطبان از طریق اسپانسرشیپ جذب می‌شوند", desc: "مخاطبان با پشتیبانی از کمپین اسپانسرشیپ، به کانال هدف می‌پیوندند و محتوای قفل شده را دریافت می‌کنند." },
  { num: "۴", title: "درآمد تقسیم می‌شود", desc: "ناشران ۴۰۰ تومان به ازای هر عضو جذب شده درآمد کسب می‌کنند و می‌توانند آن را برداشت کنند." },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-24 text-center">
        <p className="text-sm text-[#5B5FEF] font-semibold mb-4">نحوه کار</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          در ۴ مرحله شروع کنید
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          فرآیند ساده و سریع برای رشد کانال تلگرامی شما.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white text-xl font-bold shadow-lg shadow-[#5B5FEF]/25 mb-5">
                {item.step}
              </div>
              <h3 className="font-bold text-lg text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <h2 className="text-2xl font-extrabold text-center text-text-primary mb-12">نحوه عملکرد اسپانسرشیپ</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {sponsorshipSteps.map((item) => (
            <div key={item.num} className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5B5FEF]/10 text-[#5B5FEF] font-bold text-sm">
                {item.num}
              </div>
              <div>
                <h3 className="font-bold text-text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24 text-center">
        <h2 className="text-2xl font-extrabold text-text-primary mb-4">همین الان شروع کنید</h2>
        <p className="text-text-secondary mb-8">ثبت‌نام رایگان است و نیازی به کارت اعتباری نیست.</p>
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
