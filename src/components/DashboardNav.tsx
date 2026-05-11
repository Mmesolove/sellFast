"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { ShoppingBag, Settings, LogOut } from "lucide-react";

export default function DashboardNav() {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/");
    router.refresh();
  }

  const links = [
    { href: "/dashboard", label: "Products", icon: ShoppingBag },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="border-b border-zinc-800 sticky top-0 z-40 glass">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="font-display font-bold text-lg text-gradient">
          SellFast
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
          <button onClick={logout} className="btn-ghost text-sm ml-1">
            <LogOut size={15} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
