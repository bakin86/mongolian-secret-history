"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.25, 0.1, 0.25, 1)";

/**
 * Watches an element and reports when it should reveal.
 *
 * Unlike a bare `whileInView`, this can never strand content off-screen: if the
 * observer never fires — Lenis' smooth scrolling and background/throttled tabs
 * both manage it — a timer reveals the element anyway. Content that failed to
 * animate is a cosmetic miss; content that stays invisible is a broken page.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => setShown(true);

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(element);

    const safetyNet = window.setTimeout(reveal, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyNet);
    };
  }, []);

  return { ref, shown };
}

/** Fades content up into place. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        translate: shown ? "0 0" : "0 2.5rem",
        transition: `opacity 800ms ${EASE}, translate 800ms ${EASE}`,
        transitionDelay: shown ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Wipes imagery in from the bottom while the picture itself settles from a
 * slight zoom. Expects a `fill` image as its child — the inner wrapper is the
 * positioned ancestor.
 */
export function RevealClip({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        clipPath: shown ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        transition: `clip-path 900ms ${EASE}`,
        transitionDelay: shown ? `${delay}ms` : "0ms",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          scale: shown ? "1" : "1.2",
          transition: `scale 1200ms ${EASE}`,
          transitionDelay: shown ? `${delay}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}
