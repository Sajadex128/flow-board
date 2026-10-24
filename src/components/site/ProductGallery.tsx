"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const safeImages = images.length > 0 ? images : ["/products/bottle-ice.png"];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-b from-[#f7f6f1] to-[#e4e2da]">
        <Image
          key={safeImages[active]}
          src={safeImages[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 620px"
          className="object-contain p-10"
        />
      </div>

      {safeImages.length > 1 && (
        <ul className="mt-4 flex gap-3">
          {safeImages.map((src, i) => (
            <li key={src + i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`تصویر ${i + 1}`}
                aria-current={i === active}
                className={`relative block h-20 w-20 overflow-hidden rounded-xl border bg-white transition-colors ${
                  i === active ? "border-cherry" : "border-ink/10 hover:border-ink/30"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
