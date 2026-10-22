"use client";

import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/context/CartContext";
import {
  FREE_SHIPPING_THRESHOLD,
  calcGst,
  calcShipping,
  formatPrice,
} from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, isHydrated, itemCount } = useCart();
  const shipping = calcShipping(subtotal);
  const tax = calcGst(subtotal);
  const total = subtotal + shipping + tax;

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-[var(--text-muted)]">
        Loading cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <div className="glass animate-scale-in rounded-[var(--radius)] px-8 py-14">
          <p className="font-display text-2xl tracking-tight">Your cart is empty</p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Discover something you&apos;ll love — then bring it back here to checkout.
          </p>
          <Link href="/products" className="btn-primary mt-8 inline-flex">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8">
        <p className="label">Cart</p>
        <h1 className="font-display mt-1 text-3xl tracking-tight sm:text-4xl">
          {itemCount} item{itemCount === 1 ? "" : "s"}
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.product.id}
              className="glass animate-fade-up flex flex-col gap-4 rounded-[var(--radius)] p-4 sm:flex-row sm:items-center sm:p-5"
            >
              <Link
                href={`/products/${item.product.id}`}
                className="relative h-28 w-full shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--bg-elevated)] sm:h-24 sm:w-24"
              >
                <ProductImage
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  accent={item.product.accent}
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.product.id}`}
                  className="font-display text-lg tracking-tight transition hover:text-[var(--accent)]"
                >
                  {item.product.name}
                </Link>
                <p className="mt-1 text-xs uppercase tracking-wider text-[var(--text-dim)]">
                  {item.product.category}
                </p>
                <p className="mt-2 font-semibold">{formatPrice(item.product.price)}</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <QuantitySelector
                  value={item.quantity}
                  max={item.product.stock}
                  onChange={(q) => updateQuantity(item.product.id, q)}
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="text-sm text-[var(--text-dim)] transition hover:text-[var(--danger)]"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="glass h-fit rounded-[var(--radius)] p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl tracking-tight">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-[var(--text-muted)]">
              <dt>Subtotal</dt>
              <dd className="text-[var(--text)]">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-[var(--text-muted)]">
              <dt>Shipping</dt>
              <dd className="text-[var(--text)]">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between text-[var(--text-muted)]">
              <dt>Tax</dt>
              <dd className="text-[var(--text)]">{formatPrice(tax)}</dd>
            </div>
            <div className="noise-line my-2" />
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          {subtotal < FREE_SHIPPING_THRESHOLD && (
            <p className="mt-3 text-xs text-[var(--text-dim)]">
              Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
            </p>
          )}
          <Link href="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
