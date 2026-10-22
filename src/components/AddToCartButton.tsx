"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: {
  product: Product;
  quantity?: number;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={product.stock <= 0}
      className={`btn-primary ${className}`}
    >
      {product.stock <= 0 ? "Out of stock" : added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
