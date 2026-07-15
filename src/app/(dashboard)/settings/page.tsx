import ProfileInfo from "@/src/features/setting/components/ProfileInfo";
import ChangePassword from "@/src/features/setting/components/ChangePassword";
import AppearanceSettings from "@/src/features/setting/components/AppearanceSettings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">⚙️ تنظیمات</h1>
        <p className="text-muted-foreground">اطلاعات و تنظیمات حساب کاربری خود را مدیریت کنید</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ProfileInfo />
          <AppearanceSettings />
        </div>

        <div className="space-y-6">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}