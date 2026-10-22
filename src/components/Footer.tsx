import Link from "next/link";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-xl font-bold tracking-wide">Inchara Kart</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
              A curated marketplace for phones, computers, and everyday essentials — design-led
              shopping built for modern commerce.
            </p>
          </div>
          <div>
            <p className="label mb-3">Shop</p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/products" className="transition hover:text-[var(--text)]">
                  All products
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/products?category=${encodeURIComponent(c)}`}
                    className="transition hover:text-[var(--text)]"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-3">Help</p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>Shipping & returns</li>
              <li>Order tracking</li>
              <li>Size guides</li>
              <li>Contact support</li>
            </ul>
          </div>
          <div>
            <p className="label mb-3">Company</p>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>About Inchara Kart</li>
              <li>Sustainability</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
        </div>
        <div className="noise-line my-10" />
        <div className="flex flex-col gap-3 text-xs text-[var(--text-dim)] sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p>© 2026 Inchara Kart.</p>
            <p>Developed by Sunil Mayanna</p>
          </div>
          <p>Demo storefront — no real payments processed.</p>
        </div>
      </div>
    </footer>
  );
}
