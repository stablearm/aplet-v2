import type { Metadata } from "next";
import { Mail, MessageCircle, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "ارتباط با تیم پشتیبانی آپلت. پاسخگویی سوالات شما درباره مدیریت کانال تلگرام، کمپین و درآمدزایی.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "ایمیل پشتیبانی",
    value: "support@aplet.ir",
    description: "برای سوالات فنی و پشتیبانی",
    href: "mailto:support@aplet.ir",
  },
  {
    icon: MessageCircle,
    title: "تلگرام",
    value: "@aplet_support",
    description: "پاسخ سریع در تلگرام",
    href: "https://t.me/aplet_support",
  },
  {
    icon: Clock,
    title: "ساعت کاری",
    value: "شنبه تا پنجشنبه",
    description: "۹ صبح تا ۶ عصر",
    href: undefined,
  },
];

export default function ContactPage() {
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
            <Send className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">تماس با ما</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            ما اینجاییم <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">کمک کنیم</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            سوالی دارید؟ با ما در تماس باشید. تیم پشتیبانی ما آماده پاسخگویی است.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="group rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-lg hover:border-[#5B5FEF]/20 hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B5FEF]/15 to-[#3B82F6]/15 text-[#5B5FEF] mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <method.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-text-primary mb-1">{method.title}</h3>
              {method.href ? (
                <a href={method.href} className="text-[#5B5FEF] font-bold text-sm hover:underline">
                  {method.value}
                </a>
              ) : (
                <p className="text-[#5B5FEF] font-bold text-sm">{method.value}</p>
              )}
              <p className="text-xs text-text-tertiary mt-2">{method.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="rounded-3xl border border-border/40 bg-gradient-to-br from-surface to-surface-elevated p-10 text-center shadow-sm">
          <h2 className="text-xl font-extrabold text-text-primary mb-3">سوالات متداول</h2>
          <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
            شاید پاسخ سوال شما از قبل در بخش سوالات متداول موجود باشد.
          </p>
          <a
            href="/faq/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-7 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            مشاهده سوالات متداول
          </a>
        </div>
      </main>
    </>
  );
}
