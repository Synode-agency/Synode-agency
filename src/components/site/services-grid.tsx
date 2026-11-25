import Image from "next/image";
import Link from "next/link";
import { lienService } from "@/components/nav/menu-service";
import type { Locale, SiteContent } from "@/content";
import s from "./services-grid.module.css";

type Services = SiteContent["home"]["services"];

/**
 * LES QUATRE SERVICES DE L'ACCUEIL, EN PHOTOS (25/11/2026, fiche
 * d'Antonino) : remplacent l'accordéon. Une grille de quatre liens, chacun
 * une photo (3:4) puis son titre et sa description, sans fond de carte,
 * sans bordure ni ombre.
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
              sizes="(max-width: 1023px) 50vw, 320px"
              loading={i === 0 ? "eager" : "lazy"}
              style={{ objectPosition: item.focus }}
            />
          </span>
          <span className={s.titre}>{item.title}</span>
          <span className={s.texte}>{item.text}</span>
        </Link>
      ))}
    </div>
  );
}
