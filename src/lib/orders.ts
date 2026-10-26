import type { CartItem } from "@/src/components/site/CartProvider";

/** One line of a placed order (cart data frozen at checkout time). */
export interface OrderItem {
  slug: string;
  name: string;
  variantLabel: string;
  quantity: number;
  price: number;
}

export interface Order {
  code: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  status: string;
}

const STORAGE_KEY = "happiness-orders-v1";
const MAX_ORDERS = 20;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function readAll(): Order[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    // Storage unavailable (or server render) — no orders to show.
    return [];
  }
}

function writeAll(orders: Order[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    /* storage may be unavailable — the order stays in memory for this session */
  }
}

function makeCode(existing: Order[]): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  for (let attempt = 0; attempt < 20; attempt++) {
    let code = "HP-";
    for (let i = 0; i < 6; i++) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    if (!existing.some((order) => order.code === code)) return code;
  }
  return `HP-${Date.now().toString(36).toUpperCase()}`;
}

/** Trims an order code and folds Persian/Arabic digits and case. */
export function normalizeCode(input: string): string {
  return input
    .trim()
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    .toUpperCase();
}

/** Records a new order from the current cart contents. */
export function placeOrder(items: CartItem[], total: number): Order {
  const orders = readAll();
  const order: Order = {
    code: makeCode(orders),
    createdAt: new Date().toISOString(),
    items: items.map(({ slug, name, variantLabel, quantity, price }) => ({
      slug,
      name,
      variantLabel,
      quantity,
      price,
    })),
    total,
    status: "در انتظار هماهنگی",
  };
  writeAll([order, ...orders].slice(0, MAX_ORDERS));
  return order;
}

/** Looks up a placed order by code (digits/case insensitive). */
export function findOrder(code: string): Order | undefined {
  const target = normalizeCode(code);
  if (!target) return undefined;
  return readAll().find((order) => order.code === target);
}
