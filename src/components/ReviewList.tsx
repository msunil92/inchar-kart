import type { Review } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { StarRating } from "./StarRating";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)]">No reviews yet. Be the first to share.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((review) => (
        <li key={review.id} className="glass rounded-[var(--radius)] p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-[var(--text)]">{review.author}</p>
                {review.verified && (
                  <span className="rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[var(--text-dim)]">{formatDate(review.date)}</p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <h4 className="mt-3 font-display text-base tracking-tight">{review.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{review.body}</p>
        </li>
      ))}
    </ul>
  );
}
