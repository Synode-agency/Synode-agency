"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "@/components/site/nav-link";
import { ROUTES, bookingHref, homePath, path, type Locale } from "@/lib/routes";
import { ctaLabel } from "@/content/cta";
import type { HeaderCopy } from "@/content";
import { cx } from "@/lib/cx";
import { ServiceVisual, lienService } from "./menu-service";
import s from "./menu-panel.module.css";

/* « FR / EN » : la langue courante en bleu nuit, l'autre en gris clair. */
export function LangueMenu({
  locale,
  langues,
  className,
  autreClassName,
}: {
  locale: Locale;
  langues: { fr: string; en: string };
  className?: string;
  autreClassName?: string;
}) {
  return (
    <span className={className}>
      {(["fr", "en"] as const).map((l, i) => (
        <span key={l}>
          {i > 0 ? " / " : null}
          <a
            href={langues[l]}
            hrefLang={l}
            aria-current={l === locale ? "true" : undefined}
            className={l === locale ? undefined : autreClassName}
          >
            {l.toUpperCase()}
          </a>
        </span>
      ))}
    </span>
  );
}

/* Le piège du focus d'un menu ouvert : la tabulation tourne entre le
   bouton ☰ (qui le referme) et les liens du menu, sans les cartes
   repliées (`inert` : elles refuseraient le focus et bloqueraient le
   cycle). */
export function piegeFocus(event: KeyboardEvent<HTMLElement>, boite: HTMLElement | null, idMenu: string) {
  if (event.key !== "Tab" || !boite) return;
  const arrets = Array.from(boite.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
    (el) => el.getClientRects().length > 0 && !el.closest("[inert]"),
  );
  const bouton = document.querySelector<HTMLElement>(`[aria-controls~="${idMenu}"]`);
  const cycle = bouton ? [bouton, ...arrets] : arrets;
  const ici = cycle.indexOf(document.activeElement as HTMLElement);
  const suivant = event.shiftKey ? (ici <= 0 ? cycle.length - 1 : ici - 1) : ici === cycle.length - 1 ? 0 : ici + 1;
  event.preventDefault();
  cycle[suivant]?.focus();
}

/**
 * LE MENU DU BOUTON ☰ SUR ORDINATEUR ET TABLETTE, SYSTÈME « GROUPE B »
 * (25/11/2026, fiche d'Antonino), à partir de 768px.
 *
 * Un panneau blanc de 60 % de l'écran glisse depuis la droite ; la page,
 * derrière, est voilée et floutée (un clic sur le voile referme). Dans
 * l'ordre, centrés en hauteur : Accueil, Services, Réalisations, À propos
 * et Contact, en grands liens qui montent l'un après l'autre ; en bas, la
 * langue et le bouton principal. « Services » est un bouton : il déplie
 * ses quatre cartes, repliées à chaque ouverture du menu (demande
 * d'Antonino du 25/11).
 *
 * Accessibilité : `dialog` modal, focus piégé (avec le bouton ☰ dans le
 * cycle) ; Échap, le retour du focus au bouton et le blocage du défilement
 * sont gérés par la barre (`SiteHeader`). Un clic sur un lien referme le
 * menu, puis la navigation se fait.
 */
export function MenuPanel({
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
  const idMenu = "menu-panneau";
  const idServices = "menu-panneau-services";
  const [servicesOuverts, setServicesOuverts] = useState(false);
  /* Le type du dernier appui sur la flèche : à la souris, le survol a déjà
     déplié les cartes et le clic ne doit pas les replier ; au clavier et
     au doigt, la flèche déplie et replie. */
  const dernierAppui = useRef<string>("");

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => boite.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  /* Les cartes se replient une fois le panneau sorti de l'écran (0,7s),
     pas pendant qu'il glisse : le menu suivant s'ouvre sans elles. */
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

  /* Au survol d'« Accueil », au-dessus des services (souris), les cartes
     se replient. Pas au survol des liens du dessous (Réalisations, À
     propos, Contact) : ils resteraient sinon hors d'atteinte, la place des
     cartes disparaissant sous le curseur (demande d'Antonino, 25/11/2026). */
  const grandLien = (href: string, label: string, i: number, replie = false) => (
    <span
      key={href}
      className={s.ligne}
      onPointerEnter={(e) => {
        if (replie && e.pointerType === "mouse") setServicesOuverts(false);
      }}
    >
      <NavLink href={href} locale={locale} onNavigate={onClose} className={s.grandLien} style={{ "--i": i } as CSSProperties}>
        {label}
      </NavLink>
    </span>
  );

  return (
    <div className={cx(s.racine, open && s.ouvert)} inert={!open}>
      <div className={s.voile} aria-hidden="true" onClick={onClose} />
      <div
        id={idMenu}
        ref={boite}
        role="dialog"
        aria-modal="true"
        aria-label={site.menuDialog}
        tabIndex={-1}
        className={s.panneau}
        onKeyDown={(e) => piegeFocus(e, boite.current, idMenu)}
      >
        <nav className={s.liens} aria-label={site.navLabel}>
          {accueil ? grandLien(homePath(locale), accueil.label, 0, true) : null}
          {/* « Services » (demande d'Antonino du 25/11/2026) : le MOT mène à
              la page Services ; au survol de la ligne (souris), les cartes se
              déplient. La petite FLÈCHE les déplie au clavier et au doigt. */}
          {services ? (
            <span
              className={cx(s.ligne, s.ligneServices)}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setServicesOuverts(true);
              }}
            >
              <NavLink
                href={path(locale, ROUTES.services)}
                locale={locale}
                onNavigate={onClose}
                className={cx(s.grandLien, s.motServices)}
                style={{ "--i": 1 } as CSSProperties}
              >
                {services.label}
              </NavLink>
              <button
                type="button"
                className={cx(s.grandLien, s.deplier)}
                style={{ "--i": 1 } as CSSProperties}
                aria-expanded={servicesOuverts}
                aria-controls={idServices}
                aria-label={site.servicesToggle}
                onPointerDown={(e) => {
                  dernierAppui.current = e.pointerType;
                }}
                onClick={() => {
                  if (dernierAppui.current === "mouse") setServicesOuverts(true);
                  else setServicesOuverts((ouverts) => !ouverts);
                  dernierAppui.current = "";
                }}
              >
                <ChevronDown aria-hidden className={s.chevron} />
              </button>
            </span>
          ) : null}
          <div id={idServices} className={cx(s.services, servicesOuverts && s.servicesOuverts)} inert={!servicesOuverts}>
            <div className={s.servicesInterieur}>
              <div className={s.servicesGrille}>
                {site.menuServices.map((service, j) => (
                  <NavLink
                    key={service.key}
                    href={lienService(locale, service.key)}
                    locale={locale}
                    onNavigate={onClose}
                    className={s.service}
                    style={{ "--j": j } as CSSProperties}
                  >
                    <ServiceVisual image={service.image} focus={service.focus} sizes="96px" className={s.serviceVisuel} />
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

        <div className={s.pied}>
          <LangueMenu locale={locale} langues={langues} className={s.langue} autreClassName={s.langueAutre} />
          <NavLink href={bookingHref(locale)} locale={locale} onNavigate={onClose} className={s.reserver}>
            {ctaLabel[locale]} <span aria-hidden="true">→</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
