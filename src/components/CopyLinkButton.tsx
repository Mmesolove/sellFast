"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      // Try native share first on mobile
      if (navigator.share) {
        await navigator.share({ url, title: "Check this out!" });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied! Share it anywhere.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        toast.error("Couldn't copy link");
      }
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="
        flex items-center justify-center gap-2
        w-full py-3 px-6
        bg-zinc-800 hover:bg-zinc-700
        text-zinc-300 font-medium text-sm
        rounded-2xl border border-zinc-700
        transition-all duration-150
        active:scale-95
      "
    >
      {copied ? (
        <>
          <Check size={16} className="text-brand-400" />
          <span className="text-brand-400">Link copied!</span>
        </>
      ) : (
        <>
          {typeof navigator !== "undefined" && "share" in navigator ? (
            <Share2 size={16} />
          ) : (
            <Copy size={16} />
          )}
          Share product link
        </>
      )}
    </button>
  );
}
