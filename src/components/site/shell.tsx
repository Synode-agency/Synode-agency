import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { getContent, type Locale } from "@/lib/content";
import { SITE_THEME } from "@/lib/site-theme";

/**
 * L'enveloppe de toutes les pages.
 *
 * Une page Synode est une SUITE DE BANDES pleine largeur. C'est le
 * changement de fond, et non un cadre, qui sépare deux sections. Deux
 * exceptions seulement, le hero et le CTA final, qui sont des cartes
 * encartées : la page s'ouvre et se referme sur un objet posé, et se lit à
 * plat entre les deux.
 *
 * Le lien d'évitement est le premier élément focalisable du document :
 * quelqu'un au clavier ne doit pas traverser cinq entrées de navigation à
 * chaque page pour atteindre le contenu.
 */
export function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { site } = getContent(locale);

  return (
    // A single DOM root lets Next target the page rather than a fragment sibling.
    <div className={`site-page site-theme-${SITE_THEME}`}>
      <a href="#contenu" className="skip">
        {site.skip}
      </a>
      <SiteHeader locale={locale} />
      <main id="contenu">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}

const TONES = {
  base: "band--base",
  white: "band--white",
  blue: "band--blue",
  ink: "band--ink",
} as const;

/**
 * Une bande de section : pleine largeur, pas de cadre, pas d'arrondi.
 *
 * `tone` porte tout le découpage de la page. Deux règles pour s'en servir :
 *
 *  - deux bandes voisines ne portent jamais le même fond, sinon elles n'en
 *    font qu'une ; le CSS pose un filet de secours si cela arrive ;
 *  - `blue` et `ink` sont des accents. Une page qui en compte trois n'a plus
 *    de point d'appui, et la couleur cesse de vouloir dire quelque chose.
 */
export function Band({
  id,
  tone = "base",
  className,
  bodyClassName,
  children,
}: {
  id?: string;
  tone?: keyof typeof TONES;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={["band", TONES[tone], className].filter(Boolean).join(" ")}>
      <div className={["col", bodyClassName].filter(Boolean).join(" ")}>{children}</div>
    </section>
  );
}

/**
 * Une carte encartée. Réservée au hero et au CTA final.
 *
 * Si vous hésitez à l'utiliser pour une troisième section, c'est une bande
 * qu'il faut : l'arrondi ne signifie quelque chose que parce qu'il est rare.
 */
export function CardPanel({
  id,
  variant,
  className,
  shellClassName,
  children,
}: {
  id?: string;
  variant?: "hero" | "blue";
  className?: string;
  /** Le fond de la SECTION qui porte la carte, quand la page en veut un
   *  explicite : `cta-shell--tint`. Sans lui, la carte est posée sur le fond
   *  courant de la page. */
  shellClassName?: string;
  children: ReactNode;
}) {
  const v = variant === "hero" ? "card-panel--hero" : variant === "blue" ? "card-panel--blue" : "";
  return (
    <div className={["card-shell", shellClassName].filter(Boolean).join(" ")}>
      <section id={id} className={["card-panel", v, className].filter(Boolean).join(" ")}>
        {children}
      </section>
    </div>
  );
}
