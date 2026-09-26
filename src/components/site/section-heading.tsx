import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { renderLines } from "@/lib/lines";
import { Reveal } from "./reveal";

/**
 * Le chapeau est OPTIONNEL, et c'est une décision de composition.
 *
 * Il y en avait un au-dessus de chaque section. Quatre petits libellés
 * consécutifs au-dessus de quatre titres donnent à une page le rythme d'un
 * gabarit rempli, et la plupart ne faisaient que redire le titre en plus
 * petit : « Nos systèmes » au-dessus de « Des systèmes IA construits autour
 * de vos métiers ».
 *
 * Règle : un chapeau ne se met que s'il dit quelque chose que le titre ne
 * dit pas. Sur la landing il n'en reste qu'un, sur le Constat, parce qu'il
 * annonce une liste de problèmes là où le titre, lui, fait un constat.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  subtitleNote,
  align = "center",
  className,
}: {
  eyebrow?: string;
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
      {eyebrow && (
        <span
          className={cn(
            "eyebrow inline-flex items-center gap-2.5 text-brand",
            centered ? "justify-center" : "",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          /* Sur téléphone le titre n'est plus bridé à 20ch et prend la
             même échelle que les autres titres de section, un cran sous le
             titre du hero qui reste le titre principal. Aucune coupe n'est écrite
             à la main ici, le texte se répartit tout seul. */
          "max-w-none text-[length:var(--fs-h2)] leading-[1.08] font-semibold sm:max-w-[26ch]",
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
            <span className="mt-2 block text-[length:var(--fs-small)] font-light tracking-[0.06em] text-brand">
              {subtitleNote}
            </span>
          )}
        </p>
      )}
    </Reveal>
  );
}
