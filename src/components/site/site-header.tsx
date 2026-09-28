"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Le menu ouvert verrouille le défilement de la page derrière lui. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const isCurrent = (href: string) => {
    const full = path(locale, href);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header className={cn("site-header", scrolled && "is-scrolled")}>
      <div className="site-header-bar">
        <NavLink
          href={homePath(locale)}
          locale={locale}
          aria-label={site.homeLabel}
          className="site-header-brand"
        >
          <Wordmark variant="mark" />
        </NavLink>

        <nav aria-label="Navigation" className="site-nav">
          {site.nav.map((item) => (
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
          {site.nav.map((item) => (
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
          <NavLink
            href={path(locale, ROUTES.contact)}
            locale={locale}
            onNavigate={() => setOpen(false)}
            className="site-menu-link"
          >
            Contact
          </NavLink>
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
