"use client";

import Image from "next/image";
import { useState } from "react";

/** Reliable fallback when a remote product image 404s or fails to load. */
const FALLBACK =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80";

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  accent,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  accent?: string;
}) {
  const [current, setCurrent] = useState(src || FALLBACK);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${className ?? ""}`}
        style={{
          background: `radial-gradient(circle at 30% 20%, ${accent ?? "#0d9488"}55, #dceaf0 70%)`,
        }}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-sm font-semibold tracking-wide text-[var(--text-muted)]">
          {alt.slice(0, 28)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={current}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      // picsum redirects to a CDN; allow optimizer to follow without layout break
      unoptimized={current.includes("picsum.photos")}
      onError={() => {
        if (current !== FALLBACK) {
          setCurrent(FALLBACK);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
