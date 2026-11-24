import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { CurrentYear } from "./current-year";
import { ROUTES, getContent, path, type Locale } from "@/content";
import { organizationProfiles } from "@/lib/organization";
import s from "./site-footer.module.css";

/* La page LinkedIn de Synode : un lien visible, et pas seulement dans les
   données structurées. Google relie le site à l'entité par ces liens
   réciproques, et un acheteur y vérifie qui est derrière le site. */
const linkedin = organizationProfiles.find((u) => u.includes("linkedin.com"));

/**
 * LE PIED DE PAGE (brief de la refonte, 4.3).
 *
 * Court, inspiré de Craftzing : le logo et une phrase, UNE ligne de liens
 * (les trois pages du menu et Contact), l'adresse et LinkedIn, puis le
 * copyright et les deux pages légales.
 *
 * La mention de l'entité contractante (Productions Associées ASBL) n'y est
 * pas : le brief la laisse « à vérifier », elle reste donc dans les mentions
 * légales tant qu'Antonino n'a pas tranché.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="band band--white">
      <div className={`col ${s.footer}`}>
        <div className={s.top}>
          <div className={s.brand}>
            <Wordmark variant="mark" />
            <p className={s.tagline}>{site.footerTagline}</p>
          </div>

          <div className={s.links}>
            <nav aria-label={site.navLabel} className={s.nav}>
              {site.footerNav.map((item) => (
                <NavLink key={item.href} href={path(locale, item.href)} locale={locale} className={s.link} markCurrent>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className={s.contact}>
              <a href={`mailto:${site.email}`} className={s.mail}>
                {site.email}
              </a>
              {linkedin && (
                <a href={linkedin} className={s.link} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={s.bottom}>
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
