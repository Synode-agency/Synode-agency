import { renderLines } from "@/lib/lines";
import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NavLink } from "./nav-link";
import { getContent, path, type Locale } from "@/lib/content";
import { legalLinks } from "@/lib/legal";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const contactHref = path(locale, "/contact");
  const legal = legalLinks(locale);

  return (
    /* A white band running the full width of the window, like the navbar at
       the other end: the page ground is a light grey-blue, so the footer
       reads as its own surface rather than as more page. Same on every
       route — the component is shared. */
    <footer className="site-footer">
      <div className="container-page pt-[clamp(2.5rem,2rem+2vw,4.5rem)] pb-[clamp(1.5rem,1.2rem+0.8vw,2.25rem)]">
        <div className="grid gap-[clamp(2rem,1.75rem+2vw,4rem)] md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex max-w-xs flex-col gap-4">
            <Wordmark variant="mark" />
            <p className="text-[length:var(--fs-small)] leading-[var(--lh-body)] text-muted-foreground">
              {renderLines(site.tagline)}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow text-label-muted">Navigation</span>
            {site.nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                locale={locale}
                className="w-fit text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              href={contactHref}
              className="w-fit text-[length:var(--fs-small)] text-brand transition-colors hover:text-brand-bright"
            >
              {site.ctaLabel}
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-muted-foreground/50">Contact</span>
            <a
              href={`mailto:${site.email}`}
              className="w-fit text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
            <span className="text-[length:var(--fs-small)] text-muted-foreground">
              {site.location}
            </span>
            <span className="text-[length:var(--fs-small)] font-light text-text-mono">
              {site.vat}
            </span>
          </div>
        </div>

        {/* No entrance on this row: it is the last thing on the page, and the
            observer's bottom margin means it can sit in view without ever
            counting as visible, which left it hidden for good. */}
        <div className="mt-[clamp(1.75rem,1.5rem+1vw,2.75rem)] flex flex-col gap-2.5 border-t border-hairline pt-[clamp(1rem,0.85rem+0.6vw,1.6rem)] text-[length:var(--fs-micro)] text-text-mono sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Synode</span>

          <nav
            aria-label={locale === "fr" ? "Informations légales" : "Legal information"}
            className="flex items-center gap-x-1.5 whitespace-nowrap text-[length:var(--fs-micro)] sm:text-[length:var(--fs-micro)]"
          >
            {legal.map((link, i) => (
              <span key={link.slug} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span aria-hidden className="text-text-mono/40">
                    ·
                  </span>
                )}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  <span className="sm:hidden">{link.short}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
