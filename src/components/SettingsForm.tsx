"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Props {
  user: {
    id: string;
    email: string;
    businessName: string | null;
    whatsapp: string | null;
  };
}

export default function SettingsForm({ user }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: user.businessName ?? "",
    whatsapp: user.whatsapp ?? "",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success("Profile updated!");
      router.refresh();
    } catch {
      toast.error("Failed to save. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="label">Business name</label>
        <input
          name="businessName"
          value={form.businessName}
          onChange={handle}
          placeholder="e.g. Chioma's Boutique"
          className="input"
        />
      </div>

      <div>
        <label className="label">WhatsApp number</label>
        <input
          name="whatsapp"
          value={form.whatsapp}
          onChange={handle}
          placeholder="+2348012345678"
          className="input"
        />
        <p className="text-zinc-600 text-xs mt-1">
          Include country code (e.g. +234 for Nigeria). Customers will send orders here.
        </p>
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? <Loader2 size={16} className="animate-spin" /> : null}
        {loading ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
