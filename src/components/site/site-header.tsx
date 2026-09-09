"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "./wordmark";
import { getContent, homePath, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  const langLink = (target: Locale, code: string) =>
    target === locale ? (
      <span className="font-semibold text-foreground">{code}</span>
    ) : (
      <Link
        href={homePath(target)}
        prefetch
        className="text-muted-foreground/60 transition-colors hover:text-foreground"
      >
        {code}
      </Link>
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <a
            href="#top"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Wordmark />
            <span className="sr-only">99GATES</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-bright sm:inline-flex"
            >
              {site.ctaLabel}
              <ArrowRight className="size-3.5" />
            </a>

            <div className="hidden items-center gap-1.5 border-l border-border pl-3 font-mono text-xs sm:flex">
              {langLink("fr", "FR")}
              <span className="text-muted-foreground/50">/</span>
              {langLink("en", "EN")}
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background/98 backdrop-blur-xl md:hidden">
          <nav className="container-page flex flex-col gap-1 py-6">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg text-foreground/90 hover:bg-secondary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-4 py-3 text-base font-medium text-brand-foreground"
            >
              {site.ctaLabel}
              <ArrowRight className="size-4" />
            </a>
            <div className="mt-4 flex items-center gap-2 px-3 font-mono text-sm">
              {langLink("fr", "FR")}
              <span className="text-muted-foreground/50">/</span>
              {langLink("en", "EN")}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
