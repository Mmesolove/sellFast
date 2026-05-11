"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ImageIcon } from "lucide-react";
import { formatNaira } from "@/lib/utils";
import type { Product } from "@prisma/client";

interface Props {
  product?: Product;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    price: product?.price?.toString() ?? "",
    description: product?.description ?? "",
    imageUrl: product?.imageUrl ?? "",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const priceNum = parseFloat(form.price) || 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Product name is required");
    if (!form.price || priceNum <= 0) return toast.error("Enter a valid price");

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        price: priceNum,
        description: form.description.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
      };

      const url = isEdit ? `/api/products/${product.id}` : "/api/products";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }

      toast.success(isEdit ? "Product updated!" : "Product created!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="label">Product name <span className="text-red-400">*</span></label>
        <input
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="e.g. Ankara Tote Bag"
          className="input"
          maxLength={100}
        />
      </div>

      <div>
        <label className="label">Price (₦) <span className="text-red-400">*</span></label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₦</span>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handle}
            placeholder="5000"
            min="1"
            step="any"
            className="input pl-8"
          />
        </div>
        {priceNum > 0 && (
          <p className="text-zinc-500 text-xs mt-1">= {formatNaira(priceNum)}</p>
        )}
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          placeholder="Describe your product — size, material, colours available…"
          rows={3}
          maxLength={500}
          className="input resize-none"
        />
        <p className="text-zinc-600 text-xs mt-1 text-right">{form.description.length}/500</p>
      </div>

      <div>
        <label className="label">Image URL</label>
        <div className="relative">
          <ImageIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handle}
            placeholder="https://example.com/product.jpg"
            className="input pl-9"
          />
        </div>
        <p className="text-zinc-600 text-xs mt-1">
          Paste any image link (Cloudinary, Google Drive public, etc.)
        </p>

        {/* Image preview */}
        {form.imageUrl && (
          <div className="mt-3 rounded-xl overflow-hidden h-40 bg-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary flex-1"
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          {loading ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
      </div>
    </form>
  );
}
