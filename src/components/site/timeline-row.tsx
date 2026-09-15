import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

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

/**
 * Numbered nodes for the Constat ("chain") and Méthode ("track") sections.
 * Chain: dots rest dashed/muted, light up (solid brand ring + glow) only
 * while their whole cell is hovered; title + text alternate above/below the
 * dot, each centered on it.
 * Track: dots rest solid brand (all four alike), light up the same way on
 * hover; text sits below every node, linked by a slow-pulsing gradient line.
 */
export function TimelineRow({
  items,
  variant,
  className,
}: {
  items: readonly TimelineItem[];
  variant: "chain" | "track";
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Mobile: simple stacked list */}
      <div className="flex flex-col gap-4 sm:hidden">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 70}
            className="flex items-start gap-4 rounded-2xl border border-hairline bg-surface p-5 text-left"
          >
            <span
              className={cn(
                "tnum shrink-0",
                variant === "chain" ? "chain-dot" : "track-dot",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[0.95rem] font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[0.83rem] leading-[1.6] text-muted-foreground">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Desktop */}
      {variant === "chain" ? (
        <Reveal
          className="hidden sm:grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
          }}
        >
          {items.map((item, i) => {
            const showAbove = i % 2 === 0;
            return (
              <div
                key={item.title}
                className="chain-node relative grid grid-rows-[1fr_auto_1fr] px-1.5"
                style={{ minHeight: "clamp(230px, 24vw, 280px)" }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed"
                  style={{ borderColor: "rgba(233, 240, 248, 0.16)" }}
                />
                <div className="row-start-1 self-end px-1 py-3.5 text-center">
                  {showAbove && (
                    <ChainText title={item.title} text={item.text} />
                  )}
                </div>
                <div className="row-start-2 z-[2] justify-self-center self-center">
                  <span className="chain-dot tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
        <Reveal
          className="hidden sm:grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 178px), 1fr))",
            rowGap: "clamp(20px, 2.4vw, 34px)",
            columnGap: 0,
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              className="track-node relative px-[clamp(10px,1.2vw,17px)] text-center"
            >
              <span aria-hidden className="track-link" />
              <span className="track-dot tnum mx-auto">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-archivo mt-[18px] text-[clamp(18px,1.9vw,21px)] font-semibold">
                {item.title}
              </h3>
              <p className="mx-auto mt-[9px] max-w-[34ch] text-[clamp(13.5px,0.35vw+12.5px,16px)] leading-[1.58] text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </Reveal>
      )}
    </div>
  );
}
