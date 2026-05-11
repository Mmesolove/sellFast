import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: { default: "SellFast — WhatsApp Commerce for Nigerian Businesses", template: "%s | SellFast" },
  description: "Create beautiful product pages and receive orders directly on WhatsApp. Built for Nigerian small businesses.",
  keywords: ["whatsapp commerce", "sell online nigeria", "product page", "small business"],
  openGraph: {
    title: "SellFast",
    description: "Sell anything on WhatsApp in minutes",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-100 min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#18181b", border: "1px solid #3f3f46", color: "#f4f4f5" },
          }}
        />
      </body>
    </html>
  );
}
