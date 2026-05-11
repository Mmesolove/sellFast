"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center justify-center gap-3
        w-full py-4 px-6
        bg-[#25D366] hover:bg-[#20bd5a]
        text-white font-bold text-lg
        rounded-2xl
        transition-all duration-150
        active:scale-95
        shadow-lg shadow-[#25D366]/20
      "
    >
      <MessageCircle size={24} className="fill-white" />
      Buy on WhatsApp
    </a>
  );
}
