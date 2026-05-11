"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, ExternalLink, Pencil, Trash2, Check, Package } from "lucide-react";
import { formatNaira, getProductUrl } from "@/lib/utils";
import type { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const productUrl = getProductUrl(product.slug);

  async function copyLink() {
    await navigator.clipboard.writeText(productUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  async function deleteProduct() {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Product deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="card overflow-hidden hover:border-zinc-700 transition-all group flex flex-col">
      {/* Image */}
      <div className="h-40 bg-zinc-800 relative overflow-hidden">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={32} className="text-zinc-600" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-zinc-900/90 backdrop-blur rounded-lg text-brand-400 text-xs font-bold">
            {formatNaira(product.price)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-zinc-100 mb-1 line-clamp-1">{product.name}</h3>
        {product.description && (
          <p className="text-zinc-500 text-xs line-clamp-2 mb-3 flex-1">{product.description}</p>
        )}

        {/* Product link */}
        <div className="flex items-center gap-1 bg-zinc-800 rounded-lg px-2 py-1.5 mb-3">
          <span className="text-zinc-500 text-xs truncate flex-1">/p/{product.slug}</span>
          <button onClick={copyLink} className="text-zinc-400 hover:text-brand-400 transition-colors shrink-0">
            {copied ? <Check size={14} className="text-brand-400" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link
            href={`/p/${product.slug}`}
            target="_blank"
            className="btn-ghost text-xs px-2 py-1.5 flex-1 justify-center"
          >
            <ExternalLink size={13} />
            Preview
          </Link>
          <Link
            href={`/dashboard/products/${product.id}`}
            className="btn-ghost text-xs px-2 py-1.5 flex-1 justify-center"
          >
            <Pencil size={13} />
            Edit
          </Link>
          <button
            onClick={deleteProduct}
            disabled={deleting}
            className="btn-danger text-xs px-2 py-1.5"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
