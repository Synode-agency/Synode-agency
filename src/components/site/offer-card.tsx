"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
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
  includes,
  result,
  resultLabel,
  delay,
}: OfferCardProps) {
  const workflowRef = useRef<WorkflowIconHandle>(null);
  const blocksRef = useRef<BlocksIconHandle>(null);

  const handleEnter = () => {
    workflowRef.current?.startAnimation();
    blocksRef.current?.startAnimation();
  };

  const handleLeave = () => {
    workflowRef.current?.stopAnimation();
    blocksRef.current?.stopAnimation();
  };

  return (
    <Reveal
      delay={delay}
      className="glow-hover relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-8 sm:p-9"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
      />

      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-xl border border-hairline bg-background text-brand">
          {icon === "Workflow" ? (
            <WorkflowIcon ref={workflowRef} size={20} />
          ) : icon === "Blocks" ? (
            <BlocksIcon ref={blocksRef} size={20} />
          ) : (
            <Icon name={icon} className="size-5" />
          )}
        </span>
        <span className="num-ghost tnum text-[3.25rem]">{number}</span>
      </div>

      <h3 className="mt-6 text-[1.35rem] font-semibold leading-snug tracking-tight">
        {title}
      </h3>
      <p className="mt-2.5 text-[0.9rem] leading-[1.7] text-muted-foreground">
        {forWho}
      </p>

      <ul className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6">
        {includes.map((ex) => (
          <li
            key={ex}
            className="flex items-start gap-3 text-[0.875rem] text-foreground/85"
          >
            <span className="mt-0.5 grid size-[1.1rem] shrink-0 place-items-center rounded-[5px] bg-brand/12 text-brand">
              <Check className="size-3" strokeWidth={2.5} />
            </span>
            <span>{ex}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-3 pt-7">
        <span
          aria-hidden
          className="mt-0.5 w-0.5 shrink-0 rounded-full bg-brand/60"
        />
        <p className="text-[0.85rem] leading-[1.6] text-foreground/75">
          <span className="eyebrow mr-2 text-brand">{resultLabel}</span>
          {result}
        </p>
      </div>
    </Reveal>
  );
}
