"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "آپلت چیست؟",
    answer: "آپلت یک سیستم عامل کسب و کار تلگرام است که ابزارهای لازم برای مدیریت کانال، اجرای کمپین و درآمدزایی را در یک فضای کاری ارائه می‌دهد.",
  },
  {
    question: "چگونه می‌توانم از کانال خود درآمد کسب کنم؟",
    answer: "کافی است کانال تلگرام خود را به آپلت متصل کنید. سپس می‌توانید کمپین‌های اسپانسرشیپ دریافت کنید و به ازای هر عضو جذب شده درآمد کسب کنید.",
  },
  {
    question: "هزینه استفاده از آپلت چقدر است؟",
    answer: "ثبت نام در آپلت رایگان است. پلن‌های متنوعی از رایگان تا سازمانی برای نیازهای مختلف شما ارائه شده است. می‌توانید از پلن رایگان شروع کنید و در صورت نیاز ارتقا دهید.",
  },
  {
    question: "آیا نیاز به دانش فنی دارم؟",
    answer: "خیر، آپلت طوری طراحی شده که هر کسی بتواند بدون دانش فنی از آن استفاده کند. فرآیند اتصال کانال و ایجاد کمپین بسیار ساده است و فقط چند کلیک طول می‌کشد.",
  },
  {
    question: "نرخ درآمدزایی چقدر است؟",
    answer: "ناشران به ازای هر عضو جذب شده از طریق کمپین اسپانسرشیپ، ۴۰۰ تومان درآمد کسب می‌کنند. این نرخ برای تمام کمپین‌ها یکسان است.",
  },
  {
    question: "آیا امکان برداشت درآمد وجود دارد؟",
    answer: "بله، پس از رسیدن موجودی به حداقل مبلغ برداشت (۱,۰۰۰,۰۰۰ تومان)، می‌توانید درآمد خود را به حساب بانکی یا کیف پول TON برداشت کنید.",
  },
  {
    question: "بات محتوا چیست؟",
    answer: "بات محتوا یک ربات تلگرامی هوشمند است که به کانال شما متصل می‌شود و محتوای خودکار و منظم منتشر می‌کند. این بات‌ها می‌توانند محتوای از پیش تعیین شده یا تولید شده توسط هوش مصنوعی را منتشر کنند.",
  },
  {
    question: "آیا امکان مدیریت چند کانال وجود دارد؟",
    answer: "بله، بسته به پلن اشتراک خود، می‌توانید چندین کانال و گروه تلگرامی را مدیریت کنید. پلن رایگان شامل ۱ پلتفرم و پلن‌های پولی تا ۲۰ پلتفرم را پشتیبانی می‌کنند.",
  },
];

function FaqItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border/40 bg-surface shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-5 text-right"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5B5FEF]/10 text-[#5B5FEF] text-sm font-bold">
          {index + 1}
        </span>
        <span className="flex-1 font-bold text-text-primary text-sm leading-relaxed">
          {faq.question}
        </span>
        <ChevronDown className={`h-4 w-4 text-text-tertiary shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-5 pb-5 pl-17">
          <p className="text-sm text-text-secondary leading-relaxed pr-12">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-radial from-[#5B5FEF]/6 via-[#5B5FEF]/2 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-gradient-radial from-[#3B82F6]/4 via-[#3B82F6]/1 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle, #5B5FEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        </div>
        <div className="container relative mx-auto px-4 pt-28 pb-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#5B5FEF]/20 bg-[#5B5FEF]/8 px-3.5 py-1.5 mb-6">
            <HelpCircle className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">سوالات متداول</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            سوالات <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">متداول</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            پاسخ سوالات رایج درباره آپلت و خدمات ما
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 rounded-3xl border border-border/40 bg-gradient-to-br from-surface to-surface-elevated p-10 text-center shadow-sm">
          <h2 className="text-xl font-extrabold text-text-primary mb-3">سوال دیگری دارید؟</h2>
          <p className="text-sm text-text-secondary mb-6">تیم پشتیبانی ما آماده پاسخگویی به سوالات شما است.</p>
          <a
            href="mailto:support@aplet.ir"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-7 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            تماس با پشتیبانی
          </a>
        </div>
      </main>
    </>
  );
}
