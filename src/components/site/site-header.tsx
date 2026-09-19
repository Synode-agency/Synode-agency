"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { getContent, homePath, path, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Landing sections the scroll-spy underline follows. */
const SPY_IDS = ["top", "probleme", "offre", "methode", "equipe", "conclusion", "faq"];

export function SiteHeader({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

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

  const langLink = (target: Locale, code: string) => {
    const isActive = target === locale;
    return isActive ? (
      <span className="rounded-md bg-surface-2 px-2 py-1 font-semibold text-foreground">
        {code}
      </span>
    ) : (
      <Link
        href={homePath(target)}
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
          // The hero is a card inset from the viewport, and the bar sits
          // inside it. Matching that inset lines the logo up with the card's
          // interior rather than with the window's edge.
          "px-[var(--page-gutter)]",
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
            aria-label="Synode — accueil"
            className="flex shrink-0 items-center rounded-md"
          >
            <Wordmark variant="mark" />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const current = isCurrent(item.href);
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
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-brand transition-transform duration-300",
                      current ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
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
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-0 flex flex-col justify-center bg-background pt-[calc(var(--header-h)+var(--page-gutter-top))] pb-8 md:hidden">
          <nav className="container-page flex -translate-y-20 flex-col items-center gap-1">
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                locale={locale}
                onNavigate={() => setOpen(false)}
                className="w-full rounded-lg px-3 py-3.5 text-center text-lg text-foreground/90 hover:bg-surface-2"
              >
                {item.label}
              </NavLink>
            ))}
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
