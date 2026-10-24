import { ingredients } from "@/src/data/products";

const GRADIENTS = [
  "linear-gradient(160deg, #4b0714 0%, #7d1023 55%, #b9162d 100%)",
  "linear-gradient(160deg, #7d1023 0%, #b9162d 60%, #d9a52b 100%)",
  "linear-gradient(160deg, #2c040d 0%, #4b0714 60%, #7d1023 100%)",
  "linear-gradient(160deg, #06102d 0%, #7d1023 70%, #b9162d 100%)",
  "linear-gradient(160deg, #101418 0%, #4b0714 60%, #d9a52b 100%)",
];

export default function IngredientCards() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="ingredients-heading">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs tracking-widest text-cherry">مواد اولیه</p>
          <h2
            id="ingredients-heading"
            className="mt-3 text-3xl font-bold leading-[1.4] tracking-tight text-ink md:text-4xl"
          >
            چیزی که انتخاب می‌کنیم، اهمیت دارد
          </h2>
        </div>

        <div className="hs-scroll-x mt-12 -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0">
          {ingredients.map((ingredient, i) => (
            <article
              key={ingredient.id}
              className="relative flex min-h-[320px] w-[76%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl p-7 text-white sm:w-[46%] lg:w-[19%]"
              style={{ backgroundImage: GRADIENTS[i % GRADIENTS.length] }}
            >
              <span className="font-display text-3xl text-white/30">{ingredient.index}</span>
              <div>
                <h3 className="text-xl font-bold">{ingredient.title}</h3>
                <p className="mt-3 text-xs leading-6 text-white/70">
                  {ingredient.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-ink/40">
          کارت‌ها در موبایل به‌صورت افقی قابل پیمایش هستند. هیچ ویژگی تغذیه‌ای یا پزشکی به این
          مواد نسبت داده نشده است.
        </p>
      </div>
    </section>
  );
}
