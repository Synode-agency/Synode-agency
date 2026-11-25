"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { ServicesMegaMenu } from "@/components/nav/services-mega-menu";
import { MenuPanel } from "@/components/nav/menu-panel";
import { MenuMobile } from "@/components/nav/menu-mobile";
import { ROUTES, homePath, path, switchLocalePath, translateHash, type Locale } from "@/lib/routes";
import type { HeaderCopy } from "@/content";
import { cx } from "@/lib/cx";

/**
 * La barre de navigation.
 *
 * Elle flotte AU-DESSUS de la pile de cartes plutôt que de s'y coller : le
 * fond teinté reste visible derrière elle, ce qui préserve le principe du
 * site, les panneaux sont posés sur une surface et rien n'est collé au bord.
 *
 * Une seule ligne sur ordinateur : quatre entrées, « Accueil » (ajoutée
 * le 25/11/2026 : le logo part dans le bouton ☰ au défilement) puis
 * « Services » qui déroule ses trois services, puis la langue et le bouton
 * blanc « Contact » (maquette du 24/11/2026). Une barre qui
 * passe sur deux lignes est cassée, pas dense : s'il faut ajouter une
 * entrée, c'est une autre qui doit partir.
 *
 * AU DÉFILEMENT, LA BARRE DEVIENT UN BOUTON ☰ (25/11/2026, demande
 * d'Antonino, « presque du motion design ») : le logo, les liens, la
 * langue et « Contact » partent l'un après l'autre vers la droite, en
 * rétrécissant, et se fondent dans le bouton, un disque blanc à trois
 * traits inégaux. Tout en haut de la page, tout en ressort et reprend sa
 * place. Le mouvement est dans `refonte.css` ; ce composant ne fait que
 * mesurer le chemin de chaque élément jusqu'au bouton.
 */

/* Les éléments de la barre qui partent dans le bouton ☰, de gauche à
   droite. Ceux qui ne sont pas affichés à la largeur courante (la
   navigation sous 1080px, la langue sous 720px) sont ignorés. */
const VERS_LE_BOUTON =
  ".site-header-brand, .site-nav > *, .site-header-end > .lang, .site-header-contact";

/* La position d'un élément dans la page, sans ses transformations (le
   mouvement en cours ne fausse donc pas la mesure). */
function gauche(element: HTMLElement) {
  let x = 0;
  for (let n: HTMLElement | null = element; n; n = n.offsetParent as HTMLElement | null) x += n.offsetLeft;
  return x;
}

/* La luminance d'une couleur calculée (« rgb(…) » ou « rgba(…) »), ou
   `null` si elle est transparente (moins de 50 % d'opacité). */
