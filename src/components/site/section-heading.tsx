import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  subtitleNote,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Secondary line under the subtitle: mono, smaller, brand blue. */
  subtitleNote?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        centered && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "eyebrow inline-flex items-center gap-2.5 text-brand",
          centered ? "justify-center" : "",
        )}
      >
        <span className="h-px w-6 bg-brand/50" aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "max-w-[20ch] text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl lg:text-[length:var(--fs-h2)]",
          centered && "max-w-[24ch]",
        )}
      >
        {title}
      </h2>
      {(subtitle || subtitleNote) && (
        <p
          className={cn(
            "max-w-xl text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground sm:whitespace-pre-line",
            centered && "mx-auto",
          )}
        >
          {subtitle}
          {subtitleNote && (
            <span className="mt-2 block font-mono text-[clamp(0.78rem,0.15vw+0.74rem,0.88rem)] tracking-[0.02em] text-brand">
              {subtitleNote}
            </span>
          )}
        </p>
      )}
    </Reveal>
  );
}
