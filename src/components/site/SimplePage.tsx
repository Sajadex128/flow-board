import Link from "next/link";
import type { ReactNode } from "react";

export default function SimplePage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
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
          <span className="text-ink/70">{title}</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="text-xs tracking-widest text-cherry">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">{title}</h1>
          {intro && <p className="mt-5 text-sm leading-8 text-ink/55">{intro}</p>}
        </header>

        <div className="mt-10 max-w-3xl space-y-6 text-sm leading-8 text-ink/60">
          {children}
        </div>

        <div className="mt-14 max-w-3xl rounded-3xl bg-cream p-8">
          <h2 className="text-base font-bold text-ink">این صفحه در حال تکمیل است</h2>
          <p className="mt-3 text-xs leading-7 text-ink/55">
            محتوای این صفحه به‌صورت نمونه ایجاد شده تا هیچ لینکی به صفحه‌ای ناموجود اشاره نکند.
            متن نهایی پس از تعیین سیاست‌های رسمی هپی‌نس جایگزین می‌شود.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm text-white transition-colors hover:bg-cherry"
          >
            تماس با ما
          </Link>
        </div>
      </div>
    </div>
  );
}
