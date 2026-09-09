import { Wordmark } from "./wordmark";
import { getContent, type Locale } from "@/lib/content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <Wordmark />
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm text-brand transition-colors hover:text-brand-bright"
            >
              {site.ctaLabel}
            </a>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground/80">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-foreground"
          >
            {site.email}
          </a>
          <span>
            {site.location} · {site.vat}
          </span>
          <span>© {new Date().getFullYear()} 99GATES</span>
        </div>
      </div>
    </footer>
  );
}
