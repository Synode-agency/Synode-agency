import { Check } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

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

/**
 * One of the two offers.
 *
 * A white panel on the off-white page, a hairline, and a rule under the
 * title. No tilt on mouse move, no sheen sweep, no glow: the card is read,
 * not played with.
 */
export function OfferCard({
  number,
  title,
  forWho,
  includes: chips,
  result,
  resultLabel,
  delay,
}: OfferCardProps) {
  return (
    <Reveal
      delay={delay}
      className="surface-card flex flex-col px-[clamp(1.5rem,1.2rem+1.6vw,2.75rem)] py-[calc(var(--ss)*clamp(1.75rem,1.4rem+1.6vw,2.75rem))]"
    >
      <div className="flex items-baseline gap-3 border-b border-hairline pb-4">
        <span className="section-index">{number}</span>
        <h3 className="font-heading text-[clamp(1.15rem,1vw+0.95rem,1.6rem)] leading-tight font-bold tracking-[-0.03em]">
          {title}
        </h3>
      </div>

      <p className="mt-[calc(var(--ss)*clamp(1rem,0.8rem+0.7vw,1.5rem))] max-w-[44ch] text-[clamp(0.9rem,0.3vw+0.84rem,1.05rem)] leading-[1.6] text-secondary-foreground text-balance">
        {forWho}
      </p>

      {/* Two per row: a 2x2 block, so exactly two rows. */}
      <ul className="mt-[calc(var(--ss)*clamp(1.1rem,0.9rem+0.8vw,1.75rem))] grid grid-cols-2 gap-x-6 gap-y-3">
        {chips.map((chip) => (
          <li
            key={chip}
            className="flex items-start gap-2.5 text-[clamp(0.82rem,0.2vw+0.78rem,0.92rem)] leading-snug text-foreground/85"
          >
            <Check
              aria-hidden
              className="mt-[0.15em] size-4 shrink-0 text-brand"
              strokeWidth={2.5}
            />
            {chip}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-[clamp(1.25rem,1rem+1vw,2rem)]">
        <div className="label-xs text-muted-foreground">{resultLabel}</div>
        <p className="mt-1.5 max-w-[44ch] text-[clamp(0.9rem,0.3vw+0.84rem,1.05rem)] leading-[1.5] font-medium">
          {result}
        </p>
      </div>
    </Reveal>
  );
}
