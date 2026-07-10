import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شرایط استفاده",
  description: "شرایط و قوانین استفاده از خدمات آپلت: سیستم عامل کسب و کار تلگرام.",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-3xl font-extrabold mb-8">شرایط استفاده</h1>
      <div className="space-y-6 text-text-secondary">
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۱. پذیرش شرایط</h2>
          <p className="text-sm leading-relaxed">
            با استفاده از خدمات آپلت، شما شرایط استفاده را می‌پذیرید. اگر با شرایط موافق نیستید، لطفاً از خدمات استفاده نکنید.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۲. توضیح خدمات</h2>
          <p className="text-sm leading-relaxed">
            آپلت یک پلتفرم مدیریت رشد تلگرام است که خدمات کمپین عضوگیری، مدیریت پلتفرم و درآمدزایی ارائه می‌دهد.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۳. حساب کاربری</h2>
          <p className="text-sm leading-relaxed">
            شما مسئول حفظ امنیت حساب کاربری خود هستید. هر فعالیتی که از طریق حساب شما انجام شود، مسئولیت آن بر عهده شماست.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۴. پرداخت و بازپرداخت</h2>
          <p className="text-sm leading-relaxed">
            تمامی پرداخت‌ها غیرقابل بازگشت هستند مگر در مواردی که قانون مشخص کرده باشد.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۵. مسئولیت‌ها</h2>
          <p className="text-sm leading-relaxed">
            کاربران مسئول محتوایی هستند که منتشر می‌کنند. آپلت مسئولیتی در قبال محتوای کاربران ندارد.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-3">۶. تغییرات شرایط</h2>
          <p className="text-sm leading-relaxed">
            آپلت حق تغییر شرایط استفاده را در هر زمان دارد. تغییرات از طریق وب‌سایت اطلاع‌رسانی خواهد شد.
          </p>
        </section>
      </div>
    </main>
  );
}
