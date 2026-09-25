"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { getContent, homePath, path, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Landing sections the scroll-spy underline follows. */
/** Les sections de la landing que suit le soulignement au scroll.
 *  « offre », « equipe » et « faq » n'y sont plus : ce sont des pages. */
const SPY_IDS = ["top", "services", "probleme", "methode", "conclusion"];

export function SiteHeader({ locale }: { locale: Locale }) {
  const { site, services } = getContent(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  /* Le menu déroulant de Services. `null` = fermé. */
  const [menu, setMenu] = useState<string | null>(null);
  const menuWrap = useRef<HTMLDivElement | null>(null);

  const home = homePath(locale);
  const onHome = pathname === home;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Un menu déroulant se ferme à l'Échap et au clic dehors, sans quoi il
     reste ouvert derrière la page sur laquelle on vient de partir. */
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    const onDown = (e: PointerEvent) => {
      if (!menuWrap.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  useEffect(() => {
    if (!onHome) return;
    const targets = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.6] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [onHome]);

  /** A nav item is current when its route matches, or when the landing is
   *  scrolled to the section it points at. */
  const isCurrent = (href: string) => {
    const [route, hash] = href.split("#");
    const normalised = route === "" ? "/" : route.replace(/\/$/, "") || "/";
    if (hash) return onHome && active === hash;
    if (normalised === home) return onHome && active === "top";
    return pathname === normalised || pathname.startsWith(`${normalised}/`);
  };

  const contactHref = path(locale, "/contact");
  const contactCurrent = pathname === contactHref;

  /**
   * The other language, on the page the visitor is actually reading — not
   * back to the home page. FR lives at the root, EN under /en, so the switch
   * is a matter of swapping that prefix. On the landing page the scroll-spy
   * already knows which section is in view, so the section comes along too.
   */
  const localeHref = (target: Locale) => {
    const bare = pathname.startsWith("/en")
      ? pathname.slice(3) || "/"
      : pathname;
    const prefix = target === "fr" ? "" : "/en";
    const route = bare === "/" ? prefix || "/" : `${prefix}${bare}`;
    const hash = onHome && active && active !== "top" ? `#${active}` : "";
    return `${route}${hash}`;
  };

  const langLink = (target: Locale, code: string) => {
    const isActive = target === locale;
    return isActive ? (
      <span className="rounded-md bg-surface-2 px-2 py-1 font-semibold text-foreground">
        {code}
      </span>
    ) : (
      <Link
        href={localeHref(target)}
        prefetch
        className="rounded-md px-2 py-1 text-muted-foreground/70 transition-colors hover:text-foreground"
      >
        {code}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          // Above the mobile panel, so the logo and the close button sit on
          // top of it rather than being covered by it.
          "relative z-10 border-b transition-[background-color,border-color,backdrop-filter,padding-top] duration-300",
          // No horizontal padding here. The bar used to repeat the page
          // gutter so it would line up with the hero card's interior, but
          // the .container-page inside already subtracts that gutter, so the
          // 35px were being paid twice: below roughly 1900px the logo and
          // the FR/EN switch sat one gutter further in than every section
          // heading on the page. Without it the bar takes the same column as
          // the sections, and the two edges match at every width.
          // Once the bar detaches into its own glass strip there is no card
          // to line up with any more, and keeping the top inset would leave
          // its contents sitting low instead of centred.
          scrolled && !open
            ? "pt-0"
            : "pt-[calc(var(--page-gutter-top)+var(--header-drop))]",
          // While the mobile panel is open the bar goes fully transparent, so
          // the panel reads as one surface with no seam under the logo.
          scrolled && !open
            ? "border-hairline bg-glass-card backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <NavLink
            href={home}
            locale={locale}
            onNavigate={() => setOpen(false)}
            aria-label={site.homeLabel}
            className="flex shrink-0 items-center rounded-md"
          >
            <Wordmark variant="mark" />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" ref={menuWrap}>
            {site.nav.map((item) => {
              const current = isCurrent(item.href);
              const hasMenu = "menu" in item && item.menu === "services";
              const rule = (
                /* The rule belongs to the current tab; pointing at another
                   one draws it there faintly, as if it were about to move. */
                <span
                  className={cn(
                    "absolute inset-x-3 top-px h-0.5 origin-left rounded-full bg-brand transition-[transform,opacity] duration-300",
                    current
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-40 group-focus-visible:scale-x-100 group-focus-visible:opacity-40",
                  )}
                  aria-hidden
                />
              );

              if (hasMenu) {
                const open = menu === "services";
                return (
                  /* Le survol ouvre, comme on l'attend d'un menu de navigation,
                     mais le bouton reste un vrai bouton : au clavier et au
                     toucher, Entrée ou un appui suffisent. */
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setMenu("services")}
                    onMouseLeave={() => setMenu(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setMenu(open ? null : "services")}
                      aria-expanded={open}
                      aria-controls="nav-services"
                      className={cn(
                        "group relative inline-flex items-center gap-1 rounded-md px-3 py-2 text-[length:var(--fs-small)] transition-colors",
                        current || open
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          open && "rotate-180",
                        )}
                      />
                      {rule}
                    </button>

                    {/* Le panneau commence exactement au bas du bouton, et
                        l'écart avec la carte est un padding transparent, pas
                        une position décalée. C'est ce qui permet de descendre
                        jusqu'aux liens : un vrai écart aurait fait sortir la
                        souris de la zone survolée, et le menu se serait fermé
                        avant qu'on puisse cliquer quoi que ce soit. */}
                    <div
                      id="nav-services"
                      hidden={!open}
                      className="absolute top-full left-1/2 z-40 w-[min(46rem,calc(100vw-4rem))] -translate-x-1/2 pt-2"
                    >
                      <div className="surface-card grid gap-5 p-5 shadow-[0_28px_70px_-40px_rgb(11_18_32/0.45)] sm:grid-cols-2">
                        {services.families.map((family) => (
                          <div key={family.slug}>
                            {/* La famille n'est pas un lien : il n'existe pas
                                de page qui la rassemble, les douze prestations
                                sont sur l'accueil et chacune a la sienne. Un
                                intitulé cliquable qui ramène là d'où l'on
                                vient est pire que pas de lien du tout. */}
                            <span className="eyebrow block text-brand">
                              {family.title}
                            </span>
                            <ul className="mt-2.5 grid list-none gap-0.5 p-0">
                              {family.items.map((sub) => (
                                <li key={sub.slug}>
                                  <NavLink
                                    href={path(locale, `/services/${sub.slug}`)}
                                    locale={locale}
                                    onNavigate={() => setMenu(null)}
                                    className="block rounded-md px-2.5 py-1.5 text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                                  >
                                    {sub.title}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.href}
                  href={item.href}
                  locale={locale}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "group relative rounded-md px-3 py-2 text-[length:var(--fs-small)] transition-colors",
                    current
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {rule}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={contactHref}
              aria-current={contactCurrent ? "page" : undefined}
              className="group brand-gradient hidden items-center gap-1.5 rounded-full px-4 py-2 text-[length:var(--fs-button)] font-medium text-brand-foreground sm:inline-flex"
            >
              {site.ctaLabel}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="hidden items-center border-l border-hairline pl-3 text-[0.72rem] font-light tracking-[0.06em] sm:flex">
              {langLink("fr", "FR")}
              {langLink("en", "EN")}
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-lg border border-hairline text-foreground md:hidden"
              aria-label={open ? site.menuClose : site.menuOpen}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-0 flex flex-col overflow-y-auto bg-background pt-[calc(var(--header-h)+var(--page-gutter-top))] pb-8 md:hidden">
          <nav className="container-page flex max-h-full flex-col items-center gap-1 overflow-y-auto">
            {site.nav.map((item) => {
              const hasMenu = "menu" in item && item.menu === "services";
              return (
                <div key={item.href} className="w-full">
                  <NavLink
                    href={item.href}
                    locale={locale}
                    onNavigate={() => setOpen(false)}
                    className="block w-full rounded-lg px-3 py-3 text-center text-lg text-foreground/90 hover:bg-surface-2"
                  >
                    {item.label}
                  </NavLink>

                  {/* Sur téléphone le déroulant n'a pas lieu d'être : rien ne
                      survole, et un menu dans un menu se referme sans qu'on
                      sache pourquoi. Les douze prestations sont simplement
                      posées sous leur famille, en plus petit. */}
                  {hasMenu && (
                    <div className="mb-1 flex flex-col gap-3 px-2 pb-1">
                      {services.families.map((family) => (
                        <div key={family.slug}>
                          <span className="eyebrow block text-center text-brand">
                            {family.title}
                          </span>
                          <ul className="mt-1.5 grid list-none gap-0.5 p-0">
                            {family.items.map((sub) => (
                              <li key={sub.slug}>
                                <NavLink
                                  href={path(locale, `/services/${sub.slug}`)}
                                  locale={locale}
                                  onNavigate={() => setOpen(false)}
                                  className="block rounded-md px-3 py-2 text-center text-[0.95rem] text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                                >
                                  {sub.title}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href={contactHref}
              onClick={() => setOpen(false)}
              className="brand-gradient mt-4 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3.5 text-base font-medium text-brand-foreground"
            >
              {site.ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
            <div className="mt-5 flex items-center justify-center gap-1 text-sm font-light tracking-[0.06em]">
              {langLink("fr", "FR")}
              {langLink("en", "EN")}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
