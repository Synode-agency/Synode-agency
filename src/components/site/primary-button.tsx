import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bookingHref, type Locale } from "@/lib/routes";
import { ctaLabel } from "@/content/cta";
import { cx } from "@/lib/cx";

/**
 * LE BOUTON PLEIN DU SITE, et le seul (brief de la refonte, règle 1).
 *
 * Sans `href` ni libellé, c'est l'appel unique : « Réserver un appel de
 * 30 min », vers le calendrier de la page Contact. Tout autre lien d'une
 * page est un lien texte, jamais un second bouton plein.
 *
 * Il ne tire que le libellé du bouton (`@/content/cta`), pas les textes du
 * site : la barre et le menu de téléphone, qui sont des composants
 * interactifs, peuvent donc s'en servir sans alourdir chaque page (K9).
 */
export function PrimaryButton({
  locale,
  href,
  children,
  className,
  onClick,
  icon = true,
}: {
  locale: Locale;
  href?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  /** La flèche après le libellé. Le hero de l'accueil s'en passe. */
  icon?: boolean;
}) {
  return (
    <Link href={href ?? bookingHref(locale)} className={cx("btn btn--primary", className)} onClick={onClick}>
      {children ?? ctaLabel[locale]}
      {icon && <ArrowRight aria-hidden />}
    </Link>
  );
}
