"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ accordion, one answer open at a time.
 *
 * "One at a time" is not only a style choice: this section shares its screen
 * with the footer, and several answers open at once would push past the fold.
 * Everything starts closed: the visitor opens what they actually want to read.
 *
 * The open/close animation uses `grid-template-rows: 0fr -> 1fr`, which
 * animates to the content's natural height without measuring it in JS.
 */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  // -1 = nothing open.
  const [open, setOpen] = useState(-1);

  return (
    <div className="mx-auto w-full max-w-3xl">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-lg border-b border-hairline px-[clamp(1rem,0.8rem+0.8vw,1.5rem)] py-[calc(var(--ss)*clamp(0.85rem,0.7rem+0.5vw,1.15rem))] text-left transition-colors duration-300",
                  isOpen ? "bg-surface-2" : "bg-surface hover:bg-surface-2",
                )}
              >
                <span className="text-[clamp(0.95rem,0.3vw+0.88rem,1.08rem)] font-semibold leading-snug tracking-tight text-pretty">
                  {item.q}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 transition-[transform,color] duration-300",
                    isOpen ? "rotate-180 text-brand" : "text-muted-foreground",
                  )}
                />
              </button>
            </h3>

            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-[clamp(1rem,0.8rem+0.8vw,1.5rem)] py-[calc(var(--ss)*clamp(0.9rem,0.75rem+0.6vw,1.35rem))] text-[clamp(0.85rem,0.2vw+0.8rem,0.95rem)] leading-[1.65] text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
