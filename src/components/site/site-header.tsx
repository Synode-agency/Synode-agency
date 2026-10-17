"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { SolutionsMenu } from "./solutions-menu";
import { MobileMenu } from "@/components/nav/mobile-menu";
import { ANCHORS, ROUTES, getContent, homePath, path, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * La barre de navigation.
 *
 * Elle flotte AU-DESSUS de la pile de cartes plutôt que de s'y coller : le
 * fond teinté reste visible derrière elle, ce qui préserve le principe du
 * site, les panneaux sont posés sur une surface et rien n'est collé au bord.
 *
 * Une seule ligne sur ordinateur, cinq entrées et un bouton. Une barre qui
 * passe sur deux lignes est cassée, pas dense : s'il faut ajouter une
 * entrée, c'est une autre qui doit partir.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const isCurrent = (href: string) => {
    const full = path(locale, href);
    return pathname === full || (href !== ROUTES.home && pathname.startsWith(`${full}/`));
  };

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")} onKeyDown={e => {
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

        <nav aria-label="Navigation" className="site-nav">
          {site.nav.map((item) => item.href === ROUTES.solutions ? <SolutionsMenu key={`desktop-${pathname}`} locale={locale} pathname={pathname} /> : (
            <NavLink
              key={item.href}
              href={path(locale, item.href)}
              locale={locale}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={cn("site-nav-link", isCurrent(item.href) && "is-current")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header-end">
          <LangSwitch locale={locale} pathname={pathname} label={site.langLabel} />
          <Link href={bookHref} className="btn btn--primary site-header-cta">
            {site.ctaShort}
            <ArrowRight aria-hidden />
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
        pathname={pathname}
        open={open}
        onClose={closeMenu}
      />
    </header>
  );
}

/**
 * La même page dans l'autre langue.
 *
 * On retire le préfixe courant pour retrouver la route nue, puis on pose
 * celui de la langue visée. Une seule écriture pour les DEUX sélecteurs du
 * site, celui de la barre et celui du menu de téléphone : quelqu'un qui lit
 * `/cas-usage` et bascule doit arriver sur `/en/cas-usage`, pas sur
 * l'accueil, et les deux ne doivent pas pouvoir en décider autrement.
 */
export function localePath(target: Locale, locale: Locale, pathname: string) {
  const bare = locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const href = target === "fr" ? bare : `/en${bare === "/" ? "" : bare}`;
  return href || "/";
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
  return (
    <div className="lang" role="group" aria-label={label}>
      {(["fr", "en"] as const).map((l) => {
        const current = l === locale;
        return (
          <Link
            key={l}
            href={localePath(l, locale, pathname)}
            hrefLang={l}
            aria-current={current ? "true" : undefined}
            className={cn("lang-item", current && "is-current")}
          >
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
