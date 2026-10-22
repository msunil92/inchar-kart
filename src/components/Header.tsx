"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

export function Header() {
  const { itemCount, isHydrated } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong border-b border-[var(--border)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-display shrink-0 text-base font-bold tracking-wide text-[var(--text)] transition-opacity hover:opacity-80 sm:text-lg"
          >
            Inchara Kart
          </Link>

          <nav className="ml-2 hidden items-center gap-1 lg:flex">
            <NavLink href="/products" active={pathname.startsWith("/products")}>
              Shop
            </NavLink>
            {categories.slice(0, 4).map((cat) => (
              <NavLink
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                active={false}
              >
                {cat}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={onSearch} className="ml-auto hidden max-w-md flex-1 md:block">
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-dim)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="input-field h-10 rounded-full py-0 pl-10 pr-4 text-sm"
                aria-label="Search products"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)] md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
              aria-label={`Cart, ${isHydrated ? itemCount : 0} items`}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 10-8 0v4M5 9h14l-1.2 9.6a2 2 0 01-2 1.7H8.2a2 2 0 01-2-1.7L5 9z"
                />
              </svg>
              {isHydrated && itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-[#1a1612]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="animate-fade-in border-t border-[var(--border)] px-4 py-4 md:hidden">
            <form onSubmit={onSearch} className="mb-4">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="input-field"
                aria-label="Search products"
              />
            </form>
            <div className="flex flex-col gap-1">
              <MobileLink href="/products" onClick={() => setMenuOpen(false)}>
                All products
              </MobileLink>
              {categories.map((cat) => (
                <MobileLink
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {cat}
                </MobileLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-sm transition ${
        active
          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
          : "text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-[var(--radius-sm)] px-3 py-2.5 text-[var(--text)] transition hover:bg-[var(--accent-soft)]"
    >
      {children}
    </Link>
  );
}
