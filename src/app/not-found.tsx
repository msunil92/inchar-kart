import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-28 text-center">
      <p className="font-display text-6xl font-bold tracking-tight text-[var(--text-dim)]">404</p>
      <h1 className="font-display mt-4 text-2xl tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        That page doesn&apos;t exist in the Inchara Kart catalog.
      </p>
      <Link href="/products" className="btn-primary mt-8">
        Browse products
      </Link>
    </div>
  );
}
