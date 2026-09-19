"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RealisationItem {
  code: string;
  short: string;
  domain: string;
  title: string;
  desc: string;
  result: string;
  /** Screen capture of the demo, 16:9. Falls back to the schematic below. */
  video?: string;
  /** Still frame: poster for the video, or the image of a live demo. */
  poster?: string;
}

/** Depth applied to a card by its distance from the active one. */
function depthStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  if (abs === 0) {
    return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 30 };
  }
  // Each step out slides sideways, shrinks and fades — the coverflow look.
  // Smaller step than a portrait card would need: these are wide.
  const shift = offset * (44 + abs * 4);
  const scale = Math.max(0.74, 1 - abs * 0.12);
  const opacity = Math.max(0, 1 - abs * 0.4);
  return {
    transform: `translateX(${shift}%) scale(${scale})`,
    opacity,
    zIndex: 30 - abs,
    pointerEvents: abs > 2 ? "none" : "auto",
  };
}

export function RealisationsCarousel({
  items,
  badge,
  filterCta,
  contactHref,
}: {
  items: readonly RealisationItem[];
  badge: string;
  filterCta: string;
  contactHref: string;
}) {
  const [index, setIndex] = useState(items.length > 2 ? 1 : 0);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(items.length - 1, next)));
    },
    [items.length],
  );

  // Arrow keys drive the carousel once it has focus.
  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => Math.min(items.length - 1, i + 1));
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [items.length]);

  return (
    <div>
      {/* Filter pills — jump straight to a card */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {items.map((item, i) => (
          <button
            key={item.code}
            type="button"
            onClick={() => go(i)}
            aria-pressed={i === index}
            className={cn(
              "rounded-full border px-[clamp(0.9rem,0.6vw+0.7rem,1.35rem)] py-2 text-[length:var(--fs-small)] transition-[background-color,border-color,color] duration-300",
              i === index
                ? "brand-gradient border-transparent font-medium text-brand-foreground"
                : "border-hairline text-muted-foreground hover:border-brand/40 hover:text-foreground",
            )}
          >
            {item.short}
          </button>
        ))}
        <Link
          href={contactHref}
          className="group inline-flex items-center gap-2 rounded-full border border-hairline px-[clamp(0.9rem,0.6vw+0.7rem,1.35rem)] py-2 text-[length:var(--fs-small)] text-foreground transition-colors hover:border-brand/40 hover:bg-surface-2"
        >
          {filterCta}
          <ArrowRight className="size-3.5 text-brand transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Coverflow stage.
          `overflow-x-clip` and not `hidden`: the off-centre cards stick out far
          past the container, and `hidden` would make this a scroll container.
          Two layouts, not one scaled down: a narrow portrait card below `lg`,
          and the wide 60/40 landscape card from `lg` up. Between the two, a
          single landscape card would leave the text column far too narrow. */}
      <div
        ref={regionRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carrousel"
        aria-label={items[index]?.title}
        className="relative mt-[clamp(2.5rem,2rem+2.5vw,4.5rem)] h-[38rem] overflow-x-clip outline-none lg:h-[24rem]"
      >
        {items.map((item, i) => {
          const offset = i - index;
          const isActive = offset === 0;
          return (
            <article
              key={item.code}
              aria-hidden={Math.abs(offset) > 2}
              onClick={() => !isActive && go(i)}
              style={depthStyle(offset)}
              className={cn(
                "absolute inset-y-0 left-1/2 flex w-[min(92vw,25rem)] -translate-x-1/2 flex-col gap-[clamp(1.25rem,1rem+1.4vw,2.25rem)] overflow-hidden rounded-[1.4rem] border bg-surface p-[clamp(1.75rem,1.4rem+1.8vw,3rem)] transition-[transform,opacity,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:w-[min(92vw,56rem)] lg:flex-row lg:items-stretch",
                isActive
                  ? "border-brand/40 shadow-[0_30px_90px_-40px_color-mix(in_oklab,var(--brand)_70%,transparent)]"
                  : "cursor-pointer border-hairline",
              )}
            >
              {/* Media slot — a 16:9 frame sized to take a screen capture of the
                  demo, or a still for the demos the visitor can try live.
                  Until those exist, the schematic diagram holds the space. */}
              <div className="aspect-video shrink-0 self-center lg:aspect-auto lg:h-full lg:w-[60%] lg:self-auto">
                <div className="grain relative size-full overflow-hidden rounded-xl border border-hairline bg-background/60">
                  {item.video ? (
                    <video
                      src={item.video}
                      poster={item.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="size-full object-contain"
                    />
                  ) : item.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="size-full object-contain"
                    />
                  ) : (
                    <>
                      <span
                        aria-hidden
                        className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand/45 to-transparent"
                      />
                      <span aria-hidden className="absolute inset-0 grid place-items-center">
                        <span className="grid size-10 place-items-center rounded-md border border-brand/40 bg-surface font-mono text-[0.68rem] text-brand">
                          {item.code.replace("D/", "")}
                        </span>
                      </span>
                      {[14, 28, 72, 86].map((left, n) => (
                        <span
                          key={left}
                          aria-hidden
                          className={cn(
                            "absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full",
                            n % 2 === 0 ? "bg-muted-foreground/50" : "bg-brand",
                          )}
                          style={{ left: `${left}%` }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="flex min-w-0 flex-col text-left lg:w-[40%] lg:shrink-0 lg:pr-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="eyebrow tnum text-muted-foreground/60">
                    {item.code}
                  </span>
                  <span className="shrink-0 rounded-full border border-hairline px-2 py-[3px] font-mono text-[0.55rem] uppercase tracking-[0.16em] text-brand">
                    {badge}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[0.7rem] leading-snug text-muted-foreground/60">
                  {item.domain}
                </p>

                <h3 className="mt-2.5 text-[clamp(1.05rem,0.4vw+0.95rem,1.3rem)] font-semibold leading-[1.25] tracking-tight text-pretty">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[clamp(0.8rem,0.22vw+0.76rem,0.9rem)] leading-[1.55] text-muted-foreground">
                  {item.desc}
                </p>

                <div className="mt-auto pt-4">
                  <p className="border-t-2 border-brand pt-3 text-[0.85rem] font-medium leading-snug">
                    {item.result}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-[clamp(1.5rem,1rem+1.5vw,2.5rem)] flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Précédent"
          className="grid size-11 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-25"
        >
          <ArrowLeft className="size-4" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.code}
              type="button"
              onClick={() => go(i)}
              aria-label={item.short}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300",
                i === index ? "w-7 bg-brand" : "w-1.5 bg-muted-foreground/35 hover:bg-muted-foreground/60",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === items.length - 1}
          aria-label="Suivant"
          className="grid size-11 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-25"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
