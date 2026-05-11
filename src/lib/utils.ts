import slugify from "slugify";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateSlug(name: string): string {
  const base = slugify(name, { lower: true, strict: true, trim: true });
  const suffix = Math.random().toString(36).substring(2, 7);
  return `${base}-${suffix}`;
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppLink(phone: string, productName: string, price: number): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPrice = formatNaira(price);
  const text = encodeURIComponent(
    `Hi, I want to buy *${productName}* for ${formattedPrice}. Is it available?`
  );
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

export function getProductUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "";
  return `${base}/p/${slug}`;
}

export function apiError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
