import type { Metadata } from "next";
import SimplePage from "@/src/components/site/SimplePage";

export const metadata: Metadata = { title: "حریم خصوصی" };

export default function PrivacyPage() {
  return (
    <SimplePage
      eyebrow="حریم خصوصی"
      title="حریم خصوصی"
      intro="نحوه برخورد هپی‌نس با اطلاعات کاربران."
    >
      <p>
        ما به حریم خصوصی کاربران احترام می‌گذاریم. در این نسخه نمایشی، اطلاعات فرم‌ها به سروری
        ارسال نمی‌شود و تنها برای نمایش رفتار فرم استفاده می‌گردد.
      </p>
      <p>
        سیاست حریم خصوصی نهایی پس از راه‌اندازی سرویس‌های واقعی تدوین و در همین صفحه منتشر
        می‌شود.
      </p>
    </SimplePage>
  );
}
