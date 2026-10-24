import type { Metadata } from "next";
import ProductBrowser from "@/src/components/site/ProductBrowser";
import type { CategoryId } from "@/src/data/products";

export const metadata: Metadata = {
  title: "فروشگاه محصولات",
  description:
    "مجموعه محصولات هپی‌نس؛ نوشیدنی‌های زعفرانی و میوه‌ای، شات‌ها و بسته‌های منتخب.",
};

const VALID: (CategoryId | "all")[] = ["all", "beverages", "supplements", "gourmet"];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const requested = params.category as CategoryId | undefined;
  const initialCategory = requested && VALID.includes(requested) ? requested : "all";

  return (
    <div className="bg-white pb-20 pt-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <header className="max-w-2xl">
          <p className="text-xs tracking-widest text-cherry">فروشگاه</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            همه محصولات هپی‌نس
          </h1>
          <p className="mt-5 text-sm leading-8 text-ink/55">
            محصولات را بر اساس دسته‌بندی و طعم مرور کنید. اطلاعات این نسخه نمونه و قابل ویرایش
            است.
          </p>
        </header>

        <div className="mt-12">
          <ProductBrowser initialCategory={initialCategory} />
        </div>
      </div>
    </div>
  );
}
