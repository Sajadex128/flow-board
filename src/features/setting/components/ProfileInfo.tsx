"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, Calendar } from "lucide-react";

export default function ProfileInfo() {
  const { data: session } = useSession();

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "نامشخص";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "نامشخص";
      return d.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "نامشخص";
    }
  };

  const createdAt = session?.user?.createdAt
    ? formatDate(session.user.createdAt)
    : "نامشخص";

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <div>
          <CardTitle className="text-xl">👤 اطلاعات شخصی</CardTitle>
          <CardDescription>اطلاعات حساب کاربری شما</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">نام</p>
              <p className="font-medium">{session?.user?.name || "نامشخص"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">ایمیل</p>
              <p className="font-medium">{session?.user?.email || "نامشخص"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">تاریخ عضویت</p>
              <p className="font-medium">{createdAt}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}