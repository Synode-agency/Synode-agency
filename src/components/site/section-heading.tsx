import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { renderLines } from "@/lib/lines";
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
  title: ReactNode;
  subtitle?: ReactNode;
  /** Secondary line under the subtitle: mono, smaller, brand blue. */
  subtitleNote?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "section-heading flex flex-col gap-6",
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
        {eyebrow}
      </span>
      <h2
        className={cn(
          /* Sur téléphone le titre n'est plus bridé à 20ch et prend la
             même échelle que les autres titres de section, un cran sous le
             titre du hero qui reste le titre principal. Aucune coupe n'est écrite
             à la main ici, le texte se répartit tout seul. */
          "max-w-none text-[clamp(1.05rem,6.4vw,2.5rem)] leading-[1.08] font-semibold sm:max-w-[20ch] sm:text-4xl lg:text-[length:var(--fs-h2)]",
          centered && "sm:max-w-[24ch]",
        )}
      >
        {title}
      </h2>
      {(subtitle || subtitleNote) && (
        <p
          className={cn(
            "max-w-xl text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted-foreground",
            centered && "mx-auto",
          )}
        >
          {/* Les retours du chapeau passent par les marqueurs de
              `renderLines` : `pre-line` ne savait couper qu'à toutes
              les largeurs ou à aucune. */}
          {typeof subtitle === "string" ? renderLines(subtitle) : subtitle}
          {subtitleNote && (
            <span className="mt-2 block text-[clamp(0.78rem,0.15vw+0.74rem,0.88rem)] font-light tracking-[0.06em] text-brand">
              {subtitleNote}
            </span>
          )}
        </p>
      )}
    </Reveal>
  );
}
