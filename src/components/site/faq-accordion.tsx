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
 * On the page ground rather than in cards: one hairline per row, the question
 * in full ink, the answer in the muted grey the rest of the site uses.
 *
 * The open/close animation uses `grid-template-rows: 0fr -> 1fr`, which
 * animates to the content's natural height without measuring it in JS.
 */
export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  // -1 = nothing open.
  const [open, setOpen] = useState(-1);

  return (
    <div className="faq-list mx-auto flex w-full max-w-3xl flex-col">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.q}>
            <div className="faq-item" data-open={isOpen}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="faq-trigger flex w-full items-center justify-between gap-6 py-[calc(var(--ss)*clamp(1rem,0.8rem+0.6vw,1.4rem))] text-left"
                >
                  <span className="faq-question text-[length:var(--fs-h4)] font-semibold leading-snug tracking-tight">
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
                  <p className="faq-answer max-w-[62ch] pb-[calc(var(--ss)*clamp(1rem,0.8rem+0.6vw,1.5rem))] pr-10 text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
