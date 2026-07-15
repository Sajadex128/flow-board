"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export default function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">🎨 ظاهر</CardTitle>
          <CardDescription>تم برنامه را انتخاب کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 animate-pulse">
                <div className="h-6 w-6 mx-auto bg-muted rounded mb-2" />
                <div className="h-4 w-12 mx-auto bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  const themes = [
    { id: "light", label: "روشن", icon: Sun },
    { id: "dark", label: "تاریک", icon: Moon },
    { id: "system", label: "سیستم", icon: Monitor },
  ];

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">🎨 ظاهر</CardTitle>
        <CardDescription>تم برنامه را انتخاب کنید</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(id)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                ${theme === id
                  ? "border-primary bg-primary/10"
                  : "border-transparent hover:border-muted-foreground/20"
                }
              `}
            >
              <Icon
                className={`
                  h-6 w-6
                  ${theme === id ? "text-primary" : "text-muted-foreground"}
                `}
              />
              <span
                className={`
                  text-sm font-medium
                  ${theme === id ? "text-primary" : "text-muted-foreground"}
                `}
              >
                {label}
              </span>
              {theme === id && (
                <div className="h-1 w-6 rounded-full bg-primary" />
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            تم فعلی: <span className="font-medium text-foreground">
              {themes.find((t) => t.id === theme)?.label || "سیستم"}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}