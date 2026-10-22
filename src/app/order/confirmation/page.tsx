"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/format";

interface LastOrder {
  orderId: string;
  total: number;
  itemCount: number;
  placedAt: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams.get("id");
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("inchara-kart-last-order");
      if (raw) setOrder(JSON.parse(raw) as LastOrder);
    } catch {
      /* ignore */
    }
  }, []);

  const orderId = order?.orderId ?? idFromUrl ?? "IK-DEMO";

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:py-28">
      <div className="glass animate-scale-in w-full rounded-[calc(var(--radius)+0.25rem)] px-6 py-12 sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)]">
          <svg
            className="h-7 w-7 text-[var(--accent)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="label mt-6">Order confirmed</p>
        <h1 className="font-display mt-2 text-3xl tracking-tight">Thank you</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
          Your order is confirmed. A receipt would land in your inbox on a live store — this demo
          keeps everything local.
        </p>
        <div className="mt-8 rounded-[var(--radius-sm)] border border-[var(--border)] bg-white/80 px-4 py-4 text-left text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-[var(--text-dim)]">Order ID</span>
            <span className="font-mono font-medium">{orderId}</span>
          </div>
          {order && (
            <>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-[var(--text-dim)]">Items</span>
                <span>{order.itemCount}</span>
              </div>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-[var(--text-dim)]">Total</span>
                <span className="font-semibold">{formatPrice(order.total)}</span>
              </div>
            </>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/products" className="btn-primary">
            Keep shopping
          </Link>
          <Link href="/" className="btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-[var(--text-muted)]">Loading confirmation…</div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
