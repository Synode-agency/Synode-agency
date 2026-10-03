import type { ReactNode } from "react";
import { renderLines } from "@/lib/lines";

/**
 * L'en-tête d'une section : un chapeau optionnel, un titre, un texte.
 *
 * Le chapeau est OPTIONNEL, et c'est une décision de composition. En mettre
 * un au-dessus de chaque section donne à la page le rythme d'un gabarit
 * rempli, et la plupart ne font que redire le titre en plus petit. Règle
 * tenue sur tout le site : un chapeau ne se met que s'il dit quelque chose
 * que le titre ne dit pas.
 *
 * `as` permet de descendre en `h3` quand la section est déjà sous un `h2` :
 * le plan de titres d'une page doit rester lisible sans les styles.
 */
export function Lede({
  kicker,
  title,
  accents,
  text,
  align = "left",
  as: Tag = "h2",
  children,
}: {
  kicker?: string;
  title: string;
  /** Les mots du titre peints en bleu. `renderLines` les repère dans la
   *  chaîne, donc le texte reste d'un seul tenant pour un lecteur d'écran
   *  comme pour un moteur de recherche. */
  accents?: string[];
  text?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
}) {
  return (
    <div className={align === "center" ? "lede lede--center" : "lede"}>
      {kicker && <span className="lede-kicker">{kicker}</span>}
      <Tag className="lede-title">{renderLines(title, accents, "title-accent")}</Tag>
      {text && <p className="lede-text">{text}</p>}
      {children}
    </div>
  );
}
