import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/SettingsForm";

export const metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = getCurrentUser();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, businessName: true, whatsapp: true },
  });

  if (!user) redirect("/login");

  return (
    <div className="page-container max-w-xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage your profile and WhatsApp number</p>
      </div>

      <div className="card p-6 mb-4">
        <p className="text-xs text-zinc-500 mb-1 font-medium uppercase tracking-wider">Account</p>
        <p className="text-zinc-300 text-sm">{user.email}</p>
      </div>

      <div className="card p-6">
        <h2 className="font-display font-bold mb-4">Business profile</h2>
        <SettingsForm user={user} />
      </div>
    </div>
  );
}
