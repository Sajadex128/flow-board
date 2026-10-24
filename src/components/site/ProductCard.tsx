"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/src/components/site/CartProvider";
import { BagIcon, CheckIcon } from "@/src/components/site/Icons";
import { availabilityLabel, type Product } from "@/src/data/products";
import { formatToman } from "@/src/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-cream text-ink transition-colors hover:border-gold/40">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#f7f6f1] to-[#e6e4dd]"
      >
        <Image
          src={product.image}
          alt={product.nameFa}
          fill
          sizes="(max-width: 768px) 60vw, 300px"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.originalPrice && (
          <span className="absolute right-3 top-3 rounded-full bg-brandred px-3 py-1 text-[11px] font-bold text-white">
            پیشنهاد ویژه
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-ink/45">{product.flavorEn}</p>
        <h3 className="mt-1 text-base font-bold leading-7">
          <Link href={`/products/${product.slug}`} className="hover:text-cherry">
            {product.nameFa}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-6 text-ink/55">
          {product.shortDescription}
        </p>

        <dl className="mt-4 space-y-1.5 text-xs text-ink/55">
          <div className="flex justify-between gap-3">
            <dt>حجم بسته</dt>
            <dd className="text-ink/75">{product.packageSize}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>وضعیت</dt>
            <dd
              className={
                product.availability === "in-stock" ? "text-emerald-700" : "text-gold"
              }
            >
              {availabilityLabel[product.availability]}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-2">
            <div>
              {product.originalPrice && (
                <p className="text-[11px] text-ink/35 line-through">
                  {formatToman(product.originalPrice)}
                </p>
              )}
              <p className="text-sm font-bold">{formatToman(product.price)}</p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`افزودن ${product.nameFa} به سبد خرید`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-cherry"
            >
              {added ? <CheckIcon className="h-4 w-4" /> : <BagIcon className="h-4 w-4" />}
              {added ? "افزوده شد" : "افزودن"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
