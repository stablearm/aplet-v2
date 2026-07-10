import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5B5FEF]/10 to-[#3B82F6]/10 mb-6">
          <Search className="h-8 w-8 text-[#5B5FEF]" />
        </div>
        <h1 className="text-6xl font-extrabold text-text-primary mb-3">۴۰۴</h1>
        <h2 className="text-xl font-bold text-text-primary mb-3">صفحه یافت نشد</h2>
        <p className="text-sm text-text-secondary mb-8 leading-relaxed">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-6 text-sm font-semibold text-white shadow-md shadow-[#5B5FEF]/25 hover:shadow-lg hover:shadow-[#5B5FEF]/30 hover:scale-[1.02] transition-all duration-200"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border/60 bg-surface/80 px-6 text-sm font-semibold text-text-primary hover:bg-surface hover:border-[#5B5FEF]/30 shadow-sm hover:shadow-md transition-all duration-200"
          >
            بلاگ
          </Link>
        </div>
      </div>
    </div>
  );
}
