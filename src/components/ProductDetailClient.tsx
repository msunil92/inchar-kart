"use client";

import Link from "next/link";
import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductImage } from "@/components/ProductImage";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ReviewList } from "@/components/ReviewList";
import { StarRating } from "@/components/StarRating";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <nav className="mb-8 text-sm text-[var(--text-dim)]">
        <Link href="/products" className="transition hover:text-[var(--text-muted)]">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="transition hover:text-[var(--text-muted)]"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-muted)]">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="animate-scale-in relative aspect-square overflow-hidden rounded-[calc(var(--radius)+0.25rem)] bg-[var(--bg-elevated)] lg:sticky lg:top-24 lg:self-start">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at 35% 25%, ${product.accent}44, transparent 55%)`,
            }}
          />
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            priority
            accent={product.accent}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] backdrop-blur-md">
              {product.badge}
            </span>
          )}
        </div>

        <div className="animate-fade-up">
          <p className="label">{product.category}</p>
          <h1 className="font-display mt-2 text-3xl tracking-tight sm:text-4xl md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4">
            <StarRating
              rating={product.rating}
              size="md"
              showValue
              count={product.reviewCount}
            />
          </div>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-semibold tracking-tight">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-[var(--text-dim)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                {savings > 0 && (
                  <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
                    Save {formatPrice(savings)}
                  </span>
                )}
              </>
            )}
          </div>

          <p className="mt-3 text-sm text-[var(--text-dim)]">
            {product.stock > 10
              ? "In stock — ships in 1–2 days"
              : product.stock > 0
                ? `Only ${product.stock} left`
                : "Currently unavailable"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantitySelector
              value={quantity}
              max={product.stock}
              onChange={setQuantity}
            />
            <AddToCartButton product={product} quantity={quantity} className="min-w-[180px]" />
          </div>

          <div className="noise-line my-10" />

          <div>
            <h2 className="font-display text-xl tracking-tight">About this product</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {product.longDescription}
            </p>
            <ul className="mt-5 space-y-2">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-[var(--text-muted)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-16 lg:mt-20" id="reviews">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">Customer reviews</p>
            <h2 className="font-display mt-1 text-2xl tracking-tight sm:text-3xl">
              What buyers say
            </h2>
          </div>
          <div className="glass rounded-[var(--radius-sm)] px-4 py-3 text-sm">
            <StarRating rating={product.rating} showValue count={product.reviewCount} />
          </div>
        </div>
        <ReviewList reviews={product.reviews} />
      </section>
    </div>
  );
}
