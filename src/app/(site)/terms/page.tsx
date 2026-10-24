import type { Metadata } from "next";
import SimplePage from "@/src/components/site/SimplePage";

export const metadata: Metadata = { title: "قوانین و مقررات" };

export default function TermsPage() {
  return (
    <SimplePage
      eyebrow="قوانین"
      title="قوانین و مقررات"
      intro="شرایط استفاده از وب‌سایت هپی‌نس."
    >
      <p>
        استفاده از این وب‌سایت به معنای پذیرش قوانین و مقررات هپی‌نس است. محتوای این صفحه نمونه
        است و متن حقوقی نهایی پس از بازبینی جایگزین خواهد شد.
      </p>
      <p>
        تمامی نشان‌ها، تصاویر و محتوای این وب‌سایت متعلق به هپی‌نس است و استفاده مجدد از آن‌ها
        بدون اجازه کتبی مجاز نیست.
      </p>
    </SimplePage>
  );
}
