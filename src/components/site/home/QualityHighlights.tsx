import { GridIcon, LeafIcon, SaffronIcon, ShieldIcon } from "@/src/components/site/Icons";

const HIGHLIGHTS = [
  { icon: SaffronIcon, title: "الهام از زعفران", text: "رایحه و هویتی برگرفته از طعم زعفران ایرانی." },
  { icon: ShieldIcon, title: "توجه به کیفیت", text: "تمرکز بر انتخاب مواد اولیه و کنترل کیفیت." },
  { icon: GridIcon, title: "طعم‌های متنوع", text: "انتخاب‌هایی از طعم‌های میوه‌ای متفاوت." },
  { icon: LeafIcon, title: "طراحی کاربردی", text: "بسته‌بندی مناسب برای سبک زندگی امروز." },
];

export default function QualityHighlights() {
  return (
    <section className="border-t border-white/10 bg-navy py-14 text-white md:py-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <Icon className="h-6 w-6 shrink-0 text-gold" />
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-white/55">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs leading-6 text-white/35">
          هیچ‌یک از موارد بالا ادعای ارگانیک، وگان، بدون قند، بدون کافئین یا تأییدشده آزمایشگاهی
          نیست.
        </p>
      </div>
    </section>
  );
}
