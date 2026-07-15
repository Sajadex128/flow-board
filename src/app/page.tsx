import Header from "@/src/components/layout/Header";
import BoardGrid from "@/src/features/board/components/BoardGrid";
import CreateBoardDialog from "@/src/features/board/components/CreateBoardDialog";
import { getBoards } from "@/src/features/board/actions/get-boards";

export default async function Home() {
  const boards = await getBoards();

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
        <div className="space-y-10">
          <section className="rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background border p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">فلوبرد</h1>
                <p className="mt-3 text-muted-foreground text-lg">
                  پروژه‌ها و تسک‌های خود را در یک جا مدیریت کنید
                </p>
              </div>

              <CreateBoardDialog />
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold">بردهای شما</h2>
            <BoardGrid boards={boards} />
          </section>
        </div>
      </main>
    </div>
  );
}