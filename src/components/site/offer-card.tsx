"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
import {
  WorkflowIcon,
  type WorkflowIconHandle,
} from "@/components/site/animated-icons/workflow-icon";
import {
  BlocksIcon,
  type BlocksIconHandle,
} from "@/components/site/animated-icons/blocks-icon";
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
  const workflowRef = useRef<WorkflowIconHandle>(null);
  const blocksRef = useRef<BlocksIconHandle>(null);
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
    workflowRef.current?.startAnimation();
    blocksRef.current?.startAnimation();
    setHovered(true);
    const sheen = sheenRef.current;
    if (sheen) {
      sheen.style.animation = "none";
      void sheen.offsetWidth;
      sheen.style.animation = "offer-sheen 0.95s ease-out";
    }
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
    workflowRef.current?.stopAnimation();
    blocksRef.current?.stopAnimation();
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
        "relative flex flex-col items-center overflow-hidden rounded-[18px] border p-[clamp(22px,2.6vw,32px)] text-center transition-[border-color] duration-300 hover:border-brand/50",
        isSecondary ? "border-brand-deep/42" : "border-brand/30",
      )}
      style={{
        background: isSecondary
          ? "linear-gradient(165deg, rgba(30,95,216,0.15), rgba(8,14,26,0.85))"
          : "linear-gradient(165deg, rgba(63,169,245,0.12), rgba(8,14,26,0.85))",
      }}
    >
      <span ref={sheenRef} aria-hidden className="offer-sheen" />

      <span
        className={cn(
          "grid size-11 place-items-center rounded-xl border border-hairline bg-background",
          accentText,
        )}
      >
        {icon === "Workflow" ? (
          <WorkflowIcon ref={workflowRef} size={20} />
        ) : icon === "Blocks" ? (
          <BlocksIcon ref={blocksRef} size={20} />
        ) : (
          <Icon name={icon} className="size-5" />
        )}
      </span>

      <div className="mt-4 flex items-baseline justify-center gap-3.5">
        <span
          className={cn(
            "font-archivo text-[28px] leading-[0.9] font-extrabold tracking-[-0.06em]",
            accentText,
          )}
        >
          {number}
        </span>
        <h3 className="font-archivo text-[clamp(19px,2vw,24px)] font-bold tracking-[-0.032em]">
          {title}
        </h3>
      </div>

      <p className="font-plex mx-auto mt-3.5 max-w-[40ch] text-[15px] leading-[1.58] text-secondary-foreground">
        {forWho}
      </p>

      <div className="mt-[18px] flex flex-wrap justify-center gap-[7px]">
        {chips.map((chip, i) => (
          <span
            key={chip}
            style={{ transitionDelay: hovered ? `${i * 42}ms` : "0ms" }}
            className={cn(
              "font-plex rounded-full border px-3 py-[5px] text-[13px] transition-[transform,border-color,color] duration-300",
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
          "mx-auto mt-5 max-w-[34ch] border-t-2 pt-[13px]",
          isSecondary ? "border-offer-accent-2" : "border-brand",
        )}
      >
        <div
          className={cn(
            "font-mono text-[10.5px] tracking-[0.12em] uppercase",
            accentText,
          )}
        >
          {resultLabel}
        </div>
        <p className="font-plex mt-[5px] text-[14.5px] leading-[1.5]">
          {result}
        </p>
      </div>
    </Reveal>
  );
}
