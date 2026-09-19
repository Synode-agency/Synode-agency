"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  icon: string;
  number: string;
  title: string;
  forWho: string;
  includes: readonly string[];
  result: string;
  resultLabel: string;
  delay: number;
}

export function OfferCard({
  icon,
  number,
  title,
  forWho,
  includes: chips,
  result,
  resultLabel,
  delay,
}: OfferCardProps) {
  const sheenRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  // Offer 02 (Blocks / Solutions sur mesure) gets its own accent from the palette.
  const isSecondary = icon === "Blocks";
  const accentText = isSecondary ? "text-offer-accent-2" : "text-brand";

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const r = card.getBoundingClientRect();
    const dx = (event.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (event.clientY - (r.top + r.height / 2)) / r.height;
    card.style.transform = `perspective(1100px) rotateY(${(dx * 2.4).toFixed(2)}deg) rotateX(${(-dy * 2.4).toFixed(2)}deg) translateY(-3px)`;
  }

  function handleMouseEnter() {
    setHovered(true);
    const sheen = sheenRef.current;
    if (sheen) {
      sheen.style.animation = "none";
      void sheen.offsetWidth;
      sheen.style.animation = "offer-sheen 0.95s ease-out";
    }
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
    setHovered(false);
    event.currentTarget.style.transform = "none";
  }

  return (
    <Reveal
      delay={delay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative flex flex-col items-center overflow-hidden rounded-[18px] border px-[clamp(28px,3vw,52px)] py-[calc(var(--ss)*clamp(30px,2.8vw,48px))] text-center transition-[border-color] duration-300 hover:border-brand/50",
        isSecondary ? "border-brand-deep/42" : "border-brand/30",
      )}
      style={{
        background: isSecondary
          ? "linear-gradient(165deg, rgba(30,95,216,0.15), rgba(8,14,26,0.85))"
          : "linear-gradient(165deg, rgba(63,169,245,0.12), rgba(8,14,26,0.85))",
      }}
    >
      <span ref={sheenRef} aria-hidden className="offer-sheen" />

      <div className="flex items-baseline justify-center gap-3.5">
        <span
          className={cn(
            "font-archivo text-[clamp(22px,1.6vw+16px,32px)] leading-[0.9] font-extrabold tracking-[-0.06em]",
            accentText,
          )}
        >
          {number}
        </span>
        <h3 className="font-archivo text-[clamp(19px,2vw,24px)] font-bold tracking-[-0.032em]">
          {title}
        </h3>
      </div>

      <p className="font-plex mx-auto mt-[calc(var(--ss)*clamp(12px,0.8vw+8px,18px))] max-w-[44ch] text-balance text-[clamp(13px,0.5vw+12px,16px)] leading-[1.58] text-secondary-foreground">
        {forWho}
      </p>

      {/* Two per row, always: a 2x2 block, so exactly two rows of badges.
          Each pill fills its cell, so the four line up on a clean grid. */}
      <div className="mt-[calc(var(--ss)*clamp(16px,1.2vw+12px,26px))] grid w-full grid-cols-2 gap-[clamp(8px,0.5vw+6px,14px)]">
        {chips.map((chip, i) => (
          <span
            key={chip}
            style={{ transitionDelay: hovered ? `${i * 42}ms` : "0ms" }}
            className={cn(
              "font-plex grid place-items-center rounded-full border px-[clamp(12px,0.6vw+9px,18px)] py-[calc(var(--ss)*clamp(9px,0.4vw+7px,13px))] text-center text-balance sm:whitespace-nowrap text-[clamp(12px,0.3vw+11px,14px)] leading-tight transition-[transform,border-color,color] duration-300",
              hovered
                ? "-translate-y-[3px] border-brand/55 text-foreground"
                : "translate-y-0 border-foreground/16 text-secondary-foreground",
            )}
          >
            {chip}
          </span>
        ))}
      </div>

      <div
        className={cn(
          "mx-auto mt-[calc(var(--ss)*clamp(20px,1.4vw+14px,30px))] max-w-[42ch] border-t-2 pt-[15px]",
          isSecondary ? "border-offer-accent-2" : "border-brand",
        )}
      >
        <div
          className={cn(
            "font-mono text-[clamp(9.5px,0.25vw+9px,11.5px)] tracking-[0.12em] uppercase",
            accentText,
          )}
        >
          {resultLabel}
        </div>
        <p className="font-plex mt-[5px] text-[clamp(13px,0.4vw+12px,15.5px)] leading-[1.5]">
          {result}
        </p>
      </div>
    </Reveal>
  );
}
