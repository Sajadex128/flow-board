import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";

import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import Providers from "@/src/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "هپی‌نس | تجربه‌ای تازه از نوشیدنی‌های زعفرانی",
    template: "%s | هپی‌نس",
  },
  description:
    "با هپی‌نس، دنیایی از نوشیدنی‌های زعفرانی و میوه‌ای را کشف کنید؛ ترکیبی از طعم‌های خاص، طراحی مدرن و الهام از زعفران ایرانی.",
  keywords: ["هپی‌نس", "نوشیدنی زعفرانی", "نوشیدنی میوه‌ای", "زعفران", "نوشیدنی عملکردی"],
  openGraph: {
    title: "هپی‌نس | تجربه‌ای تازه از نوشیدنی‌های زعفرانی",
    description:
      "دنیایی از نوشیدنی‌های زعفرانی و میوه‌ای با الهام از زعفران ایرانی.",
    locale: "fa_IR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className={`${vazir.className} bg-background text-foreground`}>
        <div className="min-h-full flex flex-col">
          <Providers session={session}>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
