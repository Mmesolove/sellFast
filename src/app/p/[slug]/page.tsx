import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatNaira, buildWhatsAppLink } from "@/lib/utils";
import { MessageCircle, Package, Share2 } from "lucide-react";
import CopyLinkButton from "@/components/CopyLinkButton";
import WhatsAppButton from "@/components/WhatsAppButton";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { user: { select: { businessName: true } } },
  });

  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} — ${formatNaira(product.price)}`,
    description: product.description ?? `Buy ${product.name} for ${formatNaira(product.price)}`,
    openGraph: {
      title: product.name,
      description: product.description ?? `${formatNaira(product.price)}`,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      user: { select: { whatsapp: true, businessName: true } },
    },
  });

  if (!product) notFound();

  const waLink = product.user.whatsapp
    ? buildWhatsAppLink(product.user.whatsapp, product.name, product.price)
    : null;

  const productUrl =
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/p/${product.slug}`;

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top bar */}
      <header className="border-b border-zinc-800/60 glass sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display font-bold text-gradient text-lg">SellFast</span>
          {product.user.businessName && (
            <span className="text-zinc-500 text-sm">{product.user.businessName}</span>
          )}
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 animate-fade-up">
        {/* Product image */}
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 mb-6 shadow-2xl">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <Package size={48} className="text-zinc-600" />
              <p className="text-zinc-600 text-sm">No image</p>
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-zinc-100 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-brand-400">
              {formatNaira(product.price)}
            </span>
          </div>

          {product.description && (
            <p className="text-zinc-400 leading-relaxed text-sm">
              {product.description}
            </p>
          )}
        </div>

        {/* WhatsApp CTA */}
        {waLink ? (
          <WhatsAppButton href={waLink} />
        ) : (
          <div className="w-full py-4 bg-zinc-800 rounded-2xl text-center text-zinc-500 text-sm">
            Contact details not available
          </div>
        )}

        {/* Share / Copy link */}
        <div className="mt-4">
          <CopyLinkButton url={productUrl} />
        </div>

        {/* Seller badge */}
        {product.user.businessName && (
          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-zinc-600 text-xs">
              Sold by <span className="text-zinc-400 font-medium">{product.user.businessName}</span>
            </p>
            <p className="text-zinc-700 text-xs mt-1">
              Powered by{" "}
              <a href="/" className="text-brand-600 hover:text-brand-500">
                SellFast
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
