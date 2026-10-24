import Link from "next/link";
import ProductCard from "@/src/components/site/ProductCard";
import { ArrowLeftIcon } from "@/src/components/site/Icons";
import { categories, products } from "@/src/data/products";

export default function ProductCatalog() {
  return (
    <section className="bg-navy py-16 text-white md:py-24" aria-labelledby="catalog-heading">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs tracking-widest text-gold">مجموعه محصولات</p>
            <h2
              id="catalog-heading"
              className="mt-3 text-3xl font-bold leading-[1.35] tracking-tight md:text-5xl"
            >
              دنیای محصولات هپی‌نس
            </h2>
            <p className="mt-5 text-sm leading-8 text-white/60">
              محصولات هپی‌نس را با طعم‌ها و انتخاب‌های متنوع کشف کنید.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm transition-colors hover:border-gold hover:text-gold"
          >
            همه محصولات
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 space-y-14">
          {categories.map((category) => {
            const items = products.filter((p) => p.category === category.id);
            if (items.length === 0) return null;

            return (
              <div key={category.id} className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <h3 className="text-xl font-bold">{category.nameFa}</h3>
                  <p className="mt-1 text-xs tracking-[0.2em] text-white/35">
                    {category.nameEn}
                  </p>
                  <p className="mt-4 text-xs leading-6 text-white/55">
                    {category.description}
                  </p>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-xs text-gold hover:underline"
                  >
                    مشاهده دسته
                    <ArrowLeftIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="hs-scroll-x -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
                  {items.map((product) => (
                    <div
                      key={product.id}
                      className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-xs leading-6 text-white/35">
          قیمت‌ها، اندازه‌ها و وضعیت موجودی در این نسخه داده نمونه و قابل ویرایش هستند و به‌عنوان
          اطلاعات تأییدشده محصول ارائه نمی‌شوند.
        </p>
      </div>
    </section>
  );
}
