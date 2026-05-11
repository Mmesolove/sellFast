"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    businessName: "",
    whatsapp: "",
  });

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      toast.success("Account created! Welcome 🎉");
      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm animate-fade-up">
        <Link href="/" className="block text-center font-display text-2xl font-bold text-gradient mb-8">
          SellFast
        </Link>

        <div className="card p-6 sm:p-8">
          <h1 className="font-display text-xl font-bold mb-1">Create your account</h1>
          <p className="text-zinc-500 text-sm mb-6">Start selling on WhatsApp today</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label">Business name</label>
              <input
                name="businessName"
                value={form.businessName}
                onChange={handle}
                placeholder="e.g. Adaeze Fashion"
                className="input"
              />
            </div>

            <div>
              <label className="label">Email address <span className="text-red-400">*</span></label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handle}
                placeholder="you@example.com"
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
              <p className="text-zinc-600 text-xs mt-1">Customers will order via this number</p>
            </div>

            <div>
              <label className="label">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handle}
                  placeholder="At least 8 characters"
                  className="input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-400 hover:text-brand-300 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
