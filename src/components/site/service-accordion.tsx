"use client";

import { useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { serviceHref, type Locale, type SiteContent } from "@/content";

type Services = SiteContent["home"]["services"];

/**
 * « CE QUE NOUS FAISONS » : L'ACCORDÉON DES QUATRE SERVICES (24/11/2026,
 * d'après la fiche d'Antonino), sous le titre et la phrase de la section,
 * qui ne changent pas.
 *
 * Quatre panneaux côte à côte ; le panneau ouvert s'élargit et montre son
 * fond, sa description et « En savoir plus », les autres se resserrent.
 * Sous 1000px de large (requête de conteneur dans `refonte.css`), ils
 * s'empilent et le panneau ouvert prend plus de hauteur.
 *
 * Le fond du panneau ouvert : celui des cartes essayées le 24/11/2026,
 * bleu nuit avec une lueur bleue en haut à droite et une trame de points
 * en bas à droite (`svc-acc-fond`). Avec une photo (`image`), la photo et
 * son voile le remplacent.
 *
 * Rien ne bouge tout seul : pas de minuteur, pas de défilement
 * automatique. Le panneau 01 est ouvert au chargement ; ensuite, seul le
 * survol de la souris ou le focus du clavier en ouvre un autre, et le
 * dernier ouvert le reste quand la souris quitte la rangée.
 *
 * Au toucher (pas de survol) : toucher un panneau fermé l'ouvre sans
 * suivre le lien ; toucher le panneau ouvert suit le lien. Le même clic
 * vaut pour la souris (le survol a déjà ouvert le panneau) et pour le
 * clavier (le focus l'a ouvert, Entrée suit le lien).
 *
 * Chaque panneau est un lien vers le bloc de son service sur la page
 * Services, ou vers « # » s'il n'en a pas (sites web et applications
 * mobiles).
 */
export function ServiceAccordion({ locale, services }: { locale: Locale; services: Services }) {
  const [actif, setActif] = useState(0);

  return (
    <div className="svc-acc">
      <div className="svc-acc-row">
        {services.items.map((item, i) => {
          const ouvert = i === actif;
          const href = item.key === "web" ? "#" : serviceHref(locale, item.key);
          return (
            <Link
              key={item.key}
              href={href}
              className={ouvert ? "svc-acc-panel is-active" : "svc-acc-panel"}
              /* Le panneau ouvert est sombre sur un fond de panneau clair :
                 la barre de navigation doit le savoir quand il passe sous
                 elle. */
              data-tone={ouvert ? "dark" : undefined}
              /* Le survol : la souris (ou le stylet) seulement. Au toucher,
                 le navigateur simule aussi un survol, qui ouvrirait le
                 panneau juste avant le clic et ferait suivre le lien. */
              onPointerEnter={(e: PointerEvent<HTMLAnchorElement>) => {
                if (e.pointerType !== "touch") setActif(i);
              }}
              /* Le focus du clavier seulement (`:focus-visible`) : un
                 toucher donne aussi le focus au lien, juste avant le clic. */
              onFocus={(e: FocusEvent<HTMLAnchorElement>) => {
                if (e.currentTarget.matches(":focus-visible")) setActif(i);
              }}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                if (!ouvert) {
                  e.preventDefault();
                  setActif(i);
                }
              }}
            >
              {item.image ? (
                <>
                  <Image
                    className="svc-acc-media"
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 999px) 100vw, 60vw"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <span className="svc-acc-veil" aria-hidden="true" />
                </>
              ) : (
                <span className="svc-acc-media svc-acc-fond" aria-hidden="true">
                  <span className="svc-acc-fond-nuit" />
                  <span className="svc-acc-fond-lueur" />
                  <span className="svc-acc-fond-points" />
                </span>
              )}
              <span className="svc-acc-body">
                <h3 className="svc-acc-title">{item.title}</h3>
                {/* La description et le lien, dépliés sur le panneau ouvert
                    seulement (grille de 0fr à 1fr). */}
                <span className="svc-acc-more">
                  <span className="svc-acc-more-inner">
                    <p className="svc-acc-text">{item.text}</p>
                    <span className="svc-acc-link">
                      {services.more} <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
