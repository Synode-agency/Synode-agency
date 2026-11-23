import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand lockup.
 *
 * `variant="plate"` (default) uses the full logo, the rounded square plate
 * with the S on it. `variant="mark"` uses the S cut out of that plate, with
 * no square and no background: that is what the navbar shows, so the header
 * stays light while the hero and footer keep the full logo.
 *
 * `variant="type"` ne pose QUE le lettrage, sans aucun pictogramme. Il sert
 * là où la marque est posée sur un aplat de couleur : la plaque y apparaît
 * comme une vignette sombre collée sur le fond, et le pictogramme détouré y
 * perd son contraste. Le lettrage seul, lui, est déjà blanc.
 */
export function Wordmark({
  className,
  withText = true,
  variant = "plate",
}: {
  className?: string;
  withText?: boolean;
  variant?: "plate" | "mark" | "type";
}) {
  const isMark = variant === "mark";
  const typeOnly = variant === "type";

  return (
    <span className={cn("inline-flex shrink-0 items-center", isMark ? "gap-2.5" : "gap-3", className)}>
      {!typeOnly && (
      <Image
        src={isMark ? "/synode-mark.png" : "/synode-logo.png"}
        alt={withText ? "" : "Synode"}
        /* These are the rendered size, not the file's own dimensions: Next
           builds its srcset from them. The mark shows at 40px, so 80 covers
           a 2x screen. Passing the source's 1254 would make it ship a
           1920px-wide image for a logo in the navbar. */
        width={isMark ? 80 : 112}
        height={isMark ? 80 : 112}
        loading="eager"
        className={cn(
          "wordmark-part shrink-0",
          isMark ? "size-10 object-contain" : "size-12 rounded-[22%]",
        )}
      />
      )}
      {withText && (
        <Image
          src="/synode-wordmark.png"
          alt="Synode"
          /* La taille affichée (1,9rem de haut), dans les proportions du
             fichier (822 × 232) : avec 822, Next envoyait une image de 822px
             pour un mot de 106px (K16). `loading="eager"` remplace `priority`,
             déprécié en Next 16 : le logo est en haut, sans être l'élément
             principal de la page. */
          width={106}
          height={30}
          loading="eager"
          className="wordmark-part wordmark-type h-[1.9rem] w-auto shrink-0"
        />
      )}
    </span>
  );
}
