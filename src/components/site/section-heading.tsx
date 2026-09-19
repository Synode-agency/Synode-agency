import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Section heading.
 *
 * The eyebrows in `content.ts` are written "02 / Notre offre". We split that
 * apart and set the index as a small blue number above a rule, magazine
 * style — one recurring, quiet ornament instead of a glowing pill.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  subtitleNote,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Secondary line under the subtitle, smaller and in brand blue. */
  subtitleNote?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  const [index, label] = eyebrow.includes("/")
    ? eyebrow.split("/").map((part) => part.trim())
    : [null, eyebrow];

  return (
    <Reveal
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full items-baseline gap-3 border-b border-hairline pb-3",
          centered && "justify-center",
        )}
      >
        {index && <span className="section-index">{index}</span>}
        <span className="eyebrow">{label}</span>
      </div>

      <h2
        className={cn(
          "mt-[calc(var(--ss)*clamp(1.25rem,1rem+1vw,2rem))] max-w-[18ch] text-[length:var(--fs-h2)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance",
          centered && "max-w-[20ch]",
        )}
      >
        {title}
      </h2>

      {(subtitle || subtitleNote) && (
        <p
          className={cn(
            "mt-[calc(var(--ss)*clamp(0.9rem,0.75rem+0.6vw,1.4rem))] max-w-[52ch] text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground sm:whitespace-pre-line",
            centered && "mx-auto",
          )}
        >
          {subtitle}
          {subtitleNote && (
            <span className="mt-1.5 block text-[length:var(--fs-small)] font-medium text-brand">
              {subtitleNote}
            </span>
          )}
        </p>
      )}
    </Reveal>
  );
}
