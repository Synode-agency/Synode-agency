import type { ReactNode } from "react";
import Image from "next/image";
import { serviceHref, type Locale, type ServiceKey } from "@/lib/routes";
import s from "./menu-service.module.css";

/**
 * LE VISUEL D'UN SERVICE DANS LES MENUS, le même dans les trois (méga-menu
 * « Services », menu plein écran d'ordinateur et de téléphone) : seule sa
 * taille change, donnée par la classe que chaque menu lui passe.
 *
 * C'est la PHOTO du service (25/11/2026, demande d'Antonino : « les photos
 * directement dans les cards », au format vertical des cartes de
 * l'accueil), recadrée sur son sujet (`focus`), sur un fond bleu nuit le
 * temps qu'elle arrive. Décorative : le titre, à côté, dit déjà tout.
 */
export function ServiceVisual({
  image,
  focus,
  sizes,
  className,
  children,
}: {
  image: string;
  focus: string;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={className ? `${s.visuel} ${className}` : s.visuel} aria-hidden="true">
      <Image src={image} alt="" fill sizes={sizes} className={s.image} style={{ objectPosition: focus }} />
      {children}
    </span>
  );
}

/** Où mène un service : son bloc de la page Services (les quatre en ont un
 *  depuis le 25/11/2026). */
export function lienService(locale: Locale, key: string) {
  return serviceHref(locale, key as ServiceKey);
}
