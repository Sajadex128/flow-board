import type { Metadata } from "next";
import Link from "next/link";
import OrderTrackingForm from "@/src/components/site/OrderTrackingForm";
import SimplePage from "@/src/components/site/SimplePage";

export const metadata: Metadata = { title: "پیگیری سفارش" };

export default async function OrderTrackingPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  return (
    <SimplePage
      eyebrow="پشتیبانی"
      title="پیگیری سفارش"
      intro="کد سفارشی که پس از ثبت دریافت کرده‌اید را وارد کنید تا وضعیت آن را ببینید."
      showNotice={false}
    >
      <OrderTrackingForm initialCode={code ?? ""} />
      <p className="text-xs leading-7 text-ink/45">
        کد سفارش را پیدا نمی‌کنید؟ از صفحه{" "}
        <Link href="/contact" className="text-cherry hover:underline">
          تماس با ما
        </Link>{" "}
        برای ما پیام بگذارید.
      </p>
    </SimplePage>
  );
}
