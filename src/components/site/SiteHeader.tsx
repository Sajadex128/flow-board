"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/src/components/site/CartProvider";
import { BagIcon, CloseIcon, MenuIcon } from "@/src/components/site/Icons";

const NAV = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "داستان هپی‌نس", href: "/#story" },
  { label: "طعم‌ها", href: "/#flavors" },
  { label: "تماس با ما", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const onHome = pathname === "/";
  const solid = !onHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 md:px-10">
        <Link href="/" className="flex items-baseline gap-2 text-white" aria-label="هپی‌نس">
          <span className="font-display text-2xl leading-none tracking-tight">Happiness</span>
          <span className="hidden text-sm text-white/60 sm:inline">هپی‌نس</span>
        </Link>

        <nav aria-label="ناوبری اصلی" className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  active ? "text-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="relative grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            <BagIcon className="h-5 w-5" />
            {ready && count > 0 && (
              <span className="absolute -top-0.5 -left-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">
                {count.toLocaleString("fa-IR")}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur-md lg:hidden">
          <nav aria-label="ناوبری موبایل" className="mx-auto max-w-[1440px] px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-white/5 py-4 text-base text-white/85 last:border-0 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