function luminance(couleur: string) {
  const valeurs = couleur.match(/[\d.]+/g)?.map(Number);
  if (!valeurs || valeurs.length < 3) return null;
  if ((valeurs[3] ?? 1) < 0.5) return null;
  const [r, g, b] = valeurs.slice(0, 3).map(c => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/* Le fond sous un point de l'écran, hors de la barre : le premier fond
   opaque en remontant depuis l'élément qui s'y trouve. Une section qui
   passe en bleu nuit (`data-nuit`) devient transparente : on la saute, et
   c'est alors le calque bleu nuit (`.fond-nuit`) qui fait le fond. */
function luminanceSous(x: number, y: number) {
  const dessous = document.elementsFromPoint(x, y).find(element => !element.closest(".site-header"));
  for (let n: Element | null = dessous ?? null; n && n !== document.body && n.tagName !== "MAIN"; n = n.parentElement) {
    if (n.hasAttribute("data-nuit")) continue;
    const l = luminance(getComputedStyle(n).backgroundColor);
    if (l !== null) return l;
  }
  if (document.querySelector(".fond-nuit[data-nuit]")) return 0;
  return luminance(getComputedStyle(document.body).backgroundColor) ?? 1;
}
export function SiteHeader({ locale, copy }: { locale: Locale; copy: HeaderCopy }) {
  const { site } = copy;
  const pathname = usePathname();
  /* Le menu retient la page sur laquelle il a été ouvert, et il est
     considéré ouvert tant qu'on y est encore. Une navigation le referme donc
     TOUTE SEULE, sans effet ni `setState` à surveiller : c'est de l'état
     dérivé, pas un état à synchroniser. */
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (value: boolean) => setOpenedAt(value ? pathname : null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  /* Le fond sous le bouton ☰ (`data-fond` sur la barre, « clair » ou
     « sombre ») : ses traits sont blancs sur un fond sombre et bleu nuit
     sur un fond clair (demande d'Antonino du 25/11/2026). Mesuré à chaque
     image de défilement, puis une fois le défilement arrêté (une section
     peut changer de fond juste après). Seuil : 0,18 de luminance, là où le
     blanc et le bleu nuit se lisent aussi bien l'un que l'autre. */
  useEffect(() => {
    const barre = headerRef.current;
    const bouton = burgerRef.current;
    if (!barre || !bouton) return;
    let raf = 0;
    let minuteur = 0;
    const mesure = () => {
      raf = 0;
      const r = bouton.getBoundingClientRect();
      const l = luminanceSous(r.left + r.width / 2, r.top + r.height / 2);
      barre.dataset.fond = l > 0.18 ? "clair" : "sombre";
    };
    const demande = () => {
      if (!raf) raf = requestAnimationFrame(mesure);
      window.clearTimeout(minuteur);
      minuteur = window.setTimeout(mesure, 160);
    };
    mesure();
    window.addEventListener("scroll", demande, { passive: true });
    window.addEventListener("resize", demande);
    return () => {
      window.removeEventListener("scroll", demande);
      window.removeEventListener("resize", demande);
      cancelAnimationFrame(raf);
      window.clearTimeout(minuteur);
    };
  }, [pathname]);

  /* Dès qu'on fait défiler (24px), la barre le sait (`.is-scrolled`) et se
     replie dans le bouton ☰ ; tout en haut, elle se redéploie. Une mesure
     par image au plus. */
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", request, { passive: true });
    return () => {
      window.removeEventListener("scroll", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Le menu ouvert verrouille le défilement de la page derrière lui. */
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    /* ⚠ On rend inertes les éléments de la barre UN PAR UN, et jamais la
       barre elle-même.

       Pourquoi : `inert` neutralise tout son sous-arbre, clics et touchers
       compris, et on ne peut pas en faire sortir un descendant. En rendant
       `.site-header-bar` inerte, on neutralisait le ☰ avec le reste. Tant que
       le panneau recouvrait l'écran et portait sa propre croix, ça ne se
       voyait pas. Depuis que la barre reste visible et que c'est le ☰, devenu
       une croix, qui ferme le menu, cela le rendait INTOUCHABLE : le menu ne
       pouvait plus se fermer au doigt.

       ⚠ Ne jamais remettre `.site-header-bar` ni `header` dans cette liste.
       Le panneau du menu est un enfant du header, donc l'un l'autre se
       neutraliseraient.

       Le reste de l'intention d'origine est conservé : le logo, la navigation
       de bureau, le sélecteur de langue et le bouton de réservation sortent
       de l'arbre d'accessibilité pendant que la modale est ouverte, car le
       piège de focus tient le clavier mais pas le curseur virtuel d'un
       lecteur d'écran. */
    const background = Array.from(document.querySelectorAll<HTMLElement>(
      ".site-page > main, .site-page > footer, "
      + ".site-header-brand, .site-header-bar .site-nav, "
      + ".site-header-bar .lang, .site-header-cta, .site-header-contact",
    ));
    const previousInert = background.map(element => element.inert);
    document.body.style.overflow = "hidden";
    background.forEach(element => { element.inert = true; });
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
    };
  }, [open]);

  /* Le chemin de chaque élément jusqu'au bouton ☰ (`--vers-burger`, du
     centre de l'élément au centre du bouton) et son rang, à l'aller
     (`--rang`, de gauche à droite) et au retour (`--rang-retour`, de
     droite à gauche). Mesuré à l'arrivée, à chaque changement de taille de
     la barre, une fois les polices chargées, et à chaque page (le menu
     « Services » est alors remonté). */
  useEffect(() => {
    const barre = barRef.current;
    const bouton = burgerRef.current;
    if (!barre || !bouton) return;
    const mesure = () => {
      const elements = Array.from(barre.querySelectorAll<HTMLElement>(VERS_LE_BOUTON)).filter(
        element => element.offsetWidth > 0,
      );
      const cible = gauche(bouton) + bouton.offsetWidth / 2;
      elements.forEach((element, rang) => {
        const centre = gauche(element) + element.offsetWidth / 2;
        element.style.setProperty("--vers-burger", `${Math.round(cible - centre)}px`);
        element.style.setProperty("--rang", String(rang));
        element.style.setProperty("--rang-retour", String(elements.length - 1 - rang));
      });
    };
    mesure();
    const observateur = new ResizeObserver(mesure);
    observateur.observe(barre);
    let actif = true;
    document.fonts?.ready.then(() => { if (actif) mesure(); });
    return () => {
      actif = false;
      observateur.disconnect();
    };
  }, [pathname]);

  const closeMenu = () => { setOpen(false); burgerRef.current?.focus(); };
  /* La même page dans les deux langues, pour le « FR / EN » des menus. */
  const langues = { fr: localePath("fr", pathname), en: localePath("en", pathname) };
  const isCurrent = (href: string) => {
    const full = path(locale, href);
    return pathname === full || (href !== ROUTES.home && pathname.startsWith(`${full}/`));
  };

  return (
    <header ref={headerRef} className={cx("site-header", scrolled && "is-scrolled")} onKeyDown={e => {
      /* Le piège de focus vit DANS le panneau, qui s'en occupe lui-même.
         Il reste ici de quoi fermer au clavier si le focus n'était pas
         encore entré dans le panneau, le bouton ☰ par exemple. */
      if (open && e.key === "Escape") closeMenu();
    }}>
      {/* Le voile du haut de l'écran au défilement : un assombrissement
          léger et un flou progressif, sans bord visible (`refonte.css`). */}
      <div className="site-voile" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="site-header-bar" ref={barRef}>
        <NavLink
          href={homePath(locale)}
          locale={locale}
          aria-label={site.homeLabel}
          onNavigate={() => setOpen(false)}
          className="site-header-brand"
        >
          {/* Deux logos superposés : le clair au repos, le foncé sur la barre
              claire du menu « Services » (fondu de l'un à l'autre). */}
          <span className="site-header-logo-clair">
            <Wordmark variant="mark" />
          </span>
          <span className="site-header-logo-fonce" aria-hidden="true">
            <Wordmark variant="mark" />
          </span>
        </NavLink>

        <nav aria-label={site.navLabel} className="site-nav">
          {site.nav.map((item) => item.href === ROUTES.services ? (
            /* Le méga-menu « Services » (25/11/2026) : au survol, les quatre
               services en cartes, la page floutée derrière. Remonté à chaque
               page, donc refermé. */
            <ServicesMegaMenu key={`services-${pathname}`} locale={locale} pathname={pathname} label={item.label} labelOuvrir={site.servicesToggle} services={site.menuServices} />
          ) : (
            <NavLink
              key={item.href}
              href={path(locale, item.href)}
              locale={locale}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={cx("site-nav-link", isCurrent(item.href) && "is-current")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header-end">
          <LangSwitch locale={locale} pathname={pathname} label={site.langLabel} />
          {/* « Contact », en blanc, visible aussi sur téléphone hors du
              menu ☰. Le bouton principal (« Réserver un appel de 30 min »)
              reste dans les pages. */}
          <Link href={path(locale, ROUTES.contact)} className="site-header-contact">
            <span className="btn-lib">{site.contactLabel}</span>
          </Link>

          {/* Le bouton ☰ (système « Groupe B ») : un rond à deux traits, qui
              deviennent une croix menu ouvert. Sur ordinateur, il n'apparaît
              qu'au défilement, quand la barre s'y replie. */}
          <button
            type="button"
            ref={burgerRef}
            className="site-burger"
            aria-expanded={open}
            aria-controls="menu-panneau menu-mobile"
            aria-label={open ? site.menuClose : site.menuOpen}
            onClick={() => setOpen(!open)}
          >
            <span className="burger-traits" aria-hidden="true">
              <span className="burger-trait" />
              <span className="burger-trait" />
              <span className="burger-trait" />
            </span>
          </button>
        </div>
      </div>

      {/* Les menus du bouton ☰, système « Groupe B » (25/11/2026) : un
          panneau blanc qui glisse depuis la droite à partir de 768px, un
          écran blanc plein écran en dessous. Chacun ne s'affiche qu'à sa
          largeur. */}
      <MenuPanel locale={locale} copy={copy} open={open} onClose={closeMenu} langues={langues} />
      <MenuMobile locale={locale} copy={copy} open={open} onClose={closeMenu} langues={langues} />
    </header>
  );
}

/**
 * La même page dans l'autre langue. Une seule écriture pour les DEUX
 * sélecteurs du site, celui de la barre et celui du menu de téléphone :
 * quelqu'un qui lit `/realisations/nexus` et bascule doit arriver sur
 * `/en/work/nexus`, pas sur l'accueil.
 */
export function localePath(target: Locale, pathname: string) {
  /* La page 404 est générée sous `/_not-found` : la traduire mènerait à
     une autre 404. Elle renvoie à l'accueil de la langue visée (C47). */
  if (pathname.includes("_not-found")) return target === "fr" ? "/" : "/en";
  return switchLocalePath(pathname, target);
}

/**
 * Le sélecteur de langue.
 *
 * Il rend un vrai lien vers la même page dans l'autre langue, pas un bouton
 * qui recharge la racine : quelqu'un qui lit `/cas-usage` et bascule doit
 * arriver sur `/en/cas-usage`, pas sur l'accueil.
 */
function LangSwitch({
  locale,
  pathname,
  label,
}: {
  locale: Locale;
  pathname: string;
  label: string;
}) {
  const router = useRouter();
  return (
    <div className="lang" role="group" aria-label={label}>
      {(["fr", "en"] as const).map((l) => {
        const current = l === locale;
        return (
          <Link
            key={l}
            href={localePath(l, pathname)}
            hrefLang={l}
            aria-current={current ? "true" : undefined}
            className={cx("lang-item", current && "is-current")}
            /* Les ancres sont les mêmes dans les deux langues : quelqu'un qui
               lit /en/cas-usage#rendez-vous et bascule doit arriver sur la
               même section, pas en haut de /cas-usage. Le fragment n'est lu
               qu'au clic, car `usePathname` ne le donne pas. Un clic avec
               une touche (nouvel onglet) garde le lien nu. */
            onClick={(event) => {
              const hash = window.location.hash;
              if (current || !hash || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              router.push(`${localePath(l, pathname)}${translateHash(hash, l)}`);
            }}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
