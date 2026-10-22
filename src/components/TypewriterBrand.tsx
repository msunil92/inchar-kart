"use client";

import { useEffect, useState } from "react";

const PHRASE = "Inchara Kart";
const TYPE_MS = 90;
const HOLD_MS = 2800;
const DELETE_MS = 45;

export function TypewriterBrand({ className = "" }: { className?: string }) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < PHRASE.length) {
        timer = setTimeout(() => setText(PHRASE.slice(0, text.length + 1)), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
      } else {
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [phase, text]);

  // Prefer wrapping as two lines once both words exist (matches hero layout).
  const display =
    text.includes(" ")
      ? text.replace(" ", "\n")
      : text;

  return (
    <p className={className} aria-label="Inchara Kart" aria-live="polite">
      <span className="whitespace-pre-line">
        {display}
        <span
          className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-pulse bg-[var(--accent)] align-baseline"
          aria-hidden
        />
      </span>
    </p>
  );
}
