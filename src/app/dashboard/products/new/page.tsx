import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/ProductForm";

export const metadata = { title: "New Product" };

export default function NewProductPage() {
  return (
    <div className="page-container max-w-xl">
      <Link href="/dashboard" className="btn-ghost text-sm mb-6 -ml-2 inline-flex">
        <ArrowLeft size={16} />
        Back to products
      </Link>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Add new product</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Fill in the details. Your product page will be ready instantly.
        </p>
      </div>

      <div className="card p-6">
        <ProductForm />
      </div>
    </div>
  );
}
