"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/site/nav-link";
import { brickIcons } from "@/components/site/solution-visuals";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";
import s from "./mobile-menu.module.css";

/**
 * LE MENU DE TÉLÉPHONE.
 *
 * Le panneau qui s'ouvre avec le bouton ☰, sous 1080px. Il remplace une
 * version qui réduisait le sous-menu Solutions du bureau : sur un vrai
 * iPhone, ses pastilles et ses descriptions étaient à la limite du lisible
 * et sous la cible tactile de 44px.
 *
 * Il reprend donc la STRUCTURE du sous-menu de bureau — « toutes nos
 * solutions », puis les six familles avec leur icône, leur titre et leur
 * bénéfice — mais à des tailles faites pour le doigt : 25px pour les
 * entrées, 68px de hauteur de ligne, des pastilles de 44px.
 *
 * ── Quatre points à ne pas défaire ──────────────────────────────────────
 * 1. AUCUN TEXTE N'EST RECOPIÉ ICI. Les entrées viennent de `site.nav`, les
 *    six solutions de `solutions.bricks` — titre et bénéfice, les mêmes que
 *    le sous-menu de bureau et que les cartes des pages — et les icônes de
 *    `brickIcons`. Deux écritures finiraient par divergir.
 * 2. Le chevron est un SPAN dessiné comme un bouton, pas un bouton : toute
 *    la ligne Solutions est déjà le bouton de l'accordéon, et un bouton
 *    dans un bouton n'est pas du HTML valide.
 * 3. La hauteur du sous-menu est MESURÉE à l'ouverture et à la fermeture :
 *    une transition de hauteur ne part pas de `auto`. Elle est rendue à
 *    `auto` une fois l'animation finie, sans quoi une rotation d'écran
 *    laisserait le panneau à l'ancienne hauteur.
 * 4. Le focus est piégé dans le panneau et revient au bouton ☰ à la
 *    fermeture, qui se fait par la croix, par Échap et par n'importe quel
 *    lien.
 * ────────────────────────────────────────────────────────────────────────
 */

const COPY = {
  fr: {
    all: "Toutes nos solutions",
    solutionsToggle: "Solutions",
    ctaNote: "Premier échange gratuit · sans engagement",
    agency: "Agence IA · Bruxelles",
    dialog: "Menu",
  },
  en: {
    all: "All our solutions",
    solutionsToggle: "Solutions",
    ctaNote: "A free first conversation · no commitment",
    agency: "AI agency · Brussels",
    dialog: "Menu",
  },
} as const;

