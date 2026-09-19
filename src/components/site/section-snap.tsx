"use client";

import { useEffect } from "react";

/**
 * Turns on one-section-per-scroll for the landing page.
 *
 * The snap rules live in CSS under `html.snap-sections`; this only toggles
 * the class, so the behaviour is scoped to the landing and cleanly removed
 * when navigating to Réalisations, Contact or a legal page — those are long
 * scrolling documents and must never snap.
 *
 * A guard turns snapping off whenever a section grows taller than the
 * viewport: with `mandatory` snapping, an oversized section would hide its
 * own bottom with no way to reach it.
 */
export function SectionSnap() {
  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          "#top, .section-screen, .screen-shell",
        ),
      );
      // 2px of tolerance for sub-pixel rounding.
      const allFit = sections.every(
        (el) => el.offsetHeight <= window.innerHeight + 2,
      );
      root.classList.toggle("snap-sections", allFit);
    };

    sync();
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("resize", sync);
      root.classList.remove("snap-sections");
    };
  }, []);

  return null;
}
