import type { Metadata } from "next";
import Link from "next/link";
import { Wallet, DollarSign, TrendingUp, ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schemas";
import { CtaBanner } from "@/components/content/cta-banner";

export const metadata: Metadata = {
  title: "کسب درآمد از تلگرام",
  description: "راهنمای کسب درآمد از تلگرام. روش‌های مختلف درآمدزایی شامل اسپانسرشیپ، کمپین عضوگیری و فروش محصولات.",
};

const faqs = [
  { question: "آیا می‌توان از تلگرام درآمد کسب کرد؟", answer: "بله، با داشتن کانال موفق و استراتژی مناسب می‌توانید درآمد قابل توجهی از تلگرام کسب کنید." },
  { question: "حداقل تعداد اعضا برای درآمدزایی چقدر است؟", answer: "هیچ حداقل مشخصی وجود ندارد، اما کانال‌های با بیش از ۱۰۰۰ عضو فعال معمولاً درآمد بهتری دارند." },
  { question: "نرخ درآمدزایی در آپلت چقدر است؟", answer: "در آپلت، ناشران به ازای هر عضو جذب شده از طریق کمپین اسپانسرشیپ، ۴۰۰ تومان درآمد کسب می‌کنند." },
];

const methods = [
  { icon: DollarSign, title: "اسپانسرشیپ", description: "فضای تبلیغاتی کانال خود را به برندها و کسب و کارها بفروشید." },
  { icon: TrendingUp, title: "کمپین عضوگیری", description: "از طریق کمپین‌های عضوگیری آپلت به ازای هر عضو درآمد کسب کنید." },
  { icon: Wallet, title: "فروش محصولات", description: "محصولات و خدمات خود را مستقیماً از طریق تلگرام بفروشید." },
];

export default function TelegramMonetizationPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <main>
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/5 px-4 py-1.5 mb-8">
            <Wallet className="h-3.5 w-3.5 text-[#F59E0B]" />
            <span className="text-xs font-semibold text-[#F59E0B]">کسب درآمد از تلگرام</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary mb-6">
            کسب درآمد از <span className="bg-gradient-to-l from-[#F59E0B] to-[#3B82F6] bg-clip-text text-transparent">تلگرام</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            با روش‌های مختلف درآمدزایی، از کانال تلگرام خود درآمد پایدار کسب کنید.
          </p>
          <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            شروع درآمدزایی
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {methods.map((method) => (
              <div key={method.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#3B82F6]/10 text-[#F59E0B] mb-5">
                  <method.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2">{method.title}</h3>
                <p className="text-sm text-text-secondary">{method.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-24 max-w-3xl">
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

        <section className="container mx-auto px-4 pb-24 max-w-3xl">
          <CtaBanner />
        </section>
      </main>
    </>
  );
}
