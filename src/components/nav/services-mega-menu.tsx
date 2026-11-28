"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NavLink } from "@/components/site/nav-link";
import { ROUTES, path, type Locale } from "@/lib/routes";
import type { HeaderCopy } from "@/content";
import { cx } from "@/lib/cx";
import { ServiceVisual, lienService } from "./menu-service";
import s from "./services-mega-menu.module.css";

type MenuServices = HeaderCopy["site"]["menuServices"];

/**
 * LE MÉGA-MENU « SERVICES » DE LA BARRE, SYSTÈME « GROUPE B » (25/11/2026,
 * fiche d'Antonino), à partir de 1024px.
 *
 * Au survol de « Services » (ou au clavier : focus, puis Entrée), la barre
 * passe en clair (`data-mega` sur la barre, voir `refonte.css`) et un
 * panneau BLANC se déroule dessous, sur toute la largeur de l'écran : les
 * quatre services en cartes verticales, qui montent en cascade : leur
 * photo avec, POSÉS DESSUS (28/11/2026, maquette « C » choisie par
 * Antonino, comme sur l'accueil), le titre et la ligne courte du service
 * et une flèche dans un cercle ; au survol d'une carte, les trois autres
 * s'atténuent. Un voile sombre couvre la page derrière.
 *
 * Il se ferme quand la souris quitte la barre et le panneau (elle bouge
 * alors sur le voile, ou sort de la fenêtre), au survol d'un autre lien de
 * la barre, au clic sur le voile, à Échap, quand le focus en sort et dès
 * que la page défile (la barre se replie alors dans le bouton ☰).
 */
export function ServicesMegaMenu({
  locale,
  pathname,
  label,
  labelOuvrir,
  services,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  /** Le nom de la petite flèche, pour les lecteurs d'écran. */
  labelOuvrir: string;
  services: MenuServices;
}) {
  const [ouvert, setOuvert] = useState(false);
  const racine = useRef<HTMLDivElement>(null);
  const declencheur = useRef<HTMLButtonElement>(null);
  /* Le type du dernier appui sur « Services » : à la souris, le survol a
     déjà ouvert le menu et le clic ne doit pas le refermer ; au doigt et au
     clavier, le clic ouvre et ferme. */
  const dernierAppui = useRef<string>("");
  const id = "mega-services";
  const courant = pathname === path(locale, ROUTES.services);

  /* La barre passe en clair tant que le menu est ouvert. */
  useEffect(() => {
    const barre = racine.current?.closest<HTMLElement>(".site-header");
    barre?.toggleAttribute("data-mega", ouvert);
    return () => barre?.removeAttribute("data-mega");
  }, [ouvert]);

  useEffect(() => {
    if (!ouvert) return;
    const barre = racine.current?.closest<HTMLElement>(".site-header-bar");
    const ferme = () => setOuvert(false);
    // Un autre lien (ou bouton) de la barre survolé : on referme.
    const survol = (e: PointerEvent) => {
      const cible = e.target instanceof Element ? e.target.closest("a, button") : null;
      if (cible && !racine.current?.contains(cible)) setOuvert(false);
    };
    const touche = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const dedans = racine.current?.contains(document.activeElement);
      setOuvert(false);
      if (dedans) declencheur.current?.focus();
    };
    const defile = () => {
      if (window.scrollY > 24) setOuvert(false);
    };
    barre?.addEventListener("pointerleave", ferme);
    barre?.addEventListener("pointerover", survol);
    document.addEventListener("keydown", touche);
    window.addEventListener("scroll", defile, { passive: true });
    return () => {
      barre?.removeEventListener("pointerleave", ferme);
      barre?.removeEventListener("pointerover", survol);
      document.removeEventListener("keydown", touche);
      window.removeEventListener("scroll", defile);
    };
  }, [ouvert]);

  return (
    <div
      ref={racine}
      className={s.racine}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOuvert(false);
      }}
    >
      {/* « Services » (demande d'Antonino du 25/11/2026) : le MOT est un lien
          vers la page Services ; au survol (souris), le menu s'ouvre. La
          petite FLÈCHE est un bouton : elle ouvre et ferme le menu au clavier
          et au doigt. */}
      <div
        className={s.declencheur}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setOuvert(true);
        }}
      >
        <NavLink
          href={path(locale, ROUTES.services)}
          locale={locale}
          onNavigate={() => setOuvert(false)}
          className={cx("site-nav-link", s.lien, courant && "is-current")}
        >
          {/* Le mot deux fois, l'un sur l'autre : droit, et en Instrument
              Serif italique, montré sur la page Services, la page en cours
              (28/11/2026 ; à l'ouverture du menu avant). La place est celle
              du plus large : les autres liens ne bougent pas. */}
          <span className={s.mots}>
            <span className={s.motDroit}>{label}</span>
            <span className={s.motCastoro} aria-hidden="true">
              {label}
            </span>
          </span>
        </NavLink>
        <button
          type="button"
          ref={declencheur}
          className={cx("site-nav-link", s.fleche)}
          aria-expanded={ouvert}
          aria-controls={id}
          aria-label={labelOuvrir}
          onPointerDown={(e) => {
            dernierAppui.current = e.pointerType;
          }}
          onClick={() => {
            if (dernierAppui.current === "mouse") setOuvert(true);
            else setOuvert((o) => !o);
            dernierAppui.current = "";
          }}
        >
          <ChevronDown aria-hidden />
        </button>
      </div>

      {/* Le voile : il couvre la page derrière le panneau. La souris qui
          BOUGE dessus a quitté la barre et le panneau : on referme. (Pas à
          son apparition : ouvert au clavier, le menu se refermait aussitôt
          sous une souris immobile posée sur la page.) */}
      <div
        className={cx(s.voile, ouvert && s.voileOuvert)}
        aria-hidden="true"
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") setOuvert(false);
        }}
        onClick={() => setOuvert(false)}
      />

      <div id={id} className={cx(s.panneau, ouvert && s.ouvert)} inert={!ouvert}>
        <div className={s.contenu}>
          <div className={s.grille}>
            {services.map((service, i) => (
              <NavLink
                key={service.key}
                href={lienService(locale, service.key)}
                locale={locale}
                onNavigate={() => setOuvert(false)}
                className={s.carte}
                style={{ "--i": i } as CSSProperties}
              >
                <ServiceVisual
                  image={service.image}
                  focus={service.focus}
                  sizes="(max-width: 1440px) 25vw, 320px"
                  className={s.visuel}
                />
                {/* Posés sur la photo, mais hors d'elle dans le code : la
                    photo est cachée aux lecteurs d'écran, pas le titre. */}
                <span className={s.rond} aria-hidden="true">
                  <ArrowRight />
                </span>
                <span className={s.legende}>
                  <span className={s.titre}>{service.title}</span>
                  <span className={s.texte}>{service.text}</span>
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
