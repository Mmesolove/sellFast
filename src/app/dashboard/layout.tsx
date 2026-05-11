import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DashboardNav from "@/components/DashboardNav";

export const metadata = { title: "Dashboard" };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
