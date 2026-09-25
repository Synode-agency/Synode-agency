"use client";

import { Children, useId, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";

/** Keep the card markup on the server; only the disclosure needs state. */
export function ServiceGrid({
  children,
  labelledBy,
  collapsible = false,
  locale,
}: {
  children: ReactNode;
  labelledBy: string;
  collapsible?: boolean;
  locale: "fr" | "en";
}) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const cards = Children.toArray(children);
  const canExpand = collapsible && cards.length > 6;
  const visibleCards = canExpand && !expanded ? cards.slice(0, 6) : cards;

  return (
    <>
      <ul
        id={id}
        className={`services-grid${canExpand && expanded ? " services-grid-expanded" : ""}`}
        aria-labelledby={labelledBy}
      >
        {visibleCards}
      </ul>
      {canExpand && (
        <button
          type="button"
          className="services-more"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((value) => !value)}
        >
          {locale === "fr"
            ? expanded ? "Voir moins" : "Voir plus"
            : expanded ? "View less" : "View more"}
          {expanded ? <ArrowUp aria-hidden /> : <ArrowRight aria-hidden />}
        </button>
      )}
    </>
  );
}
