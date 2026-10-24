"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/src/components/site/CartProvider";
import { BagIcon, MinusIcon, PlusIcon, TrashIcon } from "@/src/components/site/Icons";
import { formatToman } from "@/src/lib/format";

export default function CartPage() {
  const { items, ready, subtotal, setQuantity, remove, clear } = useCart();

  if (!ready) {
    return (
      <div className="bg-white pb-20 pt-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <p className="text-sm text-ink/50">در حال بارگذاری سبد خرید…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pb-20 pt-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <nav aria-label="مسیر صفحه" className="text-xs text-ink/45">
          <Link href="/" className="hover:text-cherry">
            خانه
          </Link>
          <span className="px-2" aria-hidden>
            /
          </span>
          <span className="text-ink/70">سبد خرید</span>
        </nav>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-ink md:text-5xl">
          سبد خرید
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-ink/20 bg-cream px-6 py-20 text-center">
            <BagIcon className="mx-auto h-8 w-8 text-ink/30" />
            <p className="mt-5 text-lg font-semibold text-ink">سبد خرید شما خالی است</p>
            <p className="mt-3 text-sm text-ink/55">
              برای شروع، مجموعه محصولات هپی‌نس را ببینید.
            </p>
            <Link
              href="/products"
              className="mt-7 inline-block rounded-full bg-ink px-7 py-3.5 text-sm text-white transition-colors hover:bg-cherry"
            >
              ادامه خرید
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {items.map((item) => (
                <li key={item.id} className="flex gap-5 py-6">
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-b from-[#f7f6f1] to-[#e4e2da]"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-bold text-ink">
                          <Link href={`/products/${item.slug}`} className="hover:text-cherry">
                            {item.name}
                          </Link>
                        </h2>
                        <p className="mt-1 text-xs text-ink/50">{item.variantLabel}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        aria-label={`حذف ${item.name} از سبد`}
                        className="grid h-9 w-9 place-items-center rounded-full text-ink/40 transition-colors hover:bg-brandred/10 hover:text-brandred"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          aria-label="کاهش تعداد"
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity.toLocaleString("fa-IR")}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label="افزایش تعداد"
                          className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-ink">
                        {formatToman(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-3xl bg-cream p-8 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-ink">خلاصه سفارش</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink/55">جمع اقلام</dt>
                  <dd className="text-ink/80">{formatToman(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink/55">هزینه ارسال</dt>
                  <dd className="text-ink/40">در حال محاسبه</dd>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
                  <dt>مبلغ قابل پرداخت</dt>
                  <dd>{formatToman(subtotal)}</dd>
                </div>
              </dl>

              <button
                type="button"
                disabled
                className="mt-7 w-full cursor-not-allowed rounded-full bg-ink/25 px-6 py-4 text-sm font-semibold text-white"
              >
                پرداخت (به‌زودی)
              </button>
              <p className="mt-4 text-xs leading-6 text-ink/45">
                در این نسخه درگاه پرداخت واقعی متصل نیست و سفارش ثبت نمی‌شود.
              </p>

              <div className="mt-6 flex items-center justify-between text-xs">
                <Link href="/products" className="text-cherry hover:underline">
                  ادامه خرید
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="text-ink/45 transition-colors hover:text-brandred"
                >
                  خالی کردن سبد
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
