import { DropIcon, GlassIcon, LeafIcon, ShieldIcon } from "@/src/components/site/Icons";

const ITEMS = [
  { icon: LeafIcon, title: "با الهام از زعفران" },
  { icon: DropIcon, title: "طعم‌های میوه‌ای" },
  { icon: ShieldIcon, title: "کیفیت در اولویت" },
  { icon: GlassIcon, title: "تجربه‌ای متفاوت" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-ink/10 bg-cream text-ink" aria-label="ارزش‌های هپی‌نس">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <ul className="hs-scroll-x flex snap-x gap-3 overflow-x-auto py-6 md:grid md:grid-cols-4 md:gap-0 md:overflow-visible md:divide-x md:divide-ink/10 [direction:rtl]">
          {ITEMS.map(({ icon: Icon, title }) => (
            <li
              key={title}
              className="flex min-w-[62%] shrink-0 snap-start items-center gap-3 rounded-xl border border-ink/10 px-4 py-4 md:min-w-0 md:justify-center md:rounded-none md:border-0 md:px-6 md:py-2"
            >
              <Icon className="h-5 w-5 shrink-0 text-cherry" />
              <span className="text-sm font-medium">{title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
