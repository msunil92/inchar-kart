"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Shop by aisle",
  "Shop by Passageway",
  "Shop by Corridor",
  "Shop by Gangway",
  "Shop by Pathway",
  "Shop by Path",
  "Shop by Walkway",
  "Shop by Lane",
  "Shop by Alley",
  "Shop by Arcade",
] as const;

const TYPE_MS = 65;
const HOLD_MS = 1600;
const DELETE_MS = 35;

export function TypewriterShopBy({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  const full = PHRASES[index]!;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < full.length) {
        timer = setTimeout(() => setText(full.slice(0, text.length + 1)), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      } else {
        setIndex((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [phase, text, full]);

  return (
    <h2 className={className} aria-live="polite">
      <span className="text-[var(--accent)]">{text}</span>
      <span
        className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] animate-pulse bg-[var(--accent)] align-baseline"
        aria-hidden
      />
    </h2>
  );
}
