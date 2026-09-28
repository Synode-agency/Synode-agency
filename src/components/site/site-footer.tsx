import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { ROUTES, getContent, path, type Locale } from "@/lib/content";

/**
 * Le pied de page.
 *
 * C'est le dernier panneau de la pile, et il porte l'encre : après une
 * colonne de cartes blanches, une carte sombre referme la page au lieu de
 * la laisser s'éteindre sur un blanc de plus.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const year = new Date().getFullYear();

  const legal = [
    { href: ROUTES.legalNotice, label: locale === "fr" ? "Mentions légales" : "Legal notice" },
    { href: ROUTES.privacy, label: locale === "fr" ? "Confidentialité" : "Privacy" },
  ];

  return (
    <footer className="panel panel--ink">
      <div className="col panel-body site-footer">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Wordmark variant="type" />
            <p className="site-footer-tagline">{site.tagline}</p>
          </div>

          <nav aria-label={site.footerNav} className="site-footer-col">
            <h2 className="site-footer-title">{site.footerNav}</h2>
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                href={path(locale, item.href)}
                locale={locale}
                className="site-footer-link"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-footer-col">
            <h2 className="site-footer-title">{site.footerContact}</h2>
            <NavLink href={path(locale, ROUTES.contact)} locale={locale} className="site-footer-link">
              Contact
            </NavLink>
            <a href={`mailto:${site.email}`} className="site-footer-link">
              {site.email}
            </a>
            <span className="site-footer-place">{site.location}</span>
          </div>
        </div>

        <div className="site-footer-bottom">
          <span>
            © {year} {site.copyright}
          </span>
          <nav aria-label={site.footerLegal} className="site-footer-legal">
            {legal.map((l) => (
              <Link key={l.href} href={path(locale, l.href)} className="site-footer-link">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
