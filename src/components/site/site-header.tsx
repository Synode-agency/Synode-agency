"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { getContent, homePath, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

const SPY_IDS = ["top", "offre", "realisations", "contact"];

export function SiteHeader({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");

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
  }, []);

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
          "border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-hairline bg-background/70 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[4.25rem] items-center justify-between gap-4">
          <a
            href="#top"
            aria-label="99GATES — accueil"
            className="rounded-md"
          >
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative rounded-md px-3 py-2 text-[0.9rem] transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-brand transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[0.85rem] font-medium text-brand-foreground transition-colors hover:bg-brand-bright sm:inline-flex"
            >
              {site.ctaLabel}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>

            <div className="hidden items-center border-l border-hairline pl-3 font-mono text-[0.72rem] sm:flex">
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
        <div className="fixed inset-x-0 top-[4.25rem] bottom-0 z-40 bg-background/98 backdrop-blur-xl md:hidden">
          <nav className="container-page flex flex-col gap-1 py-8">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3.5 text-lg text-foreground/90 hover:bg-surface-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-3.5 text-base font-medium text-brand-foreground"
            >
              {site.ctaLabel}
              <ArrowRight className="size-4" />
            </a>
            <div className="mt-5 flex items-center gap-1 px-1 font-mono text-sm">
              {langLink("fr", "FR")}
              {langLink("en", "EN")}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
