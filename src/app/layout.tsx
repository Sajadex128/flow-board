import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Vazirmatn } from "next/font/google";

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
  title: "فلوبرد - مدیریت پروژه",
  description: "سیستم مدیریت تسک‌ها و پروژه‌ها",
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
      className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} h-full antialiased`}
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