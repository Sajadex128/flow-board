/**
 * Happiness — catalogue data.
 *
 * This file is the single source of truth for products, flavours, categories,
 * ingredients and FAQ copy. Presentation components read from here so product
 * information can be updated in one place.
 *
 * NOTE: prices, package sizes and availability below are clearly-labelled
 * sample data for the prototype. Replace them with verified product data before
 * going live. No clinical, nutritional or certification claims are made.
 */

export type CategoryId = "beverages" | "supplements" | "gourmet";

export type Availability = "in-stock" | "pre-order" | "coming-soon";

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  nameFa: string;
  nameEn: string;
  category: CategoryId;
  flavor: string;
  flavorEn: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  price: number;
  originalPrice?: number;
  packageSize: string;
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  availability: Availability;
  featured: boolean;
  variants: ProductVariant[];
}

export interface Category {
  id: CategoryId;
  nameFa: string;
  nameEn: string;
  description: string;
  image: string;
}

export interface Flavor {
  id: string;
  nameFa: string;
  nameEn: string;
  description: string;
  image: string;
  accent: string;
}

export interface Ingredient {
  id: string;
  index: string;
  title: string;
  description: string;
}

const IMG = {
  ice: "/products/bottle-ice.png",
  pour: "/products/bottle-pour.png",
  neck: "/products/bottle-neck.png",
  dark: "/products/bottle-dark.png",
  ingredients: "/products/bottle-ingredients.png",
};

export const categories: Category[] = [
  {
    id: "beverages",
    nameFa: "نوشیدنی‌ها",
    nameEn: "Beverages",
    description: "نوشیدنی‌های زعفرانی و میوه‌ای برای لحظه‌های پرانرژی.",
    image: IMG.ice,
  },
  {
    id: "supplements",
    nameFa: "مکمل‌ها و محصولات جانبی",
    nameEn: "Supplements",
    description: "شات‌ها و مکمل‌های سبک با الهام از زعفران.",
    image: IMG.ingredients,
  },
  {
    id: "gourmet",
    nameFa: "طعم‌های خاص",
    nameEn: "Gourmet",
    description: "بسته‌های منتخب و ترکیب‌های ویژه برای تجربه‌ای متفاوت.",
    image: IMG.dark,
  },
];

