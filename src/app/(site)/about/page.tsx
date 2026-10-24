import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, LeafIcon, ShieldIcon, SparkIcon } from "@/src/components/site/Icons";

export const metadata: Metadata = {
  title: "درباره هپی‌نس",
  description:
    "داستان هپی‌نس، الهام از زعفران ایرانی و نگاه ما به کیفیت، طعم و تجربه نوشیدن.",
};

const VALUES = [
  {
    icon: SparkIcon,
    title: "الهام از زعفران",
    text: "زعفران ایرانی، سرچشمه هویت طعم و رایحه محصولات هپی‌نس است.",
  },
  {
    icon: ShieldIcon,
    title: "کیفیت در اولویت",
    text: "تمرکز بر انتخاب مواد اولیه و ثبات کیفیت در هر محصول.",
  },
  {
    icon: LeafIcon,
    title: "طعم‌های متفاوت",
    text: "کشف ترکیب‌های میوه‌ای تازه در کنار رایحه گرم زعفران.",
  },
];

export default function AboutPage() {
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
          <span className="text-ink/70">درباره هپی‌نس</span>
        </nav>

        <header className="mt-8 max-w-3xl">
          <p className="text-xs tracking-widest text-cherry">درباره ما</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.3] tracking-tight text-ink md:text-5xl">
            طلای سرخ ایران، در نگاهی تازه
          </h1>
          <p className="mt-6 text-base leading-9 text-ink/60">
            هپی‌نس بر پایه احترام به میراث زعفران ایرانی و نگاه مدرن به نوشیدنی شکل گرفته است؛
            برندی که تلاش می‌کند کیفیت، طعم و تجربه را در کنار هم قرار دهد.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-softgray">
            <Image
              src="/products/bottle-ingredients.png"
              alt="بطری هپی‌نس در کنار مواد اولیه"
              fill
              sizes="(max-width: 1024px) 92vw, 660px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <h2 className="text-2xl font-bold text-ink">فلسفه محصول</h2>
            <p className="text-sm leading-8 text-ink/60">
              ما باور داریم یک نوشیدنی خوب با انتخاب درست آغاز می‌شود. هر محصول هپی‌نس با تمرکز
              بر تعادل طعم، رایحه طبیعی و تجربه نوشیدن توسعه پیدا می‌کند.
            </p>
            <p className="text-sm leading-8 text-ink/60">
              در این مسیر، طراحی بسته‌بندی و جزئیات بصری نیز بخشی از تجربه هستند؛ زیرا باور داریم
              کیفیت در جزئیات دیده می‌شود.
            </p>
            <p className="text-xs leading-6 text-ink/40">
              محتوای این صفحه معرفی برند است و شامل ادعای درمانی، پزشکی یا تأییدشده علمی نمی‌شود.
            </p>
          </div>
        </div>

        <section className="mt-16" aria-labelledby="values-heading">
          <h2 id="values-heading" className="text-2xl font-bold text-ink">
            ارزش‌های ما
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-cream p-7">
                <Icon className="h-6 w-6 text-cherry" />
                <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-ink/55">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 flex flex-wrap items-center gap-4 rounded-3xl bg-navy px-8 py-10 text-white">
          <div className="flex-1">
            <h2 className="text-xl font-bold">مجموعه محصولات را ببینید</h2>
            <p className="mt-2 text-sm text-white/60">
              طعم‌های متفاوت هپی‌نس را در فروشگاه مرور کنید.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            مشاهده محصولات
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
