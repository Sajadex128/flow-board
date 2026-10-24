import type { ReactNode } from "react";
import SiteHeader from "@/src/components/site/SiteHeader";
import SiteFooter from "@/src/components/site/SiteFooter";
import { CartProvider } from "@/src/components/site/CartProvider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </CartProvider>
  );
}
