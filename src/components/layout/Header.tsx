"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import ThemeToggle from "@/src/components/ui/theme-toggle";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userInitial = session?.user?.name?.charAt(0) || "?";
  const userName = session?.user?.name || "کاربر";
  const userEmail = session?.user?.email || "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <header className="flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-primary transition"
        >
          فلوبرد
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
        </div>
      </header>
    );
  }

  // اگر کاربر لاگین نکرده است
  if (!session) {
    return (
      <header className="flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-primary transition"
        >
          فلوبرد
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90 transition"
          >
            <User size={18} />
            ورود
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
      {/* لوگو */}
      <Link
        href="/"
        className="text-2xl font-bold hover:text-primary transition"
      >
        فلوبرد
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 rounded-full hover:bg-muted/50 transition p-1.5 pr-3"
          >
            <span className="text-sm font-medium hidden sm:inline">
              {userName}
            </span>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-64 rounded-xl border bg-background shadow-lg z-50">
              <div className="p-3 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{userName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Link
                  href="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted/50 transition"
                >
                  <Settings size={18} />
                  تنظیمات
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition"
                >
                  <LogOut size={18} />
                  خروج از حساب
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
