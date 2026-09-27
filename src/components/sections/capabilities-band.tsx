import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { renderLines } from "@/lib/lines";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Les briques, sur la landing.
 *
 * Elle montre la profondeur technique sans redevenir un catalogue : huit
 * familles, une phrase chacune, et aucun prix ni bouton d'achat. C'est une
 * fiche technique, pas une gamme.
 *
 * La différence avec la section des systèmes se lit dans la forme avant de
 * se lire dans les mots : les systèmes sont des cartes qu'on clique, les
 * briques sont une grille dense sur un seul filet. Ce qui se vend a des
 * cartes ; ce qui compose n'en a pas.
 *
 * Deux familles n'ont encore aucune prestation documentée, Computer Use et
 * la gouvernance. Elles sont quand même listées, parce qu'elles font partie
 * de ce que Synode construit, mais elles ne mènent nulle part tant qu'il n'y
 * a rien à lire au bout.
 */
export function CapabilitiesBand({ locale }: { locale: Locale }) {
  const { capabilities } = getContent(locale);

  return (
    <section id="capacites" className="section-screen relative">
      <div className="container-page">
        <SectionHeading
          title={renderLines(capabilities.title)}
          subtitle={capabilities.body}
          align="left"
          className="reveal-left"
        />

        <Reveal delay={100} className="caps-band reveal-up">
          <ul className="caps-band-list">
            {capabilities.groups.map((group) => (
              <li key={group.slug} className="caps-band-item">
                <h3 className="caps-band-title">{group.title}</h3>
                <p className="caps-band-text">{group.lead}</p>
                {/* Le compte ne s'affiche que s'il y a quelque chose à
                    compter : deux familles n'ont pas encore de prestation
                    documentée, et « 0 capacité » serait pire que rien.
                    Le singulier n'est pas un détail, il s'affichait
                    « 1 capacités » sur deux des huit familles. */}
                {group.items.length > 0 && (
                  <span className="caps-band-count">
                    {group.items.length}{" "}
                    {group.items.length === 1
                      ? capabilities.countLabelOne
                      : capabilities.countLabel}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <Link href={path(locale, "/expertise")} className="caps-band-more">
            {capabilities.allLabel}
            <ArrowRight aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
