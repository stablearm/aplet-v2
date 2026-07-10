import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "برای ناشران",
  description: "از کانال تلگرام خود درآمد کسب کنید. متصل کردن کانال به آپلت، دریافت کمپین اسپانسرشیپ و کسب درآمد از مخاطبان.",
};

export default function PublishersPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-24 text-center">
        <p className="text-sm text-[#5B5FEF] font-semibold mb-4">برای ناشران</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">از کانال خود درآمد کسب کنید.</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
          کانال تلگرام خود را به آپلت متصل کنید، پلتفرم تبلیغاتی بسازید و از مخاطبان خود درآمد کسب کنید.
        </p>
        <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:shadow-[#5B5FEF]/35 hover:scale-[1.02] transition-all duration-200">
          شروع کنید
        </Link>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "۱", title: "کانال را متصل کنید", desc: "بات تلگرام را به کانال خود اضافه کنید." },
            { step: "۲", title: "کمپین دریافت کنید", desc: "تبلیغات اسپانسرشیپ دریافت کنید." },
            { step: "۳", title: "درآمد کسب کنید", desc: "به ازای هر عضو جذب شده درآمد دریافت کنید." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] text-white text-xl font-bold shadow-lg shadow-[#5B5FEF]/25 mb-5">
                {item.step}
              </div>
              <h3 className="font-bold text-lg text-text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
