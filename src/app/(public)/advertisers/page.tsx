import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "برای تبلیغ‌دهندگان",
  description: "اعضای هدفمند جذب کنید. کمپین عضوگیری بسازید، کانال‌های هدفمند را پیدا کنید و مخاطبان واقعی جذب کنید.",
};

export default function AdvertisersPage() {
  return (
    <>
      <section className="container mx-auto px-4 py-24 text-center">
        <p className="text-sm text-[#5B5FEF] font-semibold mb-4">برای تبلیغ‌دهندگان</p>
        <h1 className="text-4xl font-extrabold tracking-tight mb-6">اعضای هدفمند جذب کنید.</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
          کمپین عضوگیری بسازید، کانال‌های هدفمند را پیدا کنید و مخاطبان واقعی جذب کنید.
        </p>
        <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-8 text-sm font-bold text-white shadow-lg shadow-[#5B5FEF]/25 hover:shadow-xl hover:shadow-[#5B5FEF]/35 hover:scale-[1.02] transition-all duration-200">
          شروع کنید
        </Link>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "۱", title: "کمپین بسازید", desc: "کانال هدف و تعداد عضو را مشخص کنید." },
            { step: "۲", title: "اعتبارسنجی", desc: "بات ما کانال را بررسی و فعال می‌کند." },
            { step: "۳", title: "عضو جذب کنید", desc: "اعضای واقعی و هدفمند جذب کانال شما می‌شوند." },
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
