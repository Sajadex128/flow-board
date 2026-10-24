"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "@/src/data/products";

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  variantLabel: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotal: number;
  add: (product: Product, variantId?: string, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "happiness-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items, ready]);

  const add = useCallback<CartContextValue["add"]>((product, variantId, quantity = 1) => {
    const variant =
      product.variants.find((v) => v.id === variantId) ?? product.variants[0];
    if (!variant) return;
    const id = `${product.id}__${variant.id}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...prev,
        {
          id,
          productId: product.id,
          variantId: variant.id,
          slug: product.slug,
          name: product.nameFa,
          variantLabel: variant.label,
          image: product.image,
          price: variant.price,
          quantity,
        },
      ];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items, ready, count, subtotal, add, remove, setQuantity, clear };
  }, [items, ready, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

/** Looks up a product by id — handy when a stored cart item needs fresh data. */
export const findProduct = (productId: string) =>
  products.find((p) => p.id === productId);
