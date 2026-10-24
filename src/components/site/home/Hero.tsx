import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, SparkIcon } from "@/src/components/site/Icons";

const PARTICLES = [
  { top: "18%", right: "12%", size: 6, delay: "0s" },
  { top: "34%", right: "26%", size: 4, delay: "1.4s" },
  { top: "62%", right: "8%", size: 5, delay: "0.7s" },
  { top: "74%", right: "30%", size: 3, delay: "2.1s" },
  { top: "26%", right: "44%", size: 4, delay: "1.1s" },
  { top: "52%", right: "38%", size: 3, delay: "2.6s" },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-burgundy text-white">
      {/* atmospheric layers */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_10%,#7d1023_0%,#4b0714_45%,#2c040d_100%)]"
        aria-hidden
      />
      <div
        className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-brandred/25 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[110px]"
        aria-hidden
      />
      <div className="hs-grain absolute inset-0 opacity-70" aria-hidden />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-20 pt-32 md:px-10 lg:min-h-screen lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-0 lg:pt-24">
        <div className="hs-rise order-2 max-w-2xl lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-2 text-xs text-gold backdrop-blur">
            <SparkIcon className="h-4 w-4" />
            نسل تازه نوشیدنی‌های عملکردی
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-[1.25] tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.2]">
            انرژی متفاوت،
            <br />
            با الهام از <span className="text-gold">طلای سرخ ایران</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg sm:leading-9">
            تجربه‌ای تازه از نوشیدنی‌های زعفرانی و میوه‌ای؛ ترکیبی از طعم، کیفیت و نگاهی مدرن
            به انرژی روزانه.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              کشف محصولات
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/#story"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition-colors hover:border-gold/70 hover:text-gold"
            >
              داستان هپی‌نس
            </Link>
          </div>

          <p className="mt-10 text-sm text-white/40">
            Feel the Energy. Discover the Golden Essence.
          </p>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[520px] lg:order-2 lg:max-w-none">
          <div className="hs-float relative aspect-square w-full">
            <Image
              src="/products/bottle-dark.png"
              alt="بطری نوشیدنی زعفرانی هپی‌نس روی پس‌زمینه تیره"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
            />
          </div>

          {PARTICLES.map((p, i) => (
            <span
              key={i}
              aria-hidden
              className="hs-float absolute rounded-full bg-gold/70 blur-[0.5px]"
              style={{
                top: p.top,
                right: p.right,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
