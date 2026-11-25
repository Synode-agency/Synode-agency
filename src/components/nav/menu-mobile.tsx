"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "@/components/site/nav-link";
import { ROUTES, bookingHref, homePath, path, type Locale } from "@/lib/routes";
import { ctaLabel } from "@/content/cta";
import type { HeaderCopy } from "@/content";
import { cx } from "@/lib/cx";
import { ServiceVisual, lienService } from "./menu-service";
import { LangueMenu, piegeFocus } from "./menu-panel";
import s from "./menu-mobile.module.css";

/**
 * LE MENU DU BOUTON ☰ SUR TÉLÉPHONE, SYSTÈME « GROUPE B » (25/11/2026,
 * fiche d'Antonino), sous 768px.
 *
 * Un écran blanc plein écran glisse depuis la droite et défile seul ; le
 * bouton ☰, devenu croix, reste par-dessus. Dans l'ordre, en grands liens
 * centrés en hauteur : Accueil, Services, Réalisations, À propos et
 * Contact ; en bas, le bouton principal et la langue. « Services » est un
 * bouton : il déplie ses quatre cartes (repliées à chaque ouverture) et
 * les liens réduisent pour leur faire de la place (demande d'Antonino du
 * 25/11, comme sur ordinateur).
 *
 * Accessibilité : `dialog` modal, focus piégé (avec le bouton ☰ dans le
 * cycle) ; Échap, le retour du focus et le blocage du défilement sont gérés
 * par la barre (`SiteHeader`).
 */
export function MenuMobile({
  locale,
  copy,
  open,
  onClose,
  langues,
}: {
  locale: Locale;
  copy: HeaderCopy;
  open: boolean;
  onClose: () => void;
  langues: { fr: string; en: string };
}) {
  const { site } = copy;
  const boite = useRef<HTMLDivElement>(null);
  const idMenu = "menu-mobile";
  const idServices = "menu-mobile-services";
  const [servicesOuverts, setServicesOuverts] = useState(false);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => boite.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  /* Les cartes se replient une fois l'écran sorti (0,7s), pas pendant
     qu'il glisse : le menu suivant s'ouvre sans elles. */
  useEffect(() => {
    if (open) return;
    const id = window.setTimeout(() => setServicesOuverts(false), 700);
    return () => window.clearTimeout(id);
  }, [open]);

  const accueil = site.nav.find((item) => item.href === ROUTES.home);
  const services = site.nav.find((item) => item.href === ROUTES.services);
  const suite = [
    ...site.nav.filter((item) => item.href !== ROUTES.home && item.href !== ROUTES.services).map((item) => ({ href: path(locale, item.href), label: item.label })),
    { href: path(locale, ROUTES.contact), label: site.contactLabel },
  ];

  const grandLien = (href: string, label: string, i: number) => (
    <span key={href} className={s.ligne}>
      <NavLink href={href} locale={locale} onNavigate={onClose} className={s.grandLien} style={{ "--i": i } as CSSProperties}>
        {label}
      </NavLink>
    </span>
  );

  return (
    <div
      id={idMenu}
      ref={boite}
      role="dialog"
      aria-modal="true"
      aria-label={site.menuDialog}
      tabIndex={-1}
      inert={!open}
      className={cx(s.ecran, open && s.ouvert)}
      onKeyDown={(e) => piegeFocus(e, boite.current, idMenu)}
    >
      <nav className={s.liens} aria-label={site.navLabel}>
        {accueil ? grandLien(homePath(locale), accueil.label, 0) : null}
        {services ? (
          <span className={s.ligne}>
            <button
              type="button"
              className={cx(s.grandLien, s.deplier)}
              style={{ "--i": 1 } as CSSProperties}
              aria-expanded={servicesOuverts}
              aria-controls={idServices}
              onClick={() => setServicesOuverts((ouverts) => !ouverts)}
            >
              {services.label}
              <ChevronDown aria-hidden className={s.chevron} />
            </button>
          </span>
        ) : null}
        <div id={idServices} className={cx(s.services, servicesOuverts && s.servicesOuverts)} inert={!servicesOuverts}>
          <div className={s.servicesInterieur}>
            <div className={s.servicesListe}>
              {site.menuServices.map((service, j) => (
                <NavLink
                  key={service.key}
                  href={lienService(locale, service.key)}
                  locale={locale}
                  onNavigate={onClose}
                  className={s.service}
                  style={{ "--j": j } as CSSProperties}
                >
                  <ServiceVisual image={service.image} focus={service.focus} sizes="64px" className={s.serviceVisuel} />
                  <span className={s.serviceTexte}>
                    <span className={s.serviceTitre}>{service.title}</span>
                    <span className={s.serviceDescription}>{service.text}</span>
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        {suite.map((lien, k) => grandLien(lien.href, lien.label, 2 + k))}
      </nav>

      <div className={s.bas}>
        <NavLink href={bookingHref(locale)} locale={locale} onNavigate={onClose} className={s.reserver}>
          {ctaLabel[locale]} <span aria-hidden="true">→</span>
        </NavLink>
        <LangueMenu locale={locale} langues={langues} className={s.langue} autreClassName={s.langueAutre} />
      </div>
    </div>
  );
}
