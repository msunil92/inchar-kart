"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components/ProductImage";
import { useCart } from "@/context/CartContext";
import { calcGst, calcShipping, formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clearCart, isHydrated, itemCount } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const shipping = calcShipping(subtotal);
  const tax = calcGst(subtotal);
  const total = subtotal + shipping + tax;

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center text-[var(--text-muted)]">
        Loading checkout…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="font-display text-2xl">Nothing to checkout</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Add items to your cart first.</p>
        <Link href="/products" className="btn-primary mt-6 inline-flex">
          Browse products
        </Link>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const orderId = `IK-${Date.now().toString(36).toUpperCase()}`;
    sessionStorage.setItem(
      "inchara-kart-last-order",
      JSON.stringify({
        orderId,
        total,
        itemCount,
        placedAt: new Date().toISOString(),
      })
    );
    await new Promise((r) => setTimeout(r, 900));
    clearCart();
    router.push(`/order/confirmation?id=${orderId}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8">
        <p className="label">Checkout</p>
        <h1 className="font-display mt-1 text-3xl tracking-tight sm:text-4xl">
          Complete your order
        </h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Demo checkout — no real payment is processed.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="space-y-6">
          <section className="glass animate-fade-up rounded-[var(--radius)] p-5 sm:p-6">
            <h2 className="font-display text-lg tracking-tight">Contact</h2>
            <div className="mt-4">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input-field"
                placeholder="you@example.com"
              />
            </div>
          </section>

          <section className="glass animate-fade-up stagger-1 rounded-[var(--radius)] p-5 sm:p-6">
            <h2 className="font-display text-lg tracking-tight">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="firstName">
                  First name
                </label>
                <input id="firstName" name="firstName" required className="input-field" />
              </div>
              <div>
                <label className="label" htmlFor="lastName">
                  Last name
                </label>
                <input id="lastName" name="lastName" required className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="address">
                  Address
                </label>
                <input id="address" name="address" required className="input-field" />
              </div>
              <div>
                <label className="label" htmlFor="city">
                  City
                </label>
                <input id="city" name="city" required className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="state">
                    State
                  </label>
                  <input id="state" name="state" required className="input-field" placeholder="Karnataka" />
                </div>
                <div>
                  <label className="label" htmlFor="postal">
                    Postal code
                  </label>
                  <input
                    id="postal"
                    name="postal"
                    required
                    className="input-field"
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="glass animate-fade-up stagger-2 rounded-[var(--radius)] p-5 sm:p-6">
            <h2 className="font-display text-lg tracking-tight">Payment</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label" htmlFor="cardNumber">
                  Card number
                </label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  required
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="expiry">
                    Expiry
                  </label>
                  <input
                    id="expiry"
                    name="expiry"
                    required
                    placeholder="MM/YY"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="cvc">
                    CVC
                  </label>
                  <input
                    id="cvc"
                    name="cvc"
                    required
                    placeholder="123"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="glass h-fit rounded-[var(--radius)] p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl tracking-tight">Your bag</h2>
          <ul className="mt-5 max-h-64 space-y-3 overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.product.id} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--bg-elevated)]">
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    accent={item.product.accent}
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-[var(--text-dim)]">Qty {item.quantity}</p>
                </div>
                <p className="text-sm tabular-nums">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-[var(--text-muted)]">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-[var(--text-muted)]">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between text-[var(--text-muted)]">
              <dt>Tax</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="noise-line my-2" />
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full">
            {submitting ? "Placing order…" : `Pay ${formatPrice(total)}`}
          </button>
          <Link
            href="/cart"
            className="mt-3 block text-center text-sm text-[var(--text-muted)] transition hover:text-[var(--text)]"
          >
            Back to cart
          </Link>
        </aside>
      </form>
    </div>
  );
}
