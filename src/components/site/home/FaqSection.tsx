"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDownIcon } from "@/src/components/site/Icons";
import { faqs } from "@/src/data/products";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-16 md:py-24" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b from-[#f7f6f1] to-[#e2e0d8]">
            <Image
              src="/products/bottle-pour.png"
              alt="ریختن نوشیدنی زعفرانی هپی‌نس در لیوان"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
          </div>
          <div className="absolute right-5 top-5 rounded-full bg-gold px-4 py-2 text-xs font-bold text-ink">
            پرسش‌های متداول
          </div>
        </div>

        <div>
          <p className="text-xs tracking-widest text-cherry">راهنما</p>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-bold leading-[1.4] tracking-tight text-ink md:text-4xl"
          >
            پاسخ به پرسش‌های شما
          </h2>

          <ul className="mt-9 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li key={faq.question}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 py-5 text-right text-sm font-medium text-ink transition-colors hover:text-cherry"
                    >
                      <span>{faq.question}</span>
                      <ChevronDownIcon
                        className={`h-5 w-5 shrink-0 text-ink/40 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-cherry" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    hidden={!isOpen}
                    className="pb-5 text-xs leading-7 text-ink/60"
                  >
                    {faq.answer}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
