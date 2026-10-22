interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
  showValue?: boolean;
  count?: number;
}

export function StarRating({
  rating,
  size = "sm",
  showValue = false,
  count,
}: StarRatingProps) {
  const dim = size === "sm" ? 14 : 18;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => {
          const fill = Math.min(1, Math.max(0, rating - i));
          return (
            <span key={i} className="relative inline-block" style={{ width: dim, height: dim }}>
              <svg
                width={dim}
                height={dim}
                viewBox="0 0 24 24"
                className="absolute inset-0 text-[var(--text-dim)]"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 7.2L12 17.8 5.8 21.4 7 14.2 2 9.3l7.1-1z" />
              </svg>
              <span
                className="absolute inset-0 overflow-hidden text-[var(--accent)]"
                style={{ width: `${fill * 100}%` }}
              >
                <svg
                  width={dim}
                  height={dim}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 7.2L12 17.8 5.8 21.4 7 14.2 2 9.3l7.1-1z" />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-[var(--text-muted)]">
          {rating.toFixed(1)}
          {typeof count === "number" && (
            <span className="text-[var(--text-dim)]"> ({count.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
}
