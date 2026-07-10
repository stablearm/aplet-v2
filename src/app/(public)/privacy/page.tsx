import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "سیاست حریم خصوصی آپلت: نحوه جمع‌آوری، استفاده و حفاظت از اطلاعات کاربران.",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-3xl font-extrabold mb-8">حریم خصوصی</h1>
      <div className="space-y-6 text-text-secondary">
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۱. جمع‌آوری اطلاعات</h2>
          <p className="text-sm leading-relaxed">
            ما اطلاعاتی مانند نام، شماره تلگرام و اطلاعات پرداخت را برای ارائه خدمات جمع‌آوری می‌کنیم.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۲. استفاده از اطلاعات</h2>
          <p className="text-sm leading-relaxed">
            اطلاعات شما فقط برای ارائه خدمات و بهبود تجربه کاربری استفاده می‌شود.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۳. حفاظت از اطلاعات</h2>
          <p className="text-sm leading-relaxed">
            ما از فناوری‌های امنیتی پیشرفته برای حفاظت از اطلاعات شما استفاده می‌کنیم.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۴. اشتراک‌گذاری اطلاعات</h2>
          <p className="text-sm leading-relaxed">
            اطلاعات شما بدون اجازه شما با شخص ثالثی به اشتراک گذاشته نمی‌شود مگر در موارد قانونی.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۵. کوکی‌ها</h2>
          <p className="text-sm leading-relaxed">
            ما از کوکی‌ها برای بهبود تجربه کاربری استفاده می‌کنیم. شما می‌توانید تنظیمات کوکی را تغییر دهید.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۶. تماس با ما</h2>
          <p className="text-sm leading-relaxed">
            برای سؤالات مربوط به حریم خصوصی با ما تماس بگیرید.
          </p>
        </section>
      </div>
    </main>
  );
}
