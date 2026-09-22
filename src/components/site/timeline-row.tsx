import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

interface TimelineItem {
  title: string;
  text: string;
}

function ChainText({ title, text }: TimelineItem) {
  return (
    <div className="mx-auto max-w-[15rem]">
      <h3 className="font-archivo text-[clamp(15px,0.35vw+14px,17px)] leading-[1.28] font-semibold text-pretty">
        {title}
      </h3>
      <p className="mt-[7px] text-[clamp(12.5px,0.3vw+11.5px,14.5px)] leading-[1.5] text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

function stepNumber(i: number) {
  return String(i + 1).padStart(2, "0");
}

/**
 * Nodes for the Constat ("chain") and Méthode ("track") sections.
 * Chain: the four problems are equal, not ordered, so they carry no number —
 * just a small pulsing brand pip on a rail whose glow sweeps left to right.
 * Title + text alternate above/below the pip, each centered on it.
 * Track: the four steps are ordered, so they read left to right — a plain
 * brand glyph per step (no bubble), the number riding next to the title in
 * the display face, and a long thin brand arrow pointing to the next step.
 */
export function TimelineRow({
  items,
  icons,
  variant,
  className,
}: {
  items: readonly TimelineItem[];
  /** One glyph per item; used by the track variant. */
  icons?: readonly LucideIcon[];
  variant: "chain" | "track";
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Mobile: simple stacked list */}
      <div className="flex flex-col gap-4 sm:hidden">
        {items.map((item, i) => {
          const Glyph = icons?.[i];
          return (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="flex items-start gap-4 rounded-2xl border border-hairline bg-surface p-5 text-left"
            >
              {variant === "chain" ? (
                <span aria-hidden className="chain-pip mt-[7px] shrink-0" />
              ) : (
                Glyph && (
                  <span aria-hidden className="track-icon mt-[3px] shrink-0">
                    <Glyph />
                  </span>
                )
              )}
              <div>
                <h3 className="text-[0.95rem] font-semibold tracking-tight">
                  {variant === "track" && (
                    <span className="track-num">{stepNumber(i)}</span>
                  )}
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[0.83rem] leading-[1.6] text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Desktop */}
      {variant === "chain" ? (
        <Reveal
          className="chain-rail relative hidden overflow-x-clip sm:grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
          }}
        >
          {/* One rail for the whole row, with a glow travelling left to right. */}
          <span aria-hidden className="chain-rail-line" />
          <span aria-hidden className="chain-rail-glow" />
          {items.map((item, i) => {
            const showAbove = i % 2 === 0;
            return (
              <div
                key={item.title}
                className="chain-node relative grid grid-rows-[1fr_auto_1fr] px-1.5"
                style={{ minHeight: "clamp(230px, 24vw, 280px)" }}
              >
                <div className="row-start-1 self-end px-1 py-3.5 text-center">
                  {showAbove && (
                    <ChainText title={item.title} text={item.text} />
                  )}
                </div>
                <div className="row-start-2 z-[2] justify-self-center self-center">
                  <span
                    aria-hidden
                    className="chain-pip"
                    style={{ ["--pip-delay" as string]: `${i * 0.55}s` }}
                  />
                </div>
                <div className="row-start-3 self-start px-1 py-3.5 text-center">
                  {!showAbove && (
                    <ChainText title={item.title} text={item.text} />
                  )}
                </div>
              </div>
            );
          })}
        </Reveal>
      ) : (
        <div className="track-row hidden sm:grid">
          {items.map((item, i) => {
            const Glyph = icons?.[i];
            return (
              <Reveal
                key={item.title}
                delay={200 + i * 180}
                className="track-node reveal-up"
              >
                {i < items.length - 1 && (
                  <span aria-hidden className="track-arrow" />
                )}
                {Glyph && (
                  <span aria-hidden className="track-icon">
                    <Glyph />
                  </span>
                )}
                <h3 className="track-title font-archivo mt-[18px] text-[clamp(18px,1.9vw,21px)] font-semibold">
                  <span className="track-num">{stepNumber(i)}</span>
                  {item.title}
                </h3>
                <p className="mt-[9px] max-w-[34ch] text-[clamp(13.5px,0.35vw+12.5px,16px)] leading-[1.58] text-muted-foreground">
                  {item.text}
                </p>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
