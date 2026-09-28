import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { getContent, type Locale } from "@/lib/content";

/**
 * L'enveloppe de toutes les pages.
 *
 * Elle ne fait qu'une chose : poser la pile. `.deck` est la colonne de
 * panneaux, et chaque page se contente d'y déposer ses `<Panel>`. Le pied de
 * page est le dernier panneau de la pile, il n'est pas traité à part : c'est
 * ce qui évite la couture habituelle entre « le site » et « le footer ».
 *
 * Le lien d'évitement est le premier élément focalisable du document.
 * Quelqu'un au clavier ne doit pas traverser cinq entrées de navigation à
 * chaque page pour atteindre le contenu.
 */
export function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { site } = getContent(locale);

  return (
    <>
      <a href="#contenu" className="skip">
        {site.skip}
      </a>
      <SiteHeader locale={locale} />
      {/* Une seule pile pour le contenu et le pied de page : ils partagent
          la même gouttière et le même écart entre panneaux. */}
      <div className="deck">
        <main id="contenu" className="deck deck--flush">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </>
  );
}

const TONES = {
  plain: "",
  ink: "panel--ink",
  brand: "panel--brand",
  quiet: "panel--quiet",
} as const;

/**
 * Un panneau de section.
 *
 * Toutes les pages passent par là plutôt que d'écrire les classes à la
 * main : le jour où le rembourrage, le rayon ou l'ombre changent, ils
 * changent partout en même temps.
 *
 * `tone` n'a que quatre valeurs, et deux d'entre elles — `ink` et `brand` —
 * ne doivent apparaître qu'UNE FOIS par page. Une page où trois panneaux
 * sont colorés n'a plus de point d'appui, et la couleur cesse de signifier
 * quoi que ce soit.
 */
export function Panel({
  id,
  tone = "plain",
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
    <section id={id} className={["panel", TONES[tone], className].filter(Boolean).join(" ")}>
      <div className={["col", "panel-body", bodyClassName].filter(Boolean).join(" ")}>
        {children}
      </div>
    </section>
  );
}
