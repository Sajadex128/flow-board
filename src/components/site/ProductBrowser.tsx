"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/src/components/site/ProductCard";
import { products, type CategoryId } from "@/src/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const CATEGORY_FILTERS: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "beverages", label: "نوشیدنی‌ها" },
  { id: "supplements", label: "مکمل‌ها" },
  { id: "gourmet", label: "طعم‌های خاص" },
];

const SORTS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "پیشنهاد ما" },
  { id: "price-asc", label: "ارزان‌ترین" },
  { id: "price-desc", label: "گران‌ترین" },
  { id: "name", label: "بر اساس نام" },
];

export default function ProductBrowser({
  initialCategory = "all",
}: {
  initialCategory?: CategoryId | "all";
}) {
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory);
  const [flavor, setFlavor] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const flavorOptions = useMemo(() => {
    const set = new Set(products.map((p) => p.flavor));
    return ["all", ...Array.from(set)];
  }, []);

  const visible = useMemo(() => {
    const filtered = products.filter((p) => {
      const byCategory = category === "all" || p.category === category;
      const byFlavor = flavor === "all" || p.flavor === flavor;
      return byCategory && byFlavor;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.nameFa.localeCompare(b.nameFa, "fa");
      return Number(b.featured) - Number(a.featured);
    });
  }, [category, flavor, sort]);

  return (
    <div>
      <div className="grid gap-6 border-b border-ink/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-xs font-medium text-ink/45">دسته‌بندی</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  aria-pressed={category === item.id}
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                    category === item.id
                      ? "border-ink bg-ink text-white"
                      : "border-ink/15 text-ink/65 hover:border-ink/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium text-ink/45">طعم</p>
            <div className="flex flex-wrap gap-2">
              {flavorOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFlavor(item)}
                  aria-pressed={flavor === item}
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                    flavor === item
                      ? "border-cherry bg-cherry text-white"
                      : "border-ink/15 text-ink/65 hover:border-ink/40"
                  }`}
                >
                  {item === "all" ? "همه طعم‌ها" : item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="sort" className="mb-3 block text-xs font-medium text-ink/45">
            ترتیب نمایش
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink/50 lg:w-52"
          >
            {SORTS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-xs text-ink/45">{visible.length} محصول یافت شد</p>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-ink/20 bg-cream px-6 py-20 text-center">
          <p className="text-lg font-semibold text-ink">محصولی با این فیلترها پیدا نشد</p>
          <p className="mt-3 text-sm text-ink/55">
            فیلترها را تغییر دهید یا همه محصولات را ببینید.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setFlavor("all");
              setSort("featured");
            }}
            className="mt-7 rounded-full bg-ink px-6 py-3 text-sm text-white transition-colors hover:bg-cherry"
          >
            پاک کردن فیلترها
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
