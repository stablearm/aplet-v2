import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CtaBannerProps {
  title?: string;
  description?: string;
  href?: string;
  ctaText?: string;
}

export function CtaBanner({
  title = "آماده شروع هستید؟",
  description = "همین الان رایگان ثبت‌نام کنید و کسب و کار تلگرامی خود را متحول کنید.",
  href = "/register",
  ctaText = "شروع رایگان",
}: CtaBannerProps) {
  return (
    <section className="relative rounded-3xl bg-gradient-to-l from-[#5B5FEF] via-[#4F52E5] to-[#3B82F6] p-10 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <h2 className="relative text-xl font-extrabold text-white mb-3">{title}</h2>
      <p className="relative text-white/80 text-sm mb-8 max-w-md mx-auto leading-relaxed">{description}</p>
      <Link
        href={href}
        className="relative inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-[#5B5FEF] shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-200"
      >
        {ctaText}
        <ArrowLeft className="h-4 w-4" />
      </Link>
    </section>
  );
}
