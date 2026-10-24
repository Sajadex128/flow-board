"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/src/components/site/Icons";
import { flavors } from "@/src/data/products";
import { toPersianDigits } from "@/src/lib/format";

export default function FlavorShowcase() {
  const [active, setActive] = useState(0);
  const flavor = flavors[active];

  const go = (dir: 1 | -1) =>
    setActive((prev) => (prev + dir + flavors.length) % flavors.length);

  return (
    <section
      id="flavors"
      className="relative overflow-hidden bg-ink py-16 text-white md:py-24"
      aria-labelledby="flavors-heading"
    >
      <div
        className="absolute inset-0 opacity-70 transition-colors duration-700"
        style={{
          background: `radial-gradient(120% 90% at 80% 20%, ${flavor.accent}66 0%, #06102d 55%, #101418 100%)`,
        }}
        aria-hidden
      />
      <div className="hs-grain absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs tracking-widest text-gold">طعم‌ها</p>
          <h2
            id="flavors-heading"
            className="mt-3 text-3xl font-bold leading-[1.35] tracking-tight md:text-5xl"
          >
            طعم‌هایی که فراموش نمی‌شوند
          </h2>
          <p className="mt-5 text-sm leading-8 text-white/60">
            از طعم عمیق آلبالو تا شیرینی دلنشین انار؛ دنیایی از انتخاب‌های متفاوت برای
            لحظه‌های پرانرژی.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div className="relative order-1 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative aspect-[16/11] w-full">
              {flavors.map((item, i) => (
                <Image
                  key={item.id}
                  src={item.image}
                  alt={`طعم ${item.nameFa}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className={`object-cover transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                  priority={i === 0}
                />
              ))}
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                aria-hidden
              />
            </div>
            <span
              className="absolute right-6 top-6 rounded-full px-4 py-1.5 text-xs font-semibold text-white"
              style={{ backgroundColor: flavor.accent }}
            >
              {flavor.nameEn}
            </span>
          </div>

          <div className="order-2">
            <p className="font-display text-sm tracking-[0.3em] text-gold">
              {toPersianDigits(String(active + 1).padStart(2, "0"))} /{" "}
              {toPersianDigits(String(flavors.length).padStart(2, "0"))}
            </p>
            <h3 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              {flavor.nameFa}
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-8 text-white/65">
              {flavor.description}
            </p>

            <div className="mt-9 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="طعم قبلی"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="طعم بعدی"
                className="grid h-12 w-12 place-items-center rounded-full border border-white/25 transition-colors hover:border-gold hover:text-gold"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-3">
              {flavors.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                      i === active
                        ? "border-gold bg-gold text-ink"
                        : "border-white/20 text-white/65 hover:border-white/50"
                    }`}
                  >
                    {item.nameFa}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
