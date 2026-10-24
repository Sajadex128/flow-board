import type { Metadata } from "next";
import SimplePage from "@/src/components/site/SimplePage";

export const metadata: Metadata = { title: "پیگیری سفارش" };

export default function OrderTrackingPage() {
  return (
    <SimplePage
      eyebrow="پشتیبانی"
      title="پیگیری سفارش"
      intro="وضعیت سفارش خود را دنبال کنید."
    >
      <p>
        امکان پیگیری سفارش پس از فعال‌سازی سیستم سفارش‌ها در دسترس خواهد بود. در این نسخه، سبد
        خرید به‌صورت محلی در مرورگر شما ذخیره می‌شود و سفارشی ثبت نمی‌گردد.
      </p>
      <p>
        برای پیگیری درخواست‌های فعلی، لطفاً از طریق صفحه تماس با ما با ما در ارتباط باشید.
      </p>
    </SimplePage>
  );
}
