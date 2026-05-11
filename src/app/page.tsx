
import Link from "next/link";
import { ArrowRight, Zap, ShoppingBag, MessageCircle, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden">
      {/* Nav */}
      <nav className="border-b border-zinc-800/60 sticky top-0 z-50 glass">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-gradient">SellFast</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm">Log in</Link>
            <Link href="/signup" className="btn-primary text-sm py-2">Get started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-900/40 border border-brand-700/40 rounded-full text-brand-400 text-sm font-medium mb-6">
            <Zap size={14} className="fill-brand-400" />
            Built for Nigerian small businesses
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-6">
            Sell anything on{" "}
            <span className="text-gradient">WhatsApp</span>
            <br />in minutes
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Create beautiful product pages, share links with customers, and get orders
            directly on WhatsApp — no tech skills needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="btn-primary text-base px-7 py-3.5">
              Start selling free <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="btn-secondary text-base px-7 py-3.5">
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Product page preview mockup */}
      <section className="px-4 pb-20">
        <div className="max-w-sm mx-auto">
          <div className="card p-1 shadow-2xl shadow-brand-900/20 ring-1 ring-brand-500/10">
            <div className="bg-zinc-800 rounded-xl overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-brand-900/60 to-zinc-800 flex items-center justify-center">
                <ShoppingBag size={48} className="text-brand-400/50" />
              </div>
              <div className="p-4">
                <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
                <div className="h-3 bg-zinc-700 rounded w-1/2 mb-4" />
                <div className="h-8 bg-wa/20 border border-wa/30 rounded-lg flex items-center justify-center gap-2">
                  <MessageCircle size={14} className="text-wa" />
                  <span className="text-wa text-xs font-semibold">Buy on WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-zinc-500 text-sm mt-3">Your product page looks like this ↑</p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-12">
            Everything you need to start selling
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: ShoppingBag,
                title: "Beautiful product pages",
                desc: "Each product gets its own shareable link with image, price, and description.",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp orders",
                desc: "Customers click 'Buy on WhatsApp' and get taken straight to your chat.",
              },
              {
                icon: BarChart3,
                title: "Simple dashboard",
                desc: "Manage all your products from one clean dashboard. Add, edit, delete anytime.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 hover:border-zinc-700 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-900/50 border border-brand-800/50 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h3 className="font-display font-bold text-zinc-100 mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="max-w-2xl mx-auto text-center card p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 to-transparent pointer-events-none" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4 relative">
            Ready to get your first order?
          </h2>
          <p className="text-zinc-400 mb-8 relative">
            Free to use. No credit card required.
          </p>
          <Link href="/signup" className="btn-primary text-base px-8 py-3.5 relative">
            Create your store <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-6 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} SellFast · Built for Nigerian hustlers 🇳🇬
      </footer>
    </div>
  );
}
