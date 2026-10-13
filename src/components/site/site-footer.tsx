import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { ROUTES, getContent, path, type Locale } from "@/lib/content";

/**
 * Le pied de page.
 *
 * C'est la dernière bande, et elle porte l'encre : après une page qui
 * alterne gris et blanc, un fond sombre la referme au lieu de la laisser
 * s'éteindre sur un blanc de plus.
 */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const year = new Date().getFullYear();

  const legal = [
    { href: ROUTES.legalNotice, label: locale === "fr" ? "Mentions légales" : "Legal notice" },
    { href: ROUTES.privacy, label: locale === "fr" ? "Confidentialité" : "Privacy" },
  ];

  return (
    <footer className="band band--white">
      <div className="col site-footer">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Wordmark variant="mark" />
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

          {/* ⚠ Ce bloc n'a plus ni titre ni lien « Contact » : le titre
              redisait le mot que la colonne de navigation porte déjà en
              dernière entrée, et le lien y menait deux fois. Il ne reste que
              ce qu'on ne trouve nulle part ailleurs, l'adresse et le lieu.
              Sur téléphone, la grille passe à une colonne et ce bloc tombe
              donc juste sous la navigation, à la suite de « Contact ». */}
          <div className="site-footer-col site-footer-col--contact">
            <a href={`mailto:${site.email}`} className="site-footer-link site-footer-mail">
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
