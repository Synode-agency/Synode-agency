import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Section heading.
 *
 * No label or tag above the title: we-are.be introduces every section with
 * the headline alone and lets size carry the hierarchy. The `eyebrow` prop
 * stays in the signature because the copy still holds those strings, and it
 * is used as the accessible name of the section.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  subtitleNote,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Secondary line under the subtitle, smaller and in brand blue. */
  subtitleNote?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      aria-label={eyebrow}
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "max-w-[18ch] text-[length:var(--fs-h2)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance",
          centered && "max-w-[20ch]",
        )}
      >
        {title}
      </h2>

      {(subtitle || subtitleNote) && (
        <p
          className={cn(
            "mt-[clamp(0.9rem,0.75rem+0.6vw,1.4rem)] max-w-[52ch] text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground sm:whitespace-pre-line",
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
