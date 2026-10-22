import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { StarRating } from "./StarRating";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const delayClass =
    index % 4 === 0
      ? "stagger-1"
      : index % 4 === 1
        ? "stagger-2"
        : index % 4 === 2
          ? "stagger-3"
          : "stagger-4";

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group glass glass-hover animate-fade-up ${delayClass} block overflow-hidden rounded-[var(--radius)]`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-elevated)]">
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${product.accent}55, transparent 55%)`,
          }}
        />
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          accent={product.accent}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] backdrop-blur-md">
            {product.badge}
          </span>
        )}
      </div>
      <div className="space-y-2 p-4 sm:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-dim)]">
          {product.category}
        </p>
        <h3 className="font-display text-lg leading-snug tracking-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {product.name}
        </h3>
        <StarRating rating={product.rating} showValue count={product.reviewCount} />
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-semibold tracking-tight">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-[var(--text-dim)] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
