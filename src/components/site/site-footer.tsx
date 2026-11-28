import Link from "next/link";
import { NavLink } from "./nav-link";
import { CurrentYear } from "./current-year";
import { LogoSynode } from "./logo-synode";
import { ROUTES, path, type Locale } from "@/lib/routes";
import type { SiteContent } from "@/content/types";
import { organizationProfiles } from "@/lib/organization";
import s from "./site-footer.module.css";

/* La page LinkedIn de Synode : un lien visible, et pas seulement dans les
   données structurées. Google relie le site à l'entité par ces liens
   réciproques, et un acheteur y vérifie qui est derrière le site. */
const linkedin = organizationProfiles.find((u) => u.includes("linkedin.com"));

/**
 * LE PIED DE PAGE (brief de la refonte, 4.3), disposé comme celui du site
 * en production (25/11/2026, demande d'Antonino) : trois colonnes.
 *  - la marque : le logo, puis les quatre métiers ;
 *  - la navigation : un petit titre bleu et les liens l'un sous l'autre
 *    (les trois pages du menu et Contact) ;
 *  - le contact : l'adresse, LinkedIn et la ville.
 * Puis le copyright et les deux pages légales. Sur téléphone, une seule
 * colonne, le contact juste sous « Contact ».
 *
 * La mention de l'entité contractante (Productions Associées ASBL) n'y est
 * pas : le brief la laisse « à vérifier », elle reste donc dans les mentions
 * légales tant qu'Antonino n'a pas tranché.
 *
 * `site` est passé par la page (`Shell`) au lieu d'être lu ici dans tout le
 * contenu (28/11/2026) : la page d'erreur, un composant client, affiche
 * aussi ce pied de page, et lire l'index des contenus y aurait tiré tout le
 * texte du site dans le JavaScript de chaque page.
 */
export function SiteFooter({ locale, site }: { locale: Locale; site: SiteContent["site"] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="band band--white">
      <div className={`col ${s.footer}`}>
        <div className={s.top}>
          {/* Chaque bloc du pied de page monte à son arrivée, l'un après
              l'autre (`ScrollReveal`, 26/11/2026, demande d'Antonino). */}
          <div className={s.brand} data-rv-bloc="bottom">
            {/* Le logo recomposé, lettres et N en noir (26/11/2026,
                demande d'Antonino), comme son fichier « bleu-noir ». */}
            <LogoSynode className={s.logo} />
            <p className={s.tagline}>{site.footerTagline}</p>
          </div>

          <nav aria-labelledby="pied-navigation" className={s.col} data-rv-bloc="bottom">
            <h2 id="pied-navigation" className={s.title}>
              {site.footerNavLabel}
            </h2>
            {site.footerNav.map((item) => (
              <NavLink key={item.href} href={path(locale, item.href)} locale={locale} className={s.link} markCurrent>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={`${s.col} ${s.contact}`} data-rv-bloc="bottom">
            <a href={`mailto:${site.email}`} className={`${s.link} ${s.mail}`}>
              {site.email}
            </a>
            {linkedin && (
              <a href={linkedin} className={s.link} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            <span className={s.place}>{site.location}</span>
          </div>
        </div>

        <div className={s.bottom} data-rv-bloc="bottom">
          <span>
            © <CurrentYear buildYear={year} /> {site.copyright}
          </span>
          <nav aria-label={site.legalLabel} className={s.legal}>
            <Link href={path(locale, ROUTES.legalNotice)} className={s.legalLink}>
              {site.legalLinks.notice}
            </Link>
            <Link href={path(locale, ROUTES.privacy)} className={s.legalLink}>
              {site.legalLinks.privacy}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
