import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Plus, Package } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = getCurrentUser();
  if (!session) redirect("/login");

  const [user, products] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.userId },
      select: { businessName: true, whatsapp: true },
    }),
    prisma.product.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const missingWhatsApp = !user?.whatsapp;

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold">
            {user?.businessName ? `${user.businessName}'s Products` : "My Products"}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/dashboard/products/new" className="btn-primary text-sm py-2.5">
          <Plus size={16} />
          Add product
        </Link>
      </div>

      {/* WhatsApp warning */}
      {missingWhatsApp && (
        <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700/40 rounded-xl flex items-start gap-3">
          <span className="text-amber-400 text-lg mt-0.5">⚠️</span>
          <div>
            <p className="text-amber-300 font-medium text-sm">Add your WhatsApp number</p>
            <p className="text-amber-500 text-xs mt-0.5">
              Customers can&apos;t order without it.{" "}
              <Link href="/dashboard/settings" className="underline hover:text-amber-300">
                Add it now →
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Products grid */}
      {products.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
            <Package size={28} className="text-zinc-500" />
          </div>
          <h2 className="font-display font-bold text-lg mb-2">No products yet</h2>
          <p className="text-zinc-500 text-sm mb-6 max-w-xs">
            Add your first product and share the link with customers on WhatsApp.
          </p>
          <Link href="/dashboard/products/new" className="btn-primary">
            <Plus size={16} />
            Add your first product
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
