import Link from "next/link";

export default function SiteNotFound() {
  return (
    <div className="bg-white pb-24 pt-40">
      <div className="mx-auto max-w-[1440px] px-5 text-center md:px-10">
        <p className="font-display text-6xl text-ink/15">۴۰۴</p>
        <h1 className="mt-6 text-3xl font-bold text-ink">این صفحه پیدا نشد</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-ink/55">
          ممکن است نشانی تغییر کرده باشد. می‌توانید از فروشگاه یا صفحه اصلی ادامه دهید.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="rounded-full bg-ink px-7 py-3.5 text-sm text-white transition-colors hover:bg-cherry"
          >
            مشاهده محصولات
          </Link>
          <Link
            href="/"
            className="rounded-full border border-ink/20 px-7 py-3.5 text-sm text-ink transition-colors hover:border-ink/50"
          >
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  );
}
