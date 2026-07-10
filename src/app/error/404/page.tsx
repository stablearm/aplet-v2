import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-muted-foreground mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-semibold mb-2">یافت نشد</h2>
        <p className="text-muted-foreground mb-6">صفحه مورد نظر شما وجود ندارد.</p>
        <Link href="/" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary-hover">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
