import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ArrowLeft, DollarSign, Users, TrendingUp, BarChart3, Percent, Clock, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "ابزارها",
  description: "ابزارهای رایگان آپلت برای محاسبه و تحلیل عملکرد کسب و کار تلگرامی. ماشین حساب درآمد، CPM، نرخ تعامل و رشد.",
};

const tools = [
  { title: "محاسبه درآمد تلگرام", description: "درآمد بالقوه کانال تلگرام خود را محاسبه کنید و ببینید چقدر می‌توانید کسب درآمد کنید.", icon: DollarSign, href: "/tools/income-calculator/", color: "from-[#F59E0B]/10 to-[#D97706]/10", iconColor: "text-[#F59E0B]" },
  { title: "محاسبه CPM", description: "هزینه هر هزار بازدید تبلیغات را محاسبه کنید و کمپین‌های خود را بهینه کنید.", icon: BarChart3, href: "/tools/cpm-calculator/", color: "from-[#3B82F6]/10 to-[#2563EB]/10", iconColor: "text-[#3B82F6]" },
  { title: "محاسبه نرخ تعامل", description: "نرخ تعامل کانال خود را اندازه‌گیری کنید و محتوای بهتری تولید کنید.", icon: Percent, href: "/tools/engagement-calculator/", color: "from-[#10B981]/10 to-[#059669]/10", iconColor: "text-[#10B981]" },
  { title: "محاسبه رشد", description: "رشد آینده کانال خود را پیش‌بینی کنید و برنامه‌ریزی کنید.", icon: TrendingUp, href: "/tools/growth-calculator/", color: "from-[#5B5FEF]/10 to-[#4F52E5]/10", iconColor: "text-[#5B5FEF]" },
  { title: "محاسبه ROI", description: "بازگشت سرمایه تبلیغات خود را محاسبه کنید و سرمایه‌گذاری هوشمندانه‌تری انجام دهید.", icon: Calculator, href: "/tools/roi-calculator/", color: "from-[#EF4444]/10 to-[#DC2626]/10", iconColor: "text-[#EF4444]" },
  { title: "تعداد پست مناسب", description: "تعداد بهینه پست در هفته را محاسبه کنید و برنامه محتوایی خود را تنظیم کنید.", icon: Clock, href: "/tools/post-frequency-calculator/", color: "from-[#8B5CF6]/10 to-[#7C3AED]/10", iconColor: "text-[#8B5CF6]" },
];

export default function ToolsPage() {
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
            <Wrench className="h-3.5 w-3.5 text-[#5B5FEF]" />
            <span className="text-xs font-semibold text-[#5B5FEF]">ابزارهای رایگان</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-5">
            ابزارهای <span className="bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] bg-clip-text text-transparent">تحلیلی</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            ابزارهای رایگان برای محاسبه و تحلیل عملکرد کسب و کار تلگرامی شما.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative rounded-3xl border border-border/40 bg-surface p-7 shadow-sm hover:shadow-xl hover:border-[#5B5FEF]/25 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className="relative">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} ${tool.iconColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary group-hover:text-[#5B5FEF] transition-colors mb-2">{tool.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{tool.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[#5B5FEF] font-semibold">
                  استفاده رایگان
                  <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