export const flavors: Flavor[] = [
  {
    id: "sour-cherry",
    nameFa: "آلبالو",
    nameEn: "Sour Cherry",
    description:
      "طعمی عمیق و ملس از آلبالوی تازه؛ ترکیبی پرانرژی از ترشی دلنشین و شیرینی ملایم.",
    image: IMG.ice,
    accent: "#B9162D",
  },
  {
    id: "pomegranate",
    nameFa: "انار",
    nameEn: "Pomegranate",
    description:
      "شیرینی دلنشین انار با پایانی تازه؛ طعمی آشنا که با زعفران حال و هوایی تازه می‌گیرد.",
    image: IMG.dark,
    accent: "#7D1023",
  },
  {
    id: "raspberry",
    nameFa: "تمشک",
    nameEn: "Raspberry",
    description:
      "عطر و طعم لطیف تمشک با ته‌مایه‌ای شیرین و ملس؛ انتخابی سبک برای روزهای پرمشغله.",
    image: IMG.pour,
    accent: "#4B0714",
  },
  {
    id: "blackberry",
    nameFa: "شاه‌توت",
    nameEn: "Blackberry",
    description:
      "عمق و تیرگی خوشایند شاه‌توت در کنار رایحه زعفران؛ ترکیبی متفاوت و به‌یادماندنی.",
    image: IMG.neck,
    accent: "#06102D",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "saffron-sour-cherry",
    nameFa: "نوشیدنی زعفرانی آلبالو",
    nameEn: "Saffron Sour Cherry",
    category: "beverages",
    flavor: "آلبالو",
    flavorEn: "Sour Cherry",
    shortDescription: "ترکیب آلبالوی ملس با رایحه زعفران؛ طعمی تازه و پرانرژی.",
    description:
      "نوشیدنی زعفرانی آلبالو با الهام از طعم آشنای آلبالوی ایرانی و رایحه لطیف زعفران فرموله شده است. تعادل میان ملس و شیرین، آن را به انتخابی مناسب برای لحظه‌های پرانرژی روز تبدیل می‌کند.",
    image: IMG.ice,
    gallery: [IMG.ice, IMG.pour, IMG.ingredients],
    price: 185000,
    originalPrice: 210000,
    packageSize: "۲۵۰ میلی‌لیتر",
    ingredients: ["آب", "کنسانتره آلبالو", "عصاره زعفران", "عصاره جو", "شکر"],
    nutrition: [
      { label: "انرژی", value: "نمونه — در حال تکمیل" },
      { label: "قند", value: "نمونه — در حال تکمیل" },
      { label: "زعفران", value: "عصاره طبیعی" },
    ],
    availability: "in-stock",
    featured: true,
    variants: [
      { id: "v1", label: "۲۵۰ میلی‌لیتر", price: 185000 },
      { id: "v2", label: "۱ لیتر", price: 520000 },
    ],
  },
  {
    id: "p2",
    slug: "saffron-pomegranate",
    nameFa: "نوشیدنی زعفرانی انار",
    nameEn: "Saffron Pomegranate",
    category: "beverages",
    flavor: "انار",
    flavorEn: "Pomegranate",
    shortDescription: "شیرینی انار و رایحه زعفران؛ طعمی اصیل با پایانی تازه.",
    description:
      "نوشیدنی زعفرانی انار، شیرینی دلنشین انار را با رایحه گرم زعفران همراه می‌کند؛ ترکیبی اصیل که برای لحظه‌های خاص طراحی شده است.",
    image: IMG.dark,
    gallery: [IMG.dark, IMG.ice, IMG.neck],
    price: 195000,
    packageSize: "۲۵۰ میلی‌لیتر",
    ingredients: ["آب", "کنسانتره انار", "عصاره زعفران", "عصاره جو", "شکر"],
    nutrition: [
      { label: "انرژی", value: "نمونه — در حال تکمیل" },
      { label: "قند", value: "نمونه — در حال تکمیل" },
      { label: "زعفران", value: "عصاره طبیعی" },
    ],
    availability: "in-stock",
    featured: true,
    variants: [
      { id: "v1", label: "۲۵۰ میلی‌لیتر", price: 195000 },
      { id: "v2", label: "۱ لیتر", price: 540000 },
    ],
  },
  {
    id: "p3",
    slug: "saffron-raspberry",
    nameFa: "نوشیدنی زعفرانی تمشک",
    nameEn: "Saffron Raspberry",
    category: "beverages",
    flavor: "تمشک",
    flavorEn: "Raspberry",
    shortDescription: "لطافت تمشک با رایحه زعفران؛ سبک، تازه و متفاوت.",
    description:
      "نوشیدنی زعفرانی تمشک با عطر لطیف تمشک و ته‌مایه‌ای شیرین و ملس، تجربه‌ای سبک و تازه از نوشیدنی‌های عملکردی هپی‌نس ارائه می‌دهد.",
    image: IMG.pour,
    gallery: [IMG.pour, IMG.ice, IMG.ingredients],
    price: 185000,
    packageSize: "۲۵۰ میلی‌لیتر",
    ingredients: ["آب", "کنسانتره تمشک", "عصاره زعفران", "عصاره جو", "شکر"],
    nutrition: [
      { label: "انرژی", value: "نمونه — در حال تکمیل" },
      { label: "قند", value: "نمونه — در حال تکمیل" },
      { label: "زعفران", value: "عصاره طبیعی" },
    ],
    availability: "in-stock",
    featured: true,
    variants: [
      { id: "v1", label: "۲۵۰ میلی‌لیتر", price: 185000 },
      { id: "v2", label: "۱ لیتر", price: 520000 },
    ],
  },
  {
    id: "p4",
    slug: "saffron-blackberry",
    nameFa: "نوشیدنی زعفرانی شاه‌توت",
    nameEn: "Saffron Blackberry",
    category: "beverages",
    flavor: "شاه‌توت",
    flavorEn: "Blackberry",
    shortDescription: "عمق شاه‌توت در کنار رایحه زعفران؛ ترکیبی به‌یادماندنی.",
    description:
      "نوشیدنی زعفرانی شاه‌توت با عمق و تیرگی خوشایند شاه‌توت و رایحه گرم زعفران، طعمی متفاوت و به‌یادماندنی را تجربه می‌کند.",
    image: IMG.neck,
    gallery: [IMG.neck, IMG.dark, IMG.pour],
    price: 195000,
    packageSize: "۲۵۰ میلی‌لیتر",
    ingredients: ["آب", "کنسانتره شاه‌توت", "عصاره زعفران", "عصاره جو", "شکر"],
    nutrition: [
      { label: "انرژی", value: "نمونه — در حال تکمیل" },
      { label: "قند", value: "نمونه — در حال تکمیل" },
      { label: "زعفران", value: "عصاره طبیعی" },
    ],
    availability: "pre-order",
    featured: true,
    variants: [
      { id: "v1", label: "۲۵۰ میلی‌لیتر", price: 195000 },
      { id: "v2", label: "۱ لیتر", price: 540000 },
    ],
  },
  {
    id: "p5",
    slug: "saffron-shot",
    nameFa: "شات زعفرانی",
    nameEn: "Saffron Shot",
    category: "supplements",
    flavor: "زعفران",
    flavorEn: "Saffron",
    shortDescription: "شات غلیظ زعفران؛ حجم کم، طعم متمرکز.",
    description:
      "شات زعفرانی هپی‌نس برای کسانی طراحی شده که تجربه‌ای متمرکز و کوتاه از طعم زعفران را می‌خواهند. حجم کم و طعم متمرکز، آن را به انتخابی متفاوت تبدیل می‌کند.",
    image: IMG.ingredients,
    gallery: [IMG.ingredients, IMG.neck, IMG.dark],
    price: 145000,
    packageSize: "۶۰ میلی‌لیتر",
    ingredients: ["عصاره زعفران", "آب", "عصاره جو"],
    nutrition: [
      { label: "انرژی", value: "نمونه — در حال تکمیل" },
      { label: "زعفران", value: "عصاره متمرکز" },
    ],
    availability: "in-stock",
    featured: false,
    variants: [{ id: "v1", label: "۶۰ میلی‌لیتر", price: 145000 }],
  },
  {
    id: "p6",
    slug: "curated-gift-box",
    nameFa: "بسته محصولات منتخب",
    nameEn: "Curated Gift Box",
    category: "gourmet",
    flavor: "ترکیبی",
    flavorEn: "Mixed",
    shortDescription: "مجموعه‌ای از طعم‌های منتخب هپی‌نس در یک بسته.",
    description:
      "بسته محصولات منتخب، ترکیبی از محبوب‌ترین طعم‌های هپی‌نس را در یک بسته‌بندی ویژه گرد هم می‌آورد؛ گزینه‌ای مناسب برای هدیه یا آشنایی با مجموعه.",
    image: IMG.dark,
    gallery: [IMG.dark, IMG.ice, IMG.pour, IMG.neck],
    price: 890000,
    originalPrice: 980000,
    packageSize: "بسته ۶ عددی",
    ingredients: ["مطابق محصولات موجود در بسته"],
    nutrition: [{ label: "محتویات", value: "۶ بطری منتخب" }],
    availability: "in-stock",
    featured: true,
    variants: [{ id: "v1", label: "بسته ۶ عددی", price: 890000 }],
  },
];

