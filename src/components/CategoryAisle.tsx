import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { TypewriterShopBy } from "@/components/TypewriterShopBy";
import { getCategoryAisles } from "@/data/categoryMeta";

export function CategoryAisle() {
  const aisles = getCategoryAisles();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="label">Categories</p>
          <TypewriterShopBy className="font-display mt-1 min-h-[2.25rem] text-2xl tracking-tight sm:min-h-[2.5rem] sm:text-3xl" />
          <p className="mt-2 max-w-lg text-sm text-[var(--text-muted)]">
            Jump into a department — curated, unique items with product imagery.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden text-sm font-medium text-[var(--accent)] transition hover:opacity-80 sm:block"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {aisles.map((aisle, i) => (
          <Link
            key={aisle.name}
            href={`/products?category=${encodeURIComponent(aisle.name)}`}
            className={`group animate-fade-up stagger-${(i % 4) + 1} relative aspect-[5/4] overflow-hidden rounded-[var(--radius)] border border-[var(--border-strong)]`}
          >
            <ProductImage
              src={aisle.image}
              alt={aisle.name}
              fill
              accent={aisle.accent}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Contrast overlays */}
            <div
              className="absolute inset-0 opacity-75 transition-opacity duration-300 group-hover:opacity-60"
              style={{
                background: `linear-gradient(160deg, ${aisle.accent}aa 0%, rgba(12,58,70,0.82) 55%, rgba(12,58,70,0.92) 100%)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,58,70,0.85)] via-[rgba(12,58,70,0.35)] to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
              <span
                className="mb-2 inline-flex w-fit rounded-full border border-white/35 bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
              >
                {aisle.count} {aisle.count === 1 ? "item" : "items"}
              </span>
              <h3 className="font-display text-xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-2xl">
                {aisle.name}
              </h3>
              <p className="mt-1 text-sm text-white/85">{aisle.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                Browse aisle
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
