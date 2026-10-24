import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@/src/components/site/Icons";

const CARDS = [
  {
    id: "beverages",
    href: "/products?category=beverages",
    titleFa: "نوشیدنی‌ها",
    titleEn: "Beverages",
    caption: "نوشیدنی‌های زعفرانی و میوه‌ای",
    image: "/products/bottle-ice.png",
    imageClassName: "object-contain p-8",
  },
  {
    id: "gourmet",
    href: "/products?category=gourmet",
    titleFa: "طعم‌های خاص",
    titleEn: "Gourmet",
    caption: "بسته‌های منتخب و ترکیب‌های ویژه",
    image: "/products/bottle-ingredients.png",
    imageClassName: "object-cover",
  },
];

export default function CategoryCards() {
  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-widest text-cherry">مجموعه‌ها</p>
            <h2 id="categories-heading" className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              از کجا شروع کنیم؟
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-cherry"
          >
            مشاهده همه محصولات
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative block overflow-hidden rounded-3xl bg-navy"
            >
              <div className="relative aspect-[4/3] w-full lg:aspect-[16/11]">
                <Image
                  src={card.image}
                  alt={`دسته‌بندی ${card.titleFa}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className={`${card.imageClassName} transition-transform duration-700 group-hover:scale-105`}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent"
                  aria-hidden
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <div>
                  <p className="text-xs tracking-[0.2em] text-gold">{card.titleEn}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                    {card.titleFa}
                  </h3>
                  <p className="mt-2 text-sm text-white/65">{card.caption}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <ArrowLeftIcon className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
