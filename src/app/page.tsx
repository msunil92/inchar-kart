import Image from "next/image";
import Link from "next/link";
import { CategoryAisle } from "@/components/CategoryAisle";
import { ProductCard } from "@/components/ProductCard";
import { TypewriterBrand } from "@/components/TypewriterBrand";
import { getFeaturedProducts, getProducts } from "@/data/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const bestsellers = [...getProducts()]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);

  return (
    <div>
      {/* Hero — brand first, full-bleed atmosphere */}
      <section className="relative min-h-[min(88vh,820px)] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=80"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(231,240,244,0.35)] via-[rgba(231,240,244,0.55)] to-[var(--bg)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(13,148,136,0.18),transparent_55%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[min(88vh,820px)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <TypewriterBrand className="animate-fade-up font-display min-h-[5.5rem] text-4xl font-extrabold tracking-wide text-[var(--text)] sm:min-h-[8rem] sm:text-6xl md:min-h-[9.5rem] md:text-7xl" />
          <h1 className="animate-fade-up stagger-1 mt-5 max-w-xl font-display text-2xl font-semibold leading-tight tracking-tight text-balance text-[var(--text)] sm:text-3xl md:text-4xl">
            Phones, computers & more — shop with clarity.
          </h1>
          <p className="animate-fade-up stagger-2 mt-4 max-w-md text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            An enterprise-ready marketplace experience inspired by Amazon and Flipkart — browse,
            review, and checkout in one polished flow.
          </p>
          <div className="animate-fade-up stagger-3 mt-8 flex flex-wrap gap-3">
            <Link href="/products?category=Phones" className="btn-primary">
              Shop phones
            </Link>
            <Link href="/products?category=Computers" className="btn-ghost">
              Shop computers
            </Link>
          </div>
        </div>
      </section>

      <CategoryAisle />

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8">
          <p className="label">Featured</p>
          <h2 className="font-display mt-1 text-2xl tracking-tight sm:text-3xl">
            Editor&apos;s selections
          </h2>
          <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">
            Hand-picked pieces with standout design, verified reviews, and fast delivery vibes.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Banner strip */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-[calc(var(--radius)+0.25rem)] px-6 py-12 sm:px-10 sm:py-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="label">Why Inchara Kart</p>
              <h2 className="font-display mt-2 text-2xl tracking-tight sm:text-3xl text-balance">
                Browse deep. Checkout clean. Built to scale.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
                Deep phone and computer catalogs, verified reviews, and a streamlined checkout —
                designed as a foundation for enterprise deployments.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                "Phones & computers catalog",
                "Verified buyer reviews",
                "Secure mock checkout",
                "Cart that remembers you",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-white/70 px-4 py-3 text-sm"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-8 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="label">Trending</p>
            <h2 className="font-display mt-1 text-2xl tracking-tight sm:text-3xl">Bestsellers</h2>
          </div>
          <Link href="/products" className="text-sm text-[var(--accent)] transition hover:opacity-80">
            Shop all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
