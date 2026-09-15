"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RealisationItem {
  code: string;
  domain: string;
  title: string;
  desc: string;
  stack: readonly string[];
  result: string;
}

export function RealisationsCarousel({
  items,
  badge,
}: {
  items: readonly RealisationItem[];
  badge: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function goTo(next: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(items.length - 1, next));
    setIndex(clamped);
    const card = track.children[clamped];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className="mt-10 lg:mt-0">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.code}
            className="group glow-hover relative flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-[clamp(1.25rem,1.1rem+1vw,2rem)]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <div className="flex items-start justify-between gap-3">
              <span className="eyebrow tnum text-muted-foreground/60">
                {item.code}
              </span>
              <span className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-brand">
                {badge}
              </span>
            </div>

            <span className="mt-3 text-[0.72rem] leading-snug text-muted-foreground/70">
              {item.domain}
            </span>

            <h3 className="mt-4 text-[length:var(--fs-h3)] font-semibold leading-snug tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-[length:var(--fs-small)] leading-[1.65] text-muted-foreground">
              {item.desc}
            </p>

            <div className="mt-auto space-y-3 border-t border-hairline pt-5">
              <p className="font-mono text-[0.72rem] leading-relaxed text-muted-foreground/75">
                {item.stack.join("  ·  ")}
              </p>
              <p className="flex items-start gap-2 text-[0.82rem] font-medium text-brand">
                <span
                  aria-hidden
                  className="mt-1.5 size-1 shrink-0 rounded-full bg-brand"
                />
                {item.result}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Précédent"
          className="grid size-9 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === items.length - 1}
          aria-label="Suivant"
          className="grid size-9 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-30"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
