import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@/src/components/site/Icons";

export default function BrandStory() {
  return (
    <section id="story" className="bg-cream py-16 md:py-24" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/6] overflow-hidden rounded-3xl bg-softgray">
            <Image
              src="/products/bottle-neck.png"
              alt="جزئیات برچسب و بطری هپی‌نس"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 hidden rounded-2xl bg-burgundy px-6 py-5 text-white sm:block">
            <p className="text-xs text-gold">Since</p>
            <p className="mt-1 font-display text-2xl">Happiness</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs tracking-widest text-cherry">داستان ما</p>
          <h2
            id="story-heading"
            className="mt-3 text-3xl font-bold leading-[1.4] tracking-tight text-ink md:text-4xl"
          >
            طلای سرخ ایران، در نگاهی تازه
          </h2>
          <p className="mt-6 text-base leading-8 text-ink/60">
            زعفران بخشی از میراث ارزشمند ایران است. هپی‌نس با الهام از این ماده ارزشمند و ترکیب
            آن با فرهنگ مدرن نوشیدنی، به‌دنبال ارائه تجربه‌ای تازه از طعم و کیفیت است.
          </p>
          <p className="mt-4 text-sm leading-8 text-ink/50">
            ما باور داریم یک نوشیدنی خوب، تنها یک انتخاب ساده نیست؛ فرصتی است برای لذت بردن از
            طعم، توجه به کیفیت و کشف ترکیب‌هایی که با ذائقه امروز هماهنگ‌اند.
          </p>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-cherry"
          >
            بیشتر درباره هپی‌نس
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
