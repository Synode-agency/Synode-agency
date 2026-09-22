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

  /* The accent is copy, not a pattern: a "." in it would otherwise match any
     character and colour the wrong slice of the title. */
  const accentPattern = titleAccent?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const Frame = stagger ? "div" : Reveal;

  return (
    <Frame
      className={cn(
        "flex flex-col gap-6",
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
          <span className="h-px w-6 bg-brand/50" aria-hidden />
          {eyebrow}
        </span>
      </Line>

      <Line i={1} stagger={stagger}>
        <h1
          className={cn(
          "page-hero-title text-[2.4rem] leading-[1.05] font-semibold sm:text-[3.25rem] lg:text-[length:var(--fs-h2)]",
            centered ? "max-w-[18ch]" : "max-w-none",
          )}
        >
        {title
          .split(
            titleAccent
              ? new RegExp(`(${accentPattern}|\n)`)
              : /(\n)/,
          )
          .map((part, i) =>
            part === "\n" ? (
              <br key={i} />
            ) : part === titleAccent ? (
              <span key={i} className="text-brand">
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </h1>
      </Line>

      <Line i={2} stagger={stagger}>
        <p className="page-hero-body max-w-[62ch] whitespace-pre-line text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground">
          {body}
        </p>
      </Line>

      {action && <Line i={3} stagger={stagger}>{action}</Line>}

    </Frame>
  );
}
