import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/src/components/site/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/src/components/site/Icons";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "برای ارتباط با تیم هپی‌نس و پیگیری سفارش‌های عمده با ما در تماس باشید.",
};

const DETAILS = [
  { icon: MailIcon, label: "ایمیل", value: "hello@happiness.example" },
  { icon: PhoneIcon, label: "تلفن", value: "۰۲۱-۰۰۰۰۰۰۰۰" },
  { icon: PinIcon, label: "نشانی", value: "تهران، ایران" },
];

export default function ContactPage() {
  return (
    <div className="bg-white pb-20 pt-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <nav aria-label="مسیر صفحه" className="text-xs text-ink/45">
          <Link href="/" className="hover:text-cherry">
            خانه
          </Link>
          <span className="px-2" aria-hidden>
            /
          </span>
          <span className="text-ink/70">تماس با ما</span>
        </nav>

        <div className="mt-8 grid gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-xs tracking-widest text-cherry">ارتباط با ما</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              تماس با هپی‌نس
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-ink/55">
              پرسش، پیشنهاد یا درخواست خرید عمده دارید؟ فرم زیر را تکمیل کنید. این نسخه در حالت
              نمایشی است.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="rounded-3xl bg-cream p-8">
            <h2 className="text-lg font-bold text-ink">اطلاعات تماس</h2>
            <ul className="mt-6 space-y-5">
              {DETAILS.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-4">
                  <Icon className="h-5 w-5 shrink-0 text-cherry" />
                  <div>
                    <p className="text-xs text-ink/45">{label}</p>
                    <p className="mt-1 text-sm text-ink/80" dir="ltr">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-6 text-ink/40">
              اطلاعات تماس بالا نمونه و قابل ویرایش است؛ پس از تعیین اطلاعات رسمی جایگزین شود.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