export const ingredients: Ingredient[] = [
  {
    id: "saffron",
    index: "۰۱",
    title: "زعفران",
    description:
      "طلای سرخ ایران؛ بخشی از میراث ارزشمند کشور که الهام‌بخش رایحه و هویت طعم محصولات هپی‌نس است.",
  },
  {
    id: "sour-cherry",
    index: "۰۲",
    title: "آلبالو",
    description:
      "طعمی آشنا و ملس که به نوشیدنی عمق و تازگی می‌بخشد و آن را برای لحظه‌های پرانرژی مناسب می‌کند.",
  },
  {
    id: "pomegranate",
    index: "۰۳",
    title: "انار",
    description:
      "شیرینی اصیل و دلنشین انار؛ ترکیبی که با رایحه زعفران حال و هوایی تازه پیدا می‌کند.",
  },
  {
    id: "raspberry",
    index: "۰۴",
    title: "تمشک",
    description:
      "عطر لطیف و طعم سبک تمشک که تجربه‌ای تازه و متعادل از نوشیدنی را رقم می‌زند.",
  },
  {
    id: "blackberry",
    index: "۰۵",
    title: "شاه‌توت",
    description:
      "عمق و تیرگی خوشایند شاه‌توت که به طعم محصولات هپی‌نس شخصیتی متفاوت می‌دهد.",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "هپی‌نس چه نوع نوشیدنی‌هایی ارائه می‌کند؟",
    answer:
      "هپی‌نس مجموعه‌ای از نوشیدنی‌های زعفرانی و میوه‌ای، شات‌های متمرکز و بسته‌های منتخب را ارائه می‌کند. فهرست کامل در بخش محصولات در دسترس است.",
  },
  {
    question: "نوشیدنی‌های هپی‌نس با چه طعم‌هایی عرضه می‌شوند؟",
    answer:
      "طعم‌های اصلی مجموعه شامل آلبالو، انار، تمشک و شاه‌توت است؛ همه با الهام از زعفران ایرانی.",
  },
  {
    question: "زعفران چه نقشی در محصولات هپی‌نس دارد؟",
    answer:
      "زعفران الهام‌بخش هویت طعم و رایحه محصولات هپی‌نس است. این توضیح یک معرفی برند است و ادعای درمانی یا علمی ارائه نمی‌کند.",
  },
  {
    question: "ترکیبات هر محصول را از کجا می‌توان مشاهده کرد؟",
    answer:
      "در صفحه هر محصول بخش ترکیبات قرار دارد. اطلاعات تکمیلی و تأییدشده به‌مرور به همین صفحه اضافه می‌شود.",
  },
  {
    question: "محصولات در چه اندازه‌هایی عرضه می‌شوند؟",
    answer:
      "اندازه‌های نمایش‌داده‌شده در این نسخه نمونه هستند و پس از نهایی‌شدن اطلاعات واقعی محصولات به‌روزرسانی می‌شوند.",
  },
  {
    question: "چگونه می‌توان محصولات هپی‌نس را سفارش داد؟",
    answer:
      "در حال حاضر امکان افزودن محصول به سبد خرید به‌صورت نمایشی فراهم است. فرآیند پرداخت واقعی در نسخه بعدی فعال می‌شود.",
  },
  {
    question: "روش‌های پرداخت و ارسال چگونه است؟",
    answer:
      "روش‌های پرداخت و ارسال هنوز نهایی نشده است. این بخش به‌صورت نمونه نمایش داده می‌شود و پس از تعیین شرایط واقعی تکمیل خواهد شد.",
  },
  {
    question: "آیا امکان خرید عمده وجود دارد؟",
    answer:
      "برای دریافت اطلاعات خرید عمده، لطفاً از طریق صفحه تماس با ما درخواست خود را ثبت کنید تا در آینده پیگیری شود.",
  },
  {
    question: "چگونه می‌توان با پشتیبانی هپی‌نس ارتباط گرفت؟",
    answer:
      "از طریق صفحه تماس با ما می‌توانید پیام خود را ثبت کنید. اطلاعات تماس رسمی به‌مرور در همین صفحه اضافه می‌شود.",
  },
  {
    question: "چگونه می‌توان از محصولات جدید و پیشنهادها مطلع شد؟",
    answer:
      "با عضویت در خبرنامه هپی‌نس در پایین همین صفحه، از محصولات و خبرهای جدید باخبر شوید.",
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, count = 3) =>
  products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const sameA = a.category === product.category ? 0 : 1;
      const sameB = b.category === product.category ? 0 : 1;
      return sameA - sameB;
    })
    .slice(0, count);

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "موجود در انبار",
  "pre-order": "پیش‌سفارش",
  "coming-soon": "به‌زودی",
};
