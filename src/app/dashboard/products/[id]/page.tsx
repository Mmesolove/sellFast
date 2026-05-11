import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/ProductForm";

export const metadata = { title: "Edit Product" };

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const session = getCurrentUser();
  if (!session) redirect("/login");

  const product = await prisma.product.findFirst({
    where: { id: params.id, userId: session.userId },
  });

  if (!product) notFound();

  return (
    <div className="page-container max-w-xl">
      <Link href="/dashboard" className="btn-ghost text-sm mb-6 -ml-2 inline-flex">
        <ArrowLeft size={16} />
        Back to products
      </Link>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Edit product</h1>
        <p className="text-zinc-500 text-sm mt-1">{product.name}</p>
      </div>

      <div className="card p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
