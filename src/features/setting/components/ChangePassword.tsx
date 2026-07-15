"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { changePassword } from "../actions/change-password";
import { useRouter } from "next/navigation";
import { KeyRound, Eye, EyeOff } from "lucide-react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "رمز فعلی را وارد کنید"),
    newPassword: z.string().min(8, "رمز جدید باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string().min(1, "تکرار رمز را وارد کنید"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "رمزهای جدید مطابقت ندارند",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormData) {
    setIsLoading(true);
    setMessage(null);

    const result = await changePassword(data);

    if (result.success) {
      setMessage({
        type: "success",
        text: result.message || "رمز عبور با موفقیت تغییر کرد",
      });
      reset();
      router.refresh();
    } else {
      setMessage({
        type: "error",
        text: result.message || "خطا در تغییر رمز عبور",
      });
    }

    setIsLoading(false);
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">🔑 تغییر رمز عبور</CardTitle>
        <CardDescription>رمز عبور خود را تغییر دهید</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">رمز فعلی</label>
            <div className="relative">
              <KeyRound className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pr-10 h-11 rounded-xl"
                placeholder="رمز فعلی را وارد کنید"
                type={showCurrentPassword ? "text" : "password"}
                {...register("currentPassword")}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">رمز جدید</label>
            <div className="relative">
              <KeyRound className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pr-10 h-11 rounded-xl"
                placeholder="رمز جدید را وارد کنید (حداقل ۸ کاراکتر)"
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              تکرار رمز جدید
            </label>
            <div className="relative">
              <KeyRound className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pr-10 h-11 rounded-xl"
                placeholder="رمز جدید را دوباره وارد کنید"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {message && (
            <p
              className={`text-sm p-3 rounded-xl ${
                message.type === "success"
                  ? "bg-green-50 text-green-600 dark:bg-green-900/20"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {message.text}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl"
          >
            {isLoading ? "در حال تغییر..." : "تغییر رمز عبور"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
