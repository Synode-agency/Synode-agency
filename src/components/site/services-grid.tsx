import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lienService } from "@/components/nav/menu-service";
import type { Locale, SiteContent } from "@/content";
import s from "./services-grid.module.css";

type Services = SiteContent["home"]["services"];
type Detail = SiteContent["services"]["items"][number];

/**
 * LES QUATRE SERVICES DE L'ACCUEIL (28/11/2026, demandes d'Antonino).
 *
 * Une carte par service, la photo en fond, aux coins arrondis. Toute la carte est un lien vers le bloc du service sur la page
 * Services.
 *
 * Sur ordinateur, LES QUATRE CARTES SUR UNE LIGNE (deux par ligne entre
 * 1025 et 1399px). Au repos, chaque carte montre son titre et sa ligne
 * courte, en bas à gauche. Au survol, la photo s'assombrit et se retire
 * dans un fin cadre, et ils MONTENT : en dessous se déplient les livrables
 * du service, ceux de la page Services (`services.items`, reliés par
 * `key`), et le bouton « Découvrir ce service ». LES LIVRABLES, PAS LA
 * PHRASE (28/11/2026) : sur l'accueil, on survole ; des offres concrètes
 * se reconnaissent d'un coup d'œil. La phrase est dans le menu
 * « Services » de la barre. Au clavier, la carte qui a le focus se déplie de même ; sur un
 * écran tactile, tout reste déplié.
 *
 * Sur tablette et téléphone, LA PILE : chaque carte reste un instant en
 * haut de l'écran (`sticky`) et la suivante vient se poser dessus ; la
 * carte garde le titre et la ligne courte, en bas à gauche, et la flèche
 * dans un cercle, en haut à droite.
 *
 * Pas d'apparition au défilement (`data-rv-fixe`).
 */
export function ServicesGrid({
  locale,
  services,
  details,
  bouton,
}: {
  locale: Locale;
  services: Services;
  details: readonly Detail[];
  bouton: string;
}) {
  return (
    <ol className={s.pile} data-rv-fixe="">
      {services.items.map((item, i) => {
        const detail = details.find((d) => d.key === item.key);
        return (
          <li key={item.key} className={s.place} style={{ "--i": i } as CSSProperties}>
            <Link href={lienService(locale, item.key)} className={s.carte}>
              <Image
                className={s.image}
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 1023px) 92vw, (max-width: 1399px) 46vw, 380px"
                loading={i === 0 ? "eager" : "lazy"}
                style={{ objectPosition: item.focus }}
              />
              <span className={s.voile} aria-hidden="true" />
              <span className={s.rond} aria-hidden="true">
                <ArrowRight />
              </span>
              {/* Le bloc des textes, posé en bas : le titre et la ligne
                  courte, puis (sur ordinateur) ce qui se déplie au survol. */}
              <div className={s.contenu}>
                <span className={s.legende}>
                  <span className={s.titre}>{item.title}</span>
                  <span className={s.texte}>{item.text}</span>
                </span>
                {detail ? (
                  <div className={s.depli}>
                    <div className={s.depliInterieur}>
                      <ul className={s.livrables}>
                        {detail.deliverables.map((livrable) => (
                          <li key={livrable}>{livrable}</li>
                        ))}
                      </ul>
                      <span className={s.bouton}>
                        {bouton}
                        <ArrowRight aria-hidden />
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