export function MobileMenu({
  locale,
  pathname,
  open,
  onClose,
}: {
  locale: Locale;
  pathname: string;
  open: boolean;
  /** Ferme le panneau ET rend le focus au bouton ☰. */
  onClose: () => void;
}) {
  const { site, solutions } = getContent(locale);
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const route = path(locale, ROUTES.solutions);
  const onSolutionPage = pathname === route || pathname.startsWith(`${route}/`);
  /* Fermé par défaut, ouvert d'emblée si on lit une page solution. Le
     composant est remonté à chaque changement de page par sa `key`, donc
     cette valeur initiale est réévaluée à chaque fois. */
  const [sub, setSub] = useState(onSolutionPage);
  const [reduced, setReduced] = useState(false);

  const panel = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(media.matches);
    queueMicrotask(read);
    media.addEventListener("change", read);
    return () => media.removeEventListener("change", read);
  }, []);

  /* Le focus part sur le PANNEAU lui-même à l'ouverture. Il partait sur la
     croix du panneau, qui n'existe plus : la barre de navigation reste
     visible et c'est son bouton hamburger, devenu une croix, qui ferme. Le
     piège à tabulation ci-dessous a besoin d'un point de départ dans le
     panneau, et le panneau en `tabIndex={-1}` en est un. */
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => panel.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  /* ---- LE PANNEAU COMMENCE SOUS LA BARRE, ET SA HAUTEUR EST MESURÉE.

     Il était en `inset: 0` et recouvrait donc la barre de navigation, avec
     son propre logo en variante « mark », son propre sélecteur de langue et
     sa propre croix. Rien ne bougeait en réalité : on voyait une SECONDE
     barre, plus courte, avec un logo plus petit. D'où l'impression que tout
     se déplaçait et rétrécissait à l'ouverture.

     La hauteur est mesurée et non écrite : la barre fait 64px sur téléphone
     mais le jeton `--header-h` en annonce 72, et une valeur en dur dériverait
     au premier changement. ---- */
  useEffect(() => {
    if (!open) return;
    const barre = document.querySelector<HTMLElement>(".site-header");
    const boite = panel.current;
    if (!barre || !boite) return;
    /* Écrit DANS le DOM et non dans un état : la valeur ne sert qu'à
       positionner le panneau, elle ne décide d'aucun rendu, et un `setState`
       synchrone dans un effet déclencherait un rendu en cascade. */
    boite.style.top = `${Math.round(barre.getBoundingClientRect().height)}px`;
  }, [open]);

  /* La hauteur du sous-menu. Voir le point 3 de l'en-tête.

     ⚠ ON N'ANIME QUE SI `sub` VIENT DE CHANGER, menu ouvert. Dans tous les
     autres cas on pose directement `auto` ou `0px`.

     Le piège corrigé le 17/10 : sur une page solution, le sous-menu démarre
     OUVERT. L'effet tournait au montage, panneau `hidden` donc en
     `display: none`, et y mesurait une hauteur de 0px. Il attendait ensuite
     un `transitionend` pour passer en `auto`, qui ne venait jamais puisque
     rien ne s'animait. Rouvrir le menu ne relançait rien, l'effet ne
     dépendant que de `sub`. Résultat sur iPhone : le cadre bleu du sous-menu,
     vide, jusqu'à ce qu'on le replie et le redéplie. */
  const prevSub = useRef(sub);
  useEffect(() => {
    const box = wrap.current;
    const content = inner.current;
    if (!box || !content) return;
    const changed = prevSub.current !== sub;
    prevSub.current = sub;
    if (reduced || !open || !changed) { box.style.height = sub ? "auto" : "0px"; return; }

    /* ⚠ `offsetHeight` et NON `scrollHeight` : le sous-menu porte un filet
       d'un pixel et des marges, que `scrollHeight` laisse dehors — il rend
       la boîte de contenu. Avec lui, le panneau se fermait sur les 34
       derniers pixels de la dernière solution. */
    const full = () => {
      const box2 = window.getComputedStyle(content);
      return content.offsetHeight
        + (parseFloat(box2.marginTop) || 0)
        + (parseFloat(box2.marginBottom) || 0);
    };

    const settle = () => { box.style.height = "auto"; };
    if (sub) {
      box.style.height = `${full()}px`;
      box.addEventListener("transitionend", settle, { once: true });
      return () => box.removeEventListener("transitionend", settle);
    }
    /* On repart d'une valeur connue : une transition depuis `auto` ne
       s'anime pas. L'image suivante porte la fermeture. */
    box.style.height = `${full()}px`;
    const id = requestAnimationFrame(() => { box.style.height = "0px"; });
    return () => cancelAnimationFrame(id);
  }, [sub, reduced, open]);

  const isCurrent = (href: string) => {
    const full = path(locale, href);
    return pathname === full || (href !== ROUTES.home && pathname.startsWith(`${full}/`));
  };
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;

  return (
    <div
      id="menu-mobile"
      hidden={!open}
      ref={panel}
      tabIndex={-1}
      className={s.panel}
      role="dialog"
      aria-modal="true"
      aria-label={c.dialog}
      onKeyDown={event => {
        if (event.key === "Escape") { event.stopPropagation(); onClose(); return; }
        if (event.key !== "Tab") return;
        /* Le piège. `getClientRects` écarte ce qui n'est pas affiché : les
           six liens du sous-menu fermé n'entrent donc pas dans le cycle. */
        const stops = Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])
          .filter(element => element.getClientRects().length > 0);
        const first = stops[0];
        const last = stops[stops.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
    >
      {/* ---- Les six entrées ---- */}
      <nav className={s.main} aria-label={site.footerNav}>
        {site.nav.map(item => {
          const current = isCurrent(item.href);
          if (item.href !== ROUTES.solutions) {
            return (
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
          }
          return (
            <div key={item.href} className={s.block}>
              <button
                type="button"
                className={cn(s.row, s.rowToggle, sub && s.rowOpen)}
                aria-expanded={sub}
                aria-controls="menu-mobile-solutions"
                onClick={() => setSub(value => !value)}
              >
                <span className={s.rowLabel}>{c.solutionsToggle}</span>
                {current && <i className={s.dot} aria-hidden />}
                {/* Voir le point 2 de l'en-tête : dessiné comme un bouton,
                    mais ce n'en est pas un. */}
                <span className={s.chevron} aria-hidden><ChevronDown /></span>
              </button>

              <div ref={wrap} className={s.subWrap}>
                <div id="menu-mobile-solutions" ref={inner} className={s.sub} inert={!sub}>
                  <NavLink
                    href={route}
                    locale={locale}
                    onNavigate={onClose}
                    aria-current={pathname === route ? "page" : undefined}
                    className={s.subAll}
                  >
                    {c.all}
                    <ArrowRight aria-hidden />
                  </NavLink>

                  <div className={s.subList}>
                    {solutions.bricks.map(brick => {
                      const Icon = brickIcons[brick.visual];
                      const href = `${route}/${brick.slug}`;
                      return (
                        <NavLink
                          key={brick.slug}
                          href={href}
                          locale={locale}
                          onNavigate={onClose}
                          aria-current={pathname === href ? "page" : undefined}
                          className={cn(s.solution, pathname === href && s.solutionCurrent)}
                        >
                          <span className={s.solutionIcon} aria-hidden><Icon /></span>
                          <span className={s.solutionText}>
                            <strong>{brick.title}</strong>
                            <small>{brick.benefit}</small>
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* ---- L'action ---- */}
      <Link href={bookHref} className={s.cta} onClick={onClose}>
        {site.cta}
        <ArrowRight aria-hidden />
      </Link>
      <p className={s.ctaNote}>{c.ctaNote}</p>

      {/* ---- Le pied ---- */}
      <div className={s.foot}>
        <span className={s.footLine}>{c.agency}</span>
        <a className={s.footMail} href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </div>
  );
}
