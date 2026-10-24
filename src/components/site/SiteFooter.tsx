import Link from "next/link";
import NewsletterForm from "@/src/components/site/NewsletterForm";

const QUICK_LINKS = [
  { label: "صفحه اصلی", href: "/" },
  { label: "فروشگاه", href: "/products" },
  { label: "درباره هپی‌نس", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
  { label: "پرسش‌های متداول", href: "/#faq" },
];

const SUPPORT_LINKS = [
  { label: "راهنمای خرید", href: "/guide" },
  { label: "روش‌های ارسال", href: "/shipping" },
  { label: "قوانین و مقررات", href: "/terms" },
  { label: "حریم خصوصی", href: "/privacy" },
  { label: "پیگیری سفارش", href: "/order-tracking" },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="hs-grain absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-20 md:px-10">
        <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl tracking-tight">Happiness</span>
              <span className="text-sm text-white/50">هپی‌نس</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              هپی‌نس؛ تجربه‌ای تازه از نوشیدنی‌های زعفرانی و میوه‌ای با نگاهی مدرن به طعم و
              کیفیت.
            </p>
            <p className="mt-6 text-sm text-gold">«طعم زندگی، انرژی از دل زعفران»</p>
          </div>

          <nav aria-label="دسترسی سریع">
            <h2 className="text-sm font-semibold text-white">دسترسی سریع</h2>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="پشتیبانی مشتریان">
            <h2 className="text-sm font-semibold text-white">پشتیبانی مشتریان</h2>
            <ul className="mt-5 space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-white">همراه هپی‌نس باشید</h2>
            <p className="mt-5 text-sm leading-7 text-white/60">
              از محصولات جدید و خبرهای هپی‌نس باخبر شوید.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} هپی‌نس. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              قوانین و مقررات
            </Link>
          </div>
        </div>

        <div
          className="select-none pb-2 text-center font-display text-[17vw] leading-[0.85] tracking-tight text-white/[0.055]"
          aria-hidden
        >
          HAPPINESS
        </div>
      </div>
    </footer>
  );
}
