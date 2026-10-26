"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { findOrder, type Order } from "@/src/lib/orders";
import { formatJalali, formatToman, toPersianDigits } from "@/src/lib/format";

export default function OrderTrackingForm({ initialCode = "" }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  function lookup(value: string) {
    const found = findOrder(value);
    setOrder(found ?? null);
    setError(found ? "" : "سفارشی با این کد پیدا نشد. کد را بررسی کنید.");
    setSearched(true);
  }

  // A code arriving in the URL (from the cart confirmation) is looked up on mount.
  useEffect(() => {
    if (initialCode) lookup(initialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!code.trim()) {
      setOrder(null);
      setError("کد سفارش را وارد کنید.");
      setSearched(true);
      return;
    }
    lookup(code);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} noValidate className="not-prose space-y-3">
        <label htmlFor="order-code" className="block text-xs font-medium text-ink/60">
          کد سفارش
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="order-code"
            dir="ltr"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="HP-XXXXXX"
            aria-invalid={Boolean(error)}
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink/50"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cherry"
          >
            پیگیری سفارش
          </button>
        </div>
        {error && (
          <p role="alert" className="text-xs text-brandred">
            {error}
          </p>
        )}
      </form>

      {searched && order && (
        <div className="not-prose rounded-3xl border border-ink/10 bg-cream p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-ink/50">کد سفارش</p>
              <p className="mt-1 font-mono text-lg font-bold tracking-wider text-ink">
                {order.code}
              </p>
            </div>
            <span className="rounded-full bg-gold/20 px-4 py-2 text-xs font-semibold text-[#7a5a10]">
              {order.status}
            </span>
          </div>

          <p className="mt-4 text-xs text-ink/50">
            تاریخ ثبت: {formatJalali(new Date(order.createdAt))}
          </p>

          <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
            {order.items.map((item) => (
              <li key={`${item.slug}-${item.variantLabel}`} className="flex justify-between gap-4 py-3 text-xs">
                <span className="text-ink/70">
                  {item.name} — {item.variantLabel} ×{" "}
                  {toPersianDigits(item.quantity)}
                </span>
                <span className="text-ink/80">{formatToman(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between text-sm font-bold text-ink">
            <span>مبلغ کل</span>
            <span>{formatToman(order.total)}</span>
          </div>

          <p className="mt-4 text-xs leading-6 text-ink/50">
            پرداخت آنلاین در این نسخه فعال نیست؛ کارشناسان هپی‌نس برای هماهنگی پرداخت و ارسال با
            شما تماس می‌گیرند. برای پیگیری سریع‌تر از صفحه{" "}
            <Link href="/contact" className="text-cherry hover:underline">
              تماس با ما
            </Link>{" "}
            استفاده کنید.
          </p>
        </div>
      )}
    </div>
  );
}
