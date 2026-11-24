"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { ServicesMenu } from "./services-menu";
import { MobileMenu } from "@/components/nav/mobile-menu";
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
 * Une seule ligne sur ordinateur : trois entrées, dont « Services » qui
 * déroule ses trois services, puis la langue et le bouton blanc
 * « Contact » (maquette du 24/11/2026). Pas d'entrée « Accueil » : le logo
 * y mène. Une barre qui
 * passe sur deux lignes est cassée, pas dense : s'il faut ajouter une
 * entrée, c'est une autre qui doit partir.
 */
/**
 * LE FOND SOUS LA BARRE EST-IL CLAIR ? (24/11/2026)
 *
 * On regarde ce qui se trouve sous le milieu de la barre, au centre de
 * l'écran, en ignorant la barre elle-même et les calques presque effacés
 * (opacité sous 50 %), puis on remonte ses parents jusqu'au premier fond
 * vraiment peint. Clair si sa luminance dépasse la moitié. Un élément peut
 * le dire lui-même avec `data-tone="dark"` ou `"light"` (une photo n'a pas
 * de couleur de fond), et il le dit alors pour tout ce qu'il contient (le
 * hero de l'accueil et son bouton bleu clair). Ainsi la barre suit
 * n'importe quelle section, carte ou pied de page, sans liste à tenir à
 * jour.
 *
 * Seuls comptent les éléments du site (`.site-page`) : une extension du
 * navigateur peut poser ses propres calques sur la page, et la barre les
 * prenait pour le fond (24/11/2026).
 */
function lightUnder(header: HTMLElement | null): boolean {
  if (!header) return false;
  const site = header.closest(".site-page") ?? document.body;
  const y = header.getBoundingClientRect().height / 2;
  for (const el of document.elementsFromPoint(window.innerWidth / 2, y)) {
    if (header.contains(el) || !site.contains(el)) continue;
    if (parseFloat(getComputedStyle(el).opacity) < 0.5) continue;
    /* Un élément qui dit son ton le dit pour TOUT ce qu'il contient : le
       hero de l'accueil reste sombre même sous son bouton bleu clair. */
    const tone = el.closest("[data-tone]")?.getAttribute("data-tone");
    if (tone) return tone === "light";
    for (let node: Element | null = el; node; node = node.parentElement) {
      if (parseFloat(getComputedStyle(node).opacity) < 0.5) break;
      const rgba = getComputedStyle(node).backgroundColor.match(/[\d.]+/g);
      if (!rgba) continue;
      const [r, g, b, a = 1] = rgba.map(Number);
      if (a >= 0.5) return 0.2126 * r + 0.7152 * g + 0.0722 * b > 140;
    }
    return false;
  }
  return false;
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
  const [scrolled, setScrolled] = useState(false);
  /* Une section claire passe sous la barre : ses couleurs s'inversent
     (`.is-on-light`, accueil seulement dans la feuille de style). */
  const [onLight, setOnLight] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 12);
      setOnLight(lightUnder(headerRef.current));
    };
    /* Une mesure par image au plus, au défilement comme au
       redimensionnement. Elle attend l'image SUIVANTE : les sections
       animées au défilement (la photo de « Notre approche ») se mettent à
       jour dans la même image que la barre, et la barre mesurait encore
       l'état d'avant. */
    const request = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = requestAnimationFrame(measure);
        });
    };
    measure();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    /* Une section dont le fond bouge encore après le défilement (la photo
       de « Notre approche », lissée) le signale par `site:fond`. */
    window.addEventListener("site:fond", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("site:fond", request);
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
      + ".site-header-bar .lang, .site-header-cta",
    ));
    const previousInert = background.map(element => element.inert);
    document.body.style.overflow = "hidden";
    background.forEach(element => { element.inert = true; });
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1080px)");
    const closeAtDesktop = () => { if (media.matches) setOpenedAt(null); };
    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);

  const closeMenu = () => { setOpen(false); burgerRef.current?.focus(); };
  const isCurrent = (href: string) => {
    const full = path(locale, href);
    return pathname === full || (href !== ROUTES.home && pathname.startsWith(`${full}/`));
  };

  return (
    <header ref={headerRef} className={cx("site-header", scrolled && "is-scrolled", onLight && "is-on-light")} onKeyDown={e => {
      /* Le piège de focus vit DANS le panneau, qui s'en occupe lui-même.
         Il reste ici de quoi fermer au clavier si le focus n'était pas
         encore entré dans le panneau, le bouton ☰ par exemple. */
      if (open && e.key === "Escape") closeMenu();
    }}>
      <div className="site-header-bar">
        <NavLink
          href={homePath(locale)}
          locale={locale}
          aria-label={site.homeLabel}
          onNavigate={() => setOpen(false)}
          className="site-header-brand"
        >
          <Wordmark variant="mark" />
        </NavLink>

        <nav aria-label={site.navLabel} className="site-nav">
          {site.nav.map((item) => item.href === ROUTES.services ? (
            <ServicesMenu key={`services-${pathname}`} locale={locale} pathname={pathname} label={item.label} menu={site.servicesMenu} />
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
            {site.contactLabel}
          </Link>

          <button
            type="button"
            ref={burgerRef}
            className="site-burger"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? site.menuClose : site.menuOpen}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      {/* Le menu de téléphone, dans son composant. Il est remonté à chaque
          changement de page : son accordéon Solutions repart alors de
          l'état qui convient à la page affichée. */}
      <MobileMenu
        key={pathname}
        locale={locale}
        copy={copy}
        pathname={pathname}
        open={open}
        onClose={closeMenu}
        /* Sous 720px, le sélecteur quitte la barre pour laisser la place au
           bouton principal : il est repris ici, dans le menu. */
        lang={<LangSwitch locale={locale} pathname={pathname} label={site.langLabel} />}
      />
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
