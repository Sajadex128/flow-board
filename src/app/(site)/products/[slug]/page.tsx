import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartPanel from "@/src/components/site/AddToCartPanel";
import ProductCard from "@/src/components/site/ProductCard";
import ProductGallery from "@/src/components/site/ProductGallery";
import {
  availabilityLabel,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/src/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };

  return {
    title: product.nameFa,
    description: product.shortDescription,
    openGraph: {
      title: `${product.nameFa} | هپی‌نس`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="bg-white pb-20 pt-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <nav aria-label="مسیر صفحه" className="text-xs text-ink/45">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-cherry">
                خانه
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/products" className="hover:text-cherry">
                محصولات
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink/70">{product.nameFa}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.gallery} alt={product.nameFa} />

          <div>
            <p className="text-xs tracking-[0.25em] text-cherry">{product.flavorEn}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {product.nameFa}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
              <span
                className={
                  product.availability === "in-stock"
                    ? "rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700"
                    : "rounded-full bg-gold/15 px-3 py-1.5 text-gold"
                }
              >
                {availabilityLabel[product.availability]}
              </span>
              <span className="text-ink/50">حجم: {product.packageSize}</span>
              <span className="text-ink/50">طعم: {product.flavor}</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              {product.originalPrice && (
                <span className="text-sm text-ink/35 line-through">
                  {product.originalPrice.toLocaleString("fa-IR")}
                </span>
              )}
              <span className="text-2xl font-bold text-ink">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <p className="mt-6 text-sm leading-8 text-ink/60">{product.description}</p>

            <AddToCartPanel product={product} />

            <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold text-ink">ترکیبات</h2>
                <ul className="mt-4 space-y-2 text-xs text-ink/60">
                  {product.ingredients.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[11px] leading-5 text-ink/35">
                  فهرست ترکیبات در این نسخه نمونه است و باید با اطلاعات تأییدشده محصول جایگزین
                  شود.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-ink">اطلاعات محصول</h2>
                <dl className="mt-4 space-y-2 text-xs">
                  {product.nutrition.map((row) => (
                    <div key={row.label} className="flex justify-between gap-4">
                      <dt className="text-ink/50">{row.label}</dt>
                      <dd className="text-ink/75">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-bold text-ink">
              محصولات مرتبط
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
