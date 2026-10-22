"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { categories, getCatalogSize, getProducts, getProductsByCategory } from "@/data/products";
import type { Category, Product } from "@/lib/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "reviews";

const PAGE_SIZE = 20;

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "reviews":
      sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    default:
      break;
  }
  return sorted;
}

export function ProductCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState(searchParams.get("category") ?? "All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [page, setPage] = useState(1);
  const catalogSize = getCatalogSize();

  useEffect(() => {
    setCategory(searchParams.get("category") ?? "All");
    setQuery(searchParams.get("q") ?? "");
    setPage(1);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: Product[] =
      category === "All" ? getProducts() : getProductsByCategory(category as Category);

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return sortProducts(list, sort);
  }, [category, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function selectCategory(next: string) {
    setCategory(next);
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "All") params.delete("category");
    else params.set("category", next);
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="animate-fade-up mb-10 max-w-2xl">
        <p className="label">Catalog</p>
        <h1 className="font-display mt-1 text-3xl tracking-tight sm:text-4xl">Browse products</h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Curated catalog of {catalogSize} unique products — filter and sort by what matters.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === "All"} onClick={() => selectCategory("All")}>
            All
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              active={category === cat}
              onClick={() => selectCategory(cat as Category)}
            >
              {cat}
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Filter results…"
            className="input-field max-w-xs"
            aria-label="Filter products"
          />
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setPage(1);
            }}
            className="input-field max-w-[200px] cursor-pointer appearance-none"
            aria-label="Sort products"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top rated</option>
            <option value="reviews">Most reviewed</option>
          </select>
        </div>
      </div>

      <p className="mb-5 text-sm text-[var(--text-dim)]">
        {filtered.length.toLocaleString("en-IN")} product
        {filtered.length === 1 ? "" : "s"}
        {category !== "All" ? ` in ${category}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
        {filtered.length > PAGE_SIZE
          ? ` · Page ${currentPage} of ${totalPages}`
          : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="glass animate-scale-in rounded-[var(--radius)] px-6 py-16 text-center">
          <p className="font-display text-xl">No matches</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Try another category or clear your search.
          </p>
          <button
            type="button"
            className="btn-ghost mt-6"
            onClick={() => {
              setQuery("");
              selectCategory("All");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                className="btn-ghost !px-4 !py-2 text-sm"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span className="px-3 text-sm text-[var(--text-muted)]">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                className="btn-ghost !px-4 !py-2 text-sm"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm transition ${
        active
          ? "border border-[var(--accent)]/40 bg-[var(--accent-soft)] text-[var(--accent)]"
          : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"
      }`}
    >
      {children}
    </button>
  );
}
