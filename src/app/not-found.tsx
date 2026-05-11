import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl mb-4">🛍️</p>
      <h1 className="font-display text-3xl font-bold mb-2">Product not found</h1>
      <p className="text-zinc-500 mb-8">
        This product page doesn&apos;t exist or has been removed.
      </p>
      <Link href="/" className="btn-primary">
        Go to SellFast
      </Link>
    </div>
  );
}
