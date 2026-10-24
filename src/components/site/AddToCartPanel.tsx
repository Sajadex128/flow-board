"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/src/components/site/CartProvider";
import { BagIcon, CheckIcon, MinusIcon, PlusIcon } from "@/src/components/site/Icons";
import type { Product } from "@/src/data/products";
import { formatToman } from "@/src/lib/format";

export default function AddToCartPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const total = variant ? variant.price * quantity : 0;

  function handleAdd() {
    add(product, variantId, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-8 space-y-6">
      {product.variants.length > 1 && (
        <div>
          <p className="mb-3 text-xs font-medium text-ink/45">انتخاب بسته‌بندی</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                aria-pressed={variantId === v.id}
                className={`rounded-xl border px-4 py-3 text-xs transition-colors ${
                  variantId === v.id
                    ? "border-ink bg-ink text-white"
                    : "border-ink/15 text-ink/70 hover:border-ink/40"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1.5">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="کاهش تعداد"
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium" aria-live="polite">
            {quantity.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            aria-label="افزایش تعداد"
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-cherry px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-burgundy"
        >
          {added ? <CheckIcon className="h-4 w-4" /> : <BagIcon className="h-4 w-4" />}
          {added ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-ink/10 pt-5 text-sm">
        <span className="text-ink/55">جمع</span>
        <span className="font-bold text-ink">{formatToman(total)}</span>
      </div>

      {added && (
        <p role="status" className="text-xs text-emerald-700">
          محصول به سبد خرید اضافه شد.{" "}
          <Link href="/cart" className="font-medium underline">
            مشاهده سبد خرید
          </Link>
        </p>
      )}

      <p className="text-xs leading-6 text-ink/40">
        این یک تجربه نمایشی است؛ پرداخت واقعی در این نسخه فعال نیست.
      </p>
    </div>
  );
}
