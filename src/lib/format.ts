export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/** Free shipping threshold */
export const FREE_SHIPPING_THRESHOLD = 499;

/** Flat shipping fee when below free shipping */
export const SHIPPING_FEE = 79;

/** Tax rate */
export const GST_RATE = 0.18;

export function calcShipping(subtotal: number): number {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_FEE;
}

export function calcGst(subtotal: number): number {
  return Math.round(subtotal * GST_RATE);
}
