"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Pull strength: fraction of the pointer offset applied (clamped so it stays in its hit box). */
  strength?: number;
  /** Distance (CSS px) outside the element bounds where the pull begins. */
  radius?: number;
};

/**
 * Wraps a single focal control (use on 1–2 per screen max) and gently pulls it
 * toward the pointer. Fine-pointer only; disabled under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  radius = 90,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const enabled = () => fine.matches && !reduce.matches;

    let frame = 0;

    function reset() {
      el!.style.transform = "translate3d(0, 0, 0)";
    }

    function onMove(e: PointerEvent) {
      if (!enabled()) return;
      const r = el!.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const within =
        e.clientX > r.left - radius &&
        e.clientX < r.right + radius &&
        e.clientY > r.top - radius &&
        e.clientY < r.bottom + radius;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (within) {
          el!.style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(
            dy * strength
          ).toFixed(1)}px, 0)`;
        } else {
          reset();
        }
      });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
    };
  }, [strength, radius]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex will-change-transform transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.45,0.5,1)] motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
