import Image from "next/image";
import { LeafIcon, SparkIcon } from "@/src/components/site/Icons";

const PILLARS = [
  {
    title: "انتخاب مواد اولیه",
    text: "تمرکز بر کیفیت مواد اولیه و رایحه طبیعی زعفران در فرمولاسیون.",
  },
  {
    title: "هماهنگی طعم",
    text: "ترکیب متعادل طعم‌های میوه‌ای با ته‌مایه گرم زعفران.",
  },
  {
    title: "طراحی تجربه",
    text: "توجه به جزئیات بسته‌بندی و تجربه نوشیدن در هر محصول.",
  },
];

export default function BrandPromise() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="promise-heading">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-4 py-2 text-xs text-cherry">
            <SparkIcon className="h-4 w-4" />
            الهام از طبیعت، نگاه رو به آینده
          </span>

          <h2
            id="promise-heading"
            className="mt-6 text-3xl font-bold leading-[1.4] tracking-tight text-ink md:text-4xl"
          >
            نگاهی تازه به انرژی روزمره
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-ink/60">
            هپی‌نس با الهام از زعفران ایرانی و ترکیب آن با طعم‌های میوه‌ای، به‌دنبال خلق
            تجربه‌ای متفاوت در دنیای نوشیدنی‌هاست؛ تجربه‌ای که کیفیت مواد اولیه، طراحی مدرن و
            لذت طعم را کنار هم قرار می‌دهد.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t border-ink/10 pt-5">
                <LeafIcon className="h-5 w-5 text-cherry" />
                <h3 className="mt-3 text-sm font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-6 text-ink/55">{pillar.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-xs leading-6 text-ink/40">
            این بخش معرفی فلسفه برند هپی‌نس است و ادعای علمی، درمانی یا تأییدشده‌ای ارائه
            نمی‌کند.
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-softgray">
            <Image
              src="/products/bottle-ingredients.png"
              alt="بطری هپی‌نس در کنار زعفران و جو"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-6 rounded-2xl border border-ink/10 bg-white px-5 py-4 shadow-sm">
            <p className="font-display text-xl text-cherry">Happiness</p>
            <p className="mt-1 text-[11px] text-ink/50">سافران و جو، طعمی متفاوت</p>
          </div>
        </div>
      </div>
    </section>
  );
}
