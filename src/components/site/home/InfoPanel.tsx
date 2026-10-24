import Link from "next/link";
import { ArrowLeftIcon, CheckIcon } from "@/src/components/site/Icons";

const POINTS = [
  { title: "تمرکز بر تجربه طعم", text: "طراحی طعم با نگاه به لذت نوشیدن." },
  { title: "الهام از زعفران ایرانی", text: "رایحه و هویتی برگرفته از طعم زعفران." },
  { title: "طراحی مدرن و کاربردی", text: "بسته‌بندی و تجربه‌ای متناسب با زندگی امروز." },
];

/** Illustrative ingredient-composition graphic (not a scientific chart). */
function CompositionDiagram() {
  const arcs = [
    { label: "زعفران", value: 0.42, color: "#D9A52B" },
    { label: "میوه", value: 0.33, color: "#B9162D" },
    { label: "جو", value: 0.25, color: "#06102D" },
  ];
  const R = 78;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
      <svg
        viewBox="0 0 200 200"
        className="h-52 w-52 -rotate-90"
        role="img"
        aria-label="نمودار نمایشی از ترکیب مفهومی مواد اولیه"
      >
        <circle cx="100" cy="100" r={R} fill="none" stroke="#e2e1dc" strokeWidth="26" />
        {arcs.map((arc) => {
          const dash = `${C * arc.value} ${C * (1 - arc.value)}`;
          const el = (
            <circle
              key={arc.label}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={arc.color}
              strokeWidth="26"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += C * arc.value;
          return el;
        })}
      </svg>

      <ul className="space-y-4">
        {arcs.map((arc) => (
          <li key={arc.label} className="flex items-center gap-3 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: arc.color }}
              aria-hidden
            />
            <span className="text-ink/70">{arc.label}</span>
            <span className="text-xs text-ink/40">نمایشی</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InfoPanel() {
  return (
    <section className="bg-cream pb-16 md:pb-24" aria-labelledby="panel-heading">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="rounded-[32px] bg-softgray px-6 py-12 md:px-14 md:py-16">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs tracking-widest text-cherry">نگاه ما به محصول</p>
              <h2
                id="panel-heading"
                className="mt-3 text-3xl font-bold leading-[1.4] tracking-tight text-ink md:text-4xl"
              >
                ترکیب هوشمندانه طعم و کیفیت
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-8 text-ink/60">
                هر محصول هپی‌نس با تمرکز بر تجربه نوشیدن، انتخاب مواد اولیه و هماهنگی طعم‌ها
                معرفی می‌شود.
              </p>

              <ul className="mt-8 space-y-5">
                {POINTS.map((point) => (
                  <li key={point.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">{point.title}</h3>
                      <p className="mt-1 text-xs leading-6 text-ink/55">{point.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-cherry"
              >
                بیشتر بدانید
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-ink/10 bg-white p-8">
              <p className="mb-8 text-center text-xs text-ink/45">
                نمودار مفهومی و نمایشی از سهم مواد اولیه — داده علمی واقعی نیست.
              </p>
              <CompositionDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
