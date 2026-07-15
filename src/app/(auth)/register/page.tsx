"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { registerUser } from "@/src/features/auth/actions/register";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">در حال بررسی...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await registerUser({ name, email, password });

      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        setSuccess("حساب کاربری با موفقیت ساخته شد");
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      }
    } catch (error) {
      setError("خطا در ساخت حساب کاربری");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 w-96">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">ساخت حساب کاربری</CardTitle>
            <CardDescription className="text-base">
              برای شروع، اطلاعات خود را وارد کنید
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  نام و نام خانوادگی
                </label>
                <Input
                  type="text"
                  placeholder="علی محمدی"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  ایمیل
                </label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl"
                  required
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  رمز عبور
                </label>
                <Input
                  type="password"
                  placeholder="حداقل ۸ کاراکتر"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl"
                  required
                  minLength={8}
                  dir="ltr"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  رمز عبور باید حداقل ۸ کاراکتر باشد
                </p>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-xl text-center">
                  {error}
                </p>
              )}

              {success && (
                <p className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl text-center">
                  {success}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-base font-medium"
              >
                {isLoading ? "در حال ساخت حساب..." : "ساخت حساب کاربری"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                قبلاً حساب کاربری دارید؟{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  ورود
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}