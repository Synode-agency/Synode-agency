import { renderLines } from "@/lib/lines";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/* Staggered: the wrapper stops animating and each line carries its own
   entrance, 120ms apart and quicker than a full-block slide, so the four
   of them read as one movement. */
function Line({
  i,
  stagger,
  children,
}: {
  i: number;
  stagger: boolean;
  children: ReactNode;
}) {
  if (!stagger) return <>{children}</>;
  return (
    <Reveal delay={i * 120} className="page-hero-step reveal-left">
      {children}
    </Reveal>
  );
}

/**
 * Headline block shared by the standalone pages (Réalisations, Contact):
 * eyebrow, big title, lead paragraph, and an optional call to action.
 */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  body,
  action,
  align = "center",
  oneLine = false,
  stagger = false,
}: {
  eyebrow: string;
  title: string;
  /** Part of the title to set in brand blue. */
  titleAccent?: string;
  body: string;
  /** Optional call to action under the paragraph. */
  action?: ReactNode;
  align?: "left" | "center";
  /** Left alignment only: hold the headline on one line on wide screens and
      give the paragraph that same measure. Needs a full-width column. */
  oneLine?: boolean;
  /** Bring the block in line by line rather than in one piece. */
  stagger?: boolean;
}) {
  const centered = align === "center";

  const Frame = stagger ? "div" : Reveal;

  return (
    <Frame
      className={cn(
        "page-hero-copy flex flex-col gap-6",
        centered
          ? "mx-auto max-w-[62ch] items-center text-center"
          : cn(
              !stagger && "reveal-left",
              "max-w-4xl items-start text-left",
              oneLine && "page-hero-left",
            ),
      )}
    >
      <Line i={0} stagger={stagger}>
        <span className="eyebrow inline-flex items-center gap-2.5 text-brand">
          {eyebrow}
        </span>
      </Line>

      <Line i={1} stagger={stagger}>
        <h1
          className={cn(
          "page-hero-title text-[length:var(--fs-h2)] leading-[1.06] font-semibold",
            centered ? "max-w-[18ch]" : "max-w-none",
          )}
        >
        {renderLines(title, titleAccent ? [titleAccent] : [])}
        </h1>
      </Line>

      <Line i={2} stagger={stagger}>
        <p className="page-hero-body max-w-[62ch] text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted-foreground">
          {renderLines(body)}
        </p>
      </Line>

      {action && <Line i={3} stagger={stagger}>{action}</Line>}

    </Frame>
  );
}
