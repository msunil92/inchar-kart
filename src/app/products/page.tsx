import { Suspense } from "react";
import { ProductCatalog } from "@/components/ProductCatalog";

export const metadata = {
  title: "Shop",
  description: "Browse the Inchara Kart catalog — electronics, fashion, home, and more.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-[var(--text-muted)]">
          Loading catalog…
        </div>
      }
    >
      <ProductCatalog />
    </Suspense>
  );
}
