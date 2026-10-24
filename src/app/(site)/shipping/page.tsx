import type { Metadata } from "next";
import SimplePage from "@/src/components/site/SimplePage";

export const metadata: Metadata = { title: "روش‌های ارسال" };

export default function ShippingPage() {
  return (
    <SimplePage
      eyebrow="پشتیبانی"
      title="روش‌های ارسال"
      intro="اطلاعات مربوط به ارسال سفارش‌ها."
    >
      <p>
        روش‌های ارسال و زمان‌بندی تحویل هنوز نهایی نشده است. این صفحه به‌عنوان جایگاه اطلاعات
        آینده ایجاد شده و پس از تعیین شرایط واقعی ارسال تکمیل می‌شود.
      </p>
      <p>
        هیچ تعهدی درباره زمان تحویل یا هزینه ارسال در این نسخه ارائه نمی‌شود.
      </p>
    </SimplePage>
  );
}
