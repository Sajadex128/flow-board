import type { Metadata } from "next";
import SimplePage from "@/src/components/site/SimplePage";

export const metadata: Metadata = { title: "راهنمای خرید" };

export default function GuidePage() {
  return (
    <SimplePage
      eyebrow="پشتیبانی"
      title="راهنمای خرید"
      intro="راهنمای گام‌به‌گام خرید از فروشگاه هپی‌نس."
    >
      <p>
        برای خرید، محصول مورد نظر خود را انتخاب کنید، بسته‌بندی مناسب را برگزینید و آن را به سبد
        خرید اضافه کنید. سپس در صفحه سبد خرید، تعداد اقلام را بررسی و سفارش را نهایی کنید.
      </p>
      <p>
        در این نسخه، فرآیند پرداخت به‌صورت نمایشی است و تراکنش واقعی انجام نمی‌شود. پس از اتصال
        درگاه پرداخت، مراحل به‌صورت کامل فعال خواهد شد.
      </p>
    </SimplePage>
  );
}
