import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lienService } from "@/components/nav/menu-service";
import type { Locale, SiteContent } from "@/content";
import s from "./services-grid.module.css";

type Services = SiteContent["home"]["services"];

/**
 * LES QUATRE SERVICES DE L'ACCUEIL, EN PHOTOS (25/11/2026, fiche
 * d'Antonino) : remplacent l'accordéon. Une grille de quatre liens, chacun
 * une photo (3:4 ; 4:3 en une colonne sur téléphone) avec, POSÉS DESSUS
 * (28/11/2026, maquette « C » choisie par Antonino, sur ordinateur comme
 * sur téléphone), le titre et la ligne courte du service, sur un voile
 * bleu nuit qui monte du bas, et une flèche dans un cercle en haut à
 * droite.
 *
 * Au survol, la photo visée s'agrandit doucement et les trois autres
 * s'atténuent ; tout revient quand la souris quitte la grille. Même chose
 * au clavier. En CSS seulement (`services-grid.module.css`) : aucun script.
 *
 * Le contenu est celui des cartes d'avant (`home.services.items`) : titre,
 * description, photo et cadrage (`focus`), lien vers le bloc du service sur
 * la page Services.
 */
export function ServicesGrid({ locale, services }: { locale: Locale; services: Services }) {
  return (
    /* Au défilement, les quatre cartes montent l'une après l'autre
       (`data-rv-groupe`, voir `scroll-reveal.tsx`). */
    <div className={s.grille} data-rv-groupe="bottom">
      {services.items.map((item, i) => (
        <Link key={item.key} href={lienService(locale, item.key)} className={s.carte}>
          <span className={s.photo}>
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 50vw, 320px"
              loading={i === 0 ? "eager" : "lazy"}
              style={{ objectPosition: item.focus }}
            />
            <span className={s.rond} aria-hidden="true">
              <ArrowRight />
            </span>
            <span className={s.legende}>
              <span className={s.titre}>{item.title}</span>
              <span className={s.texte}>{item.text}</span>
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
