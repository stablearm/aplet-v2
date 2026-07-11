import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, ArrowLeft, CheckCircle, Lightbulb } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { howToSchema, faqSchema } from "@/lib/schemas";
import { IncomeCalculator } from "@/components/tools/lazy-calculator";

export const metadata: Metadata = {
  title: "محاسبه درآمد تلگرام",
  description: "درآمد بالقوه کانال تلگرام خود را محاسبه کنید. ماشین حساب درآمد از تبلیغات، اسپانسرشیپ و کمپین عضوگیری در تلگرام.",
};

const faqs = [
  { question: "درآمد کانال تلگرام از کجا می‌آید؟", answer: "درآمد کانال تلگرام از منابع مختلفی مانند فروش فضای تبلیغاتی (اسپانسرشیپ)، کمپین‌های عضوگیری، فروش محصولات و خدمات و درآمد از بات‌ها تأمین می‌شود." },
  { question: "چگونه قیمت پست تبلیغاتی را تعیین کنیم؟", answer: "قیمت پست تبلیغاتی معمولاً بر اساس تعداد اعضا، نرخ تعامل و موضوع کانال تعیین می‌شود. فرمول رایج: تعداد اعضا × ۰.۰۵ تا ۰.۱ تومان." },
  { question: "آیا درآمد تلگرام پایدار است؟", answer: "بله، با استراتژی مناسب و تولید محتوای با کیفیت، درآمد تلگرام می‌تواند پایدار و مستمر باشد. تنوع بخشی به منابع درآمد مهم است." },
  { question: "حداقل تعداد اعضا برای کسب درآمد چقدر است؟", answer: "هیچ حداقل مشخصی وجود ندارد، اما کانال‌های با بیش از ۱,۰۰۰ عضو فعال معمولاً درآمد بهتری دارند." },
  { question: "درآمد از کمپین عضوگیری چقدر است؟", answer: "در آپلت، به ازای هر عضو جذب شده ۴۰۰ تومان درآمد کسب می‌کنید. با ۱,۰۰۰ عضو در ماه، درآمد شما ۴۰۰,۰۰۰ تومان خواهد بود." },
];

export default function IncomeCalculatorPage() {
  return (
    <>
      <JsonLd
        data={howToSchema({
          name: "محاسبه درآمد تلگرام",
          description: "درآمد بالقوه کانال تلگرام خود را محاسبه کنید.",
          steps: [
            { name: "تعداد اعضا", text: "تعداد اعضای فعلی کانال خود را وارد کنید." },
            { name: "تعداد پست تبلیغاتی", text: "تعداد پست‌های تبلیغاتی در هفته را مشخص کنید." },
            { name: "قیمت هر پست", text: "قیمت هر پست تبلیغاتی بر اساس تعداد اعضا را وارد کنید." },
          ],
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#3B82F6]/10 text-[#F59E0B]">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">محاسبه درآمد تلگرام</h1>
            <p className="text-sm text-text-secondary">درآمد بالقوه کانال خود را محاسبه کنید</p>
          </div>
        </div>

        <IncomeCalculator />

        {/* What is Income */}
        <section className="mt-16">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">درآمد کانال تلگرام چیست؟</h2>
          <div className="text-sm text-text-secondary leading-relaxed space-y-3">
            <p>
              درآمد کانال تلگرام به مجموع درآمدهایی گفته می‌شود که از طریق مدیریت و بهره‌برداری از یک کانال تلگرامی کسب می‌شود. این درآمد می‌تواند از منابع مختلفی مانند تبلیغات، فروش محصولات، خدمات مشاوره و کمپین‌های عضوگیری تأمین شود.
            </p>
            <p>
              محاسبه دقیق درآمد بالقوه به شما کمک می‌کند اهداف مالی واقع‌بینانه تعیین کنید و استراتژی درآمدزایی خود را برنامه‌ریزی کنید. فاکتورهای مهم شامل تعداد اعضا، نرخ تعامل، نوع محتوا و موضوع کانال هستند.
            </p>
          </div>
        </section>

        {/* Income Sources */}
        <section className="mt-12 rounded-2xl border border-[#F59E0B]/15 bg-gradient-to-br from-[#F59E0B]/5 to-[#3B82F6]/3 p-6">
          <h2 className="text-lg font-extrabold text-text-primary mb-4">منابع اصلی درآمد تلگرام</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { title: "اسپانسرشیپ", desc: "فروش فضای تبلیغاتی به برندها" },
              { title: "کمپین عضوگیری", desc: "درآمد از جذب اعضای واقعی (۴۰۰ تومان/عضو)" },
              { title: "فروش محصولات", desc: "فروش مستقیم کالا و خدمات" },
              { title: "خدمات مشاوره", desc: "ارائه مشاوره تخصصی" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-xl bg-surface/50 border border-border/30 p-3">
                <CheckCircle className="h-4 w-4 text-[#F59E0B] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-text-primary">{item.title}</p>
                  <p className="text-[10px] text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Guide */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">راهنمای قیمت‌گذاری پست تبلیغاتی</h2>
          <div className="rounded-xl bg-surface border border-border/40 p-5">
            <p className="text-sm text-text-secondary mb-3">فرمول رایج قیمت‌گذاری پست تبلیغاتی:</p>
            <div className="rounded-xl bg-background border border-border/30 p-3 mb-3">
              <p className="text-sm font-mono text-text-primary text-center">قیمت هر پست = تعداد اعضای فعال × ۰.۰۵ تا ۰.۱ تومان</p>
            </div>
            <div className="space-y-2 text-xs text-text-secondary">
              <p><strong>مثال برای کانال ۱۰,۰۰۰ عضوی:</strong></p>
              <p>• قیمت پایه: ۱۰,۰۰۰ × ۰.۰۵ = ۵۰۰ تومان</p>
              <p>• قیمت بالا: ۱۰,۰۰۰ × ۰.۱ = ۱,۰۰۰ تومان</p>
              <p>• درآمد ماهانه (با ۱۰ پست): ۵,۰۰۰,۰۰۰ تا ۱۰,۰۰۰,۰۰۰ تومان</p>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-[#F59E0B]" />
            نکات افزایش درآمد
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "نرخ تعامل را افزایش دهید", text: "کانال‌های با نرخ تعامل بالاتر قیمت تبلیغاتی بیشتری دریافت می‌کنند." },
              { title: "محتوای منظم تولید کنید", text: "کانال‌های فعال و منظم مخاطبان بیشتری جذب می‌کنند." },
              { title: "تنویع منابع درآمد", text: "از چند منبع درآمد مختلف استفاده کنید تا ریسک کاهش یابد." },
              { title: "عملکرد را رصد کنید", text: "آمار درآمد و هزینه‌ها را به طور منظم بررسی کنید." },
            ].map((tip) => (
              <div key={tip.title} className="rounded-2xl border border-border/40 bg-surface p-5 shadow-sm">
                <h3 className="font-bold text-text-primary mb-1 text-sm">{tip.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{tip.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-text-primary mb-4">سوالات متداول</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border/40 bg-surface p-5 shadow-sm">
                <h3 className="font-bold text-text-primary mb-1 text-sm">{faq.question}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع درآمدزایی
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
