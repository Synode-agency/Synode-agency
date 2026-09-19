"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A single pager for the whole landing page, pinned to the middle of the
 * right edge.
 *
 * One control instead of one arrow per section: scrolling back up no longer
 * walks past a stack of them, and nothing sits on top of the hero's service
 * cards. It moves both ways — up to the previous section, down to the next —
 * and the dots between the chevrons show where you are.
 *
 * Desktop only; on mobile the page is plain scroll.
 */
const SECTIONS = [
  { id: "top", label: "Accueil" },
  { id: "probleme", label: "Le constat" },
  { id: "offre", label: "Notre offre" },
  { id: "methode", label: "Méthode" },
  { id: "equipe", label: "L'équipe" },
  { id: "conclusion", label: "Contact" },
  { id: "faq", label: "FAQ" },
] as const;

export function SectionPager() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = SECTIONS.findIndex((s) => s.id === visible.target.id);
        if (next !== -1) setIndex(next);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, next));
    // The hero sits under the fixed header, so the top of the page is the
    // only correct landing spot for it.
    if (clamped === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document
      .getElementById(SECTIONS[clamped].id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const atStart = index === 0;
  const atEnd = index === SECTIONS.length - 1;

  const button =
    "grid size-8 place-items-center rounded-full text-muted-foreground/70 transition-[color,background-color,transform] duration-300 hover:bg-surface-2/80 hover:text-brand disabled:pointer-events-none disabled:opacity-20";

  return (
    <nav
      aria-label="Navigation par section"
      className="group/pager fixed right-[clamp(0.75rem,0.5rem+0.8vw,1.5rem)] top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-full border border-hairline/60 bg-surface/40 px-1 py-2 opacity-45 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100 lg:flex"
    >
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        disabled={atStart}
        aria-label={atStart ? "Section précédente" : `Aller à : ${SECTIONS[index - 1].label}`}
        className={cn(button, "hover:-translate-y-0.5")}
      >
        <ChevronUp aria-hidden className="size-4" />
      </button>

      <ol className="flex flex-col items-center gap-2 py-1">
        {SECTIONS.map((section, i) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller à : ${section.label}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "block rounded-full transition-[height,background-color] duration-300",
                i === index
                  ? "h-4 w-1 bg-brand"
                  : "size-1 bg-muted-foreground/45 hover:bg-muted-foreground/80",
              )}
            />
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => goTo(index + 1)}
        disabled={atEnd}
        aria-label={atEnd ? "Section suivante" : `Aller à : ${SECTIONS[index + 1].label}`}
        className={cn(button, "hover:translate-y-0.5")}
      >
        <ChevronDown aria-hidden className="size-4" />
      </button>
    </nav>
  );
}
