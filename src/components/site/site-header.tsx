"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { SolutionsMenu } from "./solutions-menu";
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
  const headerRef = useRef<HTMLElement>(null);
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
    const background = Array.from(document.querySelectorAll<HTMLElement>(".site-page > main, .site-page > footer"));
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

  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const isCurrent = (href: string) => {
    const full = path(locale, href);
    return pathname === full || (href !== ROUTES.home && pathname.startsWith(`${full}/`));
  };

  return (
    <header ref={headerRef} className={cn("site-header", scrolled && "is-scrolled")} onKeyDown={e => {
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); burgerRef.current?.focus(); }
      if (e.key === "Tab") {
        const targets = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a,button") ?? []).filter(el => el.getClientRects().length > 0);
        const first = targets[0], last = targets[targets.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
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

      {/* Le menu de téléphone. Il couvre l'écran : un panneau à demi
          transparent sur une pile de cartes blanches devient illisible. */}
      <div id="menu-mobile" hidden={!open} className="site-menu">
        <nav aria-label="Navigation" className="site-menu-nav">
          {site.nav.map((item) => item.href === ROUTES.solutions ? <SolutionsMenu key={`mobile-${pathname}-${open}`} locale={locale} pathname={pathname} mobile onNavigate={() => setOpen(false)} /> : (
            <NavLink
              key={item.href}
              href={path(locale, item.href)}
              locale={locale}
              onNavigate={() => setOpen(false)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className={cn("site-menu-link", isCurrent(item.href) && "is-current")}
            >
              {item.label}
            </NavLink>
          ))}

        </nav>

        <Link href={bookHref} className="btn btn--primary site-menu-cta" onClick={() => setOpen(false)}>
          {site.cta}
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </header>
  );
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
  /* On retire le préfixe courant pour retrouver la route nue, puis on pose
     celui de l'autre langue. */
  const bare = locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;

  return (
    <div className="lang" role="group" aria-label={label}>
      {(["fr", "en"] as const).map((l) => {
        const href = l === "fr" ? bare : `/en${bare === "/" ? "" : bare}`;
        const current = l === locale;
        return (
          <Link
            key={l}
            href={href || "/"}
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
