"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { NavLink } from "@/components/site/nav-link";
import { PrimaryButton } from "@/components/site/primary-button";
import { ROUTES, path, serviceHref, type Locale } from "@/lib/routes";
import type { HeaderCopy } from "@/content";
import s from "./mobile-menu.module.css";

/**
 * LE MENU DE TÉLÉPHONE.
 *
 * Le panneau qui s'ouvre avec le bouton ☰, sous 960px. Depuis la refonte
 * (24/11/2026), il porte les trois mêmes entrées que la barre d'ordinateur,
 * puis le bouton principal et sa mention, puis l'adresse de contact. Plus
 * de sous-menu : les six solutions sont devenues trois services, sur une
 * seule page.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. AUCUN TEXTE N'EST RECOPIÉ ICI. Les entrées et les mentions viennent de
 *    `site` (`src/content/{fr,en}/common.ts`), passé par la barre.
 * 2. Le focus est piégé dans le panneau et revient au bouton ☰ à la
 *    fermeture, qui se fait par la croix, par Échap et par n'importe quel
 *    lien.
 * ────────────────────────────────────────────────────────────────────────
 */
export function MobileMenu({
  locale,
  copy,
  pathname,
  open,
  onClose,
  lang,
}: {
  locale: Locale;
  copy: HeaderCopy;
  pathname: string;
  open: boolean;
  onClose: () => void;
  /** Le sélecteur de langue de la barre, qui n'y tient plus sous 720px. */
  lang: ReactNode;
}) {
  const { site } = copy;
  const panel = useRef<HTMLDivElement>(null);

  /* Le focus entre dans le panneau à l'ouverture : la barre reste visible et
     c'est son bouton ☰, devenu une croix, qui ferme. Le piège à tabulation
     ci-dessous a besoin d'un point de départ dans le panneau, et le panneau
     en `tabIndex={-1}` en est un. */
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => panel.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  /* Le panneau commence SOUS la barre, qui reste visible. Sa hauteur est
     mesurée et non écrite : la barre fait 64px sur téléphone mais le jeton
     `--header-h` en annonce 72, et une valeur en dur dériverait au premier
     changement. Le résultat sert seulement à positionner le panneau. */
  useEffect(() => {
    if (!open) return;
    const barre = document.querySelector<HTMLElement>(".site-header");
    const boite = panel.current;
    if (!barre || !boite) return;
    boite.style.top = `${Math.round(barre.getBoundingClientRect().height)}px`;
  }, [open]);

  const isCurrent = (href: string) => {
    const full = path(locale, href);
    return pathname === full || (href !== ROUTES.home && pathname.startsWith(`${full}/`));
  };

  return (
    <div
      id="menu-mobile"
      hidden={!open}
      ref={panel}
      tabIndex={-1}
      className={s.panel}
      role="dialog"
      /* PAS de `aria-modal` : le bouton qui ferme (le ☰ devenu croix) est
         dans la barre, hors du panneau, et `aria-modal` le rendait
         inaccessible à VoiceOver. Le reste de la page est déjà isolé par
         `inert` (voir `SiteHeader`). */
      aria-label={site.menuDialog}
      onKeyDown={event => {
        if (event.key === "Escape") { event.stopPropagation(); onClose(); return; }
        if (event.key !== "Tab") return;
        const stops = Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])
          .filter(element => element.getClientRects().length > 0);
        const first = stops[0];
        const last = stops[stops.length - 1];
        /* Le cycle passe par le bouton de la barre qui ferme le menu : sans
           lui, le clavier ne pouvait fermer qu'avec Échap. */
        const toggle = document.querySelector<HTMLElement>('[aria-controls="menu-mobile"]');
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); (toggle ?? last)?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); (toggle ?? first)?.focus(); }
      }}
    >
      <nav className={s.main} aria-label={site.menuDialog}>
        {site.nav.map(item => {
          const current = isCurrent(item.href);
          const row = (
            <NavLink
              key={item.href}
              href={path(locale, item.href)}
              locale={locale}
              onNavigate={onClose}
              aria-current={current ? "page" : undefined}
              className={s.row}
            >
              <span className={s.rowLabel}>{item.label}</span>
              {current && <i className={s.dot} aria-hidden />}
            </NavLink>
          );
          /* Sous « Services », ses trois services, comme le menu déroulant
             de la barre. */
          if (item.href !== ROUTES.services) return row;
          return (
            <div key={item.href}>
              {row}
              <ul className={s.subList}>
                {site.servicesMenu.items.map(service => (
                  <li key={service.key}>
                    <NavLink href={serviceHref(locale, service.key)} locale={locale} onNavigate={onClose} className={s.sub}>
                      {service.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>

      <PrimaryButton locale={locale} className={s.cta} onClick={onClose} />
      <p className={s.ctaNote}>{site.ctaNote}</p>

      <div className={s.lang}>{lang}</div>

      <div className={s.foot}>
        <span className={s.footLine}>{site.agency}</span>
        <a className={s.footMail} href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </div>
  );
}
